(function attachProductPage(global) {
  const api = global.SneakerIndexStoreApi;

  if (!api) {
    return;
  }

  const elements = {
    app: document.querySelector("[data-product-app]"),
    shell: document.querySelector("[data-product-shell]"),
    title: document.querySelector("[data-product-title]"),
    subtitle: document.querySelector("[data-product-subtitle]"),
    price: document.querySelector("[data-product-price]"),
    comparePrice: document.querySelector("[data-product-compare-price]"),
    savings: document.querySelector("[data-product-savings]"),
    reviewCount: document.querySelector("[data-product-review-count]"),
    ratingStars: document.querySelector("[data-product-rating-stars]"),
    stockBadge: document.querySelector("[data-product-stock-badge]"),
    stockMessage: document.querySelector("[data-product-stock-message]"),
    colorLabel: document.querySelector("[data-product-color-label]"),
    colorOptions: document.querySelector("[data-product-color-options]"),
    sizeOptions: document.querySelector("[data-product-size-options]"),
    sizeGuide: document.querySelector("[data-product-size-guide]"),
    addButton: document.querySelector("[data-product-add]"),
    wishlistButton: document.querySelector("[data-product-wishlist]"),
    breadcrumbCategory: document.querySelector("[data-product-breadcrumb-category]"),
    breadcrumbName: document.querySelector("[data-product-breadcrumb-name]"),
    thumbnails: document.querySelector("[data-product-thumbnails]"),
    mainImage: document.querySelector("[data-product-main-image]"),
    aboutText: document.querySelector("[data-product-about]"),
    highlights: document.querySelector("[data-product-highlights]"),
    specs: document.querySelector("[data-product-specs]"),
    testimonials: document.querySelector("[data-product-testimonials]"),
    related: document.querySelector("[data-product-related]"),
    status: document.querySelector("[data-product-status]"),
    relatedLink: document.querySelector("[data-product-related-link]"),
  };

  if (!elements.app) {
    return;
  }

  const state = {
    product: null,
    relatedProducts: [],
    selectedImageIndex: 0,
    selectedColorIndex: 0,
    selectedSizeLabel: "",
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

  function getSlugFromUrl() {
    const params = new URLSearchParams(global.location.search);
    return params.get("slug") || "";
  }

  function setPageTitle(product) {
    document.title = `${product.name} | SNEAKER INDEX`;
  }

  function getSelectedSize() {
    return state.product?.sizes?.find((size) => size.label === state.selectedSizeLabel) || null;
  }

  function getTotalStock() {
    return (state.product?.sizes || []).reduce((total, size) => total + size.stock, 0);
  }

  function getSavingsPercent(product) {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
      return 0;
    }

    return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  }

  function getProductSubtitle(product) {
    const category = product.categoryId?.name || "Archive";
    return `${category} precision for the modern curator.`;
  }

  function getStockSummary(product) {
    const totalStock = getTotalStock();

    switch (product.stockStatus) {
      case "out-of-stock":
        return {
          badge: "Archive Status",
          message: "Currently sold out.",
          tone: "text-slate-400",
          buttonLabel: "Sold Out",
          disabled: true,
        };
      case "preorder":
        return {
          badge: "Archive Status",
          message: "Available for preorder.",
          tone: "text-primary",
          buttonLabel: "Preorder",
          disabled: true,
        };
      case "low-stock":
        return {
          badge: `${product.brand} / ${product.categoryId?.name || "Archive"}`,
          message: `Only ${totalStock} items left in stock.`,
          tone: "text-error",
          buttonLabel: "Add To Bag",
          disabled: true,
        };
      default:
        return {
          badge: `${product.brand} / ${product.categoryId?.name || "Archive"}`,
          message: `${totalStock} items currently available.`,
          tone: "text-primary",
          buttonLabel: "Add To Bag",
          disabled: true,
        };
    }
  }

  function buildHighlights(product) {
    const highlights = [];

    if (product.colors?.length) {
      highlights.push(`${product.colors.length} curated colorway${product.colors.length > 1 ? "s" : ""} available.`);
    }

    if (product.sizes?.length) {
      highlights.push(`${product.sizes.length} size options across the archive run.`);
    }

    if (product.tags?.length) {
      highlights.push(`${product.tags.slice(0, 3).join(" / ").toUpperCase()} positioning within the Sneaker Index catalog.`);
    }

    if (product.stockStatus === "low-stock") {
      highlights.push("Collector-grade availability with low-stock status.");
    }

    return highlights.slice(0, 4);
  }

  function buildSpecs(product) {
    const firstInStockSize = product.sizes.find((size) => size.stock > 0) || product.sizes[0];

    return [
      {
        label: "Category",
        value: product.categoryId?.name || "Archive",
      },
      {
        label: "Brand",
        value: product.brand,
      },
      {
        label: "Primary SKU",
        value: firstInStockSize?.sku || "Unavailable",
      },
      {
        label: "Stock Status",
        value: product.stockStatus.replaceAll("-", " "),
      },
      {
        label: "Colorways",
        value: String(product.colors?.length || 0),
      },
      {
        label: "Review Score",
        value: `${product.rating.toFixed(1)} / 5`,
      },
    ];
  }

  function buildTestimonials(product) {
    const category = product.categoryId?.name || "Archive";

    return [
      {
        quote: `${product.name} feels resolved in the way the best ${category.toLowerCase()} pairs do. Every panel looks deliberate.`,
        author: "Marcus V.",
        role: "Creative Director",
      },
      {
        quote: `The material story reads premium without losing everyday wearability. ${product.brand} handled this one with restraint.`,
        author: "Elena R.",
        role: "Sneaker Archivist",
      },
      {
        quote: `This is the type of product that makes the Sneaker Index catalog feel curated instead of crowded.`,
        author: "James L.",
        role: "Hype Analyst",
      },
    ];
  }

  function buildRelatedLink(product) {
    const slug = product.categoryId?.slug;
    return slug ? `catalog.html?category=${encodeURIComponent(slug)}` : "catalog.html";
  }

  function renderRating(product) {
    if (elements.reviewCount) {
      elements.reviewCount.textContent = `(${product.reviewCount} Reviews)`;
    }

    if (!elements.ratingStars) {
      return;
    }

    const filledStars = Math.round(product.rating);
    elements.ratingStars.innerHTML = Array.from({ length: 5 }, (_, index) => {
      const fill = index < filledStars ? 1 : 0;
      return `<span class="material-symbols-outlined text-sm" style='font-variation-settings: "FILL" ${fill};'>star</span>`;
    }).join("");
  }

  function renderPricing(product) {
    if (elements.price) {
      elements.price.textContent = formatPrice(product.price);
    }

    if (elements.comparePrice) {
      if (product.compareAtPrice && product.compareAtPrice > product.price) {
        elements.comparePrice.textContent = formatPrice(product.compareAtPrice);
        elements.comparePrice.classList.remove("hidden");
      } else {
        elements.comparePrice.classList.add("hidden");
      }
    }

    if (elements.savings) {
      const savingsPercent = getSavingsPercent(product);

      if (savingsPercent > 0) {
        elements.savings.textContent = `Save ${savingsPercent}%`;
        elements.savings.classList.remove("hidden");
      } else {
        elements.savings.classList.add("hidden");
      }
    }
  }

  function renderStock(product) {
    const stockSummary = getStockSummary(product);

    if (elements.stockBadge) {
      elements.stockBadge.innerHTML = `
        <span class="material-symbols-outlined text-sm">visibility</span>
        <span>${escapeHtml(stockSummary.badge)}</span>
      `;
    }

    if (elements.stockMessage) {
      elements.stockMessage.textContent = stockSummary.message;
      elements.stockMessage.className = `font-bold text-[0.75rem] uppercase ${stockSummary.tone}`;
    }

    if (elements.addButton) {
      elements.addButton.textContent = stockSummary.buttonLabel;
      elements.addButton.disabled = stockSummary.disabled;
      elements.addButton.className = stockSummary.disabled
        ? "flex-1 bg-primary-container text-white font-bold h-16 tracking-widest text-[0.8rem] uppercase opacity-70 cursor-not-allowed"
        : "flex-1 bg-primary-container text-white font-bold h-16 tracking-widest text-[0.8rem] uppercase hover:bg-primary transition-all active:scale-[0.98]";
    }
  }

  function renderBreadcrumb(product) {
    if (elements.breadcrumbCategory) {
      elements.breadcrumbCategory.textContent = product.categoryId?.name || "Archive";
      elements.breadcrumbCategory.href = buildRelatedLink(product);
    }

    if (elements.breadcrumbName) {
      elements.breadcrumbName.textContent = product.name;
    }
  }

  function renderHeader(product) {
    if (elements.title) {
      elements.title.textContent = product.name.toUpperCase();
    }

    if (elements.subtitle) {
      elements.subtitle.textContent = getProductSubtitle(product);
    }

    renderRating(product);
    renderPricing(product);
    renderStock(product);
    renderBreadcrumb(product);
    setPageTitle(product);
  }

  function renderGallery(product) {
    if (!elements.mainImage || !elements.thumbnails) {
      return;
    }

    const currentImage = product.images[state.selectedImageIndex] || product.heroImage || product.images[0] || "";
    elements.mainImage.src = currentImage;
    elements.mainImage.alt = product.name;

    elements.thumbnails.innerHTML = product.images
      .map((image, index) => {
        const isActive = index === state.selectedImageIndex;
        const classes = isActive
          ? "aspect-square cobalt-grade cursor-pointer border border-primary"
          : "aspect-square cobalt-grade cursor-pointer opacity-60 hover:opacity-100 transition-opacity border border-transparent";

        return `
          <button class="${classes}" data-image-index="${index}" type="button" aria-label="View ${escapeHtml(product.name)} image ${index + 1}">
            <img alt="${escapeHtml(product.name)} image ${index + 1}" class="w-full h-full object-cover" src="${escapeHtml(image)}">
          </button>
        `;
      })
      .join("");
  }

  function renderColors(product) {
    if (elements.colorLabel) {
      const selectedColor = product.colors[state.selectedColorIndex];
      elements.colorLabel.textContent = `Selected Color: ${selectedColor?.name || "Unavailable"}`;
    }

    if (!elements.colorOptions) {
      return;
    }

    elements.colorOptions.innerHTML = product.colors
      .map((color, index) => {
        const isActive = index === state.selectedColorIndex;
        const ring = isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : "";

        return `
          <button class="w-10 h-10 ${ring}" data-color-index="${index}" style="background:${escapeHtml(color.hex)}" title="${escapeHtml(color.name)}" type="button" aria-label="Select ${escapeHtml(color.name)} color"></button>
        `;
      })
      .join("");
  }

  function renderSizes(product) {
    if (!elements.sizeOptions) {
      return;
    }

    elements.sizeOptions.innerHTML = product.sizes
      .map((size) => {
        const isSelected = size.label === state.selectedSizeLabel;
        const isUnavailable = size.stock <= 0;

        let className =
          "h-14 border border-outline-variant flex items-center justify-center font-bold text-sm transition-colors";

        if (isSelected) {
          className += " bg-primary text-white";
        } else if (isUnavailable) {
          className += " text-outline-variant cursor-not-allowed";
        } else {
          className += " hover:border-primary";
        }

        return `
          <button class="${className}" data-size-label="${escapeHtml(size.label)}" type="button" ${isUnavailable ? "disabled" : ""}>
            ${escapeHtml(size.label)}
          </button>
        `;
      })
      .join("");
  }

  function renderAbout(product) {
    if (elements.aboutText) {
      elements.aboutText.textContent = product.description;
    }

    if (elements.highlights) {
      elements.highlights.innerHTML = buildHighlights(product)
        .map(
          (highlight) => `
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
              <span class="text-sm font-bold uppercase tracking-tight">${escapeHtml(highlight)}</span>
            </li>
          `
        )
        .join("");
    }

    if (elements.specs) {
      elements.specs.innerHTML = buildSpecs(product)
        .map(
          (spec) => `
            <div class="flex justify-between border-b border-outline-variant/30 pb-2 gap-6">
              <span class="text-[0.7rem] uppercase tracking-widest text-on-surface-variant">${escapeHtml(spec.label)}</span>
              <span class="text-[0.7rem] uppercase tracking-widest font-bold text-right">${escapeHtml(spec.value)}</span>
            </div>
          `
        )
        .join("");
    }
  }

  function renderTestimonials(product) {
    if (!elements.testimonials) {
      return;
    }

    elements.testimonials.innerHTML = buildTestimonials(product)
      .map(
        (testimonial) => `
          <div class="bg-surface-container-lowest p-8 border-t-4 border-primary">
            <div class="flex mb-4 text-primary">
              <span class="material-symbols-outlined text-sm" style='font-variation-settings: "FILL" 1;'>star</span>
              <span class="material-symbols-outlined text-sm" style='font-variation-settings: "FILL" 1;'>star</span>
              <span class="material-symbols-outlined text-sm" style='font-variation-settings: "FILL" 1;'>star</span>
              <span class="material-symbols-outlined text-sm" style='font-variation-settings: "FILL" 1;'>star</span>
              <span class="material-symbols-outlined text-sm" style='font-variation-settings: "FILL" 1;'>star</span>
            </div>
            <p class="text-sm italic mb-6 leading-relaxed">${escapeHtml(testimonial.quote)}</p>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-surface-container-low"></div>
              <div>
                <span class="block text-[0.7rem] font-bold uppercase tracking-widest">${escapeHtml(testimonial.author)}</span>
                <span class="text-[0.6rem] uppercase tracking-widest text-on-surface-variant">${escapeHtml(testimonial.role)}</span>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }

  function renderRelatedProducts(relatedProducts, product) {
    if (!elements.related) {
      return;
    }

    if (elements.relatedLink) {
      elements.relatedLink.href = buildRelatedLink(product);
    }

    if (!relatedProducts.length) {
      elements.related.innerHTML = `
        <div class="col-span-full bg-surface-container-low p-12 text-center">
          <p class="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">More Soon</p>
          <h3 class="font-headline text-4xl uppercase mt-4">The Archive Ends Here</h3>
          <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
            More related products will appear as the category catalog expands.
          </p>
        </div>
      `;
      return;
    }

    elements.related.innerHTML = relatedProducts
      .map(
        (item) => `
          <a class="group cursor-pointer block" href="product.html?slug=${encodeURIComponent(item.slug)}">
            <div class="aspect-square bg-surface-container-low mb-4 overflow-hidden cobalt-grade">
              <img alt="${escapeHtml(item.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${escapeHtml(item.heroImage || item.images[0] || "")}">
            </div>
            <span class="block text-[0.6rem] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">${escapeHtml(item.categoryId?.name || "Archive")} / ${escapeHtml(item.brand)}</span>
            <h3 class="font-headline text-2xl mb-1 uppercase">${escapeHtml(item.name)}</h3>
            <span class="font-bold text-primary">${formatPrice(item.price)}</span>
          </a>
        `
      )
      .join("");
  }

  function renderProduct(product, relatedProducts) {
    state.product = product;
    state.relatedProducts = relatedProducts;
    state.selectedImageIndex = 0;
    state.selectedColorIndex = 0;
    state.selectedSizeLabel = product.sizes.find((size) => size.stock > 0)?.label || product.sizes[0]?.label || "";

    renderHeader(product);
    renderGallery(product);
    renderColors(product);
    renderSizes(product);
    renderAbout(product);
    renderTestimonials(product);
    renderRelatedProducts(relatedProducts, product);
  }

  function setLoadingState() {
    if (elements.shell) {
      elements.shell.classList.add("hidden");
    }

    if (!elements.status) {
      return;
    }

    elements.status.classList.remove("hidden");
    elements.status.innerHTML = `
      <div class="bg-surface-container-low p-12 text-center">
        <p class="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">Loading</p>
        <h2 class="font-headline text-5xl uppercase mt-4">Opening The Archive</h2>
        <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
          Pulling product details and related pairs from Sneaker Index.
        </p>
      </div>
    `;
  }

  function setErrorState(message) {
    if (elements.shell) {
      elements.shell.classList.add("hidden");
    }

    if (!elements.status) {
      return;
    }

    elements.status.classList.remove("hidden");
    elements.status.innerHTML = `
      <div class="bg-surface-container-low p-12 text-center">
        <p class="font-label uppercase tracking-[0.3em] text-[10px] text-error font-bold">Unavailable</p>
        <h2 class="font-headline text-5xl uppercase mt-4">Product Not Available</h2>
        <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
          ${escapeHtml(message || "This product could not be loaded.")}
        </p>
        <a class="inline-flex mt-8 bg-primary-container text-white px-8 py-4 font-label uppercase tracking-[0.2em] text-xs" href="catalog.html">Return To Catalog</a>
      </div>
    `;
  }

  function clearStatus() {
    if (elements.shell) {
      elements.shell.classList.remove("hidden");
    }

    if (elements.status) {
      elements.status.classList.add("hidden");
      elements.status.innerHTML = "";
    }
  }

  function bindEvents() {
    if (elements.thumbnails) {
      elements.thumbnails.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-image-index]");

        if (!trigger || !state.product) {
          return;
        }

        const index = Number.parseInt(trigger.dataset.imageIndex || "", 10);

        if (Number.isNaN(index)) {
          return;
        }

        state.selectedImageIndex = index;
        renderGallery(state.product);
      });
    }

    if (elements.colorOptions) {
      elements.colorOptions.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-color-index]");

        if (!trigger || !state.product) {
          return;
        }

        const index = Number.parseInt(trigger.dataset.colorIndex || "", 10);

        if (Number.isNaN(index)) {
          return;
        }

        state.selectedColorIndex = index;
        renderColors(state.product);
      });
    }

    if (elements.sizeOptions) {
      elements.sizeOptions.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-size-label]");

        if (!trigger || !state.product || trigger.disabled) {
          return;
        }

        state.selectedSizeLabel = trigger.dataset.sizeLabel || state.selectedSizeLabel;
        renderSizes(state.product);
      });
    }

    if (elements.sizeGuide) {
      elements.sizeGuide.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }

    if (elements.addButton) {
      elements.addButton.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }

    if (elements.wishlistButton) {
      elements.wishlistButton.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  }

  async function init() {
    const slug = getSlugFromUrl();
    bindEvents();

    if (!slug) {
      setErrorState("No product slug was provided in the URL.");
      return;
    }

    setLoadingState();

    try {
      const response = await api.getProductBySlug(slug);
      const { product, relatedProducts } = response.data;
      clearStatus();
      renderProduct(product, relatedProducts || []);
    } catch (error) {
      setErrorState(error.message);
    }
  }

  init();
})(window);
