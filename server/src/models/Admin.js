const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../utils/roles");

const adminSchema = new mongoose.Schema(
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
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            url: {
                type: String,
                default:
                    "https://res.cloudinary.com/tremedy/image/upload/c_scale,w_90/v1582207349/avatars/man_2_lvablz.png",
            },
            id: String,
        },
        role: {
            type: String,
            default: Role.Admin
        }
        ,
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
adminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();

    delete adminObject.password;
    delete adminObject.tokens;
    delete adminObject.role;

    return adminObject;
};

/**
 * These methods will available on the instances of the model. Unlike Model.statics,
 * Model.methods are available on all instances of the Admin model.
 */
// generate auth token function
adminSchema.methods.generateAuthToken = async function () {
    const admin = this;
    const token = jwt.sign({ _id: admin._id.toString(), role: "Admin" }, process.env.JWT_SECRET, {
        expiresIn: "3h",
    });
    // admin.tokens = admin.tokens.concat({ token });
    admin.tokens = { token };
    await admin.save();
    return token;
};

/**
 * It checks for the admin email in db.
 * if admin exists in db return admin else throws an error
 *   Model.Statics methods are available on the Model itself.
 * **/
//custom login method for admin
adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        //
        console.log("Invalid Password");
        throw new Error("Unable to login");
    }
    return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
