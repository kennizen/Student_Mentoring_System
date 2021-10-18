const express = require("express");
const Auth = require("../middlewares/auth");
const Authorize = require("../middlewares/authorize");
const Roles = require("../utils/roles");
const router = express.Router();

// importing controlers
const postController = require("../controllers/post.controller");

// edit post route
router.post(
    "/:id/edit/",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    postController.editPostHandler
);

// delete post route
router.post(
    "/:id/delete",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    postController.deletePostHandler
);

// new comment on post
router.post(
    "/:id/comment",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    postController.addCommentHandler
);

// fetch all commenst on a post
router.get(
    "/:id/comment",
    Auth,
    Authorize([Roles.Mentor, Roles.Student]),
    postController.fetchAllCommentsHandler
);

module.exports = router;
