const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: String,
        },
        body: {
            type: String,
        },
        post_id: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
