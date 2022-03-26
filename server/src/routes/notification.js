const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

// controller
const notificationController = require("../controllers/notification.controller");

// get all notifications
router.get("/", Auth, Authorize([Role.Mentor, Role.Student]), notificationController.getAllNotifications);

module.exports = router;