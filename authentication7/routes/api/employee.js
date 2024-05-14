const express = require('express');
const router = express.Router();
const employeesController = require("../../controller/employeeController")



const path = require('path');

// First method
// router.get("/",  (req, res) =>{
//     res.sendFile(path.join(__dirname, "..", "..", "data", "employee.json"));
// })


// Second method

router
.route("/")
.get(employeesController.getAllEmployees)
.post(employeesController.createEmployee)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);


router.route("/:id").get(employeesController.getEmployee);
    





module.exports = router;