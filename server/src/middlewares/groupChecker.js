/**
 *  This middleware is used to check if the user has been assigned any mentor or not.
 *  If mentor is not assigned it blocks the request and responds the user with a error response.
 *
 *  It is used in the post module to ensure that only students which have been assigned any mentor can only
 *  have access to features like creating a post, editing, commenting on post, etc.
 *  Refer to the post module.
 *
 */

const roles = require("../utils/roles");
const response = require("../utils/responses.utils");

module.exports = groupChecker = async (req, res, next) => {
    if (req.user.role === roles.Mentor && req.user.assigned === "unassigned") {
        return response.error(res, "You are not in a group", {});
    }

    if (req.user.role === roles.Student && !req.user.mentoredBy) {
        return response.error(res, "You are not in a group", {});
    }

    // if user is in a group
    next();
};
