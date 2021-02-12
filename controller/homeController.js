const homeRender = (req, res) => {

    console.log(req.user)

    res.render("home.ejs", {user: req.user.user} )

}

module.exports= {
    homeRender
}