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

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
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

  if (!isPositiveInteger(Number(body.quantity))) {
    errors.push({
      field: "quantity",
      message: "Quantity must be a positive whole number.",
    });
  }

  return errors;
}

module.exports = {
  validateAddCartItemRequest,
  validateUpdateCartItemRequest,
  validateLoginRequest,
  validateSignupRequest,
  validateDevelopmentTokenRequest,
};
