const router = require("express").Router();

const uploadController = require("../controller/upload");
const uploadFiles = require("../middleware/multer");

router.post("/file", uploadFiles, uploadController.upload);

module.exports = router;