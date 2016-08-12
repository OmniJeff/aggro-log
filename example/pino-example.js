var stream = require('stream');
var util = require('util');

var buffer = [];

function EchoStream () {
    stream.Writable.call(this);
}

util.inherits(EchoStream, stream.Writable);

EchoStream.prototype._write = function (chunk, encoding, done) {
    buffer.push(chunk.toString());
    done();
};

var myStream = new EchoStream();

var pino = require('pino')({ name: 'myapp', encoding: 'string' }, myStream);

// configure aggroLog
var aggroLogCfg = {
    logger: pino,
    logType: 'pino',
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