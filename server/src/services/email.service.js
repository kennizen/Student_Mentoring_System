const transporter = require("../config/nodemailer.js");
const dotenv = require("dotenv");

// email templates
const resetPasswordTemplate = require("../utils/email-templates/resetPassword");
const verifyEmailTemplate = require("../utils/email-templates/verifyEmail");
module.exports = {

    /**
     * The method sends reset password link to the specified user
     * @param {String} token Reset password token to generate link
     * @param {String} email Email id of the receiver
     */
    sendPasswordResetMail: (token, email) => {
        const resetPasswordUrl = `${process.env.RESET_PASSWORD_BASE_URL}/${token}`;

        const options = {
            from: process.env.NODEMAILER_SENDER_EMAIL,
            to: email,
            subject: "Reset Password",
            html: resetPasswordTemplate(resetPasswordUrl)
        }

        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                console.log("done", info)
                resolve(info);
            })
        })
    },

    /**
     * The method sends email verification link to the specified user
     * @param {String} token EMail verification token to generate link
     * @param {String} email Email id of the receiver
     */
    sendEmailVerificationMail: (token, email) => {
        const verifyEmailLink = `${process.env.RESET_PASSWORD_BASE_URL}/${token}`;

        const options = {
            from: process.env.NODEMAILER_SENDER_EMAIL,
            to: email,
            subject: "Email Verification",
            html: verifyEmailTemplate(verifyEmailLink)
        }

        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                console.log("done", info)
                resolve(info);
            })
        })
    }

    // email for new post
    // email for new comment
    // When mentor is assigned
    // when new meet is sechduled
    // when there is msg and user is offline
}