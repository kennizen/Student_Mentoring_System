const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const dotenv = require("dotenv");

// env config
dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: process.env.NODEMAILER_SERVICE,
//     auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS
//     }
// })

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  }));

module.exports = transporter;