var pino = require('./loggers/pino-logger')();

var describe = require('mocha').describe;
var before = require('mocha').before;
var beforeEach = require('mocha').beforeEach;
var afterEach = require('mocha').afterEach;
var it = require('mocha').it;
var chai = require('chai');
var expect = chai.expect;

describe('pino', function () {

    it('works', function (done) {
        pino.logger.info('pino works');
        expect(pino.buffer).to.exist;
        expect(pino.buffer.length).to.equal(1);
        pino.buffer.shift();
        done();
    });
});

describe('aggregate-log using bunyan logger', function () {

    afterEach(function (next) {
        setTimeout(function () {
            pino.buffer.length = 0;
            next();
        }, 100);
    });

    it('can be created with default settings', function (done) {

        var aggregateLog = require('../aggro-log')();

        var interval = setInterval(function () {
            aggregateLog.info('aggregate-log');
        }, 1);

        setTimeout(function () {
            expect(pino.buffer).to.exist;
            expect(pino.buffer.length).to.equal(0);

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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggroLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at trace level';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggroLog.trace(msg);
            aggroLog.trace(msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'pino'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'flushes logs';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.trace(msg);
            aggregateLog.trace(msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);
    
            expect(pino.buffer.length).to.equal(0);
    
            aggregateLog.flush();
    
            expect(pino.buffer.length).to.equal(1);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at debug level';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.debug(msg);
            aggregateLog.debug(msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at info level';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.info(msg);
            aggregateLog.info(msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at warn level';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.warn(msg);
            aggregateLog.warn(msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs stuff at error level';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.error(msg);
            aggregateLog.error(msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs fields';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar'}, 'logs fields');
            aggregateLog.error({foo: 'bar'}, 'logs fields');
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
            logType: 'bunyan'
        };

        var aggregateLog = require('../aggro-log')(logCfg);

        var msg = 'logs fields when fields.msg is present';

        expect(pino.buffer.length).to.equal(0);

        var interval = setInterval(function () {
            aggregateLog.error({foo: 'bar', msg: 'otherMsg'}, msg);
            aggregateLog.error({foo: 'bar', msg: 'otherMsg'}, msg);
        }, 1);

        setTimeout(function () {

            clearInterval(interval);

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            var logRecord = pino.buffer[0];

            expect(logRecord).to.exist;
            expect(logRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
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

            expect(pino.buffer.length).to.be.at.least(12);
            expect(pino.buffer.length).to.be.at.most(20);

            var firstLogRecord = pino.buffer[0];

            expect(firstLogRecord).to.exist;
            expect(firstLogRecord.name).to.equal('pino-test-logger');
            expect(firstLogRecord.msg).to.equal(logMsg);
            expect(firstLogRecord.level).to.equal(50);
            expect(firstLogRecord.intervalCount).to.be.at.least(2);
            expect(firstLogRecord.intervalCount).to.be.at.most(10);
            expect(firstLogRecord.foo).to.equal('bar');

            var secondLogRecord = pino.buffer[1];

            expect(secondLogRecord).to.exist;
            expect(secondLogRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
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

            expect(pino.buffer.length).to.be.at.least(12);
            expect(pino.buffer.length).to.be.at.most(20);

            var firstLogRecord = pino.buffer[0];

            expect(firstLogRecord).to.exist;
            expect(firstLogRecord.name).to.equal('pino-test-logger');
            expect(firstLogRecord.msg).to.equal(logMsg);
            expect(firstLogRecord.level).to.equal(50);
            expect(firstLogRecord.intervalCount).to.be.at.least(2);
            expect(firstLogRecord.intervalCount).to.be.at.most(10);
            expect(firstLogRecord.foo).to.equal('bar');
            expect(firstLogRecord.bing).to.not.exist;

            var secondLogRecord = pino.buffer[1];

            expect(secondLogRecord).to.exist;
            expect(secondLogRecord.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
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

            expect(pino.buffer.length).to.be.at.least(2);
            expect(pino.buffer.length).to.be.at.most(10);

            pino.buffer.forEach(function (element) {
                expect(element.name).to.equal('pino-test-logger');
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
            logger: pino.logger,
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