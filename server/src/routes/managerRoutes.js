const express = require('express');
const manager = require('../controllers/manager');
const {verifyToken, hasPaygrade}  = require("../middleware/auth");
const router = express.Router();

router.get('/view_user/:user_id', hasPaygrade(['level 1', 'level 2', 'level 3', 'level 4']), manager.viewUser);
router.get('/get_users_list', hasPaygrade(['level 3', 'level 4']), manager.getUserList);
router.get('/get_supervisor_list', manager.get_supervisor_list);
router.get('/get_supervisor/:user_id', manager.get_supervisor);
router.post('/edit_user/:user_id', hasPaygrade(['level 3', 'level 4']), manager.editUser);

module.exports = router;