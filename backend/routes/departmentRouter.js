const express = require('express');
const { AddDepartment, ViewDepartment, UpdateDepartment, DeleteDepartment } = require('../controllers/departmentAuthController');
const router = express.Router();

router.post("/addDepartment", AddDepartment)
router.get("/viewDepartment", ViewDepartment)
router.post("/updateDepartment", UpdateDepartment)
router.post("/deleteDepartment", DeleteDepartment)

module.exports = router;