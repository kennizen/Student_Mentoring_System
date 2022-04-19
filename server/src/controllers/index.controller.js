const mongoose = require("mongoose");
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const roles = require("../utils/roles");
const response = require("../utils/responses.utils");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// env config 
dotenv.config();

// including cloudinary configs
require("../config/cloudinary");

module.exports = {
    // get user info via id handler
    userInfoHandler: async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return response.badrequest(res, "Bad Request. Provide a valid user id", {});
        }

        try {
            let user = await Student.findById(req.params.id);

            if (!user) {
                user = await Mentor.findById(req.params.id);
            }

            if (!user) {
                throw new Error();
            }
            response.success(res, "", { user });
        } catch (err) {
            response.notfound(res, "", {});
        }
    },

    // email verification handler
    emailVerificationHandler: async (req, res) => {
        try{
            const token = req.params.token;
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            
            if(decoded.role === roles.Mentor){
                const mentor = await Mentor.findById(decoded._id);
    
                if(!mentor){
                    throw new Error("User not found");
                }
                mentor.isEmailVerified = true;
                mentor.emailVerifyToken = undefined;
                await mentor.save();
                return res.render("emailVerifySuccess");
            }

            if(decoded.role === roles.Student){
                const student = await Student.findById(decoded._id);
    
                if(!student){
                    throw new Error("User not found");
                }
                student.isEmailVerified = true;
                student.emailVerifyToken = undefined;
                await student.save();
                return res.render("emailVerifySuccess");
            }
            
            res.render("notFound");
        }
        catch(err){
            console.log(err)
            res.render("emailVerifyFailed");
        }
    },

    // reset password
    resetPassword: async (req, res) => {
        try {
            const token = req.params.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            let user;

            // if user is mentor
            if(decoded.role === roles.Mentor) {
                user = await Mentor.findOne({ _id: decoded._id, passwordResetToken: token }); 
            }
            // if user is student
            if(decoded.role === roles.Student) {
                user = await Student.findOne({ _id: decoded._id, passwordResetToken: token });
            }

            if(!user){
                res.render("linkExpired");
            }
            res.render("resetPassword");
        }
        catch(err){
            console.log(err);
            res.render("linkExpired")
        }
    },
    
    setNewPassword: async (req, res) => {
        try {
            let user;
            const token = req.params.token;
            const { password, confirmPassword} = req.body;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if(decoded.role === roles.Mentor){
                user = await Mentor.findOne({ _id: decoded._id, passwordResetToken: token });
            } 

            if(decoded.role === roles.Student){
                user = await Student.findOne({ _id: decoded._id, passwordResetToken: token });
            }

            // if user not found
            if(!user) {
                return response.notfound(res, "Link may have expired");
            }

            // checking if both password are provided
            if(!password || !confirmPassword){
                return response.error(res, "Both passwords are required");
            }
            
            // checking if the passwords are similar
            if(password != confirmPassword){
                return response.error(res, "Passwords doesn't match");
            }
            
            //setting new password
            const hashedPassword = await bcrypt.hash(password, 8);
            user.password = hashedPassword;
            user.passwordResetToken = undefined;
            await user.save();

            response.success(res, "Password updated");
        }
        catch(err){
            console.log(err);
        }
    },

    // set or update avatar image
    editAvatar: async (req, res, next) => {
        try {
            // if profile picture already exists
            if(req.user.avatar.url) {
                const isDeleted = await cloudinary.uploader.destroy(req.user.avatar.id);
                if (!isDeleted) {
                    throw new Error();
                }
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                tags: "avatar",
                width: 200,
                height: 200,
                quality: "auto:eco",
            });
            fs.unlinkSync(req.file.path);
            if (!result) {
                throw new Error();
            }

            req.user.avatar.url = result.secure_url;
            req.user.avatar.id = result.public_id;
            await req.user.save();

            response.success(res, "Avatar updated", { user: req.user });
            next();
        } catch (err) {
            console.log("err", err);
            response.error(res);
        }
    },

    // delete avatar image
    deleteAvatar: async (req, res, next) => {
        try {
            const result = await cloudinary.uploader.destroy(req.user.avatar.id);
            if (!result) {
                throw new Error();
            }
            req.user.avatar.url = "";
            req.user.avatar.id = "";
            await req.user.save();
            response.success(res, "Avatar deleted successfully", {});
        } catch (err) {
            console.log("err", err);
            response.error(res);
        }
    },
};
