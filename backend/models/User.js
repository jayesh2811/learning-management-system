const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    default: "Student",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "deleted"],
    default: "approved",
  },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
});

module.exports = mongoose.model("User", userSchema);
