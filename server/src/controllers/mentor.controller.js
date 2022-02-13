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
            const { email, password, confirmPassword, firstName, lastName } = req.body;

            if (!email || !password || !confirmPassword || !firstName || !lastName) {
                return res.status(400).send(Response.badrequest("Malformed input", {}));
            }

            if (password != confirmPassword) {
                return res.status(400).send(Response.badrequest("Passwords doesn't match", {}));
            }

            const mentor = new Mentor();
            mentor.email = email;
            mentor.password = await bcrypt.hash(password, 8);
            mentor.name = `${firstName} ${lastName}`;
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

    // handler for creating a new post by mentor
    // createNewPost: async (req, res) => {
    //     try {
    //         const body = req.body.body;

    //         if (!body) {
    //             return res.send(Response.badrequest("Please provide all data", {}));
    //         }
    //         const newPost = new Post();
    //         newPost.body = body;
    //         newPost.group_id = newPost.author = req.user._id;
    //         newPost.authorModel = req.user.role;
    //         await newPost.save();
    //         res.send(Response.success("Post Created", { postData: newPost, authorData: req.user }));
    //     } catch (err) {
    //         res.send(Response.error("", {}));
    //     }
    // },

    // fetchAllPosts: async (req, res) => {
    //     try {
    //         let allPosts = []; // posts array init

    //         const posts = await Post.find({ group_id: req.user._id }).populate("author");

    //         // for (let i = 0; i < posts.length; i++) {
    //         //     // getting author info from the db
    //         //     let author = await Student.findById(posts[i].author);

    //         //     if (!author) {
    //         //         author = await Mentor.findById(posts[i].author);
    //         //     }
    //         //     // creating new post object
    //         //     let post = {
    //         //         postData: posts[i],
    //         //         authorData: author,
    //         //     };
    //         //     // generating array of posts
    //         //     allPosts.push(post);
    //         // }

    //         res.send(Response.success("", { posts }));
    //         // res.send(Response.success("", { posts: allPosts }));
    //     } catch (err) {
    //         res.status(500).send(Response.error("", {}));
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
            next;
        } catch (err) {
            response.error(res);
        }
    },
};
