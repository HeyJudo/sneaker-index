const { CART_COOKIE_NAME } = require("../config/constants");
const { env } = require("../config/env");

function getCartCookieOptions() {
  return {
    httpOnly: true,
    signed: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

function getCartCookieClearOptions() {
  return {
    httpOnly: true,
    signed: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
  };
}

function setCartCookie(res, cartId) {
  res.cookie(CART_COOKIE_NAME, cartId, getCartCookieOptions());
}

function clearCartCookie(res) {
  res.clearCookie(CART_COOKIE_NAME, getCartCookieClearOptions());
}

module.exports = {
  setCartCookie,
  clearCartCookie,
};
