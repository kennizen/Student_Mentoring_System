const Admin = require("../models/Admin");
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
        res.send( Response.success("", { mentors, students }) )
    },
};
