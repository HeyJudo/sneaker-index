const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { logActivity } = require("../utils/activity-log");

function normalizePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function normalizeBoolean(value, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    }

    if (value.toLowerCase() === "false") {
      return false;
    }
  }

  return fallback;
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

function assertValidProductId(productId) {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("productId is invalid.", 400, {
      code: "VALIDATION_ERROR",
      details: [
        {
          field: "productId",
          message: "productId must be a valid identifier.",
        },
      ],
    });
  }
}

function mapProductWriteError(error) {
  if (error?.code === 11000) {
    return new AppError("A product with that slug already exists.", 409, {
      code: "PRODUCT_SLUG_CONFLICT",
    });
  }

  if (error?.name === "ValidationError") {
    const details = Object.values(error.errors || {}).map((entry) => ({
      field: entry.path,
      message: entry.message,
    }));

    return new AppError("Validation failed.", 400, {
      code: "VALIDATION_ERROR",
      details,
    });
  }

  return error;
}

async function resolveCategoryId({ categoryId, categorySlug }) {
  if (categoryId) {
    if (!mongoose.isValidObjectId(categoryId)) {
      throw new AppError("categoryId is invalid.", 400, {
        code: "VALIDATION_ERROR",
        details: [
          {
            field: "categoryId",
            message: "categoryId must be a valid identifier.",
          },
        ],
      });
    }

    return categoryId;
  }

  if (categorySlug) {
    const category = await Category.findOne({ slug: String(categorySlug).trim() })
      .select("_id")
      .lean();

    if (!category) {
      throw new AppError("Category not found for the provided categorySlug.", 400, {
        code: "CATEGORY_NOT_FOUND",
      });
    }

    return category._id;
  }

  throw new AppError("categoryId or categorySlug is required.", 400, {
    code: "VALIDATION_ERROR",
    details: [
      {
        field: "categoryId",
        message: "Provide categoryId or categorySlug.",
      },
    ],
  });
}

function buildProductPayload(body, categoryId) {
  const images = normalizeStringArray(body.images);
  const tags = normalizeStringArray(body.tags);

  return {
    name: String(body.name).trim(),
    slug: body.slug ? String(body.slug).trim().toLowerCase() : undefined,
    brand: String(body.brand).trim(),
    description: String(body.description).trim(),
    price: Number(body.price),
    compareAtPrice:
      body.compareAtPrice === null ||
      body.compareAtPrice === undefined ||
      body.compareAtPrice === ""
        ? null
        : Number(body.compareAtPrice),
    categoryId,
    tags,
    sizes: Array.isArray(body.sizes)
      ? body.sizes.map((size) => ({
          label: String(size.label).trim(),
          sku: String(size.sku).trim(),
          stock: Number(size.stock),
        }))
      : [],
    colors: Array.isArray(body.colors)
      ? body.colors.map((color) => ({
          name: String(color.name).trim(),
          hex: String(color.hex).trim(),
          image: color.image ? String(color.image).trim() : "",
        }))
      : [],
    images,
    heroImage: body.heroImage
      ? String(body.heroImage).trim()
      : images[0] || "",
    stockStatus: String(body.stockStatus).trim(),
    isFeatured: normalizeBoolean(body.isFeatured, false),
    isArchived: normalizeBoolean(body.isArchived, false),
    rating:
      body.rating === undefined || body.rating === null || body.rating === ""
        ? 0
        : Number(body.rating),
    reviewCount:
      body.reviewCount === undefined ||
      body.reviewCount === null ||
      body.reviewCount === ""
        ? 0
        : Number(body.reviewCount),
    seoTitle: body.seoTitle ? String(body.seoTitle).trim() : "",
    seoDescription: body.seoDescription ? String(body.seoDescription).trim() : "",
  };
}

function buildAdminFilter(query) {
  const filter = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { brand: { $regex: query.search, $options: "i" } },
      { slug: { $regex: query.search, $options: "i" } },
      { tags: { $elemMatch: { $regex: query.search, $options: "i" } } },
    ];
  }

  if (query.brand) {
    filter.brand = query.brand;
  }

  if (query.stockStatus) {
    filter.stockStatus = query.stockStatus;
  }

  if (query.isFeatured === "true" || query.isFeatured === "false") {
    filter.isFeatured = query.isFeatured === "true";
  }

  if (query.isArchived === "true" || query.isArchived === "false") {
    filter.isArchived = query.isArchived === "true";
  }

  return filter;
}

async function maybeAttachCategoryFilter(filter, categoryQuery) {
  if (!categoryQuery) {
    return filter;
  }

  if (mongoose.isValidObjectId(categoryQuery)) {
    return {
      ...filter,
      categoryId: categoryQuery,
    };
  }

  const category = await Category.findOne({ slug: categoryQuery })
    .select("_id")
    .lean();

  if (!category) {
    return {
      ...filter,
      categoryId: null,
    };
  }

  return {
    ...filter,
    categoryId: category._id,
  };
}

