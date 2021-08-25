const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// routes
const adminRoutes = require("./routes/admin");

// mongoose config
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Allows cross-origin requests
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
