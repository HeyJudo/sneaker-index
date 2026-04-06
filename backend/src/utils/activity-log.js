const mongoose = require("mongoose");
const { Activity } = require("../models");

function resolveActor(actor) {
  if (!actor) {
    return {
      actorId: null,
      actorName: "System",
      actorRole: "system",
    };
  }

  const fullName = [actor.firstName, actor.lastName].filter(Boolean).join(" ").trim();

  return {
    actorId:
      actor.id && mongoose.isValidObjectId(actor.id)
        ? mongoose.Types.ObjectId.createFromHexString(String(actor.id))
        : null,
    actorName: fullName || actor.email || "Unknown User",
    actorRole: actor.role || "unknown",
  };
}

async function logActivity({ type, title, message, actor = null, meta = {} }) {
  if (!type || !title || !message) {
    return;
  }

  const actorInfo = resolveActor(actor);

  try {
    await Activity.create({
      type: String(type).trim(),
      title: String(title).trim(),
      message: String(message).trim(),
      actorId: actorInfo.actorId,
      actorName: actorInfo.actorName,
      actorRole: actorInfo.actorRole,
      meta: meta && typeof meta === "object" ? meta : {},
    });
  } catch (_error) {
    // Activity logging must never fail business flows.
  }
}

module.exports = {
  logActivity,
};
