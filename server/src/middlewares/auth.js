const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");

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

        if (decodedData.role === "ADMIN") {
            user = await Admin.findOne({ _id, "tokens.token": token });
        }

        if (!user) {
            res.send({ status: "error", msg: "Unauthorised access" });
        }

        req.user = user;

        console.log(decodedData);
        console.log(req.user);

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = auth;
