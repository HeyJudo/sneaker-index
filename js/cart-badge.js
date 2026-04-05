(function attachSneakerIndexCartBadge(global) {
  const api = global.SneakerIndexStoreApi;

  if (!api) {
    return;
  }

  const badges = Array.from(document.querySelectorAll("[data-cart-badge]"));

  if (!badges.length) {
    return;
  }

  function renderCount(itemCount) {
    badges.forEach((badge) => {
      const count = Number.isFinite(itemCount) ? Math.max(0, itemCount) : 0;
      badge.textContent = String(count);
      badge.classList.toggle("hidden", count <= 0);
      badge.setAttribute("aria-hidden", String(count <= 0));
    });
  }

  async function refreshCount() {
    try {
      const response = await api.getCart();
      renderCount(response.data?.cart?.itemCount || 0);
    } catch (_error) {
      renderCount(0);
    }
  }

  global.addEventListener("si:cart-updated", (event) => {
    const nextCount = event.detail?.itemCount;

    if (typeof nextCount === "number") {
      renderCount(nextCount);
      return;
    }

    refreshCount();
  });

  refreshCount();
})(window);
