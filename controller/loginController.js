const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const loginRender = (req ,res)=> {
    res.render("login.ejs", {err: " "})

}

const loginSubmit = async (req, res) => {
    // Read from req.body
    const {email, password} = req.body;
    
    //Kolla i databasen om användare finns
    
    const user = await User.findOne({email:email});
    
    //connect-flash middleware för att kunna spara felmeddelande när man redirectar
    if(!user) return res.redirect("/register")
    
    //Jämför lösenord bcrypt.compare
    const validUser = await bcrypt.compare(password, user.password)
    
    console.log(validUser)
    
    if(!validUser) return res.redirect("/login");
    //Låter användare logga in
    
    //res.send("lyckades att logga in ")
       //jwt
    
    //http är stateless(kommer inte ihåg gammal request), jwtToken består av payload/userdata, som vi hashar med secretkey
    //Token lagrar användarens info så user kan logga in igen när man kommer tillbaka
    // payload och secret key
       const jwtToken = await jwt.sign({user:user}, process.env.SECRET_KEY)
    
       if(jwtToken) {
    
        const cookie = req.cookies.jwtToken
    
           if(!cookie) {
    
            res.cookie("jwtToken", jwtToken, {maxAge: 360000000, httpOnly:true})
               
           }
           return res.redirect("/")
       }
       
       return res.redirect("/login")
    
    }
    
    module.exports= {
        loginRender,
        loginSubmit
    }