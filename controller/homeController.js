const homeRender = (req, res) => {
  res.render("login.ejs", { user: req.user.user });
};

module.exports = {
  homeRender,
};
