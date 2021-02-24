const TodoTask = require("../models/TodoTask");
const User = require("../models/user");

const renderTodo = async (req, res) => {
    const page = +req.query.page || 1;

  const totalData = await TodoTask.find().countDocuments();
  const taskPerReq = 5;
  const totalPages = Math.ceil(totalData / taskPerReq);
  const dataToShow = taskPerReq * page;
  const sorted = +req.query.sorted || 1;

  const user =  await User.findOne({_id: req.user.user._id});
  const userTodos = await user.todoList;

  try {
    if (page === 1) {
      let data = await TodoTask.find({_id: userTodos}).limit(dataToShow).sort({ date: sorted });
     
      res.render("todo.ejs", {
        user: req.user.user,
        todoTasks: data,
        currentPage: page,
        page,
        totalData,
        taskPerReq,
        totalPages,
        dataToShow,
        sorted,
      });
    } else {
      let data = await TodoTask.find({_id: userTodos})
        .limit(5)
        .skip((page - 1) * 5)
        .sort({ date: sorted });

      res.render("todo.ejs", {
        user: req.user.user,
        todoTasks: data,
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
};

const createTodo = async (req, res) => {
    const page = +req.query.page || 1;
  const sort = +req.query.sorted || -1;

  try {
    const todoTask = await new TodoTask({
      content: req.body.content
    }).save()

    //console.log("hej ", req.user.user)
    const user = await User.findOne({_id: req.user.user._id});

    //console.log("hello" , user)
    user.addTodo(todoTask._id);
    const userTodos = await User.findOne({ _id: req.user.user._id }).populate(
      "todoList"
    );
    console.log(userTodos);

    res.redirect("/todo");
  } catch (err) {
    res.redirect(`/todo/?page=${page}&sorted=${sort}`);
  }
}

const editTodo = async (req, res) => {
    const page = +req.query.page || 1;
  const totalData = await TodoTask.find().countDocuments();
  const taskPerReq = 5;
  const totalPages = Math.ceil(totalData / taskPerReq);
  const dataToShow = taskPerReq * page;
  const sorted = +req.query.sorted || 1;
  const id = req.params.id;

    const user =  await User.findOne({_id: req.user.user._id});
    const userTodos = await user.todoList;

    try {
    if (page === 1) {
      let data = await TodoTask.find({_id: userTodos}).limit(dataToShow).sort({ date: sorted });

      res.render("todoEdit.ejs", {
        user: req.user.user,
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
    } else {
      let data = await TodoTask.find({_id: userTodos})
        .limit(5)
        .skip((page - 1) * 5)
        .sort({ date: sorted });

      res.render("todoEdit.ejs", {
        user: req.user.user,
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
    console.log(err)
    res.redirect("/todo");
  }
}

const postEdit = async (req, res) => {
    const id = req.params.id;
    const page = +req.query.page || 1;
    const sort = +req.query.sorted || -1;
    try {
      await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
      res.redirect(`/todo/?page=${page}&sorted=${sort}`);
    } catch (err) {
      res.redirect("/todo");
    }
}

const removeTodo = async (req, res) => {
    const id = req.params.id;
    const page = +req.query.page || 1;
    const sort = +req.query.sorted || -1;
    try {
      TodoTask.findByIdAndRemove(id, (err) => {
        if (err) return res.send(500, err);
        res.redirect(`/todo/?page=${page}&sorted=${sort}`);
      });
    } catch (err) {
      res.redirect("/");
    }
}

module.exports = {
    renderTodo,
    createTodo,
    editTodo,
    postEdit,
    removeTodo,
  };
