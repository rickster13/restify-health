'use strict';

const restify = require('restify');
const request = require('supertest');
const health = require('../lib/health.router');

describe('/health resource test', function () {
  let server;

  let options;

  beforeEach(function () {
    options = {
      endpoint: '/tea',
      successCode: 418
    };

    server = restify.createServer();
  });

  afterEach(function () {
    return server.close();
  });

  it(`Should default to /health endpoint and return specified status code: 418`, function () {
    delete options.endpoint;

    health(options).applyRoutes(server);

    return request(server)
      .get('/health')
      .expect(418);
  });

  it(`Should use the mentioned endpoint /tea and return default 200 OK`, function () {
    delete options.successCode;

    health(options).applyRoutes(server);

    return request(server)
      .get('/tea')
      .expect(200);
  });

  it(`Should use the mentioned endpoint /tea and return specified status code: 200 OK`, function () {

    health(options).applyRoutes(server);

    return request(server)
      .get('/tea')
      .expect(418);
  });

  it(`Should default to /health endpoint and return 200 OK`, function () {
    delete options.endpoint;
    delete options.successCode;

    health(options).applyRoutes(server);

    return request(server)
        .get('/health')
        .expect(200);
  });

  it(`Should default to /health endpoint and return 200 OK`, function () {
    health().applyRoutes(server);

    return request(server)
      .get('/health')
      .expect(200);
  });
});
