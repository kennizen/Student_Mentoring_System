const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

// import chat contorller
const messageController = require("../controllers/message.controller");

router.post("/", Auth, Authorize([Role.Mentor, Role.Student]), messageController.createNewMessage);

router.get(
    "/:chatId",
    Auth,
    Authorize([Role.Mentor, Role.Student]),
    messageController.fetchAllMessage
);

module.exports = router;
