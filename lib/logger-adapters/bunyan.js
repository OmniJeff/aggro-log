module.exports = function (logger) {

    return {

        logger: logger,

        trace: function (fields, msg) {
            fields.level = 10;
            this.logger.trace(fields, msg)
        },
        debug: function (fields, msg) {
            fields.level = 20;
            this.logger.debug(fields, msg)
        },
        info: function (fields, msg) {
            fields.level = 30;
            this.logger.info(fields, msg)
        },
        warn: function (fields, msg) {
            fields.level = 40;
            this.logger.warn(fields, msg)
        },
        error: function (fields, msg) {
            fields.level = 50;
            this.logger.error(fields, msg)
        }
    };
}