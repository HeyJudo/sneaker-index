(function attachHomePage(global) {
  const api = global.SneakerIndexStoreApi;

  if (!api) {
    return;
  }

  const elements = {
    app: document.querySelector("[data-home-app]"),
    brandStrip: document.querySelector("[data-home-brands]"),
    categoryGrid: document.querySelector("[data-home-categories]"),
    collectionGrid: document.querySelector("[data-home-collection]"),
    collectionStatus: document.querySelector("[data-home-collection-status]"),
    mosaicGrid: document.querySelector("[data-home-mosaic]"),
  };

  if (!elements.app) {
    return;
  }

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

  function productLink(product) {
    return `product.html?slug=${encodeURIComponent(product.slug)}`;
  }

  function getDefaultCartSelection(product) {
    return {
      color: product.colors?.[0] || null,
      size: (product.sizes || []).find((size) => size.stock > 0) || null,
    };
  }

  function showCollectionMessage(message, tone = "success") {
    if (!elements.collectionStatus) {
      return;
    }

    elements.collectionStatus.className =
      tone === "error"
        ? "mb-8 border border-error bg-error-container/20 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-error"
        : "mb-8 border border-primary/20 bg-secondary-fixed px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary";
    elements.collectionStatus.textContent = message;
    elements.collectionStatus.classList.remove("hidden");
  }

  function categoryLink(category) {
    return `catalog.html?category=${encodeURIComponent(category.slug)}`;
  }

  function brandLink(brandName) {
    return `catalog.html?brand=${encodeURIComponent(brandName)}`;
  }

  const brandLogos = {
    "nike": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    "adidas": "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    "jordan brand": "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png",
    "converse": "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg",
    "new balance": "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
    "asics": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg",
    "merrell": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Merrell_Logo.svg/2560px-Merrell_Logo.svg.png"
  };

  function renderBrands(brands) {
    if (!elements.brandStrip) {
      return;
    }

    const brandItems = brands
      .map(
        (brand) => {
          const logoUrl = brandLogos[brand.name.toLowerCase()];
          if (logoUrl) {
             return `<a class="flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity mx-16 grayscale hover:grayscale-0" href="${brandLink(brand.name)}">
                       <img src="${logoUrl}" alt="${escapeHtml(brand.name)}" class="h-10 max-w-[120px] object-contain" />
                     </a>`;
          }
          return `<a class="font-bold text-2xl tracking-tighter hover:text-primary transition-colors opacity-30 hover:opacity-100 mx-16 grayscale hover:grayscale-0" href="${brandLink(brand.name)}">
            ${escapeHtml(brand.name.toUpperCase())}
          </a>`
        }
      )
      .join("");

    elements.brandStrip.innerHTML = `
      <div class="flex items-center animate-marquee whitespace-nowrap min-w-full">
         ${brandItems}
         ${brandItems}
         ${brandItems}
      </div>
    `;
  }

  function renderCategories(categories) {
    if (!elements.categoryGrid) {
      return;
    }

    elements.categoryGrid.innerHTML = categories
      .slice(0, 6)
      .map(
        (category) => `
          <a class="group cursor-pointer text-center block" href="${categoryLink(category)}">
            <div class="bg-surface-container-low aspect-[2/3] p-4 relative mb-4 transition-transform group-hover:-translate-y-2 overflow-hidden">
              <img alt="${escapeHtml(category.name)}" class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 group-hover:scale-105 transition-transform duration-500" src="${escapeHtml(category.image)}">
            </div>
            <span class="font-label uppercase tracking-widest text-sm font-semibold">${escapeHtml(category.name)}</span>
          </a>
        `
      )
      .join("");
  }

  function renderCollection(products) {
    if (!elements.collectionGrid || !elements.collectionStatus) {
      return;
    }

    elements.collectionStatus.classList.add("hidden");

    elements.collectionGrid.innerHTML = products
      .map(
        (product) => `
          <article class="group si-fade-up bg-surface-container-lowest p-6 ambient-shadow relative overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-black/5 hover:border-primary">
            <a class="block" href="${productLink(product)}">
              <div class="cobalt-grade bg-surface-container-low h-64 flex items-center justify-center mb-6 overflow-hidden">
                <img alt="${escapeHtml(product.name)}" class="w-4/5 transform group-hover:scale-110 transition-transform duration-500" src="${escapeHtml(product.heroImage || product.images[0] || "")}">
              </div>
              <div class="flex justify-between items-start gap-4">
                <div>
                  <p class="text-xs font-label uppercase text-slate-400 tracking-wider mb-1">${escapeHtml(product.brand)}</p>
                  <h3 class="font-body text-xl font-bold">${escapeHtml(product.name)}</h3>
                </div>
                <span class="font-bold text-primary">${formatPrice(product.price)}</span>
              </div>
            </a>
            <button
              class="absolute bottom-0 left-0 right-0 py-4 bg-primary text-white font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-secondary"
              type="button"
              data-home-add
              data-product-id="${escapeHtml(product._id)}"
              data-size-label="${escapeHtml(getDefaultCartSelection(product).size?.label || "")}"
              data-color-name="${escapeHtml(getDefaultCartSelection(product).color?.name || "")}"
              ${getDefaultCartSelection(product).size && getDefaultCartSelection(product).color ? "" : "disabled"}
            >
              ${getDefaultCartSelection(product).size && getDefaultCartSelection(product).color ? "Add To Bag" : "Unavailable"}
            </button>
          </article>
        `
      )
      .join("");
  }

  function renderCollectionError(message) {
    if (!elements.collectionStatus) {
      return;
    }

    if (elements.collectionGrid) {
      elements.collectionGrid.innerHTML = "";
    }

    elements.collectionStatus.classList.remove("hidden");
    elements.collectionStatus.innerHTML = `
      <div class="bg-surface-container-low p-12 text-center">
        <p class="font-label uppercase tracking-[0.3em] text-[10px] text-error font-bold">Unavailable</p>
        <h3 class="font-headline text-5xl mt-4">Collection Offline</h3>
        <p class="font-body text-sm text-on-surface-variant max-w-md mx-auto mt-4">
          ${escapeHtml(message || "Featured products could not be loaded.")}
        </p>
      </div>
    `;
  }

  function renderMosaic(products) {
    if (!elements.mosaicGrid) {
      return;
    }

    elements.mosaicGrid.innerHTML = products
      .slice(0, 4)
      .map(
        (product) => `
          <a class="overflow-hidden bg-surface-container-low flex items-center justify-center p-8 group transition-all duration-300 hover:shadow-xl" href="${productLink(product)}">
            <img alt="${escapeHtml(product.name)}" class="w-full transform group-hover:scale-110 transition-transform" src="${escapeHtml(product.heroImage || product.images[0] || "")}">
          </a>
        `
      )
      .join("");
  }

  function renderSkeletons() {
    if (!elements.collectionGrid) return;
    elements.collectionGrid.innerHTML = Array(4).fill(`
      <article class="bg-surface-container-lowest p-6 border border-black/5">
        <div class="bg-slate-200 animate-pulse h-64 mb-6"></div>
        <div class="flex justify-between items-start gap-4">
          <div class="w-full">
            <div class="h-3 bg-slate-200 animate-pulse w-1/3 mb-2"></div>
            <div class="h-5 bg-slate-200 animate-pulse w-2/3"></div>
          </div>
          <div class="h-5 bg-slate-200 animate-pulse w-1/4"></div>
        </div>
      </article>
    `).join("");
  }

  async function init() {
    renderSkeletons();
    try {
      const [categoriesResponse, facetsResponse, featuredResponse, mosaicResponse] = await Promise.all([
        api.getCategories(),
        api.getProductFacets(),
        api.getFeaturedProducts({ limit: 8 }),
        api.getProducts({ limit: 4, sort: "rating_desc" }),
      ]);

      renderBrands(facetsResponse.data.brands || []);
      renderCategories(categoriesResponse.data.categories || []);
      renderCollection(featuredResponse.data.products || []);
      renderMosaic(mosaicResponse.data.products || []);
    } catch (error) {
      renderCollectionError(error.message);
    }
  }

  elements.collectionGrid?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-home-add]");

    if (!button) {
      return;
    }

    const { productId, sizeLabel, colorName } = button.dataset;

    if (!productId || !sizeLabel || !colorName || button.disabled) {
      return;
    }

    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = "Adding...";

    try {
      await api.addCartItem({
        productId,
        sizeLabel,
        colorName,
        quantity: 1,
      });

      showCollectionMessage("Added to bag.", "success");
      button.textContent = "Added";
    } catch (error) {
      showCollectionMessage(error.message || "Unable to add the item to bag.", "error");
      button.textContent = originalLabel;
    } finally {
      global.setTimeout(() => {
        button.disabled = false;
        button.textContent = originalLabel;
      }, 1200);
    }
  });

  init();
})(window);
