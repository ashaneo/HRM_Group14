module.exports = (app) => {
    const employees = require("../controllers/employeeController");
  
    var router = require("express").Router();

  
    router.get("/:id", employees.findOne);
  
  
    app.use("/employees", router);
  };