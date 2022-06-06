const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");
const mentorController = require("../controllers/mentor.controller");
const Logger = require("../middlewares/logger");
const events = require("../utils/logEvents");

/** All Mentor routes are in this file
 *  For protected routes we are passing the Authorize middleware to check if the user
 *  is authorized to perform the operation/action.
 *
 *  **This will prevent other users of the system from penetrating into the mentor's dashboard
 */

// mentor login
router.post("/login", mentorController.mentorLoginHandler, Logger(events.LOGIN));

// mentor signup
router.post("/signup", mentorController.mentorSignupHandler, Logger(events.SIGNUP));

// mentor dashboard
router.get("/dashboard", Auth, Authorize(Role.Mentor), mentorController.mentorDashboardHandler);

// reset password
// router.post("/resetPassword", mentorController.resetPassword);

// // setting new password
// router.put("/resetPassword", mentorController.setNewPassword);

//get all students of mentored
router.get("/getAllMentees", Auth, Authorize(Role.Mentor), mentorController.fetchAllMentees);

// get all semesters info of mentee
router.get(
    "/getSemesters/:id",
    Auth,
    Authorize(Role.Mentor),
    mentorController.fetchStudentSemesters
);

// update profile;
router.post("/profile", Auth, Authorize(Role.Mentor), mentorController.updateProfile);

// get profile
router.get("/profile", Auth, Authorize(Role.Mentor), mentorController.getProfile);

module.exports = router;
