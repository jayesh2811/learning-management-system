// // // GET /api/student/dashboard

// // const express = require("express");
// // const router = express.Router();
// // const { protect } = require("../middleware/auth");

// // const Batch = require("../models/Batch");
// // const Video = require("../models/Video");

// // router.get("/dashboard", protect("Student"), async (req, res) => {
// //   try {
// //     const studentId = req.user._id;
// //     const batch = await Batch.findOne({ students: studentId })
// //       .populate("instructor", "name email")
// //       .populate("students", "name email");

// //     if (!batch) {
// //       return res.status(404).json({ message: "Batch not found" });
// //     }

// //     const videos = await Video.find({ batch: batch._id }).select("title url");

// //     res.json({
// //       batch: {
// //         name: batch.name,
// //         instructor: batch.instructor,
// //       },
// //       videos,
// //     });
// //   } catch (err) {
// //     console.error("Student dashboard error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // module.exports = router;

// // backend/routes/student.js
// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/auth");

// const Batch = require("../models/Batch");
// const Video = require("../models/Video");
// const Watched = require("../models/Watched"); // new model

// // GET: Student dashboard
// router.get("/dashboard", protect("Student"), async (req, res) => {
//   try {
//     const studentId = req.user._id;
//     const batch = await Batch.findOne({ students: studentId })
//       .populate("instructor", "name email")
//       .populate("students", "name email");

//     if (!batch) return res.status(404).json({ message: "Batch not found" });

//     const videos = await Video.find({ batch: batch._id }).select("title url");

//     const watchedMap = await Watched.find({
//       student: studentId,
//       video: { $in: videos.map((v) => v._id) },
//     }).then((watched) =>
//       watched.reduce((acc, w) => {
//         acc[w.video.toString()] = true;
//         return acc;
//       }, {})
//     );

//     const videosWithStatus = videos.map((v) => ({
//       ...v.toObject(),
//       watched: watchedMap[v._id.toString()] || false,
//     }));

//     res.json({
//       batch: {
//         name: batch.name,
//         instructor: batch.instructor,
//       },
//       videos: videosWithStatus,
//     });
//   } catch (err) {
//     console.error("Student dashboard error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // PATCH: Mark video watched/unwatched
// router.patch("/videos/:id/watched", protect("Student"), async (req, res) => {
//   try {
//     const studentId = req.user._id;
//     const videoId = req.params.id;
//     const { watched } = req.body;

//     const exists = await Watched.findOne({
//       student: studentId,
//       video: videoId,
//     });
//     if (watched && !exists) {
//       await Watched.create({ student: studentId, video: videoId });
//     } else if (!watched && exists) {
//       await Watched.deleteOne({ _id: exists._id });
//     }

//     res.json({ message: "Watch status updated" });
//   } catch (err) {
//     console.error("Watch toggle error:", err);
//     res.status(500).json({ message: "Failed to update status" });
//   }
// });

// module.exports = router;

// backend/routes/student.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const Batch = require("../models/Batch");
const Video = require("../models/Video");
const Watched = require("../models/Watched"); // model to track watched videos

// GET: Student dashboard
router.get("/dashboard", protect("Student"), async (req, res) => {
  try {
    const studentId = req.user._id;
    const batch = await Batch.findOne({ students: studentId })
      .populate("instructor", "name email")
      .populate("students", "name email");

    if (!batch) return res.status(404).json({ message: "Batch not found" });

    const videos = await Video.find({ batch: batch._id }).select("title url");

    const watchedMap = await Watched.find({
      student: studentId,
      video: { $in: videos.map((v) => v._id) },
    }).then((watched) =>
      watched.reduce((acc, w) => {
        acc[w.video.toString()] = true;
        return acc;
      }, {})
    );

    const videosWithStatus = videos.map((v) => ({
      ...v.toObject(),
      watched: watchedMap[v._id.toString()] || false,
    }));

    res.json({
      batch: {
        name: batch.name,
        instructor: batch.instructor,
      },
      videos: videosWithStatus,
    });
  } catch (err) {
    console.error("Student dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH: Mark video watched/unwatched
router.patch("/videos/:id/watched", protect("Student"), async (req, res) => {
  try {
    const studentId = req.user._id;
    const videoId = req.params.id;
    const { watched } = req.body;

    const exists = await Watched.findOne({
      student: studentId,
      video: videoId,
    });

    if (watched && !exists) {
      await Watched.create({ student: studentId, video: videoId });
    } else if (!watched && exists) {
      await Watched.deleteOne({ _id: exists._id });
    }

    res.json({ message: "Watch status updated" });
  } catch (err) {
    console.error("Watch toggle error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
