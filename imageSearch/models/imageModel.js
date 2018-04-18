const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  searchQuery: {
    type: String
  }, 
  images:[{
    title: {
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
  }]
},
  {timestamps: true}
);

module.exports = mongoose.model('Image', imageSchema);
