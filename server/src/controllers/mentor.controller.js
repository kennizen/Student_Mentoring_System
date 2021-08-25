const Mentor = require("../models/Mentor");

module.exports = {
    // mentor login handler function
    mentorLoginHandler: async (req, res) => {
        try{
            const { email, password } =  req.body;

            if(!email && !password){
                return res.status(400).send({ error: "No email/password provided"});
            }

            const mentor = await Mentor.findByCredentials(email, password);

            if(!mentor){
                return res.status(404).send({ error: "404 not found"});
            }

            const token = mentor.generateAuthToken();

            res.send({auth_token: token});
        
        }
        catch(err){
            console.log(err);
        }
} ,

    // mentor signup handler
    mentorSignupHandler: async (req, res) => {
        try{

        }
        catch(err){
            console.log(err);
        }
    }
}