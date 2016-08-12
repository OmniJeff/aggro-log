var ConsoleLog = require('./loggers/console-logger');
require('console.mute');


var describe = require('mocha').describe;
var before = require('mocha').before;
var beforeEach = require('mocha').beforeEach;
var afterEach = require('mocha').afterEach;
var after = require('mocha').after;
var it = require('mocha').it;
var chai = require('chai');
var expect = chai.expect;

describe('console logger', function () {
    
    it('works', function (done) {
        console.mute();
        ConsoleLog.info('bunyan works');
        var capturedStdout = console.resume().stdout;
        expect(capturedStdout.length).to.be.at.least(1);
        done();
    });
});

describe('aggregate-log using console-logger', function () {
    
    afterEach(function (next) {
        console.mute();
        setTimeout(function () {
            console.resume();
            next();
        },  100);
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
        
        console.mute();
    
        aggroLog.flush();
        var interval = setInterval(function () {
            aggroLog.trace(fields, msg);
            aggroLog.trace(fields, msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);
            
            var capturedStdout = console.resume().stdout;

            expect(capturedStdout.length).to.be.at.least(2);
            expect(capturedStdout.length).to.be.at.most(20);

            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }

            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('trace');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(20);
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
        
        console.mute();
    
        aggroLog.flush();
        var interval = setInterval(function () {
            aggroLog.debug(fields, msg);
            aggroLog.debug(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            var capturedStdout = console.resume().stdout;
            
            expect(capturedStdout.length).to.be.at.least(2);
            expect(capturedStdout.length).to.be.at.most(20);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('debug');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(20);
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
        
        console.mute();
    
        aggroLog.flush();
        var interval = setInterval(function () {
            aggroLog.info(fields, msg);
            aggroLog.info(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            var capturedStdout = console.resume().stdout;
            
            expect(capturedStdout.length).to.be.at.least(2);
            expect(capturedStdout.length).to.be.at.most(20);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStdout[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('info');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(20);
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
        
        console.mute();
        aggroLog.flush();
        
        var interval = setInterval(function () {
            aggroLog.warn(fields, msg);
            aggroLog.warn(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            var capturedStderr = console.resume().stderr;
            
            expect(capturedStderr.length).to.be.at.least(2);
            expect(capturedStderr.length).to.be.at.most(20);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStderr[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('warn');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(20);
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
        
        console.mute();
        aggroLog.flush();
        
        var interval = setInterval(function () {
            aggroLog.error(fields, msg);
            aggroLog.error(fields, msg);
        }, 1);
        
        setTimeout(function () {
    
            clearInterval(interval);
            
            var capturedStderr = console.resume().stderr;
            
            expect(capturedStderr.length).to.be.at.least(2);
            expect(capturedStderr.length).to.be.at.most(20);
            
            var logRecord;
            try {
                logRecord = JSON.parse(capturedStderr[0]);
            }
            catch (err) {
                expect(err).to.not.exist;
            }
            
            expect(logRecord).to.exist;
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal('error');
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(20);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
});