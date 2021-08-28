const Response = require("../utils/response.utils");

/** 
 *  This module is for Role Based Authorization of every user requests.
 *  It is passed as a middleware to the routes, for authorization of every requests; i.e.,
 *  It checks if the user sending the request has the permission to complete the requested action/operation 
 */

module.exports = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.Mentor] or ['Admin', 'Mentor'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(403).send( Response.forbidden("", {}))
            }
            // authentication and authorization successful
            next();
        }
    ]
}