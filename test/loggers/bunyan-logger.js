var Bunyan = require('bunyan');

exports.createLogger = function () {
    
    var ringBuffer = new Bunyan.RingBuffer({ limit: 1000 });
    
    return {
    
        ringBuffer: ringBuffer,
    
        logger: Bunyan.createLogger({
            name: 'bunyan-test-logger',
            streams: [
                {
                    level: 'trace',
                    type: 'raw',
                    stream: ringBuffer
                }
            ]
        })
    };
};