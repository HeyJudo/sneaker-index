const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

function getEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const env = {
  PORT: Number(getEnv("PORT", 4000)),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  MONGODB_URI: requireEnv("MONGODB_URI"),
  CLIENT_BASE_URL: getEnv("CLIENT_BASE_URL", "http://localhost:5500"),
  COOKIE_SECRET: requireEnv("COOKIE_SECRET"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "7d"),
  BCRYPT_SALT_ROUNDS: Number(getEnv("BCRYPT_SALT_ROUNDS", 12)),
};

module.exports = {
  env,
};
