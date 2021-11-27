const multer = require("multer");

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./tmp");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (!file.originalname.toLowerCase().match(/\.(jpeg|jpg|png)$/)) {
        return cb(new Error("Please upload a JPEG/JPG or PNG file."));
    }

    cb(undefined, true);
};

// exporting
module.exports = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
