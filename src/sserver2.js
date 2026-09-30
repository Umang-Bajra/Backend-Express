const express = require('express');
const logger=require('./middleware/logger');
const hellomiddleware = require('./middleware/hellomiddleware');
const one = require('./middleware/one');
const two = require('./middleware/two');
const three = require('./middleware/three');
const cookieparser=require('cookie-parser');
const authenticateToken = require('./middleware/authenticateToken');
const app = express()
//4vm32NrAwgbCw5Pb
app.use(cookieparser())
//specify the format will be in json 
app.use(express.json())
//image displaying
app.use(express.static('public'))
const port = 3000

//for using tokens
const jwt=require('jsonwebtoken')
require('dotenv').config()

//connect the mongo db databse
const mongoose=require('mongoose')
require('dotenv').config()

//importing new schema
const users= require('./models/users')

//make a route
app.post ('/create/user',async(req,res,next)=>{

    try{
        //create user
        const user = await users.create(req.body);
        res.status(201).json({
            "success" : true,
            data:user
        })

    }
    catch(error){
res.status(400).json({
    "success":false,
    error:error.message
})
    }
})


//login 
app.post('/login',async(req,res,next)=>{
    try{

        console.log("api calling");
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).json({
                message:"email and password is required"
            })

        }
        const user =await users.findOne({email})

if(!user || user.password!== password){
return res.status(401).json({
message:"invalid email or password"
})
}

//issue token by backend
const token =jwt.sign({
    userId: user._id.toString(),email: user.email},
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
)

//save the token in cookie in frontend
res.cookie('token',token),{
    httpOnly:true,
    secure:process.env.NODE_ENV ==='production',
    sameSite:'lax',
    maxAge:60*60*1000
}

return res.status(200).json({
success:true,
message:"login successful",
token,
user:{
id:user._id,
name:user.name,
email:user.email,
age:user.age
}
})
}

    catch(error){
        res.status(400).json({
            "message":error.message
        })
    }
})
//used to display the data of X that is in cookie 
//used for when cookies are cleared to display not found
app.get('/me', authenticateToken,async(req,res)=>{
const user =await users.findById(req.auth.userId).select('-password')
if(!user){
return res.status(401).json({
message:"user no longer exists"})
}
res.status(200).json({
success:true,
user
})
})

//read
//make a route
app.get ('/read/user',async(req,res,next)=>{

    try{
        //create user
        const user = await users.find();
        res.status(201).json({
            "success" : true,
            data:user
        })

    }
    catch(error){
res.status(400).json({
    "success":false,
    error:error.message
})
    }
})

//delete
// app.delete ('/delete/user/:id',async(req,res,next)=>{

//     try{
//         //create user
//         const user = await users.findByIdAndDelete(req.params.id);
//         //create promise with success
//         res.status(201).json({
//             "success" : true,
//             data:user
//         })

//     }
//     catch(error){
// res.status(400).json({
//     "success":false,
//     error:error.message
// })
//     }
// })

app.delete ('/delete/user',async(req,res,next)=>{

    try{
        const password =req.query.password;
        
        const user = await users.findById(req.query.id);
    
        if(user.password==password){
            console.log("password match");
       const user = await users.findByIdAndDelete(req.query.id);
        //create promise with success
         res.status(201).json({
             "success" : true,
            data:user
        })
       
           
        }
    
    else{
        console.log("password not matched");
        return res.status(403).json({
            "message":"password does not matched"
        })
    }
    }

    catch(error){
res.status(400).json({
    "success":false,
    error:error.message
})
    }
})


//update
app.delete ('/update/user/:id',async(req,res,next)=>{

    try{
        //create user
        const user = await users.findByIdAndUpdate(req.params.id,req.body);
        //create promise with success
        res.status(201).json({
            "success" : true,
            data:user
        })

    }
    catch(error){
res.status(400).json({
    "success":false,
    error:error.message
})
    }
})
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