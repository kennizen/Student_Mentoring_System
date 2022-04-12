// const cron = require('node-cron');
// const Chat = require("../models/Chat");
// const Post = require("../models/Post");
// const Comment = require("../models/Comment");
// const Student = require("../models/Student");
// const Mentor = require("../models/Mentor");

// //   * * * * * *
// //   | | | | | |
// //   | | | | | day of week
// //   | | | | month
// //   | | | day of month
// //   | | hour
// //   | minute
// //   second ( optional )

// /**
//  *  This scheduler runs at specific time and check if there we interactions
//  *  between mentor and mentee in the past week.
//  *
//  *  it checks for messages, posts, comments of the mentor and mentee;
//  */
// cron.schedule('* * * * *', async () => {
//     console.log('running a task every minute');

//     try {
//         const mentors = await Mentor.find();

//         // looping for each mentor
//         mentors.forEach(async (mentor) => {
//             // if mentor has no assigned students
//             if(mentor.assigned === "unassigned"){
//                 return;
//             }

//             try {
//                 // find students assigned to the mentor
//                 const students = await Student.find({ mentoredBy: mentor._id });

//                 // looping through each student
//                 students.forEach(async (student) => {
//                     const today = new Date();
//                     const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

//                     // find that chat of the current mentor and student
//                     const chat = await Chat.findOne({
//                         $and: [{ "users.user": mentor._id }, { "users.user": student._id}],
//                     }).populate("latestMessage");

//                     // if the new message is older that of lastweek
//                     if(chat.latestMessage.createdAt < lastWeek) {
//                         console.log("No interacction");
//                         // send mail to both mentor and mentee
//                     }

//                     // else {
//                     //     console.log("last interaction was at", chat.latestMessage.createdAt);
//                     // }
//                 })

//             }
//             catch(err){
//                 console.log(err);
//             }

//         })

//     }
//     catch(err){
//         console.log("Cron err", err);
//     }
// });
