const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        body: {
            type: String,
        },
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
        commentEnabled: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

// hiding sensitive info from user
postSchema.methods.toJSON = function () {
    const post = this;
    const postObject = post.toObject();
    delete postObject.authorModel;
    delete postObject.author.password;
    delete postObject.author.role;
    delete postObject.author.tokens;
    delete postObject.author.createdAt;
    delete postObject.author.updatedAt;
    delete postObject.author.assigned;
    delete postObject.author.studentCount;
    return postObject;
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
