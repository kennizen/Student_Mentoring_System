const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const response = require("../utils/responses.utils");
const roles = require("../utils/roles");
const notificationController = require("../controllers/notification.controller");
const events = require("../utils/logEvents");
const interactionController = require("./interaction.controller");
const interactionEvents = require("../utils/interactions.utils");

module.exports = {
    // create new post
    createNewPost: async (req, res, next) => {
        try {
            const body = req.body.body;
            const commentEnabled = req.body.commentEnabled;

            if (!body) {
                return response.badrequest(res, "Please provide all required fields", {});
            }
            const newPost = new Post();
            newPost.body = body;
            newPost.author = req.user._id;
            newPost.authorModel = req.user.role;
            newPost.commentEnabled = commentEnabled;

            if (req.user.role === roles.Student) {
                newPost.group_id = req.user.mentoredBy;
            }
            if (req.user.role === roles.Mentor) {
                newPost.group_id = req.user._id;
            }
            await newPost.save();

            // creating a notification
            if (req.user.role === roles.Mentor) {
                const mentees = await Student.find({ mentoredBy: req.user._id });
                // generating new post notification
                await notificationController.createNotification(
                    events.POST_CREATED,
                    newPost,
                    req.user,
                    mentees
                );
                
            }

            if (req.user.role === roles.Student) {
                const mentees = await Student.find({$and: [{
                    _id: { $ne: req.user._id }
                    },{ mentoredBy: req.user.mentoredBy }
                ]});
              
                const mentor = await Mentor.findById(req.user.mentoredBy);
                mentees.push(mentor);
                // generating new post notification
                await notificationController.createNotification(
                    events.POST_CREATED,
                    newPost,
                    req.user,
                    mentees
                );
            }

             // creating interactions
             const interaction = await interactionController.createInteraction("Post", req.user, newPost._id);

            // updating author for sending in response instead of requesting to db
            newPost.author = req.user;
            const authorData = newPost.author;
            response.success(res, "Post created", { postData: newPost, authorData });
            
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },
    // fetch all the posts in a group
    fetchAllPosts: async (req, res, next) => {
        try {
            let posts;
            let totalPages = 0;
            const page = parseInt(req.query.page);
            const limit = 5;

            if (req.user.role === roles.Mentor) {
                const totalDocuments = await Post.countDocuments({ group_id: req.user._id });
                totalPages = Math.ceil(totalDocuments / limit);
                posts = await Post.find({ group_id: req.user._id })
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate("author");
            }

            if (req.user.role === roles.Student) {
                const totalDocuments = await Post.countDocuments({ group_id: req.user.mentoredBy });
                totalPages = Math.ceil(totalDocuments / limit);
                posts = await Post.find({ group_id: req.user.mentoredBy })
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate("author");
            }

            const allPosts = posts.map((post) => {
                return { postData: { ...post._doc, author: undefined }, authorData: post.author };
            });
            response.success(res, "", {
                posts: allPosts,
                currentPage: page,
                totalPage: totalPages,
            });
            next();
        } catch (err) {
            console.log(err);
        }
    },
    editPostById: async (req, res, next) => {
        try {
            const editedPost = req.body.body;
            const post = await Post.findById(req.params.id);

            if (!post) {
                throw new Error();
            }
            // check.. to allow only post authors to edit a post
            if (post.author.toString() != req.user._id.toString()) {
                return response.forbidden(res, "You are not the author of the post");
            }

            post.body = editedPost;
            await post.save();
            response.success(res, "", { post: { postData: post, authorData: req.user } });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    deletePostById: async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                throw new Error();
            }

            // delete post via its id
            const postDeleted = await Post.deleteOne({ _id: req.params.id });

            if (!postDeleted) {
                throw new Error();
            }
            const commentsDeleted = await Comment.deleteMany({ post_id: post._id });

            if (!commentsDeleted) {
                throw new Error();
            }

            response.success(res, "Post successfully deleted", { post: { _id: post._id } });
            next();
        } catch (err) {
            response.error(res);
        }
    },
    addNewComment: async (req, res, next) => {
        try {
            const comment = req.body.body;
            const newComment = new Comment(); // creating a new comment
            newComment.body = comment;
            newComment.author = req.user._id;
            newComment.authorModel = req.user.role;
            newComment.post_id = req.params.id;

            const updatedPost = await newComment.save().then(async () => {
                // increments the comment count of the post and returns updated post
                return await Post.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { commentCount: 1 } },
                    { new: true }
                ).populate("author");
            });
            newComment.author = req.user; // updating author with the current user

            response.success(res, "Comment created", {
                post: {
                    postData: updatedPost,
                    authorData: updatedPost.author,
                },
                comment: {
                    commentData: newComment,
                    authorData: req.user,
                },
            });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },

    fetchAllComments: async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                throw new Error();
            }

            const comments = await Comment.find({ post_id: post._id })
                .sort({ createdAt: "asc" })
                .populate("author");

            const allComments = comments.map((comment) => {
                return {
                    commentData: comment,
                    authorData: comment.author,
                };
            });

            response.success(res, "", { commentsCount: comments.length, comments: allComments });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },

    deleteCommentById: async (req, res, next) => {
        try {
            const cid = req.params.id; // comment id
            const comment = await Comment.findById(cid).populate("author");

            if (!comment) {
                return response.notfound(res);
            }

            if (req.user.role !== comment.author.role) {
                return response.unauthorize(res, "", {});
            }

            const post = await Comment.findOneAndDelete({ _id: cid }).then(async (data) => {
                //decrements the comment count of the post
                return await Post.findOneAndUpdate(
                    { _id: data.post_id },
                    { $inc: { commentCount: -1 } },
                    { new: true }
                ).populate("author");
            });

            response.success(res, "Comment deleted", {
                post: {
                    postData: post,
                    authorData: post.author,
                },
                comment: {
                    commentData: comment,
                    authorData: req.user,
                },
            });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },
};
