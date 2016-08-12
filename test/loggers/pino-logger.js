var stream = require('stream');
var util = require('util');

var buffer = [];

function EchoStream () {
    stream.Writable.call(this);
}

util.inherits(EchoStream, stream.Writable);

EchoStream.prototype._write = function (chunk, encoding, done) {
    buffer.push(JSON.parse(chunk.toString()));
    done();
};

var myStream = new EchoStream();

var pino = require('pino')({ name: 'pino-test-logger', encoding: 'string', level: 'trace' }, myStream);

module.exports = function () {
    
    return {
    
        buffer: buffer,
        logger: pino
    };
};