const express = require("express");
const cors = require("cors");

// routes
const adminRouter = require("./routes/admin");

// mongoose config
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Allows cross-origin requests
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

