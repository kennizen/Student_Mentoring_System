const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is the admin route");
});

module.exports = router;
