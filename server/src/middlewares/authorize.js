const response = require("../utils/responses.utils");

/**
 *  This module is for Role Based Authorization of every user requests.
 *  It is passed as a middleware to the routes, for authorization of every requests; i.e.,
 *  It checks if the user sending the request has the permission to complete the requested action/operation
 */

module.exports = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.Mentor] or ['Admin', 'Mentor'])
    if (typeof roles === "string") {
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // if user's role is not authorized
                console.log("authrize error");
                return response.forbidden(res);
            }
            // if authentication and authorization successful
            next();
        },
    ];
};
