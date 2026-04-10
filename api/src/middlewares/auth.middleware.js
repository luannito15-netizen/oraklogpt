const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Protects routes — requires a valid Bearer JWT in the Authorization header.
 * Attaches the authenticated user to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required — no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is valid but user no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Token has expired — please log in again"
        : "Invalid token";

    return res.status(401).json({ success: false, message });
  }
};

module.exports = { protect };
