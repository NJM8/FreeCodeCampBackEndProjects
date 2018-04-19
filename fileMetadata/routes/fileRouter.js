const express = require('express');
const multer = require('multer');
const router = express.Router();

router
.route('/')
.get((req, res, next) => {
  return res.render('index');
});

  module.exports = router;
