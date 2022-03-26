/**
 * This module consists all the socket related code
 */
module.exports = {
    start: function(io) {
        
        io.on("connection", (socket) => {
            console.log("connected to socket");
            socket.on("setup", (userId) => {
                socket.join(userId);
                msgSocketMap[`${userId}`] = socket.id;
                socket.emit("connected");
                console.log("msg socket map",msgSocketMap);
            });
        
           
            socket.on("notify setup", (userId) => {
                socket.join(userId);
                console.log("user id", userId);
                notifySocketMap[`${userId}`] = socket.id;
                console.log("notify socket map", notifySocketMap);
            });
        
            socket.on("newMessage", async (newMessage) => {
                if (!newMessage.data.chat._id) return console.log("error on chat id");
                const users = newMessage.data.chat.users;
                const receiver = users.find(
                    (item) => item.user._id.toString() != newMessage.data.sender._id.toString()
                );
                io.to(msgSocketMap[receiver.user._id]).emit("message received", newMessage);
            });
            
            socket.on("newNotification", (data) => {
                io.to(notifySocketMap["623573ecfb066724f78c3a51"]).emit("new Notification", data);
            })
        });
    }
}
