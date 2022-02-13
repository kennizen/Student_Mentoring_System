const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "authorModel",
        },
        authorModel: {
            type: String,
            required: true,
            enum: ["Mentor", "Student"],
        },
        body: {
            type: String,
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
