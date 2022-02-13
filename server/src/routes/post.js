const express = require("express");
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Roles = require("../utils/roles");
const GroupChecker = require("../middlewares/groupChecker");
const router = express.Router();
const Logger = require("../middlewares/logger");
const events = require("../utils/logEvents");

// importing controlers
const postController = require("../controllers/post.controller");

// create new post route
router.post(
    "/",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.createNewPost,
    Logger(events.POST_CREATED)
);

// get all posts
router.get(
    "/",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.fetchAllPosts
);

// edit post route
router.post(
    "/:id/edit/",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.editPostById,
    Logger(events.POST_UPDATED)
);

// delete post route
router.post(
    "/:id/delete",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.deletePostById,
    Logger(events.POST_DELETED)
);

// new comment on post
router.post(
    "/:id/comment",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.addNewComment,
    Logger(events.COMMENT_CREATED)
);

// fetch all commenst on a post
router.get(
    "/:id/comments",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.fetchAllComments
);

// delete a comment
router.post(
    "/comment/:id/delete",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    GroupChecker,
    postController.deleteCommentById,
    Logger(events.COMMENT_DELETED)
);

module.exports = router;
