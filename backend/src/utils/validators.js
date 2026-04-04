const mongoose = require("mongoose");

function isValidRole(value) {
  return ["customer", "admin"].includes(value);
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isString(value) {
  return typeof value === "string";
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function validateSignupRequest(body) {
  const errors = [];
  const hasSeparateNames =
    isNonEmptyString(body.firstName) && isNonEmptyString(body.lastName);
  const hasFullName = isNonEmptyString(body.fullName);

  if (!hasSeparateNames && !hasFullName) {
    errors.push({
      field: "fullName",
      message:
        "Provide either fullName or both firstName and lastName.",
    });
  }

  if (body.email === undefined || !isValidEmail(body.email)) {
    errors.push({
      field: "email",
      message: "Email must be a valid email address.",
    });
  }

  if (typeof body.password !== "string" || body.password.length < 8) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters long.",
    });
  }

  if (
    body.confirmPassword !== undefined &&
    body.confirmPassword !== body.password
  ) {
    errors.push({
      field: "confirmPassword",
      message: "Password confirmation does not match.",
    });
  }

  return errors;
}

function validateLoginRequest(body) {
  const errors = [];

  if (body.email === undefined || !isValidEmail(body.email)) {
    errors.push({
      field: "email",
      message: "Email must be a valid email address.",
    });
  }

  if (!isNonEmptyString(body.password)) {
    errors.push({
      field: "password",
      message: "Password is required.",
    });
  }

  return errors;
}

function validateDevelopmentTokenRequest(body) {
  const errors = [];

  if (body.role !== undefined && !isValidRole(body.role)) {
    errors.push({
      field: "role",
      message: "Role must be either 'customer' or 'admin'.",
    });
  }

  if (body.email !== undefined && !isValidEmail(body.email)) {
    errors.push({
      field: "email",
      message: "Email must be a valid email address.",
    });
  }

  return errors;
}

function validateShippingAddressPayload(value, fieldPrefix = "defaultShippingAddress") {
  const errors = [];

  if (value === undefined) {
    return errors;
  }

  if (value === null) {
    return errors;
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    errors.push({
      field: fieldPrefix,
      message: `${fieldPrefix} must be an object.`,
    });
    return errors;
  }

  [
    "firstName",
    "lastName",
    "addressLine1",
    "city",
    "state",
    "postalCode",
    "country",
  ].forEach((field) => {
    if (!isNonEmptyString(value[field])) {
      errors.push({
        field: `${fieldPrefix}.${field}`,
        message: `${field} is required.`,
      });
    }
  });

  if (
    value.addressLine2 !== undefined &&
    value.addressLine2 !== null &&
    !isString(value.addressLine2)
  ) {
    errors.push({
      field: `${fieldPrefix}.addressLine2`,
      message: "addressLine2 must be a string.",
    });
  }

  return errors;
}

function validateUpdateProfileRequest(body) {
  const errors = [];
  const hasProfileFields =
    body.fullName !== undefined ||
    body.email !== undefined ||
    body.phone !== undefined ||
    body.defaultShippingAddress !== undefined;

  if (!hasProfileFields) {
    errors.push({
      field: "fullName",
      message: "Provide at least one profile field to update.",
    });
    return errors;
  }

  if (body.fullName !== undefined && !isNonEmptyString(body.fullName)) {
    errors.push({
      field: "fullName",
      message: "fullName must be a non-empty string.",
    });
  }

  if (body.email !== undefined && !isValidEmail(body.email)) {
    errors.push({
      field: "email",
      message: "Email must be a valid email address.",
    });
  }

  if (
    body.phone !== undefined &&
    body.phone !== null &&
    !isString(body.phone)
  ) {
    errors.push({
      field: "phone",
      message: "phone must be a string.",
    });
  }

  errors.push(...validateShippingAddressPayload(body.defaultShippingAddress));

  return errors;
}

function validateUpdatePasswordRequest(body) {
  const errors = [];

  if (!isNonEmptyString(body.currentPassword)) {
    errors.push({
      field: "currentPassword",
      message: "Current password is required.",
    });
  }

  if (typeof body.newPassword !== "string" || body.newPassword.length < 8) {
    errors.push({
      field: "newPassword",
      message: "New password must be at least 8 characters long.",
    });
  }

  if (body.confirmNewPassword !== body.newPassword) {
    errors.push({
      field: "confirmNewPassword",
      message: "Password confirmation does not match.",
    });
  }

  return errors;
}

function validateAddCartItemRequest(body) {
  const errors = [];

  if (!mongoose.isValidObjectId(body.productId)) {
    errors.push({
      field: "productId",
      message: "productId must be a valid product identifier.",
    });
  }

  if (
    body.quantity !== undefined &&
    !isPositiveInteger(Number(body.quantity))
  ) {
    errors.push({
      field: "quantity",
      message: "Quantity must be a positive whole number.",
    });
  }

  if (body.sizeLabel !== undefined && !isNonEmptyString(body.sizeLabel)) {
    errors.push({
      field: "sizeLabel",
      message: "sizeLabel must be a non-empty string.",
    });
  }

  if (body.colorName !== undefined && !isNonEmptyString(body.colorName)) {
    errors.push({
      field: "colorName",
      message: "colorName must be a non-empty string.",
    });
  }

  return errors;
}

function validateUpdateCartItemRequest(body) {
  const errors = [];

  const hasQuantity = body.quantity !== undefined;
  const hasSelection = body.selectedForCheckout !== undefined;

  if (!hasQuantity && !hasSelection) {
    errors.push({
      field: "quantity",
      message: "Provide quantity and/or selectedForCheckout.",
    });
  }

  if (hasQuantity && !isPositiveInteger(Number(body.quantity))) {
    errors.push({
      field: "quantity",
      message: "Quantity must be a positive whole number.",
    });
  }

  if (hasSelection && !isBoolean(body.selectedForCheckout)) {
    errors.push({
      field: "selectedForCheckout",
      message: "selectedForCheckout must be a boolean value.",
    });
  }

  return errors;
}

function validateCreateOrderRequest(body) {
  const errors = [];
  const address = body.shippingAddress || {};

  if (!isValidEmail(body.email)) {
    errors.push({
      field: "email",
      message: "Email must be a valid email address.",
    });
  }

  if (!["standard", "express", "overnight"].includes(body.shippingMethod)) {
    errors.push({
      field: "shippingMethod",
      message: "Shipping method is invalid.",
    });
  }

  if (!["card", "paypal", "bank_transfer"].includes(body.paymentMethod)) {
    errors.push({
      field: "paymentMethod",
      message: "Payment method is invalid.",
    });
  }

  [
    "firstName",
    "lastName",
    "addressLine1",
    "city",
    "state",
    "postalCode",
    "country",
  ].forEach((field) => {
    if (!isNonEmptyString(address[field])) {
      errors.push({
        field: `shippingAddress.${field}`,
        message: `${field} is required.`,
      });
    }
  });

  return errors;
}

module.exports = {
  validateAddCartItemRequest,
  validateCreateOrderRequest,
  validateUpdateCartItemRequest,
  validateLoginRequest,
  validateSignupRequest,
  validateDevelopmentTokenRequest,
  validateUpdateProfileRequest,
  validateUpdatePasswordRequest,
};
