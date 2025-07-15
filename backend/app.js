const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const instructorRoutes = require("./routes/instructor");
const studentRoutes = require("./routes/student");
const { protect } = require("./middleware/auth");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://learning-mgnt-sys.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);

// Example protected route
app.get(
  "/api/protected",
  protect("Admin", "Instructor", "Student"),
  (req, res) => {
    res.json({ msg: `Hello ${req.user.role}` });
  }
);

module.exports = app;
