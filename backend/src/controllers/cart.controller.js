const mongoose = require("mongoose");
const { Product } = require("../models");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const {
  clearCartCookie,
  isPersistableUser,
  loadCartForRequest,
} = require("../utils/cart-session");

function buildEmptyCart({ isGuest }) {
  return {
    id: null,
    isGuest,
    currency: "USD",
    itemCount: 0,
    items: [],
    summary: {
      subtotal: 0,
      itemCount: 0,
    },
  };
}

function findMatchingSize(product, sizeLabel) {
  if (!Array.isArray(product.sizes) || product.sizes.length === 0) {
    return null;
  }

  if (sizeLabel) {
    return product.sizes.find((size) => size.label === sizeLabel) || null;
  }

  return product.sizes.find((size) => size.stock > 0) || product.sizes[0] || null;
}

function findMatchingColor(product, colorName) {
  if (!Array.isArray(product.colors) || product.colors.length === 0) {
    return null;
  }

  if (colorName) {
    return (
      product.colors.find(
        (color) => color.name.toLowerCase() === String(colorName).toLowerCase()
      ) || null
    );
  }

  return product.colors[0] || null;
}

function ensureProductIsCartReady(product, size) {
  if (!product || product.isArchived) {
    throw new AppError("Product not found.", 404, {
      code: "PRODUCT_NOT_FOUND",
    });
  }

  if (!size) {
    throw new AppError("Selected size is not available for this product.", 400, {
      code: "SIZE_NOT_AVAILABLE",
    });
  }

  if (product.stockStatus === "out-of-stock" || size.stock <= 0) {
    throw new AppError("This product is currently out of stock.", 409, {
      code: "OUT_OF_STOCK",
    });
  }

  if (product.stockStatus === "preorder") {
    throw new AppError("Preorder items are not supported in cart yet.", 409, {
      code: "PREORDER_NOT_SUPPORTED",
    });
  }
}

function upsertCartItem(cart, product, size, color, quantity) {
  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === product._id.toString() &&
      item.sizeLabel === size.label &&
      item.colorName.toLowerCase() === color.name.toLowerCase()
  );

  const nextQuantity = (existingItem?.quantity || 0) + quantity;

  if (nextQuantity > size.stock) {
    throw new AppError(
      `Only ${size.stock} unit${size.stock === 1 ? "" : "s"} available for size ${size.label}.`,
      409,
      {
        code: "CART_STOCK_LIMIT",
      }
    );
  }

  const snapshot = {
    quantity: nextQuantity,
    selectedForCheckout: true,
    sizeLabel: size.label,
    sizeSku: size.sku,
    colorName: color.name,
    colorHex: color.hex,
    unitPrice: product.price,
    compareAtPrice: product.compareAtPrice || null,
    productName: product.name,
    productSlug: product.slug,
    brand: product.brand,
    heroImage: color.image || product.heroImage || product.images[0] || "",
  };

  if (existingItem) {
    Object.assign(existingItem, snapshot);
    return;
  }

  cart.items.push({
    productId: product._id,
    ...snapshot,
  });
}

function syncCartItemSnapshot(item, product) {
  const liveSize =
    product?.sizes?.find((size) => size.label === item.sizeLabel) || null;
  const liveColor =
    product?.colors?.find(
      (color) => color.name.toLowerCase() === item.colorName.toLowerCase()
    ) || null;
  const unitPrice = product?.price ?? item.unitPrice;
  const compareAtPrice =
    product?.compareAtPrice === undefined
      ? item.compareAtPrice
      : product.compareAtPrice || null;

  return {
    availableQuantity: liveSize?.stock ?? 0,
    colorHex: liveColor?.hex || item.colorHex,
    compareAtPrice,
    heroImage:
      liveColor?.image ||
      product?.heroImage ||
      product?.images?.[0] ||
      item.heroImage,
    isAvailable:
      Boolean(product) &&
      !product.isArchived &&
      product.stockStatus !== "out-of-stock" &&
      (liveSize?.stock || 0) > 0,
    lineTotal: unitPrice * item.quantity,
    unitPrice,
  };
}

async function serializeCart(cart, owner) {
  if (!cart) {
    return buildEmptyCart({
      isGuest: owner?.isGuest ?? !isPersistableUser(owner),
    });
  }

  await cart.populate([
    {
      path: "items.productId",
      populate: {
        path: "categoryId",
        select: "name slug",
      },
    },
  ]);

  const items = cart.items.map((item) => {
    const product = item.productId;
    const snapshot = syncCartItemSnapshot(item, product);
    const lineTotal = snapshot.lineTotal;

    return {
      id: item._id.toString(),
      quantity: item.quantity,
      selectedForCheckout: item.selectedForCheckout !== false,
      sizeLabel: item.sizeLabel,
      sizeSku: item.sizeSku,
      colorName: item.colorName,
      colorHex: snapshot.colorHex,
      unitPrice: snapshot.unitPrice,
      compareAtPrice: snapshot.compareAtPrice,
      lineTotal,
      availableQuantity: snapshot.availableQuantity,
      isAvailable: snapshot.isAvailable,
      product: {
        id: product?._id?.toString() || item.productId.toString(),
        name: product?.name || item.productName,
        slug: product?.slug || item.productSlug,
        brand: product?.brand || item.brand,
        heroImage: snapshot.heroImage,
        stockStatus: product?.stockStatus || "out-of-stock",
        category: product?.categoryId
          ? {
              name: product.categoryId.name,
              slug: product.categoryId.slug,
            }
          : null,
      },
    };
  });

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  return {
    id: cart._id.toString(),
    isGuest: owner?.isGuest ?? false,
    currency: cart.currency,
    itemCount,
    items,
    summary: {
      subtotal,
      itemCount,
    },
  };
}

