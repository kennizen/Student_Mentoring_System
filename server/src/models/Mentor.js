const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Role = require("../utils/roles");

//env config
dotenv.config();

const mentorSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        middlename: {
            type: String,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
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
        phone: {
            type: String,
        },
        address: {
            type: String,
            trim: true,
        },
        department: {
            type: String,
            trim: true,
        },
        designation: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            default: Role.Mentor,
        },
        studentCount: {
            type: Number,
            default: 0,
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
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// hiding sensitive info from user
mentorSchema.methods.toJSON = function () {
    const mentor = this;
    const mentorObject = mentor.toObject();

    delete mentorObject.password;
    delete mentorObject.tokens;
    // delete mentorObject.role;
    delete mentorObject.passwordResetToken;
    delete mentorObject.emailVerifyToken;
    delete mentorObject.isEmailVerified;

    return mentorObject;
};

/**
 * These methods will available on the instances of the model. Unlike Model.statics,
 * Model.methods are available on all instances of the Admin model.
 */
// generate auth token function
mentorSchema.methods.generateAuthToken = async function () {
    const mentor = this;
    const token = jwt.sign({ _id: mentor._id.toString(), role: "Mentor" }, process.env.JWT_SECRET);
    // admin.tokens = admin.tokens.concat({ token });
    mentor.tokens = { token };
    await mentor.save();
    return token;
};

/**
 *   Model.Statics methods are available on the Model itself.  **/
//custom login method for mentor
mentorSchema.statics.findByCredentials = async (email, password) => {
    const mentor = await Mentor.findOne({ email });

    if (!mentor) {
        throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, mentor.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return mentor;
};

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
