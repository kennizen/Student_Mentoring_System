const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            url: String,
            id: String,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
