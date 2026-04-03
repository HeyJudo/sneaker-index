function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "Internal server error" : err.message || "Request failed";

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "REQUEST_FAILED",
      message,
      details: err.details || undefined,
    },
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
