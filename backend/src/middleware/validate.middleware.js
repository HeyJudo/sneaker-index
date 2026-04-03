const { AppError } = require("../utils/app-error");

function validateBody(validator) {
  return function bodyValidator(req, _res, next) {
    const errors = validator(req.body || {});

    if (!errors.length) {
      next();
      return;
    }

    next(
      new AppError("Validation failed.", 400, {
        code: "VALIDATION_ERROR",
        details: errors,
      })
    );
  };
}

module.exports = {
  validateBody,
};
