const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        body: {
            type: String,
        },
        author: {
            type: String,
        },
        createdOn: {
            type: Date,
            default: Date.now(),
        },
        group_id: {
            type: String,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;