async function listAdminProducts(req, res) {
  const page = normalizePositiveInt(req.query.page, 1);
  const limit = Math.min(normalizePositiveInt(req.query.limit, 20), 100);
  const skip = (page - 1) * limit;

  const baseFilter = buildAdminFilter(req.query);
  const filter = await maybeAttachCategoryFilter(baseFilter, req.query.category);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  sendSuccess(res, {
    message: "Admin products fetched successfully.",
    data: {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    },
  });
}

async function getAdminProductById(req, res) {
  assertValidProductId(req.params.productId);

  const product = await Product.findById(req.params.productId)
    .populate("categoryId", "name slug")
    .lean();

  if (!product) {
    throw new AppError("Product not found.", 404, {
      code: "PRODUCT_NOT_FOUND",
    });
  }

  sendSuccess(res, {
    message: "Admin product fetched successfully.",
    data: {
      product,
    },
  });
}

async function createAdminProduct(req, res) {
  const categoryId = await resolveCategoryId(req.body);
  const payload = buildProductPayload(req.body, categoryId);
  let product;

  try {
    product = await Product.create(payload);
  } catch (error) {
    throw mapProductWriteError(error);
  }

  const populatedProduct = await Product.findById(product._id)
    .populate("categoryId", "name slug")
    .lean();

  await logActivity({
    type: "product_created",
    title: "Product Created",
    message: `${populatedProduct.name} added to the product archive.`,
    actor: req.user,
    meta: {
      productId: String(populatedProduct._id),
      slug: populatedProduct.slug,
    },
  });

  sendSuccess(res, {
    statusCode: 201,
    message: "Product created successfully.",
    data: {
      product: populatedProduct,
    },
  });
}

async function updateAdminProduct(req, res) {
  assertValidProductId(req.params.productId);

  const existingProduct = await Product.findById(req.params.productId);

  if (!existingProduct) {
    throw new AppError("Product not found.", 404, {
      code: "PRODUCT_NOT_FOUND",
    });
  }

  const categoryId = await resolveCategoryId(req.body);
  const payload = buildProductPayload(req.body, categoryId);

  Object.assign(existingProduct, payload);
  try {
    await existingProduct.save();
  } catch (error) {
    throw mapProductWriteError(error);
  }

  const populatedProduct = await Product.findById(existingProduct._id)
    .populate("categoryId", "name slug")
    .lean();

  await logActivity({
    type: "product_updated",
    title: "Product Updated",
    message: `${populatedProduct.name} details were updated.`,
    actor: req.user,
    meta: {
      productId: String(populatedProduct._id),
      slug: populatedProduct.slug,
    },
  });

  sendSuccess(res, {
    message: "Product updated successfully.",
    data: {
      product: populatedProduct,
    },
  });
}

async function archiveAdminProduct(req, res) {
  assertValidProductId(req.params.productId);

  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new AppError("Product not found.", 404, {
      code: "PRODUCT_NOT_FOUND",
    });
  }

  product.isArchived = normalizeBoolean(req.body?.isArchived, true);
  await product.save();

  await logActivity({
    type: product.isArchived ? "product_archived" : "product_restored",
    title: product.isArchived ? "Product Archived" : "Product Restored",
    message: `${product.name} was ${product.isArchived ? "archived" : "restored"}.`,
    actor: req.user,
    meta: {
      productId: String(product._id),
      isArchived: product.isArchived,
    },
  });

  sendSuccess(res, {
    message: product.isArchived
      ? "Product archived successfully."
      : "Product restored successfully.",
    data: {
      product: {
        id: product._id.toString(),
        isArchived: product.isArchived,
      },
    },
  });
}

async function deleteAdminProduct(req, res) {
  assertValidProductId(req.params.productId);

  const deleted = await Product.findByIdAndDelete(req.params.productId).lean();

  if (!deleted) {
    throw new AppError("Product not found.", 404, {
      code: "PRODUCT_NOT_FOUND",
    });
  }

  await logActivity({
    type: "product_deleted",
    title: "Product Deleted",
    message: `${deleted.name} was deleted from the archive.`,
    actor: req.user,
    meta: {
      productId: req.params.productId,
      slug: deleted.slug,
    },
  });

  sendSuccess(res, {
    message: "Product deleted successfully.",
    data: {
      productId: req.params.productId,
    },
  });
}

module.exports = {
  listAdminProducts,
  getAdminProductById,
  createAdminProduct,
  updateAdminProduct,
  archiveAdminProduct,
  deleteAdminProduct,
};
