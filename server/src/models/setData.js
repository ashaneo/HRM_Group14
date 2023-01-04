const db = require('./db_helper');

const updatePaygrade = (data)=>{
    return new Promise((resolve, reject) => {
        sql = "UPDATE paygrade SET salary=?, num_leaves=? WHERE id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [data.salary, data.num_leaves, data.ID], function (error, results) {
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

const addJobTitle = (data)=>{
    return new Promise((resolve, reject) => {
        sql = "INSERT INTO emptype (type) VALUE (?);";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [data.title], function (error, results) {
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
    updatePaygrade,
    addJobTitle
}