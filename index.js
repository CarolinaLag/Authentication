require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");
const homeRouter = require("./routes/homeRoute");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(todoRouter);
app.use(userRouter);
app.use(homeRouter);

//connection to db
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");

const options = {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
};

mongoose.connect(
  process.env.DB_CONNECT,options,
  (err) => {
    //console.log(err);
    if (err) return;
    console.log("Connected to db!");

      app.listen(process.env.PORT || 5001, (err) =>
     console.log("Server is running")
    );
  }
);



