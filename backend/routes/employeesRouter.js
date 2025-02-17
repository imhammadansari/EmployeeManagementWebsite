import express from 'express';
const router = express.Router();
import { registeredUser, viewUsers, updateUsers, deleteUsers, viewUserByEmail, addLeave, employeeLoggedin, approveRejectLeave, ViewProfile, EmployeeLogout, MarkAttendance, ViewAttendanceByEmail, UpdateAttendance, ViewAttendance, viewAttendanceById, DeleteAttendance } from "../controllers/employeeAuthController.js";
import isAdminLoggedIn from "../middlewares/isAdminLoggedIn.js";
import isEmployeeLoggedIn from "../middlewares/isEmployeeLoggedIn.js";

router.post("/registerUser", registeredUser);
router.post("/employeeLogin", employeeLoggedin);
router.get("/viewUsers", viewUsers);
router.post("/updateUsers", updateUsers);
router.get("/viewUsers/:email", viewUserByEmail);
router.post("/leaveRequest", isEmployeeLoggedIn, addLeave);
router.post("/deleteUsers", isAdminLoggedIn, deleteUsers);
router.post("/approveRejectLeave", isAdminLoggedIn, approveRejectLeave);
router.post("/markAttendance", isEmployeeLoggedIn, MarkAttendance);
router.get("/viewAttendance", ViewAttendance);
router.get("/viewAttendance/:email", ViewAttendanceByEmail);
router.get("/viewAttendanceById/:attendanceId", viewAttendanceById);
router.post("/updateAttendance/:attendanceId", UpdateAttendance);
router.post("/deleteAttendance/:attendanceId", DeleteAttendance);
router.get("/viewProfile", isEmployeeLoggedIn, ViewProfile);
router.post("/employeeLogout", isEmployeeLoggedIn, EmployeeLogout);

export default router;
