// configure aggroLog
var aggroLogCfg = {
    logger: console,
    logType: 'console',
    logIntervalMs: 3000  // emit aggregated log messages every 3 seconds
};

// create the aggroLog
var aggroLog = require('../aggro-log')(aggroLogCfg);

// log a message at info level 10 times
for (var i = 0; i < 10; i++) {
    aggroLog.info('it looped');
}

// Nothing has been logged yet ...

setTimeout(function () {
    // About 4 seconds later ...
    
    // Now, console will have logged an aggregated summary of the 10 logs done above,
    // indicating that 'it looped' was logged 10 times in 3.005 seconds:
    //
    // {"logIntervalMs":3005,"intervalCount":10,"level":"info","msg":"it looped","logAggregatorMsg":"it looped"}
}, 4000);