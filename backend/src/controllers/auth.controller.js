const User = require("../models/User");
const Cart = require("../models/Cart");
const { env } = require("../config/env");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { signAccessToken } = require("../utils/jwt");
const { setAuthCookie, clearAuthCookie } = require("../utils/auth-cookie");
const { hashPassword, verifyPassword } = require("../utils/password");
const { readGuestCartId, clearCartCookie } = require("../utils/cart-session");

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
  const shippingAddresses = Array.isArray(user.shippingAddresses)
    ? user.shippingAddresses.map((address) => ({
        id: address._id?.toString?.() || address.id || "",
        label: address.label || "",
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        country: address.country || "",
        isDefault: Boolean(address.isDefault),
      }))
    : [];
  const defaultShippingAddress =
    shippingAddresses.find((address) => address.isDefault) ||
    (user.defaultShippingAddress
      ? {
          id: user.defaultShippingAddress._id?.toString?.() || "",
          label: user.defaultShippingAddress.label || "",
          firstName: user.defaultShippingAddress.firstName || "",
          lastName: user.defaultShippingAddress.lastName || "",
          addressLine1: user.defaultShippingAddress.addressLine1 || "",
          addressLine2: user.defaultShippingAddress.addressLine2 || "",
          city: user.defaultShippingAddress.city || "",
          state: user.defaultShippingAddress.state || "",
          postalCode: user.defaultShippingAddress.postalCode || "",
          country: user.defaultShippingAddress.country || "",
          isDefault: true,
        }
      : null);

  if (
    shippingAddresses.length === 0 &&
    defaultShippingAddress &&
    defaultShippingAddress.firstName &&
    defaultShippingAddress.addressLine1
  ) {
    shippingAddresses.push({
      ...defaultShippingAddress,
      id: defaultShippingAddress.id || "legacy-default-address",
      label: defaultShippingAddress.label || "Primary Address",
      isDefault: true,
    });
  }

  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: user.phone || "",
    avatarUrl: user.avatarUrl || "",
    role: user.role,
    defaultShippingAddress,
    shippingAddresses,
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

function buildCartItemKey(item) {
  return [item.productId?.toString?.() || item.productId, item.sizeSku, item.colorName]
    .filter(Boolean)
    .join("::");
}

async function mergeGuestCartIntoUser(req, res, userId) {
  const guestCartId = readGuestCartId(req);

  if (!guestCartId) {
    return;
  }

  const guestCart = await Cart.findOne({ guestCartId });

  if (!guestCart) {
    clearCartCookie(res);
    return;
  }

  let userCart = await Cart.findOne({ userId });

  if (!userCart) {
    guestCart.userId = userId;
    guestCart.guestCartId = null;
    await guestCart.save();
    clearCartCookie(res);
    return;
  }

  const cartItemMap = new Map(
    userCart.items.map((item) => [buildCartItemKey(item), item])
  );

  guestCart.items.forEach((guestItem) => {
    const key = buildCartItemKey(guestItem);
    const existingItem = cartItemMap.get(key);

    if (existingItem) {
      existingItem.quantity += guestItem.quantity;
      existingItem.selectedForCheckout =
        existingItem.selectedForCheckout || guestItem.selectedForCheckout;
      return;
    }

    userCart.items.push(guestItem.toObject());
  });

  await userCart.save();
  await Cart.deleteOne({ _id: guestCart._id });
  clearCartCookie(res);
}

