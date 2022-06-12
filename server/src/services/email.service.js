const transporter = require("../config/nodemailer.js");
const dotenv = require("dotenv");

// email templates
const resetPasswordTemplate = require("../utils/email-templates/resetPassword");
const verifyEmailTemplate = require("../utils/email-templates/verifyEmail");
const inActivityEmailTemplate = require('../utils/email-templates/inactivityMail');
module.exports = {

    /**
     * The method sends reset password link to the specified user
     * @param {String} token Reset password token to generate link
     * @param {String} email Email id of the receiver
     */
    sendPasswordResetMail: (token, email) => {
        const resetPasswordUrl = `${process.env.PUBLIC_URL}/resetPassword/${token}`;

        if(!email) {
            throw new Error("Email not provided");
        }

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
        const verifyEmailLink = `${process.env.PUBLIC_URL}/verifyEmail/${token}`;
        
        if(!email) {
            throw new Error("Email not provided");
        }

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
    },

    sendInactivityEmail: async (email) => {
        try {
        
        if(!email) {
            throw new Error("Email not provided");
        }

        const options = {
            from: process.env.NODEMAILER_SENDER_EMAIL,
            to: email,
            subject: "Less Activity Detected",
            html: inActivityEmailTemplate()
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
        catch(err){
            console.log(err);

        }
    }
    // email for new post
    // email for new comment
    // When mentor is assigned
    // when new meet is sechduled
    // when there is msg and user is offline
}