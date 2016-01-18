'use strict';

const restify = require('restify');
const request = require('supertest');
const Health = require('../lib/health');
const HTTP = require('../test/test.data.js').HTTP;

describe('/health resource test', function () {
  let server;

  beforeEach(function () {

    server = restify.createServer();

  });

  it('Should hit /health and return 200 OK', function () {

    Health().applyRoutes(server);

    return request(server)
        .get('/health')
        .expect(HTTP.OPERATION_OK);
  });

  afterEach(function () {
    return server.close();
  });
});