async function loadCurrentUserDocument(userId, options = {}) {
  const query = User.findById(userId);

  if (options.includePasswordHash) {
    query.select("+passwordHash");
  }

  const user = await query;

  if (!user) {
    throw new AppError("Authenticated user could not be found.", 404, {
      code: "USER_NOT_FOUND",
    });
  }

  return user;
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

  await mergeGuestCartIntoUser(req, res, user._id);
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

  await mergeGuestCartIntoUser(req, res, user._id);
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

async function getCurrentUser(req, res) {
  const user = await loadCurrentUserDocument(req.user.id);

  sendSuccess(res, {
    message: "Authenticated user loaded.",
    data: {
      user: buildAuthUser(user),
    },
  });
}

async function updateCurrentUser(req, res) {
  const user = await loadCurrentUserDocument(req.user.id);

  if (req.body.email !== undefined) {
    const normalizedEmail = req.body.email.trim().toLowerCase();

    if (normalizedEmail !== user.email) {
      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      }).lean();

      if (existingUser) {
        throw new AppError("An account with that email already exists.", 409, {
          code: "EMAIL_ALREADY_IN_USE",
        });
      }
    }

    user.email = normalizedEmail;
  }

  if (req.body.fullName !== undefined) {
    const { firstName, lastName } = splitFullName(req.body.fullName);
    user.firstName = firstName;
    user.lastName = lastName;
  }

  if (req.body.phone !== undefined) {
    user.phone = String(req.body.phone || "").trim();
  }

  if (req.body.avatarUrl !== undefined) {
    user.avatarUrl = String(req.body.avatarUrl || "").trim();
  }

  if (req.body.defaultShippingAddress !== undefined) {
    if (req.body.defaultShippingAddress === null) {
      user.defaultShippingAddress = {
        label: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      };
    } else {
      user.defaultShippingAddress = {
        label: String(req.body.defaultShippingAddress.label || "").trim(),
        firstName: req.body.defaultShippingAddress.firstName.trim(),
        lastName: req.body.defaultShippingAddress.lastName.trim(),
        addressLine1: req.body.defaultShippingAddress.addressLine1.trim(),
        addressLine2: String(req.body.defaultShippingAddress.addressLine2 || "").trim(),
        city: req.body.defaultShippingAddress.city.trim(),
        state: req.body.defaultShippingAddress.state.trim(),
        postalCode: req.body.defaultShippingAddress.postalCode.trim(),
        country: req.body.defaultShippingAddress.country.trim(),
        isDefault: true,
      };
    }
  }

  if (req.body.shippingAddresses !== undefined) {
    const incomingAddresses = Array.isArray(req.body.shippingAddresses)
      ? req.body.shippingAddresses
      : [];

    const normalizedAddresses = incomingAddresses.map((address, index) => ({
      _id: address.id || undefined,
      label: String(address.label || `Address ${index + 1}`).trim(),
      firstName: address.firstName.trim(),
      lastName: address.lastName.trim(),
      addressLine1: address.addressLine1.trim(),
      addressLine2: String(address.addressLine2 || "").trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      postalCode: address.postalCode.trim(),
      country: address.country.trim(),
      isDefault: Boolean(address.isDefault),
    }));

    if (normalizedAddresses.length) {
      const defaultIndex = normalizedAddresses.findIndex((address) => address.isDefault);
      const resolvedDefaultIndex = defaultIndex >= 0 ? defaultIndex : 0;

      normalizedAddresses.forEach((address, index) => {
        address.isDefault = index === resolvedDefaultIndex;
      });

      user.defaultShippingAddress = {
        label: normalizedAddresses[resolvedDefaultIndex].label,
        firstName: normalizedAddresses[resolvedDefaultIndex].firstName,
        lastName: normalizedAddresses[resolvedDefaultIndex].lastName,
        addressLine1: normalizedAddresses[resolvedDefaultIndex].addressLine1,
        addressLine2: normalizedAddresses[resolvedDefaultIndex].addressLine2,
        city: normalizedAddresses[resolvedDefaultIndex].city,
        state: normalizedAddresses[resolvedDefaultIndex].state,
        postalCode: normalizedAddresses[resolvedDefaultIndex].postalCode,
        country: normalizedAddresses[resolvedDefaultIndex].country,
        isDefault: true,
      };
    } else {
      user.defaultShippingAddress = {
        label: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      };
    }

    user.shippingAddresses = normalizedAddresses;
  }

  await user.save();
  issueAuthSession(res, user);

  sendSuccess(res, {
    message: "Profile updated successfully.",
    data: {
      user: buildAuthUser(user),
    },
  });
}

async function updateCurrentUserPassword(req, res) {
  const user = await loadCurrentUserDocument(req.user.id, {
    includePasswordHash: true,
  });

  const passwordMatches = await verifyPassword(
    req.body.currentPassword,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new AppError("Current password is incorrect.", 401, {
      code: "INVALID_CURRENT_PASSWORD",
    });
  }

  user.passwordHash = await hashPassword(req.body.newPassword);
  await user.save();
  issueAuthSession(res, user);

  sendSuccess(res, {
    message: "Password updated successfully.",
    data: {
      user: buildAuthUser(user),
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
  updateCurrentUser,
  updateCurrentUserPassword,
  issueDevelopmentToken,
};
