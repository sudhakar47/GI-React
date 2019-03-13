const apiconfig = require('./apiconfig.js');
const endPointURLConfig = apiconfig.getEndPoint();
const HostName = endPointURLConfig.hostname;
const searchHostName = endPointURLConfig.searchHostname;

// production Resource URL
const prodSearchResourceUrl = `https://${searchHostName}/search/resources/store`;
const prodWcsResourceUrl = `https://${HostName}/wcs/resources/store`;

// export the CONSTANT URL
module.exports = Object.freeze({
  TopCategoryHierarchy: `${prodSearchResourceUrl}/{{storeId}}/categoryview/{{urlParam}}`,
  espotOriginURL: `${prodWcsResourceUrl}/{{storeId}}/espot`,
  categoryview: `${prodSearchResourceUrl}/{{storeId}}/categoryview/{{urlParam}}`,
  categoryViewByParentId: `${prodWcsResourceUrl}/{{storeId}}/categoryview/byParentCategory/{{categoryId}}`,
  productViewByCategoryId: `${prodSearchResourceUrl}/{{storeId}}/productview/byCategory/{{categoryId}}`,
  productViewById: `${prodWcsResourceUrl}/{{storeId}}/productview/byId/{{productid}}`,
  login: `${prodWcsResourceUrl}/{{storeId}}`,
  userRegistration: `${prodWcsResourceUrl}/{{storeId}}/person?responseFormat=json&mode=self`,
  // userDetails: prodWcsResourceUrl + '/{{storeId}}/person/{{userId}}?profileName=IBM_User_Registration_Details&responseFormat=json',
  userDetails: `${prodWcsResourceUrl}/{{storeId}}/person/@self`,
  search: `${prodWcsResourceUrl}/{{storeId}}/productview/bySearchTerm/{{urlParam}}`,
  autoSuggest: `${prodSearchResourceUrl}/{{storeId}}/sitecontent/keywordSuggestionsByTerm/{{urlParam}}`,
  cartData: `${prodWcsResourceUrl}/{{storeId}}/cart`,
  mylistFetch: `${prodWcsResourceUrl}/{{storeId}}/wishlist/@self`,
  createWishlist: `${prodWcsResourceUrl}/{{storeId}}/wishlist`,
  editWishlist: `${prodWcsResourceUrl}/{{storeId}}/wishlist/{{wishlistid}}`,
  changePassword: `${prodWcsResourceUrl}/{{storeId}}/person/@self?action=updateUserRegistration&responseFormat=json`,
  userContact: `${prodWcsResourceUrl}/{{storeId}}/person/@self/contact`,
  sociallogin: `${prodWcsResourceUrl}/{{storeId}}/loginidentity/oauth_validate?responseFormat=json`,
  otp: `${prodWcsResourceUrl}/{{storeId}}/GIOtp/generateOtp`,
  forgotPassword: `${prodWcsResourceUrl}/{{storeId}}/person/@self?responseFormat=json`
});
