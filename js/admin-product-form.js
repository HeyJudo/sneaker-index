document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = String(params.get("id") || "").trim();

  const elements = {
    form: document.querySelector("[data-admin-product-form]"),
    name: document.querySelector("[data-admin-product-name]"),
    brand: document.querySelector("[data-admin-product-brand]"),
    category: document.querySelector("[data-admin-product-category]"),
    description: document.querySelector("[data-admin-product-description]"),
    price: document.querySelector("[data-admin-product-price]"),
    compare: document.querySelector("[data-admin-product-compare]"),
    image: document.querySelector("[data-admin-product-image]"),
    colorsContainer: document.querySelector("[data-admin-product-colors]"),
    colorsAdd: document.querySelector("[data-admin-product-color-add]"),
    sizesTbody: document.querySelector("[data-admin-product-sizes]"),
    status: document.querySelector("[data-admin-product-status]"),
    save: document.querySelector("[data-admin-product-save]"),
    cancel: document.querySelector("[data-admin-product-cancel]"),
    title: document.querySelector("main header h2"),
  };

  if (!elements.form || !elements.save) {
    return;
  }

  const state = {
    isFeatured: true,
    isArchived: false,
    isSaving: false,
    hasChanges: false,
  };

  const featuredButtons = Array.from(
    document.querySelectorAll("[data-admin-product-featured-value]")
  );
  const archivedButtons = Array.from(
    document.querySelectorAll("[data-admin-product-archived-value]")
  );

  function setStatus(message) {
    if (elements.status) {
      elements.status.textContent = message;
    }
  }

  function setSaving(isSaving) {
    state.isSaving = isSaving;
    elements.save.disabled = isSaving;
    elements.save.textContent = isSaving ? "Saving..." : "Save Entry";
    elements.save.classList.toggle("opacity-70", isSaving);
    elements.save.classList.toggle("cursor-not-allowed", isSaving);
  }

  function applyToggleState(buttons, value, activeClass = "bg-primary text-white border-primary") {
    buttons.forEach((button) => {
      const buttonValue = button.getAttribute("data-admin-product-featured-value");
      const archivedValue = button.getAttribute("data-admin-product-archived-value");
      const rawValue = buttonValue ?? archivedValue ?? "";
      const isActive = rawValue === String(value);

      if (isActive) {
        button.classList.add(...activeClass.split(" "));
        button.classList.remove("bg-white", "text-on-surface", "border-outline-variant");
      } else {
        button.classList.remove(...activeClass.split(" "));
        button.classList.add("bg-white", "text-on-surface", "border-outline-variant");
      }
    });
  }

  function setFeaturedValue(value) {
    state.isFeatured = Boolean(value);
    applyToggleState(featuredButtons, state.isFeatured ? "true" : "false");
  }

  function setArchivedValue(value) {
    state.isArchived = Boolean(value);
    applyToggleState(archivedButtons, state.isArchived ? "true" : "false");
  }

  function markChanged() {
    state.hasChanges = true;
    setStatus("Unsaved changes detected in draft");
  }

  function buildColorRow(name = "", hex = "#00289C") {
    return `
      <div class="flex items-center gap-6 p-4 bg-white border border-outline-variant/30" data-admin-product-color-row="">
        <div class="w-10 h-10 bg-[#00289c]"></div>
        <div class="flex-1 grid grid-cols-2 gap-4">
          <input class="border-none bg-transparent p-0 text-sm font-label uppercase tracking-wider focus:ring-0" data-admin-product-color-name="" type="text" value="${name.replaceAll('"', "&quot;")}"/>
          <input class="border-none bg-transparent p-0 text-sm font-label text-outline uppercase tracking-wider focus:ring-0" data-admin-product-color-hex="" type="text" value="${hex.replaceAll('"', "&quot;")}"/>
        </div>
        <button class="material-symbols-outlined text-outline hover:text-error transition-colors" data-admin-product-color-delete="" type="button">delete</button>
      </div>
    `;
  }

  function getColorRows() {
    return Array.from(
      elements.colorsContainer?.querySelectorAll("[data-admin-product-color-row]") || []
    );
  }

  function collectColors() {
    return getColorRows()
      .map((row) => {
        const nameInput = row.querySelector("[data-admin-product-color-name]");
        const hexInput = row.querySelector("[data-admin-product-color-hex]");

        return {
          name: String(nameInput?.value || "").trim(),
          hex: String(hexInput?.value || "").trim().toUpperCase(),
        };
      })
      .filter((entry) => entry.name && entry.hex);
  }

  function collectSizes() {
    const rows = Array.from(elements.sizesTbody?.querySelectorAll("tr") || []);

    return rows
      .map((row) => {
        const label = row
          .querySelector("[data-admin-product-size-label]")
          ?.textContent?.trim();
        const sku = row
          .querySelector("[data-admin-product-size-sku]")
          ?.value?.trim();
        const stockRaw = row
          .querySelector("[data-admin-product-size-stock]")
          ?.value;

        const stock = Number(stockRaw);

        return {
          label: label || "",
          sku: sku || "",
          stock: Number.isFinite(stock) && stock >= 0 ? stock : 0,
        };
      })
      .filter((entry) => entry.label && entry.sku);
  }

  function buildPayload() {
    const colors = collectColors();
    const sizes = collectSizes();
    const imageUrl = String(elements.image?.value || "").trim();

    const stockTotal = sizes.reduce((total, item) => total + item.stock, 0);
    const stockStatus = stockTotal <= 0 ? "out-of-stock" : stockTotal < 10 ? "low-stock" : "in-stock";

    return {
      name: String(elements.name?.value || "").trim(),
      brand: String(elements.brand?.value || "").trim(),
      categoryId: String(elements.category?.value || "").trim(),
      description: String(elements.description?.value || "").trim(),
      price: Number(elements.price?.value || 0),
      compareAtPrice: elements.compare?.value ? Number(elements.compare.value) : null,
      images: imageUrl ? [imageUrl] : [],
      heroImage: imageUrl,
      colors,
      sizes,
      stockStatus,
      isFeatured: state.isFeatured,
      isArchived: state.isArchived,
      tags: [],
      rating: 0,
      reviewCount: 0,
      seoTitle: "",
      seoDescription: "",
    };
  }

  function validatePayload(payload) {
    if (!payload.name || !payload.brand || !payload.description || !payload.categoryId) {
      return "Please complete name, brand, category, and description.";
    }

    if (!Number.isFinite(payload.price) || payload.price < 0) {
      return "Price must be a valid non-negative number.";
    }

    if (!payload.images.length) {
      return "Direct image URL is required.";
    }

    if (!payload.colors.length) {
      return "At least one valid color is required.";
    }

    if (!payload.sizes.length) {
      return "At least one valid size row is required.";
    }

    return "";
  }

  async function populateCategories(selectedCategoryId = "") {
    const response = await api.listCategories();
    const categories = response?.data?.categories || [];

    elements.category.innerHTML = [
      '<option value="">Select category</option>',
      ...categories.map(
        (category) =>
          `<option value="${category._id}" ${selectedCategoryId === category._id ? "selected" : ""}>${category.name}</option>`
      ),
    ].join("");
  }

  function applyProduct(product) {
    elements.name.value = product.name || "";
    elements.brand.value = product.brand || "";
    elements.description.value = product.description || "";
    elements.price.value = Number(product.price || 0);
    elements.compare.value = product.compareAtPrice ?? "";
    elements.image.value = product.heroImage || product.images?.[0] || "";

    setFeaturedValue(Boolean(product.isFeatured));
    setArchivedValue(Boolean(product.isArchived));

    const colors = Array.isArray(product.colors) ? product.colors : [];
    const colorRows = colors.length ? colors : [{ name: "", hex: "#00289C" }];
    const existingRows = getColorRows();

    if (existingRows.length) {
      existingRows.forEach((row, index) => {
        if (index === 0) {
          const first = colorRows[0];
          row.querySelector("[data-admin-product-color-name]").value = first.name || "";
          row.querySelector("[data-admin-product-color-hex]").value = first.hex || "#00289C";
          return;
        }

        row.remove();
      });
    }

    colorRows.slice(1).forEach((color) => {
      elements.colorsAdd.insertAdjacentHTML(
        "beforebegin",
        buildColorRow(color.name || "", color.hex || "#00289C")
      );
    });

    const sizes = Array.isArray(product.sizes) ? product.sizes : [];
    const rows = Array.from(elements.sizesTbody.querySelectorAll("tr"));

    rows.forEach((row, index) => {
      const size = sizes[index];

      if (!size) {
        return;
      }

      const labelCell = row.querySelector("[data-admin-product-size-label]");
      const skuInput = row.querySelector("[data-admin-product-size-sku]");
      const stockInput = row.querySelector("[data-admin-product-size-stock]");

      if (labelCell) {
        labelCell.textContent = size.label || "";
      }

      if (skuInput) {
        skuInput.value = size.sku || "";
      }

      if (stockInput) {
        stockInput.value = Number(size.stock || 0);
      }
    });
  }

  async function loadProductIfEditing() {
    if (!productId) {
      return;
    }

    if (elements.title) {
      elements.title.textContent = "Archive Update";
    }

    setStatus("Loading product...");

    const response = await api.adminGetProduct(productId);
    const product = response?.data?.product;

    if (!product) {
      throw new Error("Product not found.");
    }

    await populateCategories(product.categoryId?._id || "");
    applyProduct(product);
    state.hasChanges = false;
    setStatus("Editing existing product");
  }

  async function submitProduct() {
    if (state.isSaving) {
      return;
    }

    const payload = buildPayload();
    const validationError = validatePayload(payload);

    if (validationError) {
      setStatus(validationError);
      return;
    }

    setSaving(true);
    setStatus(productId ? "Updating entry..." : "Creating entry...");

    try {
      const response = productId
        ? await api.adminUpdateProduct(productId, payload)
        : await api.adminCreateProduct(payload);

      const saved = response?.data?.product;
      state.hasChanges = false;
      setStatus(productId ? "Entry updated successfully." : "Entry created successfully.");

      if (!productId && saved?._id) {
        window.location.href = `admin-product-form.html?id=${encodeURIComponent(saved._id)}`;
      }
    } catch (error) {
      setStatus(error.message || "Failed to save entry.");
    } finally {
      setSaving(false);
    }
  }

  elements.form.addEventListener("input", markChanged);
  elements.form.addEventListener("change", markChanged);

  featuredButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setFeaturedValue(button.getAttribute("data-admin-product-featured-value") === "true");
      markChanged();
    });
  });

  archivedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setArchivedValue(button.getAttribute("data-admin-product-archived-value") === "true");
      markChanged();
    });
  });

  elements.colorsAdd?.addEventListener("click", () => {
    elements.colorsAdd.insertAdjacentHTML("beforebegin", buildColorRow());
    markChanged();
  });

  elements.colorsContainer?.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-admin-product-color-delete]");

    if (!removeButton) {
      return;
    }

    const rows = getColorRows();
    if (rows.length <= 1) {
      const first = rows[0];
      if (first) {
        first.querySelector("[data-admin-product-color-name]").value = "";
        first.querySelector("[data-admin-product-color-hex]").value = "#00289C";
      }
      markChanged();
      return;
    }

    removeButton.closest("[data-admin-product-color-row]")?.remove();
    markChanged();
  });

  elements.save.addEventListener("click", submitProduct);

  elements.cancel?.addEventListener("click", () => {
    if (state.hasChanges && !window.confirm("Discard unsaved changes?")) {
      return;
    }

    window.location.href = "admin-products.html";
  });

  window.addEventListener("beforeunload", (event) => {
    if (!state.hasChanges || state.isSaving) {
      return;
    }

    event.preventDefault();
    event.returnValue = "";
  });

  setFeaturedValue(true);
  setArchivedValue(false);

  populateCategories()
    .then(() => loadProductIfEditing())
    .catch((error) => {
      setStatus(error.message || "Failed to load form data.");
    });
});
