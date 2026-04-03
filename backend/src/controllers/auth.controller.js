const { env } = require("../config/env");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { signAccessToken } = require("../utils/jwt");

function getCurrentUser(req, res) {
  sendSuccess(res, {
    message: "Authenticated user loaded.",
    data: {
      user: req.user,
    },
  });
}

function issueDevelopmentToken(req, res) {
  if (env.NODE_ENV === "production") {
    throw new AppError("Development token route is disabled in production.", 404, {
      code: "ROUTE_NOT_FOUND",
    });
  }

  const role = req.body.role || "customer";
  const email = req.body.email || `dev-${role}@sneakerindex.local`;
  const firstName = req.body.firstName || "Dev";
  const lastName = req.body.lastName || role;

  const token = signAccessToken({
    sub: `dev-${role}-user`,
    email,
    role,
    firstName,
    lastName,
  });

  sendSuccess(res, {
    message: "Development token issued.",
    data: {
      token,
      user: {
        id: `dev-${role}-user`,
        email,
        role,
        firstName,
        lastName,
      },
    },
  });
}

module.exports = {
  getCurrentUser,
  issueDevelopmentToken,
};
