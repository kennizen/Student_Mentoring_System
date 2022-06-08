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
const getAllMeetings = async (req, res, next) => {
    try {
        let meetings = [];

        // if request is from mentor
        if (req.user.role === roles.Mentor) {
            meetings = await Meeting.find({ host: req.user._id })
                .populate("host")
                .populate("participants.user");
        }

        // if request is from student/mentee
        if (req.user.role === roles.Student) {
            meetings = await Meeting.find({ "participants.user": req.user._id })
                .populate("host")
                .populate("participants.user");
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
const createMeeting = async (req, res, next) => {
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

        await (await newMeeting.save())
            .populate("participants.user")
            .populate("host")
            .execPopulate();
        response.success(res, "Meeting created", newMeeting);

        // creating a notification
        if (req.user.role === roles.Mentor) {
            // generating new post notification

            const receivers = newMeeting.participants.map((item) => {
                return {
                    _id: item.user,
                    role: roles.Student,
                };
            });

            await notificationController.createNotification(
                events.MEETING_CREATED,
                newMeeting,
                req.user,
                receivers
            );

            // generating interactions on meeting

            // creating interactions
            const interaction = await interactionController.createInteraction(
                "Meeting",
                req.user,
                newMeeting._id
            );
        }

        next();
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};

const updateMeeting = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { participants, date, description, url, minutes } = req.body;

        const meeting = await Meeting.findById(id);

        if (!meeting) {
            return response.notfound(res);
        }

        const part = [];

        // adding participants
        for (let i = 0; i < participants.length; i++) {
            part.push({
                user: participants[i],
            });
        }
        meeting.participants = part;
        meeting.date = date || meeting.date;
        meeting.description = description || meeting.description;
        meeting.url = url || meeting.url;
        meeting.minutes = minutes || meeting.minutes;

        await (await meeting.save()).populate("participants.user").populate("host").execPopulate();
        response.success(res, "Meeting updated", meeting);
        next();
    } catch (err) {
        console.log(err);
    }
};

const updateMinutes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { minutes } = req.body;

        const meeting = await Meeting.findByIdAndUpdate(
            id,
            {
                $set: {
                    minutes: minutes,
                },
            },
            { new: true }
        )
            .populate("host")
            .populate("participants.user");

        response.success(res, "Minutes updated", meeting);
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};

module.exports = {
    createMeeting,
    getAllMeetings,
    updateMeeting,
    updateMinutes,
};
