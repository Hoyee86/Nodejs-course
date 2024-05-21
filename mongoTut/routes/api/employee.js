const express = require('express');
const router = express.Router();
const employeesController = require("../../controller/employeeController")
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require("../../middleware/verifyRoles")



const path = require('path');
// const verifyJwt = require('../../middleware/verifyJWT');

// First method
// router.get("/",  (req, res) =>{
//     res.sendFile(path.join(__dirname, "..", "..", "data", "employee.json"));
// })


// Second method

router
.route("/")
.get(employeesController.getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor ),employeesController.createEmployee)
.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.updateEmployee)
.delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee);


router.route("/:id").get(employeesController.getEmployee);
    





module.exports = router;