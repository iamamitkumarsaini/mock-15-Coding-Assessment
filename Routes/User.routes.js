const express = require("express")
const bcrypt = require("bcrypt");
const saltRounds = 4;
const { UserModel } = require("../Models/User.model")
require("dotenv").config()
const jwt = require("jsonwebtoken")


const userRoutes = express.Router()

userRoutes.post("/register", async(req,res) => {
    const {name, email, password} = req.body;
    
    const userPresent = await UserModel.findOne({email})
    if(userPresent){
        // console.log(userPresent)
        res.send({"Message":"Already Signed-Up, Try Login"})
    }
    else{
        try {
            bcrypt.hash(password, saltRounds, async(err,myPassword) => {
                const user = new UserModel({name,email,password:myPassword})
                await user.save()
                // console.log("Sign-up successfully")
                res.send({"Message":"Signup Successfully"})
            })
            
        }
        
        catch (error) {
            console.log("Error while making POST req")
            console.log(error)
            res.send({"Message":"Signup failed"})
        }
    }
    
})


userRoutes.post("/login", async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.find({email});
        if(user.length>0){
            const myPassword =  user[0].password;
            // console.log(myPassword)
            bcrypt.compare(password,myPassword, function (err,result) {
                if(result){
            const token = jwt.sign({userID:user[0]._id}, process.env.secret_key,{expiresIn: '1d'})
            res.send({"message":"Logged-in Successfully",user,token});
                }
                else{
                    res.send({"Message":"Wrong Password"})
                }
            })
            
        }
        else{
            res.send({"Message":"Login failed"})
        }
       
    } 
    
    catch (error) {
        console.log("Error while making POST req")
        console.log(error)
        res.send({"Message":"Login failed"})
    }
})




module.exports = { userRoutes };