require("dotenv").config()
const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
    const token = req.headers.auth?.split(" ")[1]
    
    if(token){
        const decoded = jwt.verify(token, process.env.secret_key, (err,decoded) => {
            if(decoded){
                // console.log("Decoded",decoded)
                const userID = decoded.userID;
                req.body.userID = userID
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