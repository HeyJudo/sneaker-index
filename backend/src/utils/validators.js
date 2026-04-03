function isValidRole(value) {
  return ["customer", "admin"].includes(value);
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
  validateDevelopmentTokenRequest,
};
