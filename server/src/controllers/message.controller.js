const Message = require("../models/Message");
const response = require("../utils/responses.utils");

exports.createNewMessage = async (req, res, next) => {
    try {
        const { content, chat } = req.body;

        if (!content || !chat) {
            response.badrequest(res, "All filed required", {});
        }

        const newMessage = new Message({
            sender: req.user._id,
            senderModel: req.user.role,
            content,
            chat,
        });

        const resMessage = await (await newMessage.save()).populate("sender").execPopulate();
        response.success(res, "Message created", resMessage);
        next();
    } catch (err) {
        console.log("Error", err);
    }
};

exports.fetchAllMessage = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        const messages = await Message.find({ chat: chatId }).populate("sender");
        response.success(res, "", messages);
    } catch (err) {
        console.log(err);
    }
};
