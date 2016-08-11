var util = require('util');

var internals = {};

module.exports = function (logger) {

    return {

        logger: logger,

        trace: function (fields) { internals.trace(this.logger, fields) },
        debug: function (fields) { internals.debug(this.logger, fields) },
        info: function (fields) { internals.info(this.logger, fields) },
        warn: function (fields) { internals.warn(this.logger, fields) },
        error: function (fields) { internals.error(this.logger, fields) }
    };
};

internals.trace = function (logger, fields) {
    // Aggregating stack traces is a no
    logger.log(JSON.stringify(fields));
};

internals.debug = function (logger, fields) {
    logger.log(JSON.stringify(fields));
};

internals.info = function (logger, fields) {
    logger.log(JSON.stringify(fields));
};

internals.warn = function (logger, fields) {
    logger.warn(JSON.stringify(fields));
};

internals.error = function (logger, fields) {
    logger.error(JSON.stringify(fields));
};