module.exports = function(logger, loggerType) {

    var aggroLog;

    switch (loggerType) {
        case 'console':
            aggroLog = require('./logger-adapters/console')(logger);
            break;
        case 'bunyan':
            aggroLog = require('./logger-adapters/bunyan')(logger);
            break;
    }
    return aggroLog;
};