const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
//const findOrCreate = require ('mongoose-findorcreate')

//const passportLocalMongoose= require("passport-local-mongoose")
//router.use(passport.initialize());

const {
  registerRender,
  registerSubmit,
} = require("../controller/registerController");

const { loginRender, loginSubmit } = require("../controller/loginController");

const {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
} = require("../controller/resetPassword");

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:5000/register/facebook/todo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get("/register/facebook", passport.authenticate("facebook"));

router.get(
  "/register/facebook/todo",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/todo");
  }
);

router.get("/register", registerRender);

router.post("/register", registerSubmit);

router.get("/login", loginRender);

router.post("/login", loginSubmit);

router.get("/reset", resetRender);

router.post("/reset", resetSubmit);

router.get("/reset/:token", resetParams);

router.post("/resetForm", resetFormSubmit);

module.exports = router;
