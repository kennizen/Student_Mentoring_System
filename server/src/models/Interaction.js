const mongoose = require("mongoose");

// const interactionSchema = new mongoose.Schema({
//     mentor: {
//         type: mongoose.Schema.Types.ObjectId,
//         trim: true,
//         required: true,
//         ref: "Mentor",
//     },
//     student: {
//         type: mongoose.Schema.Types.ObjectId,
//         trim: true,
//         required: true,
//         ref: "Student"
//     },
//     interactions: {
//         messages: {
//             type: Number,
//             default: 0
//         },
//         posts: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }],
//         meetings: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Meeting"
//         }]
//     }
// }, {
//     timestamps: true
// })

// const interactionSchema = new mongoose.Schema({
//     eventType: {
//         type: String,
//         enum: ["Post", "Meeting"]
//     },
//     mentor: {
//         type: mongoose.Schema.Types.ObjectId,
//         trim: true,
//         required: true,
//         ref: "Mentor",
//     },
//     students: [{
//         type: mongoose.Schema.Types.ObjectId,
//         trim: true,
//         required: true,
//         ref: "Student"
//     }],
//     creator: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         trim: true,
//         ref: "creatorModel"
//     },
//     creatorModel: {
//         type: String,
//         trim: true,
//         required: true,
//         enum: ["Mentor", "Student"]
//     },
//     content: {
//         type: mongoose.Schema.Types.ObjectId,
//         trim: true,
//         required: true,
//         refPath: "eventType"
//     },
//     date: {
//         type: Date,
//         default: new Date().toString()
//     }
// }, {
//     timestamps: true
// })

const interactionSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "Mentor"
    },
    interactionCount: {
        post: {
            type: Number,
            default: 0
        },
        meeting: {
            type: Number,
            default: 0
        }
    },
    date: {
        type: Date,
        default: new Date()
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Post"
    }],
    meetings: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Meeting"
    }],
});

const Interaction = mongoose.model("Interaction", interactionSchema);

module.exports = Interaction;