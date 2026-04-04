const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    productSlug: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    heroImage: {
      type: String,
      trim: true,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    sizeLabel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    sizeSku: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    colorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    colorHex: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    lineTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
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
    addressLine1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    addressLine2: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: 32,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 255,
    },
    status: {
      type: String,
      enum: ["confirmed", "processing", "cancelled"],
      default: "confirmed",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["placeholder", "paid", "failed"],
      default: "placeholder",
      required: true,
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "express", "overnight"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "bank_transfer"],
      required: true,
    },
    items: {
      type: [orderItemSchema],
      default: [],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one order item is required.",
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },
      shipping: {
        type: Number,
        required: true,
        min: 0,
      },
      tax: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: Number,
        required: true,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ email: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
