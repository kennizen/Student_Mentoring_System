const mongoose = require("mongoose");

const notificationModel = new mongoose.Schema(
    {
        type: {
            type: String,
            trim: true,
            required: true,
            enum: ["Post", "Comment", "Meeting"]
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: creatorModel,
            required: true,
        },
        creatorModel: {
            type: String,
            trim: true,
            required: true,
            enum: ["Mentor", "Student", "Admin"]
        },
        content: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: contentModel,
            required: true
        },
        contentModel: {
            type: String,
            trim: true,
            required: true,
            enum: ["Post", "Comment"]
        }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationModel);
module.exports = Notification;
