const express = require("express");
const { getAdminPing } = require("../controllers/admin.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/ping", requireAuth, requireRole("admin"), getAdminPing);

module.exports = router;
