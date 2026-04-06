const { Activity } = require("../models");
const { sendSuccess } = require("../utils/api-response");

function normalizeLimit(value, fallback = 20) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }
  return Math.min(parsed, 100);
}

function serializeActivity(activity) {
  return {
    id: String(activity._id),
    type: activity.type,
    title: activity.title,
    message: activity.message,
    actorName: activity.actorName || "System",
    actorRole: activity.actorRole || "system",
    meta: activity.meta || {},
    createdAt: activity.createdAt,
  };
}

async function listAdminActivity(req, res) {
  const limit = normalizeLimit(req.query.limit, 20);

  const activities = await Activity.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  sendSuccess(res, {
    message: "Admin activity fetched successfully.",
    data: {
      activities: activities.map(serializeActivity),
      total: activities.length,
    },
  });
}

module.exports = {
  listAdminActivity,
};
