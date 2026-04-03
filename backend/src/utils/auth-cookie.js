const { AUTH_COOKIE_NAME } = require("../config/constants");
const { env } = require("../config/env");

function getAuthCookieOptions() {
  return {
    httpOnly: true,
    signed: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

function getAuthCookieClearOptions() {
  return {
    httpOnly: true,
    signed: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
  };
}

function setAuthCookie(res, token) {
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
}

function clearAuthCookie(res) {
  res.clearCookie(AUTH_COOKIE_NAME, getAuthCookieClearOptions());
}

module.exports = {
  setAuthCookie,
  clearAuthCookie,
};
