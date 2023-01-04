// const express = require('express')
// //const authenticationRoutes = require('./src/routes/authenticationRoutes')
// //require("./src/routes/employeeRoutes")(app);
// const app = express()
// app.use(express.json());

// //require('./src/routes/authenticationRoutes')(app)

// // app.get("/test",(req,res)=> {
// //     res.json({"users":["userone","usertwo"]})
// // })

// // app.get('/api',(req,res)=> {
// //     res.send("Hello");
// // })

// app.get("/", (req, res) => {
//     res.json({ message: "Successfully started" });
//   });

// app.listen(5000,()=>{console.log("Listening on port 5000")})

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./database/db_helper');

const hrRoutes = require('./routes/hrRoutes');
const managerRoutes = require('./routes/managerRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const {verifyToken, hasPaygrade}  = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3001;

app.use('/hr', verifyToken, hasPaygrade(['level 4']), hrRoutes);
app.use('/manager', verifyToken, managerRoutes);
app.use('/supervisor', verifyToken, hasPaygrade(['level 2']), supervisorRoutes);
app.use('/user', userRoutes);
app.use('/report', verifyToken, hasPaygrade(['level 3']), reportRoutes)

app.listen(port, () => {
console.log(`Listening on port ${port}`)
});

app.get("/getleavetypes",(req,res)=>{
    var selectDetails=[];
    const sqlinsert = "SELECT ID, type FROM leavetype";
    db.query(sqlinsert,(err,result) => {
        if(err){
            console.log("table error", err);
        }else{
            selectDetails.push(result);
            res.send(selectDetails);
        }
    })
});


app.get("/getHRMSdetails",(req,res)=>{
    var selectDetails=[];
    const sqlinsert = "SELECT ID as id,Name as name FROM department where ID>1";
    db.query(sqlinsert,(err,result) => {
        if(err){
            console.log("table error", err);
        }else{
            selectDetails.push(result);
            const sqlinsert = "SELECT ID as id,status as name FROM maritalstatus";
            db.query(sqlinsert,(err,result) => {
                if(err){
                    console.log("table error", err);
                }else{
                    selectDetails.push(result);
                    const sqlinsert = "SELECT ID as id,type as name FROM emptype  where ID>2";
                    db.query(sqlinsert,(err,result) => {
                        if(err){
                            console.log("table error", err);
                        }else{
                            selectDetails.push(result);
                            const sqlinsert = "SELECT ID as id,paygrade as name FROM paygrade";
                            db.query(sqlinsert,(err,result) => {
                                if(err){
                                    console.log("table error", err);
                                }else{
                                    selectDetails.push(result);
                                    const sqlinsert = "SELECT ID as id,status as name FROM empstatus";
                                    db.query(sqlinsert,(err,result) => {
                                        if(err){
                                            console.log("table error", err);
                                        }else{
                                            selectDetails.push(result);
                                            res.send(selectDetails);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});