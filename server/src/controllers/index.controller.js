const mongoose = require("mongoose");
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const role = require("../utils/roles");
const response = require("../utils/responses.utils");

// html templates
const emailVerifiedTemplate = require("../utils/html-templates/emailVerified");
const emailVerifyFailedTemplate = require("../utils/html-templates/emailVerifyFailed");

// env config 
dotenv.config();

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
            
            if(decoded.role === role.Mentor){
                const mentor = await Mentor.findById(decoded._id);
    
                if(!mentor){
                    throw new Error("User not found");
                }
                mentor.isEmailVerified = true;
                mentor.emailVerifyToken = undefined;
                await mentor.save();
                return res.send(emailVerifiedTemplate);
            }

            if(decoded.role === role.Student){
                const student = await Student.findById(decoded._id);
    
                if(!student){
                    throw new Error("User not found");
                }
                student.isEmailVerified = true;
                student.emailVerifyToken = undefined;
                await student.save();

                return res.send(emailVerifiedTemplate);
            }
            
            res.send(`
                <center> <h1>Page Not Found</h1> </center>
            `)
        }
        catch(err){
            console.log(err)
            res.send(emailVerifyFailedTemplate);
        }
    }
};
