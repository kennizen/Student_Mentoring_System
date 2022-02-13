const Log = require("../models/Log");

/**
 * @Desc This middleware logs the events/actions performed by the users.
 * @param {*} event The method expects the event type being performed by the user from the list of available events
 */

const Logger = (event) => {
    return (req, res, next) => {
        const newLog = new Log({
            user: req.user._id,
            userModel: req.user.role,
            event_type: event.type,
            event_detail: event.detail,
            ip: req.ip,
        });
        newLog.save();
        next();
    };
};

module.exports = Logger;
