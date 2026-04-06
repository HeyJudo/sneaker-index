const Category = require("../models/Category");
const { sendSuccess } = require("../utils/api-response");

async function listCategories(_req, res) {
  const categories = await Category.find({ isActive: { $ne: false } })
    .sort({ sortOrder: 1, isFeatured: -1, name: 1 })
    .lean();

  sendSuccess(res, {
    message: "Categories fetched successfully.",
    data: {
      categories,
      total: categories.length,
    },
  });
}

async function getCategoryBySlug(req, res) {
  const category = await Category.findOne({ slug: req.params.slug }).lean();

  if (!category) {
    res.status(404).json({
      success: false,
      error: {
        code: "CATEGORY_NOT_FOUND",
        message: "Category not found.",
      },
    });
    return;
  }

  sendSuccess(res, {
    message: "Category fetched successfully.",
    data: {
      category,
    },
  });
}

module.exports = {
  listCategories,
  getCategoryBySlug,
};
