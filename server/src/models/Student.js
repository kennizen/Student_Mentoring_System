const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Role = require("../utils/roles");

//env config
dotenv.config();

const studentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        firstname: String,
        middlename: String,
        lastname: String,
        phone_no: String,
        gender: String,
        blood_group: String,
        home_place: String,
        address: {
            type: String,
            default: "",
        },
        guardian_name: String,
        guardian_ph_no: String,
        guardian_address: String,
        family_details: String,
        hobbies: String,
        class_10_board: String,
        class_10_school: String,
        class_10_percentage: String,
        class_12_board: String,
        class_12_school: String,
        class_12_percentage: String,
        enrollment_no: String,
        programme: String,
        enrollment_year: String,
        department: {
            type: String,
            default: "",
        },
        semester: String,
        hostel_name: String,
        hostel_room_no: Number,
        warden_name: String,
        warden_ph_no: String,
        asst_warden_name: String,
        asst_warden_ph_no: String,
        responsible_contact_person_at_residence: String,
        contact_no_of_contact_person: String,
        residence_address: String,
        role: {
            type: String,
            default: Role.Student,
        },
        mentoredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
        },
        avatar: {
            url: {
                type: String,
                default: "",
            },
            id: String,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        passwordResetToken: String,
        emailVerifyToken: String,
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

// hiding sensitive info from user
studentSchema.methods.toJSON = function () {
    const student = this;
    const studentObject = student.toObject();

    delete studentObject.password;
    delete studentObject.tokens;
    // delete studentObject.role;

    return studentObject;
};

/**
 * These methods will available on the instances of the model. Unlike Model.statics,
 * Model.methods are available on all instances of the Admin model.
 */
// generate auth token function
studentSchema.methods.generateAuthToken = async function () {
    const student = this;
    const token = jwt.sign(
        { _id: student._id.toString(), role: "Student" },
        process.env.JWT_SECRET
    );
    // student.tokens = student.tokens.concat({ token });
    student.tokens = { token };
    await student.save();
    return token;
};

/**
 *   Model.Statics methods are available on the Model itself.  **/
//custom login method for mentor
studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await Student.findOne({ email });

    if (!student) {
        throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
        console.log("Password error");
        throw new Error("Unable to login");
    }
    return student;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
