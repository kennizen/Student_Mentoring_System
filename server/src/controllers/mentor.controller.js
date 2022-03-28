const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../models/Student");
const Semester = require("../models/Semester");
const response = require("../utils/responses.utils");
const emailService = require("../services/email.service");

// env config 
dotenv.config();

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

    // reset password handler
    resetPassword: async (req, res, next) => {
        try{
            const mentor = await Mentor.findOne({ email: req.body.email });
            
            if(!mentor){
                return response.notfound(res, "User not found");
            }
            
            const token = jwt.sign({ uid: mentor._id.toString() }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            mentor.passwordResetToken = token;
            await mentor.save();
            
            // sending reset password link to the mentor
            await emailService.sendPasswordResetMail(token, mentor.email);
            response.success(res, "Password reset link sent");
        }
        catch(err){
            console.log(err)
            response.error(res);
        }
    },

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

    // get mentor profile
    getProfile: async (req, res, next) => {
        try {
            response.success(res, "", { profileData: req.user });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    // create or update profile 
   updateProfile:  async (req, res, next) => {
       try {
           const { firstname, middlename, lastname, phone, address, department, designation } = req.body;
           const mentor = req.user;

           // updating data
           mentor.firstname = firstname || mentor.firstname;
           mentor.middlename = middlename || "";
           mentor.lastname = lastname || mentor.lastname;
           mentor.phone = phone || mentor.phone;
           mentor.address = address || mentor.address;
           mentor.department = department || mentor.department;
           mentor.designation = designation || mentor.designation;

           await mentor.save();
           response.success(res, "Profile updated", { profileData: mentor });
       }
       catch(err) {
           console.log(err);
           response.error(res);
       }
   }
};
