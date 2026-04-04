const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    selectedForCheckout: {
      type: Boolean,
      default: true,
      required: true,
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
    compareAtPrice: {
      type: Number,
      default: null,
      min: 0,
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
  },
  {
    timestamps: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    guestCartId: {
      type: String,
      trim: true,
      default: null,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    currency: {
      type: String,
      default: "USD",
      trim: true,
      uppercase: true,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cartSchema.index(
  { userId: 1 },
  { unique: true, partialFilterExpression: { userId: { $type: "objectId" } } }
);
cartSchema.index(
  { guestCartId: 1 },
  { unique: true, partialFilterExpression: { guestCartId: { $type: "string" } } }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

module.exports = Cart;
