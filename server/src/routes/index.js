const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");
const Logger = require("../middlewares/logger");
const events = require("../utils/logEvents");

// importing contollers/handlers
const indexController = require("../controllers/index.controller");

/**   This file consists all the routes shared by all users of the system   */

// importing multer config
const upload = require("../config/multer");

// route to get user info of either mentor/student via its id
router.get(
    "/user/:id",
    Auth,
    Authorize([roles.Mentor, roles.Student]),
    indexController.userInfoHandler
);

router.get("/verifyEmail/:token", indexController.emailVerificationHandler);

// get reset password html page
router.get("/resetPassword/:token", indexController.resetPassword);
// set new password with link
router.post("/resetPassword/:token", indexController.setNewPassword);

// edit or change avatar
router.post(
    "/avatar",
    Auth,
    Authorize([roles.Mentor, roles.Student]),
    upload.single("avatar"),
    indexController.editAvatar,
    Logger(events.AVATAR_UPDATED)
);

//  remove avatar/ profile img
router.delete(
    "/avatar",
    Auth,
    Authorize([roles.Mentor, roles.Student]),
    indexController.deleteAvatar,
    Logger(events.AVATAR_UPDATED)
);

router.get("/holidays", Auth, Authorize([roles.Mentor, roles.Student]), indexController.getAllHolidays);

router.get("/getStats", Auth, Authorize([roles.Admin, roles.Mentor, roles.Student]), indexController.getStats);

module.exports = router;
