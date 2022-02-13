/**
 * List of events being performed by the users throughout the system
 */
module.exports = {
    SIGNUP: {
        type: "SIGNUP",
        detail: "New user signed up",
    },
    LOGIN: {
        type: "LOGIN",
        detail: "User signed in",
    },
    LOGOUT: {
        type: "LOGOUT",
        detail: "User signed out",
    },
    GROUP_UPDATE: {
        type: "GROUP_UPDATE",
        detail: "Updated a group",
    },
    COMMENT_CREATED: {
        type: "COMMENT_CREATED",
        detail: "Posted a new comment",
    },
    COMMENT_DELETED: {
        type: "COMMENT_DELETED",
        detail: "Deleted a comment",
    },
    POST_CREATED: {
        type: "POST_CREATED",
        detail: "Created a new post",
    },
    POST_UPDATED: {
        type: "POST_UPDATED",
        detail: "Updated a new post",
    },
    POST_DELETED: {
        type: "POST_DELETED",
        detail: "Deleted a post",
    },
    UPDATED_SEMESTER: {
        type: "UPDATED_SEMESTER",
        detail: "Updated semester details",
    },
    DELETED_SEMESTER: {
        type: "DELETED_SEMESTER",
        detail: "Deleted semester details",
    },
    AVATAR_UPDATED: {
        type: "AVATAR_UPDATED",
        detail: "Updated avatar",
    },
    PROFILE_UPDATED: {
        type: "PROFILE_UPDATED",
        detail: "Updated profile",
    },
    UPDATED_PAST_EDUCATION: {
        type: "UPDATED_PAST_EDUCATION",
        detail: "Updated past education",
    },
};
