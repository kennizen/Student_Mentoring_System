const mongoose = require("mongoose");
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");
const Response = require("../utils/response.utils");

module.exports = {
    // get user info via id handler
    userInfoHandler: async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res
                .status(400)
                .send(Response.badrequest("Bad Request. Provide a valid user id", {}));
        }

        try {
            let user = await Student.findById(req.params.id);

            if (!user) {
                user = await Mentor.findById(req.params.id);
            }

            if (!user) {
                throw new Error();
            }

            res.send(Response.success("", { user }));
        } catch (err) {
            res.status(404).send(Response.notfound("", {}));
        }
    },
};
