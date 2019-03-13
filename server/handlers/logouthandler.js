const constants = require('../utils/constants');
const errorconfig = require('../utils/errorconfig.js');
 const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');

/**
 * call to logout API
 * @param headers : wctoken and wctrustedtoken
 * @returns : return success if logout successful
 * @throws : notoken or tokenexpired in case of wctokens expired or missing
 */
module.exports.logout = function logout(headers, callback) {
  const reqHeader = {
    WCToken: headers.WCToken,
    WCTrustedToken: headers.WCTrustedToken,
  };

  const originLoginURL = `${constants.login.replace(
    '{{storeId}}',
    headers.storeId,
  )}/@self`;
  origin.getResponse(
    'DELETE',
    originLoginURL,
    reqHeader,
    null,
    null,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 200) {
          callback(null, { message: 'Logout Successful' });
        } else {
          errorconfig.handleWCSError(response.status, response.body, callback);
        }
      } else {
        logger.error('Error while calling logout API', response.status);
        callback(
          errorconfig.formatErrorObject(
            errorconfig.errorlist.error_502.service_invalid_response,
          ),
        );
      }
    },
  );
};
