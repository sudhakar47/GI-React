import { getCookie } from '../../src/utils/utilityManager';
import { validateEmptyObject } from '../../src/utils/validationManager';

const secureHttp = 'https';
const port1 = '3001';
const port2 = '8002';
const host = '192.168.0.57';
const host1 = 'localhost';
export const accessTokenCookie = 'accessToken'
export let isLoggedIn = false

/* Header API */
export const headerApi1 = `${secureHttp}://${host}:${port2}/api/v1/header`;
export const headerApi2 = `${secureHttp}://${host}:${port1}/api/v1/header`;
/* User Context API */
export const mwApi = `${secureHttp}://${host}:${port1}/api/v1/user-context`;
/* Categories API */
export const catApi = `${secureHttp}://${host}:${port1}/api/v1/categories/@top`;
/* Navigation API*/
export const navigationApi = `${secureHttp}://${host}:${port2}/api/v1/categories/navigation`;
/* Auto Suggest API */
export const autoSuggestApi = `${secureHttp}://${host}:${port1}/api/v1/auto-suggest/`;
/* Footer API */
export const footerApi = `${secureHttp}://${host}:${port2}/api/v1/footer`;
/* GenerateOTP API */
export const generateOTPAPI = `${secureHttp}://${host}:${port2}/api/v1/otp/generate`;
/* ForgotPassword API */
export const forgotPasswordAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/forgotpassword`;
/* Guest Login API */
export const guestLoginAPI = `${secureHttp}://${host1}:${port2}/api/v1/secure/login/guest`;
/* Newsletter Subscription API */
export const newsletterAPI = `${secureHttp}://${host}:${port2}/api/v1/newsletter/subscribe`;
/*store Id */
export const storeId = '10151';
/* Access Token */
export let accessToken = getTheAccessToken();
/* Facebook AppId */
export const facebookAppId = '248827646023949'
/* Google ClientId */
export const googleClientId = '380096657271-mr3mvob1u4ginpqf1jrrkiuv93fk3j3o.apps.googleusercontent.com';
/* Access Token API */
export const accessTokenAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/login/guest`;
/* Registration With Email API */
export const registartionWithEmailAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/signup`;

/* ------- constant functions ------- */
export function getTheAccessToken(tokenPro) {
    if (validateEmptyObject(tokenPro)) {
        return accessToken = tokenPro;
    } else {
        return accessToken = getCookie(accessTokenCookie);
    }   
}




