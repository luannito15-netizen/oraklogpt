/**
 * Global error-handling middleware.
 * Must be registered LAST in app.js (4-argument signature).
 */
const errorMiddleware = (err, _req, res, _next) => {
  // Log in non-production environments
  if (process.env.NODE_ENV !== "production") {
    console.error("[ERROR]", err);
  }

  // Mongoose: document not found
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  // Mongoose: unique constraint violation
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `A user with this ${field} already exists`,
    });
  }

  // Mongoose: schema validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: "Validation error", errors });
  }

  // JWT errors (re-caught here as safety net)
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  // Default: 500 Internal Server Error
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorMiddleware;
