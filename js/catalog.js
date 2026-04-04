(function attachCatalogPage(global) {
  const api = global.SneakerIndexStoreApi;

  if (!api) {
    return;
  }

  const elements = {
    app: document.querySelector("[data-catalog-app]"),
    searchForm: document.querySelector("[data-catalog-search-form]"),
    searchInput: document.querySelector("[data-catalog-search-input]"),
    categoryList: document.querySelector("[data-catalog-categories]"),
    brandList: document.querySelector("[data-catalog-brands]"),
    minPriceInput: document.querySelector("[data-catalog-min-price]"),
    maxPriceInput: document.querySelector("[data-catalog-max-price]"),
    priceHint: document.querySelector("[data-catalog-price-hint]"),
    applyButton: document.querySelector("[data-catalog-apply]"),
    resetButton: document.querySelector("[data-catalog-reset]"),
    sortSelect: document.querySelector("[data-catalog-sort]"),
    resultLabel: document.querySelector("[data-catalog-results]"),
    rangeLabel: document.querySelector("[data-catalog-range]"),
    grid: document.querySelector("[data-catalog-grid]"),
    gridStatus: document.querySelector("[data-catalog-grid-status]"),
    actionStatus: document.querySelector("[data-catalog-action-status]"),
    pagination: document.querySelector("[data-catalog-pagination]"),
  };

  if (!elements.app) {
    return;
  }

  const state = {
    page: 1,
    limit: 9,
    search: "",
    category: "",
    brands: [],
    minPrice: "",
    maxPrice: "",
    sort: "featured",
  };

  const meta = {
    categories: [],
    brands: [],
    priceRange: {
      min: 0,
      max: 0,
    },
  };

  let latestPagination = {
    page: 1,
    limit: state.limit,
    total: 0,
    totalPages: 1,
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
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  function formatCount(count) {
    return new Intl.NumberFormat("en-US").format(count || 0);
  }

  function getStockTone(stockStatus) {
    switch (stockStatus) {
      case "low-stock":
        return {
          label: "Low Stock",
          className: "text-[#ba1a1a]",
        };
      case "out-of-stock":
        return {
          label: "Sold Out",
          className: "text-slate-400",
        };
      case "preorder":
        return {
          label: "Preorder",
          className: "text-primary",
        };
      default:
        return {
          label: "Available Now",
          className: "text-primary",
        };
    }
  }

  function getProductLink(product) {
    return `product.html?slug=${encodeURIComponent(product.slug)}`;
  }

  function getDefaultCartSelection(product) {
    return {
      color: product.colors[0] || null,
      size: product.sizes.find((size) => size.stock > 0) || null,
    };
  }

  function buildProductQuery() {
    return {
      page: state.page,
      limit: state.limit,
      sort: state.sort === "featured" ? "" : state.sort,
      category: state.category,
      search: state.search,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      brand: state.brands,
    };
  }

  function syncUrl() {
    const params = new URLSearchParams();

    if (state.page > 1) {
      params.set("page", String(state.page));
    }

    if (state.search) {
      params.set("search", state.search);
    }

    if (state.category) {
      params.set("category", state.category);
    }

    if (state.minPrice) {
      params.set("minPrice", state.minPrice);
    }

    if (state.maxPrice) {
      params.set("maxPrice", state.maxPrice);
    }

    if (state.sort && state.sort !== "featured") {
      params.set("sort", state.sort);
    }

    state.brands.forEach((brand) => params.append("brand", brand));

    const query = params.toString();
    const nextUrl = `${global.location.pathname}${query ? `?${query}` : ""}`;
    global.history.replaceState({}, "", nextUrl);
  }

  function hydrateStateFromUrl() {
    const params = new URLSearchParams(global.location.search);
    const page = Number.parseInt(params.get("page"), 10);
    const minPrice = params.get("minPrice") || "";
    const maxPrice = params.get("maxPrice") || "";
    const brands = params.getAll("brand").filter(Boolean);

    state.page = Number.isNaN(page) || page < 1 ? 1 : page;
    state.search = params.get("search") || "";
    state.category = params.get("category") || "";
    state.minPrice = minPrice;
    state.maxPrice = maxPrice;
    state.sort = params.get("sort") || "featured";
    state.brands = brands;
  }

  function syncFilterControls() {
    if (elements.searchInput) {
      elements.searchInput.value = state.search;
    }

    if (elements.minPriceInput) {
      elements.minPriceInput.value = state.minPrice;
    }

    if (elements.maxPriceInput) {
      elements.maxPriceInput.value = state.maxPrice;
    }

    if (elements.sortSelect) {
      elements.sortSelect.value = state.sort;
    }

    if (elements.priceHint) {
      elements.priceHint.textContent = `${formatPrice(meta.priceRange.min)} - ${formatPrice(meta.priceRange.max)}`;
    }
  }

  function renderCategories() {
    if (!elements.categoryList) {
      return;
    }

    const buttons = [
      {
        slug: "",
        name: "All Footwear",
      },
      ...meta.categories.map((category) => ({
        slug: category.slug,
        name: category.name,
      })),
    ];

    elements.categoryList.innerHTML = buttons
      .map((category) => {
        const isActive = category.slug === state.category;
        const buttonClass = isActive
          ? "text-primary font-bold"
          : "text-slate-600 hover:text-primary";

        return `
          <button class="flex justify-between items-center ${buttonClass} text-sm uppercase transition-transform duration-300 hover:translate-x-1" data-category-slug="${escapeHtml(category.slug)}" type="button">
            <span>${escapeHtml(category.name)}</span>
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        `;
      })
      .join("");
  }

  function renderBrands() {
    if (!elements.brandList) {
      return;
    }

    elements.brandList.innerHTML = meta.brands
      .map((brand) => {
        const checked = state.brands.includes(brand.name) ? "checked" : "";
        const tone = checked ? "font-bold text-primary" : "";

        return `
          <label class="flex items-center gap-3 cursor-pointer group">
            <input class="w-4 h-4 border-2 border-slate-300 text-primary focus:ring-0 rounded-none" data-brand-name="${escapeHtml(brand.name)}" type="checkbox" ${checked}>
            <span class="text-xs uppercase tracking-wide group-hover:text-primary ${tone}">${escapeHtml(brand.name)} <span class="text-slate-400">(${brand.count})</span></span>
          </label>
        `;
      })
      .join("");
  }

  function renderProductGrid(products) {
    if (!elements.grid || !elements.gridStatus) {
      return;
    }

    elements.gridStatus.classList.add("hidden");

    if (!products.length) {
      elements.grid.innerHTML = "";
      elements.gridStatus.classList.remove("hidden");
      elements.gridStatus.innerHTML = `
        <div class="bg-surface-container-lowest border border-black/5 p-12 text-center">
          <p class="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">No Matches</p>
          <h3 class="font-headline text-4xl uppercase mt-4">Refine The Vault</h3>
          <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
            No products matched the current filters. Adjust category, brand, price, or search terms to continue browsing.
          </p>
        </div>
      `;
      return;
    }

    elements.grid.innerHTML = products
      .map((product) => {
        const visibleSizes = product.sizes.slice(0, 3);
        const visibleColors = product.colors.slice(0, 4);
        const stockTone = getStockTone(product.stockStatus);
        const defaultSelection = getDefaultCartSelection(product);
        const canAddToCart =
          Boolean(defaultSelection.size && defaultSelection.color) &&
          product.stockStatus !== "out-of-stock" &&
          product.stockStatus !== "preorder";
        const compareMarkup = product.compareAtPrice
          ? `<span class="text-sm font-label uppercase tracking-widest text-slate-400 line-through">${formatPrice(product.compareAtPrice)}</span>`
          : "";
        const addButtonClass = canAddToCart
          ? "bg-on-surface text-white px-6 py-3 flex items-center gap-3 hover:bg-primary transition-colors"
          : "bg-on-surface text-white px-6 py-3 flex items-center gap-3 opacity-70 cursor-not-allowed";

        return `
          <article class="bg-surface-container-lowest group relative transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-black/5 hover:border-primary">
            <a class="block" href="${escapeHtml(getProductLink(product))}">
              <div class="p-6 flex justify-between items-start gap-4">
                <div>
                  <p class="font-label uppercase text-[10px] tracking-widest text-slate-400">${escapeHtml(product.brand)}</p>
                  <h3 class="font-headline text-lg uppercase leading-tight">${escapeHtml(product.name)}</h3>
                  <p class="font-label uppercase text-[10px] tracking-[0.2em] mt-2 ${stockTone.className}">${escapeHtml(stockTone.label)}</p>
                </div>
                <div class="text-right">
                  <span class="font-headline text-2xl text-primary">${formatPrice(product.price)}</span>
                  ${compareMarkup}
                </div>
              </div>
              <div class="flex gap-2 px-6 mb-6">
                ${visibleColors
                  .map(
                    (color, index) => `
                      <span class="w-3 h-3 border border-white/60" style="background:${escapeHtml(color.hex)};${index === 0 ? "box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #00289c;" : ""}" title="${escapeHtml(color.name)}"></span>
                    `
                  )
                  .join("")}
              </div>
              <div class="relative aspect-square overflow-hidden cobalt-grade bg-white">
                <img alt="${escapeHtml(product.name)}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" src="${escapeHtml(product.heroImage || product.images[0] || "")}">
              </div>
            </a>
            <div class="p-6">
              <div class="flex gap-2 mb-6">
                ${visibleSizes
                  .map((size) => {
                    const sizeClass =
                      size.stock > 0
                        ? "border-slate-200 hover:border-primary hover:text-primary"
                        : "border-slate-100 text-slate-300";

                    return `<span class="w-10 h-10 border flex items-center justify-center text-xs font-bold transition-colors ${sizeClass}">${escapeHtml(size.label)}</span>`;
                  })
                  .join("")}
              </div>
              <div class="flex justify-between items-center">
                <button class="text-slate-400 transition-colors opacity-60 cursor-not-allowed" type="button" aria-label="Wishlist coming soon" disabled>
                  <span class="material-symbols-outlined">favorite</span>
                </button>
                <button
                  class="${addButtonClass}"
                  type="button"
                  data-cart-add
                  data-product-id="${escapeHtml(product._id)}"
                  data-size-label="${escapeHtml(defaultSelection.size?.label || "")}"
                  data-color-name="${escapeHtml(defaultSelection.color?.name || "")}"
                  ${canAddToCart ? "" : "disabled"}
                >
                  <span class="material-symbols-outlined text-sm">shopping_bag</span>
                  <span class="font-label uppercase text-[10px] tracking-widest font-bold">${canAddToCart ? "Add" : "Unavailable"}</span>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderPagination(pagination) {
    if (!elements.pagination) {
      return;
    }

    if (pagination.totalPages <= 1) {
      elements.pagination.innerHTML = "";
      return;
    }

    const pageButtons = [];

    for (let page = 1; page <= pagination.totalPages; page += 1) {
      const isActive = page === pagination.page;
      const className = isActive
        ? "bg-primary text-white"
        : "border border-slate-200 hover:border-primary hover:text-primary";

      pageButtons.push(`
        <button class="w-12 h-12 flex items-center justify-center transition-all font-bold ${className}" data-page="${page}" type="button">
          ${page}
        </button>
      `);
    }

    const nextDisabled = pagination.page >= pagination.totalPages ? "disabled opacity-40 cursor-not-allowed" : "border border-slate-200 hover:border-primary hover:text-primary";

    pageButtons.push(`
      <button class="w-12 h-12 flex items-center justify-center transition-all ${nextDisabled}" data-page="${pagination.page + 1}" type="button" ${pagination.page >= pagination.totalPages ? "disabled" : ""}>
        <span class="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    `);

    elements.pagination.innerHTML = pageButtons.join("");
  }

  function renderSummary(pagination) {
    if (elements.resultLabel) {
      elements.resultLabel.textContent = `${formatCount(pagination.total)} pieces available`;
    }

    if (elements.rangeLabel) {
      if (!pagination.total) {
        elements.rangeLabel.textContent = "Showing 0 results";
        return;
      }

      const rangeStart = (pagination.page - 1) * pagination.limit + 1;
      const rangeEnd = Math.min(pagination.page * pagination.limit, pagination.total);

      elements.rangeLabel.textContent = `Showing ${formatCount(rangeStart)}-${formatCount(rangeEnd)} of ${formatCount(pagination.total)}`;
    }
  }

  function setLoadingState() {
    if (elements.grid) {
      elements.grid.innerHTML = "";
    }

    if (elements.gridStatus) {
      elements.gridStatus.classList.remove("hidden");
      elements.gridStatus.innerHTML = `
        <div class="bg-surface-container-lowest border border-black/5 p-12 text-center">
          <p class="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">Loading</p>
          <h3 class="font-headline text-4xl uppercase mt-4">Refreshing The Vault</h3>
          <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
            Pulling curated product data from the archive.
          </p>
        </div>
      `;
    }
  }

  function setErrorState(message) {
    if (!elements.gridStatus) {
      return;
    }

    elements.gridStatus.classList.remove("hidden");
    elements.gridStatus.innerHTML = `
      <div class="bg-surface-container-lowest border border-black/5 p-12 text-center">
        <p class="font-label uppercase tracking-[0.3em] text-[10px] text-[#ba1a1a] font-bold">Unavailable</p>
        <h3 class="font-headline text-4xl uppercase mt-4">Catalog Offline</h3>
        <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
          ${escapeHtml(message || "The catalog could not be loaded.")}
        </p>
      </div>
    `;
  }

  async function loadMeta() {
    const [categoriesResponse, facetsResponse] = await Promise.all([
      api.getCategories(),
      api.getProductFacets(),
    ]);

    meta.categories = categoriesResponse.data.categories || [];
    meta.brands = facetsResponse.data.brands || [];
    meta.priceRange = facetsResponse.data.priceRange || meta.priceRange;

    renderCategories();
    renderBrands();
    syncFilterControls();
  }

  async function loadProducts() {
    setLoadingState();
    syncUrl();

    const response = await api.getProducts(buildProductQuery());
    const { products, pagination } = response.data;

    latestPagination = pagination;
    renderProductGrid(products);
    renderSummary(pagination);
    renderPagination(pagination);
  }

  function readFiltersFromControls() {
    state.search = elements.searchInput ? elements.searchInput.value.trim() : "";
    state.minPrice = elements.minPriceInput ? elements.minPriceInput.value.trim() : "";
    state.maxPrice = elements.maxPriceInput ? elements.maxPriceInput.value.trim() : "";

    if (elements.brandList) {
      state.brands = Array.from(
        elements.brandList.querySelectorAll("input[type='checkbox']:checked")
      ).map((input) => input.dataset.brandName || "");
    }
  }

  function setActionStatus(message, tone) {
    if (!elements.actionStatus) {
      return;
    }

    const className =
      tone === "error"
        ? "bg-error-container text-on-error-container"
        : "bg-secondary-fixed text-on-secondary-fixed";

    elements.actionStatus.className = `mb-8 border border-black/5 p-4 text-xs uppercase tracking-[0.2em] font-bold ${className}`;
    elements.actionStatus.textContent = message;
    elements.actionStatus.classList.remove("hidden");
  }

  function clearActionStatus() {
    if (!elements.actionStatus) {
      return;
    }

    elements.actionStatus.classList.add("hidden");
    elements.actionStatus.textContent = "";
  }

  async function refreshCatalog() {
    try {
      clearActionStatus();
      await loadProducts();
    } catch (error) {
      setErrorState(error.message);
      if (elements.resultLabel) {
        elements.resultLabel.textContent = "Catalog unavailable";
      }
      if (elements.rangeLabel) {
        elements.rangeLabel.textContent = "Check the API connection";
      }
      if (elements.pagination) {
        elements.pagination.innerHTML = "";
      }
    }
  }

  function bindEvents() {
    if (elements.searchForm) {
      elements.searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        readFiltersFromControls();
        state.page = 1;
        await refreshCatalog();
      });
    }

    if (elements.categoryList) {
      elements.categoryList.addEventListener("click", async (event) => {
        const trigger = event.target.closest("[data-category-slug]");

        if (!trigger) {
          return;
        }

        state.category = trigger.dataset.categorySlug || "";
        state.page = 1;
        renderCategories();
        await refreshCatalog();
      });
    }

    if (elements.sortSelect) {
      elements.sortSelect.addEventListener("change", async () => {
        state.sort = elements.sortSelect.value;
        state.page = 1;
        await refreshCatalog();
      });
    }

    if (elements.applyButton) {
      elements.applyButton.addEventListener("click", async () => {
        readFiltersFromControls();
        state.page = 1;
        await refreshCatalog();
      });
    }

    if (elements.resetButton) {
      elements.resetButton.addEventListener("click", async () => {
        state.page = 1;
        state.search = "";
        state.category = "";
        state.brands = [];
        state.minPrice = "";
        state.maxPrice = "";
        state.sort = "featured";
        syncFilterControls();
        renderCategories();
        renderBrands();
        await refreshCatalog();
      });
    }

    if (elements.brandList) {
      elements.brandList.addEventListener("change", async () => {
        readFiltersFromControls();
        state.page = 1;
        renderBrands();
        await refreshCatalog();
      });
    }

    if (elements.pagination) {
      elements.pagination.addEventListener("click", async (event) => {
        const trigger = event.target.closest("[data-page]");

        if (!trigger) {
          return;
        }

        const nextPage = Number.parseInt(trigger.dataset.page || "", 10);

        if (Number.isNaN(nextPage) || nextPage < 1 || nextPage > latestPagination.totalPages) {
          return;
        }

        state.page = nextPage;
        await refreshCatalog();
      });
    }

    if (elements.grid) {
      elements.grid.addEventListener("click", async (event) => {
        const trigger = event.target.closest("[data-cart-add]");

        if (!trigger || trigger.disabled) {
          return;
        }

        const label = trigger.querySelector(".font-label");
        const originalLabel = label ? label.textContent : "";

        trigger.disabled = true;

        if (label) {
          label.textContent = "Adding";
        }

        try {
          await api.addCartItem({
            productId: trigger.dataset.productId,
            sizeLabel: trigger.dataset.sizeLabel,
            colorName: trigger.dataset.colorName,
            quantity: 1,
          });

          if (label) {
            label.textContent = "Added";
          }

          setActionStatus("Added to cart. Your selection is ready in the cart.", "success");

          global.setTimeout(() => {
            trigger.disabled = false;
            if (label) {
              label.textContent = originalLabel;
            }
          }, 1200);
        } catch (error) {
          if (label) {
            label.textContent = originalLabel || "Add";
          }

          trigger.disabled = false;
          setActionStatus(error.message || "Unable to add this product to cart.", "error");
        }
      });
    }
  }

  async function init() {
    hydrateStateFromUrl();
    bindEvents();

    try {
      await loadMeta();
      await loadProducts();
    } catch (error) {
      setErrorState(error.message);
      if (elements.resultLabel) {
        elements.resultLabel.textContent = "Catalog unavailable";
      }
      if (elements.rangeLabel) {
        elements.rangeLabel.textContent = "Check the API connection";
      }
    }
  }

  init();
})(window);
