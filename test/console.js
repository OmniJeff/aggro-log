var ConsoleLog = require('./loggers/console-logger');
var Intercept = require('intercept-stdout');


var describe = require('mocha').describe;
var before = require('mocha').before;
var beforeEach = require('mocha').beforeEach;
var afterEach = require('mocha').afterEach;
var after = require('mocha').after;
var it = require('mocha').it;
var chai = require('chai');
var expect = chai.expect;

describe('console logger', function () {

    var unhook;
    var capturedStdout = {
        records: []
    };

    beforeEach(function () {
        unhook = Intercept(function (txt) {
            capturedStdout.records.push(txt);
        });
    });

    afterEach(function () {
        unhook();
        capturedStdout.records.length = 0;
    });

    it('works', function (done) {
        ConsoleLog.info('bunyan works');
        expect(capturedStdout.records.length).to.be.at.least(1);
        done();
    });
});

describe('aggregate-log using console-logger', function () {

    var unhook;
    var capturedStdout = {
        records: []
    };

    beforeEach(function () {
        unhook = Intercept(function (txt) {
            capturedStdout.records.push(txt);
        });
    });

    afterEach(function (next) {
        
        unhook();
        
        setTimeout(function () {  // intercept-stedout is a piece of junk
            capturedStdout.records.length = 0;
            next();
        }, 10);
    });
    
    
    it('logs stuff at trace level', function (done) {

        var logCfg = {
            logIntervalMs: 10,
            logger: ConsoleLog,
            logType: 'console'
        };

        var aggroLog = require('../aggro-log') (logCfg);

        var msg = 'logs stuff at trace level';

        var fields = {};

        expect(capturedStdout.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggroLog.trace(fields, msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(capturedStdout.records.length).to.be.at.least(2);
            expect(capturedStdout.records.length).to.be.at.most(10);

            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout.records[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }

            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('trace');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
    
    
    it('logs stuff at debug level', function (done) {
        
        var logCfg = {
            logIntervalMs: 10,
            logger: ConsoleLog,
            logType: 'console'
        };
        
        var aggroLog = require('../aggro-log') (logCfg);
        
        var msg = 'logs stuff at debug level';
        
        var fields = {};
        
        expect(capturedStdout.records.length).to.equal(0);
        
        var interval = setInterval(function () {
            aggroLog.debug(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            expect(capturedStdout.records.length).to.be.at.least(2);
            expect(capturedStdout.records.length).to.be.at.most(10);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout.records[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('debug');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
    
    
    it('logs stuff at info level', function (done) {
        
        var logCfg = {
            logIntervalMs: 10,
            logger: ConsoleLog,
            logType: 'console'
        };
        
        var aggroLog = require('../aggro-log') (logCfg);
        
        var msg = 'logs stuff at info level';
        
        var fields = {};
        
        expect(capturedStdout.records.length).to.equal(0);
        
        var interval = setInterval(function () {
            aggroLog.info(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            expect(capturedStdout.records.length).to.be.at.least(2);
            expect(capturedStdout.records.length).to.be.at.most(10);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout.records[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('info');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
    
    
    it('logs stuff at warn level', function (done) {
        
        var logCfg = {
            logIntervalMs: 10,
            logger: ConsoleLog,
            logType: 'console'
        };
        
        var aggroLog = require('../aggro-log') (logCfg);
        
        var msg = 'logs stuff at warn level';
        
        var fields = {};
        
        expect(capturedStdout.records.length).to.equal(0);
        
        var interval = setInterval(function () {
            aggroLog.warn(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            expect(capturedStdout.records.length).to.be.at.least(2);
            expect(capturedStdout.records.length).to.be.at.most(10);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout.records[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('warn');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
    
    
    it('logs stuff at error level', function (done) {
        
        var logCfg = {
            logIntervalMs: 10,
            logger: ConsoleLog,
            logType: 'console'
        };
        
        var aggroLog = require('../aggro-log') (logCfg);
        
        var msg = 'logs stuff at error level';
        
        var fields = {};
        
        expect(capturedStdout.records.length).to.equal(0);
        
        var interval = setInterval(function () {
            aggroLog.error(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            expect(capturedStdout.records.length).to.be.at.least(2);
            expect(capturedStdout.records.length).to.be.at.most(10);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout.records[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('error');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
});