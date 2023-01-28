const mongoose = require("mongoose")

const userBMISchema = mongoose.Schema({
    height:Number,
    weight:Number
},{
    versionKey:false
})


const UserBMIModel = mongoose.model("userbmi",userBMISchema);

module.exports = { UserBMIModel };