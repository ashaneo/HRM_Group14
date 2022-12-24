const sql = require("./database");

// constructor
const Employee = function (model) {
    this.emp_id = model.emp_ID;
    this.emp_name = model.emp_name;
  };

  Employee.findById = (id, result) => {
    sql.query(`SELECT * FROM employee WHERE emp_ID = '${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found model: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Employee with the id
      result({ kind: "not_found" }, null);
    });
  };
  