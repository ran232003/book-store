const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
