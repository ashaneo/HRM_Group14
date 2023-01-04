module.exports = (app) => {
    const employee = require("../controllers/employeeController");
    const {verifyToken}  = require("../middleware/auth");
    
    var router = require("express").Router();
  
    //router.get("/:id", employee.findOne);

    router.post('/apply_leave', verifyToken, employee.applyLeave);
    router.post('/login', user.user_login);
    router.get('/getProfile',verifyToken, user.getProfile);
    router.get("/get_leaves/:id", verifyToken, employee.getLeaves);
    module.exports = router;
  };