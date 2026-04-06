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
const {
  listAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
} = require("../controllers/admin-orders.controller");
const {
  listAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} = require("../controllers/admin-categories.controller");
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
router.get(
  "/orders",
  requireAuth,
  requireRole("admin"),
  asyncHandler(listAdminOrders)
);
router.get(
  "/orders/:orderId",
  requireAuth,
  requireRole("admin"),
  asyncHandler(getAdminOrderById)
);
router.patch(
  "/orders/:orderId/status",
  requireAuth,
  requireRole("admin"),
  asyncHandler(updateAdminOrderStatus)
);
router.get(
  "/categories",
  requireAuth,
  requireRole("admin"),
  asyncHandler(listAdminCategories)
);
router.post(
  "/categories",
  requireAuth,
  requireRole("admin"),
  asyncHandler(createAdminCategory)
);
router.put(
  "/categories/:categoryId",
  requireAuth,
  requireRole("admin"),
  asyncHandler(updateAdminCategory)
);
router.delete(
  "/categories/:categoryId",
  requireAuth,
  requireRole("admin"),
  asyncHandler(deleteAdminCategory)
);

module.exports = router;
