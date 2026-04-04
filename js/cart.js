(function attachCartPage(global) {
  const api = global.SneakerIndexStoreApi;

  if (!api) {
    return;
  }

  const SHIPPING_FEE = 12;
  const HANDLING_FEE = 4;

  const elements = {
    app: document.querySelector("[data-cart-app]"),
    shell: document.querySelector("[data-cart-shell]"),
    empty: document.querySelector("[data-cart-empty]"),
    status: document.querySelector("[data-cart-status]"),
    alert: document.querySelector("[data-cart-alert]"),
    alertText: document.querySelector("[data-cart-alert-text]"),
    badge: document.querySelector("[data-cart-badge]"),
    items: document.querySelector("[data-cart-items]"),
    subtotal: document.querySelector("[data-cart-subtotal]"),
    shipping: document.querySelector("[data-cart-shipping]"),
    handling: document.querySelector("[data-cart-handling]"),
    total: document.querySelector("[data-cart-total]"),
    recommendations: document.querySelector("[data-cart-recommendations]"),
  };

  if (!elements.app) {
    return;
  }

  const state = {
    cart: null,
  };

  function escapeHtml(value) {
    return String(value)
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

  function calculateSummary(cart) {
    const subtotal = cart?.summary?.subtotal || 0;
    const itemCount = cart?.summary?.itemCount || 0;
    const shipping = itemCount > 0 ? SHIPPING_FEE : 0;
    const handling = itemCount > 0 ? HANDLING_FEE : 0;

    return {
      subtotal,
      shipping,
      handling,
      total: subtotal + shipping + handling,
    };
  }

  function setStatus(message, tone) {
    if (!elements.status) {
      return;
    }

    const className =
      tone === "error"
        ? "border-error bg-error-container text-on-error-container"
        : "border-primary/20 bg-secondary-fixed text-on-secondary-fixed";

    elements.status.className = `mb-8 border p-4 text-xs font-bold uppercase tracking-[0.2em] ${className}`;
    elements.status.textContent = message;
    elements.status.classList.remove("hidden");
  }

  function clearStatus() {
    if (!elements.status) {
      return;
    }

    elements.status.classList.add("hidden");
    elements.status.textContent = "";
  }

  function renderBadge(itemCount) {
    if (elements.badge) {
      elements.badge.textContent = String(itemCount || 0);
    }
  }

  function renderSummary(cart) {
    const summary = calculateSummary(cart);

    if (elements.subtotal) {
      elements.subtotal.textContent = formatPrice(summary.subtotal);
    }

    if (elements.shipping) {
      elements.shipping.textContent = formatPrice(summary.shipping);
    }

    if (elements.handling) {
      elements.handling.textContent = formatPrice(summary.handling);
    }

    if (elements.total) {
      elements.total.textContent = formatPrice(summary.total);
    }
  }

  function renderAlert(cart) {
    if (!elements.alert || !elements.alertText) {
      return;
    }

    const unavailableItem = cart.items.find((item) => !item.isAvailable);
    const lowStockItem = cart.items.find(
      (item) => item.availableQuantity > 0 && item.availableQuantity <= 2
    );

    if (unavailableItem) {
      elements.alert.classList.remove("hidden");
      elements.alert.classList.add("flex");
      elements.alertText.textContent = `${unavailableItem.product.name} is no longer available in size ${unavailableItem.sizeLabel}. Remove it before checkout.`;
      return;
    }

    if (lowStockItem) {
      elements.alert.classList.remove("hidden");
      elements.alert.classList.add("flex");
      elements.alertText.textContent = `Low stock on ${lowStockItem.product.name} in size ${lowStockItem.sizeLabel}. Only ${lowStockItem.availableQuantity} remaining.`;
      return;
    }

    elements.alert.classList.add("hidden");
    elements.alert.classList.remove("flex");
  }

  function renderEmptyState(cart) {
    const isEmpty = !cart || cart.itemCount === 0;

    if (elements.empty) {
      elements.empty.classList.toggle("hidden", !isEmpty);
      elements.empty.classList.toggle("flex", isEmpty);
    }

    if (elements.shell) {
      elements.shell.classList.toggle("hidden", isEmpty);
    }
  }

  function renderItems(cart) {
    if (!elements.items) {
      return;
    }

    if (!cart.items.length) {
      elements.items.innerHTML = "";
      return;
    }

    elements.items.innerHTML = cart.items
      .map((item) => {
        const quantityLabel = String(item.quantity).padStart(2, "0");
        const decrementDisabled = item.quantity <= 1 ? "disabled opacity-40 cursor-not-allowed" : "";
        const incrementDisabled =
          !item.isAvailable || item.quantity >= item.availableQuantity
            ? "disabled opacity-40 cursor-not-allowed"
            : "";
        const availabilityMessage = !item.isAvailable
          ? `<p class="text-[10px] tracking-[0.2em] uppercase font-bold text-error mt-3">Unavailable in current archive run</p>`
          : item.availableQuantity <= 2
            ? `<p class="text-[10px] tracking-[0.2em] uppercase font-bold text-primary mt-3">Only ${item.availableQuantity} left in size ${escapeHtml(item.sizeLabel)}</p>`
            : "";

        return `
          <div class="flex flex-col md:flex-row gap-8 items-start border-b border-outline-variant pb-8 pt-8 first:pt-0" data-cart-item-id="${escapeHtml(item.id)}">
            <a class="relative w-full md:w-48 aspect-square overflow-hidden cobalt-grade bg-surface-container block" href="product.html?slug=${encodeURIComponent(item.product.slug)}">
              <img alt="${escapeHtml(item.product.name)}" class="w-full h-full object-cover" src="${escapeHtml(item.product.heroImage || "")}">
            </a>
            <div class="flex-1 space-y-6">
              <div class="flex justify-between items-start gap-6">
                <div>
                  <a class="font-headline text-3xl tracking-wide uppercase hover:text-primary transition-colors" href="product.html?slug=${encodeURIComponent(item.product.slug)}">${escapeHtml(item.product.name)}</a>
                  <p class="text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-1">${escapeHtml(item.product.brand)} / ${escapeHtml(item.colorName)} / US ${escapeHtml(item.sizeLabel)}</p>
                  ${availabilityMessage}
                </div>
                <div class="text-right">
                  <span class="font-headline text-2xl text-primary">${formatPrice(item.unitPrice)}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pt-4 gap-6">
                <div class="flex items-center gap-8">
                  <div class="flex items-center border border-outline-variant bg-white">
                    <button class="px-3 py-1 hover:bg-surface-container-high transition-colors ${decrementDisabled}" data-cart-decrement type="button">
                      <span class="material-symbols-outlined text-xs">remove</span>
                    </button>
                    <span class="px-4 py-1 text-sm font-bold border-x border-outline-variant">${quantityLabel}</span>
                    <button class="px-3 py-1 hover:bg-surface-container-high transition-colors ${incrementDisabled}" data-cart-increment type="button">
                      <span class="material-symbols-outlined text-xs">add</span>
                    </button>
                  </div>
                  <button class="text-[10px] tracking-[0.2em] uppercase font-bold text-on-surface-variant hover:text-error transition-colors" data-cart-remove type="button">REMOVE</button>
                </div>
                <div class="text-right">
                  <span class="text-[10px] block uppercase tracking-widest text-on-surface-variant mb-1">Line Total</span>
                  <span class="font-headline text-3xl">${formatPrice(item.lineTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderRecommendations(products) {
    if (!elements.recommendations) {
      return;
    }

    if (!products.length) {
      elements.recommendations.innerHTML = `
        <div class="md:col-span-2 bg-surface-container-low p-12 text-center">
          <p class="font-headline text-4xl uppercase">Archive Expanding</p>
          <p class="text-xs uppercase tracking-[0.2em] text-on-surface-variant mt-3">Fresh additions will appear here as the catalog grows.</p>
        </div>
      `;
      return;
    }

    const feature = products[0];
    const sideItems = products.slice(1, 3);

    elements.recommendations.innerHTML = `
      <a class="md:col-span-2 relative aspect-[16/9] overflow-hidden group block" href="product.html?slug=${encodeURIComponent(feature.slug)}">
        <img alt="${escapeHtml(feature.name)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${escapeHtml(feature.heroImage || feature.images?.[0] || "")}">
        <div class="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent p-8 flex flex-col justify-end">
          <span class="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Editor's Pick</span>
          <h4 class="text-white font-headline text-4xl">${escapeHtml(feature.name)}</h4>
        </div>
      </a>
      ${sideItems
        .map(
          (item) => `
            <a class="relative aspect-square bg-surface-container group overflow-hidden block" href="product.html?slug=${encodeURIComponent(item.slug)}">
              <img alt="${escapeHtml(item.name)}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="${escapeHtml(item.heroImage || item.images?.[0] || "")}">
              <div class="absolute bottom-4 left-4 bg-white px-3 py-1 shadow-sm">
                <span class="font-headline text-xl">${formatPrice(item.price)}</span>
              </div>
            </a>
          `
        )
        .join("")}
    `;
  }

  async function loadRecommendations(cart) {
    try {
      const response = await api.getFeaturedProducts({ limit: 4 });
      const cartSlugs = new Set((cart?.items || []).map((item) => item.product.slug));
      const products = (response.data.products || []).filter((product) => !cartSlugs.has(product.slug));
      renderRecommendations(products.slice(0, 3));
    } catch (_error) {
      renderRecommendations([]);
    }
  }

  function renderCart(cart) {
    state.cart = cart;
    renderBadge(cart.itemCount);
    renderSummary(cart);
    renderEmptyState(cart);
    renderAlert(cart);
    renderItems(cart);
  }

  async function refreshCart(options) {
    if (!options?.preserveStatus) {
      clearStatus();
    }

    const response = await api.getCart();
    renderCart(response.data.cart);
    await loadRecommendations(response.data.cart);
  }

  async function handleQuantityChange(itemId, quantity) {
    try {
      await api.updateCartItem(itemId, { quantity });
      await refreshCart({ preserveStatus: true });
    } catch (error) {
      setStatus(error.message || "Unable to update cart item.", "error");
    }
  }

  async function handleRemove(itemId) {
    try {
      await api.removeCartItem(itemId);
      setStatus("Item removed from your selection.", "success");
      await refreshCart({ preserveStatus: true });
    } catch (error) {
      setStatus(error.message || "Unable to remove cart item.", "error");
    }
  }

  function bindEvents() {
    if (!elements.items) {
      return;
    }

    elements.items.addEventListener("click", async (event) => {
      const itemRoot = event.target.closest("[data-cart-item-id]");

      if (!itemRoot || !state.cart) {
        return;
      }

      const itemId = itemRoot.dataset.cartItemId;
      const item = state.cart.items.find((entry) => entry.id === itemId);

      if (!item) {
        return;
      }

      if (event.target.closest("[data-cart-remove]")) {
        await handleRemove(itemId);
        return;
      }

      if (event.target.closest("[data-cart-decrement]") && item.quantity > 1) {
        await handleQuantityChange(itemId, item.quantity - 1);
        return;
      }

      if (event.target.closest("[data-cart-increment]") && item.quantity < item.availableQuantity) {
        await handleQuantityChange(itemId, item.quantity + 1);
      }
    });
  }

  async function init() {
    bindEvents();

    try {
      await refreshCart();
    } catch (error) {
      renderEmptyState({ itemCount: 0 });
      renderRecommendations([]);
      setStatus(error.message || "Unable to load cart.", "error");
    }
  }

  init();
})(window);
