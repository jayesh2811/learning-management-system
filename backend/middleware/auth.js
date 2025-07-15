// const jwt = require("jsonwebtoken");

// exports.protect =
//   (...roles) =>
//   (req, res, next) => {
//     const auth = req.headers.authorization;
//     if (!auth) return res.status(401).json({ msg: "No token" });
//     const token = auth.split(" ")[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (roles.length && !roles.includes(decoded.role))
//         return res.status(403).json({ msg: "Access denied" });
//       req.user = decoded;
//       next();
//     } catch {
//       return res.status(401).json({ msg: "Invalid token" });
//     }
//   };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect =
//   (...roles) =>
//   async (req, res, next) => {
//     const auth = req.headers.authorization;
//     if (!auth) return res.status(401).json({ msg: "No token" });
//     const token = auth.split(" ")[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ msg: "Access denied" });
//       }

//       const user = await User.findById(decoded.id);
//       if (!user) return res.status(404).json({ msg: "User not found" });

//       req.user = user; // ✅ full Mongoose user object
//       next();
//     } catch (err) {
//       console.error("JWT error:", err);
//       return res.status(401).json({ msg: "Invalid token" });
//     }
//   };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect =
//   (...roles) =>
//   async (req, res, next) => {
//     const auth = req.headers.authorization;

//     if (!auth || !auth.startsWith("Bearer ")) {
//       return res.status(401).json({ msg: "No token provided" });
//     }

//     const token = auth.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Optional role check
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ msg: "Access denied" });
//       }

//       // Get full user object from DB
//       const user = await User.findById(decoded.id);

//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }

//       // Attach full user object to request
//       req.user = user;

//       next();
//     } catch (err) {
//       console.error("JWT error:", err);
//       return res.status(401).json({ msg: "Invalid token" });
//     }
//   };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect =
  (...roles) =>
  async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = auth.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Case: Admin from .env (not in DB)
      if (
        decoded.role === "Admin" &&
        decoded.email === process.env.ADMIN_EMAIL
      ) {
        if (roles.length && !roles.includes("Admin")) {
          return res.status(403).json({ msg: "Access denied" });
        }

        req.user = {
          _id: "admin-id", // Dummy ID
          name: "Admin",
          email: process.env.ADMIN_EMAIL,
          role: "Admin",
        };

        return next();
      }

      // ✅ Case: DB User (Student/Instructor/Admin in DB)
      const user = await User.findById(decoded.id);

      if (!user) return res.status(404).json({ msg: "User not found" });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("JWT error:", err);
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
