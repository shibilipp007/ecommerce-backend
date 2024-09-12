const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("errr");
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
