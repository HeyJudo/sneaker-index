(function attachOrdersPage(global) {
  const api = global.SneakerIndexStoreApi;

  if (!api) {
    return;
  }

  const elements = {
    app: document.querySelector("[data-orders-app]"),
    list: document.querySelector("[data-orders-list]"),
    status: document.querySelector("[data-orders-status]"),
    loading: document.querySelector("[data-orders-loading]"),
    empty: document.querySelector("[data-orders-empty]"),
    filters: Array.from(document.querySelectorAll("[data-orders-filter]")),
    latestImage: document.querySelector("[data-orders-latest-image]"),
    latestName: document.querySelector("[data-orders-latest-name]"),
    latestMeta: document.querySelector("[data-orders-latest-meta]"),
    latestHref: document.querySelector("[data-orders-latest-href]"),
  };

  if (!elements.app) {
    return;
  }

  const state = {
    filter: "all",
    orders: [],
    expandedOrderIds: new Set(),
  };

  const STATUS_META = {
    processing: {
      label: "Processing",
      icon: "sync",
      badgeClass: "bg-surface-container-high text-outline",
    },
    shipped: {
      label: "Shipped",
      icon: "local_shipping",
      badgeClass: "bg-surface-container-highest text-primary",
    },
    delivered: {
      label: "Delivered",
      icon: "check_circle",
      badgeClass: "bg-primary text-white",
    },
    cancelled: {
      label: "Cancelled",
      icon: "cancel",
      badgeClass: "bg-error text-white",
    },
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value || 0);
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  }

  function formatDateTime(value) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  function getStatusMeta(status) {
    return STATUS_META[status] || STATUS_META.processing;
  }

  function setStatus(message, tone) {
    if (!elements.status) {
      return;
    }

    const toneClass =
      tone === "error"
        ? "border-error bg-error/10 text-error"
        : "border-primary bg-primary/10 text-primary";

    elements.status.className = `border p-4 mb-8 flex items-center gap-3 ${toneClass}`;
    elements.status.innerHTML = `
      <span class="material-symbols-outlined">${tone === "error" ? "error" : "info"}</span>
      <p class="text-xs font-black uppercase tracking-[0.2em]">${escapeHtml(message)}</p>
    `;
    elements.status.classList.remove("hidden");
  }

  function clearStatus() {
    if (!elements.status) {
      return;
    }

    elements.status.classList.add("hidden");
    elements.status.innerHTML = "";
  }

  function renderLatestAcquisition() {
    const latestOrder = state.orders[0];
    const latestItem = latestOrder?.items?.[0];

    if (!latestItem) {
      if (elements.latestName) {
        elements.latestName.textContent = "No Acquisitions Yet";
      }

      if (elements.latestMeta) {
        elements.latestMeta.textContent = "Build the archive from the storefront.";
      }

      if (elements.latestHref) {
        elements.latestHref.href = "catalog.html";
        elements.latestHref.textContent = "Browse Archive";
      }

      return;
    }

    if (elements.latestImage) {
      elements.latestImage.src = latestItem.heroImage || "";
      elements.latestImage.alt = latestItem.productName;
    }

    if (elements.latestName) {
      elements.latestName.textContent = latestItem.productName;
    }

    if (elements.latestMeta) {
      elements.latestMeta.textContent = `${getStatusMeta(latestOrder.status).label} ${formatDate(
        latestOrder.createdAt
      )}`;
    }

    if (elements.latestHref) {
      elements.latestHref.href = `product.html?slug=${encodeURIComponent(
        latestItem.productSlug
      )}`;
      elements.latestHref.textContent = "View Item";
    }
  }

  function renderFilters() {
    elements.filters.forEach((button) => {
      const isActive = button.dataset.ordersFilter === state.filter;

      button.className = isActive
        ? "pb-4 text-[10px] tracking-[0.3em] font-black uppercase text-primary border-b-2 border-primary whitespace-nowrap"
        : "pb-4 text-[10px] tracking-[0.3em] font-bold uppercase text-outline hover:text-on-surface transition-colors whitespace-nowrap";
    });
  }

  function renderTimeline(timeline) {
    return timeline
      .map((entry) => {
        const dotClass = entry.completed
          ? "bg-primary shadow-[0_0_0_4px_rgba(26,63,196,0.1)]"
          : "bg-outline-variant/50";
        const labelClass = entry.completed ? "text-on-surface" : "text-outline";
        const timeClass = entry.completed ? "text-outline" : "text-outline/60";

        return `
          <div class="flex items-start gap-6 relative">
            <div class="absolute left-[-23px] w-4 h-4 ${dotClass} zero-radius mt-0.5 z-10 border-2 border-white"></div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-widest ${labelClass}">${escapeHtml(entry.label)}</p>
              <p class="text-[10px] ${timeClass} mt-1 uppercase font-bold">${escapeHtml(formatDateTime(entry.timestamp))}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderItems(items) {
    return items
      .map(
        (item) => `
          <div class="flex gap-6">
            <div class="w-14 h-14 bg-surface-container zero-radius flex-shrink-0 border border-outline-variant/10 overflow-hidden">
              <img alt="${escapeHtml(item.productName)}" class="w-full h-full object-cover" src="${escapeHtml(item.heroImage || "")}">
            </div>
            <div class="flex-grow">
              <div class="flex justify-between items-start gap-6">
                <div>
                  <p class="text-xs font-black uppercase tracking-tight">${escapeHtml(item.productName)}</p>
                  <p class="text-[10px] text-outline uppercase tracking-widest mt-1">${escapeHtml(
                    item.sizeLabel
                  )} / ${escapeHtml(item.colorName)} / QTY ${item.quantity}</p>
                </div>
                <p class="text-xs font-black">${formatPrice(item.lineTotal)}</p>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }

  function renderOrderCard(order) {
    const status = getStatusMeta(order.status);
    const isExpanded = state.expandedOrderIds.has(order.id);
    const shippingAddress = order.shippingAddress || {};
    const thumbnails = order.items
      .slice(0, 4)
      .map(
        (item) => `
          <a class="w-20 h-20 bg-surface-container relative zero-radius overflow-hidden border border-outline-variant/10 group block" href="product.html?slug=${encodeURIComponent(
            item.productSlug
          )}">
            <div class="absolute inset-0 bg-primary/5 cobalt-grade z-10 opacity-60"></div>
            <img alt="${escapeHtml(item.productName)}" class="w-full h-full object-cover" src="${escapeHtml(
              item.heroImage || ""
            )}">
          </a>
        `
      )
      .join("");

    return `
      <article class="bg-surface-container-lowest border border-outline-variant/20 zero-radius cobalt-shadow overflow-hidden" data-order-card="${escapeHtml(
        order.id
      )}">
        <div class="flex flex-col lg:flex-row justify-between lg:items-center p-8 ${
          isExpanded ? "bg-surface-container/30 border-b border-outline-variant/10" : ""
        }">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-grow">
            <div>
              <span class="text-[9px] tracking-[0.2em] text-outline font-bold uppercase">Order No.</span>
              <h3 class="font-bebas text-2xl tracking-wide text-on-surface">${escapeHtml(order.orderNumber)}</h3>
            </div>
            <div>
              <span class="text-[9px] tracking-[0.2em] text-outline font-bold uppercase">Placed</span>
              <p class="text-sm font-bold uppercase">${escapeHtml(formatDate(order.createdAt))}</p>
            </div>
            <div>
              <span class="text-[9px] tracking-[0.2em] text-outline font-bold uppercase">Archive Total</span>
              <p class="text-sm font-bold uppercase">${formatPrice(order.pricing.total)}</p>
            </div>
            <div>
              <span class="text-[9px] tracking-[0.2em] text-outline font-bold uppercase">Items</span>
              <p class="text-sm font-bold uppercase">${order.itemCount} Piece${order.itemCount === 1 ? "" : "s"}</p>
            </div>
          </div>
          <div class="mt-6 lg:mt-0 flex items-center gap-4">
            <span class="px-5 py-1.5 ${status.badgeClass} text-[9px] tracking-[0.2em] font-black uppercase zero-radius">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[12px]">${status.icon}</span>
                <span>${escapeHtml(status.label)}</span>
              </span>
            </span>
            <button class="w-10 h-10 flex items-center justify-center bg-surface-container-highest/50 zero-radius" data-order-toggle="${escapeHtml(
              order.id
            )}" type="button">
              <span class="material-symbols-outlined text-lg">${isExpanded ? "expand_less" : "expand_more"}</span>
            </button>
          </div>
        </div>
        ${
          isExpanded
            ? `
          <div class="p-8">
            <div class="flex gap-4 mb-10 overflow-x-auto pb-2">
              ${thumbnails}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div class="md:col-span-7">
                <h4 class="text-[10px] tracking-[0.3em] font-black text-on-surface uppercase mb-8 pb-2 border-b border-outline-variant/20">Itemized Acquisitions</h4>
                <div class="space-y-6">
                  ${renderItems(order.items)}
                </div>
                <div class="mt-8 pt-8 border-t border-outline-variant/10 space-y-3">
                  <div class="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${formatPrice(order.pricing.subtotal)}</span>
                  </div>
                  <div class="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest">
                    <span>Shipping & Handling</span>
                    <span>${formatPrice(order.pricing.shipping)}</span>
                  </div>
                  <div class="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest">
                    <span>Tax</span>
                    <span>${formatPrice(order.pricing.tax)}</span>
                  </div>
                  <div class="flex justify-between text-sm font-black text-on-surface pt-4 border-t border-outline-variant/20">
                    <span class="tracking-widest uppercase">Archive Total</span>
                    <span>${formatPrice(order.pricing.total)}</span>
                  </div>
                </div>
              </div>
              <div class="md:col-span-5 flex flex-col gap-12">
                <div>
                  <h4 class="text-[10px] tracking-[0.3em] font-black text-on-surface uppercase mb-8 pb-2 border-b border-outline-variant/20">Logistics Path</h4>
                  <div class="space-y-8 relative pl-6">
                    <div class="absolute left-[7px] top-1 bottom-1 w-[1.5px] bg-outline-variant/30"></div>
                    ${renderTimeline(order.timeline || [])}
                  </div>
                </div>
                <div>
                  <h4 class="text-[10px] tracking-[0.3em] font-black text-on-surface uppercase mb-6 pb-2 border-b border-outline-variant/20">Shipping Destination</h4>
                  <p class="text-xs leading-[1.8] font-bold uppercase tracking-widest">
                    ${escapeHtml(shippingAddress.firstName || "")} ${escapeHtml(shippingAddress.lastName || "")}<br/>
                    ${escapeHtml(shippingAddress.addressLine1 || "")}<br/>
                    ${
                      shippingAddress.addressLine2
                        ? `${escapeHtml(shippingAddress.addressLine2)}<br/>`
                        : ""
                    }
                    ${escapeHtml(shippingAddress.city || "")}, ${escapeHtml(shippingAddress.state || "")} ${escapeHtml(
                        shippingAddress.postalCode || ""
                      )}<br/>
                    ${escapeHtml(shippingAddress.country || "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        `
            : ""
        }
      </article>
    `;
  }

  function renderOrders() {
    if (!elements.list) {
      return;
    }

    elements.list.innerHTML = state.orders.map(renderOrderCard).join("");
  }

  function renderState() {
    renderFilters();
    renderLatestAcquisition();

    if (elements.loading) {
      elements.loading.classList.toggle("hidden", true);
    }

    const hasOrders = state.orders.length > 0;

    elements.empty?.classList.toggle("hidden", hasOrders);
    elements.list?.classList.toggle("hidden", !hasOrders);

    if (hasOrders) {
      renderOrders();
    } else if (elements.list) {
      elements.list.innerHTML = "";
    }
  }

  async function loadOrders() {
    clearStatus();

    if (elements.loading) {
      elements.loading.classList.remove("hidden");
    }

    elements.empty?.classList.add("hidden");
    elements.list?.classList.add("hidden");

    try {
      const response = await api.getOrders({
        status: state.filter === "all" ? "" : state.filter,
      });
      state.orders = response.data.orders || [];
      state.expandedOrderIds = new Set(state.orders[0]?.id ? [state.orders[0].id] : []);
      renderState();
    } catch (error) {
      state.orders = [];
      state.expandedOrderIds = new Set();
      renderState();
      setStatus(error.message || "Unable to load your archive history.", "error");
    }
  }

  function bindEvents() {
    elements.filters.forEach((button) => {
      button.addEventListener("click", async () => {
        const nextFilter = button.dataset.ordersFilter || "all";

        if (nextFilter === state.filter) {
          return;
        }

        state.filter = nextFilter;
        await loadOrders();
      });
    });

    elements.list?.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-order-toggle]");

      if (!toggle) {
        return;
      }

      const orderId = toggle.dataset.orderToggle;
      if (state.expandedOrderIds.has(orderId)) {
        state.expandedOrderIds.delete(orderId);
      } else {
        state.expandedOrderIds.add(orderId);
      }
      renderOrders();
    });
  }

  async function init() {
    bindEvents();
    renderFilters();
    await loadOrders();
  }

  init();
})(window);
