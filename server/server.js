const express = require('express')
//const authenticationRoutes = require('./src/routes/authenticationRoutes')
//require("./src/routes/employeeRoutes")(app);
const app = express()
app.use(express.json());

//require('./src/routes/authenticationRoutes')(app)

// app.get("/test",(req,res)=> {
//     res.json({"users":["userone","usertwo"]})
// })

// app.get('/api',(req,res)=> {
//     res.send("Hello");
// })

app.get("/", (req, res) => {
    res.json({ message: "Successfully started" });
  });

app.listen(5000,()=>{console.log("Listening on port 5000")})