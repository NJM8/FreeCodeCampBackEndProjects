const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlOriginal: {
    type: String
  }, 
  urlShortened: {
    type: String
  }
});

module.exports = mongoose.model('Url', urlSchema);
