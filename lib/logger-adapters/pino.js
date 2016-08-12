module.exports = function (logger) {
    
    return {
        
        logger: logger,
        
        trace: function (fields) {
            fields.level = 10;
            this.logger.trace(fields, fields.msg)
        },
        debug: function (fields) {
            fields.level = 20;
            this.logger.debug(fields, fields.msg)
        },
        info: function (fields) {
            fields.level = 30;
            this.logger.info(fields, fields.msg)
        },
        warn: function (fields) {
            fields.level = 40;
            this.logger.warn(fields, fields.msg)
        },
        error: function (fields) {
            fields.level = 50;
            this.logger.error(fields, fields.msg)
        },
        fatal: function (fields) {
            fields.level = 60;
            this.logger.fatal(fields, fields.msg)
        }
    };
};