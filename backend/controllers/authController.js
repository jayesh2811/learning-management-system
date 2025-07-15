const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role === "Admin")
    return res.status(403).json({ msg: "Cannot register as Admin" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "Email already exists" });

  const hashed = await bcrypt.hash(password, 12);
  const status = role === "Instructor" ? "pending" : "approved";

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
    status,
  });

  // Return differently based on role
  if (role === "Instructor") {
    return res.json({ msg: "Registered! Wait for admin approval." });
  }

  // Auto-login for Student after signup
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    msg: "Registered successfully!",
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  if (role === "Admin") {
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ msg: "Admin credentials wrong" });
    }
    const token = jwt.sign(
      { email, role: "Admin", id: "admin-id" },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.json({
      token,
      user: { name: "Admin", email, role: "Admin", status: "approved" },
    });
  }

  const user = await User.findOne({ email, role });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (role === "Instructor" && user.status !== "approved")
    return res.status(403).json({ msg: "Instructor not yet approved" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: "Incorrect password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({
    token,
    user: { name: user.name, email: user.email, role: user.role },
  });
};
