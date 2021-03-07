const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRender = (req, res) => {
  if (req.cookies.jwtToken) return res.redirect("/todo");
  try {
    res.render("login.ejs", { err: " " });
  } catch (err) {
    res.redirect("/todo");
  }
};

const loginSubmit = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

      if (email == '' || password == '') {
        return res.render('login.ejs', {err: 'All fields are required' })
      }
      if (!user)
      return res.render("login.ejs", { err: "User is not valid" });

    const validUser = await bcrypt.compare(password, user.password);

    console.log(validUser);

    if (!validUser)
      return res.render("login.ejs", {
        err: "Password is not valid"
      });

    const jwtToken = await jwt.sign({ user: user }, process.env.SECRET_KEY);

    if (jwtToken) {
      const cookie = req.cookies.jwtToken;
      if (!cookie) {
        res.cookie("jwtToken", jwtToken, { maxAge: 360000000, httpOnly: true });
      }
      return res.redirect("/todo");
    }
  } catch (err) {
    res.render("login.ejs", { err: err });
  }
  //return res.redirect("/login");
};

module.exports = {
  loginRender,
  loginSubmit,
};
