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
  };
})(window);
