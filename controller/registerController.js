const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerRender = (req, res) => {
  try {
    res.render("register.ejs", { err: "" });
  } catch (err) {
    res.redirect("/todo");
  }
};

const registerSubmit = async (req, res) => {
  const { name, email, password } = req.body;
  const userName = await User.findOne({ name: name})
  const userEmail = await User.findOne({ email: email})

  try {
    if (email == '' || name == '' || password == '') {
      return res.render('register.ejs', {err: 'All fields are required' })
    }
    if (userEmail || userName) {
      res.render('register.ejs', {err: "Sorry, email or username already taken"})
    } else {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    new User({
      name: name,
      email: email,
      password: hashedPassword,
    }).save();

    return res.redirect("/login");
  }
  } catch (err) {
    if (err) return res.render("register.ejs", { err: err });
  }
};

module.exports = {
  registerRender,
  registerSubmit,
};
