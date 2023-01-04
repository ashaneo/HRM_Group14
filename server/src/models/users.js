const db = require('./db_helper');
const enc = require('../middleware/encryptionHandler');

const registerUser = async (req)=>{
    return new Promise((resolve, reject) => {
    var address_Id="";
    var u_Id="";
    var emergency_contact_Id="";
    var emplo_Id="";
    let data = req.body;
    
    res = {
        values: [],
        status: true,
    };

    db.beginTransaction( async (err) => {
        if (err) {
            console.error("Transaction failed", err);
            res.status=false;
            return;
        }

        const sqlinsert_user = "INSERT INTO `user` (username,password) VALUES (?,?)";
        const username = data.username;
        const hashed_password = await enc.encryptCredential(data.password1);
        db.query(sqlinsert_user,
            [
                username,
                hashed_password
            ],(err,result) => {
                if(err){
                    db.rollback();
                    console.log("user table error", err);
                    res.status=false;
                    return;
                }else{
                    u_Id = result.insertId;

                    const sqlinsert_address = "INSERT INTO address (Line1,Line2,City,District,Postal_Code) VALUES (?,?,?,?,?)";
                    const line1 = data.Line1;
                    const line2 = data.Line2;
                    const city = data.City;
                    const district = data.District;
                    const postal_code = data.Postal_Code;
                    db.query(sqlinsert_address,
                        [
                            line1,
                            line2,
                            city,
                            district,
                            postal_code
                        ],(err,result) => {
                            if(err){
                                db.rollback();
                                console.log("address error", err);
                                res.status=false;
                                return;
                            }else{
                                address_Id = result.insertId;
                                const sqlinsert_emerg = "INSERT INTO emergencycontact (Name,Phone_number,Relationship) VALUES (?,?,?)";
                                const name = data.Name;
                                const phone_number = data.phone_number;
                                const relationship = data.Relationship;
                                db.query(sqlinsert_emerg,
                                    [
                                        name,
                                        phone_number,
                                        relationship
                                    ],(err,result) => {
                                        if(err){
                                            db.rollback();
                                            console.log("emergencycontact failed", err);
                                            res.status=false;
                                            return;
                                        }else{
                                            emergency_contact_Id = result.insertId;
                
                                            const sqlinsert_employee = "INSERT INTO employee (firstname,lastname,birthday,email,salary,Joined_date,nic_number,leave_count,department,maritalStatus,address,type,paygrade,empStatus,user_Id,emergency_contact) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                                            const fisrtname = data.firstname;
                                            const lastname = data.lastname;
                                            const birthday = data.birthday;
                                            const email = data.email;
                                            const salary = data.salary;
                                            const joined_date = data.Joined_date;
                                            const nic_number = req.body.nic_number;
                                            const photo = "";
                                            const leave_count = 0;
                                            const department = data.department;//
                                            const maritalStatus = data.maritalStatus;//
                                            const address = address_Id; //
                                            const emp_type = data.type;//
                                            const paygrade = data.paygrade;//
                                            const empStatus = data.empStatus;//
                                            const user_Id = u_Id; //
                                            const emergency_contact = emergency_contact_Id; //                                    
                                        
                                            db.query(sqlinsert_employee,
                                                [
                                                    fisrtname,
                                                    lastname,
                                                    birthday,
                                                    email,
                                                    salary,
                                                    joined_date,
                                                    nic_number,
                                                    leave_count,
                                                    department,
                                                    maritalStatus,
                                                    address_Id,
                                                    emp_type,
                                                    paygrade,
                                                    empStatus,
                                                    u_Id,
                                                    emergency_contact_Id
                                                ],(err,result) => {
                                                    if(err){
                                                        db.rollback();
                                                        console.log("employee error", err);
                                                        res.status=false;
                                                        return;
                                                    }else{
                                                        emplo_Id = result.insertId;
                                                        const sqlinsert_phoneNumber = "INSERT INTO phonenumber (emp_ID,phone_number) VALUES (?,?)";
                                                        const emp_ID = emplo_Id;
                                                        const phone_number1 = data.phonenumber1;
                                                        const phone_number2 = data.phonenumber2;
                                                        db.query(sqlinsert_phoneNumber,
                                                            [
                                                                emp_ID,
                                                                phone_number1
                                                            ],(err,result) => {
                                                                if(err){
                                                                    db.rollback();
                                                                    console.log("phone number error",err);
                                                                    res.status=false;
                                                                    return;
                                                                } else {
                                                                    db.query(sqlinsert_phoneNumber,
                                                                        [
                                                                            emp_ID,
                                                                            phone_number2
                                                                        ],(err,result) => {
                                                                            if(err){
                                                                                db.rollback();
                                                                                console.log("phone number error", err);
                                                                                res.status=false;
                                                                                return;
                                                                            } else {
                                                                                db.commit(function (err) {
                                                                                    if (err) {
                                                                                      db.rollback();
                                                                                      console.error("Commit error", err);
                                                                                      res.status=false;
                                                                                      return;
                                                                                    }
                                                                                    console.log("updation success!");                                                                                    
                                                                                  });
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
                }     
        });
    });
    resolve(res);
    });
}

const getUserByUsername = (username)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT `user`.id, `user`.username, `user`.password, emptype.type, paygrade.paygrade FROM `user` JOIN employee JOIN emptype JOIN paygrade ON `user`.id = employee.user_id AND employee.paygrade = paygrade.id AND employee.type = emptype.id WHERE  username = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [username], function (error, results) {
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

const getSupervisorList = (username)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM `supervisor`;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [username], function (error, results) {
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

const getEmployee = (user_id)=>{
    return new Promise((resolve, reject) => {
        sql = `SELECT 
                \`user\`.id,
                employee.id empId,
                employee.firstname,
                employee.lastname,
                employee.birthday,
                employee.email,
                employee.salary,
                employee.Joined_date,
                employee.nic_number,
                employee.photo,
                employee.leave_count,
                department.name dept_name,
                department.id dept_id,
                maritalstatus.status mar_status,
                maritalstatus.id marital_id,
                address.id address_id,
                address.line1,
                address.line2,
                address.city,
                address.district,
                address.postal_code,
                emptype.type,
                emptype.id emptype_id,
                paygrade.paygrade,
                paygrade.id paygrade_id,
                empstatus.status,
                empstatus.id empstatus_id,
                emergencycontact.id emgcontact_id,
                emergencycontact.name,
                emergencycontact.phone_number,
                emergencycontact.relationship 
                FROM \`user\` JOIN employee JOIN department JOIN maritalstatus JOIN address JOIN emptype JOIN paygrade JOIN empstatus JOIN emergencycontact ON 
                \`user\`.id = employee.user_id AND 
                department.id = employee.department AND 
                maritalstatus.id = employee.maritalStatus AND 
                address.id = employee.address AND 
                emptype.id = employee.type AND 
                paygrade.id = employee.paygrade AND 
                empstatus.id = employee.empStatus AND 
                emergencycontact.id = employee.emergency_contact  
                WHERE \`user\`.id = ?;`;
        res = {
            values: [],
            status: true,
        };  
        db.query(sql, [parseInt(user_id)], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            results[0].birthday = results[0].birthday.toISOString().slice(0, 10);
            results[0].Joined_date = results[0].Joined_date.toISOString().slice(0, 10);
            res.values = results;
            resolve(res);
        });
    });
}

const getEmployeeList = ()=>{
    return new Promise((resolve, reject) => {
        sql = `SELECT 
                \`user\`.id, 
                employee.id empId,
                employee.firstname,
                employee.lastname,
                employee.birthday,
                employee.email,
                employee.salary,
                employee.Joined_date,
                employee.nic_number,
                employee.photo,
                employee.leave_count,
                department.name dept_name,
                maritalstatus.status,
                address.line1,
                address.line2,
                address.city,
                address.district,
                address.postal_code,
                emptype.type,
                paygrade.paygrade,
                empstatus.status,
                emergencycontact.name,
                emergencycontact.phone_number,
                emergencycontact.relationship 
                FROM \`user\` JOIN employee JOIN department JOIN maritalstatus JOIN address JOIN emptype JOIN paygrade JOIN empstatus JOIN emergencycontact ON 
                \`user\`.id = employee.user_id AND 
                department.id = employee.department AND 
                maritalstatus.id = employee.maritalStatus AND 
                address.id = employee.address AND 
                emptype.id = employee.type AND 
                paygrade.id = employee.paygrade AND 
                empstatus.id = employee.empStatus AND 
                emergencycontact.id = employee.emergency_contact;`;
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

const getSupervisor= (emp_id)=>{
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM `supervisor` JOIN employee ON supervisor.Sup_Id = employee.ID WHERE supervisor.Emp_Id = ?;";
        res = {
            values: [],
            status: true,
        };  
        db.query(sql,[emp_id], function (error, results) {
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


const getPhoneNoByEmpId = (emp_id)=>{
    return new Promise((resolve, reject) => {
        sql = `SELECT id, phone_number FROM phonenumber WHERE emp_id = ?`;
        res = {
            values: [],
            status: true,
        };  
        db.query(sql,[emp_id] ,function (error, results) {
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

const updateUser = (req)=>{

    var address_Id="";
    var u_Id="";
    var emergency_contact_Id="";
    var emplo_Id="";
    
    res = {
        values: [],
        status: true,
    };

    db.beginTransaction( err => {
        if (err) {
            console.error("Transaction failed", err);
            res.status=false;
            return;
        }

        const sqlupdate_emerg = `UPDATE emergencycontact SET 
                                Name = ?, 
                                Phone_number = ?, 
                                Relationship = ? WHERE id = ?;`;
        const name = req.body.name;
        const phone_number = req.body.phone_number;
        const relationship = req.body.relationship;
        const emg_id = req.body.emgcontact_id;
        db.query(sqlupdate_emerg,
            [
                name,
                phone_number,
                relationship,
                emg_id
            ],(err,result) => {
                if(err){
                    db.rollback();
                    console.log("emergencycontact update failed", err);
                    res.status=false;
                    return;
                }                                   
        });  
        
        const sqlupdate_address = `UPDATE address SET 
                                    Line1 = ?, 
                                    Line2 = ?, 
                                    City = ?, 
                                    District = ?, 
                                    Postal_Code = ? WHERE id = ?;`;
        const line1 = req.body.line1;
        const line2 = req.body.line2;
        const city = req.body.city;
        const district = req.body.district;
        const postal_code = req.body.postal_code;
        const address_id = req.body.address_id;
        db.query(sqlupdate_address,
            [
                line1,
                line2,
                city,
                district,
                postal_code,
                address_id
            ],(err,result) => {
                if(err){
                    db.rollback();
                    console.log("address update error", err);
                    res.status=false;
                    return;
                }          
        });

        const sqlupdate_employee = `UPDATE employee SET 
                                    firstname = ?, 
                                    lastname = ?, 
                                    birthday = ?, 
                                    email = ?, 
                                    salary = ?, 
                                    Joined_date = ?, 
                                    nic_number = ?,  
                                    department = ?, 
                                    maritalStatus = ?, 
                                    type = ?, 
                                    paygrade = ?, 
                                    empStatus = ?  
                                    WHERE id = ?`;
        const fisrtname = req.body.firstname;
        const lastname = req.body.lastname;
        const birthday = req.body.birthday;
        const email = req.body.email;
        const salary = req.body.salary;
        const joined_date = req.body.Joined_date;
        const nic_number = req.body.nic_number;
        const photo = "";
        const department = req.body.dept_id;//
        const maritalStatus = req.body.marital_id;//
        const emp_type = req.body.emptype_id;//
        const paygrade = req.body.paygrade_id;//
        const empStatus = req.body.empstatus_id;//  
        const emp_id = req.body.empId;//                                   

        db.query(sqlupdate_employee,
            [
                fisrtname,
                lastname,
                birthday,
                email,
                salary,
                joined_date,
                nic_number,
                department,
                maritalStatus,
                emp_type,
                paygrade,
                empStatus,
                emp_id
            ],(err,result) => {
                if(err){
                    db.rollback();
                    console.log("employee update error", err);
                    res.status=false;
                    return;
                }
        }); 

        const sqlupdate_phoneNumber = "UPDATE phonenumber SET phone_number = ? WHERE id = ?";
        const phone_number1 = req.body.phone1;
        const phone_number2 = req.body.phone2;
        const phone_number1_id = req.body.phone1_id;
        const phone_number2_id = req.body.phone2_id;
        db.query(sqlupdate_phoneNumber,
            [
                phone_number1,
                phone_number1_id   
            ],(err,result) => {
                if(err){
                    db.rollback();
                    console.log("phone number update error",err);
                    res.status=false;
                    return;
                }
        });  

        db.query(sqlupdate_phoneNumber,
            [
                phone_number2,
                phone_number2_id
            ],(err,result) => {
                if(err){
                    db.rollback();
                    console.log("phone number update error", err);
                    res.status=false;
                    return;
                }
        });

        db.commit(function (err) {
            if (err) {
                db.rollback();
                console.error("Commit error", err);
                res.status=false;
                return;
            }
            console.log("updation success!");                                                                                    
        });

    });

    return res;
}

const isSupervisor = (emp_id) => {
    return new Promise((resolve, reject) => {
        sql ="SELECT COUNT(*) FROM supervisor WHERE supervisor.sup_id = ?;";
        res = {
            value: false,
            status: true,
        };  
        db.query(sql, [emp_id], function (error, results) {
            if (error) {
                console.log(error);
                res.status = false;
                resolve(res);
            }
            if (results.values[0] > 0){
                res.value = true
            }
            resolve(res);
        });
    });
}

module.exports = {
    registerUser,
    getUserByUsername,
    getEmployee,
    getEmployeeList,
    getPhoneNoByEmpId,
    updateUser,
    isSupervisor,
    getSupervisorList,
    getSupervisor
}