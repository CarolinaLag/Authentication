const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

const {
  renderTodo,
  createTodo,
  editTodo,
  postEdit,
  removeTodo,
} = require("../controller/todoController");

router.get("/todo", verifyUser , renderTodo);
router.post("/todo", verifyUser, createTodo);
router.get("/todo/edit/:id", verifyUser, editTodo)
router.post("/todo/edit/:id", verifyUser, postEdit)
router.get("/todo/remove/:id", verifyUser, removeTodo)




module.exports = router;
