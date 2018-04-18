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

    console.log(validUrl);
    
    if (validUrl) {
      const axiosUrl = `https://api.wordnik.com/v4/words.json/randomWords?limit=2&api_key=${process.env.WORDNIK_API_KEY}`;
      axios
        .get(axiosUrl)
        .then(response => {
          let newExtension = response.data[0].word.toLowerCase() +  response.data[1].word[0].toUpperCase() + response.data[1].word.slice(1);
          newExtension = newExtension.replace(/\s/g, '').replace(/-/g, '');
          newUrl.urlOriginal = req.params[0];
          newUrl.urlShortened = `https://natethedevurlshortener.herokuapp.com/${newExtension}`;
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
      console.log(data);
      if (data === null) {
        return next('err');
      }
      return res.redirect(data.urlOriginal);
    }).catch(err => {
      return next(err);
    });
  });

  module.exports = router;
