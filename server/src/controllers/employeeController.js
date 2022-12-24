const EmployeeModel = require("../models/employeeModel.js");


exports.findOne = (req, res) => {
    EmployeeModel.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found EmployeeModel with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving EmployeeModel with id " + req.params.id,
          });
        }
      } else res.send(data);
    });
  };
  
