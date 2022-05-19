const Meeting = require("../models/Meeting");
const response = require("../utils/responses.utils");
const roles = require("../utils/roles");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
/**
 *  The method fetches all the available meeting of the current user
 */
module.exports.getAllMeetings = async (req, res, next) => {
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

        await (await newMeeting.save())
            .populate("participants.user")
            .populate("host")
            .execPopulate();
        response.success(res, newMeeting);
        next();
    } catch (err) {
        console.log(err);
        response.error(res);
    }
};
