const logger = require('./logger.js');

const errorlist = {
  invalid_params: {
    status_code: 400,
    error_key: 'invalid_params',
    error_message: 'Some params might be missing or invalid.',
  },
  token_invalid: {
    status_code: 401,
    error_key: 'token_invalid',
    error_message: 'Access Token is Invalid.Please enter a valid Access Token.',
  },
  token_expired: {
    status_code: 401,
    error_key: 'token_expired',
    error_message: 'Access Token expired',
  },
  token_missing: {
    status_code: 400,
    error_key: 'token_missing',
    error_message: 'Access Token Missing',
  },
  storeid_missing: {
    status_code: 400,
    error_key: 'storeid_missing',
    error_message: 'Store ID Missing',
  },
  resource_not_found: {
    status_code: 404,
    error_key: 'resource_not_found',
    error_message: 'Requested resource not found',
  },
  unauthorized: {
    status_code: 401,
    error_key: 'unauthorized',
    error_message: 'User is Not authenticated.',
  },
  wcs_invalid_response: {
    status_code: 502,
    error_key: 'wcs_invalid_response',
    error_message: 'Invalid Response From WCS.',
  },
  generic: {
    invalid_params: {
      status_code: 400,
      error_key: 'invalid_params',
      error_message: 'Some params might be missing',
    },
  },
  wishlist: {
    listid_missing: {
      error_key: 'listid_missing',
      error_message: 'Wishlist ID is Missing',
    },
    giftitemid_missing: {
      error_key: 'giftitemid_missing',
      error_message: 'Gift Item ID is Missing',
    },
    listname_missing: {
      error_key: 'listname_missing',
      error_message: 'Wishlist Name is Missing',
    },
    productid_missing: {
      error_key: 'productid_missing',
      error_message: 'Product ID is Missing',
    },
  },
};
module.exports.errorlist = errorlist;

