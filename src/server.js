const express = require('express');
const logger=require('./middleware/logger');
const hellomiddleware = require('./middleware/hellomiddleware');
const one = require('./middleware/one');
const two = require('./middleware/two');
const three = require('./middleware/three');
const app = express()

//specify the format will be in json 
app.use(express.json())
//image displaying
app.use(express.static('public'))
const port = 3000

//for calling middleware we use

app.use(logger);

app.get('/',hellomiddleware, (req, res) => {
  res.send('Hello World!')
})

// app.get('/demos', (req, res) => {
//     res.status(200).json({
//         "name":"gonjales"
//     })

// })

app.get('/demos',one,two,three,(req,res)=>{
  console.log("value of param2 ",req.query.myparam)
})


app.post('/demos',hellomiddleware,(req,res)=>{
  console.log(req.body)
  res.status(201).json({
    message:"success"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})