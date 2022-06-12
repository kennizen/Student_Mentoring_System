const cron = require("node-cron");
const Chat = require("../models/Chat");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const Interaction = require("../models/Interaction");
const emailService = require("../services/email.service");

// //   * * * * * *
// //   | | | | | |
// //   | | | | | day of week
// //   | | | | month
// //   | | | day of month
// //   | | hour
// //   | minute
// //   second ( optional )

/**
 *  This scheduler runs at specific time and check if there we interactions
 *  between mentor and mentee in the past week.
 *
 *  it checks for messages, posts, comments of the mentor and mentee;
 */

cron.schedule("0 0 * * 0", async () => {
  try {
    console.log("running a task every minute");
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 604800000);

    const mentors = await Mentor.find({});

    for await (const mentor of mentors) {
      const interaction = await Interaction.findOne({
        mentor: mentor._id,
        date: { $gte: lastWeek },
      });
      
      if(interaction === null && new Date(mentor.createdAt) < new Date() && mentor.isEmailVerified) {
        console.log("Send notification");
        await emailService.sendInactivityEmail(mentor.email);
      }
      
    }

  } catch (err) {
    console.log(err);
  }
});
