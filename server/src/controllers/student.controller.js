const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const Response = require("../utils/response.utils");

// multer config
// const storage = require("../config/multer");

module.exports = {
    // student login handler function
    studentLoginHandler: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send(Response.error("No email/password provided", {}));
            }
            const student = await Student.findByCredentials(email, password);

            if (!student) {
                return res.status(404).send(Response.notfound("404 Not found", {}));
            }
            const token = await student.generateAuthToken();
            res.send(
                Response.success("Login successful", {
                    auth_token: token,
                    role: "STUDENT",
                    uid: student._id,
                })
            );
        } catch (err) {
            console.log(err);
            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    // student signup handler
    studentSignupHandler: async (req, res) => {
        try {
            const { email, password, confirmPassword, firstName, lastName } = req.body;

            if (!email || !password || !firstName || !lastName) {
                return res.status(400).send(Response.badrequest("Malformed input", {}));
            }

            if (password != confirmPassword) {
                return res.status(400).send(Response.badrequest("Passwords doesn't match", {}));
            }

            const student = new Student();
            student.email = email;
            student.password = await bcrypt.hash(password, 8);
            student.name = `${firstName} ${lastName}`;
            await student.save();
            res.send(Response.success("Student created successfully", {}));
        } catch (err) {
            console.log(err);

            if (err.code == "11000") {
                return res.status(403).send(Response.forbidden("Email already exists", {}));
            }

            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    // student dashboard handler
    studentDashboardHandler: async (req, res) => {
        try {
            res.send(Response.success("", { user: req.user }));
        } catch (err) {
            console.log(err);
        }
    },

    // create new post handler for student
    createNewPost: async (req, res) => {
        try {
            const body = req.body.body;

            if (!body) {
                return res.send(Response.badrequest("Please provide all data", {}));
            }
            const newPost = new Post();
            newPost.body = body;
            newPost.group_id = req.user.mentoredBy;
            newPost.author = req.user._id;
            await newPost.save();
            res.send(Response.success("Post Created", { postData: newPost, authorData: req.user }));
        } catch (err) {
            console.log(err);
            res.send(Response.error("", {}));
        }
    },

    fetchAllPosts: async (req, res) => {
        try {
            let allPosts = [];
            const oldPosts = await Post.find({ author: req.user._id });
            const posts = await Post.find({ group_id: req.user.mentoredBy });

            for (let i = 0; i < oldPosts.length; i++) {
                // getting author info from the db
                let author = await Student.findById(oldPosts[i].author);

                if (!author) {
                    author = await Mentor.findById(oldPosts[i].author);
                }
                // creating new post object
                let post = {
                    postData: oldPosts[i],
                    authorData: author,
                };
                // generating array of posts
                allPosts.push(post);
            }

            for (let i = 0; i < posts.length; i++) {
                // getting author info from the db
                let author = await Student.findById(posts[i].author);

                if (!author) {
                    author = await Mentor.findById(posts[i].author);
                }
                // creating new post object
                let post = {
                    postData: posts[i],
                    authorData: author,
                };
                // generating array of posts
                allPosts.push(post);
            }

            res.send(Response.success("", { posts: allPosts }));
        } catch (err) {
            console.log(err);
            res.send(Response.error("", {}));
        }
    },

    getProfile: async (req, res) => {
        try {
            const mentor = await Mentor.findById(req.user.mentoredBy);

            if (!mentor) {
                throw new Error();
            }

            req.user.mentor = mentor.name;
            res.send(Response.success("", { profileData: req.user }));
        } catch (err) {
            res.status(500).send(Response.error("", {}));
        }
    },

    editProfile: async (req, res) => {
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
            student.class_10_board = req.body.class_10_board;
            student.class_10_percentage = req.body.class_10_percentage;
            student.class_12_board = req.body.class_12_board;
            student.class_12_percentage = req.body.class_12_percentage;
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

            await student.save();

            // getting mentor data here
            const mentor = await Mentor.findById(student.mentoredBy);

            if (!mentor) {
                throw new Error();
            }

            student.mentor = mentor.name;

            res.send(Response.success("Profile Updated", { profileData: student }));
        } catch (err) {}
    },

    // add/edit avatar image
    editAvatar: async (req, res) => {
        try {
            console.log(req.file);
        } catch (err) {
            console.log("outer err", err);
        }
    },
};
