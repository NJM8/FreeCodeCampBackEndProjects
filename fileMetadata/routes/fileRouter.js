const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router
  .route('/')
  .get((req, res, next) => {
    return res.render('index');
  });

router
  .route('/getMetadata')
  .post(upload.single('fileUpload'), (req, res, next) => {
    const fileMetadata = {
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
    return res.send(fileMetadata);
  })

  module.exports = router;
