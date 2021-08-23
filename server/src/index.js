const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// mongoose config
require("./config/mongoose");

const app = express();
const port = process.env.PORT || 5000;

// mongo db password ASu2mL7HtBRazSxL
// username dbuser1

app.use(cors());
app.use(express.json());

// routes
const adminRouter = require("./routes/admin");

app.use("/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("running");
});
app.listen(port, () => console.log(`server running on port ${port}`));
