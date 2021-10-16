const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const Response = require("../utils/response.utils");

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
            res.send(Response.success("Login successful", { auth_token: token, role: "STUDENT" }));
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
};
