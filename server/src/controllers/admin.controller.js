const Admin = require("../models/Admin");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const dotenv = require("dotenv");
const Response = require("../utils/response.utils");

// importing helpers methods
const studentHelpers = require("../helpers/student.helper");
const mentorHelpers = require("../helpers/mentor.helper");

// env config
dotenv.config();

module.exports = {
    // admin login handler fn
    adminLoginHandler: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                // if email/pass does not exists
                return res
                    .status(400)
                    .send(Response.badrequest("Please provide valid email/password", {}));
            }

            const admin = await Admin.findByCredentials(email, password);
            const token = await admin.generateAuthToken();
            res.send(Response.success("Login successful", { auth_token: token, role: "ADMIN" }));
        } catch (err) {
            console.log(err);
            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    // admin dashboard handler function
    adminDashboardHandler: (req, res) => {
        res.send(Response.success("", { user: req.user }));
    },

    // this route handler returns the list of all users i.e, all mentors and students
    getAllUsers: async (req, res) => {
        const students = await studentHelpers.getAllStudents();
        const mentors = await mentorHelpers.getAllMentors();
        res.send(Response.success("", { mentors, students }));
    },

    /**
     *  saveGroup route saves the mentor and students group
     *  We store the mentor's id in every students property named "mentordBy" , to establish a link
     *  between from a mentor to every students mentored by hims
     *  add/update and unassigned students operations are in this route
     * */
    saveGroup: async (req, res) => {
        try {
            const mentorCountToUpdate = {};
            const newStudentsList = {};
            const mentor = await Mentor.findById(req.body.mentorId);
            const students = req.body.studentIds;
            const oldStudents = await Student.find({ mentoredBy: req.body.mentorId }).distinct(
                "_id"
            );

            if (!mentor) {
                // if mentor doesn't exists
                console.log("inside mentor", mentor);
                return res.status(500).send(Response.error("Some error occured", {}));
            }

            console.log("1");
            // generating the newStudentList object or hash map
            for (let i = 0; i < students.length; i++) {
                if (!newStudentsList[students[i]]) {
                    newStudentsList[students[i]] = 1;
                }
            }

            console.log("2");
            // finding the students not in the old instance from db
            for (let i = 0; i < oldStudents.length; i++) {
                if (!newStudentsList[oldStudents[i]]) {
                    const oldStudent = await Student.findById(oldStudents[i]);
                    oldStudent.mentoredBy = "";
                    oldStudent.assigned = "";
                    await oldStudent.save();
                }
            }

            console.log("3");
            // looing through students array
            for (i = 0; i < students.length; i++) {
                const student = await Student.findById(students[i]);
                // checking for chnages in the new request. And updating the student count
                if (student.mentoredBy !== "" && student.mentoredBy !== req.body.mentorId) {
                    mentorCountToUpdate[student.mentoredBy]
                        ? (mentorCountToUpdate[student.mentoredBy] += 1)
                        : (mentorCountToUpdate[student.mentoredBy] = 1);
                }
                student.mentoredBy = mentor._id;
                // setting student to assigned
                student.assigned = "in a group";
                await student.save();
            }

            console.log("4");
            console.log(mentorCountToUpdate);
            if (Object.keys(mentorCountToUpdate).length !== 0) {
                for (let mentorId in mentorCountToUpdate) {
                    const newMentor = await Mentor.findById(mentorId);
                    newMentor.studentCount -= mentorCountToUpdate[mentorId];
                    if (newMentor.studentCount < 1) {
                        newMentor.assigned = ""; // "" empty string is used to set false
                    }
                    await newMentor.save();
                }
            }

            console.log("5");
            // setting mentor to assigned
            if (students.length === 0) {
                mentor.assigned = "";
            } else {
                mentor.assigned = "assigned";
            }
            // setting no of students
            mentor.studentCount = students.length;
            await mentor.save();

            // getting all the students and mentors after performing all the above operations
            const allStudents = await studentHelpers.getAllStudents();
            const allMentors = await mentorHelpers.getAllMentors();

            res.send(
                Response.success("Assigned Successfully", {
                    mentors: allMentors,
                    students: allStudents,
                })
            );
        } catch (err) {
            console.log("catch", err);
            res.status(500).send(Response.error("Some error occured", {}));
        }
    },
};
