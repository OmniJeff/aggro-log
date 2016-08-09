var util = require('util');

var internals = {};

module.exports = function (logger) {

    return {

        logger: logger,

        trace: function (fields, msg) { internals.trace(this.logger, fields, msg) },
        debug: function (fields, msg) { internals.debug(this.logger, fields, msg) },
        info: function (fields, msg) { internals.info(this.logger, fields, msg) },
        warn: function (fields, msg) { internals.warn(this.logger, fields, msg) },
        error: function (fields, msg) { internals.error(this.logger, fields, msg) }
    };
};

internals.trace = function (logger, fields, msg) {
    // Aggregating stack traces is a no
    fields.msg = msg;
    logger.log(JSON.stringify(fields));
};

internals.debug = function (logger, fields, msg) {
    fields.msg = msg;
    logger.log(JSON.stringify(fields));
};

internals.info = function (logger, fields, msg) {
    fields.msg = msg;
    logger.log(JSON.stringify(fields));
};

internals.warn = function (logger, fields, msg) {
    fields.msg = msg;
    logger.warn(JSON.stringify(fields));
};

internals.error = function (logger, fields, msg) {
    fields.msg = msg;
    logger.error(JSON.stringify(fields));
};