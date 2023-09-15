const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "must be atleast one character"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  added: {
    type: String,
  },
});

module.exports = mongoose.model("TODO", TodoSchema);
