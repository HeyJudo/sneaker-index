const express = require("express");
const {
  listCategories,
  getCategoryBySlug,
} = require("../controllers/categories.controller");
const { asyncHandler } = require("../utils/async-handler");

const router = express.Router();

router.get("/", asyncHandler(listCategories));
router.get("/:slug", asyncHandler(getCategoryBySlug));

module.exports = router;
