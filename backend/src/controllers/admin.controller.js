const { sendSuccess } = require("../utils/api-response");

function getAdminPing(req, res) {
  sendSuccess(res, {
    message: "Admin guard is working.",
    data: {
      user: req.user,
    },
  });
}

module.exports = {
  getAdminPing,
};
