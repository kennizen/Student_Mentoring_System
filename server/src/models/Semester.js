const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
    {
        semester: {
            type: Number,
        },
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        courses: [
            {
                code: { type: String },
                title: { type: String },
                credit: { type: Number },
                type: { type: String },
                grade: { type: String },
            },
        ],
    },
    {
        timestamps: true,
    }
);
/**
 *  A course is represented as an object with the following properties.
 *  So courses in a semester is represented as an array of all the individual courses
 *  courses: [{
 *              code: String,
 *              title: String,
 *              credit: Number,
 *              type: String,
 *              grade: String,
 *           }]
 */

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;
