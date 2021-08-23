const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

mongoose.connect(
    process.env.MONGO_DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Connected to Database");
    }
);
