const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

const { homeRender } = require("../controller/homeController");

router.get("/", verifyUser, homeRender);

router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken").redirect("/login");
});

module.exports = router;
