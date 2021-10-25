const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
    {
        semester: {
            type: Number,
        },
        student_id: {
            type: String,
        },
        courses: [
            {
                code: String,
                title: String,
                credit: String,
                type: String,
                grade: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;
