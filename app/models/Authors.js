const mongoose = require("mongoose");

const authorsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You are required to have an author name."],
    trim: true,
    maxlength: [50, "Your name is too long."],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    match: [
      /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/,
      "please enter a valid email address.",
    ],
  },
  description: {
    type: String,
    required: [true, "please add a description"],
    maxlength: [500, "Description cannot be longer than 500 characters."],
  },
});

module.exports = mongoose.model("Author", authorsSchema);
