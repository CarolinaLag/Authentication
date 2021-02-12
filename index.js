require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/todoRoute");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

//connection to db
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");

app.use("/", router);

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, dbName: "TodoApp", useUnifiedTopology: true },
  (err) => {
    console.log(err);
    if (err) return;
    console.log("Connected to db!");

    app.listen(process.env.PORT || 5001, (err) =>
     console.log("Server is running")
    );
  }
);
