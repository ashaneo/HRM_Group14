const jwt = require("jsonwebtoken");

////const UserController = require("./userController");
////const UserModel = require("../models/userModel.js");
////const EmployeeModel = require("../models/employeeModel");
////const { validatePassword } = require("../utils/hash");

const { JwT_SECRET } = require("../config");
// Create and Save a new User

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  


};