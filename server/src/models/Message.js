const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "senderModel",
        },
        senderModel: {
            type: String,
            required: true,
            enum: ["Mentor", "Student"],
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
