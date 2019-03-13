const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const constants = require('../utils/constants');
const errorconfig = require('../utils/errorconfig.js');

module.exports.getOrdersList = function getOrdersList(
  params,
  headers,
  callback,
) {
  const response = {
    message: 'WCS Integration Pending',
  };
  callback(null, response);
};
