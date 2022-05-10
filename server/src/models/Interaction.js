const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "Mentor",
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "Student"
    },
    interactions: {
        messages: Number,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        meetings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meeting"
        }]
    }
}, {
    timestamps: true
})

const Interaction = mongoose.model("Interaction", interactionSchema);

moduyle.exports = Interaction;