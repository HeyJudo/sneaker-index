const { AUTH_COOKIE_NAME } = require("../config/constants");
const { AppError } = require("../utils/app-error");
const { verifyAccessToken } = require("../utils/jwt");

function extractBearerToken(req) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice(7).trim();
}

function extractToken(req) {
  return (
    req.signedCookies?.[AUTH_COOKIE_NAME] ||
    req.cookies?.[AUTH_COOKIE_NAME] ||
    extractBearerToken(req)
  );
}

function mapJwtPayloadToUser(payload) {
  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
    firstName: payload.firstName,
    lastName: payload.lastName,
  };
}

function optionalAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = mapJwtPayloadToUser(payload);
  } catch (_error) {
    req.user = null;
  }

  next();
}

function requireAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    next(
      new AppError("Authentication required.", 401, {
        code: "AUTH_REQUIRED",
      })
    );
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = mapJwtPayloadToUser(payload);
    next();
  } catch (_error) {
    next(
      new AppError("Invalid or expired token.", 401, {
        code: "INVALID_TOKEN",
      })
    );
  }
}

function requireRole(...allowedRoles) {
  return function roleGuard(req, _res, next) {
    if (!req.user) {
      next(
        new AppError("Authentication required.", 401, {
          code: "AUTH_REQUIRED",
        })
      );
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(
        new AppError("You do not have permission to access this resource.", 403, {
          code: "FORBIDDEN",
        })
      );
      return;
    }

    next();
  };
}

module.exports = {
  optionalAuth,
  requireAuth,
  requireRole,
};
