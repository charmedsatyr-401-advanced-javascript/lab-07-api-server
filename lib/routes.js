'use strict';

// Create router
const router = require('express').Router();

// Database
const db = require('./db.js');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

// Middleware/validator
const logger = require('./logger.js');
const validate = require('./validate.js');

// GET all Categories
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{letcount=db.length;letresults=db;res.json({count
 * @param  {} results}
 */
const getAllCategories = (req, res, next) => {
  let count = db.length;
  let results = db;
  res.status(200).json({ count, results });
};

// GET Category by ID
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{letid=req.params.id;letrecord=db.filter(record=>record.id===parseInt(id
 * @param  {} ;res.json(record[0]
 */
const getCategory = (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id))[0];
  let result = record ? record : {};
  res.status(200).json(result);
};

// POST Category
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{let{name}=req.body;letrecord={name};record.id=db.length+1;constvalid=validate(record
 * @param  {} ;if(valid
 * @param  {} {db.push(record
 * @param  {} ;res.json(record
 * @param  {} ;}else{res.json({}
 */
const postCategory = (req, res, next) => {
  const { name } = req.body;
  const record = { name };
  record.id = db.length + 1;

  const valid = validate(record);
  if (valid) {
    db.push(record);
    res.status(200).json(record);
  } else {
    res.status(200).json({});
  }
};

// PUT Category
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{const{id}=req.params;constindex=db.findIndex(record=>record.id===parseInt(id
 * @param  {} ;const{name}=req.body;constnewRecord={name};newRecord.id=id;constvalid=validate(newRecord
 * @param  {} ;if(valid
 * @param  {} {db.splice(index
 * @param  {} 1
 * @param  {} newRecord
 * @param  {} ;res.json(newRecord
 * @param  {} ;}else{res.json({}
 */
const putCategory = (req, res, next) => {
  const { id } = req.params;
  const index = db.findIndex(record => record.id === parseInt(id));
  const { name } = req.body;
  const newRecord = { name };
  newRecord.id = id;

  const valid = validate(newRecord);
  if (valid) {
    db.splice(index, 1, newRecord);
    res.status(200).json(newRecord);
  } else {
    res.status(200).json({});
  }
};

// DELETE
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{const{id}=req.params;constindex=db.findIndex(record=>record.id===parseInt(id
 * @param  {} ;db.splice(index
 * @param  {} 1
 * @param  {} ;res.json({}
 */
const deleteCategory = (req, res, next) => {
  const { id } = req.params;
  const index = db.findIndex(record => record.id === parseInt(id));
  db.splice(index, 1);
  res.status(200).json({});
};

// 404 Not Found handling
/**
 * @param  {} req
 * @param  {} res
 * @param  {} =>{res.status(404
 * @param  {} .send('Error404
 */
const notFoundHandler = (req, res) => {
  res.status(404).send('Error 404: File not found');
};

// 500 Error handling
/**
 * @param  {} err
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{res.status(500
 * @param  {err} .send(`Error500
 */
const errorHandler = (err, req, res, next) => {
  next && null;
  res.status(500).send(`Error 500: ${err}`);
};

// Routes
router.use(logger);
router.use('/foo', errorHandler); // Server error testing
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);
router.post('/categories', postCategory);
router.put('/categories/:id', putCategory);
router.delete('/categories/:id', deleteCategory);
router.use('/*', notFoundHandler);
router.use(errorHandler);

// Export
module.exports = router;
