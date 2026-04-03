const mongoose = require("mongoose");
const { env } = require("./env");

async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("Connected to MongoDB Atlas");
}

module.exports = connectToDatabase;

