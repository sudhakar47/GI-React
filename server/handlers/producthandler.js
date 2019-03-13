const async = require('async');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const errorconfig = require('../utils/errorconfig.js');
const logger = require('../utils/logger.js');

module.exports.getProductDetailPage = function getProductDetail(
  url,
  headers,
  query,
  callback,
) {
  if (url === null || url === '' || query.product_id === null || query.product_id === '') {
    logger.validation("[getProductDetailPage] : url and product Id is invalid or missing");
    callback(
      errorconfig.formatErrorObject(
        errorconfig.errorlist.error_400.invalid_params,
      ),
    );
    return;
  }
  async.parallel(
    [
      productViewById.bind(
        null,
        headers.storeId,
        query.product_id,
      )
    ],
    (err, result) => {
      if (err) {
        logger.error("Error while calling getProductDetailPage API");
        callback(err);
      } else {
        logger.debug('Got all the origin resposes');
        callback(null, transformBodyJSONResult(result));
      }
    },
  );
};

/* get products by id*/
const productViewById = function (store_id, product_id, callback) {
  const origin_url = constants.productViewById.replace('{{storeId}}', store_id).replace('{{productid}}', product_id);
  origin.getResponse(
    originMethod,
    origin_url,
    null,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        errorconfig.handleWCSError(response.status, response.body, callback);
      }
    }
  );
}

const getJson = function (originResponse, reqHeader, callback) {
  const defaultzip = '';
  const catArray = getCategoryNames(originResponse);
  const returnJSON = {};
  returnJSON['totalRecords'] = originResponse.recordSetTotal;
  returnJSON['defaultzip'] = defaultzip;
  returnJSON['catArray'] = catArray;
  callback(null, returnJSON);
};

function transformBodyJSONResult(bodyData) {
  const transformedHomeBodyJson = {
    "product_view": bodyData[0] ? bodyData[0] : '',
  };
  return transformedHomeBodyJson;
};
