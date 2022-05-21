const Interaction = require("../models/Interaction");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const interactionEvents = require("../utils/interactions.utils");

module.exports = {
// create a new interaction between a mentor and mentee
createInteraction: async (event, mentor, student, data) => {
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

        console.log("interacton", interaction);

        if(!interaction) {
            // if no existing interaction found   
            const newInteraction = new Interaction();
            newInteraction.mentor = mentor;
            newInteraction.student = student;

            if(event === interactionEvents.POST) {
                newInteraction.interactions.posts.push(data._id);
            }

            if(event === interactionEvents.MEETING) {
                newInteraction.interactions.meetings.push(data._id);
            }

            if(event === interactionEvents.MESSAGE) {
                newInteraction.interactions.messages += 1;
            }

            await newInteraction.save();
            console.log("newInteraction", newInteraction);
            
        } 
        else {
            // update interaction if interaction found
            
            if(event === interactionEvents.POST) {
                const updated = await Interaction.findByIdAndUpdate(interaction._id, {
                    $push: { 
                        "interactions.posts": data._id
                    }
                })
            }

            if(event === interactionEvents.MEETING) {
                const updated = await Interaction.findByIdAndUpdate(interaction._id, {
                    $push: { 
                        "interactions.meetings": data._id
                    }
                })
            }

            if(event === interactionEvents.MESSAGE) {
                const updated = await Interaction.findByIdAndUpdate(interaction._id, {
                    $inc: { 
                        "interactions.messages": 1
                    }
                })
            }

            
        }

        console.log("newInteraction", newInteraction);
    }
    catch(err){
        console.log();
    }

    }


}