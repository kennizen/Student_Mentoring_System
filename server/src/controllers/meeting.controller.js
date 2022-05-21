const Meeting = require("../models/Meeting");
const response = require("../utils/responses.utils");
const roles = require("../utils/roles");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const events = require("../utils/logEvents");
const notificationController = require("../controllers/notification.controller");
const interactionController = require("./interaction.controller");
const interactionEvents = require("../utils/interactions.utils");
/**
 *  The method fetches all the available meeting of the current user
 */
module.exports.getAllMeetings = async (req, res, next) => {
    try {
        let meetings = [];

        // if request is from mentor
        if (req.user.role === roles.Mentor) {
            meetings = await Meeting.find({ host: req.user._id });
        }

        // if request is from student/mentee
        if (req.user.role === roles.Student) {
            meetings = await Meeting.find({ "participants.user": req.user._id });
        }

        response.success(res, "", meetings);
        next();
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};

/**
 *  The method creates and schedules new meetings with link
 */
module.exports.createMeeting = async (req, res, next) => {
    try {
        const { participants, description, date, url } = req.body;

        // checking if all fields are provided
        if (!participants || participants.length < 1 || !description || !date || !url) {
            return response.badrequest(res);
        }

        const newMeeting = new Meeting();

        // adding participants
        for (let i = 0; i < participants.length; i++) {
            newMeeting.participants.push({
                user: participants[i],
            });
        }

        newMeeting.host = req.user._id;
        newMeeting.date = date;
        newMeeting.description = description;
        newMeeting.url = url;

        await (await newMeeting.save()).populate("participants.user").execPopulate();
        response.success(res, newMeeting);

        // creating a notification
        if (req.user.role === roles.Mentor) {
            // generating new post notification

            const receivers = newMeeting.participants.map((item) => {
                return {
                    _id: item.user,
                    role: roles.Student
                }
            })

            await notificationController.createNotification(
                events.MEETING_CREATED,
                newMeeting,
                req.user,
                receivers
            );
            
            // generating interactions on meeting
            for await (const mentee of receivers) {
                const interaction = await interactionController.createInteraction(interactionEvents.MEETING, req.user._id, mentee._id, newMeeting);
            }
        }

        next();
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};
