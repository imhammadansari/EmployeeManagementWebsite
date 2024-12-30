const express = require('express');
const router = express.Router();
const { adminRegistered, adminLoggedin, adminLoggedOut, adminName, ViewLeaveRequests } = require('../controllers/adminAuthController');
const isAdminLoggedIn = require('../middlewares/isAdminLoggedIn');

router.post("/adminRegister", adminRegistered);
router.post("/adminLogin", adminLoggedin);
router.get("/getAdmin", isAdminLoggedIn, adminName);
router.post("/adminLogout", isAdminLoggedIn, adminLoggedOut);


module.exports = router;