const db = require('./db_helper');

const getDepartmentList = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT Name FROM department;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getParameterList = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = 'employee_by_department' AND COLUMN_NAME != 'department';";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getCurrentUserName = (id) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT firstname, lastname FROM employee WHERE user_Id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [id], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getUserDataByDepartment = (department) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT ID, `Employee Name`, Email, `Joined Date`, `Employee Type`, `Employee Status`, Paygrade FROM employee_by_department WHERE Department = ? ORDER BY ID;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [department], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getLeavesByDepartment = (from, to) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT department, COUNT(id) as total_leaves FROM `leaves_by_department` WHERE ? <= leaves_by_department.Date AND leaves_by_department.Date <= ? GROUP BY department;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [from, to], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getAverageSalaryByDepartment = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM `average_salary_by_department`;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getEmployeeAndSupervisorParameterList = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = 'employee_and_supervisor';";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getEmployeesAndSupervisors = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM `employee_and_supervisor` ORDER BY `employee_and_supervisor`.`Employee ID`;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getGroupEmployeesReportParameters = () => {
    return new Promise((resolve, reject) => {
        sql = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = 'employee_grouping' AND COLUMN_NAME != 'user_Id';";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

const getEmployeeCountByGrouping = (parameter) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT `"+parameter+"` , COUNT(user_Id) as `Employee Count` FROM `employee_grouping` GROUP BY `"+parameter+"` ;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            res.values = results;
            resolve(res);
        });
    });
}

module.exports = {
    getDepartmentList,
    getParameterList,
    getCurrentUserName,
    getUserDataByDepartment,
    getLeavesByDepartment,
    getAverageSalaryByDepartment,
    getEmployeeAndSupervisorParameterList,
    getEmployeesAndSupervisors,
    getGroupEmployeesReportParameters,
    getEmployeeCountByGrouping
}