const mongoose = require("mongoose");
const { Cart, Order, Product } = require("../models");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { clearCartCookie, loadCartForRequest } = require("../utils/cart-session");
const { logActivity } = require("../utils/activity-log");

const SHIPPING_METHODS = {
  standard: {
    label: "Standard Shipping",
    price: 0,
  },
  express: {
    label: "Express Delivery",
    price: 25,
  },
  overnight: {
    label: "Overnight Priority",
    price: 45,
  },
};

const TAX_RATE = 0.08;
const ORDER_STATUSES = ["processing", "shipped", "delivered", "cancelled", "confirmed"];

function createOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SI-${timestamp}-${random}`;
}

function getStockStatusFromSizes(sizes) {
  const total = sizes.reduce((sum, size) => sum + size.stock, 0);

  if (total <= 0) {
    return "out-of-stock";
  }

  if (total <= 3) {
    return "low-stock";
  }

  return "in-stock";
}

function serializeOrder(order) {
  return {
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    email: order.email,
    shippingMethod: order.shippingMethod,
    paymentMethod: order.paymentMethod,
    pricing: order.pricing,
    items: order.items,
    createdAt: order.createdAt,
  };
}

function normalizeOrderStatus(status) {
  if (status === "confirmed") {
    return "processing";
  }

  return status;
}

function getStatusTimeline(order) {
  const placedAt = new Date(order.createdAt);
  const shippedAt = new Date(placedAt.getTime() + 2 * 24 * 60 * 60 * 1000);
  const deliveredAt = new Date(placedAt.getTime() + 5 * 24 * 60 * 60 * 1000);
  const normalizedStatus = normalizeOrderStatus(order.status);

  return [
    {
      key: "processing",
      label: "Processing",
      timestamp: placedAt,
      completed: true,
      active: normalizedStatus === "processing",
    },
    {
      key: "shipped",
      label: "Shipped",
      timestamp: shippedAt,
      completed: normalizedStatus === "shipped" || normalizedStatus === "delivered",
      active: normalizedStatus === "shipped",
    },
    {
      key: "delivered",
      label: "Delivered",
      timestamp: deliveredAt,
      completed: normalizedStatus === "delivered",
      active: normalizedStatus === "delivered",
    },
  ];
}

function serializeOrderListItem(order) {
  const normalizedStatus = normalizeOrderStatus(order.status);

  return {
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    status: normalizedStatus,
    paymentStatus: order.paymentStatus,
    shippingMethod: order.shippingMethod,
    paymentMethod: order.paymentMethod,
    pricing: order.pricing,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    items: order.items,
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    timeline: getStatusTimeline(order).map((entry) => ({
      ...entry,
      timestamp: entry.timestamp.toISOString(),
    })),
  };
}

async function createOrder(req, res) {
  if (!req.user?.id || !mongoose.isValidObjectId(req.user.id)) {
    throw new AppError("Sign in to place an order.", 401, {
      code: "AUTH_REQUIRED",
    });
  }

  const { owner, cart } = await loadCartForRequest(req, res);

  if (!cart || !cart.items.length) {
    throw new AppError("Cart is empty.", 400, {
      code: "CART_EMPTY",
    });
  }

  const selectedItems = cart.items.filter((item) => item.selectedForCheckout !== false);

  if (!selectedItems.length) {
    throw new AppError("Select at least one cart item to continue to checkout.", 400, {
      code: "NO_ITEMS_SELECTED",
    });
  }

  const shippingMethod = SHIPPING_METHODS[req.body.shippingMethod];

  if (!shippingMethod) {
    throw new AppError("Selected shipping method is invalid.", 400, {
      code: "INVALID_SHIPPING_METHOD",
    });
  }

  const productIds = selectedItems.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((product) => [product._id.toString(), product]));

  const orderItems = selectedItems.map((item) => {
    const product = productMap.get(item.productId.toString());

    if (!product || product.isArchived) {
      throw new AppError(`${item.productName} is no longer available.`, 409, {
        code: "CHECKOUT_PRODUCT_UNAVAILABLE",
      });
    }

    const size = product.sizes.find((entry) => entry.label === item.sizeLabel);

    if (!size || size.stock < item.quantity) {
      throw new AppError(
        `${item.productName} no longer has enough stock in size ${item.sizeLabel}.`,
        409,
        {
          code: "CHECKOUT_STOCK_CONFLICT",
        }
      );
    }

    return {
      item,
      product,
      size,
      snapshot: {
        productId: product._id,
        productName: product.name,
        productSlug: product.slug,
        brand: product.brand,
        heroImage: item.heroImage || product.heroImage || product.images[0] || "",
        quantity: item.quantity,
        sizeLabel: item.sizeLabel,
        sizeSku: size.sku,
        colorName: item.colorName,
        colorHex: item.colorHex,
        unitPrice: product.price,
        lineTotal: product.price * item.quantity,
      },
    };
  });

  const subtotal = orderItems.reduce((sum, entry) => sum + entry.snapshot.lineTotal, 0);
  const shipping = shippingMethod.price;
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const discount = 0;
  const total = Number((subtotal + shipping + tax - discount).toFixed(2));

  const session = await mongoose.startSession();
  let createdOrder;

  try {
    await session.withTransaction(async () => {
      createdOrder = await Order.create(
        [
          {
            orderNumber: createOrderNumber(),
            userId: owner?.isGuest ? null : owner?.userId || null,
            email: req.body.email.trim().toLowerCase(),
            status: "processing",
            shippingMethod: req.body.shippingMethod,
            paymentMethod: req.body.paymentMethod,
            shippingAddress: req.body.shippingAddress,
            items: orderItems.map((entry) => entry.snapshot),
            pricing: {
              subtotal,
              shipping,
              tax,
              discount,
              total,
            },
          },
        ],
        { session }
      ).then((orders) => orders[0]);

      for (const entry of orderItems) {
        entry.size.stock -= entry.item.quantity;
        entry.product.stockStatus = getStockStatusFromSizes(entry.product.sizes);
        await entry.product.save({ session });
      }

      cart.items = cart.items.filter((item) => item.selectedForCheckout === false);

      if (cart.items.length === 0) {
        await Cart.deleteOne({ _id: cart._id }, { session });
      } else {
        await cart.save({ session });
      }
    });
  } finally {
    await session.endSession();
  }

  if (owner?.isGuest && (!cart.items || cart.items.length === 0)) {
    clearCartCookie(res);
  }

  await logActivity({
    type: "order_placed",
    title: "New Order Placed",
    message: `${createdOrder.orderNumber} placed for ${createdOrder.email}.`,
    actor: req.user,
    meta: {
      orderId: String(createdOrder._id),
      orderNumber: createdOrder.orderNumber,
      total: createdOrder.pricing?.total || 0,
      itemCount: (createdOrder.items || []).reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
      ),
    },
  });

  sendSuccess(res, {
    statusCode: 201,
    message: "Order placed successfully.",
    data: {
      order: serializeOrder(createdOrder),
    },
  });
}

async function listOrders(req, res) {
  if (!req.user?.id || !mongoose.isValidObjectId(req.user.id)) {
    throw new AppError("Authentication required.", 401, {
      code: "AUTH_REQUIRED",
    });
  }

  const requestedStatus = String(req.query.status || "").trim().toLowerCase();
  const normalizedStatus =
    requestedStatus === "all" || requestedStatus === ""
      ? ""
      : requestedStatus === "confirmed"
        ? "processing"
        : requestedStatus;

  if (normalizedStatus && !ORDER_STATUSES.includes(normalizedStatus)) {
    throw new AppError("Order status filter is invalid.", 400, {
      code: "INVALID_ORDER_STATUS",
    });
  }

  const filter = { userId: req.user.id };

  if (normalizedStatus) {
    filter.status =
      normalizedStatus === "processing"
        ? { $in: ["processing", "confirmed"] }
        : normalizedStatus;
  }

  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();

  sendSuccess(res, {
    message: "Orders fetched successfully.",
    data: {
      orders: orders.map(serializeOrderListItem),
    },
  });
}

module.exports = {
  createOrder,
  listOrders,
};
