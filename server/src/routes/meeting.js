const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");

// imports contoroller
const meetingController = require("../controllers/meeting.controller"); 

router.get("/", Auth, Authorize([roles.Mentor, roles.Student]), meetingController.getAllMeetings);