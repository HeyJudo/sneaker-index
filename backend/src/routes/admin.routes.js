const express = require("express");
const { getAdminPing } = require("../controllers/admin.controller");
const {
  listAdminProducts,
  getAdminProductById,
  createAdminProduct,
  updateAdminProduct,
  archiveAdminProduct,
  deleteAdminProduct,
} = require("../controllers/admin-products.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const { asyncHandler } = require("../utils/async-handler");
const { validateAdminProductUpsertRequest } = require("../utils/validators");

const router = express.Router();

router.get("/ping", requireAuth, requireRole("admin"), getAdminPing);
router.get(
  "/products",
  requireAuth,
  requireRole("admin"),
  asyncHandler(listAdminProducts)
);
router.get(
  "/products/:productId",
  requireAuth,
  requireRole("admin"),
  asyncHandler(getAdminProductById)
);
router.post(
  "/products",
  requireAuth,
  requireRole("admin"),
  validateBody(validateAdminProductUpsertRequest),
  asyncHandler(createAdminProduct)
);
router.put(
  "/products/:productId",
  requireAuth,
  requireRole("admin"),
  validateBody(validateAdminProductUpsertRequest),
  asyncHandler(updateAdminProduct)
);
router.patch(
  "/products/:productId/archive",
  requireAuth,
  requireRole("admin"),
  asyncHandler(archiveAdminProduct)
);
router.delete(
  "/products/:productId",
  requireAuth,
  requireRole("admin"),
  asyncHandler(deleteAdminProduct)
);

module.exports = router;
