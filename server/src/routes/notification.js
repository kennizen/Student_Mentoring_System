const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

// controller
const notificationController = require("../controllers/notification.controller");

// get all notifications
router.get("/", Auth, Authorize([Role.Mentor, Role.Student]), notificationController.getAllNotifications);

// get notification by id
router.get("/:id", Auth, Authorize([Role.Mentor, Role.Student]), notificationController.getNotificationById);

// mark notifications as read 
router.post("/read", Auth, Authorize([Role.Mentor, Role.Student]), notificationController.setNotificationAsRead);

module.exports = router;