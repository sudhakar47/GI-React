const constants = require('../utils/constants');
const errorconfig = require('../utils/errorconfig.js');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const tokenGenerator = require('../utils/tokenvalidation.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const filter = require('../filters/filter');
// eslint-disable-next-line no-useless-escape
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email

/**
 * Registeres User in WCS
 * @param storeId,access_token
 * @return 200,OK with encrypted tokens as access_token
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.registerUser = function userRegister(params, headers, callback) {
  logger.debug('User Registration API');
  if (!params.name || !params.user_id || !params.password) {
    logger.debug('Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);

  let firstname = '';
  let lastname = '';
  if (params.name.indexOf(' ') > 0) {
    firstname = params.name.substr(0, params.name.indexOf(' '));
    lastname = params.name.substring(params.name.indexOf(' ') + 1).trim();
  } else {
    firstname = params.name;
  }
  const reqBody = {
    firstName: firstname,
    logonId: params.user_id,
    logonPassword: params.password,
    logonPasswordVerify: params.password,
    x_otp: params.otp || '',
  };
  if (lastname !== '') {
    reqBody.lastName = lastname;
  }
  const originUserUrl = constants.userRegistration.replace(
    '{{storeId}}',
    headers.storeId,
  );

  origin.getResponse(
    'POST',
    originUserUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 201) {
        const accessToken = tokenGenerator.encodeToken(response.body);
        const signupResponseBody = {
          access_token: accessToken,
        };
        callback(null, signupResponseBody);
      } else {
        logger.error(
          `signup error ${JSON.stringify(response.body)}`,
          'Error',
          null,
        );
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Social Login
 * @param
 * @returns
 * @throws
 */
module.exports.socialLogin = function sociallogin(params, headers, callback) {
  console.log('Call to get social login api');
  if (
    !params.firstName ||
    !params.lastName ||
    !params.authorizationProvider ||
    !params.id ||
    !params.socialToken ||
    !params.emailId
  ) {
    logger.debug('invalid params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const loginHeaders = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  };

  const socialLoginBody = {
    lastName: params.last_name,
    firstName: params.first_name,
    nickName: params.first_name,
    authorizationProvider: params.authorization_provider,
    id: params.id,
    accessToken: params.access_token,
    email: params.email_id,
  };

  const originLoginURL = constants.sociallogin.replace(
    '{{storeId}}',
    headers.store_id,
  );
  origin.getResponse(
    'POST',
    originLoginURL,
    loginHeaders,
    null,
    socialLoginBody,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 201) {
          const encryptedAccessToken = tokenGenerator.encodeToken(
            response.body,
          );
          const loginResponseBody = {
            access_token: encryptedAccessToken,
          };
          callback(null, loginResponseBody);
        } else {
          errorconfig.handleWCSError(response.status, response.body, callback);
        }
      } else {
        logger.error('error in doSocialLogin');
        callback(errorutils.handleWCSError(response));
      }
    }
  );
};

/**
 * Change user password
 * @param
 * @returns
 * @throws
 */
module.exports.changeUserCredentials = function changeUserCredentials(
  params,
  headers,
  callback,
) {
  logger.debug('Call to change password api');
  if (!params.newPassword) {
    callback(errorconfig.formatErrorObject(errorconfig.errorlist['error_400']['no_password']));
    return;
  }
  if (!params.confirmPassword) {
    callback(errorconfig.formatErrorObject(errorconfig.errorlist['error_400']['no_confirm_password']));
    return;
  }

  const reqBody = {
    logonPassword: params.newPassword,
    logonPasswordVerify: params.confirmPassword,
  };

  const reqHeader = {
    'Content-Type': 'application/json',
    WCToken: headers.WCToken,
    WCTrustedToken: headers.WCTrustedToken,
  };

  const originUserURL = constants.changePassword.replace(
    '{{storeId}}',
    headers.storeId,
  );
  origin.getResponse(
    'PUT',
    originUserURL,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 200) {
          callback(null, { message: 'Password Change Successfully' });
        } else {
          errorconfig.handleWCSError(response.status, response.body, callback);
        }
      } else {
        logger.error('error in userdetails while change password');
        callback(
          errorconfig.formatErrorObject(
            errorconfig.errorlist['error_502']['service_invalid_response'],
          ),
        );
      }
    },
  );
};

/**
 * Get user details
 * @param
 * @returns
 * @throws
 */
module.exports.getUserDetails = function getUserDetails(headers, callback) {
  logger.debug('Call to get userDetails api');
  const originUserDetailURL = constants.userDetails
    .replace('{{storeId}}', headers.storeId)
    .replace('{{userId}}', headers.userId);
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    originUserDetailURL,
    reqHeader,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, filter.filterData('userinfo', response.body));
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

module.exports.getUserAddress = function getUserAddress(headers, callback) {
  logger.debug('Call to get user contact api');

  const origindetailURL = constants.userContact.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    origindetailURL,
    reqHeader,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        errorconfig.handleWCSError(response.status, response.body, callback);
      }
    },
  );
};

module.exports.getNotifications = function getNotifications(headers, callback) {
  logger.debug('Call to get user contact api');
  callback(null, { message: 'WCS Integration Pending to get Notifictaions' });
};

module.exports.getGiftCards = function getGiftCards(headers, callback) {
  logger.debug('Call to get user contact api');
  callback(null, {
    message: 'WCS Integration Pending to get GiftCard Details',
  });
};

module.exports.getGodrejCredit = function getGodrejCredit(headers, callback) {
  logger.debug('Call to get user contact api');
  callback(null, {
    message: 'WCS Integration Pending to get Godrej Credit Details',
  });
};

/**
 * Forgot Password API
 * @param user_id
 * @param otp
 * @param new_password
 * @returns
 * @throws OTPExpired, OTPIncorrect, USE_OLD_PASSWORD, Invalid Params
 */
module.exports.forgotPassword = function forgotPassword(
  params,
  headers,
  callback,
) {
  logger.debug('Call to Forgot Password API');

  if (!params.user_id || !params.otp || !params.new_password) {
    logger.error('invalid params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const originUserUrl = constants.forgotPassword.replace(
    '{{storeId}}',
    headers.store_id,
  );
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const forgotPasswordBody = {
    logonId: params.user_id,
    resetPassword: 'true',
    challengeAnswer: '-',
    state: 'passwdconfirm',
    xcred_validationCode: `${params.user_id}_IBM_${params.otp}`,
    logonPassword: params.new_password,
    xcred_logonPasswordVerify: params.new_password,
  };

  origin.getResponse(
    'PUT',
    originUserUrl,
    reqHeaders,
    null,
    forgotPasswordBody,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 200) {
          callback(null, response.body);
        } else {
          logger.error('error in forgot password API');
          callback(errorutils.handleWCSError(response));
        }
      } else {
        callback(errorutils.wcsErrorList.wcs_invalid_response);
      }
    },
  );
};
