const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URI || "mongodb://localhost/imageSearch", {
    useNewUrlParser: true,
  })
  .then(() => {
    return console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

module.exports.Image = require("./imageModel");
