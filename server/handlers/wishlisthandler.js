const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const filter = require('../filters/filter');

/**
 * fetch Wishlist Item Count.
 * @return Wishlist Item Count
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.wishlistItemCount = function fetchWishlist(headers, callback) {
  logger.debug('Entering method wishlisthandler: wishlistItemCount');

  getWishlistData(headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, filter.filterData('wishlist_itemcount', result));
    }
  });
};

/**
 * fetch Wishlist details.
 * @return Wishlist Page Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchWishlist = function fetchWishlist(headers, callback) {
  logger.debug('Entering method mylisthandler: fetchWishlist');

  const wishlistDetails = [getWishlistData.bind(null, headers)];
  async.waterfall(wishlistDetails, (err, results) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      callback(null, results);
    }
  });
};

/**
 * fetch Wishlist Names.
 * @return return total count and names of wishlist
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.fetchlistnames = function fetchlistNames(headers, callback) {
  logger.debug('Entering method mylisthandler: Fetch WishList Names');
  getWishlistData(headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const wishlistNamesJson = {
        wishlistCount: 0,
        wishlistDetails: [],
      };
      if (result.GiftList && result.GiftList.length > 0) {
        wishlistNamesJson.wishlistCount = result.GiftList.length;
        result.GiftList.forEach(item => {
          const details = {
            wishlistName: item.descriptionName ? item.descriptionName : '',
            wishlistId: item.uniqueID,
          };
          wishlistNamesJson.wishlistDetails.push(details);
        });
      }
      callback(null, wishlistNamesJson);
    }
  });
};

/**
 * Create Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.createlist = function createWishlist(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Create Wishlist');
  const error = [];
  if (!body.wishlistname) {
    error.push(errorutils.errorlist.wishlist.listname_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }
  const createWishListURL = constants.createWishlist.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);

  const reqBody = {
    descriptionName: body.wishlistname,
  };
  origin.getResponse(
    'POST',
    createWishListURL,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling CreateWishlist api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Create Wishlist and Add Item.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.createAndAdd = function createAndAdd(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Create Wishlist and Add Item');
  const error = [];
  if (!body.wishlistname) {
    error.push(errorutils.errorlist.wishlist.listname_missing);
  }
  if (!body.productid) {
    error.push(errorutils.errorlist.wishlist.productid_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }
  const reqHeader = headerutil.getWCSHeaders(headers);
  const createWishListURL = constants.createWishlist.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqBody = {
    descriptionName: body.wishlistname,
    item: [{ productId: body.productid, quantityRequested: '1' }],
  };
  origin.getResponse(
    'POST',
    createWishListURL,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling Create&Additem api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Add Item to a Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.addItem = function addItem(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Add Item');
  const error = [];
  if (!body.wishlistid) {
    error.push(errorutils.errorlist.wishlist.listid_missing);
  }
  if (!body.productid) {
    error.push(errorutils.errorlist.wishlist.productid_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }

  const addItems = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistid)}?addItem=true`;
  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = {
    item: [
      {
        productId: body.productid,
        quantityRequested: '1',
      },
    ],
  };
  origin.getResponse(
    'PUT',
    addItems,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling Add Item api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Rename Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.rename = function rename(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Rename Wishlist');
  const error = [];
  if (!body.wishlistid) {
    error.push(errorutils.errorlist.wishlist.listid_missing);
  }
  if (!body.wishlistname) {
    error.push(errorutils.errorlist.wishlist.listname_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);
  const addItems = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistid)}`;
  const reqBody = {
    descriptionName: body.wishlistname,
  };
  origin.getResponse(
    'PUT',
    addItems,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling RenameWishlist api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Delete Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.deletelist = function deletelist(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Delete Wishlist');
  const error = [];
  if (!body.wishlistid) {
    error.push(errorutils.errorlist.wishlist.listid_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);
  const deleteList = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistid)}`;
  origin.getResponse(
    'DELETE',
    deleteList,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling DeleteWishlist api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

/**
 * Delete item from Wishlist.
 * @return response from WCS
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.deleteitem = function deleteitem(headers, body, callback) {
  logger.debug('Entering method mylisthandler: Delete Item');
  const error = [];
  if (!body.wishlistid) {
    error.push(errorutils.errorlist.wishlist.listid_missing);
  }
  if (!body.giftlistitemid) {
    error.push(errorutils.errorlist.wishlist.giftitemid_missing);
  }
  if (error.length > 0) {
    callback(error);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);
  const deleteItems = `${constants.editWishlist
    .replace('{{storeId}}', headers.storeId)
    .replace('{{wishlistid}}', body.wishlistid)}?itemId=${body.giftlistitemid}`;
  origin.getResponse(
    'DELETE',
    deleteItems,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 201 || response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error('Error while calling Deleteitem api', response.status);
        error.push(errorutils.handleWCSError(response));
        callback(error);
      }
    },
  );
};

function getWishlistData(headers, callback) {
  const fetchWishListOriginURL = constants.mylistFetch.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    fetchWishListOriginURL,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else if (response.status === 404) {
        const wishAllList = {
          wishlistTotalItems: 0,
        };
        callback(null, wishAllList);
      } else {
        logger.error('Error while calling wishList api.', response.status);
        callback(errorutils.handleWCSError(response));
      }
    },
  );
}
