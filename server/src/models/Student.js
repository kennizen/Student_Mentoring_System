const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

//env config
dotenv.config();

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]

},{
    timestamps: true
})


// hiding sensitive info from user
studentSchema.methods.toJSON = function () {
    const student = this;
    const studentObject = student.toObject();

    delete studentObject.password;
    delete studentObject.tokens;

    return studentObject;
};

/**
 * These methods will available on the instances of the model. Unlike Model.statics,
 * Model.methods are available on all instances of the Admin model.
 */
// generate auth token function
studentSchema.methods.generateAuthToken = async function(){
    const student = this;
    const token = jwt.sign({ _id: student._id.toString(), role: 'STUDENT' }, process.env.JWT_SECRET, { expiresIn: '6h' });
    // student.tokens = student.tokens.concat({ token });
    student.tokens = {token}
    await student.save();
    return token;
}

/**    
 *   Model.Statics methods are available on the Model itself.  **/
//custom login method for mentor 
studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await Student.findOne({ email })
    
    if(!student){
        throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, student.password);
    
    if(!isMatch){
        throw new Error("Unable to login");
    }
    return student;
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;