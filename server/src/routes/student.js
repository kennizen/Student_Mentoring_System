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

// importing multer config
const upload = require("../config/multer");
const { studentLoginHandler } = require("../controllers/student.controller");

// student login
router.post("/login", studentController.studentLoginHandler);

// student signup
router.post("/signup", studentController.studentSignupHandler);

// student dashboard
router.get("/dashboard", Auth, Authorize(Role.Student), studentController.studentDashboardHandler);
// create a new post
router.post("/newPost", Auth, Authorize(Role.Student), studentController.createNewPost);

// get all posts
router.get("/fetchAllPosts", Auth, Authorize(Role.Student), studentController.fetchAllPosts);

// get the student/mentee profile
router.get("/profile", Auth, Authorize(Role.Student), studentController.getProfile);

// edit stduent profile
router.post("/profile", Auth, Authorize(Role.Student), studentController.editProfile);

//  edit or change avatar
router.post(
    "/avatar",
    Auth,
    Authorize(Role.Student),
    upload.single("avatar"),
    studentController.editAvatar
);

// get semester all/specific information
router.get("/semester/:sem", Auth, Authorize(Role.Student), studentController.getSemesterInfo);
//add semester info
router.post("/semester/", Auth, Authorize(Role.Student), studentController.addSemesterInfo);

module.exports = router;
