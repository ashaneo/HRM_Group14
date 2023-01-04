const users = require('../models/users');
const getData = require('../models/getData');
const validator = require("../validation/validation");

const viewUser = async (req,res)=>{
    user = await users.getEmployee(req.params.user_id);
    phoneNums = await users.getPhoneNoByEmpId(user.values[0].empId);
    if (user.values.length >= 1){
        return res.status(201).json({
            message: "User " + req.params.user_id + " found",
            data: {...user.values[0], "phone1_id": phoneNums.values[0].id, "phone1": phoneNums.values[0].phone_number, "phone2_id":phoneNums.values[1].id, "phone2":phoneNums.values[1].phone_number}
        });

    } else {
        return res.status(400).json({
            message: "Cannot find the user"
        });
    }
}


const get_supervisor_list = async (req,res)=>{
    const user = await users.getSupervisorList();
    if (user.status){
        return res.status(201).json({
            message: "Users found",
            data: user.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find users"
        });
    }
}

const get_supervisor = async (req,res)=>{
    const emp_id = await getData.getEmployeeId(req.params.user_id);     
    const supervisor = await users.getSupervisor(emp_id.values[0].ID);
    if (supervisor.status){
        return res.status(201).json({
            message: "Users found",
            data: supervisor.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find users"
        });
    }
}

const getUserList = async (req,res)=>{
    user = await users.getEmployeeList();

    if (user.values.length >= 1){
        return res.status(201).json({
            message: "Users found",
            data: user.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find users"
        });
    }
}

const editUser = async (req,res)=>{
    const validation_result = validator.employee_update(req);

    if (validation_result.status) {
        return res.status(400).json({
          message: validation_result.message,
        });
    }
    
    department = await getData.getDepartmentById(req.body.dept_id);
    if (department.values.length < 1){
        return res.status(400).json({
            message: "Department does not exists"
        });
    }

    emptype = await getData.getEmpTypeById(req.body.emptype_id);
    if (emptype.values.length < 1){
        return res.status(400).json({
            message: "Employee Type does not exists"
        });
    } else if((emptype.values[0].type == "HR Manager") || (emptype.values[0].type == "Admin")) {
        return res.status(400).json({
            message: "Invalid employee type"
        });
    }

    maritalstatus = await getData.getMaritalStatusById(req.body.marital_id);
    if (maritalstatus.values.length < 1){
        return res.status(400).json({
            message: "Invalid marital status"
        });
    }

    const supervisor = await users.isSupervisor(req.body.empId);
    if (emptype.values[0].type == "Manager"){
        req.body.paygrade = 3;
    } else if (supervisor) {
        req.body.paygrade = 2;
    } else {
        req.body.paygrade = 1;
    }

    empstatus = await getData.getEmpStatusById(req.body.empstatus_id);
    if (empstatus.values.length < 1){
        return res.status(400).json({
            message: "Invalid employee status"
        });
    }

    const rupdateStatus = users.updateUser(req);
    if (rupdateStatus.status === true){
        return res.status(201).json({
            message: "Successfully updated user details"
        });
    }else{
        return res.status(201).json({
            message: "User details update failed"
        });
    }
}

module.exports = {
    viewUser,
    getUserList,
    editUser,
    get_supervisor_list,
    get_supervisor
}