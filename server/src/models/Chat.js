const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
    {
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
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
