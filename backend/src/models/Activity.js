const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 400,
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    actorName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    actorRole: {
      type: String,
      trim: true,
      maxlength: 40,
      default: "",
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

activitySchema.index({ createdAt: -1 });
activitySchema.index({ type: 1, createdAt: -1 });

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

module.exports = Activity;
