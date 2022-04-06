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
        message: Boolean,
        post: Boolean,
        comment: Boolean
    }
}, {
    timestamps: true
})

const Interaction = mongoose.model("Interaction", interactionSchema);

moduyle.exports = Interaction;