const mongoose = require("mongoose");

const notificationModel = new mongoose.Schema(
    {
        event: {
            type: Object,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "creatorModel",
            required: true,
        },
        creatorModel: {
            type: String,
            trim: true,
            required: true,
            enum: ["Mentor", "Student", "Admin"],
        },
        content: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "event.model",
            required: true,
        },
        receivers: [
            {
                role: String,
                user: { type: mongoose.Schema.Types.ObjectId, refPath: "receivers.role" },
                read: { type: Boolean, default: false },
                willReceive: { type: Boolean, default: true },
            },
        ],
        // receivers will be set by the method which triggers the notification
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationModel);
module.exports = Notification;
