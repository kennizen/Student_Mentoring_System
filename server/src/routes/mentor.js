const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");
const mentorController = require("../controllers/mentor.controller");

/** All Mentor routes are in this file    
 *  For protected routes we are passing the Authorize middleware to check if the user 
 *  is authorized to perform the operation/action.
 * 
 *  **This will prevent other users of the system from penetrating into the mentor's dashboard 
*/

// mentor login
router.post("/login", mentorController.mentorLoginHandler);

// mentor signup
router.post("/signup", mentorController.mentorSignupHandler);

// mentor dashboard
router.get("/dashboard", Auth, Authorize(Role.Mentor), mentorController.mentorDashboardHandler);

module.exports = router;