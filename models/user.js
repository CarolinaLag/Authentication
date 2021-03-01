const mongoose = require("mongoose");
//const findOrCreate = require ('mongoose-findorcreate')


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  token: String,
  tokenExpiration: Date,
  facebookId: String,
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

//userSchema.plugin(findOrCreate);


const User = mongoose.model("user", userSchema);

module.exports = User;
