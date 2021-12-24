const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        user: String,
        user_role: String,
        event_type: String,
        log_detail: String,
        ip: String,
    },
    {
        timestamps: true,
    }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
