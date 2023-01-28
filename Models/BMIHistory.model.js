const mongoose = require("mongoose")

const BMIHistorySchema = mongoose.Schema({
    name:String,
    email:String,
    userID:String,
    result:String,
    height:Number,
    weight:Number,
    BMI:Number
},{
    versionKey:false
})


const BMIHistoryModel = mongoose.model("BMIHistory",BMIHistorySchema);

module.exports = { BMIHistoryModel };