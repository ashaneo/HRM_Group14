const reportData = require('../models/reportData');

const getDepartmentList = async (req,res)=>{
    departmentList = await reportData.getDepartmentList();

    if (departmentList.values.length >= 1){
        return res.status(201).json({
            message: "Departments found",
            data: departmentList.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Departments"
        });
    }
}

const getEmployeeByDepartmentReportParameters = async (req, res) => {
    parameterList = await reportData.getParameterList();

    if (parameterList.values.length >= 1){
        return res.status(201).json({
            message: "Parameters found",
            data: parameterList.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Parameters"
        });
    }
}

const getCurrentUserName = async (req, res) => {
    user = await reportData.getCurrentUserName(req.params.user_id);

    if (user.values.length >= 1){
        return res.status(201).json({
            message: "User found",
            data: user.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find user"
        });
    }
}

const createEmployeeByDepartmentReport = async (req, res) => {
    const department = req.body.department;
    const checkedParameterList = req.body.parameters;
    const validParameterList = [];

    allUserData = await reportData.getUserDataByDepartment(department);
    allParameterList = await reportData.getParameterList();

    allParametersJSON = JSON.parse(JSON.stringify(allParameterList.values));
    allUserDataJSON = JSON.parse(JSON.stringify(allUserData.values));

    for (var i = 0; i < allParametersJSON.length; i++) {
        if ( checkedParameterList[i] )
            validParameterList.push(allParametersJSON[i].COLUMN_NAME);
    }

    for (var i = 0; i < allUserDataJSON.length; i++) {
        var j = 0;
        Object.keys(allUserDataJSON[i]).forEach(function(key) {
            if ( !checkedParameterList[j] )
                delete(allUserDataJSON[i][key]);
            j++;
        });
    }

    if (allUserDataJSON.length >= 1){
        return res.status(201).json({
            message: "User found",
            data: [validParameterList, allUserDataJSON]
        });
    } else {
        return res.status(201).json({
            message: "No employees in chosen department",
            data: []
        });
    }
}

const createLeavesByDepartmentReport = async (req, res) => {
    const from = req.body.from;
    const to = req.body.to;

    departmentList = await reportData.getDepartmentList();
    leavesByDepartmentRaw = await reportData.getLeavesByDepartment(from, to);

    leavesByDepartmentJSON = JSON.parse(JSON.stringify(leavesByDepartmentRaw.values));

    let leavesbyAllDepartmentsJSON = [];

    for (var i = 0; i < departmentList.values.length; i++) {
        let department = departmentList.values[i].Name;
        let numLeaves = 0;
        for (var j = 0; j < leavesByDepartmentJSON.length; j++) {
            if (leavesByDepartmentJSON[j].department == department) {
                numLeaves = leavesByDepartmentJSON[j].total_leaves;
            }  
        }
        let leaveDepartmentPair = {"department":department, "total_leaves":numLeaves};
        leavesbyAllDepartmentsJSON[i] = leaveDepartmentPair;
    }

    return res.status(201).json({
        message: "Leaves taken in given period",
        data: leavesbyAllDepartmentsJSON
    });
}

const createAverageSalaryByDepartmentsReport = async (req, res) => {
    averageSalariesByDepartment = await reportData.getAverageSalaryByDepartment();

    if (averageSalariesByDepartment.values.length >= 1){
        return res.status(201).json({
            message: "Average salary by department view found",
            data: averageSalariesByDepartment.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Average salary by department view"
        });
    }
}

const getEmployeeAndSupervisorReportParameters = async (req, res) => {
    parameterList = await reportData.getEmployeeAndSupervisorParameterList();

    if (parameterList.values.length >= 1){
        return res.status(201).json({
            message: "Parameters found",
            data: parameterList.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Parameters"
        });
    }
}

const createEmployeeAndSupervisorReport = async (req, res) => {
    const checkedParameterList = req.body.parameters;
    const validParameterList = [];

    allUserData = await reportData.getEmployeesAndSupervisors();
    allParameterList = await reportData.getEmployeeAndSupervisorParameterList();

    allParametersJSON = JSON.parse(JSON.stringify(allParameterList.values));
    allUserDataJSON = JSON.parse(JSON.stringify(allUserData.values));

    for (var i = 0; i < allParametersJSON.length; i++) {
        if ( checkedParameterList[i] )
            validParameterList.push(allParametersJSON[i].COLUMN_NAME);
    }

    for (var i = 0; i < allUserDataJSON.length; i++) {
        var j = 0;
        Object.keys(allUserDataJSON[i]).forEach(function(key) {
            if ( !checkedParameterList[j] )
                delete(allUserDataJSON[i][key]);
            j++;
        });
    }

    if (allUserDataJSON.length >= 1){
        return res.status(201).json({
            message: "Employees and supervisors found",
            data: [validParameterList, allUserDataJSON]
        });
    } else {
        return res.status(201).json({
            message: "No supervisors assigned to employees",
            data: []
        });
    }
    
}

const getGroupEmployeesReportParameters = async (req, res) => {
    parameterList = await reportData.getGroupEmployeesReportParameters();

    if (parameterList.values.length >= 1){
        return res.status(201).json({
            message: "Parameters found",
            data: parameterList.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Parameters"
        });
    }
}

const createGroupedEmployeeReport = async (req, res) => {
    const checkedParameter = req.body.parameter;

    countEmployeesByGrouping = await reportData.getEmployeeCountByGrouping(checkedParameter);

    if (countEmployeesByGrouping.values.length >= 1){
        return res.status(201).json({
            message: "Average salary by department view found",
            data: countEmployeesByGrouping.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot find Average salary by department view"
        });
    }
}

module.exports = {
    getDepartmentList,
    getEmployeeByDepartmentReportParameters,
    getCurrentUserName,
    createEmployeeByDepartmentReport,
    createLeavesByDepartmentReport,
    createAverageSalaryByDepartmentsReport,
    getEmployeeAndSupervisorReportParameters,
    createEmployeeAndSupervisorReport,
    getGroupEmployeesReportParameters,
    createGroupedEmployeeReport
}