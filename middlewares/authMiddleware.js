const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: "Token not provided" });
      }
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Not Authorized: Token expired or invalid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization token not provided" });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const adminUser = await User.findById(user._id);
    
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { authMiddleware, isAdmin };
