const express = require('express');
const hr_manager = require('../controllers/hr_manager');

const router = express.Router();

router.get('/getPaygrades', hr_manager.getPaygrades);
router.post("/register", hr_manager.registerEmployee)
router.post("/setSupervisor", hr_manager.assignSupervisor)
router.post("/edit_paygrade", hr_manager.editPaygrade)
router.get('/getJobTitles', hr_manager.getJobTitles);
router.post("/add_title", hr_manager.addJobTitle)

module.exports = router;