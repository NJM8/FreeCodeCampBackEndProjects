const express = require('express');
const router = express.Router();
const db = require('../models');
const googleImages = require('google-images');
const searchClient = new googleImages(`${process.env.CSE_ID}`, `${process.env.API_KEY}`);

console.log(process.env.API_KEY);
console.log(process.env.CSE_ID);

router
  .route('/')
  .get((req, res, next) => {
    return res.render('index');
  });
  
router
  .route('/api/latest')
  .get((req, res, next) => {
    console.log('latest');
  });

router
  .route('/api/imagesearch/:query')
  .get((req, res, next) => {
    if (req.query.offset) {
      console.log(`offset: ${req.query.offset}`);
    }
    searchClient.search(`${req.params.query}`).then(images => {
      return res.json(images);
    }).catch(err => {
      return next(err);
    })
  });

  module.exports = router;
