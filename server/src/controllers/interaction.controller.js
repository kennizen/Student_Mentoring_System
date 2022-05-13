const Interaction = require("../models/Interaction");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");

module.exports = {
// create a new interaction between a mentor and mentee
createInteraction: async (mentor, student, data) => {
    try {

        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);
        
        const interaction = await Interaction.findOne({
            mentor,
            student,
            createdAt: { "$gte": start, "$lte": end }
        })

        if(!interaction) {
            const newInteraction = new Interaction();
            newInteraction.mentor = mentor;
            newInteraction.student = student;
            newInteraction.interactions = data;
        } 
        else {
            // update old
            
        }

        console.log("newInteraction", newInteraction);
    }
    catch(err){
        console.log();
    }

    }


}