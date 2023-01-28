const express = require("express");
const { BMIHistoryModel } = require("../Models/BMIHistory.model");
const { UserModel } = require("../Models/User.model");

const userBMIRoutes = express.Router()



userBMIRoutes.post("/calculateBMI", async(req,res) => {
    const { height, weight, userID, name, email } = req.body;
    // console.log(req.body,"post data")

    let square = Number((height*height).toFixed(2))
    let BMI = Number((weight/square).toFixed(1))
    // console.log(BMI,"BMI")

    try {

        const user = await UserModel.find({_id:userID});
        // console.log(user)

        if(user){

            const history = new BMIHistoryModel({userID,name, email, height, weight, BMI})
            await history.save();

            const data = await BMIHistoryModel.find({userID});
            // console.log(data,"data")


            if(BMI<18.5){
                res.send({"msg":"Under Weight",data})
            }
        
            else if(BMI>=18.5 && BMI<=24.9){
                res.send({"msg":"Normal Weight",data})
            }
        
            else if(BMI>=25 && BMI<=29.9){
                res.send({"msg":"Over Weight",data})
            }
        
            else if(BMI>=30 && BMI<=34.9){
                res.send({"msg":"Obesity",data})
            }
        
            else if(BMI>=35){
                res.send({"msg":"Extreme Obesity",data})
            }
        
            else {
                res.send({data})
            }
        }
        else{
            res.send({"message":'You are not authorized for this operation'})
        }


    } 
    
    catch (error) {
        console.log("error",error)
        res.send({"message":"Something went wrong"})
    }
    
})


userBMIRoutes.get("/bmihistory",async(req,res) => {

    try {
        const history = await BMIHistoryModel.find()
        res.send({"data":history})
    } 
    
    catch (error) {
        console.log("error",error)
        res.send({"message":"Something went wrong"})
    }
})


module.exports = { userBMIRoutes }