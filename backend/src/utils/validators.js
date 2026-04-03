function isValidRole(value) {
  return ["customer", "admin"].includes(value);
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
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

module.exports = {
  validateLoginRequest,
  validateSignupRequest,
  validateDevelopmentTokenRequest,
};
