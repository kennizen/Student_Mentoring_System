/**
 * This module consists all the socket related code
 */
const ObjectId = require("mongoose").Types.ObjectId;
const roles = require("../utils/roles");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// env config
dotenv.config();

module.exports = {
    start: function (io) {
        // auth middleware for socket io
        // io.use(async (socket, next) => {
        //     try {
        //         let user;
        //         const token = socket.handshake.query.auth;

        //         if (!token) {
        //             throw new Error("Auth token not provided");
        //         }

        //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //         if (decoded.role == roles.Mentor) {
        //             user = await Mentor.findOne({
        //                 _id: decoded._id,
        //                 "tokens.token": socket.handshake.query.auth,
        //             });
        //         }

        //         if (decoded.role == roles.Student) {
        //             user = await Student.findOne({
        //                 _id: decoded._id,
        //                 "tokens.token": socket.handshake.query.auth,
        //             });
        //         }
        //         socket.user = user;
        //         next();
        //     } catch (err) {
        //         console.log("socket err", err);
        //     }
        // });

        io.on("connection", (socket) => {
            console.log("connected to socket");

            // on socket disconnect
            socket.on("disconnect", () => {
                delete msgSocketMap[socket?.user?._id];
                delete notifySocketMap[socket?.user?._id];
            });

            socket.on("setup", (userId) => {
                socket.join(userId);
                msgSocketMap[`${userId}`] = socket.id;
                socket.emit("connected");
                console.log("msg socket map", msgSocketMap);
            });

            // socket.on("notify setup", (userId) => {
            //     socket.join(userId);
            //     console.log("user id", userId);
            //     notifySocketMap[`${userId}`] = socket.id;
            //     console.log("notify socket map", notifySocketMap);
            // });

            socket.on("newMessage", async (newMessage) => {
                if (!newMessage.data.chat._id) return console.log("error on chat id");
                const users = newMessage.data.chat.users;
                const receiver = users.find(
                    (item) => item.user._id.toString() != newMessage.data.sender._id.toString()
                );
                io.to(msgSocketMap[receiver.user._id]).emit("message received", newMessage);
            });

            socket.on("newNotification", async (post) => {
                try {

                    console.log("post noti", post);
                    if (post.authorData.role === roles.Mentor) {
                        const students = await Student.find({ mentoredBy: post.postData.group_id });

                        students.forEach((student) => {
                            io.to(msgSocketMap[student._id]).emit("new Notification", post);
                        });
                    }

                    if(post.authorData.role === roles.Student){
                        const students = await Student.find({ mentoredBy: post.postData.group_id });
                        const mentor = await Mentor.findById(post.postData.group_id);

                        console.log("stu", students);
                        console.log("Mentor", mentor);

                        io.to(msgSocketMap[mentor._id]).emit("new Notification", post);
                        students.forEach((student) => {
                            if(student._id.toString() === post.authorData._id.toString()){
                                return;
                            }
                            io.to(msgSocketMap[student._id]).emit("new Notification", post);
                        });
                    }

                } catch (err) {
                    console.log(err);
                }
            });
        });
    },
};
