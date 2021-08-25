const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

//env config
dotenv.config();

const mentorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone:{
        primary: String,
        alternate: [String]
    },
    address:{
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]

},{
    timestamps: true
})


/**
 * These methods will available on the instances of the model. Unlike Model.statics,
 * Model.methods are available on all instances of the Admin model.
 */
// generate auth token function
mentorSchema.methods.generateAuthToken = async function(){
    const mentor = this;
    const token = jwt.sign({ _id: mentor._id.toString(), role: 'Mentor' }, process.env.JWT_SECRET, { expiresIn: '6h' });
    // admin.tokens = admin.tokens.concat({ token });
    mentor.tokens = {token}
    await mentor.save();
    return token;
}

/**    
 *   Model.Statics methods are available on the Model itself.  **/
//custom login method for mentor 
mentorSchema.statics.findByCredentials = async (email, password) => {
    const mentor = await Mentor.findOne({ email })
    
    if(!mentor){
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, mentor.password);
    
    if(!isMatch){
        throw new Error("Unable to login");
    }
    return mentor;
}

const Mentor = mongoose.Model('Mentor', mentorSchema);

module.exports = Mentor