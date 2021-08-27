const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Response = require("../utils/response.utils");
const Admin = require("../models/Admin");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");

dotenv.config();

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        let user;
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw new Error("Token not received");
        }

        const decodedData = jwt.verify(token, secret);
        const _id = decodedData._id;
        // if user is Admin fetching data from admin collections
        if (decodedData.role === "ADMIN") {
            user = await Admin.findOne({ _id, "tokens.token": token });
        }
        // if user is Mentor fetching data from mentor collections
        if (decodedData.role === "MENTOR") {
            user = await Mentor.findOne({ _id, "tokens.token": token });
        }
        // if user is Mentee fetching data from mentee collections
        if (decodedData.role === "STUDENT") {
            user = await Student.findOne({ _id, "tokens.token": token });
        }

        if (!user) {
            return res.status(404).send( Response.notfound("", {} ));
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send( Response.unauthorized("Unauthorized Access", {} ))
    }
};

module.exports = auth;