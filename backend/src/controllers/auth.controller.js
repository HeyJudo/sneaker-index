const User = require("../models/User");
const { env } = require("../config/env");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { signAccessToken } = require("../utils/jwt");
const { setAuthCookie, clearAuthCookie } = require("../utils/auth-cookie");
const { hashPassword, verifyPassword } = require("../utils/password");

function splitFullName(fullName) {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: parts[0],
    };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function buildUserPayload(body) {
  if (body.firstName && body.lastName) {
    return {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
    };
  }

  return splitFullName(body.fullName);
}

function buildAuthUser(user) {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function issueAuthSession(res, user) {
  const token = signAccessToken({
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  setAuthCookie(res, token);
}

async function signup(req, res) {
  const normalizedEmail = req.body.email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail }).lean();

  if (existingUser) {
    throw new AppError("An account with that email already exists.", 409, {
      code: "EMAIL_ALREADY_IN_USE",
    });
  }

  const passwordHash = await hashPassword(req.body.password);
  const { firstName, lastName } = buildUserPayload(req.body);

  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    passwordHash,
    role: "customer",
  });

  issueAuthSession(res, user);

  sendSuccess(res, {
    statusCode: 201,
    message: "Account created successfully.",
    data: {
      user: buildAuthUser(user),
    },
  });
}

async function login(req, res) {
  const normalizedEmail = req.body.email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select("+passwordHash");

  if (!user) {
    throw new AppError("Invalid email or password.", 401, {
      code: "INVALID_CREDENTIALS",
    });
  }

  const passwordMatches = await verifyPassword(
    req.body.password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password.", 401, {
      code: "INVALID_CREDENTIALS",
    });
  }

  issueAuthSession(res, user);

  sendSuccess(res, {
    message: "Login successful.",
    data: {
      user: buildAuthUser(user),
    },
  });
}

function logout(_req, res) {
  clearAuthCookie(res);

  sendSuccess(res, {
    message: "Logout successful.",
    data: null,
  });
}

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
  login,
  logout,
  signup,
  getCurrentUser,
  issueDevelopmentToken,
};
