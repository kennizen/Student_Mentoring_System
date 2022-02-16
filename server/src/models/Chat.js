const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "userModel",
            },
        ],
        userModel: {
            type: String,
            required: true,
            enum: ["Mentor", "Student"],
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
