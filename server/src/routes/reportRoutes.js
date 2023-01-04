const express = require('express');
const report = require('../controllers/report');

const router = express.Router();

router.get('/getCurrentUserName/:user_id', report.getCurrentUserName);
router.get('/get_department_list', report.getDepartmentList);
router.get('/get_employee_by_department_report_parameters', report.getEmployeeByDepartmentReportParameters);
router.post('/create_employee_by_department_report', report.createEmployeeByDepartmentReport);
router.post('/create_leaves_by_department_report', report.createLeavesByDepartmentReport);
router.get('/create_average_salary_of_departments_report', report.createAverageSalaryByDepartmentsReport);
router.get('/get_employee_and_supervisor_report_parameters', report.getEmployeeAndSupervisorReportParameters);
router.post('/create_employee_and_supervisor_report', report.createEmployeeAndSupervisorReport);
router.get('/get_group_employees_report_parameters', report.getGroupEmployeesReportParameters);
router.post('/create_grouped_employee_report', report.createGroupedEmployeeReport);

module.exports = router;