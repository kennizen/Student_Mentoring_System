const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

// import chat contorller
const chatController = require("../controllers/chat.controller");

router.post("/", Auth, Authorize([Role.Mentor, Role.Student]), chatController.createNewChat);
router.get("/", Auth, Authorize([Role.Mentor, Role.Student]), chatController.fetchAllChats);

module.exports = router;
