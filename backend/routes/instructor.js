// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/auth");
// const Batch = require("../models/Batch");
// const multer = require("multer");
// const { uploadToS3 } = require("../utils/s3Upload");
// const Video = require("../models/Video"); // ✅ Correct naming

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ✅ POST /api/instructor/upload
// router.post(
//   "/upload",
//   protect("Instructor"),
//   upload.single("video"),
//   async (req, res) => {
//     const { title, batchId } = req.body;
//     console.log("🟡 Upload request received:", { title, batchId });

//     if (!title || !req.file || !batchId) {
//       console.log("❌ Missing fields");
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     try {
//       const videoUrl = await uploadToS3(req.file);
//       console.log("✅ Video uploaded to S3:", videoUrl);

//       const newVideo = await Video.create({
//         title,
//         url: videoUrl,
//         instructor: req.user._id,
//         batch: batchId,
//       });

//       console.log("✅ Video saved to DB:", newVideo._id);
//       res.status(201).json({ msg: "Uploaded", video: newVideo });
//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       res.status(500).json({ msg: "Upload failed", error: err.message });
//     }
//   }
// );

// // ✅ GET /api/instructor/batches
// router.get("/batches", protect("Instructor"), async (req, res) => {
//   try {
//     const instructorId = req.user.id;

//     const batches = await Batch.find({ instructor: instructorId })
//       .populate("students", "name email")
//       .select("name students");

//     res.json({ batches });
//   } catch (err) {
//     console.error("❌ Error fetching instructor batches:", err);
//     res.status(500).json({ message: "Failed to fetch batches" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const multer = require("multer");

const Batch = require("../models/Batch");
const Video = require("../models/Video");
const { uploadToS3 } = require("../utils/s3Upload");

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route   POST /api/instructor/upload
 * @desc    Upload a video to S3 and save metadata
 * @access  Instructor only
 */
router.post(
  "/upload",
  protect("Instructor"),
  upload.single("video"),
  async (req, res) => {
    const { title, batchId } = req.body;
    console.log("🟡 Upload request received:", { title, batchId });

    if (!title || !req.file || !batchId) {
      console.log("❌ Missing fields");
      return res.status(400).json({ msg: "All fields are required" });
    }

    try {
      // Upload to S3
      const videoUrl = await uploadToS3(req.file);
      console.log("✅ Video uploaded to S3:", videoUrl);

      // Save video metadata to DB
      const newVideo = await Video.create({
        title,
        url: videoUrl,
        instructor: req.user._id, // ✅ Corrected from .id to ._id
        batch: batchId,
      });

      console.log("✅ Video saved to DB:", newVideo._id);
      res.status(201).json({ msg: "Uploaded", video: newVideo });
    } catch (err) {
      console.error("❌ Upload failed:", err);
      res.status(500).json({ msg: "Upload failed", error: err.message });
    }
  }
);

/**
 * @route   GET /api/instructor/batches
 * @desc    Get batches assigned to instructor
 * @access  Instructor only
 */
router.get("/batches", protect("Instructor"), async (req, res) => {
  try {
    const instructorId = req.user._id; // ✅ Fixed to use _id instead of id

    const batches = await Batch.find({ instructor: instructorId })
      .populate("students", "name email")
      .select("name students");

    res.json({ batches });
  } catch (err) {
    console.error("❌ Error fetching instructor batches:", err);
    res.status(500).json({ message: "Failed to fetch batches" });
  }
});

router.get("/videos", protect("Instructor"), async (req, res) => {
  try {
    const videos = await Video.find({ instructor: req.user._id })
      .populate("batch", "name")
      .sort({ uploadedAt: -1 });

    res.json({ videos });
  } catch (err) {
    console.error("❌ Error fetching videos:", err);
    res.status(500).json({ msg: "Failed to fetch videos" });
  }
});

// DELETE: Delete a video
router.delete("/videos/:id", protect("Instructor"), async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user._id, // only their own video
    });
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }
    res.json({ msg: "Video deleted" });
  } catch (err) {
    console.error("Delete Video Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
