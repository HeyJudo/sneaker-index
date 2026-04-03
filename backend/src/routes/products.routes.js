const express = require("express");
const {
  listProducts,
  listFeaturedProducts,
  getProductBySlug,
} = require("../controllers/products.controller");
const { asyncHandler } = require("../utils/async-handler");

const router = express.Router();

router.get("/", asyncHandler(listProducts));
router.get("/featured", asyncHandler(listFeaturedProducts));
router.get("/:slug", asyncHandler(getProductBySlug));

module.exports = router;
