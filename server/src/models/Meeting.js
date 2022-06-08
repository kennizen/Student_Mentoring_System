const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
    {
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
        },
        participants: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                },
            },
        ],
        description: String,
        date: {
            type: Date,
        },
        url: {
            type: String,
            trim: true,
        },
        minutes: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
