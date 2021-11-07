const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Role = require("../utils/roles");

//env config
dotenv.config();

const studentSchema = new mongoose.Schema(
    {
        personal: {
            firstname: String,
            middlename: String,
            lastname: String,
            phone: String,
            gender: String,
            blood_group: String,
            home_address: String,
            guardian: {
                name: String,
                phone_no: String,
                address: String,
            },
            family_details: String,
            hobbies: String,
        },
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
        academic: {
            class_10: {
                board: String,
                percentage: String,
            },
            class_12: {
                board: String,
                percentage: String,
            },
            ug: {
                university: String,
                percentage: String,
            },
            pg: {
                university: String,
                percentage: String,
            },
            roll_no: String,
            programme: String,
            enrollment_year: String,
            department: String,
            semester: String,
        },
        hostel: {
            name: String,
            room_no: Number,
            warden: {
                name: String,
                phone: String,
            },
            asst_warden: {
                name: String,
                phone: String,
            },
            other: {
                name: String,
                phone: String,
                address: String,
            },
        },
        role: {
            type: String,
            default: Role.Student,
        },
        mentoredBy: {
            type: String,
            default: "unassigned",
        },
        assigned: {
            type: String,
            default: "unassigned",
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
    delete studentObject.role;

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
        process.env.JWT_SECRET,
        {
            expiresIn: "3h",
        }
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
