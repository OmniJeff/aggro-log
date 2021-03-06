// Bunyan is one supported log type
var bunyan = require('bunyan').createLogger({
    name: 'my-bunyan-log'
});

// configure aggroLog
var aggroLogCfg = {
    logger: bunyan,
    logType: 'bunyan',
    logIntervalMs: 3000  // emit aggregated log messages every 3 seconds
};

// create the aggroLog
var aggroLog = require('../aggro-log')(aggroLogCfg);

// log a message at info level 10 times
for (var i = 0; i < 10; i++) {
    aggroLog.info('it looped');
}

// pino hasn't logged anything yet ...

setTimeout(function () {
    // About 4 seconds later ...
    
    // Now, pino will have logged an aggregated summary of the 10 logs done above,
    // indicating that 'it looped' was logged 10 times in 4.005 seconds:
    // {
    //     "hostname": "myHost",
    //     "intervalCount": 10,
    //     "level": 30,
    //     "msg": "it looped",
    //     "logIntervalMs": 4005,
    //     "name": "my-bunyan-log",
    //     "pid": 30579
    // }
}, 4000);