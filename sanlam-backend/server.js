// import express ... 
const express = require('express')
const cors = require('cors')
// create the express app ... 
const app = express()
// use json to read and write data ...
app.use(express.json())
app.use(cors())

require('./routes/admin.routes.js')(app)


// listen for requests and start the server ...
app.listen(3580, ()=>{
    console.log("Server listening")
})

// insert data into the table ... 
