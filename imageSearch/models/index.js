const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/imageSearch')
  .then(() => {
    return console.log('Connected to Mongo DB');
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

  module.exports.Image = require('./imageModel'); 
