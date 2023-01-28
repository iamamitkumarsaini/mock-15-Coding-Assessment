const express = require("express");
require("dotenv").config()

const { connection } = require("./config/db");
const { auth } = require("./Middlewares/auth.middleware");
const { userRoutes } = require("./Routes/User.routes");
const { userBMIRoutes } = require("./Routes/UserBMI.routes");


const app = express()

app.use(express.json());



app.get("/", (req,res) => {
    res.send(" Welcome to Homepage")
})


app.use("/", userRoutes)


app.use(auth)
app.use("/",userBMIRoutes);

app.listen(process.env.port, async () => {

    try {
        
        await connection
        console.log("Connection to db Successful")
    } 
    
    catch (error) {
        console.log("Connection to DB Failed")
        console.log(error)
    }

    console.log(`Listening on port ${process.env.port}`)   
})

