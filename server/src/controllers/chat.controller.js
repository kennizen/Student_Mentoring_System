const Chat = require("../models/Chat");
const Mentor = require("../models/Mentor");
const response = require("../utils/responses.utils");
const roles = require("../utils/roles");

/**
 * @name createNewChat
 * @Desc This method creates a new chat and returns it
 * @return Returns the newly created Chat
 */
exports.createNewChat = async (req, res, next) => {
    try {
        const { chats } = req.body;

        if (!chats) {
            throw new Error();
        }

        let newChatArray = [];

        /** if req is from mentor  */
        if (req.user.role === roles.Mentor) {
            for (let i = 0; i < chats.length; i++) {
                const chat = new Chat();
                // query db to check if exists
                const chatExists = await Chat.find({
                    $and: [{ "users.user": req.user._id }, { "users.user": chats[i] }],
                });

                // if chat already exists
                if (chatExists.length > 0) {
                    return response.alreadyExist(res, "Chat already exist", {});
                }
                // adding mentor to list
                chat.users.push({
                    role: req.user.role,
                    user: req.user._id,
                });
                // adding student to list
                chat.users.push({
                    role: roles.Student,
                    user: chats[i],
                });
                const newChat = await (await chat.save()).populate("users.user").execPopulate();
                newChatArray.push(newChat);
            }
        }

        /** if req is from student */
        if (req.user.role === roles.Student) {
            for (let i = 0; i < chats.length; i++) {
                const chat = new Chat();
                // query db to check if exists
                const chatExists = await Chat.find({
                    $and: [{ "users.user": req.user._id }, { "users.user": chats[i] }],
                });

                // if chat already exists
                if (chatExists.length > 0) {
                    return response.alreadyExist(res, "Chat already exist", {});
                }
                // adding creating student to list
                chat.users.push({
                    role: req.user.role,
                    user: req.user._id,
                });

                const mentor = await Mentor.findById(chats[i]);

                // adding student to list
                if (!mentor) {
                    chat.users.push({
                        role: roles.Student,
                        user: chats[i],
                    });
                } else {
                    chat.users.push({
                        role: roles.Mentor,
                        user: chats[i],
                    });
                }

                const newChat = await (await chat.save()).populate("users.user").execPopulate();
                newChatArray.push(newChat);
            }
        }

        response.success(res, "Chat created", { newChatArray });
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
            chats = await Chat.find({ "users.user": req.user._id })
                .populate("users.user")
                .populate("latestMessage");
        }

        if (req.user.role === roles.Student) {
            chats = await Chat.find({ "users.user": req.user._id })
                .populate("users.user")
                .populate("latestMessage");
        }
        response.success(res, "", chats);
        next();
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};
