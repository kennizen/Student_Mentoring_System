const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "userModel",
        },
        userModel: {
            type: String,
            enum: ["Admin", "Mentor", "Student"],
        },
        event_type: String,
        event_detail: String,
        ip: String,
    },
    {
        timestamps: true,
    }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
