const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const Response = require("../utils/response.utils");

module.exports = {
    // student login handler function
    studentLoginHandler: async (req, res) => {
        try{
            const { email, password } =  req.body;

            if(!email && !password){
                return res.status(400).send( Response.error("No email/password provided", {}) );
            }
            const student = await Student.findByCredentials(email, password);

            if(!student){
                return res.status(404).send( Response.notfound("404 Not found", {}));
            }
            const token = await student.generateAuthToken();
            res.send( Response.success("Login successful", { auth_token: token , role: "STUDENT"} ));

        }
        catch(err){
            console.log(err);
            res.status(500).send( Response.error("Some error occured", {}) );
        }
} ,

    // student signup handler
    studentSignupHandler: async (req, res) => {
        try{
            const { email, password, confirmPassword, name } = req.body;

            if(!email || !password || !name){
                return res.status(400).send(Response.badrequest("Malformed input", {} ));
            }

            if(password != confirmPassword){
                return res.status(400).send( Response.badrequest("Passwords doesn't match", {} ));
            }

            const student = new Student();
            student.email = email;
            student.password = await bcrypt.hash(password, 8);
            student.name = name;
            student.save();
            res.send(Response.success("Student created successfully", {} ));
        }
        catch(err){
            console.log(err);
            
            if(err.code == 11000){
                res.status(500).send( Response.error("Email already exists", {} ));
            }

            res.status(500).send( Response.error("Some error occured", {} ));
        }
    } ,

    // student dashboard handler
    studentDashboardHandler: async (req, res) => {
        try{    

            res.send( Response.success("", { user: req.user} ) );

        }
        catch(err){
            console.log(err)
        }
    }
}