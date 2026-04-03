const mongoose = require("mongoose");
const { createSlug } = require("../utils/slug");

const productSizeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const productColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hex: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [productSizeSchema],
      default: [],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one size option is required.",
      },
    },
    colors: {
      type: [productColorSchema],
      default: [],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one color option is required.",
      },
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one product image is required.",
      },
    },
    heroImage: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    stockStatus: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock", "preorder"],
      default: "in-stock",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 320,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.pre("validate", function setSlugAndHero(next) {
  if (!this.slug && this.name) {
    this.slug = createSlug(this.name);
  }

  if (!this.heroImage && Array.isArray(this.images) && this.images.length > 0) {
    this.heroImage = this.images[0];
  }

  next();
});

productSchema.index({ categoryId: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ isFeatured: 1 });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
