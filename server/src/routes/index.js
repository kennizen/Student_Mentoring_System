const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

// importing contollers/handlers
const indexController = require("../controllers/index.controller");

/**   This file consists all the routes shared by all users of the system   */

// route to get user info of either mentor/student via its id
router.get(
    "/user/:id",
    Auth,
    Authorize([Role.Mentor, Role.Student]),
    indexController.userInfoHandler
);

router.get("/verifyEmail/:token", indexController.emailVerificationHandler);

// get reset password html page
router.get("/resetPassword/:token", indexController.resetPassword);
// set new password with link
router.post("/resetPassword/:token", indexController.setNewPassword);

module.exports = router;
