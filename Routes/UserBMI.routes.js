const express = require("express");
const { BMIHistoryModel } = require("../Models/BMIHistory.model");

const userBMIRoutes = express.Router()



userBMIRoutes.post("/calculateBMI", async(req,res) => {
    const { height, weight, userID, name, email } = req.body;
    console.log(req.body,"post data")

    let square = Number((height*height).toFixed(2))
    let BMI = Number((weight/square).toFixed(1))
    // console.log(BMI,"BMI")

    try {

        const history = new BMIHistoryModel({userID, name, email, height, weight, BMI})
        await history.save();

        if(BMI<18.5){
            res.send({"msg":"Under Weight",BMI})
        }
    
        else if(BMI>=18.5 && BMI<=24.9){
            res.send({"msg":"Normal Weight",BMI})
        }
    
        else if(BMI>=25 && BMI<=29.9){
            res.send({"msg":"Over Weight",BMI})
        }
    
        else if(BMI>=30 && BMI<=34.9){
            res.send({"msg":"Obesity",BMI})
        }
    
        else if(BMI>=35){
            res.send({"msg":"Extreme Obesity",BMI})
        }
    
        else {
            res.send({BMI})
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