const crypto = require("crypto");
const mongoose = require("mongoose");
const { Cart } = require("../models");
const { CART_COOKIE_NAME } = require("../config/constants");
const { clearCartCookie, setCartCookie } = require("./cart-cookie");

function isPersistableUser(user) {
  return Boolean(user?.id && mongoose.isValidObjectId(user.id));
}

function readGuestCartId(req) {
  return (
    req.signedCookies?.[CART_COOKIE_NAME] ||
    req.cookies?.[CART_COOKIE_NAME] ||
    ""
  );
}

function buildCartLookup(owner) {
  if (owner.userId) {
    return { userId: owner.userId };
  }

  return { guestCartId: owner.guestCartId };
}

async function resolveCartOwner(req, res, { createGuestIfMissing = false } = {}) {
  if (isPersistableUser(req.user)) {
    return {
      isGuest: false,
      userId: req.user.id,
    };
  }

  let guestCartId = readGuestCartId(req);

  if (!guestCartId && createGuestIfMissing) {
    guestCartId = crypto.randomUUID();
    setCartCookie(res, guestCartId);
  }

  if (!guestCartId) {
    return null;
  }

  return {
    isGuest: true,
    guestCartId,
  };
}

async function loadCartForRequest(req, res, { createIfMissing = false } = {}) {
  const owner = await resolveCartOwner(req, res, {
    createGuestIfMissing: createIfMissing,
  });

  if (!owner) {
    return {
      owner: null,
      cart: null,
    };
  }

  let cart = await Cart.findOne(buildCartLookup(owner));

  if (!cart && createIfMissing) {
    cart = await Cart.create({
      ...buildCartLookup(owner),
      items: [],
    });
  }

  return {
    owner,
    cart,
  };
}

module.exports = {
  buildCartLookup,
  clearCartCookie,
  isPersistableUser,
  loadCartForRequest,
  readGuestCartId,
  resolveCartOwner,
};
