const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const studentController = require("../controllers/student.controller");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");
const Logger = require("../middlewares/logger");
const events = require("../utils/logEvents");

/** All Student routes are in this file
 *  For protected routes we are passing the Authorize middleware to check if the user
 *  is authorized to perform the operation/action.
 *
 *  **This will prevent other users of the system from penetrating into the student dashboard
 */

// importing multer config
const upload = require("../config/multer");

// student login
router.post("/login", studentController.studentLoginHandler, Logger(events.LOGIN));

// student signup
router.post("/signup", studentController.studentSignupHandler, Logger(events.SIGNUP));

// student dashboard
router.get("/dashboard", Auth, Authorize(Role.Student), studentController.studentDashboardHandler);

// get the student/mentee profile
router.get("/profile", Auth, Authorize(Role.Student), studentController.getProfile);

// edit stduent profile
router.post(
    "/profile",
    Auth,
    Authorize(Role.Student),
    studentController.editProfile,
    Logger(events.PROFILE_UPDATED)
);

// get semester all/specific information
router.get("/semester", Auth, Authorize(Role.Student), studentController.getSemesterInfo);
//add semester info
router.post(
    "/semester/",
    Auth,
    Authorize(Role.Student),
    studentController.addSemesterInfo,
    Logger(events.UPDATED_SEMESTER)
);
// semester delete
router.post(
    "/semester/delete",
    Auth,
    Authorize(Role.Student),
    studentController.deleteSemesterInfo,
    Logger(events.DELETED_SEMESTER)
);
//add or update pass education info
router.post(
    "/pastEducation/",
    Auth,
    Authorize(Role.Student),
    studentController.addPastEducation,
    Logger(events.UPDATED_PAST_EDUCATION)
);
//get all pass education info
router.get("/pastEducation/", Auth, Authorize(Role.Student), studentController.getPastEducation);
// get all students of a mentor
router.get(
    "/getAllStudentsOfMentor",
    Auth,
    Authorize(Role.Student),
    studentController.getAllStudents
);

module.exports = router;
