/**
 * List of events being performed by the users throughout the system
 * Its is required to specify the models of the events which we are using notifications
 * They are used to populate the content of the notifications
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
        model: "Comment",
    },
    COMMENT_DELETED: {
        type: "COMMENT_DELETED",
        detail: "Deleted a comment",
        model: "Comment",
    },
    POST_CREATED: {
        type: "POST_CREATED",
        detail: "Created a new post",
        model: "Post",
    },
    POST_UPDATED: {
        type: "POST_UPDATED",
        detail: "Updated a new post",
        model: "Post",
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
    MEETING_CREATED: {
        type: "MEETING_CREATED",
        detail: "Scheduled a meeting",
        model: "Meeting",
    },
    MEETING_UPDATED: {
        type: "MEETING_UPDATED",
        detail: "Updated a meeting",
        model: "Meeting",
    },
};
