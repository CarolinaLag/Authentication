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

  const todoTask = new TodoTask({
    content: req.body.content
  });

  try {
    const result = await todoTask.save();
    
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
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
  try {
    TodoTask.findByIdAndRemove(id, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
