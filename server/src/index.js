const express = require("express");
const cors = require("cors");

// routes
const adminRouter = require("./routes/admin");

// mongoose config
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
