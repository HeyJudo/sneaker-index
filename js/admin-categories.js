document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

  const elements = {
    search: document.querySelector("[data-admin-categories-search]"),
    feedback: document.querySelector("[data-admin-categories-feedback]"),
    total: document.querySelector("[data-admin-categories-total]"),
    active: document.querySelector("[data-admin-categories-active]"),
    hidden: document.querySelector("[data-admin-categories-hidden]"),
    formTitle: document.querySelector("[data-admin-categories-form-title]"),
    form: document.querySelector("[data-admin-categories-form]"),
    id: document.querySelector("[data-admin-categories-id]"),
    name: document.querySelector("[data-admin-categories-name]"),
    slug: document.querySelector("[data-admin-categories-slug]"),
    order: document.querySelector("[data-admin-categories-order]"),
    visibilityButtons: Array.from(
      document.querySelectorAll("[data-admin-categories-visibility]")
    ),
    save: document.querySelector("[data-admin-categories-save]"),
    reset: document.querySelector("[data-admin-categories-reset]"),
    tbody: document.querySelector("[data-admin-categories-tbody]"),
  };

  if (!elements.form || !elements.tbody) {
    return;
  }

  const state = {
    categories: [],
    search: "",
    editingId: "",
    isActive: true,
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

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function setFeedback(message, tone = "info") {
    if (!elements.feedback) {
      return;
    }

    if (!message) {
      elements.feedback.classList.add("hidden");
      elements.feedback.textContent = "";
      elements.feedback.className =
        "hidden border px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold";
      return;
    }

    const toneClass =
      tone === "error"
        ? "border-error bg-error-container text-on-error-container"
        : tone === "success"
          ? "border-primary bg-primary-fixed text-primary"
          : "border-outline-variant bg-surface-container-low text-on-surface-variant";

    elements.feedback.className = `border px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold ${toneClass}`;
    elements.feedback.textContent = message;
  }

  function updateVisibilityButtons() {
    elements.visibilityButtons.forEach((button) => {
      const value = button.dataset.adminCategoriesVisibility;
      const isCurrent = (value === "active") === state.isActive;
      button.className = isCurrent
        ? "flex-1 py-3 bg-primary text-white font-lato text-[10px] font-bold uppercase tracking-widest"
        : "flex-1 py-3 bg-white text-on-surface-variant hover:bg-slate-50 font-lato text-[10px] font-bold uppercase tracking-widest";
    });
  }

  function resetForm() {
    state.editingId = "";
    state.isActive = true;
    if (elements.id) {
      elements.id.value = "";
    }
    if (elements.name) {
      elements.name.value = "";
    }
    if (elements.slug) {
      elements.slug.value = "";
    }
    if (elements.order) {
      elements.order.value = "0";
    }
    if (elements.formTitle) {
      elements.formTitle.textContent = "ADD NEW CATEGORY";
    }
    if (elements.save) {
      elements.save.textContent = "SAVE CATEGORY";
    }
    updateVisibilityButtons();
  }

  function setFormForEdit(category) {
    state.editingId = category.id;
    state.isActive = category.isActive !== false;
    if (elements.id) {
      elements.id.value = category.id;
    }
    if (elements.name) {
      elements.name.value = category.name || "";
    }
    if (elements.slug) {
      elements.slug.value = category.slug || "";
    }
    if (elements.order) {
      elements.order.value = String(Number(category.sortOrder || 0));
    }
    if (elements.formTitle) {
      elements.formTitle.textContent = "EDIT CATEGORY";
    }
    if (elements.save) {
      elements.save.textContent = "UPDATE CATEGORY";
    }
    updateVisibilityButtons();
  }

  function getFilteredCategories() {
    if (!state.search) {
      return state.categories;
    }

    const needle = state.search.toLowerCase();
    return state.categories.filter((category) => {
      return (
        String(category.name || "").toLowerCase().includes(needle) ||
        String(category.slug || "").toLowerCase().includes(needle)
      );
    });
  }

  function renderStats(categories) {
    if (elements.total) {
      elements.total.textContent = String(categories.length);
    }
    if (elements.active) {
      elements.active.textContent = String(categories.filter((entry) => entry.isActive).length);
    }
    if (elements.hidden) {
      elements.hidden.textContent = String(categories.filter((entry) => !entry.isActive).length);
    }
  }

  function renderTable() {
    const categories = getFilteredCategories();

    if (!categories.length) {
      elements.tbody.innerHTML = `
        <tr>
          <td class="px-6 py-8 text-sm text-on-surface-variant" colspan="6">No categories found.</td>
        </tr>
      `;
      return;
    }

    elements.tbody.innerHTML = categories
      .map((category) => {
        const statusClass = category.isActive
          ? "bg-secondary text-white"
          : "bg-error text-white";
        const statusLabel = category.isActive ? "ACTIVE" : "HIDDEN";

        return `
          <tr class="hover:bg-surface-container-low transition-colors group" data-admin-category-id="${escapeHtml(category.id)}">
            <td class="px-6 py-5 font-bebas text-xl tracking-wide">${escapeHtml(category.name)}</td>
            <td class="px-6 py-5 text-on-surface-variant">${escapeHtml(category.slug)}</td>
            <td class="px-6 py-5">
              <span class="inline-block px-3 py-1 ${statusClass} text-[9px] font-bold uppercase tracking-widest">${statusLabel}</span>
            </td>
            <td class="px-6 py-5 text-center font-bebas text-xl">${Number(category.productCount || 0)}</td>
            <td class="px-6 py-5 text-center font-bebas text-xl">${String(Number(category.sortOrder || 0)).padStart(2, "0")}</td>
            <td class="px-6 py-5 text-right space-x-2">
              <button class="p-2 hover:bg-primary-container hover:text-white transition-colors" data-admin-category-action="edit" data-admin-category-id="${escapeHtml(category.id)}" type="button">
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button class="p-2 hover:bg-error hover:text-white transition-colors" data-admin-category-action="delete" data-admin-category-id="${escapeHtml(category.id)}" type="button">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  async function loadCategories() {
    state.isLoading = true;
    try {
      const response = await api.adminListCategories();
      state.categories = (response?.data?.categories || []).sort((a, b) => {
        const aOrder = Number(a.sortOrder || 0);
        const bOrder = Number(b.sortOrder || 0);
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        return String(a.name || "").localeCompare(String(b.name || ""));
      });
      renderStats(state.categories);
      renderTable();
      setFeedback("");
    } catch (error) {
      setFeedback(error.message || "Failed to load categories.", "error");
      elements.tbody.innerHTML = `
        <tr>
          <td class="px-6 py-8 text-sm text-on-surface-variant" colspan="6">${escapeHtml(
            error.message || "Failed to load categories."
          )}</td>
        </tr>
      `;
    } finally {
      state.isLoading = false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      name: String(elements.name?.value || "").trim(),
      slug: String(elements.slug?.value || "").trim().toLowerCase(),
      sortOrder: Number.parseInt(String(elements.order?.value || "0"), 10) || 0,
      isActive: state.isActive,
    };

    if (!payload.name) {
      setFeedback("Category name is required.", "error");
      elements.name?.focus();
      return;
    }

    if (!payload.slug) {
      payload.slug = slugify(payload.name);
      if (elements.slug) {
        elements.slug.value = payload.slug;
      }
    }

    try {
      if (state.editingId) {
        await api.adminUpdateCategory(state.editingId, payload);
        setFeedback("Category updated successfully.", "success");
      } else {
        await api.adminCreateCategory(payload);
        setFeedback("Category created successfully.", "success");
      }

      resetForm();
      await loadCategories();
    } catch (error) {
      setFeedback(error.message || "Unable to save category.", "error");
    }
  }

  async function handleTableClick(event) {
    const trigger = event.target.closest("[data-admin-category-action]");
    if (!trigger) {
      return;
    }

    const action = trigger.dataset.adminCategoryAction;
    const categoryId = trigger.dataset.adminCategoryId;
    if (!categoryId) {
      return;
    }

    const category = state.categories.find((entry) => entry.id === categoryId);
    if (!category) {
      return;
    }

    if (action === "edit") {
      setFormForEdit(category);
      elements.name?.focus();
      return;
    }

    if (action === "delete") {
      const ok = window.confirm(
        `Delete category "${category.name}"? This is blocked if products are linked.`
      );
      if (!ok) {
        return;
      }

      try {
        await api.adminDeleteCategory(categoryId);
        setFeedback("Category deleted successfully.", "success");
        if (state.editingId === categoryId) {
          resetForm();
        }
        await loadCategories();
      } catch (error) {
        setFeedback(error.message || "Unable to delete category.", "error");
      }
    }
  }

  let searchTimer = null;

  elements.search?.addEventListener("input", (event) => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.search = String(event.target.value || "").trim();
      renderTable();
    }, 200);
  });

  elements.name?.addEventListener("input", () => {
    if (!state.editingId && elements.slug) {
      elements.slug.value = slugify(elements.name.value);
    }
  });

  elements.visibilityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.adminCategoriesVisibility;
      state.isActive = value === "active";
      updateVisibilityButtons();
    });
  });

  elements.form.addEventListener("submit", handleSubmit);
  elements.reset?.addEventListener("click", () => {
    resetForm();
    setFeedback("");
  });
  elements.tbody.addEventListener("click", handleTableClick);

  resetForm();
  loadCategories();
});
