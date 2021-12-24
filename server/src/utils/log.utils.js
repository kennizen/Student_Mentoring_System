const Log = require("../models/Log");

module.exports = {
    generateLog: (logEvent, user, ip) => {
        const newLog = new Log();
        newLog.event_type = logEvent.eventType;
        newLog.user = user._id;
        newLog.user_role = user.role;
        newLog.log_detail = logEvent.logDetail;
        newLog.ip = ip;
        newLog.save();
    },
};
