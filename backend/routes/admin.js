const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Batch = require("../models/Batch");
const { protect } = require("../middleware/auth");
const {
  getAllUsers,
  approveInstructor,
  deleteInstructor,
} = require("../controllers/adminController");

// Protect all admin routes
router.use(protect("Admin"));

// GET: Get all users
router.get("/users", getAllUsers);

// PATCH: Approve instructor
router.patch("/instructor/:id/approve", approveInstructor);

// DELETE: Remove instructor
router.delete("/instructor/:id", deleteInstructor);

// POST: Create instructor (auto-approved)
router.post("/create-instructor", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newInstructor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Instructor",
      status: "approved",
    });

    res
      .status(201)
      .json({ message: "Instructor created", user: newInstructor });
  } catch (err) {
    console.error("Create Instructor Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Create batch
router.post("/create-batch", async (req, res) => {
  try {
    const { name, instructorId, studentIds } = req.body;

    if (!name || !instructorId) {
      return res
        .status(400)
        .json({ message: "Batch name and instructor are required." });
    }

    const batch = new Batch({
      name,
      instructor: instructorId,
      students: studentIds || [],
    });
    await batch.save();

    res.status(201).json({ message: "Batch created", batch });
  } catch (err) {
    console.error("Create Batch Error:", err);
    res.status(500).json({ message: "Failed to create batch" });
  }
});

// GET: Fetch all batches
router.get("/batches", async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate("instructor", "name email")
      .populate("students", "name email");
    res.status(200).json({ batches });
  } catch (err) {
    console.error("Fetch Batches Error:", err);
    res.status(500).json({ message: "Failed to fetch batches" });
  }
});

// PUT: Update batch
router.put("/batch/:id", async (req, res) => {
  try {
    const { name, instructorId, studentIds } = req.body;

    const updated = await Batch.findByIdAndUpdate(
      req.params.id,
      {
        name,
        instructor: instructorId,
        students: studentIds || [],
      },
      { new: true }
    );

    res.status(200).json({ message: "Batch updated", batch: updated });
  } catch (err) {
    console.error("Update Batch Error:", err);
    res.status(500).json({ message: "Failed to update batch" });
  }
});

// DELETE: Remove batch
router.delete("/batch/:id", async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Batch deleted" });
  } catch (err) {
    console.error("Delete Batch Error:", err);
    res.status(500).json({ message: "Failed to delete batch" });
  }
});

module.exports = router;
