document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

  const elements = {
    search: document.querySelector("[data-admin-orders-search]"),
    filters: Array.from(document.querySelectorAll("[data-admin-orders-filter]")),
    tbody: document.querySelector("[data-admin-orders-tbody]"),
    count: document.querySelector("[data-admin-orders-count]"),
    page: document.querySelector("[data-admin-orders-page]"),
    prev: document.querySelector("[data-admin-orders-prev]"),
    next: document.querySelector("[data-admin-orders-next]"),
    feedback: document.querySelector("[data-admin-orders-feedback]"),
    orderNumber: document.querySelector("[data-admin-order-number]"),
    status: document.querySelector("[data-admin-order-status]"),
    save: document.querySelector("[data-admin-order-save]"),
    refresh: document.querySelector("[data-admin-order-refresh]"),
    viewStore: document.querySelector("[data-admin-order-view-store]"),
    customer: document.querySelector("[data-admin-order-customer]"),
    address: document.querySelector("[data-admin-order-address]"),
    items: document.querySelector("[data-admin-order-items]"),
    shippingLabel: document.querySelector("[data-admin-order-shipping-label]"),
    subtotal: document.querySelector("[data-admin-order-subtotal]"),
    shipping: document.querySelector("[data-admin-order-shipping]"),
    tax: document.querySelector("[data-admin-order-tax]"),
    total: document.querySelector("[data-admin-order-total]"),
    payment: document.querySelector("[data-admin-order-payment]"),
    timeline: document.querySelector("[data-admin-order-timeline]"),
  };

  if (!elements.tbody) {
    return;
  }

  const state = {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    filter: "all",
    search: "",
    orders: [],
    selectedOrderId: "",
    selectedOrder: null,
    isLoading: false,
    isSaving: false,
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

  function formatDate(value) {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  function formatDateTime(value) {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function toTitle(value) {
    return String(value || "")
      .split("_")
      .join(" ")
      .split("-")
      .join(" ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  function getStatusBadgeClasses(status) {
    switch (status) {
      case "delivered":
        return "bg-surface-container-highest text-on-surface-variant";
      case "cancelled":
        return "bg-error-container text-on-error-container";
      case "shipped":
        return "bg-slate-900 text-white";
      default:
        return "bg-primary text-white";
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "delivered":
        return "package";
      case "cancelled":
        return "close";
      case "shipped":
        return "local_shipping";
      default:
        return "settings";
    }
  }

  function getStatusLabel(status) {
    if (status === "processing") {
      return "Processing";
    }
    return toTitle(status);
  }

  function setFeedback(message, tone = "info") {
    if (!elements.feedback) {
      return;
    }

    if (!message) {
      elements.feedback.classList.add("hidden");
      elements.feedback.textContent = "";
      elements.feedback.className =
        "hidden border px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold";
      return;
    }

    const toneClass =
      tone === "error"
        ? "border-error bg-error-container text-on-error-container"
        : tone === "success"
          ? "border-primary bg-primary-fixed text-primary"
          : "border-outline-variant bg-surface-container-low text-on-surface-variant";

    elements.feedback.className = `border px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold ${toneClass}`;
    elements.feedback.textContent = message;
  }

  function setTableLoading() {
    elements.tbody.innerHTML = `
      <tr>
        <td class="px-8 py-8 text-sm text-outline" colspan="6">Loading orders...</td>
      </tr>
    `;
  }

  function setTableEmpty(message) {
    elements.tbody.innerHTML = `
      <tr>
        <td class="px-8 py-8 text-sm text-outline" colspan="6">${escapeHtml(message)}</td>
      </tr>
    `;
  }

  function updateCountAndPaging() {
    if (elements.count) {
      if (state.total <= 0) {
        elements.count.textContent = "No orders found";
      } else {
        const start = (state.page - 1) * state.limit + 1;
        const end = Math.min(state.page * state.limit, state.total);
        elements.count.textContent = `Showing ${start} to ${end} of ${state.total} orders`;
      }
    }

    if (elements.page) {
      elements.page.textContent = `Page ${state.page} / ${state.totalPages}`;
    }

    if (elements.prev) {
      elements.prev.disabled = state.isLoading || state.page <= 1;
    }

    if (elements.next) {
      elements.next.disabled = state.isLoading || state.page >= state.totalPages;
    }
  }

  function renderRows() {
    if (!state.orders.length) {
      setTableEmpty("No orders matched your current filters.");
      return;
    }

    elements.tbody.innerHTML = state.orders
      .map((order) => {
        const isSelected = order.id === state.selectedOrderId;
        const rowClass = isSelected
          ? "bg-blue-50/50 group cursor-pointer border-l-4 border-primary"
          : "hover:bg-surface-container-low transition-colors group cursor-pointer border-l-4 border-transparent";
        const customerName =
          order.customer?.fullName || order.shippingAddress?.firstName || order.email || "Customer";

        return `
          <tr class="${rowClass}" data-admin-order-row-id="${escapeHtml(order.id)}">
            <td class="px-8 py-5 text-sm font-bold font-headline">${escapeHtml(order.orderNumber)}</td>
            <td class="px-4 py-5">
              <div class="text-sm font-medium">${escapeHtml(customerName)}</div>
              <div class="text-[10px] text-outline">${escapeHtml(order.email || "")}</div>
            </td>
            <td class="px-4 py-5 text-[12px]">${escapeHtml(formatDate(order.createdAt))}</td>
            <td class="px-4 py-5 text-[12px]">${Number(order.itemCount || 0)} Item${Number(order.itemCount || 0) === 1 ? "" : "s"}</td>
            <td class="px-4 py-5 text-sm font-bold text-right font-headline">${escapeHtml(formatPrice(order.pricing?.total || 0))}</td>
            <td class="px-8 py-5 text-right">
              <span class="${getStatusBadgeClasses(order.status)} px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-none inline-flex items-center gap-1.5">
                <span class="material-symbols-outlined !text-[12px]">${escapeHtml(getStatusIcon(order.status))}</span>${escapeHtml(getStatusLabel(order.status))}
              </span>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function renderOrderDetail(order) {
    state.selectedOrder = order;

    if (!order) {
      if (elements.orderNumber) {
        elements.orderNumber.textContent = "Select an order";
      }
      if (elements.save) {
        elements.save.disabled = true;
      }
      return;
    }

    if (elements.orderNumber) {
      elements.orderNumber.textContent = order.orderNumber || "Order";
    }

    if (elements.status) {
      elements.status.value = order.status || "processing";
      elements.status.disabled = false;
    }

    if (elements.save) {
      elements.save.disabled = false;
    }

    if (elements.customer) {
      const name =
        order.customer?.fullName ||
        [order.shippingAddress?.firstName, order.shippingAddress?.lastName]
          .filter(Boolean)
          .join(" ") ||
        "Guest Customer";
      const email = order.customer?.email || order.email || "-";
      const phone = order.customer?.phone || "No phone provided";
      elements.customer.innerHTML = `
        <p class="text-sm font-bold">${escapeHtml(name)}</p>
        <p class="text-xs text-outline">${escapeHtml(email)}</p>
        <p class="text-xs text-outline">${escapeHtml(phone)}</p>
      `;
    }

    if (elements.address) {
      const address = order.shippingAddress || {};
      const line2 = address.addressLine2 ? `<p class="text-sm">${escapeHtml(address.addressLine2)}</p>` : "";
      elements.address.innerHTML = `
        <p class="text-sm">${escapeHtml(address.addressLine1 || "-")}</p>
        ${line2}
        <p class="text-sm">${escapeHtml([address.city, address.state, address.postalCode].filter(Boolean).join(", ") || "-")}</p>
        <p class="text-xs font-bold text-outline uppercase mt-1">${escapeHtml(address.country || "-")}</p>
      `;
    }

    if (elements.items) {
      const items = Array.isArray(order.items) ? order.items : [];

      if (!items.length) {
        elements.items.innerHTML = '<div class="text-xs uppercase tracking-[0.2em] text-outline">No items found.</div>';
      } else {
        elements.items.innerHTML = items
          .map(
            (item) => `
            <div class="flex gap-4 items-center group">
              <div class="w-20 h-20 bg-surface-container-low cobalt-grade overflow-hidden">
                ${item.heroImage ? `<img alt="${escapeHtml(item.productName)}" class="w-full h-full object-cover" src="${escapeHtml(item.heroImage)}"/>` : ""}
              </div>
              <div class="flex-1">
                <p class="text-[10px] uppercase tracking-widest font-bold text-outline">${escapeHtml(item.brand || "")}</p>
                <p class="text-sm font-headline font-bold">${escapeHtml(item.productName || "")}</p>
                <p class="text-[10px] font-medium text-outline mt-1">SIZE: ${escapeHtml(item.sizeLabel || "-")} | SKU: ${escapeHtml(item.sizeSku || "-")}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold font-headline">${escapeHtml(formatPrice(item.unitPrice || 0))}</p>
                <p class="text-[10px] text-outline">x ${Number(item.quantity || 0)}</p>
              </div>
            </div>
          `
          )
          .join("");
      }
    }

    if (elements.shippingLabel) {
      elements.shippingLabel.textContent = `Shipping (${toTitle(order.shippingMethod || "standard")})`;
    }
    if (elements.subtotal) {
      elements.subtotal.textContent = formatPrice(order.pricing?.subtotal || 0);
    }
    if (elements.shipping) {
      elements.shipping.textContent = formatPrice(order.pricing?.shipping || 0);
    }
    if (elements.tax) {
      elements.tax.textContent = formatPrice(order.pricing?.tax || 0);
    }
    if (elements.total) {
      elements.total.textContent = formatPrice(order.pricing?.total || 0);
    }

    if (elements.payment) {
      elements.payment.innerHTML = `
        <div class="space-y-0.5">
          <p class="text-xs font-bold uppercase tracking-tighter">${escapeHtml(toTitle(order.paymentMethod || "Unknown"))}</p>
          <p class="text-[10px] text-outline">${escapeHtml(toTitle(order.paymentStatus || ""))}</p>
        </div>
      `;
    }

    if (elements.timeline) {
      const timeline = Array.isArray(order.timeline) ? order.timeline : [];
      elements.timeline.innerHTML = timeline
        .map((entry) => {
          const dotClass = entry.completed ? "bg-primary" : "bg-outline";
          const opacityClass = entry.completed ? "" : "opacity-40";
          return `
            <div class="relative ${opacityClass}">
              <div class="absolute -left-[1.35rem] top-1 w-2.5 h-2.5 ${dotClass}"></div>
              <p class="text-[10px] font-bold uppercase tracking-wider">${escapeHtml(entry.label || "")}</p>
              <p class="text-[9px] text-outline">${escapeHtml(formatDateTime(entry.timestamp))}</p>
            </div>
          `;
        })
        .join("");
    }
  }

  async function fetchOrderDetail(orderId) {
    if (!orderId) {
      return;
    }

    try {
      const response = await api.adminGetOrder(orderId);
      renderOrderDetail(response?.data?.order || null);
    } catch (error) {
      setFeedback(error.message || "Failed to load order detail.", "error");
    }
  }

  async function loadOrders() {
    state.isLoading = true;
    updateCountAndPaging();
    setTableLoading();

    try {
      const response = await api.adminListOrders({
        page: state.page,
        limit: state.limit,
        status: state.filter,
        search: state.search,
      });

      const orders = response?.data?.orders || [];
      const pagination = response?.data?.pagination || {};
      state.orders = orders;
      state.total = Number(pagination.total || 0);
      state.totalPages = Math.max(1, Number(pagination.totalPages || 1));

      const selectedStillVisible = state.orders.some(
        (order) => order.id === state.selectedOrderId
      );

      if (!selectedStillVisible) {
        state.selectedOrderId = state.orders[0]?.id || "";
      }

      renderRows();
      updateCountAndPaging();
      setFeedback("");

      if (state.selectedOrderId) {
        await fetchOrderDetail(state.selectedOrderId);
      } else {
        renderOrderDetail(null);
      }
    } catch (error) {
      setTableEmpty(error.message || "Failed to load orders.");
      setFeedback(error.message || "Failed to load orders.", "error");
      state.orders = [];
      state.total = 0;
      state.totalPages = 1;
      updateCountAndPaging();
      renderOrderDetail(null);
    } finally {
      state.isLoading = false;
      updateCountAndPaging();
    }
  }

  function updateFilterButtons() {
    elements.filters.forEach((button) => {
      const isActive = button.dataset.adminOrdersFilter === state.filter;
      button.className = isActive
        ? "text-blue-700 font-inter text-sm uppercase tracking-widest font-bold border-b-2 border-blue-700"
        : "text-slate-500 font-inter text-sm uppercase tracking-widest hover:text-blue-600 transition-colors";
    });
  }

  let searchTimer = null;

  elements.search?.addEventListener("input", (event) => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.search = String(event.target.value || "").trim();
      state.page = 1;
      loadOrders();
    }, 250);
  });

  elements.filters.forEach((button) => {
    button.addEventListener("click", () => {
      const nextFilter = button.dataset.adminOrdersFilter || "all";
      if (nextFilter === state.filter) {
        return;
      }
      state.filter = nextFilter;
      state.page = 1;
      updateFilterButtons();
      loadOrders();
    });
  });

  elements.prev?.addEventListener("click", () => {
    if (state.page <= 1) {
      return;
    }
    state.page -= 1;
    loadOrders();
  });

  elements.next?.addEventListener("click", () => {
    if (state.page >= state.totalPages) {
      return;
    }
    state.page += 1;
    loadOrders();
  });

  elements.tbody.addEventListener("click", (event) => {
    const row = event.target.closest("[data-admin-order-row-id]");

    if (!row) {
      return;
    }

    const orderId = row.dataset.adminOrderRowId;

    if (!orderId || orderId === state.selectedOrderId) {
      return;
    }

    state.selectedOrderId = orderId;
    renderRows();
    fetchOrderDetail(orderId);
  });

  elements.save?.addEventListener("click", async () => {
    if (state.isSaving || !state.selectedOrderId || !elements.status) {
      return;
    }

    const nextStatus = elements.status.value;

    if (!nextStatus) {
      return;
    }

    state.isSaving = true;
    elements.save.disabled = true;

    try {
      await api.adminUpdateOrderStatus(state.selectedOrderId, nextStatus);
      setFeedback("Order status updated.", "success");
      await loadOrders();
    } catch (error) {
      setFeedback(error.message || "Unable to update order status.", "error");
    } finally {
      state.isSaving = false;
      elements.save.disabled = false;
    }
  });

  elements.refresh?.addEventListener("click", () => {
    if (!state.selectedOrderId) {
      return;
    }
    fetchOrderDetail(state.selectedOrderId);
  });

  elements.viewStore?.addEventListener("click", () => {
    window.location.href = "catalog.html";
  });

  updateFilterButtons();
  loadOrders();
});
