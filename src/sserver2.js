const express = require('express');
const logger=require('./middleware/logger');
const hellomiddleware = require('./middleware/hellomiddleware');
const one = require('./middleware/one');
const two = require('./middleware/two');
const three = require('./middleware/three');
const app = express()
//4vm32NrAwgbCw5Pb

//specify the format will be in json 
app.use(express.json())
//image displaying
app.use(express.static('public'))
const port = 3000

//connect the mongo db databse
const mongoose=require('mongoose')
require('dotenv').config()

//connection 
const connectDB = async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db database connected successfully")
}
    catch(error){
        console.error("error while connecting",error)
        process.exit(1);
    }
}



























































connectDB().then(()=>{


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})