const express = require("express");
const router = express.Router();
const TodoTask = require("../models/TodoTask");

router.get("/", async (req, res) => {
  const page = +req.query.page || 1;

  const totalData = await TodoTask.find().countDocuments();
  const taskPerReq = 5;
  const totalPages = Math.ceil(totalData / taskPerReq);
  const dataToShow = taskPerReq * page;
  const sorted = +req.query.sorted || 1;

  try {
    if (page === 1) {
      let data = await TodoTask.find().limit(dataToShow).sort({ date: sorted });
      
      res.render("todo.ejs", {
        todoTasks: data,
        currentPage:page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    } else {
      let data = await TodoTask.find()
        .limit(5)
        .skip((page - 1) * 5)
        .sort({ date: sorted });
      
      res.render("todo.ejs", {
        todoTasks: data,
        currentPage:page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    }
  } catch (err) {
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {

  const page = +req.query.page || 1;
  const sort = +req.query.sorted || -1;

  const todoTask = new TodoTask({
    content: req.body.content
  });

  try {
    const result = await todoTask.save();

    const todoId = req.params.id

    //const user = await TodoTask.findOne({_id:req.body._id})
    //console.log(user.todoList)
    //resultat._id

    result.addTodo(todoId);
    console.log(result);

    const userWithTodoData = await TodoTask.findOne({_id:req.body._id}).populate("todoList");
    //console.log(userWithTodoData.todoList)
    res.render("home.ejs", {todoItem: userWithTodoData.todoList, err: ""})
    
    //res.redirect("/");
  } catch (err) {
    res.redirect(`/?page=${page}&sorted=${sort}`);
  }
});

router.get("/edit/:id", async (req, res) => {
  const page = +req.query.page || 1;
  const totalData = await TodoTask.find().countDocuments();
  const taskPerReq = 5;
  const totalPages = Math.ceil(totalData / taskPerReq);
  const dataToShow = taskPerReq * page;
  const sorted = +req.query.sorted || 1;
  const id = req.params.id;

  try {
    if (page === 1) {
      let data = await TodoTask.find().limit(dataToShow).sort({ date: sorted });
      
      res.render("todoEdit.ejs", {
        todoTasks: data,
        idTask: id,
        currentPage:page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    } else {
      let data = await TodoTask.find()
        .limit(5)
        .skip((page - 1) * 5)
        .sort({ date: sorted });
      
      res.render("todoEdit.ejs", {
        todoTasks: data,
        idTask: id,
        currentPage: page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    }
  } catch (err) {
    res.redirect("/");
  }
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sorted || -1;
  try {
    await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
    res.redirect(`/?page=${page}&sorted=${sort}`);
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/remove/:id", (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sorted || -1;
  try {
    TodoTask.findByIdAndRemove(id, (err) => {
      if (err) return res.send(500, err);
      res.redirect(`/?page=${page}&sorted=${sort}`);
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
