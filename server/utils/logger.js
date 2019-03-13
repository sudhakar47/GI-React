let winston = require('winston'),
  fs = require('fs'),
  logDir = 'log',
  env = process.env.ENV || 'LOCAL',
  instance = process.env.INSTANCE || 'API',
  logger;

require('winston-daily-rotate-file');

//winston default logging levels { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
let logLevels = {
  levels: {
    'wcserror': 0,
    'validation': 1,
    'error': 2,
    'warn': 3,
    'debug': 4,
    'info': 5,
    'verbose': 6,
    'silly': 7
  },
  colour: {
    error: 'red'
  }
};

let loggers = [];
let contextService = require('request-context');
const moment = require('moment');
const TIMESTAMP_FORMAT = 'DD-MM-YYYY HH:mm:ss a';

//winston.setLevels(winston.config.npm.levels);
//winston.setLevels(logLevels.levels);
//winston.addColors(logLevels.levels.colors);

if (!fs.existsSync(logDir)) {
  //For not DEV no need to create this dir
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

//////////////////////////////////////////////////////////////
//////////To Be used later for exception handling/////////////
//////////////////////////////////////////////////////////////

/*let exceptionLoggers = [];//[consoleLogger];
    let exceptionFileLogger = new winston.transports.File({
        filename: logDir + '/' + instance + '_' + moment().format('DD-MM-YY') + '-exceptions.log',
        timestamp: function () { return moment().format(TIMESTAMP_FORMAT) },
        colorize: true,
        handleExceptions : true,
        humanReadableUnhandledException: true,
        maxsize: 1024 * 1024 * 2 // 2MB
    });
    exceptionLoggers.push(exceptionFileLogger);*/

let consoleLogger = new winston.transports.Console({
  name: 'console-file',
  level: 'info',
  timestamp: function () {
    return moment().format(TIMESTAMP_FORMAT)
  },
  //colorize: true
});

let errorLogger = new winston.transports.DailyRotateFile({
  name: 'error-file',
  //level: logLevels.levels.error, //'error',
  level: 'error',
  json: true,
  prettyPrint: true,
  //filename: logDir + '/' + instance + '_' + moment().format('DD-MM-YY') + '-error.log',
 //  datePattern: '.yyyy-MM-ddTHH',
  datePattern: '.yyyy-MM-dd',
  //filename: "log_file.log",
  filename: logDir + '/' + instance + '_error_',
  timestamp: function () {
    return moment().format(TIMESTAMP_FORMAT)
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  maxsize: 1024 * 1024 * 20 // 2MB
});

let validationLogger = new winston.transports.DailyRotateFile({
  name: 'validation-file',
  //level: logLevels.levels.error, //'error',
  level: 'validation',
  json: true,
  prettyPrint: true,
  datePattern: '.yyyy-MM-dd',
  //filename: "log_file.log",
  filename: logDir + '/' + instance + '_validation_',
  //filename: logDir + '/' + instance + '_' + moment().format('DD-MM-YY') + '-validation.log',
  timestamp: function () {
    return moment().format(TIMESTAMP_FORMAT)
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  maxsize: 1024 * 1024 * 10 // 2MB
});

let wcserrorLogger = new winston.transports.DailyRotateFile({
  name: 'wcserror-file',
  //level: logLevels.levels.error, //'error',
  level: 'wcserror',
  json: true,
  prettyPrint: true,
  datePattern: '.yyyy-MM-dd',
  filename: logDir + '/' + instance + '_wcserror_', // + moment().format('DD-MM-YY') + '-wcserror.log',
  timestamp: function () {
    return moment().format(TIMESTAMP_FORMAT)
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  maxsize: 1024 * 1024 * 10 // 2MB
});

loggers.push(consoleLogger);
loggers.push(errorLogger);
loggers.push(wcserrorLogger);
loggers.push(validationLogger);


logger = new(winston.Logger)({
  levels: logLevels.levels,
  transports: loggers
  //exceptionHandlers: exceptionLoggers
});

logger.log = function () {
  let requestId = contextService.get('apirequest:requestid');
  if (requestId) {
    let newLogMessage = '[Req Id: ' + requestId + ']-' + arguments[1];
    arguments[1] = newLogMessage;
  }
  winston.Logger.prototype.log.apply(this, arguments);
}

module.exports = logger;
