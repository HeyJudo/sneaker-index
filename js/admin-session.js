document.addEventListener("DOMContentLoaded", () => {
  const api = window.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

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
