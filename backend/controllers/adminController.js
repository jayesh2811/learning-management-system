const User = require("../models/User");

// Combined route for fetching all users (students, instructors, pending instructors)
exports.getAllUsers = async (req, res) => {
  try {
    const students = await User.find({
      role: "Student",
      status: "approved",
    }).select("-password");
    const instructors = await User.find({
      role: "Instructor",
      status: "approved",
    }).select("-password");
    const pendingInstructors = await User.find({
      role: "Instructor",
      status: "pending",
    }).select("-password");

    res.json({ students, instructors, pendingInstructors });
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Approve instructor
exports.approveInstructor = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await User.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!instructor)
      return res.status(404).json({ msg: "Instructor not found" });
    res.json({ msg: "Instructor approved", instructor });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete instructor
exports.deleteInstructor = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ msg: "Instructor deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
