const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  token: String,
  tokenExpiration: Date,
  todoList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

userSchema.methods.addTodo = function (todoId) {
  this.todoList.push(todoId);

  this.save();
};

// userSchema.methods.deleteTodo = function (todoId) {

//   this.todoList.splice(todoId);
//   this.save();
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
