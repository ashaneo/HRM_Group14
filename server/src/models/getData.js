const db = require('./db_helper');

const getDepartmentById = (depId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM department WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [depId], function (error, results) {
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

const getEmpStatusById = (statusId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM empstatus WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [statusId], function (error, results) {
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

const getEmpTypeById = (typeId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM emptype WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [typeId], function (error, results) {
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

const getMaritalStatusById = (statusId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM maritalstatus WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [statusId], function (error, results) {
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

const getPayGradeById = (gradeId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM paygrade WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [gradeId], function (error, results) {
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

const getAllPaygrades = ()=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM paygrade;";
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

const getJobTitles = ()=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM emptype;";
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

const getEmployeeId = (user_id) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT ID FROM employee WHERE user_id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [user_id], function (error, results) {
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

const getUserIdByEmpId = (emp_ID) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT user_Id FROM employee WHERE ID = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [emp_ID], function (error, results) {
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

const getAvailableLeaveCount = (emp_ID) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT available_leaves(?);";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [emp_ID], function (error, results) {
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
    getPayGradeById,
    getMaritalStatusById,
    getEmpTypeById,
    getEmpStatusById,
    getDepartmentById,
    getAllPaygrades,
    getEmployeeId,
    getJobTitles,
    getUserIdByEmpId,
    getAvailableLeaveCount
}

