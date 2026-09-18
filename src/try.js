


const express = require('express');
const app = express()
//specify the format will be in json 
app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//making our first reuest
// app.get("/name",(req,res)=>{
//   res.status(201).json({
//     "name":"Sarun"
//   })
// })
app.get("/name",(req,res)=>{
  //header value
  console.log("header value",req.headers.myheader)
  //getting params
  console.log("params value,",req.query.myparms)
   res.status(201).json({
    "name":"Sarun"
  })
})
  
  
  //end point post to get body
  
app.post("/data",(req,res)=>{
  console.log(req.body)

        res.status(200).json({
        message:"success"
        })
})


 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})