const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  searchQuery: {
    type: String
  }, 
  images:[{
    _id: false,
    altTag: {
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
