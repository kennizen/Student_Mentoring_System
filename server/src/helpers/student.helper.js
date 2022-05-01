const Student = require("../models/Student");

/**
 *  This module consists of methods which will be called inside other methods to do some simple tasks
 *  They acts as a helper to other functions in performing some specific tasks.
 *
 *  *** This module consists all the helper function for Student
 */

module.exports = {
    // gets all students from db and return it
    /**
     * @Desc This function fetches all the available students
     * @returns Array of Students
     */
    getAllStudents: async () => {
        // const students = await Student.find({}).select(
        //     "id firstname middlename lastname department roll_no avatar mentoredBy assigned"
        // );
        const students = await Student.find();
        return students;
    },
};
