const Category = require("../models/Category");
const Product = require("../models/Product");
const { sendSuccess } = require("../utils/api-response");

function normalizePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function normalizeSort(sort) {
  switch (sort) {
    case "price_asc":
      return { price: 1, name: 1 };
    case "price_desc":
      return { price: -1, name: 1 };
    case "rating_desc":
      return { rating: -1, reviewCount: -1 };
    case "newest":
      return { createdAt: -1 };
    default:
      return { isFeatured: -1, createdAt: -1, name: 1 };
  }
}

function normalizeBrandFilter(brand) {
  if (Array.isArray(brand)) {
    return brand.map((value) => value.trim()).filter(Boolean);
  }

  if (typeof brand === "string") {
    return brand
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [];
}

async function buildProductFilter(query) {
  const filter = {
    isArchived: false,
  };

  if (query.featured === "true") {
    filter.isFeatured = true;
  }

  const brands = normalizeBrandFilter(query.brand);

  if (brands.length === 1) {
    filter.brand = brands[0];
  }

  if (brands.length > 1) {
    filter.brand = { $in: brands };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { brand: { $regex: query.search, $options: "i" } },
      { tags: { $elemMatch: { $regex: query.search, $options: "i" } } },
    ];
  }

  if (query.category) {
    const category = await Category.findOne({ slug: query.category }).lean();

    if (!category) {
      return {
        ...filter,
        categoryId: null,
      };
    }

    filter.categoryId = category._id;
  }

  return filter;
}

async function listProducts(req, res) {
  const page = normalizePositiveInt(req.query.page, 1);
  const limit = Math.min(normalizePositiveInt(req.query.limit, 12), 50);
  const skip = (page - 1) * limit;
  const sort = normalizeSort(req.query.sort);
  const filter = await buildProductFilter(req.query);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("categoryId", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  sendSuccess(res, {
    message: "Products fetched successfully.",
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

async function getProductFacets(_req, res) {
  const [brandBuckets, priceRange] = await Promise.all([
    Product.aggregate([
      { $match: { isArchived: false } },
      {
        $group: {
          _id: "$brand",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Product.aggregate([
      { $match: { isArchived: false } },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]),
  ]);

  const range = priceRange[0] || { minPrice: 0, maxPrice: 0 };

  sendSuccess(res, {
    message: "Product facets fetched successfully.",
    data: {
      brands: brandBuckets.map((bucket) => ({
        name: bucket._id,
        count: bucket.count,
      })),
      priceRange: {
        min: range.minPrice,
        max: range.maxPrice,
      },
    },
  });
}

async function listFeaturedProducts(req, res) {
  const limit = Math.min(normalizePositiveInt(req.query.limit, 6), 24);

  const products = await Product.find({
    isArchived: false,
    isFeatured: true,
  })
    .populate("categoryId", "name slug")
    .sort({ createdAt: -1, name: 1 })
    .limit(limit)
    .lean();

  sendSuccess(res, {
    message: "Featured products fetched successfully.",
    data: {
      products,
      total: products.length,
    },
  });
}

async function getProductBySlug(req, res) {
  const product = await Product.findOne({
    slug: req.params.slug,
    isArchived: false,
  })
    .populate("categoryId", "name slug")
    .lean();

  if (!product) {
    res.status(404).json({
      success: false,
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: "Product not found.",
      },
    });
    return;
  }

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    categoryId: product.categoryId._id,
    isArchived: false,
  })
    .populate("categoryId", "name slug")
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(4)
    .lean();

  sendSuccess(res, {
    message: "Product fetched successfully.",
    data: {
      product,
      relatedProducts,
    },
  });
}

module.exports = {
  getProductFacets,
  listProducts,
  listFeaturedProducts,
  getProductBySlug,
};
