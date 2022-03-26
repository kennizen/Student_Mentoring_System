const mongoose = require("mongoose");

const groupModel = new mongoose.Schema({
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
        },
        mentees: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Student"
        },
    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model("Group", groupModel);
module.exports = Group;
