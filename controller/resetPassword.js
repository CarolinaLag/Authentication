const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// reset render : en resetemailForm.ejs
// reset submit : submit formuläret

//skapar en tunnel till från vår app till mail server
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "feddynamiskweb@gmail.com",
    pass: "FedDynamiskWeb.2021",
  },
});

const resetRender = (req, res) => {
  res.render("reset.ejs", { err: "" });
};

const resetSubmit = async (req, res) => {
  const email = req.body.email;

  // check if user exists

  const user = await User.findOne({ email: email });

  if (!user) return res.redirect("/register");
  // token , tokenExpiration
  const token = await crypto.randomBytes(32).toString("hex");
  // sparar token, token expiration
  user.token = token;
  user.tokenExpiration = Date.now() + 3600000;
  await user.save();
  // en länk med token  till användarens mejl adressen

  await transport.sendMail({
    from: "feddynamiskweb@gmail.com",
    to: user.email,
    subject: "reset password requested",
    html: `<h2> Klicka  <a href="http://localhost:5000/reset/${user.token}" > Här </a> för att kunna återställa lösenord </h2>`,
  });

  res.render("checkMail.ejs");
};

const resetParams = async (req, res) => {
  // req.params

  const token = req.params.token;
  try {
    const user = await User.findOne({
      token: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.redirect("/register");

    res.render("resetForm.ejs", { err: "", email: user.email });
  } catch (err) {
    res.render("reset.ejs", { err: " Försök igen" });
  }
};

const resetFormSubmit = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  //vilken användare ska ha den nya lösenordet
  const user = await User.findOne({ email: email });

  user.password = hashedPassword;
  await user.save();
  res.redirect("/login");

  // verifera om mejl adressen finns
};

module.exports = {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
};
