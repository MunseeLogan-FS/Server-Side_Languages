const mongoose = require("mongoose");

const villainSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You are required to have an villian name."],
    unique: [true, "Name must be unique."],
    trim: true,
    maxlength: [
      50,
      "Your name is too long, name cannot be longer than 50 characters.",
    ],
  },
  age: {
    type: Number,
    required: [true, "Villains must have an age."],
    min: [0, "Age cannot be negative."],
  },
  evilPlan: {
    type: String,
    required: true,
    maxlength: [500, "Evil plan cannot be longer than 500. characters."],
  },
  power: {
    type: [String],
    required: [true, "All villians must have a power."],
  },

  archNemesisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hero",
  },
});

module.exports = mongoose.model("Villain", villainSchema);
