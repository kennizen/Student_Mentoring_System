const Meeting = require("../models/Meeting");
const response = require("../utils/responses.utils");

/**
 *  The method fetches all the available meeting of the current user 
 */
module.exports.getAllMeetings = async (req, res, next) => {
    try {
        const meetings = await Meeting.find({ "participants.user": req.user._id });
        response.success(res, "", meetings);
    }
    catch(err) {
        console.log(err);
    }
}

/**
 *  The method creates and schedules new meetings with link
 */
module.exports.createMeeting = async (req, res, next) => {
    try {
        const { participants } = req.body;
    }
    catch(err){
        console.log(err);
    }
}