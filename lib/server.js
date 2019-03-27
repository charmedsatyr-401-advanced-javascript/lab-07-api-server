'use strict';

// Express
const express = require('express');
const app = express();

// Routes
const routes = require('./routes.js');

// Use routes
app.use(express.json());
app.use(routes);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
