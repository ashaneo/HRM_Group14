const express = require('express');
const admin = require('../controllers/adminController');
const {verifyToken, hasPaygrade}  = require("../middleware/auth");
const router = express.Router();

router.get('/view_user/:user_id', hasPaygrade(['level 1', 'level 2', 'level 3', 'level 4']), admin.viewUser);
router.get('/get_users_list', hasPaygrade(['level 3', 'level 4']), admin.getUserList);
router.get('/get_supervisor_list', admin.get_supervisor_list);
router.get('/get_supervisor/:user_id', admin.get_supervisor);
router.post('/edit_user/:user_id', hasPaygrade(['level 3', 'level 4']), admin.editUser);

module.exports = router;