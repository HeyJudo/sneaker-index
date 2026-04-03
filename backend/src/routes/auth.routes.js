const express = require("express");
const {
  getCurrentUser,
  issueDevelopmentToken,
} = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const {
  validateDevelopmentTokenRequest,
} = require("../utils/validators");

const router = express.Router();

router.get("/me", requireAuth, getCurrentUser);
router.post(
  "/dev-token",
  validateBody(validateDevelopmentTokenRequest),
  issueDevelopmentToken
);

module.exports = router;
