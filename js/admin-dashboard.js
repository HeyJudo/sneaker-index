document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

  const elements = {
    timestamp: document.querySelector("[data-admin-dashboard-timestamp]"),
    refresh: document.querySelector("[data-admin-dashboard-refresh]"),
    kpiProducts: document.querySelector("[data-admin-kpi-products]"),
    kpiOrders: document.querySelector("[data-admin-kpi-orders]"),
    kpiLowStock: document.querySelector("[data-admin-kpi-low-stock]"),
    kpiCategories: document.querySelector("[data-admin-kpi-categories]"),
    quickProducts: document.querySelector("[data-admin-dashboard-go-products]"),
    quickOrders: document.querySelector("[data-admin-dashboard-go-orders]"),
    quickCategories: document.querySelector("[data-admin-dashboard-go-categories]"),
    quickSync: document.querySelector("[data-admin-dashboard-sync]"),
    recentOrders: document.querySelector("[data-admin-dashboard-recent-orders]"),
    lowStock: document.querySelector("[data-admin-dashboard-low-stock]"),
    viewLowStock: document.querySelector("[data-admin-dashboard-view-low-stock]"),
    activity: document.querySelector("[data-admin-dashboard-activity]"),
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatPrice(value) {
    return (Number(value) || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  function formatCount(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  function statusBadge(status) {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-slate-200 text-slate-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  }

  function statusLabel(status) {
    return String(status || "processing")
      .replaceAll("-", " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }

  function productStock(product) {
    return (product.sizes || []).reduce((sum, size) => sum + (Number(size.stock) || 0), 0);
  }

  function setTimestamp() {
    if (!elements.timestamp) {
      return;
    }
    const now = new Date();
    elements.timestamp.textContent = now.toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatActivityTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getActivityStyle(type) {
    const value = String(type || "").toLowerCase();

    if (value.includes("order")) {
      return { icon: "payments", badge: "bg-green-700" };
    }

    if (value.includes("product")) {
      return { icon: "inventory", badge: "bg-primary-container" };
    }

    if (value.includes("category")) {
      return { icon: "category", badge: "bg-slate-700" };
    }

    if (value.includes("cancel") || value.includes("delete")) {
      return { icon: "priority_high", badge: "bg-error" };
    }

    return { icon: "notifications", badge: "bg-slate-700" };
  }

  function renderActivity(activities) {
    if (!elements.activity) {
      return;
    }

    if (!activities.length) {
      elements.activity.innerHTML = `
        <div class="text-xs text-slate-400 uppercase tracking-widest">No recent activity yet.</div>
      `;
      return;
    }

    elements.activity.innerHTML = activities
      .map((activity) => {
        const style = getActivityStyle(activity.type);
        return `
          <div class="flex gap-4">
            <div class="w-8 h-8 ${style.badge} flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-sm">${escapeHtml(style.icon)}</span>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wide">${escapeHtml(activity.title || "Activity")}</p>
              <p class="text-[10px] text-slate-400 mt-1">${escapeHtml(activity.message || "")}</p>
              <p class="text-[9px] text-blue-400 mt-2 font-mono">${escapeHtml(formatActivityTime(activity.createdAt))}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function setKpis({ productsTotal, ordersTotal, categoriesTotal, lowStockTotal }) {
    if (elements.kpiProducts) {
      elements.kpiProducts.textContent = formatCount(productsTotal);
    }
    if (elements.kpiOrders) {
      elements.kpiOrders.textContent = formatCount(ordersTotal);
    }
    if (elements.kpiCategories) {
      elements.kpiCategories.textContent = formatCount(categoriesTotal);
    }
    if (elements.kpiLowStock) {
      elements.kpiLowStock.textContent = formatCount(lowStockTotal);
    }
  }

  function renderRecentOrders(orders) {
    if (!elements.recentOrders) {
      return;
    }

    if (!orders.length) {
      elements.recentOrders.innerHTML = `
        <tr>
          <td class="px-8 py-8 text-slate-500 text-sm" colspan="5">No recent orders found.</td>
        </tr>
      `;
      return;
    }

    elements.recentOrders.innerHTML = orders
      .map((order) => {
        const customerName =
          order.customer?.fullName ||
          [order.shippingAddress?.firstName, order.shippingAddress?.lastName]
            .filter(Boolean)
            .join(" ") ||
          order.email ||
          "Guest";

        return `
          <tr class="border-b border-surface-container-low hover:bg-surface-container-low transition-colors">
            <td class="px-8 py-5 font-mono">${escapeHtml(order.orderNumber || "")}</td>
            <td class="px-8 py-5 font-bold uppercase">${escapeHtml(customerName)}</td>
            <td class="px-8 py-5">${escapeHtml(formatPrice(order.pricing?.total || 0))}</td>
            <td class="px-8 py-5">
              <span class="${statusBadge(order.status)} px-3 py-1 text-[9px] font-extrabold uppercase tracking-tighter">${escapeHtml(
                statusLabel(order.status)
              )}</span>
            </td>
            <td class="px-8 py-5">
              <button class="text-primary hover:text-secondary" data-admin-dashboard-open-order="${escapeHtml(order.id)}" type="button">
                <span class="material-symbols-outlined text-lg">visibility</span>
              </button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function renderLowStock(products) {
    if (!elements.lowStock) {
      return;
    }

    if (!products.length) {
      elements.lowStock.innerHTML = `
        <tr>
          <td class="px-8 py-8 text-slate-500 text-sm" colspan="5">No low-stock products found.</td>
        </tr>
      `;
      return;
    }

    elements.lowStock.innerHTML = products
      .map((product) => {
        const stock = productStock(product);
        const sku = product.sizes?.[0]?.sku || "N/A";
        const image = product.heroImage || product.images?.[0] || "";

        return `
          <tr class="border-b border-surface-container-low hover:bg-surface-container-low/50 transition-colors">
            <td class="px-8 py-4 flex items-center gap-4">
              <div class="w-12 h-12 cobalt-grade bg-surface-container-low flex items-center justify-center overflow-hidden">
                ${image ? `<img alt="${escapeHtml(product.name)}" class="w-full h-full object-cover" src="${escapeHtml(image)}"/>` : ""}
              </div>
              <span class="font-bold uppercase tracking-tighter">${escapeHtml(product.name)}</span>
            </td>
            <td class="px-8 py-4 font-mono text-slate-500">${escapeHtml(sku)}</td>
            <td class="px-8 py-4">${escapeHtml(formatDate(product.updatedAt))}</td>
            <td class="px-8 py-4 font-bold text-error">${String(stock).padStart(2, "0")} Units</td>
            <td class="px-8 py-4 text-right">
              <button class="text-primary hover:bg-primary-fixed px-3 py-1 font-bold uppercase text-[10px] transition-colors" data-admin-dashboard-edit-product="${escapeHtml(product._id)}" type="button">Edit</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  async function loadDashboard() {
    if (elements.refresh) {
      elements.refresh.disabled = true;
      elements.refresh.textContent = "Refreshing...";
    }

    try {
      const [
        ordersRes,
        productsRes,
        categoriesRes,
        lowStockRes,
        outStockRes,
        lowStockListRes,
        activityRes,
      ] = await Promise.all([
        api.adminListOrders({ page: 1, limit: 4 }),
        api.adminListProducts({ page: 1, limit: 1 }),
        api.adminListCategories(),
        api.adminListProducts({ page: 1, limit: 1, stockStatus: "low-stock" }),
        api.adminListProducts({ page: 1, limit: 1, stockStatus: "out-of-stock" }),
        api.adminListProducts({ page: 1, limit: 5, stockStatus: "low-stock" }),
        api.adminListActivity({ limit: 6 }),
      ]);

      const orders = ordersRes?.data?.orders || [];
      const ordersTotal = Number(ordersRes?.data?.pagination?.total || 0);
      const productsTotal = Number(productsRes?.data?.pagination?.total || 0);
      const categoriesTotal = Number(categoriesRes?.data?.total || 0);
      const lowStockTotal = Number(lowStockRes?.data?.pagination?.total || 0);
      const outStockTotal = Number(outStockRes?.data?.pagination?.total || 0);
      const lowStockProducts = lowStockListRes?.data?.products || [];
      const activities = activityRes?.data?.activities || [];

      setKpis({
        productsTotal,
        ordersTotal,
        categoriesTotal,
        lowStockTotal: lowStockTotal + outStockTotal,
      });
      renderRecentOrders(orders);
      renderLowStock(lowStockProducts);
      renderActivity(activities);
      setTimestamp();
    } catch (_error) {
      renderRecentOrders([]);
      renderLowStock([]);
      renderActivity([]);
      setKpis({
        productsTotal: 0,
        ordersTotal: 0,
        categoriesTotal: 0,
        lowStockTotal: 0,
      });
      setTimestamp();
    } finally {
      if (elements.refresh) {
        elements.refresh.disabled = false;
        elements.refresh.textContent = "Refresh";
      }
    }
  }

  elements.quickProducts?.addEventListener("click", () => {
    window.location.href = "admin-products.html";
  });

  elements.quickOrders?.addEventListener("click", () => {
    window.location.href = "admin-orders.html";
  });

  elements.quickCategories?.addEventListener("click", () => {
    window.location.href = "admin-categories.html";
  });

  elements.quickSync?.addEventListener("click", () => {
    loadDashboard();
  });

  elements.viewLowStock?.addEventListener("click", () => {
    window.location.href = "admin-products.html";
  });

  elements.recentOrders?.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-admin-dashboard-open-order]");
    if (!trigger) {
      return;
    }
    window.location.href = "admin-orders.html";
  });

  elements.lowStock?.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-admin-dashboard-edit-product]");
    if (!trigger) {
      return;
    }
    const productId = trigger.dataset.adminDashboardEditProduct;
    if (!productId) {
      return;
    }
    window.location.href = `admin-product-form.html?id=${encodeURIComponent(productId)}`;
  });

  elements.refresh?.addEventListener("click", () => {
    loadDashboard();
  });

  loadDashboard();
});
