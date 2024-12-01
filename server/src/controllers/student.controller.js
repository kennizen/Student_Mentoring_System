const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const response = require("../utils/responses.utils");
const Semester = require("../models/Semester");
const roles = require("../utils/roles");
const emailService = require("../services/email.service");
const jwt = require("jsonwebtoken");

// including cloudinary configs
require("../config/cloudinary");

module.exports = {
    // student login handler function
    studentLoginHandler: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return response.badrequest(res, "No email/password provided", {});
            }
            const student = await Student.findByCredentials(email, password);

            if (!student) {
                return response.notfound(res);
            }

            if (!student.isEmailVerified) {
                const token = jwt.sign(
                    { _id: student._id.toString(), role: roles.Student },
                    process.env.JWT_SECRET
                );

                student.emailVerifyToken = token;
                await student.save();

                // sending email to mentor with link
                emailService.sendEmailVerificationMail(token, student.email);

                return response.error(
                    res,
                    "Email not verified. We have sent a link. Please check your email"
                );
            }

            // if banned
            if (student.isBanned) {
                return response.unauthorize(res, "Your account has been suspended");
            }

            const token = await student.generateAuthToken();

            response.success(res, "Login successful", {
                auth_token: token,
                role: "STUDENT",
                uid: student._id,
            });
            req.user = student;
            next();
        } catch (err) {
            console.log(err);

            // if password is invalid
            if (err.message === "Unable to login") {
                return response.unauthorize(res, "Invalid credentials");
            }

            response.error(res);
        }
    },

    // student signup handler
    studentSignupHandler: async (req, res, next) => {
        try {
            const {
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                middleName,
                enrollmentNo,
                semester,
                department,
            } = req.body;

            if (!email || !password || !firstName || !semester || !enrollmentNo) {
                return response.badrequest(res, "Malformed input", {});
            }

            if (password != confirmPassword) {
                return response.badrequest(res, "Passwords doesn't match", {});
            }

            const student = new Student();
            student.email = email;
            student.password = await bcrypt.hash(password, 8);
            student.firstname = firstName;
            student.middlename = middleName === "" ? "" : middleName;
            student.lastname = lastName;
            student.enrollment_no = enrollmentNo;
            student.semester = semester;
            student.department = department;
            student.isEmailVerified = true
            // const token = await jwt.sign(
            //     { _id: student._id.toString(), role: roles.Student },
            //     process.env.JWT_SECRET
            // );

            // student.emailVerifyToken = token;
            student.emailVerifyToken = "";
            await student.save();

            // sending email to mentor with link
            // emailService.sendEmailVerificationMail(token, student.email);

            response.success(res, "Student created successfully", {});
            req.user = student;
            next();
        } catch (err) {
            console.log(err);

            if (err.code == "11000") {
                return response.error(res, "Email already exists", {});
            }

            response.error(res, "", {});
        }
    },

    // student dashboard handler
    studentDashboardHandler: async (req, res, next) => {
        try {
            response.success(res, "", { user: req.user });
            next();
        } catch (err) {
            console.log(err);
        }
    },

    getProfile: async (req, res, next) => {
        try {
            if (req.user.mentoredBy) {
                const mentor = await Mentor.findById(req.user.mentoredBy);
                req.user.mentoredBy = mentor;
            }

            response.success(res, "", { profileData: req.user });
            next();
        } catch (err) {
            response.error(res);
        }
    },

    editProfile: async (req, res, next) => {
        try {
            const student = await Student.findById(req.user._id);

            if (!student) {
                throw new Error("Student not found");
            }

            student.firstname = req.body.firstname;
            student.middlename = req.body.middlename;
            student.lastname = req.body.lastname;
            student.phone_no = req.body.phone_no;
            student.gender = req.body.gender;
            student.blood_group = req.body.blood_group;
            student.home_place = req.body.home_place;
            student.address = req.body.address;
            student.guardian_name = req.body.guardian_name;
            student.guardian_ph_no = req.body.guardian_ph_no;
            student.guardian_address = req.body.guardian_address;
            student.family_details = req.body.family_details;
            student.hobbies = req.body.hobbies;
            // student.class_10_board = req.body.class_10_board;
            // student.class_10_percentage = req.body.class_10_percentage;
            // student.class_12_board = req.body.class_12_board;
            // student.class_12_percentage = req.body.class_12_percentage;
            student.enrollment_no = req.body.enrollment_no;
            student.programme = req.body.programme;
            student.enrollment_year = req.body.enrollment_year;
            student.department = req.body.department;
            student.semester = req.body.semester;
            student.hostel_name = req.body.hostel_name;
            student.hostel_room_no = req.body.hostel_room_no;
            student.warden_name = req.body.warden_name;
            student.warden_ph_no = req.body.warden_ph_no;
            student.asst_warden_name = req.body.asst_warden_name;
            student.asst_warden_ph_no = req.body.asst_warden_ph_no;
            student.responsible_contact_person_at_residence =
                req.body.responsible_contact_person_at_residence;
            student.contact_no_of_contact_person = req.body.contact_no_of_contact_person;
            student.responsible_contact_address = req.body.responsible_contact_address;

            const newStudentData = await (await student.save())
                .populate("mentoredBy")
                .execPopulate();

            // // getting mentor data here
            // const mentor = await Mentor.findById(student.mentoredBy);

            // if (!mentor) {
            //     throw new Error();
            // }

            // student.mentor = mentor.name;

            response.success(res, "Profile Updated", { profileData: newStudentData });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },

    getSemesterInfo: async (req, res, next) => {
        try {
            const semesters = await Semester.find({ student_id: req.user._id })
                .sort({
                    semester: 1,
                })
                .populate("student_id");

            response.success(res, "", { semesters });
            next();
        } catch (err) {
            response.error(res, "", {});
        }
    },
    addSemesterInfo: async (req, res, next) => {

        /** both the add and update semester is handled by this route   */
        try {
            let newSem;
            // checking if semester info exists on db
            const semester = await Semester.findOne({
                semester: req.body.semester,
                student_id: req.user._id,
            });

            // if semester info found on db we try to update the semester info and save
            if (semester) {
                semester.courses = req.body.courses;
                newSem = semester;
                await newSem.save();
            } else {
                // else create a new semester and save to db
                newSem = new Semester();
                newSem.student_id = req.user._id;
                newSem.semester = req.body.semester;
                newSem.courses = req.body.courses;
                await newSem.save();
            }

            const result = await newSem.populate("student_id").execPopulate();

            response.success(res, "", { semesters: result });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },
    /** add or update past education details to database  */
    addPastEducation: async (req, res, next) => {
        try {
            const user = req.user;
            // updating class 10 info
            user.class_10_board = req.body[10].board;
            user.class_10_school = req.body[10].studied;
            user.class_10_percentage = req.body[10].marks;
            // updating class 12 info
            user.class_12_board = req.body[12].board;
            user.class_12_school = req.body[12].studied;
            user.class_12_percentage = req.body[12].marks;
            /**  updating database        */
            await user.save();
            response.success(res, "", { pastEducation: req.body });
            next();
        } catch (err) {
            console.log(err);
        }
    },
    /** get the past education details from database  */
    getPastEducation: (req, res, next) => {
        const pastEducation = {
            10: {
                board: req.user.class_10_board,
                studied: req.user.class_10_school,
                marks: req.user.class_10_percentage,
            },
            12: {
                board: req.user.class_12_board,
                studied: req.user.class_12_school,
                marks: req.user.class_12_percentage,
            },
        };
        response.success(res, "", { pastEducation });
        next();
    },
    // delete a semester
    deleteSemesterInfo: async (req, res, next) => {
        try {
            const sem = req.body.sem;

            const deleted = await Semester.findOneAndDelete({
                student_id: req.user._id,
                semester: sem,
            });

            if (!deleted) {
                throw new Error("Some error occured");
            }

            response.success(res, "Semester deleted", { semester: deleted });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },

    // fetch all stduents under the mentor of current student
    getAllStudents: async (req, res, next) => {
        try {
            let students = await Student.find({ mentoredBy: req.user.mentoredBy });

            if (!students) {
                throw new Error();
            }

            // filtering out the requested user
            students = students.filter((student) => {
                if (student._id.toString() !== req.user._id.toString()) {
                    return student;
                }
            });

            const mentor = await Mentor.findById(req.user.mentoredBy);
            if (mentor != null) students.push(mentor);

            response.success(res, "", { count: students.length, students });
            next();
        } catch (err) {
            console.log(err);
            response.error(res);
        }
    },
};
