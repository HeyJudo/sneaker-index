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
};
