var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/helensCarousel", 
  // || 
  // "mongodb://helenjsoh:airbnb1@ds215502.mlab.com:15502/images",
  { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
  console.log("Now connected to mongoDB...");
});

var listingSchema = new mongoose.Schema({
  id: Number,
  count: Number
});

var imageSchema = new mongoose.Schema({
  id: Number,
  image_url: String,
  image_caption: String
});

var Listing = mongoose.model("Listing", listingSchema);
var Image = mongoose.model("Image", imageSchema);

module.exports = { Listing, Image };
