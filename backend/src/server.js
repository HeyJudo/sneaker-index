const app = require("./app");
const connectToDatabase = require("./config/db");
const { env } = require("./config/env");

let server;

async function startServer() {
  await connectToDatabase();

  server = app.listen(env.PORT, () => {
    console.log(
      `Sneaker Index API listening on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`
    );
  });
}

function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});

