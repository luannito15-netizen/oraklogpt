const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

const routes = require("./src/routes");
const errorMiddleware = require("./src/middlewares/error.middleware");
const { swaggerUi, swaggerSpec } = require("./src/docs/swagger");

const app = express();

// ── Security headers ──────────────────────────────────────────────
app.use(helmet());

// ── Request logging ───────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// ── Body parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Sanitize inputs (prevent NoSQL injection) ─────────────────────
app.use(mongoSanitize());

// ── API documentation ─────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ────────────────────────────────────────────────────────
app.use("/api/v1", routes);

// ── Health check ──────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 handler ───────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ──────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
