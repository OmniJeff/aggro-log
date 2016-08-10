aggro-log
=========

A log aggregator so you can log summaries of stuff and save space.

### example

```javascript
    var Bunyan = require('bunyan');
    
    var cfg = {
        logger: Bunyan.createLogger({
            name: 'my-bunyan-log'
        }),
        logType: 'bunyan',
        logIntervalMs: 10000,  // 10 seconds
    };
    
    var aggroLog = require('aggro-log');
    
    for (var i = 0; i < 10; i++) {
        aggroLog.info('it looped');
    }
    
    // Bunyan hasn't logged anything yet ...
     
    setTimeout(function () {
        // Now, Bunyan will have logged something like:
        // {hostname: 'myHost', intervalCount: 10, level: 30, msg: 'it looped', logIntervalMs: 10773, name: 'my-bunyan-log', pid: 30579}
    }, 11000);

```