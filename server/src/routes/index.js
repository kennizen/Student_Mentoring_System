const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");
const Logger = require("../middlewares/logger");
const events = require("../utils/logEvents");

// importing contollers/handlers
const indexController = require("../controllers/index.controller");
const interactionsControler = require("../controllers/interaction.controller");

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

// generate email verification link
// router.post("/verifyEmail", Auth, Authorize(roles.Mentor), indexController.generateEmailVerificationToken);


router.post("/forgotPassword", indexController.forgotPassword);
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

router.get(
    "/holidays",
    Auth,
    Authorize([roles.Mentor, roles.Student]),
    indexController.getAllHolidays
);

router.get(
    "/getStats",
    Auth,
    Authorize([roles.Admin, roles.Mentor, roles.Student]),
    indexController.getStats
);

// fetching all logs from db
router.get(
    "/logs",
    Auth,
    Authorize([roles.Admin, roles.Mentor, roles.Student]),
    indexController.getAllLogs
);

// fetching all interactions from db
router.get(
    "/interactions",
    Auth,
    Authorize([roles.Admin, roles.Mentor, roles.Student]),
    interactionsControler.getAllInteractions
);

router.get(
    "/interactions/summary",
    Auth,
    Authorize([roles.Admin, roles.Mentor, roles.Student]),
    indexController.getInteractionsSummary_v2
);

router.post("/verifyCaptcha",  indexController.verifyCaptcha);

module.exports = router;
