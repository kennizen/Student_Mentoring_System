const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const studentController = require("../controllers/student.controller");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

/** All Student routes are in this file    
 *  For protected routes we are passing the Authorize middleware to check if the user 
 *  is authorized to perform the operation/action.
 * 
 *  **This will prevent other users of the system from penetrating into the student dashboard
*/

// mentor login
router.post("/login", studentController.studentLoginHandler);

// mentor signup
router.post("/signup", studentController.studentSignupHandler);

// mentor dashboard
router.get("/dashboard", Auth, Authorize(Role.Student), studentController.studentDashboardHandler);

module.exports = router;