const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");

const mentorController = require("../controllers/mentor.controller");

// mentor login
router.post("/login", mentorController.mentorLoginHandler);

// mentor signup
router.post("/signup", mentorController.mentorSignupHandler);

// mentor dashboard
router.get("/dashboard", Auth, mentorController.mentorDashboardHandler);

module.exports = router;