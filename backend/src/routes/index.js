const express = require("express");
const adminRoutes = require("./admin.routes");
const authRoutes = require("./auth.routes");
const cartRoutes = require("./cart.routes");
const categoriesRoutes = require("./categories.routes");
const healthRoutes = require("./health.routes");
const ordersRoutes = require("./orders.routes");
const productsRoutes = require("./products.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
