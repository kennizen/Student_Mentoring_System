const Chat = require("../models/Chat");
const response = require("../utils/responses.utils");

/**
 * @name createNewChat
 * @Desc This method create a new chat
 */
exports.createNewChat = async (req, res, next) => {
    try {
        const { users } = req.body;

        const newChat = new Chat({
            users,
            userModel: req.user.role,
        });

        // console.log(newChat);
        await newChat.save();
        response.success(res, "Chat created", {});
        next();
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
        const chats = await Chat.find({ users: req.user._id }).populate("users");
        response.success(res, "", chats);
    } catch (err) {
        crossOriginIsolated.log(err);
    }
};
