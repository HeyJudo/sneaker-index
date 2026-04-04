const express = require("express");
const {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} = require("../controllers/cart.controller");
const { optionalAuth } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const { asyncHandler } = require("../utils/async-handler");
const {
  validateAddCartItemRequest,
  validateUpdateCartItemRequest,
} = require("../utils/validators");

const router = express.Router();

router.use(optionalAuth);

router.get("/", asyncHandler(getCart));
router.post(
  "/items",
  validateBody(validateAddCartItemRequest),
  asyncHandler(addCartItem)
);
router.patch(
  "/items/:itemId",
  validateBody(validateUpdateCartItemRequest),
  asyncHandler(updateCartItem)
);
router.delete("/items/:itemId", asyncHandler(removeCartItem));
router.delete("/", asyncHandler(clearCart));

module.exports = router;
