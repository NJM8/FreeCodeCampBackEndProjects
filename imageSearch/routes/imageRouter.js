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
  return db.Image.find().sort({'updatedAt': -1}).limit(10)
    .select({ searchQuery: 1, createdAt: 1, _id:0 }).lean()
    .exec().then(data => {
      // needed to map over data and make new object from query result, query result is a mongoose doc obj so it cannot be modified, adding .lean() returns a simple JS obj that can be modified.
      // data = data.map(item => {
      //   const date = new Date(item.createdAt);
      //   return ({searchQuery: item.searchQuery, searchDate: `${date.toDateString()} ${date.toTimeString()}`});
      // });
      data.forEach(item => {
        const date = new Date(item.createdAt);
        item.searchDate = `${date.toDateString()} ${date.toTimeString()}`;
        delete item.createdAt;
      })
      return res.json(data);
    }).catch(err => {
      return next(err);
    })
});

router
.route('/api/imagesearch/:query')
.get((req, res, next) => {
  const searchClient = new googleImages(`${process.env.CSE_ID}`, `${process.env.CSE_API_KEY}`);
  searchClient.search(`${req.params.query}`, { page : req.query.offset || 1 }).then(imagesResults => {
    let results = {
      searchQuery: req.params.query,
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
