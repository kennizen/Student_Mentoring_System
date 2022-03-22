const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const { Server } = require("socket.io");

const Chat = require("./models/Chat");

// mongoose config
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Allows cross-origin requests
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", true);
/** server HTTP request logging
 * :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
 * */
//logging HTTP requests to logs/access.log file
app.use(
    morgan("combined", {
        stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
    })
);

// logging to console
app.use(morgan("dev"));

// importing routes
const adminRoutes = require("./routes/admin");
const mentorRoutes = require("./routes/mentor");
const studentRoutes = require("./routes/student");
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/post");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

// setting routes
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/mentor", mentorRoutes);
app.use("/student", studentRoutes);
app.use("/posts", postRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

global.socketMap = {};

io.on("connection", (socket) => {
    console.log("connected to socket");

    socket.on("setup", (userId) => {
        socket.join(userId);
        // console.log("socket id",socket.id)
        // console.log("user connected", userId);
        socketMap[`${userId}`] = socket.id;
        socket.emit("connected");
    });

    // socket.on("join chat", (chatId) => {
    //     socket.join(chatId);
    //     console.log("chatId", chatId);
    //     console.log(socketMap);
    // });

    socket.on("newMessage", async (newMessage) => {
        console.log("newMessage", newMessage);
        if (!newMessage.data.chat) return console.log("error on chat id");
        console.log("newMessage sender id", newMessage.data.sender._id);
        const chat = await Chat.findById(newMessage.data.chat);
        console.log("chat", chat);

        const receiver = chat.users.find(
            (item) => item.user != newMessage.data.sender._id.toString()
        );
        console.log("receiver", receiver);

        io.to(socketMap[receiver.user]).emit("message received", newMessage);
    });
});
