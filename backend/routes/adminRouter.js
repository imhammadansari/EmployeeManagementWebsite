import express from 'express';
const router = express.Router();
import { adminRegistered, adminLoggedin, adminLoggedOut, adminName } from '../controllers/adminAuthController.js';
import isAdminLoggedIn from '../middlewares/isAdminLoggedIn.js';

router.post("/adminRegister", adminRegistered);
router.post("/adminLogin", adminLoggedin);
router.get("/getAdmin", isAdminLoggedIn, adminName);
router.post("/adminLogout", isAdminLoggedIn, adminLoggedOut);


export default router;