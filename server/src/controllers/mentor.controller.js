const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Semester = require("../models/Semester");
const response = require("../utils/responses.utils");

module.exports = {
    // mentor login handler function
    mentorLoginHandler: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send(Response.error("No email/password provided", {}));
            }
            const mentor = await Mentor.findByCredentials(email, password);

            if (!mentor) {
                return res.status(404).send(Response.notfound("404 Not found", {}));
            }
            const token = await mentor.generateAuthToken();

            response.success(res, "Login Successfull", {
                auth_token: token,
                role: "MENTOR",
                uid: mentor._id,
            });

            req.user = mentor;
            next();
        } catch (err) {
            console.log(err);
            response.error(res, "Login Unsuccessfull");
        }
    },

    // mentor signup handler
    mentorSignupHandler: async (req, res, next) => {
        try {
            const { email, password, confirmPassword, firstName, lastName, middleName } = req.body;

            if (!email || !password || !confirmPassword || !firstName) {
                return res.status(400).send(Response.badrequest("Malformed input", {}));
            }

            if (password != confirmPassword) {
                return res.status(400).send(Response.badrequest("Passwords doesn't match", {}));
            }

            const mentor = new Mentor();
            mentor.email = email;
            mentor.password = await bcrypt.hash(password, 8);
            mentor.firstname = firstName;
            mentor.middlename = middleName ? middleName : "";
            mentor.lastname = lastName ? lastName : "";
            await mentor.save();
            response.success(res, "Mentor Signup successfull", {});
            req.user = mentor;
            next();
        } catch (err) {
            console.log(err);

            if (err.code == "11000") {
                return response.error(res, "Email already exists", {});
            }

            response.error(res);
        }
    },

    // mentor dashboard handler
    mentorDashboardHandler: async (req, res, next) => {
        try {
            response.success(res, "Email already exists", { user: req.user });
            next();
        } catch (err) {
            console.log(err);
        }
    },

    resetPassword: async (req, res) => {},

    fetchAllMentees: async (req, res, next) => {
        try {
            const students = await Student.find({ mentoredBy: req.user._id });
            response.success(res, "", { mentees: students });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    // fetch students semesters
    fetchStudentSemesters: async (req, res, next) => {
        try {
            const _id = req.params.id;
            const semesters = await Semester.find({ student_id: _id });
            response.success(res, "", { semesters });
            next();
        } catch (err) {
            response.error(res);
        }
    },
};
