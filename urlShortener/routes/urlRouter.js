const express = require('express');
const router = express.Router();
const db = require('../models');
const validator = require('validator');
const axios = require('axios');

router
  .route('/')
  .get((req, res, next) => {
    return res.render('index');
  });
  
router
  .route('/new/*')
  .get((req, res, next) => {
    const validUrl = validator.isURL(req.params[0]);
    let newUrl = {
      urlOriginal: 'Invalid Url',
      urlShortened: 'none'
    }

    db.Url.findOne({ urlOriginal: req.params[0] }).then(data => {
      if (data) {
        return res.json(data)
      }
    });

    if (validUrl) {
      const axiosUrl = `https://api.wordnik.com/v4/words.json/randomWords?limit=2&api_key=${process.env.WORDNIK_API_KEY}`;
      axios
        .get(axiosUrl)
        .then(response => {
          const wordOne = response.data[0].word;
          const wordTwo = response.data[1].word;

          newUrl.urlOriginal = req.params[0];
          newUrl.urlShortened = `https://natethedevurlshortener.herokuapp.com/${wordOne[0].toUpperCase()}${wordOne.slice(1)}${wordTwo[0].toUpperCase()}${wordTwo.slice(1)}`;

          return db.Url.create(newUrl).then(data => {
            return res.json(data);
          }).catch(err => {
            return next(err);
          });
        }).catch(err => {
          return next(err);
        });
    } else {
      return res.json(newUrl);
    }
  });

  router
  .route('/:url')
  .get((req, res, next) => {
    const fullShortUrl = `https://natethedevurlshortener.herokuapp.com/${req.params.url}`;
    return db.Url.findOne({ urlShortened : fullShortUrl }).then(data => {
      if (data === null) {
        return next('err');
      }
      return res.redirect(data.urlOriginal);
    }).catch(err => {
      return next(err);
    });
  });

  module.exports = router;
