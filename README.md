aggro-log
=========

A log aggregator so you can log summaries of stuff and save space.

### example

```javascript
    var Bunyan = require('bunyan');  // Bunyan is one supported log type
    
    // configure aggroLog
    var aggroLogCfg = {
        logger: Bunyan.createLogger({
            name: 'my-bunyan-log'
        }),
        logType: 'bunyan',
        logIntervalMs: 10000,  // emit aggregated log messages every 10 seconds
    };
    
    // create the aggroLog
    var aggroLog = require('aggro-log')(aggroLogCfg);
    
    // log a message at info level 10 times
    for (var i = 0; i < 10; i++) {
        aggroLog.info('it looped');
    }
    
    // Bunyan hasn't logged anything yet ...
     
    setTimeout(function () {
        // About 11 seconds later ...
        
        // Now, Bunyan will have logged an aggregated summary of the 10 logs done above:
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