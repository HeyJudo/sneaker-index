const mongoose = require("mongoose");
const { Category, Product } = require("../models");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { createSlug } = require("../utils/slug");

function normalizePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }
  return parsed;
}

function assertValidCategoryId(categoryId) {
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
}

function toBoolean(value, fallback = true) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }
  return fallback;
}

function validateCategoryPayload(body) {
  const name = String(body?.name || "").trim();
  const slugInput = String(body?.slug || "").trim().toLowerCase();
  const slug = slugInput || createSlug(name);
  const isActive = toBoolean(body?.isActive, true);
  const sortOrder = normalizePositiveInt(body?.sortOrder, 0);

  const errors = [];

  if (!name) {
    errors.push({ field: "name", message: "name is required." });
  }

  if (!slug) {
    errors.push({ field: "slug", message: "slug is required." });
  }

  if (errors.length) {
    throw new AppError("Validation failed.", 400, {
      code: "VALIDATION_ERROR",
      details: errors,
    });
  }

  return { name, slug, isActive, sortOrder };
}

function mapCategory(category, productCount = 0) {
  return {
    id: String(category._id),
    name: category.name,
    slug: category.slug,
    isActive: category.isActive !== false,
    sortOrder: Number(category.sortOrder || 0),
    productCount,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

async function withProductCounts(categories) {
  const ids = categories.map((entry) => entry._id);
  if (!ids.length) {
    return [];
  }

  const counts = await Product.aggregate([
    { $match: { categoryId: { $in: ids } } },
    { $group: { _id: "$categoryId", count: { $sum: 1 } } },
  ]);

  const countMap = new Map(counts.map((entry) => [String(entry._id), Number(entry.count || 0)]));

  return categories.map((category) =>
    mapCategory(category, countMap.get(String(category._id)) || 0)
  );
}

async function listAdminCategories(_req, res) {
  const categories = await Category.find({})
    .sort({ sortOrder: 1, name: 1 })
    .lean();

  const mapped = await withProductCounts(categories);

  sendSuccess(res, {
    message: "Admin categories fetched successfully.",
    data: {
      categories: mapped,
      total: mapped.length,
      active: mapped.filter((entry) => entry.isActive).length,
      hidden: mapped.filter((entry) => !entry.isActive).length,
    },
  });
}

async function createAdminCategory(req, res) {
  const payload = validateCategoryPayload(req.body || {});

  const exists = await Category.findOne({ slug: payload.slug }).lean();
  if (exists) {
    throw new AppError("A category with that slug already exists.", 409, {
      code: "CATEGORY_SLUG_CONFLICT",
    });
  }

  const category = await Category.create(payload);

  sendSuccess(res, {
    statusCode: 201,
    message: "Category created successfully.",
    data: {
      category: mapCategory(category.toObject(), 0),
    },
  });
}

async function updateAdminCategory(req, res) {
  assertValidCategoryId(req.params.categoryId);

  const payload = validateCategoryPayload(req.body || {});

  const existing = await Category.findById(req.params.categoryId);
  if (!existing) {
    throw new AppError("Category not found.", 404, {
      code: "CATEGORY_NOT_FOUND",
    });
  }

  const conflict = await Category.findOne({
    _id: { $ne: existing._id },
    slug: payload.slug,
  }).lean();

  if (conflict) {
    throw new AppError("A category with that slug already exists.", 409, {
      code: "CATEGORY_SLUG_CONFLICT",
    });
  }

  existing.name = payload.name;
  existing.slug = payload.slug;
  existing.isActive = payload.isActive;
  existing.sortOrder = payload.sortOrder;
  await existing.save();

  const productCount = await Product.countDocuments({ categoryId: existing._id });

  sendSuccess(res, {
    message: "Category updated successfully.",
    data: {
      category: mapCategory(existing.toObject(), productCount),
    },
  });
}

async function deleteAdminCategory(req, res) {
  assertValidCategoryId(req.params.categoryId);

  const category = await Category.findById(req.params.categoryId).lean();
  if (!category) {
    throw new AppError("Category not found.", 404, {
      code: "CATEGORY_NOT_FOUND",
    });
  }

  const linkedProducts = await Product.countDocuments({ categoryId: category._id });
  if (linkedProducts > 0) {
    throw new AppError(
      `Cannot delete category while ${linkedProducts} product(s) are linked to it.`,
      409,
      {
        code: "CATEGORY_IN_USE",
      }
    );
  }

  await Category.deleteOne({ _id: category._id });

  sendSuccess(res, {
    message: "Category deleted successfully.",
    data: {
      categoryId: String(category._id),
    },
  });
}

module.exports = {
  listAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
};
