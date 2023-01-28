require("dotenv").config()
const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
    const token = req.headers.auth?.split(" ")[1]
    
    if(token){
        const decoded = jwt.verify(token, process.env.secret_key, (err,decoded) => {
            if(decoded){
                // console.log("Decoded",decoded)
                const userID = decoded.userID;
                const username = decoded.name;
                const useremail = decoded.email;

                req.body.userID = userID
                req.body.name = username;
                req.body.email = useremail

                next()
            }
            else{
                console.log("Error in Middleware",err)
                res.send("login first")
            }
        })
    }

    else{
        res.send("login first")
    }
}

module.exports = { auth }