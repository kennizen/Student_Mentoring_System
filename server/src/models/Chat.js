const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
    {
        users: [
            {
                role: String,
                user: { type: mongoose.Schema.Types.ObjectId, refPath: "users.role" },
            },
        ],
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
