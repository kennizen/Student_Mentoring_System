const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// env config
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

module.exports = transporter;