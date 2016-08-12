aggro-log
=========

A log aggregator so you can log summaries of stuff and save space.

### Example

```javascript
    // Bunyan is one supported log type
    var bunyan = require('bunyan').createLogger({
        name: 'my-bunyan-log'
    });
    
    // configure aggroLog
    var aggroLogCfg = {
        logger: bunyan,
        logType: 'bunyan',
        logIntervalMs: 10000  // emit aggregated log messages every 10 seconds
    };
    
    // create the aggroLog
    var aggroLog = require('../aggro-log')(aggroLogCfg);
    
    // log a message at info level 10 times
    for (var i = 0; i < 10; i++) {
        aggroLog.info('it looped');
    }
    
    // Bunyan hasn't logged anything yet ...
    
    setTimeout(function () {
        // About 11 seconds later ...
        
        // Now, Bunyan will have logged an aggregated summary of the 10 logs done above,
        // indicating that 'it looped' was logged 10 times in 10.773 seconds:
        // {
        //     "hostname": "myHost",
        //     "intervalCount": 10,
        //     "level": 30,
        //     "msg": "it looped",
        //     "logIntervalMs": 10773,
        //     "name": "my-bunyan-log",
        //     "pid": 30579
        // }
    }, 11000);

```

## Supported loggers

### console
```javascript
    // configure aggroLog
    var aggroLogCfg = {
        logger: console,
        logType: 'console',
        logIntervalMs: 10000  // emit aggregated log messages every 10 seconds
    };
    
    // create the aggroLog
    var aggroLog = require('../aggro-log')(aggroLogCfg);
    
    // log a message at info level 10 times
    for (var i = 0; i < 10; i++) {
        aggroLog.info('it looped');
    }
    
    // Nothing has been logged yet ...
    
    setTimeout(function () {
        // About 11 seconds later ...
        
        // Now, console will have logged an aggregated summary of the 10 logs done above,
        // indicating that 'it looped' was logged 10 times in 10.773 seconds:
        // {
        //     "hostname": "myHost",
        //     "intervalCount": 10,
        //     "level": 30,
        //     "msg": "it looped",
        //     "logIntervalMs": 10773,
        //     "name": "my-bunyan-log",
        //     "pid": 30579
        // }
    }, 11000);