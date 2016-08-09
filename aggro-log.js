// Load modules
var LogType = require('./lib/log-type');
var ObjectHash = require('object-hash');
var Hoek = require('hoek');
var Joi = require('joi');


// Declare internals
var internals = {
    defaults: {
        logger: console,
        logIntervalMs: 1000 * 60,  // 60 seconds
        logType: 'console'
    }
};

module.exports = function (cfg) {

    var settings = Hoek.applyToDefaultsWithShallow(internals.defaults, cfg || {}, ['logger']);

    var settingsSchema = Joi.object().keys({
        logIntervalMs: Joi.number().integer().min(1),
        logger: Joi.object(),
        logType: Joi.string().regex(/\bconsole|\bbunyan/)
    }).with('logIntervalMs', 'logger', 'logType');

    settings = Joi.validate(settings, settingsSchema, function (err, validatedSettings) {

        if (err) {
            throw new Error(err);
        }
        return validatedSettings;
    });

    return {
        logger: LogType(settings.logger, settings.logType),
        logIntervalMs: settings.logIntervalMs,
        logs: {},

        trace: function (fields, msg, hashReplacer) {
            internals.log(this, 'trace', fields, msg, hashReplacer);
        },
        debug: function (fields, msg, hashReplacer) {
            internals.log(this, 'debug', fields, msg, hashReplacer);
        },
        info: function (fields, msg, hashReplacer) {
            internals.log(this, 'info', fields, msg, hashReplacer);
        },
        warn: function (fields, msg, hashReplacer) {
            internals.log(this, 'warn', fields, msg, hashReplacer);
        },
        error: function (fields, msg, hashReplacer) {
            internals.log(this, 'error', fields, msg, hashReplacer);
        },
        flush: function () {
            internals.flush(this);
        }
    }
};

internals.log = function (log, level, fields, msg, hashReplacer) {

    // fields is optional
    if (typeof fields === 'string') {
        hashReplacer = msg;
        msg = fields;
        fields = {};
    }

    var msgKey = internals.getHash(msg, fields, hashReplacer);

    if (!log.logs.hasOwnProperty(msgKey)) {
        
        log.logs[msgKey] = {
            fields: fields,
            msg: msg,
            intervalCount: 0,
            intervalStartTime: new Date(),
            level: level
        };

        internals.startLogging(log, msgKey);
    }

    ++log.logs[msgKey].intervalCount;
};

internals.startLogging = function (log, msgKey) {

    var emitLog = function () {
        internals.emitLogMsg(log, msgKey);
    };

    log.logs[msgKey].timeout = setTimeout(emitLog, log.logIntervalMs);
};

internals.emitLogMsg = function (log, msgKey) {

    var logger = log.logger;
    var aggregatedLog = log.logs[msgKey];
    var level = aggregatedLog.level;
    var fields = aggregatedLog.fields;
    var msg = aggregatedLog.msg;
    
    var fieldsToLog = {
        logIntervalMs: new Date() - aggregatedLog.intervalStartTime,
        intervalCount: aggregatedLog.intervalCount,
        level: level
    };
    
    Hoek.merge(fieldsToLog,  fields);

    switch (level) {
        case 'trace':
            logger.trace(fieldsToLog, msg);
            break;
        case 'debug':
            logger.debug(fieldsToLog, msg);
            break;
        case 'info':
            logger.info(fieldsToLog, msg);
            break;
        case 'warn':
            logger.warn(fieldsToLog, msg);
            break;
        case 'error':
            logger.error(fieldsToLog, msg);
            break;
    }

    clearTimeout(aggregatedLog.timeout);
    delete log.logs[msgKey];
};

internals.getHash = function (msg, fields, replacer) {

    // replacer is optional and can be a string or function
    if (typeof replacer === 'string') {

        replacer = function () {

            return {
                logAggregatorMsg: replacer
            };
        }
    }
    else if (typeof replacer != 'function') {

        replacer = function (fields, msg) {

            fields.logAggregatorMsg = msg;
            return fields;
        };
    }
    else {
        var oldReplacer = replacer;
        replacer = function (fields) {
            fields.logAggregatorMsg = msg;
            return oldReplacer(fields);
        }
    }

    var objToHash = replacer(fields, msg);

    return ObjectHash(objToHash);
};

internals.flush = function (log) {

    Object.keys(log.logs).forEach(function (msgKey) {
        internals.emitLogMsg(log, msgKey);
    });
};