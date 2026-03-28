const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  phone: String,
  bookingAvailable: Boolean
});

module.exports = mongoose.model("Clinic", clinicSchema);