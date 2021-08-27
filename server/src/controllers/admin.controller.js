const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Response = require("../utils/response.utils");

// env config
dotenv.config();

module.exports = {
    // admin login handler fn
    adminLoginHandler: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                // if email/pass does not exists
                return res.status(400).send(Response.badrequest("Please provide valid email/password", {}));
            }

            const admin = await Admin.findByCredentials(email, password);
            const token = await admin.generateAuthToken();
            res.send( Response.success("Login successful", { auth_token: token, role: 'ADMIN' } ));

        } catch (err) {
            console.log(err);
            res.status(500).send( Response.error("Some error occured", {})) ;
        }
    },

    adminDashboardHandler: (req, res) => {
        res.send( Response.success("" , { user: req.user } ));
    },
};
