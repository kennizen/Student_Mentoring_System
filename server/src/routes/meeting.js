const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");

// imports contoroller
const meetingController = require("../controllers/meeting.controller"); 

// get all meetings
router.get("/", Auth, Authorize([roles.Mentor, roles.Student]), meetingController.getAllMeetings);

// create a new meeting
router.post("/", Auth, Authorize([roles.Mentor]), meetingController.createMeeting);

// update a new meeting
router.patch("/:id", Auth, Authorize([roles.Mentor]), meetingController.updateMeeting);

// update minutes
router.patch("/:id/minutes", Auth, Authorize([roles.Mentor]), meetingController.updateMinutes);

module.exports = router;