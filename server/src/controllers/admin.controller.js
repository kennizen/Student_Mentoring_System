const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// env config
dotenv.config();

module.exports = {
    // admin login handler fn
    adminLoginHandler: async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log("Req body", req.body);

            if (!email || !password) {
                // if email/pass does not exists
                return res.status(400).send({ error: "Please provide valid email/password" });
            }

            const admin = await Admin.findByCredentials(email, password);

            // if (!admin) {
            //     // if user not found
            //     return res.status(404).send({ error: "Unable to login" });
            // }
            const token = await admin.generateAuthToken();

            res.send({ auth_token: token });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: "Some error occured" });
        }
    },

    adminDashboardHandler: (req, res) => {
        res.send({ success: "Admin Dashboard" });
    },
};
