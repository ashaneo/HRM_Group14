const express = require('express');
const user = require('../controllers/userController');
const {verifyToken}  = require("../middleware/auth");
const employee = require('../controllers/employee');
const router = express.Router();

router.post('/apply_leave', verifyToken, employee.applyLeave);
router.post('/login', user.user_login);
router.get('/getProfile',verifyToken, user.getProfile);
router.get("/get_leaves/:id", verifyToken, employee.getLeaves);
module.exports = router;