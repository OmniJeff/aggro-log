var Bunyan = require('./loggers/bunyan-logger');

var log;
var ringBuffer;

var describe = require('mocha').describe;
var before = require('mocha').before;
var beforeEach = require('mocha').beforeEach;
var afterEach = require('mocha').afterEach;
var it = require('mocha').it;
var chai = require('chai');
var expect = chai.expect;

describe('bunyan', function () {

    before(function (done) {
        var bunyanLog = Bunyan.createLogger();
        log = bunyanLog.logger;
        ringBuffer = bunyanLog.ringBuffer;
        done();
    });

    it('works', function (done) {
        log.info('bunyan works');
        expect(ringBuffer).to.exist;
        expect(ringBuffer.records.length).to.equal(1);
        ringBuffer.records.shift();
        done();
    });
});

describe('aggregate-log using bunyan logger', function () {

    beforeEach(function () {

        // Setup logger
        var bunyanLog = Bunyan.createLogger();
        log = bunyanLog.logger;
        ringBuffer = bunyanLog.ringBuffer;
    });

    afterEach(function () {
        ringBuffer.records.length = 0;
    });

    it('can be created with default settings', function (done) {

        var aggregateLog = require('../aggro-log')();

        var interval = setInterval(function () {
            aggregateLog.info('aggregate-log');
        }, 1);

        setTimeout(function () {
            expect(ringBuffer.records).to.exist;
            expect(ringBuffer.records.length).to.equal(0);

            clearInterval(interval);
            done();
        }, 100);
    });

    it('works with default settings', function (done) {

        var aggroLog = require('../aggro-log')();

        var msg = 'works with default settings';

        setImmediate(function () {
            aggroLog.trace(msg);
            done();
        }, 1);
    });

    it('logs stuff at trace level', function (done) {

        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };

        var aggroLog = require('../aggro-log') (logCfg);

        var msg = 'logs stuff at trace level';

        expect(ringBuffer.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggroLog.trace(msg);
            aggroLog.trace(msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);

            var logRecord = ringBuffer.records[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(10);
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });

    it('flushes logs', function (done) {

        var logCfg = {
            logIntervalMs: 60000,  // 60 seconds
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'flushes logs';

        expect(ringBuffer.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.trace(msg);
            aggregateLog.trace(msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.equal(0);

            aggregateLog.flush();

            expect(ringBuffer.records.length).to.equal(1);

            var logRecord = ringBuffer.records[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(10);
            expect(logRecord.intervalCount).to.be.at.least(25);
            expect(logRecord.intervalCount).to.be.at.most(100);
            expect(logRecord.logIntervalMs).to.be.at.least(50);
            expect(logRecord.logIntervalMs).to.be.at.most(200);
            done();
        }, 100);
    });

    it('logs stuff at debug level', function (done) {

        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at debug level';

        expect(ringBuffer.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.debug(msg);
            aggregateLog.debug(msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);

            var logRecord = ringBuffer.records[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(20);
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
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at info level';

        expect(ringBuffer.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.info(msg);
            aggregateLog.info(msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);

            var logRecord = ringBuffer.records[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(30);
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
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at warn level';

        expect(ringBuffer.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.warn(msg);
            aggregateLog.warn(msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);

            var logRecord = ringBuffer.records[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(40);
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
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at error level';

        expect(ringBuffer.records.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.error(msg);
            aggregateLog.error(msg);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);

            var logRecord = ringBuffer.records[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(50);
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            done();
        }, 100);
    });
    
    it('logs fields', function (done) {
        
        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };
        
        var aggregateLog = require('../aggro-log')(logCfg);
        
        var msg = 'logs fields';
        
        expect(ringBuffer.records.length).to.equal(0);
        
        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar'}, 'logs fields');
            aggregateLog.error({foo: 'bar'}, 'logs fields');
        }, 1);
        
        setTimeout(function () {
            
            clearInterval(interval);
            
            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);
            
            var logRecord = ringBuffer.records[0];
            
            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.msg).to.equal(msg);
            expect(logRecord.level).to.equal(50);
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            expect(logRecord.foo).to.equal('bar');
            done();
        }, 100);
    });
    
    it('logs fields when fields.msg is present', function (done) {
        
        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };
        
        var aggregateLog = require('../aggro-log')(logCfg);
        
        var msg = 'logs fields when fields.msg is present';
        
        expect(ringBuffer.records.length).to.equal(0);
        
        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar', msg: 'otherMsg'}, msg);
            aggregateLog.error({foo: 'bar', msg: 'otherMsg'}, msg);
        }, 1);
        
        setTimeout(function () {
            
            clearInterval(interval);
            
            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);
            
            var logRecord = ringBuffer.records[0];
            
            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('bunyan-test-logger');
            expect(logRecord.logAggregatorMsg).to.equal(msg);
            expect(logRecord.msg).to.equal('otherMsg');
            expect(logRecord.level).to.equal(50);
            expect(logRecord.intervalCount).to.be.at.least(2);
            expect(logRecord.intervalCount).to.be.at.most(10);
            expect(logRecord.logIntervalMs).to.be.at.least(logCfg.logIntervalMs / 2);
            expect(logRecord.logIntervalMs).to.be.at.most(logCfg.logIntervalMs * 2);
            expect(logRecord.foo).to.equal('bar');
            done();
        }, 100);
    });

    it('aggregates using a calculateKey function', function (done) {

        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);
        var logMsg = 'aggregates using a calculateKey function';

        var calculateKey = function (fields) {
            return {
                msg: logMsg + ' ' + fields.foo
            };
        };

        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar'}, logMsg, calculateKey);
            aggregateLog.error({foo: 'bar'}, logMsg, calculateKey);
            aggregateLog.error({baz: 'corn'}, logMsg, calculateKey);
            aggregateLog.error({baz: 'corn'}, logMsg, calculateKey);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(12);
            expect(ringBuffer.records.length).to.be.at.most(20);

            var firstLogRecord = ringBuffer.records[0];

            expect(firstLogRecord).to.exist;
            expect(firstLogRecord.name).to.equal('bunyan-test-logger');
            expect(firstLogRecord.msg).to.equal(logMsg);
            expect(firstLogRecord.level).to.equal(50);
            expect(firstLogRecord.intervalCount).to.be.at.least(2);
            expect(firstLogRecord.intervalCount).to.be.at.most(10);
            expect(firstLogRecord.foo).to.equal('bar');

            var secondLogRecord = ringBuffer.records[1];

            expect(secondLogRecord).to.exist;
            expect(secondLogRecord.name).to.equal('bunyan-test-logger');
            expect(secondLogRecord.msg).to.equal(logMsg);
            expect(secondLogRecord.level).to.equal(50);
            expect(secondLogRecord.intervalCount).to.be.at.least(2);
            expect(secondLogRecord.intervalCount).to.be.at.most(10);
            expect(secondLogRecord.baz).to.equal('corn');
            done();
        }, 100);
    });

    it('aggregates using a calculateKey function that deletes fields', function (done) {

        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);
        var logMsg = 'aggregates using a calculateKey function';

        var calculateKey = function (fields) {
            delete fields.bing;
            return fields;
        };

        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar', bing: 'bong'}, logMsg, calculateKey);
            aggregateLog.error({foo: 'bar', bing: 'bong'}, logMsg, calculateKey);
            aggregateLog.error({baz: 'corn', bing: 'bong'}, logMsg, calculateKey);
            aggregateLog.error({baz: 'corn', bing: 'bong'}, logMsg, calculateKey);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(12);
            expect(ringBuffer.records.length).to.be.at.most(20);

            var firstLogRecord = ringBuffer.records[0];

            expect(firstLogRecord).to.exist;
            expect(firstLogRecord.name).to.equal('bunyan-test-logger');
            expect(firstLogRecord.msg).to.equal(logMsg);
            expect(firstLogRecord.level).to.equal(50);
            expect(firstLogRecord.intervalCount).to.be.at.least(2);
            expect(firstLogRecord.intervalCount).to.be.at.most(10);
            expect(firstLogRecord.foo).to.equal('bar');
            expect(firstLogRecord.bing).to.not.exist;

            var secondLogRecord = ringBuffer.records[1];

            expect(secondLogRecord).to.exist;
            expect(secondLogRecord.name).to.equal('bunyan-test-logger');
            expect(secondLogRecord.msg).to.equal(logMsg);
            expect(secondLogRecord.level).to.equal(50);
            expect(secondLogRecord.intervalCount).to.be.at.least(2);
            expect(secondLogRecord.intervalCount).to.be.at.most(10);
            expect(secondLogRecord.baz).to.equal('corn');
            expect(secondLogRecord.bing).to.not.exist;
            done();
        }, 100);
    });

    it('aggregates using a calculateKey string', function (done) {

        var logCfg = {
            logIntervalMs: 10,
            logger: log,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);
        var logMsg1 = 'aggregates using a calculateKey string';
        var logMsg2 = 'BLAH BLAH BLAH';
        var calculateKey = 'we will just use this as our key:$(#$**$(#';

        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar'}, logMsg1, calculateKey);
            aggregateLog.error({foo: 'bar'}, logMsg1, calculateKey);
            aggregateLog.error({baz: 'corn'}, logMsg2, calculateKey);
            aggregateLog.error({baz: 'corn'}, logMsg2, calculateKey);
        }, 1);

        setTimeout(function () {
    
            clearInterval(interval);

            expect(ringBuffer.records.length).to.be.at.least(2);
            expect(ringBuffer.records.length).to.be.at.most(10);

            ringBuffer.records.forEach(function (element) {
                expect(element.name).to.equal('bunyan-test-logger');
                expect(element.msg).to.equal(logMsg1);
                expect(element.level).to.equal(50);
                expect(element.intervalCount).to.be.at.most(20);
                expect(element.foo).to.equal('bar');
                expect(element.baz).to.not.exist;
            });
            done();
        }, 100);
    });

    it('throws when given invalid settings', function (done) {

        var logCfg = {
            logIntervalMs: 'foo',
            logger: log,
            logType: 'bunyan'
        };

        try {
            var aggregateLog = require('../aggro-log')(logCfg);
        }
        catch (err) {
            expect(err).to.exist;
            done();
        }
    });
});