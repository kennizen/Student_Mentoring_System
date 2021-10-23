const Mentor = require("../models/Mentor");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const Response = require("../utils/response.utils");
const Student = require("../models/Student");

module.exports = {
    // mentor login handler function
    mentorLoginHandler: async (req, res) => {
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
            res.send(
                Response.success("Login successful", {
                    auth_token: token,
                    role: "MENTOR",
                    uid: mentor._id,
                })
            );
        } catch (err) {
            console.log(err);
            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    // mentor signup handler
    mentorSignupHandler: async (req, res) => {
        try {
            const { email, password, confirmPassword, firstName, lastName } = req.body;

            if (!email || !password || !firstName || !lastName) {
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
            res.send(Response.success("Mentor created successfully", {}));
        } catch (err) {
            console.log(err);

            if (err.code == "11000") {
                return res.status(500).send(Response.error("Email already exists", {}));
            }

            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    // mentor dashboard handler
    mentorDashboardHandler: async (req, res) => {
        try {
            res.send(Response.success("", { user: req.user }));
        } catch (err) {
            console.log(err);
        }
    },

    resetPassword: async (req, res) => {},

    // handler for creating a new post by mentor
    createNewPost: async (req, res) => {
        try {
            const body = req.body.body;

            if (!body) {
                return res.send(Response.badrequest("Please provide all data", {}));
            }
            const newPost = new Post();
            newPost.body = body;
            newPost.group_id = newPost.author = req.user._id;
            await newPost.save();
            res.send(Response.success("Post Created", { postData: newPost, authorData: req.user }));
        } catch (err) {
            res.send(Response.error("", {}));
        }
    },

    fetchAllPosts: async (req, res) => {
        try {
            let allPosts = []; // posts array init

            const posts = await Post.find({ group_id: req.user._id });

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
            res.send(Response.error("", {}));
        }
    },
};
