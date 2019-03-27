'use strict';
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{console.log('LOG
 * @param  {} req.method
 * @param  {} req.path
 * @param  {} ;next(
 */
const logger = (req, res, next) => {
  console.log('LOG:', req.method, req.path);
  next();
};

module.exports = logger;
