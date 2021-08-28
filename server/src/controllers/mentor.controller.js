const Mentor = require("../models/Mentor");
const bcrypt = require("bcryptjs");
const Response = require("../utils/response.utils");

module.exports = {
    // mentor login handler function
    mentorLoginHandler: async (req, res) => {
        try{
            const { email, password } =  req.body;

            if(!email || !password){
                return res.status(400).send( Response.error("No email/password provided", {}) );
            }
            const mentor = await Mentor.findByCredentials(email, password);

            if(!mentor){
                return res.status(404).send( Response.notfound("404 Not found", {}));
            }
            const token = await mentor.generateAuthToken();
            res.send( Response.success("Login successful", { auth_token: token , role: "MENTOR"} ));

        }
        catch(err){
            console.log(err);
            res.status(500).send( Response.error("Some error occured", {}) );
        }
} ,

    // mentor signup handler
    mentorSignupHandler: async (req, res) => {
        try{
            const { email, password, ConfirmPassword, name } = req.body;

            if(!email || !password || !name){
                return res.status(400).send(Response.badrequest("Malformed input", {} ));
            }

            if(password != ConfirmPassword){
                return res.status(400).send( Response.badrequest("Passwords doesn't match", {} ));
            }

            const mentor = new Mentor();
            mentor.email = email;
            mentor.password = await bcrypt.hash(password, 8);
            mentor.name = name;
            await mentor.save();
            res.send(Response.success("Mentor created successfully", {} ));
        }
        catch(err){
            console.log("Mentor error", err);
            
            if(err.code == "11000"){
                return res.status(403).send( Response.forbidden("Email already exists", {} ));
            }

            res.status(500).send( Response.error("Some error occured", {} ));
        }
    } ,

    // mentor dashboard handler
    mentorDashboardHandler: async (req, res) => {
        try{    

            res.send( Response.success("", { user: req.user} ) );

        }
        catch(err){
            console.log(err)
        }
    }
}