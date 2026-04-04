const mongoose = require("mongoose");
const dns = require("dns");
const { env } = require("./env");

// Force Cloudflare DNS to bypass local network restrictions (e.g. school/office Wi-Fi)
// This prevents the "querySrv ECONNREFUSED" error on MongoDB Atlas connections.
try {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
} catch (error) {
  console.warn("Notice: Failed to set custom DNS servers:", error.message);
}

async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("Connected to MongoDB Atlas");
}

module.exports = connectToDatabase;

