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

function isValidAvatarValue(value) {
  if (!isString(value)) {
    return false;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  return (
    /^https?:\/\/.+/i.test(trimmed) ||
    /^data:image\/[a-z0-9.+-]+;base64,/i.test(trimmed)
  );
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

function validateShippingAddressesPayload(value, fieldPrefix = "shippingAddresses") {
  const errors = [];

  if (value === undefined) {
    return errors;
  }

  if (!Array.isArray(value)) {
    errors.push({
      field: fieldPrefix,
      message: `${fieldPrefix} must be an array.`,
    });
    return errors;
  }

  value.forEach((address, index) => {
    if (typeof address !== "object" || address === null || Array.isArray(address)) {
      errors.push({
        field: `${fieldPrefix}.${index}`,
        message: "Each shipping address must be an object.",
      });
      return;
    }

    if (address.label !== undefined && !isNonEmptyString(address.label)) {
      errors.push({
        field: `${fieldPrefix}.${index}.label`,
        message: "label must be a non-empty string when provided.",
      });
    }

    errors.push(...validateShippingAddressPayload(address, `${fieldPrefix}.${index}`));
  });

  return errors;
}

function validateUpdateProfileRequest(body) {
  const errors = [];
  const hasProfileFields =
    body.fullName !== undefined ||
    body.email !== undefined ||
    body.phone !== undefined ||
    body.avatarUrl !== undefined ||
    body.defaultShippingAddress !== undefined ||
    body.shippingAddresses !== undefined;

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

  if (body.avatarUrl !== undefined && !isValidAvatarValue(body.avatarUrl)) {
    errors.push({
      field: "avatarUrl",
      message: "avatarUrl must be a valid image URL or base64 image string.",
    });
  }

  errors.push(...validateShippingAddressPayload(body.defaultShippingAddress));
  errors.push(...validateShippingAddressesPayload(body.shippingAddresses));

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

function isValidStockStatus(value) {
  return ["in-stock", "low-stock", "out-of-stock", "preorder"].includes(value);
}

function validateAdminProductUpsertRequest(body) {
  const errors = [];

  if (!isNonEmptyString(body.name)) {
    errors.push({
      field: "name",
      message: "name is required.",
    });
  }

  if (!isNonEmptyString(body.brand)) {
    errors.push({
      field: "brand",
      message: "brand is required.",
    });
  }

  if (!isNonEmptyString(body.description)) {
    errors.push({
      field: "description",
      message: "description is required.",
    });
  }

  if (body.categoryId === undefined && !isNonEmptyString(body.categorySlug)) {
    errors.push({
      field: "categoryId",
      message: "Provide categoryId or categorySlug.",
    });
  }

  if (!Number.isFinite(Number(body.price)) || Number(body.price) < 0) {
    errors.push({
      field: "price",
      message: "price must be a non-negative number.",
    });
  }

  if (
    body.compareAtPrice !== undefined &&
    body.compareAtPrice !== null &&
    body.compareAtPrice !== "" &&
    (!Number.isFinite(Number(body.compareAtPrice)) || Number(body.compareAtPrice) < 0)
  ) {
    errors.push({
      field: "compareAtPrice",
      message: "compareAtPrice must be a non-negative number.",
    });
  }

  if (!isValidStockStatus(body.stockStatus)) {
    errors.push({
      field: "stockStatus",
      message: "stockStatus is invalid.",
    });
  }

  if (!Array.isArray(body.images) || body.images.length === 0) {
    errors.push({
      field: "images",
      message: "At least one image is required.",
    });
  } else {
    body.images.forEach((image, index) => {
      if (!isNonEmptyString(image)) {
        errors.push({
          field: `images.${index}`,
          message: "Image URL must be a non-empty string.",
        });
      }
    });
  }

  if (!Array.isArray(body.colors) || body.colors.length === 0) {
    errors.push({
      field: "colors",
      message: "At least one color is required.",
    });
  } else {
    body.colors.forEach((color, index) => {
      if (!color || typeof color !== "object") {
        errors.push({
          field: `colors.${index}`,
          message: "Color must be an object.",
        });
        return;
      }

      if (!isNonEmptyString(color.name)) {
        errors.push({
          field: `colors.${index}.name`,
          message: "Color name is required.",
        });
      }

      if (!isNonEmptyString(color.hex)) {
        errors.push({
          field: `colors.${index}.hex`,
          message: "Color hex is required.",
        });
      }
    });
  }

  if (!Array.isArray(body.sizes) || body.sizes.length === 0) {
    errors.push({
      field: "sizes",
      message: "At least one size is required.",
    });
  } else {
    body.sizes.forEach((size, index) => {
      if (!size || typeof size !== "object") {
        errors.push({
          field: `sizes.${index}`,
          message: "Size must be an object.",
        });
        return;
      }

      if (!isNonEmptyString(size.label)) {
        errors.push({
          field: `sizes.${index}.label`,
          message: "Size label is required.",
        });
      }

      if (!isNonEmptyString(size.sku)) {
        errors.push({
          field: `sizes.${index}.sku`,
          message: "Size sku is required.",
        });
      }

      if (!Number.isFinite(Number(size.stock)) || Number(size.stock) < 0) {
        errors.push({
          field: `sizes.${index}.stock`,
          message: "Size stock must be a non-negative number.",
        });
      }
    });
  }

  if (body.isFeatured !== undefined && !isBoolean(body.isFeatured)) {
    errors.push({
      field: "isFeatured",
      message: "isFeatured must be a boolean.",
    });
  }

  if (body.isArchived !== undefined && !isBoolean(body.isArchived)) {
    errors.push({
      field: "isArchived",
      message: "isArchived must be a boolean.",
    });
  }

  if (
    body.rating !== undefined &&
    (!Number.isFinite(Number(body.rating)) || Number(body.rating) < 0 || Number(body.rating) > 5)
  ) {
    errors.push({
      field: "rating",
      message: "rating must be between 0 and 5.",
    });
  }

  if (
    body.reviewCount !== undefined &&
    (!Number.isInteger(Number(body.reviewCount)) || Number(body.reviewCount) < 0)
  ) {
    errors.push({
      field: "reviewCount",
      message: "reviewCount must be a non-negative whole number.",
    });
  }

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
  validateAdminProductUpsertRequest,
};
