const mongoose = require("mongoose");

const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    lowercase: true,
  },
  date: { type: Date, default: Date.now },
});

const TodoTask = mongoose.model("task", todoTaskSchema);

module.exports = TodoTask;
