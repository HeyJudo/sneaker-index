const express = require("express");
const { createOrder, listOrders } = require("../controllers/orders.controller");
const { optionalAuth, requireAuth } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const { asyncHandler } = require("../utils/async-handler");
const { validateCreateOrderRequest } = require("../utils/validators");

const router = express.Router();

router.use(optionalAuth);

router.post("/", validateBody(validateCreateOrderRequest), asyncHandler(createOrder));
router.get("/", requireAuth, asyncHandler(listOrders));

module.exports = router;
