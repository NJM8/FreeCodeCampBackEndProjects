const express = require('express');
const router = express.Router();
const db = require('../models');

router
  .route('/')
  .get((req, res, next) => {
    return res.render('index');
  });
  
router
  .route('/api/latest')
  .get((req, res, next) => {
    console.log('history');
  });

router
  .route('/api/imagesearch/:query')
  .get((req, res, next) => {
    if (req.query.offset) {
      console.log(`offset: ${req.query.offset}`);
    }
    console.log(`query: ${req.params.query}`);
  });

  module.exports = router;
