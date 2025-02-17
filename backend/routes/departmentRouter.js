import express from 'express';
const router = express.Router();
import { AddDepartment, ViewDepartment, UpdateDepartment, DeleteDepartment } from '../controllers/departmentAuthController.js';

router.post("/addDepartment", AddDepartment)
router.get("/viewDepartment", ViewDepartment)
router.post("/updateDepartment", UpdateDepartment)
router.post("/deleteDepartment", DeleteDepartment)

export default router;