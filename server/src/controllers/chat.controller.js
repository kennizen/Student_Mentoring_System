const Chat = require("../models/Chat");
const response = require("../utils/responses.utils");
const roles = require("../utils/roles");

/**
 * @name createNewChat
 * @Desc This method create a new chat
 */
exports.createNewChat = async (req, res, next) => {
    try {
        const { students } = req.body;

        if (!students) {
            throw new Error();
        }

        for (let i = 0; i < students.length; i++) {
            const chat = new Chat();
            chat.mentor = req.user._id;
            chat.student = students[i];
            chat.userModel = req.user.role;
            await chat.save();
        }

        response.success(res);
    } catch (err) {
        console.log(err);
    }
};

/**
 * @name fetchAllChats
 * @Desc This method fetches all the chats
 */
exports.fetchAllChats = async (req, res, next) => {
    try {
        let chats;
        if (req.user.role === roles.Mentor) {
            chats = await Chat.find({ mentor: req.user._id }).populate(["mentor", "student"]);
        }

        if (req.user.role === roles.Student) {
            chats = await Chat.find({ student: req.user._id }).populate(["mentor", "student"]);
        }

        response.success(res, "", chats);
    } catch (err) {
        crossOriginIsolated.log(err);
    }
};
