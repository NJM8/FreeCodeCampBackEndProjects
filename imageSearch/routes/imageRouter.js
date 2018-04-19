const express = require('express');
const router = express.Router();
const db = require('../models');
const googleImages = require('google-images');

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
  const searchClient = new googleImages(`${process.env.CSE_ID}`, `${process.env.CSE_API_KEY}`);
  searchClient.search(`${req.params.query}`, { page : req.query.offset || 1 }).then(imagesResults => {
    let results = {
      query: req.params.query,
      images: []
    }
    imagesResults.forEach(image => {
      let imgObj = {
        altTag: image.description, 
        imageUrl: image.url, 
        pageUrl: image.parentPage
      }
      results.images.push(imgObj);
    })
    db.Image.create(results).then(data => {
      return res.send(data.images);
    }).catch(err => {
      return next(err);
    });
  }).catch(err => {
    return next(err);
  })
});

  module.exports = router;
