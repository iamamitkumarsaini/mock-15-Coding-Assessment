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
            // console.log(data,"data")


            if(BMI<18.5){
                const history = new BMIHistoryModel({userID,name, email, height, weight, BMI,result:"Under Weight"})
                await history.save();
    
                const data = await BMIHistoryModel.find({userID});
                res.send({data})
            }
        
            else if(BMI>=18.5 && BMI<=24.9){
                const history = new BMIHistoryModel({userID,name, email, height, weight, BMI,result:"Normal Weight"})
                await history.save();
    
                const data = await BMIHistoryModel.find({userID});
                res.send({data})
            }
        
            else if(BMI>=25 && BMI<=29.9){
                const history = new BMIHistoryModel({userID,name, email, height, weight, BMI,result:"Over Weight"})
                await history.save();
    
                const data = await BMIHistoryModel.find({userID});
                res.send({data})
            }
        
            else if(BMI>=30 && BMI<=34.9){
                const history = new BMIHistoryModel({userID,name, email, height, weight, BMI,result:"Obesity"})
                await history.save();
    
                const data = await BMIHistoryModel.find({userID});
                res.send({data})
            }
        
            else if(BMI>=35){
                const history = new BMIHistoryModel({userID,name, email, height, weight, BMI,result:"Extreme Obesity"})
                await history.save();
    
                const data = await BMIHistoryModel.find({userID});
                res.send({data})
            }
        
            else {
                const history = new BMIHistoryModel({userID,name, email, height, weight, BMI,result:"Extreme Obesity"})
                await history.save();
    
                const data = await BMIHistoryModel.find({userID});
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