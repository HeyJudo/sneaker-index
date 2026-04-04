(function attachSneakerIndexSessionUi(global) {
  const AUTH_ACTIVE_CLASS = "auth-session-active";
  const AUTH_BADGE_SELECTOR = "[data-auth-session-badge]";

  function injectStyles() {
    if (document.getElementById("sneaker-index-session-ui-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "sneaker-index-session-ui-styles";
    style.textContent = `
      .${AUTH_ACTIVE_CLASS} {
        color: #1a3fc4 !important;
      }

      [data-auth-account-link] {
        position: relative;
      }

      [data-auth-account-link] ${AUTH_BADGE_SELECTOR} {
        position: absolute;
        top: -0.15rem;
        right: -0.15rem;
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 9999px;
        background: #1a3fc4;
        border: 2px solid #ffffff;
        pointer-events: none;
      }
    `;

    document.head.appendChild(style);
  }

  function sanitizeRedirectTarget(rawTarget, fallbackTarget) {
    if (!rawTarget) {
      return fallbackTarget;
    }

    const normalizedTarget = String(rawTarget).trim();

    if (!/^[a-z0-9_-]+\.html(?:\?.*)?$/i.test(normalizedTarget)) {
      return fallbackTarget;
    }

    return normalizedTarget;
  }

  function getRedirectTargetFromQuery(fallbackTarget) {
    const params = new URLSearchParams(global.location.search);
    return sanitizeRedirectTarget(params.get("redirect"), fallbackTarget);
  }

  function getCurrentPageTarget() {
    const pathname = global.location.pathname || "";
    const fileName = pathname.split("/").filter(Boolean).pop() || "index.html";
    const search = global.location.search || "";

    return sanitizeRedirectTarget(`${fileName}${search}`, "index.html");
  }

  function getLoginTarget() {
    return `login.html?redirect=${encodeURIComponent(getCurrentPageTarget())}`;
  }

  function setElementDestination(element, href) {
    if (element.tagName === "A") {
      element.setAttribute("href", href);
      return;
    }

    element.dataset.authTarget = href;

    if (!element.dataset.authNavigationBound) {
      element.dataset.authNavigationBound = "true";
      element.setAttribute("role", "link");
      element.tabIndex = 0;
      element.addEventListener("click", () => {
        global.location.href = element.dataset.authTarget || href;
      });
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          global.location.href = element.dataset.authTarget || href;
        }
      });
    }
  }

  function ensureAccountBadge(element) {
    if (element.querySelector(AUTH_BADGE_SELECTOR)) {
      return;
    }

    const badge = document.createElement("span");
    badge.dataset.authSessionBadge = "true";
    element.appendChild(badge);
  }

  function removeAccountBadge(element) {
    element.querySelector(AUTH_BADGE_SELECTOR)?.remove();
  }

  function updateAccountLinks({ isAuthenticated, user }) {
    const accountLinks = document.querySelectorAll("[data-auth-account-link]");
    const target = isAuthenticated ? "account.html" : "login.html?redirect=account.html";
    const label = isAuthenticated
      ? `Account for ${[user?.firstName, user?.lastName].filter(Boolean).join(" ")}`
      : "Sign in to your account";

    accountLinks.forEach((element) => {
      setElementDestination(element, target);
      element.setAttribute("aria-label", label);
      element.setAttribute("title", label);

      if (isAuthenticated) {
        element.classList.add(AUTH_ACTIVE_CLASS);
        ensureAccountBadge(element);
      } else {
        element.classList.remove(AUTH_ACTIVE_CLASS);
        removeAccountBadge(element);
      }
    });
  }

  function updateUserText(user) {
    const firstName = user?.firstName || "Curator";
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

    document.querySelectorAll("[data-auth-first-name]").forEach((element) => {
      element.textContent = firstName;
    });

    document.querySelectorAll("[data-auth-full-name]").forEach((element) => {
      element.textContent = fullName || firstName;
    });

    document.querySelectorAll("[data-auth-email]").forEach((element) => {
      element.textContent = user?.email || "";
    });
  }

  function toggleLogoutTriggers(isAuthenticated) {
    document.querySelectorAll("[data-auth-logout]").forEach((element) => {
      element.classList.toggle("hidden", !isAuthenticated);
      element.setAttribute("aria-hidden", String(!isAuthenticated));
    });
  }

  function bindLogout(authApi) {
    document.querySelectorAll("[data-auth-logout]").forEach((element) => {
      if (element.dataset.authLogoutBound) {
        return;
      }

      element.dataset.authLogoutBound = "true";

      element.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
          await authApi.logout();
        } catch (_error) {
          // Clear frontend state even if the cookie is already gone.
        }

        global.location.href = "index.html";
      });
    });
  }

  function redirectTo(target) {
    global.location.replace(target);
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const authApi = global.SneakerIndexAuthApi;
    const body = document.body;

    if (!authApi || !body) {
      return;
    }

    injectStyles();
    bindLogout(authApi);

    const guard = body.dataset.authGuard || "";
    const guardApplies = guard === "protected" || guard === "guest";

    if (guardApplies) {
      body.style.visibility = "hidden";
    }

    try {
      const response = await authApi.me();
      const user = response?.data?.user || null;

      body.dataset.authState = "authenticated";
      updateAccountLinks({ isAuthenticated: true, user });
      updateUserText(user);
      toggleLogoutTriggers(true);

      if (guard === "guest") {
        redirectTo(getRedirectTargetFromQuery("account.html"));
        return;
      }
    } catch (error) {
      body.dataset.authState = "guest";
      updateAccountLinks({ isAuthenticated: false, user: null });
      toggleLogoutTriggers(false);

      if (guard === "protected" && error?.status === 401) {
        redirectTo(getLoginTarget());
        return;
      }
    } finally {
      if (!document.hidden) {
        body.style.visibility = "";
      } else if (guardApplies) {
        body.style.visibility = "";
      }
    }
  });
})(window);
