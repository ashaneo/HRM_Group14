const express = require('express');
const supervisor = require('../controllers/supervisor');
const {verifyToken}  = require("../middleware/auth");

const router = express.Router();

router.get("/get_leave_requests", verifyToken, supervisor.getLeaveRequests);
router.get("/getleaveData/:emp_ID", verifyToken, supervisor.getLeaveData);
router.post("/accept_leave/:id", verifyToken, supervisor.acceptLeave);
router.post("/reject_leave/:id", verifyToken, supervisor.rejectLeave);


module.exports = router;