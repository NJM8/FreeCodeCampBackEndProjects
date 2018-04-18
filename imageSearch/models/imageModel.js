const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String
  }, 
  alt: {
    type: String
  },
  imageUrl: {
    type: String
  }, 
  pageUrl: {
    type: String
  }
});

module.exports = mongoose.model('Image', imageSchema);
