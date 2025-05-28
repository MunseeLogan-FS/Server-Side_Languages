const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You are required to have an hero name."],
    unique: [true, "Name must be unique."],
    trim: true,
    maxlength: [
      50,
      "Your name is too long, name cannot be longer than 50 characters.",
    ],
  },
  age: {
    type: Number,
    required: true,
    min: [0, "Age cannot be negative."],
  },
  power: {
    type: [String],
    required: [true, "All superheroes must have a power."],
  },
  city: {
    type: String,
    required: [true, "Must have a city."],
    trim: true,
    maxlength: [50, "City name cannot be longer than 50 characters."],
  },
  enemies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Villain",
    },
  ],
});

module.exports = mongoose.model("Hero", heroSchema, "heroes");
