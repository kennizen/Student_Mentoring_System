const Interaction = require("../models/Interaction");


module.exports = {
// create a new interaction between a mentor and mentee
createInteraction: async (mentor, student, data) => {
    try {
        const newInteraction = new Interaction();
        newInteraction.mentor = mentor;
        newInteraction.student = student;
        newInteraction.interactions = data;

        console.log("newInteraction", newInteraction);
    }
    catch(err){
        console.log();
    }

    }


}