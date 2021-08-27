const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");

const adminController = require("../controllers/admin.controller");

/**   All admin routes are in this file    */

// admin login route
router.post("/login", adminController.adminLoginHandler);
// admin dashboard route
router.get("/dashboard", Auth, adminController.adminDashboardHandler);

module.exports = router;
