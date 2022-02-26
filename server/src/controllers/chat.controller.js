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
        /** if req is from mentor  */
        if (req.user.role === roles.Mentor) {
            for (let i = 0; i < students.length; i++) {
                const chat = new Chat();
                // adding mentor to list
                chat.users.push({
                    role: req.user.role,
                    user: req.user._id,
                });
                // adding student to list
                chat.users.push({
                    role: roles.Student,
                    user: students[i],
                });

                await chat.save();
            }
        }

        /** if req is from mentor */
        if (req.user.role === roles.Student) {
            for (let i = 0; i < students.length; i++) {
                const chat = new Chat();
                // adding creating student to list
                chat.users.push({
                    role: req.user.role,
                    user: req.user._id,
                });
                // adding student to list
                chat.users.push({
                    role: roles.Student,
                    user: students[i],
                });

                await chat.save();
            }
        }

        response.success(res);
        next();
    } catch (err) {
        console.log(err);
        response.error(res);
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
            chats = await Chat.find({ "users.user": req.user._id }).populate("users.user");
        }

        if (req.user.role === roles.Student) {
            chats = await Chat.find({ "users.user": req.user._id }).populate("users.user");
        }
        response.success(res, "", chats);
        next();
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};
