const leaves = require('../database/leaves');
const getdata = require('../database/getData');

const getLeaveRequests = async (req,res)=>{

    sup_id = await getdata.getEmployeeId(req.user.userId);     
    leaveRequests = await leaves.getLeavesBySupId(sup_id.values[0].ID);
    
    if (res.status){
        return res.status(201).json({
            message: "User " + req.params.user_id + " found",
            data: leaveRequests.values
        });
    } else {
        return res.status(400).json({
            message: "Cannot get leave requests"
        });
    }
}

const reviewLeaveRequest = async (req,res)=>{
    //leave_id = ?;
    //sup_id = ?;

    //is correct supervisor
    const reviewer = await leaves.getSupervisor(leave_id);
    if (reviewer.values[0].id == sup_id){
        return res.status(400).json({
            message: "Not the correct supervisor"
        });
    }
    //is leave status TBD
    const leaveStatus = await leaves.getLeaveStatus(leave_id);
    if (leaveStatus.values[0].status == "TBD"){
        return res.status(400).json({
            message: "This request has been already reviewed"
        });
    }

    const reviewStatus = await leaves.reviewRequest(leave_id, status);
    if (regitrationStatus.status === true){
        return res.status(200).json({
            message: "Successfully reviewed request"
        });
    }else{
        return res.status(400).json({
            message: "Request review failed"
        });
    }
}


const getLeaveData = async (req,res)=>{
    emp_id = req.params.emp_ID;     
    leaveData = await leaves.getLeavesData(emp_id);

    if (res.status){
        return res.status(201).json({
            message: "User " + req.params.user_id + " found",
            data: leaveData.values
        });
    } else {
        return res.status(400).json({
            
            message: "Cannot get leave requests"
        });
    }
}

const acceptLeave = async (req,res)=>{
    leave_id = req.params.id;
     
    accepted = await leaves.setAcceptLeave(leave_id);

    if (res.status){
        return res.status(201).json({
            message: "Approved",
        });
    } else {
        return res.status(400).json({
            message: "Cannot Update status in leave table"
        });
    }
}

const rejectLeave = async (req,res)=>{
    leave_id = req.params.id;
     
    rejected = await leaves.setRejectLeave(leave_id);

    if (res.status){
        return res.status(201).json({
            message: "Rejected",
        });
    } else {
        return res.status(400).json({
            message: "Cannot Update status in leave table"
        });
    }
}

module.exports = {
    getLeaveRequests,
    reviewLeaveRequest,
    getLeaveData,
    acceptLeave,
    rejectLeave,
}