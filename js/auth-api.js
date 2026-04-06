(function attachSneakerIndexAuthApi(global) {
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

  function toQueryString(params = {}) {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }

      search.set(key, String(value));
    });

    const query = search.toString();
    return query ? `?${query}` : "";
  }

  global.SneakerIndexAuthApi = {
    signup(data) {
      return request("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    login(data) {
      return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    logout() {
      return request("/auth/logout", {
        method: "POST",
      });
    },
    me() {
      return request("/auth/me", {
        method: "GET",
      });
    },
    updateProfile(data) {
      return request("/auth/me", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    updatePassword(data) {
      return request("/auth/me/password", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    listCategories() {
      return request("/categories", {
        method: "GET",
      });
    },
    adminListProducts(params) {
      return request(`/admin/products${toQueryString(params)}`, {
        method: "GET",
      });
    },
    adminGetProduct(productId) {
      return request(`/admin/products/${productId}`, {
        method: "GET",
      });
    },
    adminCreateProduct(data) {
      return request("/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    adminUpdateProduct(productId, data) {
      return request(`/admin/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    adminArchiveProduct(productId, isArchived = true) {
      return request(`/admin/products/${productId}/archive`, {
        method: "PATCH",
        body: JSON.stringify({ isArchived }),
      });
    },
    adminDeleteProduct(productId) {
      return request(`/admin/products/${productId}`, {
        method: "DELETE",
      });
    },
    adminListOrders(params) {
      return request(`/admin/orders${toQueryString(params)}`, {
        method: "GET",
      });
    },
    adminGetOrder(orderId) {
      return request(`/admin/orders/${orderId}`, {
        method: "GET",
      });
    },
    adminUpdateOrderStatus(orderId, status) {
      return request(`/admin/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    adminListCategories() {
      return request("/admin/categories", {
        method: "GET",
      });
    },
    adminCreateCategory(data) {
      return request("/admin/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    adminUpdateCategory(categoryId, data) {
      return request(`/admin/categories/${categoryId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    adminDeleteCategory(categoryId) {
      return request(`/admin/categories/${categoryId}`, {
        method: "DELETE",
      });
    },
    adminListActivity(params) {
      return request(`/admin/activity${toQueryString(params)}`, {
        method: "GET",
      });
    },
  };
})(window);
