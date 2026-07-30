
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("::::upload:::", file);

    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;

    cb(null, uniqueName);
  },
});

// Create the multer instance for disk storage
const uploadFiles = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: "file", maxCount: 5 },
]);

module.exports = uploadFiles;