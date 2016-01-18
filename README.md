# restify-health-router

A interface for restify that lets you perform a health check on your server.

# Installation

```bash
$ npm install --save restify-health-router
```

# Example

```javascript
const healthRouterFactory = require('restify-health-router');
const healthRouter = healthRouterFactory.create();

healthRouter.applyRoutes(server);
```
