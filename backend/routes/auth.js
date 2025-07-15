const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register); // Students & Instructors
router.post("/login", login); // Students, Instructors, Admin

module.exports = router;
