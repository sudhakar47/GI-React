const async = require('async');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const errorconfig = require('../utils/errorconfig.js');
const espotsHandler = require('./espotshandler');
const espots = require('../configs/espotnames');
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const filter = require('../filters/filter');
const headerUtils = require('../utils/headerutil');
const bodyEspotName = {
  exploreFurniture: espots.homebody.exploreFurniture,
  heroBanner: espots.homebody.heroBanner,
  bestSeller: espots.homebody.bestSeller,
  customerStories: espots.homebody.customerStories,
};

module.exports.getCategories = function getCategories(
  urlParam,
  headers,
  callback,
) {
  logger.debug('Call to get categories id: ');
  logger.debug(`Params: ${urlParam}`);

  switch (urlParam) {
    case 'top':
      getCategoriesData('@top', headers, callback); // To Get only TOP Categories
      break;

    case 'navigation':
      getCategoriesData('@top?depthAndLimit=25,0', headers, callback); // To Get Category Navigation Data
      break;

    default:
      // default through error as no target found
      callback(errorUtils.errorlist.resource_not_found);
  }
};

function getCategoriesData(urlParam, headers, callback) {
  const reqHeaders = headerUtils.getWCSHeaders(headers);
  const originUrl = constants.TopCategoryHierarchy.replace(
    '{{storeId}}',
    headers.storeId,
  ).replace('{{urlParam}}', urlParam);
  origin.getResponse(
    originMethod,
    originUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const resJson = {
          categoryArray: filter.filterData('categorynavigation', response.body), // Category Navigation Filter
        };
        callback(null, resJson);
        return;
      }
      callback(errorUtils.handleWCSError(response));
      // callback(null, filter.filterData('categorynavigation', response));
    },
  );
}

module.exports.productsByCategories = function productsByCategories(
  url,
  headers,
  query,
  callback,
) {
  const url_param = url;
  if (url_param === null || url_param === '' || !query.id) {
    callback(
      formatPrintErrorMessage('Error', 'Mandatory Parameter not set', null),
    );
    return;
  }
  async.parallel(
    [
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.exploreFurniture,
      ),
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.heroBanner,
      ),
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.bestSeller,
      ),
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.customerStories,
      ),
      categoryViewByCategoryId.bind(
        null,
        headers.storeId,
        query.id,
      )
    ],
    (err, result) => {
      if (err) {
        if (err instanceof Error === false) {
          callback(null, err);
        } else {
          callback(err);
        }
      } else {
        logger.debug('Got all the origin resposes');
        callback(null, transformBodyJSONResult(result));
      }
    },
  );
};

module.exports.getProductTable = function getProductTable(
  url,
  headers,
  query,
  callback,
) {
  if (url === null || url === '' || query.id === null || query.id === '') {
    callback(
      errorconfig.formatErrorObject(
        errorconfig.errorlist.error_400.invalid_params,
      ),
    );
    return;
  }
  async.parallel(
    [
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.exploreFurniture,
      ),
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.heroBanner,
      ),
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.bestSeller,
      ),
      espotsHandler.getEspotsData.bind(
        null,
        headers.storeId,
        bodyEspotName.customerStories,
      ),
      categoryViewByCategoryId.bind(null, headers.storeId, query.id),
      productViewByCategoryId.bind(null, headers.storeId, query.id),
    ],
    (err, result) => {
      if (err) {
        if (err instanceof Error === false) {
          callback(null, err);
        } else {
          callback(err);
        }
      } else {
        logger.debug('Got all the origin resposes');
        callback(null, transformBodyJSONResult(result));
      }
    },
  );
};

/* Get sub categories by category id*/
const categoryViewByCategoryId = function categoryViewByCategoryId(store_id, query_id, callback) {
  const origin_url = constants.categoryViewByParentId.replace('{{storeId}}', store_id).replace('{{queryId}}', query_id);
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
};

/* get products by category id*/
const productViewByCategoryId = function productViewByCategoryId(store_id, category_id, callback) {
  const origin_url = constants.productViewByCategoryId.replace('{{storeId}}', store_id).replace('{{categoryId}}', category_id);
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

function transformBodyJSONResult(bodyData) {
  const transformedHomeBodyJson = {
    "espot_1": bodyData[0] ? bodyData[0] : '',
    "espot_2": bodyData[1] ? bodyData[1] : '',
    "espot_3": bodyData[2] ? bodyData[2] : '',
    "espot_4": bodyData[3] ? bodyData[3] : '',
    "category_view": bodyData[4] ? bodyData[4] : '',
    "product_view": bodyData[5] ? bodyData[5] : '',
  };
  return transformedHomeBodyJson;
};
