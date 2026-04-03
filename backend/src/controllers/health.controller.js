const mongoose = require("mongoose");

function getDatabaseState() {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return states[mongoose.connection.readyState] || "unknown";
}

function getHealth(_req, res) {
  res.status(200).json({
    success: true,
    data: {
      service: "sneaker-index-api",
      status: "ok",
      timestamp: new Date().toISOString(),
      database: getDatabaseState(),
    },
  });
}

module.exports = {
  getHealth,
};

