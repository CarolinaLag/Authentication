const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
var sgTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
};

var transport = nodemailer.createTransport(sgTransport(options));

const resetRender = (req, res) => {
    res.render("reset.ejs", { err: "" });
};

const resetSubmit = async (req, res) => {
  const email = req.body.email;

  try {

  const user = await User.findOne({ email: email });

  if (!user) return res.render("reset.ejs", {err: "Not a valid user"})

  const token = await crypto.randomBytes(32).toString("hex");

  user.token = token;
  user.tokenExpiration = Date.now() + 3600000;
  await user.save();

  await transport.sendMail({
    from: process.env.USER,
    to: user.email,
    subject: "Reset password requested",
    html: `<h2> Click  <a href="http://localhost:5000/reset/${user.token}" > here </a> to reset the password </h2>`,
  });

  res.render("checkMail.ejs")

} catch (err) {
  res.render("checkMail.ejs", { err: "Sorry, something went wrong, try again later"});
} 
};

const resetParams = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({
      token: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.redirect("/register");

    res.render("resetForm.ejs", { err: "", email: user.email });
  } catch (err) {
    res.render("reset.ejs", { err: " Please try again" });
  }
};

const resetFormSubmit = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
try {
  const user = await User.findOne({ email: email });

  user.password = hashedPassword;
  await user.save();
  res.redirect("/login");
} catch (err) {
  res.render("resetForm.ejs", {err: err})
}
};

module.exports = {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
};
