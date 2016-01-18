'use strict';

const Router = require('restify-router').Router;

/**
 * Creates a router that exposes an application's health check endpoint at /health
 * @returns router
 */
function healthRouter() {
  const router = new Router();
  router.get ('/health', function (req, res, next) {
    res.send(200);
    next();
  });
  return router;
}

module.exports = healthRouter;
