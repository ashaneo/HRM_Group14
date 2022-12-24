const express = require('express')
const authenticationRoutes = require('./src/routes/authenticationRoutes')
const app = express()

require('./src/routes/authenticationRoutes')(app)

// app.get("/test",(req,res)=> {
//     res.json({"users":["userone","usertwo"]})
// })

// app.get('/api',(req,res)=> {
//     res.send("Hello");
// })




app.listen(5000,()=>{console.log("Listening on port 5000")})