'use strict';

const logger = (req, res, next) => {
  console.log('LOG:', req.method, req.path);
  next();
};

module.exports = logger;
