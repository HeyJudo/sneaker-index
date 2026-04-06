document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

  const elements = {
    search: document.querySelector("[data-admin-products-search]"),
    createButton: document.querySelector("[data-admin-products-new]"),
    category: document.querySelector("[data-admin-products-category]"),
    brand: document.querySelector("[data-admin-products-brand]"),
    stock: document.querySelector("[data-admin-products-stock]"),
    featured: document.querySelector("[data-admin-products-featured]"),
    tbody: document.querySelector("[data-admin-products-tbody]"),
    count: document.querySelector("[data-admin-products-count]"),
    prev: document.querySelector("[data-admin-products-prev]"),
    next: document.querySelector("[data-admin-products-next]"),
    page: document.querySelector("[data-admin-products-page]"),
  };

  if (!elements.tbody) {
    return;
  }

  const state = {
    page: 1,
    limit: 12,
    totalPages: 1,
    total: 0,
    search: "",
    category: "",
    brand: "",
    stockStatus: "",
    isFeatured: "",
    isLoading: false,
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
    const amount = Number(value) || 0;
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  function getProductStock(product) {
    if (!Array.isArray(product.sizes)) {
      return 0;
    }

    return product.sizes.reduce((total, size) => total + (Number(size.stock) || 0), 0);
  }

  function getStockBadge(product) {
    const stock = getProductStock(product);

    if (product.stockStatus === "out-of-stock" || stock <= 0) {
      return '<span class="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-1 border border-red-100">OUT OF STOCK</span>';
    }

    if (product.stockStatus === "low-stock" || stock < 10) {
      return `<span class="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 border border-amber-100">LOW STOCK (${stock})</span>`;
    }

    return `<span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 border border-emerald-100">${stock} IN STOCK</span>`;
  }

  function buildRow(product) {
    const categoryName = product.categoryId?.name || "Uncategorized";
    const image = product.heroImage || product.images?.[0] || "";
    const primarySku = product.sizes?.[0]?.sku || "N/A";

    return `
      <tr class="hover:bg-slate-50/50 transition-colors group" data-product-row-id="${escapeHtml(product._id)}">
        <td class="px-6 py-4">
          <input class="border-slate-300 text-primary focus:ring-primary" type="checkbox" />
        </td>
        <td class="px-6 py-4">
          <div class="w-16 h-16 bg-surface-container-low flex items-center justify-center p-2 group-hover:shadow-[inset_0_0_0_2px_#1a3fc4]">
            ${image ? `<img alt="${escapeHtml(product.name)}" class="w-full h-full object-contain" src="${escapeHtml(image)}" />` : ""}
          </div>
        </td>
        <td class="px-6 py-4">
          <p class="text-sm font-bold text-slate-900 tracking-tight">${escapeHtml(product.name)}</p>
          <p class="text-[10px] text-slate-400 font-mono mt-1">SKU: ${escapeHtml(primarySku)}</p>
          <p class="text-[10px] text-slate-400 font-mono">${escapeHtml(product.slug || "")}</p>
        </td>
        <td class="px-6 py-4">
          <span class="text-[11px] font-semibold text-slate-600">${escapeHtml(product.brand)}</span>
        </td>
        <td class="px-6 py-4">
          <span class="text-[11px] text-slate-500 uppercase tracking-wider">${escapeHtml(categoryName)}</span>
        </td>
        <td class="px-6 py-4 text-right">
          <span class="text-sm font-bold text-primary">${formatPrice(product.price)}</span>
        </td>
        <td class="px-6 py-4">
          ${getStockBadge(product)}
        </td>
        <td class="px-6 py-4">
          <span class="${product.isFeatured ? "bg-primary-container text-white" : "bg-slate-200 text-slate-500"} text-[9px] font-bold px-2 py-0.5">${product.isFeatured ? "YES" : "NO"}</span>
          ${product.isArchived ? '<span class="ml-2 bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5">ARCHIVED</span>' : ""}
        </td>
        <td class="px-6 py-4 text-right">
          <div class="inline-flex items-center gap-2">
            <button class="text-xs uppercase tracking-widest text-primary hover:underline" data-product-action="edit" data-product-id="${escapeHtml(product._id)}">Edit</button>
            <button class="text-xs uppercase tracking-widest text-amber-700 hover:underline" data-product-action="archive" data-product-id="${escapeHtml(product._id)}" data-product-archived="${product.isArchived ? "true" : "false"}">${product.isArchived ? "Restore" : "Archive"}</button>
            <button class="text-xs uppercase tracking-widest text-red-700 hover:underline" data-product-action="delete" data-product-id="${escapeHtml(product._id)}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }

  function setLoadingRow() {
    elements.tbody.innerHTML = `
      <tr>
        <td class="px-6 py-8 text-sm text-slate-500" colspan="9">Loading products...</td>
      </tr>
    `;
  }

  function setEmptyRow(message) {
    elements.tbody.innerHTML = `
      <tr>
        <td class="px-6 py-8 text-sm text-slate-500" colspan="9">${escapeHtml(message)}</td>
      </tr>
    `;
  }

  function updateCountText() {
    if (!elements.count) {
      return;
    }

    if (state.total === 0) {
      elements.count.textContent = "No products found";
      return;
    }

    const start = (state.page - 1) * state.limit + 1;
    const end = Math.min(state.page * state.limit, state.total);
    elements.count.textContent = `Showing ${start} to ${end} of ${state.total} results`;
  }

  function updatePagination() {
    if (elements.page) {
      elements.page.textContent = String(state.page);
    }

    if (elements.prev) {
      elements.prev.disabled = state.page <= 1 || state.isLoading;
      elements.prev.classList.toggle("opacity-40", elements.prev.disabled);
    }

    if (elements.next) {
      elements.next.disabled = state.page >= state.totalPages || state.isLoading;
      elements.next.classList.toggle("opacity-40", elements.next.disabled);
    }
  }

  async function loadProducts() {
    state.isLoading = true;
    updatePagination();
    setLoadingRow();

    try {
      const response = await api.adminListProducts({
        page: state.page,
        limit: state.limit,
        search: state.search,
        category: state.category,
        brand: state.brand,
        stockStatus: state.stockStatus,
        isFeatured: state.isFeatured,
      });

      const products = response?.data?.products || [];
      const pagination = response?.data?.pagination || {};

      state.total = Number(pagination.total || 0);
      state.totalPages = Math.max(1, Number(pagination.totalPages || 1));

      if (!products.length) {
        setEmptyRow("No products matched your filters.");
      } else {
        elements.tbody.innerHTML = products.map(buildRow).join("");
      }

      updateCountText();
      updatePagination();
    } catch (error) {
      setEmptyRow(error.message || "Failed to load products.");
      if (elements.count) {
        elements.count.textContent = "Failed to load inventory";
      }
    } finally {
      state.isLoading = false;
      updatePagination();
    }
  }

  function normalizeOptionValue(value) {
    if (value === "ALL" || value === "ALL BRANDS" || value === "ALL CATEGORIES") {
      return "";
    }

    return String(value || "").trim();
  }

  async function hydrateFilters() {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        api.listCategories(),
        api.adminListProducts({ page: 1, limit: 100 }),
      ]);

      const categories = categoriesRes?.data?.categories || [];
      const brands = Array.from(
        new Set((productsRes?.data?.products || []).map((product) => product.brand).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));

      if (elements.category) {
        elements.category.innerHTML = [
          '<option value="">CATEGORY: ALL</option>',
          ...categories.map(
            (category) =>
              `<option value="${escapeHtml(category.slug)}">${escapeHtml(
                category.name.toUpperCase()
              )}</option>`
          ),
        ].join("");
      }

      if (elements.brand) {
        elements.brand.innerHTML = [
          '<option value="">BRAND: ALL</option>',
          ...brands.map(
            (brand) => `<option value="${escapeHtml(brand)}">${escapeHtml(brand.toUpperCase())}</option>`
          ),
        ].join("");
      }

      if (elements.stock) {
        elements.stock.innerHTML = `
          <option value="">STOCK: ALL</option>
          <option value="in-stock">IN STOCK</option>
          <option value="low-stock">LOW STOCK</option>
          <option value="out-of-stock">OUT OF STOCK</option>
          <option value="preorder">PREORDER</option>
        `;
      }

      if (elements.featured) {
        elements.featured.innerHTML = `
          <option value="">FEATURED: ALL</option>
          <option value="true">YES</option>
          <option value="false">NO</option>
        `;
      }
    } catch (_error) {
      // Fallback to existing static options.
    }
  }

  function handleTableActions(event) {
    const target = event.target.closest("[data-product-action]");

    if (!target) {
      return;
    }

    const action = target.getAttribute("data-product-action");
    const productId = target.getAttribute("data-product-id");

    if (!productId) {
      return;
    }

    if (action === "edit") {
      window.location.href = `admin-product-form.html?id=${encodeURIComponent(productId)}`;
      return;
    }

    if (action === "archive") {
      const archived = target.getAttribute("data-product-archived") === "true";
      const verb = archived ? "restore" : "archive";

      if (!window.confirm(`Are you sure you want to ${verb} this product?`)) {
        return;
      }

      api
        .adminArchiveProduct(productId, !archived)
        .then(() => loadProducts())
        .catch((error) => {
          window.alert(error.message || "Unable to update product state.");
        });

      return;
    }

    if (action === "delete") {
      if (!window.confirm("Delete this product permanently? This cannot be undone.")) {
        return;
      }

      api
        .adminDeleteProduct(productId)
        .then(() => loadProducts())
        .catch((error) => {
          window.alert(error.message || "Unable to delete product.");
        });
    }
  }

  let searchTimer = null;

  elements.search?.addEventListener("input", (event) => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.search = String(event.target.value || "").trim();
      state.page = 1;
      loadProducts();
    }, 250);
  });

  elements.createButton?.addEventListener("click", () => {
    window.location.href = "admin-product-form.html";
  });

  elements.category?.addEventListener("change", (event) => {
    state.category = normalizeOptionValue(event.target.value);
    state.page = 1;
    loadProducts();
  });

  elements.brand?.addEventListener("change", (event) => {
    state.brand = normalizeOptionValue(event.target.value);
    state.page = 1;
    loadProducts();
  });

  elements.stock?.addEventListener("change", (event) => {
    state.stockStatus = normalizeOptionValue(event.target.value);
    state.page = 1;
    loadProducts();
  });

  elements.featured?.addEventListener("change", (event) => {
    state.isFeatured = normalizeOptionValue(event.target.value);
    state.page = 1;
    loadProducts();
  });

  elements.prev?.addEventListener("click", () => {
    if (state.page <= 1) {
      return;
    }

    state.page -= 1;
    loadProducts();
  });

  elements.next?.addEventListener("click", () => {
    if (state.page >= state.totalPages) {
      return;
    }

    state.page += 1;
    loadProducts();
  });

  elements.tbody.addEventListener("click", handleTableActions);

  hydrateFilters().finally(() => {
    loadProducts();
  });
});
