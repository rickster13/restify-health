'use strict';

const Router = require('restify-router').Router;

const DEFAULT_OPTIONS = {
  ENDPOINT: '/health',
  SUCCESS_CODE: 200
};
/**
 * Creates a router that exposes an application's health check endpoint at /health
 * @returns router
 * @param options
 */
function create(options) {
  const safeOptions = options ? options : {};

  const endpoint = safeOptions.endpoint || '/health';
  const successCode = safeOptions.successCode || 200;

  const router = new Router();
  router.get(endpoint, function (req, res, next) {
    res.send(successCode);
    next();
  });
  return router;
}

module.exports = {
  create,
  DEFAULT_OPTIONS
};
