'use strict';

const restify = require('restify');
const request = require('supertest');
const createHealthRouter = require('../lib/health.router').create;
const DEFAULT_OPTIONS = require('../lib/health.router').DEFAULT_OPTIONS;

describe('health.router', function () {
  let server;

  let options;
  let expected;

  beforeEach(function () {
    options = {
      endpoint: '/tea',
      successCode: 418
    };

    expected = {
      endpoint: '/tea',
      successCode: 418
    };

    server = restify.createServer();
  });

  afterEach(function () {
    return server.close();
  });

  function endpointShouldReturnSuccessCode(options, expected) {
    createHealthRouter(options).applyRoutes(server);

    return request(server)
      .get(expected.endpoint)
      .expect(expected.successCode, expected.body);
  }

  it('Should default to /health endpoint and return specified status code: 418', function () {
    delete options.endpoint;

    expected.endpoint = DEFAULT_OPTIONS.ENDPOINT;

    endpointShouldReturnSuccessCode(options, expected);
  });

  it('Should use the configured endpoint /tea and return default 200 OK', function () {
    delete options.successCode;

    expected.successCode = DEFAULT_OPTIONS.SUCCESS_CODE;

    endpointShouldReturnSuccessCode(options, expected);
  });

  it('Should use the mentioned endpoint /tea and return specified status code: 418', function () {
    endpointShouldReturnSuccessCode(options, expected);
  });

  it('Should default to /health endpoint and return 200 OK', function () {
    delete options.endpoint;
    delete options.successCode;

    expected.endpoint = DEFAULT_OPTIONS.ENDPOINT;
    expected.successCode = DEFAULT_OPTIONS.SUCCESS_CODE;

    endpointShouldReturnSuccessCode(options, expected);
  });

  it('Should return default values for endpoint and status code when options isn\'t present', function () {

    expected.endpoint = '/health';
    expected.successCode = 200;

    endpointShouldReturnSuccessCode(null, expected);
  });

  it('Should return no message if one is not provided in options', function () {
    expected.endpoint = '/health';
    expected.successCode = 200;

    endpointShouldReturnSuccessCode(null, expected);
  });

   it('Should return a message if one is provided in options', function () {
    expected.endpoint = '/health';
    expected.successCode = 200;
    expected.endpoint = 'testMessage';
    endpointShouldReturnSuccessCode({successMessage: 'testMessage'}, expected);
  });
});
