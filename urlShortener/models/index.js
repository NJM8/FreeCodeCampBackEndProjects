const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URI || "mongodb://localhost/urlShortener")
  .then(() => {
    return console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

module.exports.Url = require("./urlModel");
