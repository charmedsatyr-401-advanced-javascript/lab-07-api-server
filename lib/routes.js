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
  res.json({ count, results });
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
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record[0]);
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
  console.log(`Received POST`);
  console.log(`Name: ${name}`);
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;

  const valid = validate(record);
  if (valid) {
    db.push(record);
    res.json(record);
  } else {
    res.json({});
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
    res.json(newRecord);
  } else {
    res.json({});
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
  res.json({});
};

// Routes
router.use(logger);
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument))
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);
router.post('/categories', postCategory);
router.put('/categories/:id', putCategory);
router.delete('/categories/:id', deleteCategory);

// Export
module.exports = router;
