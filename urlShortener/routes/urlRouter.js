//worknik call
// put key in env file and remember how to get to heroku
// const request = new Request('https://api.wordnik.com/v4/words.json/randomWords?limit=1&api_key=087c20e93577cfed4f10000525a09c1bceb25388be80f712d');

// fetch request from wordnik api
// fetch(request).then(function(response){
//     return response.json().then(function(data){

//     })
//   }).catch(error => {
//     console.log(error);
//   })

const express = require('express');
const router = express.Router();
const db = require('../models');

router
  .route('/')
  .get((req, res, next) => {
    console.log("Hi");
    return res.render('index');
  });
  
router
  .route('/new/*')
  .get((req, res, next) => {
    const fancyNewUrl = 'https://natethedevurlshortener.herokuapp.com/' + 'tinyCake';
    const newUrl = {
      urlOriginal: req.params[0],
      urlShortened: fancyNewUrl
    }
    return db.Url.create(newUrl).then(data => {
      return res.json(data);
    }).catch(err => {
      return next(err);
    });
  });

  router
  .route('/:url')
  .get((req, res, next) => {
    const fullShortUrl = 'https://natethedevurlshortener.herokuapp.com/' + req.params.url;
    return db.Url.findOne({ urlShortened : fullShortUrl }).then(data => {
      if (data === null) {
        return res.next('err');
      }
      return res.redirect(data.urlOriginal);
    }).catch(err => {
      return next(err);
    });
  });

  module.exports = router;
