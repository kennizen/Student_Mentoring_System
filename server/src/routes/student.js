const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");

const studentController = require("../controllers/student.controller");

// mentor login
router.post("/login", studentController.studentLoginHandler);

// mentor signup
router.post("/signup", studentController.studentSignupHandler);

// mentor dashboard
router.get("/dashboard", Auth, studentController.studentDashboardHandler);

module.exports = router;