module.exports.handleWCSError = function handleWCSError(response) {
  const statusCode = response.status;
  const errBody = response.body;
  if (!statusCode) {
    logger.error(`No Error code specify from WCS${JSON.stringify(errBody)}`);
    return errorlist.wcs_invalid_response;
  }

  if (statusCode >= 400 && statusCode < 500) {
    if (statusCode === 400) {
      if (
        errBody.errors[0].errorKey === '_ERR_FINDER_EXCEPTION' ||
        errBody.errors[0].errorKey === '_ERR_ORDER_WRONG_STATUS' ||
        errBody.errors[0].errorKey === '_ERR_INVALID_INPUT' ||
        errBody.errors[0].errorKey === 'ERROR_RESEND_OTP_COUNT' ||
        errBody.errors[0].errorKey === 'ERROR_OTP_TIMEOUT' ||
        errBody.errors[0].errorKey === 'ERROR_USER_DOES_NOT_EXIST' ||
        errBody.errors[0].errorKey === '_ERR_NUMBER_FORMAT_EXCEPTION'
      ) {
        return {
          status_code: 400,
          error_key: errBody.errors[0].errorKey,
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (errBody.errors[0].errorKey === '_ERR_LOGIN_NOT_ALLOWED_NOW') {
        return {
          status_code: 400,
          error_key: 'login_not_allowed',
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (
        errBody.errors[0].errorKey === '_ERR_AUTHENTICATION_REUSEOLD_PASSWORD'
      ) {
        return {
          status_code: 400,
          error_key: 'previously_used_password',
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (errBody.errors[0].errorKey === 'ERROR_INCORRECT_OTP') {
        return {
          status_code: 400,
          error_key: 'otp_incorrect',
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (
        errBody.errors[0].errorKey ===
          '_ERR_AUTHENTICATION_MINIMUMLENGTH_PASSWORD' ||
        errBody.errors[0].errorKey ===
          '_ERR_AUTHENTICATION_MINIMUMDIGITS_PASSWORD'
      ) {
        return {
          status_code: 400,
          error_key: 'invalid_password',
          error_message:
            'Invalid Password. Password should have min 6 characters and atleast 1 number',
        };
      }
      return (
        wcsErrorList.error_400[errBody.errors[0].errorKey] ||
        errorlist.invalid_params
      );
    }
    if (statusCode === 401) {
      if (
        errBody.errors[0].errorKey === '_ERR_EXPIRED_ACTIVITY_TOKEN' ||
        errBody.errors[0].errorKey === '_ERR_INVALID_COOKIE' ||
        errBody.errors[0].errorKey === '_ERR_ACTIVITY_TOKEN' ||
        errBody.errors[0].errorKey === '_ERR_TERMINATED_ACTIVITY_TOKEN'
      ) {
        return errorlist.token_expired;
      }
      return (
        wcsErrorList.error_401[errBody.errors[0].errorKey] ||
        errorlist.unauthorized
      );
    }
    if (statusCode === 404) {
      return {
        status_code: 404,
        error_key: 'Resource_Not_Found',
        error_message: errBody || '',
      };
    }
    return errorlist.invalid_params;
  }
  if (statusCode === 500) {
    return (
      wcsErrorList.error_500[errBody.errors[0].errorKey] ||
      errorlist.invalid_params
    );
  }
  return errorlist.wcs_invalid_response;
};

const wcsErrorList = {
  error_400: {
    _ERR_AUTHENTICATION_ERROR: {
      status_code: 400,
      error_key: 'invalid_credentials',
      error_message:
        'The specified user_id or password are not correct. Verify the information provided and log in again.',
      // 'LogonId or Password is incorrect',
    },
    _ERR_PERSON_ACCOUNT_DISABLED: {
      status_code: 400,
      error_key: 'account_locked',
      error_message:
        'Your Account is temporarily locked. Please try again after 15 minutes.',
    },
    _ERR_LOGONID_ALREDY_EXIST: {
      status_code: 400,
      error_key: 'user_exists',
      error_message: 'User already exists.',
    },
    ERROR_USER_EXISTS: {
      status_code: 400,
      error_key: 'user_exists',
      error_message: 'User already exists.',
    },
    _ERR_GIFTLIST_ITEM_NOT_FOUND: {
      status_code: 400,
      error_key: '_ERR_GIFTLIST_ITEM_NOT_FOUND',
      error_message: 'Gift List Item Doesnt Exist',
    },
    _ERR_DELETE_OR_UPDATE_NON_EXIST_GIFT_LIST: {
      status_code: 400,
      error_key: '_ERR_DELETE_OR_UPDATE_NON_EXIST_GIFT_LIST',
      error_message: 'WishList Doesnt Exist',
    },
    _ERR_GIFTLIST_ITEM_CATENTRYDETAIL_MISSING: {
      status_code: 400,
      error_key: '_ERR_GIFTLIST_ITEM_CATENTRYDETAIL_MISSING',
      error_message: 'Product Catentry details missing',
    },
    _ERR_GIFTLIST_ITEM_CATALOGENTRY_INVALID: {
      status_code: 400,
      error_key: '_ERR_GIFTLIST_ITEM_CATALOGENTRY_INVALID',
      error_message: 'Product Catentry details invalid',
    },
    _ERR_MISSING_CMD_PARAMETER: {
      status_code: 400,
      error_key: '_ERR_MISSING_CMD_PARAMETER',
      error_message: 'There was a missing parameter: q.',
    },
    ERROR_MOBILE_EMAIL_INVALID: {
      status_code: 400,
      error_key: 'ERROR_MOBILE_EMAIL_INVALID',
      error_message: 'Please enter valid Email Id/Mobile number.',
    },
    ERROR_USER_DOES_NOT_EXIST_ON_FORGOT_PASSWORD: {
      status_code: 400,
      error_key: 'invalid_user_id',
      error_message:
        'You are not registered with Godrej Interio, please click here to register',
    },
  },
  error_401: {
    _ERR_INVALID_COOKIE: {
      status_code: 401,
      error_key: '_ERR_INVALID_COOKIE',
      error_message:
        'An invalid cookie was received for the user, your logonId may be in use by another user.',
    },
  },
  error_500: {
    ERR_INTERNAL_SERVER_ERROR: {
      status_code: 500,
      error_key: 'ERR_INTERNAL_SERVER_ERROR',
      error_message:
        'CWXFR0230E: Internal server error. Details will be stored within the server logs.',
    },
  },
};
