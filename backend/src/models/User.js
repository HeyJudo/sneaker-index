const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    addressLine1: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    addressLine2: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },
    postalCode: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },
  },
  {
    _id: false,
    id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 255,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },
    defaultShippingAddress: {
      type: shippingAddressSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
