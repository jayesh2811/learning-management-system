const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // memory storage
const { uploadVideo } = require("../controllers/videoController");
const { protect } = require("../middleware/auth");

router.post(
  "/upload",
  protect(["Instructor", "Admin"]),
  upload.single("video"),
  uploadVideo
);

module.exports = router;