async function getProductForCart(productId) {
  const product = await Product.findById(productId).populate("categoryId", "name slug");

  if (!product || product.isArchived) {
    throw new AppError("Product not found.", 404, {
      code: "PRODUCT_NOT_FOUND",
    });
  }

  return product;
}

async function getCart(req, res) {
  const { owner, cart } = await loadCartForRequest(req, res);
  const payload = await serializeCart(cart, owner);

  sendSuccess(res, {
    message: "Cart fetched successfully.",
    data: {
      cart: payload,
    },
  });
}

async function addCartItem(req, res) {
  const { owner, cart } = await loadCartForRequest(req, res, {
    createIfMissing: true,
  });
  const targetCart = cart;
  const product = await getProductForCart(req.body.productId);
  const size = findMatchingSize(product, req.body.sizeLabel);
  const color = findMatchingColor(product, req.body.colorName);
  const quantity = Number.parseInt(req.body.quantity, 10) || 1;

  ensureProductIsCartReady(product, size);

  if (!color) {
    throw new AppError("Selected color is not available for this product.", 400, {
      code: "COLOR_NOT_AVAILABLE",
    });
  }

  upsertCartItem(targetCart, product, size, color, quantity);
  await targetCart.save();

  const payload = await serializeCart(targetCart, owner);

  sendSuccess(res, {
    statusCode: 201,
    message: "Item added to cart.",
    data: {
      cart: payload,
    },
  });
}

async function updateCartItem(req, res) {
  if (!mongoose.isValidObjectId(req.params.itemId)) {
    throw new AppError("Cart item not found.", 404, {
      code: "CART_ITEM_NOT_FOUND",
    });
  }

  const { owner, cart } = await loadCartForRequest(req, res);

  if (!cart) {
    throw new AppError("Cart not found.", 404, {
      code: "CART_NOT_FOUND",
    });
  }

  const item = cart.items.id(req.params.itemId);

  if (!item) {
    throw new AppError("Cart item not found.", 404, {
      code: "CART_ITEM_NOT_FOUND",
    });
  }

  const quantity = Number.parseInt(req.body.quantity, 10);
  const wantsQuantityChange = quantity !== undefined && !Number.isNaN(quantity);
  const wantsSelectionOn = req.body.selectedForCheckout === true;
  const needsAvailabilityCheck = wantsQuantityChange || wantsSelectionOn;
  const product = await getProductForCart(item.productId);
  const size = findMatchingSize(product, item.sizeLabel);

  if (needsAvailabilityCheck) {
    ensureProductIsCartReady(product, size);
  }

  if (req.body.selectedForCheckout !== undefined) {
    item.selectedForCheckout = req.body.selectedForCheckout;
  }

  if (wantsQuantityChange && quantity > size.stock) {
    throw new AppError(
      `Only ${size.stock} unit${size.stock === 1 ? "" : "s"} available for size ${size.label}.`,
      409,
      {
        code: "CART_STOCK_LIMIT",
      }
    );
  }

  if (wantsQuantityChange) {
    item.quantity = quantity;
  }
  item.unitPrice = product.price;
  item.compareAtPrice = product.compareAtPrice || null;
  item.heroImage = product.heroImage || product.images[0] || item.heroImage;
  await cart.save();

  const payload = await serializeCart(cart, owner);

  sendSuccess(res, {
    message: "Cart item updated.",
    data: {
      cart: payload,
    },
  });
}

async function removeCartItem(req, res) {
  if (!mongoose.isValidObjectId(req.params.itemId)) {
    throw new AppError("Cart item not found.", 404, {
      code: "CART_ITEM_NOT_FOUND",
    });
  }

  const { owner, cart } = await loadCartForRequest(req, res);

  if (!cart) {
    throw new AppError("Cart not found.", 404, {
      code: "CART_NOT_FOUND",
    });
  }

  const item = cart.items.id(req.params.itemId);

  if (!item) {
    throw new AppError("Cart item not found.", 404, {
      code: "CART_ITEM_NOT_FOUND",
    });
  }

  item.deleteOne();

  if (cart.items.length === 0 && owner?.isGuest) {
    await cart.deleteOne();
    clearCartCookie(res);
    sendSuccess(res, {
      message: "Cart item removed.",
      data: {
        cart: buildEmptyCart({ isGuest: true }),
      },
    });
    return;
  }

  await cart.save();

  const payload = await serializeCart(cart, owner);

  sendSuccess(res, {
    message: "Cart item removed.",
    data: {
      cart: payload,
    },
  });
}

async function clearCart(req, res) {
  const { owner, cart } = await loadCartForRequest(req, res);

  if (!cart) {
    sendSuccess(res, {
      message: "Cart cleared.",
      data: {
        cart: buildEmptyCart({ isGuest: owner?.isGuest ?? true }),
      },
    });
    return;
  }

  if (owner?.isGuest) {
    await cart.deleteOne();
    clearCartCookie(res);
  } else {
    cart.items = [];
    await cart.save();
  }

  sendSuccess(res, {
    message: "Cart cleared.",
    data: {
      cart: buildEmptyCart({ isGuest: owner?.isGuest ?? false }),
    },
  });
}

module.exports = {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
};
