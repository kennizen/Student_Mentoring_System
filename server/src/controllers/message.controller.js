const Chat = require("../models/Chat");
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
        resMessage.chat = await Chat.findByIdAndUpdate(
            resMessage.chat,
            {
                latestMessage: resMessage._id,
            },
            { new: true }
        ).populate("users.user");
        response.success(res, "Message created", resMessage);
        next();
    } catch (err) {
        console.log("Error", err);
    }
};

exports.fetchAllMessage = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        const page = parseInt(req.query.page);
        const limit = 20;

        const totalDocuments = await Message.countDocuments({ chat: chatId });
        const totalPages = Math.ceil(totalDocuments / limit);
        const messages = await Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("sender")
            .populate("chat");
        response.success(res, "", messages);
    } catch (err) {
        console.log(err);
    }
};
