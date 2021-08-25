const express = required("express");
const router = express.router();

const mentorController = require("../controllers/mentor.controller");

// mentor login
router.post("/login", mentorLoginHandler);