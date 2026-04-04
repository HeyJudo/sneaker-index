const express = require("express");
const {
  login,
  logout,
  signup,
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
  issueDevelopmentToken,
} = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const { asyncHandler } = require("../utils/async-handler");
const {
  validateLoginRequest,
  validateSignupRequest,
  validateDevelopmentTokenRequest,
  validateUpdateProfileRequest,
  validateUpdatePasswordRequest,
} = require("../utils/validators");

const router = express.Router();

router.post("/signup", validateBody(validateSignupRequest), asyncHandler(signup));
router.post("/login", validateBody(validateLoginRequest), asyncHandler(login));
router.post("/logout", logout);
router.get("/me", requireAuth, asyncHandler(getCurrentUser));
router.patch(
  "/me",
  requireAuth,
  validateBody(validateUpdateProfileRequest),
  asyncHandler(updateCurrentUser)
);
router.patch(
  "/me/password",
  requireAuth,
  validateBody(validateUpdatePasswordRequest),
  asyncHandler(updateCurrentUserPassword)
);
router.post(
  "/dev-token",
  validateBody(validateDevelopmentTokenRequest),
  asyncHandler(issueDevelopmentToken)
);

module.exports = router;
