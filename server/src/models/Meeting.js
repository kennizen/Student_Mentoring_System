const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor"
    },
    participants: [{
        user: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    date: {
        type: Date,
        required: true 
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
