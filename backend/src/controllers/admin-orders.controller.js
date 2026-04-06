const mongoose = require("mongoose");
const { Order, User } = require("../models");
const { sendSuccess } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");

const ALLOWED_STATUSES = [
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

function normalizePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}

function normalizeStatusForQuery(rawStatus) {
  const status = String(rawStatus || "").trim().toLowerCase();

  if (!status || status === "all") {
    return "";
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    throw new AppError("Order status filter is invalid.", 400, {
      code: "INVALID_ORDER_STATUS",
    });
  }

  return status;
}

function normalizeStatusForWrite(rawStatus) {
  const status = String(rawStatus || "").trim().toLowerCase();

  if (!ALLOWED_STATUSES.includes(status)) {
    throw new AppError("Order status is invalid.", 400, {
      code: "INVALID_ORDER_STATUS",
    });
  }

  return status;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertValidOrderId(orderId) {
  if (!mongoose.isValidObjectId(orderId)) {
    throw new AppError("orderId is invalid.", 400, {
      code: "VALIDATION_ERROR",
      details: [
        {
          field: "orderId",
          message: "orderId must be a valid identifier.",
        },
      ],
    });
  }
}

function buildOrderFilter(query) {
  const filter = {};
  const status = normalizeStatusForQuery(query.status);
  const search = String(query.search || "").trim();

  if (status) {
    filter.status = status === "processing" ? { $in: ["processing", "confirmed"] } : status;
  }

  if (search) {
    const tokens = search
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean)
      .slice(0, 6);

    filter.$and = tokens.map((token) => {
      const pattern = escapeRegex(token);

      return {
        $or: [
          { orderNumber: { $regex: pattern, $options: "i" } },
          { email: { $regex: pattern, $options: "i" } },
          { "items.productName": { $regex: pattern, $options: "i" } },
          { "items.sizeSku": { $regex: pattern, $options: "i" } },
          { "shippingAddress.firstName": { $regex: pattern, $options: "i" } },
          { "shippingAddress.lastName": { $regex: pattern, $options: "i" } },
        ],
      };
    });
  }

  return filter;
}

function mapStatusForUi(status) {
  return status === "confirmed" ? "processing" : status;
}

function getStatusTimeline(order) {
  const placedAt = new Date(order.createdAt);
  const shippedAt = new Date(placedAt.getTime() + 2 * 24 * 60 * 60 * 1000);
  const deliveredAt = new Date(placedAt.getTime() + 5 * 24 * 60 * 60 * 1000);
  const normalizedStatus = mapStatusForUi(order.status);

  if (normalizedStatus === "cancelled") {
    return [
      {
        key: "processing",
        label: "Processing",
        timestamp: placedAt.toISOString(),
        completed: true,
        active: false,
      },
      {
        key: "cancelled",
        label: "Cancelled",
        timestamp: new Date(order.updatedAt || placedAt).toISOString(),
        completed: true,
        active: true,
      },
    ];
  }

  return [
    {
      key: "processing",
      label: "Processing",
      timestamp: placedAt.toISOString(),
      completed: true,
      active: normalizedStatus === "processing",
    },
    {
      key: "shipped",
      label: "Shipped",
      timestamp: shippedAt.toISOString(),
      completed: normalizedStatus === "shipped" || normalizedStatus === "delivered",
      active: normalizedStatus === "shipped",
    },
    {
      key: "delivered",
      label: "Delivered",
      timestamp: deliveredAt.toISOString(),
      completed: normalizedStatus === "delivered",
      active: normalizedStatus === "delivered",
    },
  ];
}

function serializeAdminOrder(order, userMap = new Map()) {
  const user = order.userId ? userMap.get(String(order.userId)) : null;
  const itemCount = (order.items || []).reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  return {
    id: String(order._id),
    orderNumber: order.orderNumber,
    status: mapStatusForUi(order.status),
    paymentStatus: order.paymentStatus,
    email: order.email,
    shippingMethod: order.shippingMethod,
    paymentMethod: order.paymentMethod,
    pricing: order.pricing,
    items: order.items || [],
    itemCount,
    shippingAddress: order.shippingAddress || {},
    customer: {
      id: user ? String(user._id) : null,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      fullName:
        user && (user.firstName || user.lastName)
          ? [user.firstName, user.lastName].filter(Boolean).join(" ")
          : "",
      email: user?.email || order.email || "",
      phone: user?.phone || "",
    },
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    timeline: getStatusTimeline(order),
  };
}

async function buildUserMapFromOrders(orders) {
  const userIds = Array.from(
    new Set(
      orders
        .map((order) => order.userId)
        .filter(Boolean)
        .map((userId) => String(userId))
    )
  );

  if (!userIds.length) {
    return new Map();
  }

  const users = await User.find({ _id: { $in: userIds } })
    .select("firstName lastName email phone")
    .lean();

  return new Map(users.map((user) => [String(user._id), user]));
}

async function listAdminOrders(req, res) {
  const page = normalizePositiveInt(req.query.page, 1);
  const limit = Math.min(normalizePositiveInt(req.query.limit, 20), 100);
  const skip = (page - 1) * limit;
  const filter = buildOrderFilter(req.query);

  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);

  const userMap = await buildUserMapFromOrders(orders);

  sendSuccess(res, {
    message: "Admin orders fetched successfully.",
    data: {
      orders: orders.map((order) => serializeAdminOrder(order, userMap)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    },
  });
}

async function getAdminOrderById(req, res) {
  assertValidOrderId(req.params.orderId);

  const order = await Order.findById(req.params.orderId).lean();

  if (!order) {
    throw new AppError("Order not found.", 404, {
      code: "ORDER_NOT_FOUND",
    });
  }

  const userMap = await buildUserMapFromOrders([order]);

  sendSuccess(res, {
    message: "Admin order fetched successfully.",
    data: {
      order: serializeAdminOrder(order, userMap),
    },
  });
}

async function updateAdminOrderStatus(req, res) {
  assertValidOrderId(req.params.orderId);

  const status = normalizeStatusForWrite(req.body?.status);

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    throw new AppError("Order not found.", 404, {
      code: "ORDER_NOT_FOUND",
    });
  }

  order.status = status;
  await order.save();

  const userMap = await buildUserMapFromOrders([order.toObject()]);

  sendSuccess(res, {
    message: "Order status updated successfully.",
    data: {
      order: serializeAdminOrder(order.toObject(), userMap),
    },
  });
}

module.exports = {
  listAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
};
