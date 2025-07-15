const mongoose = require("mongoose");

const watchedSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  { timestamps: true }
);

watchedSchema.index({ student: 1, video: 1 }, { unique: true });

module.exports = mongoose.model("Watched", watchedSchema);
