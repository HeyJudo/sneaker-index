document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api || document.body?.dataset?.authGuard !== "admin") {
    return;
  }

  function getCurrentAdminPage() {
    const pathname = window.location.pathname || "";
    const file = pathname.split("/").filter(Boolean).pop() || "admin-dashboard.html";
    return file.toLowerCase();
  }

  function renderAdminSidebar() {
    const aside = document.querySelector("aside");

    if (!aside) {
      return;
    }

    const current = getCurrentAdminPage();
    const isActive = (file) => (current === file ? "text-white bg-white/10 border-l-4 border-white" : "text-blue-200/70 hover:text-white hover:bg-blue-800/30");

    aside.className =
      "fixed left-0 top-0 h-screen w-64 bg-slate-950 flex flex-col py-8 shadow-2xl shadow-blue-900/20 z-50";
    aside.innerHTML = `
      <div class="px-8 mb-10">
        <h1 class="text-[2.05rem] leading-none italic tracking-tight text-white" style="font-family:'Newsreader',serif;">Sneaker Index</h1>
      </div>
      <nav class="flex-1 space-y-1">
        <a class="flex items-center gap-3 px-8 py-3 transition-colors ${isActive("admin-dashboard.html")}" href="admin-dashboard.html">
          <span class="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-8 py-3 transition-colors ${isActive("admin-products.html")}" href="admin-products.html">
          <span class="material-symbols-outlined">inventory_2</span>
          <span>Products</span>
        </a>
        <a class="flex items-center gap-3 px-8 py-3 transition-colors ${isActive("admin-orders.html")}" href="admin-orders.html">
          <span class="material-symbols-outlined">package_2</span>
          <span>Orders</span>
        </a>
        <a class="flex items-center gap-3 px-8 py-3 transition-colors ${isActive("admin-categories.html")}" href="admin-categories.html">
          <span class="material-symbols-outlined">category</span>
          <span>Categories</span>
        </a>
      </nav>
      <div class="px-8 pt-8 border-t border-blue-800/50">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-blue-700/80 flex items-center justify-center rounded-sm">
            <span class="material-symbols-outlined text-white text-base">shield_person</span>
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold text-white truncate">Admin</p>
            <p class="text-[10px] text-blue-300/60 truncate uppercase tracking-widest">Administrator</p>
          </div>
        </div>
        <div class="mt-4 flex flex-col gap-2">
          <a class="text-[10px] uppercase tracking-[0.2em] text-blue-200/80 hover:text-white transition-colors" data-admin-view-store href="catalog.html">View Storefront</a>
          <button class="text-left text-[10px] uppercase tracking-[0.2em] text-blue-200/80 hover:text-white transition-colors" data-admin-logout type="button">Logout</button>
        </div>
      </div>
    `;
  }

  renderAdminSidebar();

  const logoutButtons = Array.from(document.querySelectorAll("[data-admin-logout]"));
  const storeLinks = Array.from(document.querySelectorAll("[data-admin-view-store]"));

  storeLinks.forEach((link) => {
    link.setAttribute("href", "catalog.html");
  });

  logoutButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (button.disabled) {
        return;
      }

      button.disabled = true;
      const originalText = button.textContent;
      button.textContent = "Signing out...";

      try {
        await api.logout();
      } catch (_error) {
        // If API call fails, still force local transition to login for recovery.
      } finally {
        window.location.href = "login.html";
        button.textContent = originalText;
      }
    });
  });
});
