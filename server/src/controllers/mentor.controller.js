const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../models/Student");
const Semester = require("../models/Semester");
const response = require("../utils/responses.utils");
const emailService = require("../services/email.service");
const roles = require("../utils/roles");

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

            if (!mentor.isEmailVerified) {
                const token = jwt.sign(
                    { _id: mentor._id.toString(), role: roles.Mentor },
                    process.env.JWT_SECRET
                );

                mentor.emailVerifyToken = token;
                await mentor.save();

                // sending email to mentor with link
                emailService.sendEmailVerificationMail(token, mentor.email);

                return response.error(
                    res,
                    "Email not verified. We have sent a link. Please check your email"
                );
            }

            // if banned
            if (mentor.isBanned) {
                return response.unauthorize(res, "Your account has been suspended");
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
            // if password is invalid
            if (err.message === "Unable to login") {
                return response.unauthorize(res, "Invalid credentials");
            }

            response.error(res, "Login Unsuccessfull");
        }
    },

    // mentor signup handler
    mentorSignupHandler: async (req, res, next) => {
        try {
            const {
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                middleName,
                department,
            } = req.body;

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
            mentor.department = department;
            mentor.isEmailVerified = true
            // const token = await jwt.sign(
            //     { _id: mentor._id.toString(), role: roles.Mentor },
            //     process.env.JWT_SECRET
            // );

            // mentor.emailVerifyToken = token;
            mentor.emailVerifyToken = "";
            await mentor.save();

            // sending email to mentor with link
            // emailService.sendEmailVerificationMail(token, mentor.email);

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
    // resetPassword: async (req, res, next) => {
    //     try {
    //         const mentor = await Mentor.findOne({ email: req.body.email });

    //         if (!mentor) {
    //             return response.notfound(res, "User not found");
    //         }

    //         const token = jwt.sign(
    //             { _id: mentor._id.toString(), role: mentor.role },
    //             process.env.JWT_SECRET,
    //             {
    //                 expiresIn: "1h",
    //             }
    //         );
    //         mentor.passwordResetToken = token;
    //         await mentor.save();

    //         // sending reset password link to the mentor
    //         await emailService.sendPasswordResetMail(token, mentor.email);
    //         response.success(res, "Password reset link sent");
    //     } catch (err) {
    //         console.log(err);
    //         response.error(res);
    //     }
    // },
    /**
     * The method sets new passord of the user upon succcessful verification
     */
    // setNewPassword: async (req, res, next) => {
    //     try {
    //         const { token, password, confirmPassword } = req.body;
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         const mentor = await Mentor.findOne({ _id: decoded._id, passwordResetToken: token });

    //         // if mentor not found
    //         if (!mentor) {
    //             return response.error(res);
    //         }

    //         // checking if both password are provided
    //         if (!password || !confirmPassword) {
    //             return response.error(res, "Both passwords are required");
    //         }

    //         // checking if the passwords are similar
    //         if (password != confirmPassword) {
    //             return response.error(res, "Passwords doesn't match");
    //         }

    //         //setting new password
    //         const hashedPassword = await bcrypt.hash(password, 8);
    //         mentor.password = hashedPassword;
    //         await mentor.save();
    //         response.success(res, "Password updated", mentor);
    //     } catch (err) {
    //         console.log(err);
    //         // if token expired
    //         if (err.message.toString() == "jwt expired") {
    //             return response.error(res, "Token expired");
    //         }
    //         response.error(res, "Invalid token");
    //     }
    // },

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
    updateProfile: async (req, res, next) => {
        try {
            const { firstname, middlename, lastname, phone, address, department, designation } =
                req.body;
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
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },
};
