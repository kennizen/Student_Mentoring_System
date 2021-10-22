const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const Response = require("../utils/response.utils");

module.exports = {
    editPostHandler: async (req, res) => {
        try {
            const editedPost = req.body.body;
            const post = await Post.findById(req.params.id);

            console.log("post", post);
            console.log("post", editedPost);

            if (!post) {
                throw new Error();
            }
            // checks and allows only post authors to edit a post
            if (post.author != req.user._id) {
                return res.status(403).send(Response.forbidden("", {}));
            }

            post.body = editedPost;
            await post.save();
            res.send(Response.success("", { postData: post, authorData: req.user }));
        } catch (err) {
            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    deletePostHandler: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                throw new Error();
            }
            // checks and allows only post authors to edit a post
            if (post.author != req.user._id) {
                return res.status(403).send(Response.forbidden("", {}));
            }
            // delete post via its id
            const deleted = await Post.deleteOne({ _id: req.params.id });

            if (!deleted) {
                throw new Error();
            }
            res.send(Response.success("", {}));
        } catch (err) {
            res.status(500).send(Response.error("", {}));
        }
    },
    addCommentHandler: async (req, res) => {
        try {
            const comment = req.body.body;
            const post = await Post.findById(req.params.id);

            if (!post) {
                throw new Error();
            }
            const newComment = new Comment();
            newComment.body = comment;
            newComment.author = req.user._id;
            newComment.post_id = req.params.id;

            await newComment.save();
            // updating the comment count
            post.commentCount++;
            await post.save();

            res.send(
                Response.success("Comment created", {
                    post,
                    comment: {
                        commentData: newComment,
                        authorData: req.user,
                    },
                })
            );
        } catch (err) {
            console.log(err);
            res.status(500).send(Response.error("", {}));
        }
    },

    fetchAllCommentsHandler: async (req, res) => {
        try {
            const allComments = [];
            const post = await Post.findById(req.params.id);

            if (!post) {
                throw new Error();
            }

            const comments = await Comment.find({ post_id: post._id });

            for (let i = 0; i < comments.length; i++) {
                let user = await Mentor.findById(comments[i].author);

                if (!user) {
                    user = await Student.findById(comments[i].author);
                }

                let comment = {
                    commentData: comments[i],
                    authorData: user,
                };

                allComments.push(comment);
            }

            res.send(
                Response.success("", { commentsCount: allComments.length, comments: allComments })
            );
        } catch (err) {
            console.log(err);
            res.status(500).send(Response.error("", {}));
        }
    },

    deleteCommentHandler: async (req, res) => {
        try {
            const pid = req.params.pid; // post id
            const cid = req.params.cid; // comment id
            const post = await Post.findById(pid);

            if (!post) {
                return res.status(404).send(Response.notfound("Post Not found", {}));
            }
            const comment = await Comment.findOneAndDelete({ _id: cid, post_id: pid });
            console.log(deleted);

            if (!comment) {
                return res.status(404).send(Response.notfound("Comment Not found", {}));
            }
            post.commentCount--;
            await post.save();

            res.send(Response.success("", {}));
        } catch (err) {
            res.status(500).send(Response.error("", {}));
        }
    },
};
