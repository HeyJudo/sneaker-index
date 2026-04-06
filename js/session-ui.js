(function attachSneakerIndexSessionUi(global) {
  const AUTH_ACTIVE_CLASS = "auth-session-active";
  const AUTH_BADGE_SELECTOR = "[data-auth-session-badge]";
  const ACCOUNT_MENU_SELECTOR = "[data-auth-account-menu]";
  let accountMenuState = null;

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

      [data-auth-account-shell] {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      ${ACCOUNT_MENU_SELECTOR} {
        position: absolute;
        top: calc(100% + 0.95rem);
        right: 0;
        min-width: 11.5rem;
        padding: 0.65rem 0;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border: 1px solid rgba(26, 63, 196, 0.12);
        box-shadow: 0 18px 40px rgba(0, 40, 156, 0.08);
        transform-origin: top right;
        transform: translateY(-0.35rem);
        opacity: 0;
        pointer-events: none;
        transition: opacity 160ms ease, transform 160ms ease;
        z-index: 80;
      }

      ${ACCOUNT_MENU_SELECTOR}[data-open="true"] {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      [data-auth-menu-link] {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.85rem 1.1rem;
        font-family: 'Lato', sans-serif;
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #181c20;
        background: transparent;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
      }

      [data-auth-menu-link]:hover {
        background: rgba(26, 63, 196, 0.07);
        color: #00289c;
      }

      [data-auth-menu-link][data-auth-logout] {
        color: #00289c;
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

  function closeAccountMenu() {
    if (!accountMenuState?.menu) {
      return;
    }

    accountMenuState.menu.dataset.open = "false";
    accountMenuState.trigger.setAttribute("aria-expanded", "false");
  }

  function openAccountMenu() {
    if (!accountMenuState?.menu) {
      return;
    }

    accountMenuState.menu.dataset.open = "true";
    accountMenuState.trigger.setAttribute("aria-expanded", "true");
  }

  function toggleAccountMenu() {
    if (!accountMenuState?.menu) {
      return;
    }

    if (accountMenuState.menu.dataset.open === "true") {
      closeAccountMenu();
      return;
    }

    openAccountMenu();
  }

  function ensureAccountMenu(user) {
    if (!user) {
      return;
    }

    const primaryTrigger = document.querySelector("[data-auth-account-link]");

    if (!primaryTrigger) {
      return;
    }

    let shell = primaryTrigger.closest("[data-auth-account-shell]");

    if (!shell) {
      shell = document.createElement("div");
      shell.dataset.authAccountShell = "true";
      primaryTrigger.parentNode.insertBefore(shell, primaryTrigger);
      shell.appendChild(primaryTrigger);
    }

    let menu = shell.querySelector(ACCOUNT_MENU_SELECTOR);

    if (!menu) {
      menu = document.createElement("div");
      menu.dataset.authAccountMenu = "true";
      menu.dataset.open = "false";
      const adminLink = user?.role === "admin"
        ? '<a data-auth-menu-link href="admin-dashboard.html">Admin<span class="material-symbols-outlined text-base">admin_panel_settings</span></a>'
        : "";
      menu.innerHTML = `
        ${adminLink}
        <a data-auth-menu-link href="account.html">Profile<span class="material-symbols-outlined text-base">north_east</span></a>
        <a data-auth-menu-link href="orders.html">Orders<span class="material-symbols-outlined text-base">inventory_2</span></a>
        <a data-auth-menu-link href="catalog.html">Vault<span class="material-symbols-outlined text-base">storefront</span></a>
        <a data-auth-menu-link href="index.html">Home<span class="material-symbols-outlined text-base">home</span></a>
        <button data-auth-menu-link data-auth-logout type="button">Logout<span class="material-symbols-outlined text-base">logout</span></button>
      `;
      shell.appendChild(menu);
    }

    if (!primaryTrigger.dataset.authMenuBound) {
      primaryTrigger.dataset.authMenuBound = "true";
      primaryTrigger.setAttribute("aria-haspopup", "menu");
      primaryTrigger.setAttribute("aria-expanded", "false");

      primaryTrigger.addEventListener("click", (event) => {
        if (document.body.dataset.authState !== "authenticated") {
          return;
        }

        event.preventDefault();
        toggleAccountMenu();
      });

      primaryTrigger.addEventListener("keydown", (event) => {
        if (document.body.dataset.authState !== "authenticated") {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleAccountMenu();
        }

        if (event.key === "Escape") {
          closeAccountMenu();
        }
      });
    }

    if (!menu.dataset.authMenuDismissBound) {
      menu.dataset.authMenuDismissBound = "true";

      document.addEventListener("click", (event) => {
        if (!shell.contains(event.target)) {
          closeAccountMenu();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeAccountMenu();
        }
      });
    }

    accountMenuState = {
      trigger: primaryTrigger,
      menu,
      shell,
    };

    if (global.SneakerIndexAuthApi) {
      bindLogout(global.SneakerIndexAuthApi);
    }
  }

  function updateUserText(user) {
    const firstName = user?.firstName || "Curator";
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
    const avatarUrl = user?.avatarUrl || "";

    document.querySelectorAll("[data-auth-first-name]").forEach((element) => {
      element.textContent = firstName;
    });

    document.querySelectorAll("[data-auth-full-name]").forEach((element) => {
      element.textContent = fullName || firstName;
    });

    document.querySelectorAll("[data-auth-email]").forEach((element) => {
      element.textContent = user?.email || "";
    });

    document.querySelectorAll("[data-auth-avatar]").forEach((element) => {
      if (!element.dataset.authAvatarDefault) {
        element.dataset.authAvatarDefault = element.getAttribute("src") || "";
      }

      const resolvedAvatarUrl = avatarUrl || element.dataset.authAvatarDefault;

      if (resolvedAvatarUrl) {
        element.setAttribute("src", resolvedAvatarUrl);
      }

      element.setAttribute("alt", fullName ? `${fullName} portrait` : "Curator portrait");
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

        closeAccountMenu();
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
    const guardApplies = guard === "protected" || guard === "guest" || guard === "admin";

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
      ensureAccountMenu(user);

      if (guard === "guest") {
        redirectTo(getRedirectTargetFromQuery("account.html"));
        return;
      }

      if (guard === "admin" && user?.role !== "admin") {
        redirectTo("account.html");
        return;
      }
    } catch (error) {
      body.dataset.authState = "guest";
      updateAccountLinks({ isAuthenticated: false, user: null });
      toggleLogoutTriggers(false);
      closeAccountMenu();

      if ((guard === "protected" || guard === "admin") && error?.status === 401) {
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
