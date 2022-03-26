const Notification = require("../models/Notification");
const response = require("../utils/responses.utils");

module.exports = {

    /**
     * createNotification: Creates new notification when an event is triggered
     * @Desc This method creates a new notification and saves it to db.
     * @param {*} event Triggered event type
     * @param {*} content Notification data
     * @param {*} creator User who created the notification
     * @param {*} receivers Users who will receive notifications
     */
    createPostNotification: async (event, content, creator, receivers) => {
        console.log("Post Notification triggered..")
        try{
            const newNotify = new Notification({
                event: event,
                creator: creator._id,
                creatorModel: creator.role,
                content: content._id,
                contentModel: event.model,
            });

            newNotify.receivers = receivers.map((receiver) => {
                return {
                    role: receiver.role,
                    user: receiver._id,
                    read: false
                }
            })

            await newNotify.save();
        }
        catch(err){
            console.log(err)
        }
    },

    // fetch all notification
    getAllNotifications: async (req, res, next) => {
        try{
            const notifications = await Notification.find({"receivers.user" : req.user._id}).populate(["creator", "content", "receivers.user"]);
            response.success(res, "", notifications);
        }
        catch(err){
            console.log(err)
        }
    }
}