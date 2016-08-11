var Bunyan = require('bunyan');

exports.createLogger = function () {
    
    var ringBuffer = new Bunyan.RingBuffer({ limit: 1000 });
    
    return {
    
        ringBuffer: ringBuffer,
    
        logger: Bunyan.createLogger({
            name: 'bunyan-test-logger',
            streams: [
                // uncomment to debug tests using stdout
                // {
                //     level: 'trace',
                //     stream: process.stdout
                // },
                {
                    level: 'trace',
                    type: 'raw',
                    stream: ringBuffer
                }
            ]
        })
    };
};