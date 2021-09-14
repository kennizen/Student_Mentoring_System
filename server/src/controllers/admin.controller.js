const Admin = require("../models/Admin");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const dotenv = require("dotenv");
const Response = require("../utils/response.utils");

// importing helpers methods
const studentHelpers = require("../helpers/student.helper");
const mentorHelpers = require("../helpers/mentor.helper");

// env config
dotenv.config();

module.exports = {
    // admin login handler fn
    adminLoginHandler: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                // if email/pass does not exists
                return res
                    .status(400)
                    .send(Response.badrequest("Please provide valid email/password", {}));
            }

            const admin = await Admin.findByCredentials(email, password);
            const token = await admin.generateAuthToken();
            res.send(Response.success("Login successful", { auth_token: token, role: "ADMIN" }));
        } catch (err) {
            console.log(err);
            res.status(500).send(Response.error("Some error occured", {}));
        }
    },

    // admin dashboard handler function 
    adminDashboardHandler: (req, res) => {
        res.send(Response.success("", { user: req.user }));
    },

    // this route handler returns the list of all users i.e, all mentors and students
    getAllUsers: async (req, res) => {
        const students = await studentHelpers.getAllStudents();
        const mentors = await mentorHelpers.getAllMentors();
        res.send( Response.success("", { mentors, students }) )
    },

    /** 
     *  saveGroup route saves the mentor and students group
     *  We store the mentor's id in every students property named "mentordBy" , to establish a link 
     *  between from a mentor to every students mentored by hims
     * */ 
    saveGroup: async (req, res) => {
        
        try{
            const mentor = await Mentor.findById(req.body.mentor);

            if(!mentor){ // if mentor doesn't exists
                return res.send( Response.error("Some error occured", {}));
            }

            const students = req.body.students;
            // looing through students array
            for(i = 0; i < students.length; i++){
                const student = await Student.findById(students[i]);
                student.mentoredBy = mentor._id;
                await student.save();
            }
            
            res.send( Response.success("Assigned Successfully",{}) )
        }
        catch(err){
            res.status(500).send( Response.error("Some error occured", {}));
        }
    }
};
