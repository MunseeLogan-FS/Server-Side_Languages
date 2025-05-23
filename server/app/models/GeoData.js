const mongoose = require("mongoose");

const geoSchema = mongoose.Schema({
  lon: {
    type: String,
  },
  lat: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("geo", geoSchema, "geoData");
