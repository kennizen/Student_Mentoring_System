const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const response = require("../utils/responses.utils");
const Admin = require("../models/Admin");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const Role = require("../utils/roles");

dotenv.config();

const secret = process.env.JWT_SECRET;

/**
 *  This module is used for user authentication.
 *  It is passed as a middleware to the routes to authenticate every request coming into the server..
 */

const auth = async (req, res, next) => {
    try {
        let user;
        // we are splitting the Bearer token string received in header and taking only JWT from it
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw new Error("Token not received");
        }

        const decodedData = jwt.verify(token, secret);
        const _id = decodedData._id;
        // if user is Admin fetching data from admin collections
        if (decodedData.role === Role.Admin) {
            user = await Admin.findOne({ _id, "tokens.token": token });
        }
        // if user is Mentor fetching data from mentor collections
        if (decodedData.role === Role.Mentor) {
            user = await Mentor.findOne({ _id, "tokens.token": token });
        }
        // if user is Mentee fetching data from mentee collections
        if (decodedData.role === Role.Student) {
            user = await Student.findOne({ _id, "tokens.token": token });
        }

        if(user?.isBanned) {
            return response.unauthorize(res, "Your account has been suspended");
        }

        if (!user) {
            return response.notfound(res, "404 User Not Found", {});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        response.unauthorize(res, "Unauthorized Access", {});
    }
};

module.exports = auth;
