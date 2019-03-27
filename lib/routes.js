'use strict';

// Create router
const router = require('express').Router();

// Database
const db = require('./db.js');

// Middleware/validator
const logger = require('./logger.js');
const validate = require('./validate.js');

// GET all Categories
const getAllCategories = (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
};

// GET by ID
const getCategory = (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record[0]);
};

// POST
const postCategory = (req, res, next) => {
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

// PUT
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
const deleteCategory = (req, res, next) => {
  const { id } = req.params;
  const index = db.findIndex(record => record.id === parseInt(id));
  db.splice(index, 1);
  res.json({});
};

// Routes
router.use(logger);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);
router.post('/categories', postCategory);
router.put('/categories/:id', putCategory);
router.delete('/categories/:id', deleteCategory);

// Export
module.exports = router;
