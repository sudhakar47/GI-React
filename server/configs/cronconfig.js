'use strict';
var schedule = require('node-schedule');
 
//        schedule time configuration
//        *    *    *    *    *    *
//        ┬    ┬    ┬    ┬    ┬    ┬
//        |    │    │    │    │    |
//        │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
//        │    │    │    │    └───── month (1 - 12)
//        │    │    │    └────────── day of month (1 - 31)
//        │    │    └─────────────── hour (0 - 23)
//        │    └──────────────────── minute (0 - 59)
//        └───────────────────────── second (0 - 59, OPTIONAL)

let cronSchedule = {
    'categories':'*/45 * * * *',
    'heartbeat':'*/1 * * * *',
    'apilever':'*/1 * * * *'
};

module.exports.getRule = function(cronName){
    return cronSchedule[cronName];
}
