require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3001;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
    console.log(`📖 Docs available at http://localhost:${PORT}/api-docs\n`);
  });
})();

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received — shutting down gracefully");
  process.exit(0);
});
