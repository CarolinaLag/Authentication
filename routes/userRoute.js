const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");

router.use(passport.initialize());
router.use(passport.session());
router.use(
  session({ secret: "secret_key", resave: false, saveUninitialized: false })
);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  done(null, user.id);
});

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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID_FB,
      clientSecret: process.env.CLIENT_SECRET_FB,
      callbackURL: "http://localhost:5000/register/facebook/todo",
      profileFields: ["emails", "name", "displayName"]
    },
    function (accessToken, refreshToken, profile, cb) {
      const { email, firstName, lastName } = profile._json;

      const userData = {
        email,
        name: firstName + " " + lastName,
        password: "sjksabfkjsabfjks",
      };

      User.findOne({ email: email }).then((user) => {
        if (user) {
          return cb(null, user);
        }

        const newUser = User({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.redirect("/todo");
              })
              .catch((err) => console.log(err));
            return cb;
          });
        });
      });
    }
  )
);

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
