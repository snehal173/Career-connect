const multer = require("multer");

// 1. Define storage first
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// 2. Then use it in multer
const upload = multer({ storage });

// 3. Export it
module.exports = upload; // Use this if in a Node.js (CommonJS) environment
