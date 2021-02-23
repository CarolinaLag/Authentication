const homeRender = (req, res) => {

    console.log(req.user)

    res.render("login.ejs", {user: req.user.user} )

}

module.exports= {
    homeRender
}