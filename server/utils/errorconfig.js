'use strict';
const logger = require('./logger.js');

function formatErrorObject(errJson) {
	let err = new Error(errJson.message);
    err.status = errJson.status;
    err.error_code = errJson.error_code;
    return err;
}

module.exports.formatErrorObject = formatErrorObject;

module.exports.formatPrintErrorMessage = function( errText,errStatus) {
    let errorMsg = {
        'Status': errStatus,
        'Message': errText
    };
    logger.error(JSON.stringify(errorMsg));
    return errorMsg;
}

let errorlist = {
	"error_400" : {
		"invalid_params" : {
			"status"     : 400,
			//"message" 	 : "Something is not right. We request you to retry or contact our customer service for assistance.",
			"message" 	 : "",
			"error_code" : "Invalid_params"
		},
		"invalid_store" : {
			"status"		 : 400,
			"message"		 : "Invalid Store ID.",
			"error_code" : "Invalid_store"
		},
		"invalid_order" : {
			"status"		 : 400,
			"message"		 : "Invalid order ID.",
			"error_code" : "Invalid_order"
		},
		"err_cancel_order" : {
			"status"		 : 400,
			"message"		 : "Your Order cannot be cancelled now.",
			"error_code" : "Err_cancel_order"
		},
		"err_slot_change_order" : {
			"status"		 : 400,
			"message"		 : "Slot cannot be changed now.",
			"error_code" : "Err_slot_change_order"
		},
		"invalid_shippingInfo" : {
			"status"		 : 400,
			"message"		 : "Invalid shippingInfo.",
			"error_code" : "Invalid_shippingInfo"
		},
		"user_exists" : {
			"status"		 : 400,
			"message"		 : "User already exists.",
			"error_code" : "User_exists"
		},
		"email_exists" : {
			"status"		 : 400,
			"message"		 : "Email already exists.",
			"error_code" : "Email_exists"
		},
		"phone_exists" : {
			"status"		 : 400,
			"message"		 : "Phone already exists.",
			"error_code" : "Phone_exists"
		},
		"expired_otp" : {
			"status"		 : 400,
			"message"		 : "OTP expired.",
			"error_code" : "Expired_otp"
		},
		"invalid_otp" : {
			"status"		 : 400,
			"message"		 : "Invalid OTP.",
			"error_code" : "Invalid_otp"
		},
		"invalid_espot" : {
			"status"		 : 400,
			"message"		 : "Invalid Espot.",
			"error_code" : "Invalid_spot"
		},
		"invalid_user" : {
			"status"		 : 400,
			"message"		 : "Invalid User.",
			"error_code" : "Invalid_user"
		},
		"err_parent_addon_cancel" : {
			"status"		 : 400,
			"message"		 : "We have received an additional order linked with this order. Please wait till your add-on order is confirmed.",
			"error_code" : "Err_parent_addon_cancel"
		},
		"err_parent_addon_slot_change" : {
			"status"		 : 400,
			"message"		 : "We have received an additional order linked with this order. Please wait till your add-on order is confirmed.",
			"error_code" : "Err_parent_addon_slot_change"
		},
		"err_no_mrp_item" : {
			"status"		 : 400,
			"message"		 : "Sorry! some products from your cart are currently out of stock & will be removed from your cart. For details click here.",
			"error_code" : "Err_no_mrp_item"
		},
		"err_delivery_restricted_item" : {
			"status"		 : 400,
			"message"		 : "Selected Delivery Option is invalid for some of the items.",
			"error_code" : "Err_delivery_restricted_item"
		},
		"err_slot_change_limit_over" : {
			"status"		 : 400,
			"message"		 : "You have exceeded maximum number of time slot changes for this order.",
			"error_code" : "Err_slot_change_limit_over"
		},
		"no_password" : {
			"status"		 : 400,
			"message"		 : "Password cannot be empty",
			"error_code"		 : "No_Password" 
		},
		"no_confirm_password" : {
			"status" 		 : 400,
			"message" 		 : "Confirm password cannot be empty",
			"error_code"	 : "No_Confirm_Password"
		},
		"no_email" : {
			"status"		: 400,
			"message"		: "Email cannot be empty",
			"error_code"	: "No_Email"
		},
		"email_password_missing" : {
			"status"		: 400,
			"message"		: "Email and Password cannot be empty",
			"error_code"	: "Email_Password_Missing"
		},
		"invalid_email"	: {
			"status"		: 400,
			"message"		: "Inalid Email Address",
			"error_code"	: "Invalid_Email"
		},
		"invalid_password_length" : {
			"status"		: 400,
			"message"		: "Passwords must be at least 8 characters in length",
			"error_code"	: "Invalid_Password_Length"
		},
		"password_mismatch" : {
			"status" 		: 401,
			"message"		: "Password and Confirm Password do not match",
			"error_code"	: "Password_Mismatch"
		}
	},
	"error_401" : {
		"invalid_credentials" : {
			"status" 		 : 401,
      		"message"		 : "Invalid credentials provided.",
      		"error_code" :  "Invalid_credentials"
		},
		"account_disabled" : {
			"status" 		 : 401,
			"message"		 : "User Account disabled.",
			"error_code" :  "Account_disabled"
		},
		"invalid_token" : {
			"status" 		 : 401,
			"message"		 : "Invalid Access provided.",
			"error_code"     : "Invalid_token"
		},
		"no_token" : {
			"status" 		 : 401,
			"message"		 : "Access Token not provided.",
			"error_code" :  "No_token"
		},
		"unauthorized" : {
			"status" 		 : 401,
      		"message"		 : "Not authenticated.",
      		"error_code" :  "Unauthorized"
    	},
		"token_expired" : {
			"status" 		 : 401,
			"message"		 : "User token expired. Please login again",
			"error_code"     :  "Token_expired"
		},
	},
	"error_404" : {
		"resource_notFound" : {
			"status" 		 : 404,
      		"message"		 : "Requested resource not found",
      		"error_code" :  "Resource_notFound"
    	}
	},
	"error_500" : {
		"server_error" : {
			"status" 		 : 500,
      		"message"		 : "Unable to process request.",
      		"error_code" :  "Server_error"
		}
	},
	"error_502" : {
		"service_invalid_response" : {
			"status" 		 : 502,
      		"message"		 : "Invalid response from service.",
      		"error_code" :  "Service_invalid_response"
		},
		"service_invalid_json" : {
			"status" 		 : 502,
      		"message"		 : "Invalid JSON.",
      		"error_code" :  "Service_invalid_json"
		}
	},
	"error_503" : {
		"service_down" : {
			"status" 		 : 503,
      		"message"		 : "under maintenance.",
      		"error_code" :  "Service_down"
		}
	},
	"error_504" : {
		"service_timeout" : {
			"status" 		 : 504,
      		"message"		 : "Timout from service.",
      		"error_code" :  "Service_timeout"
		}
	}
};

