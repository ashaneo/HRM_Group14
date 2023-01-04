const db = require('./db_helper');

const getLeavesBySupId = (supId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT `leave`.id, `leave`.emp_ID, leavestatus.status, `leave`.Date, `leave`.reason, leavetype.type FROM `leave` JOIN leavetype JOIN leavestatus ON `leave`.type_ID = leavetype.ID AND `leave`.status = leavestatus.ID WHERE emp_id in (Select employee.id emp_id from employee join supervisor on employee.id = supervisor.emp_id where supervisor.sup_id = ?);";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [supId], function (error, results) {
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

const reviewRequest = (leave_id, status)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT id FROM leavestatus WHERE status = ?";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [status], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            } else {
                status_id = result[0].id;
                sql = "UPDATE `leave` SET status= ? WHERE id = ?";
                db.query(sql, [status_id, leave_id], function (error, results) {
                    if (error) {
                        console.log(error);
                        res.status = false;
                        resolve(res);
                    }
                    res.values = results;
                    resolve(res);
            });
            } 
        });  
    });
}

const getSupervisor = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT supervisor.sup_id FROM supervisor JOIN `leave` ON `leave`.emp_id = supervisor.emp_id WHERE `leave`.id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
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

const getLeaveStatus = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT leavestatus.status FROM `leave` join leavestatus ON `leave`.status = leavestatus.id WHERE `leave`.id = ? ;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
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

const submitLeave = (req, emp_id)=>{

    return new Promise((resolve, reject) => {
        sql = "SELECT id FROM leavetype WHERE type = ?";
        res = {
            values: [],
            status: true,
        };  

        sql = "INSERT INTO `leave` (emp_id, type_id, date, reason) VALUES (?, ?, ?, ?)";
        db.query(sql, [emp_id, req.body.type, req.body.leave_date, req.body.reason], function (error, results) {
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

const getLeavesData = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT `employee`.firstname, `employee`.lastname, `leavestatus`.status, `leave`.id, leavetype.type, `leave`.Date, `leave`.reason FROM `employee` JOIN `leavestatus` JOIN `leave` JOIN leavetype ON `leave`.status = `leavestatus`.`ID` AND `employee`.id = `leave`.`emp_ID` AND `leave`.type_ID = leavetype.ID WHERE `leave`.id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
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


const setAcceptLeave = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "UPDATE `leave` SET status = 2 WHERE `leave`.id= ? ;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            resolve(res);
        });
    });
}


const setRejectLeave = (leave_id)=>{
    return new Promise((resolve, reject) => {
        sql = "UPDATE `leave` SET status = 3 WHERE `leave`.id= ? ;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [leave_id], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            resolve(res);
        });
    });
}

const getLeavesByEmpId = (empId)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT `employee`.firstname, `employee`.lastname, `leavestatus`.status, `leave`.id, leavetype.type, `leave`.Date, `leave`.reason FROM `employee` JOIN `leavestatus` JOIN `leave` JOIN leavetype ON `leave`.status = `leavestatus`.`ID` AND `employee`.id = `leave`.`emp_ID` AND `leave`.type_ID = leavetype.ID WHERE `leave`.emp_ID = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [empId], function (error, results) {
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
    reviewRequest,
    getLeavesBySupId,
    getSupervisor,
    getLeaveStatus,
    submitLeave,
    getLeavesData,
    setAcceptLeave,
    setRejectLeave,
    getLeavesByEmpId
}