const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
    {
        semester: {
            type: Number,
        },
        student_id: {
            type: String,
        },
        courses: [Object],
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