module.exports.handleWCSError = function(statusCode,resBody,callback){
	if(!statusCode){
		logger.error('No Error code specify from WCS'+JSON.stringify(resBody));
		callback(formatErrorObject(errorlist['error_502']['service_invalid_response']));
		return;
	}
	else if(statusCode >= 400 && statusCode < 500)
	{
		if(statusCode === 400)
		{
			if(resBody.errors[0].errorKey === 'ERR_PRODUCT_NOT_BUYABLE' || resBody.errors[0].errorKey === 'ERR_PRODUCTS_NOT_BUYABLE'){
				callback(formatErrorObject({
					"status"     : 400,
					"message"    : resBody.errors[0].errorMessage,
					"error_code" : "non_buyable_products"
				}));
				return;
			} else if(resBody.errors[0].errorKey === 'CWXBB1012E'){
				callback(formatErrorObject(errorlist['error_401']['token_expired']));
				return;
			}  else if(resBody.errors[0].errorKey === '_ERR_EMAIL_ALREADY_REGISTERED'){
				callback(formatErrorObject(errorlist['error_400']['email_exists']));
				return;
			} else if(resBody.errors[0].errorKey === '_ERR_PHONE_ALREADY_REGISTERED'){
				callback(formatErrorObject(errorlist['error_400']['phone_exists']));
				return;
	  		} else if(resBody.errors[0].errorKey === '_ERR_AUTHENTICATION_ERROR'){
				callback(formatErrorObject(errorlist['error_401']['invalid_credentials']));
				return;
			} else if(resBody.errors[0].errorKey === '_ERR_PERSON_ACCOUNT_DISABLED'){
				callback(formatErrorObject(errorlist['error_401']['account_disabled']));
				return;

			}  else if(resBody.errors[0].errorKey === '_ERR_LOGONID_ALREDY_EXIST'){
				callback(formatErrorObject(errorlist['error_400']['user_exists']));
				return;

			} else if(resBody.errors[0].errorCode === 'CMN0411E' && resBody.errors[0].errorKey === '_ERR_FINDER_EXCEPTION'){
				callback(formatErrorObject(errorlist['error_400']['invalid_user']));
				return;

			}  else if(resBody.errors[0].errorKey ==='_ERR_CMD_INVALID_PARAM'){
				if (resBody.errors[0].errorParameters === 'logonId') {
					callback(formatErrorObject(errorlist['error_400']['no_email']));
					return;	
				} else if (resBody.errors[0].errorParameters === 'logonPassword') {
					callback(formatErrorObject(errorlist['error_400']['no_password']));
					return;	
				} else {
					callback(formatErrorObject(errorlist['error_400']['invalid_params']));
					return;
				}
			} else if (resBody.errors[0].errorKey === '_ERR_PASSWORDS_NOT_SAME'){
				callback(formatErrorObject(errorlist['error_400']['password_mismatch']));
				return;
			} else if (resBody.errors[0].errorKey === '_ERR_VALUE_FOR_PARM_NOT_SUPPORTED'){
				callback(formatErrorObject(errorlist['error_400']['invalid_email']));
				return;
			} else if (resBody.errors[0].errorKey === '_ERR_AUTHENTICATION_MINIMUMLENGTH_PASSWORD'){
				callback(formatErrorObject(errorlist['error_400']['invalid_password_length']));
				return;
			} else {
				callback(formatErrorObject(errorlist['error_400']['invalid_params']));
				return;
			}
		}
		else if(statusCode === 401){
				//callback(formatErrorObject(errorlist['error_401']['no_token']));
				if (resBody.errors[0].errorKey === "_ERR_TERMINATED_ACTIVITY_TOKEN"){
					callback(formatErrorObject(errorlist['error_401']['token_expired']));
					return;
				} else if (resBody.errors[0].errorKey === '_ERR_INVALID_COOKIE') {
					callback(formatErrorObject(errorlist['error_401']['invalid_token']));
					return;
				}else {
					callback(formatErrorObject(errorlist['error_401']['unauthorized']));
				}
		}else{
			callback(formatErrorObject(errorlist['error_400']['invalid_params']));
			return;
		}
	}
	else if(statusCode >= 500 && statusCode < 599){
		callback(formatErrorObject(errorlist['error_502']['service_invalid_response']));
	}
	else {
		logger.error('Invalid response from WCS'+JSON.stringify(resBody)+'---statusCode--'+statusCode);
		callback(formatErrorObject(errorlist['error_502']['service_invalid_response']));
		return;
	}
}

module.exports.errorlist = errorlist;