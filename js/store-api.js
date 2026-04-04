(function attachSneakerIndexStoreApi(global) {
  function resolveApiBaseUrl() {
    const { protocol, hostname, port } = global.location;

    if ((protocol === "http:" || protocol === "https:") && port === "4000") {
      return `${protocol}//${hostname}:${port}/api/v1`;
    }

    if (protocol === "http:" || protocol === "https:") {
      return `${protocol}//${hostname}:4000/api/v1`;
    }

    return "http://localhost:4000/api/v1";
  }

  async function request(path, options) {
    const response = await fetch(`${resolveApiBaseUrl()}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const payload = await response.json();

    if (!response.ok) {
      const error = new Error(payload?.error?.message || "Request failed.");
      error.status = response.status;
      error.code = payload?.error?.code;
      error.details = payload?.error?.details || [];
      throw error;
    }

    return payload;
  }

  function buildQuery(params) {
    const query = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value
          .filter((item) => item !== "" && item !== null && item !== undefined)
          .forEach((item) => query.append(key, String(item)));
        return;
      }

      if (value === "" || value === null || value === undefined) {
        return;
      }

      query.set(key, String(value));
    });

    const search = query.toString();

    return search ? `?${search}` : "";
  }

  global.SneakerIndexStoreApi = {
    getCategories() {
      return request("/categories", { method: "GET" });
    },
    getCart() {
      return request("/cart", { method: "GET" });
    },
    addCartItem(payload) {
      return request("/cart/items", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    updateCartItem(itemId, payload) {
      return request(`/cart/items/${encodeURIComponent(itemId)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    removeCartItem(itemId) {
      return request(`/cart/items/${encodeURIComponent(itemId)}`, {
        method: "DELETE",
      });
    },
    clearCart() {
      return request("/cart", { method: "DELETE" });
    },
    createOrder(payload) {
      return request("/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    getProducts(params) {
      return request(`/products${buildQuery(params)}`, { method: "GET" });
    },
    getProductFacets() {
      return request("/products/facets", { method: "GET" });
    },
    getFeaturedProducts(params) {
      return request(`/products/featured${buildQuery(params)}`, { method: "GET" });
    },
    getProductBySlug(slug) {
      return request(`/products/${encodeURIComponent(slug)}`, { method: "GET" });
    },
  };
})(window);
