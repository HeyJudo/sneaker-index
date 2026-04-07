document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-auth-form='login']");
  const message = document.querySelector("[data-auth-message='login']");
  const submitButton = document.querySelector("[data-auth-submit='login']");

  if (!form || !message || !submitButton || !window.SneakerIndexAuthApi) {
    return;
  }

  const defaultButtonLabel = submitButton.textContent.trim();
  const emailInput = form.querySelector("#email");
  const passwordInput = form.querySelector("#password");

  function initializePasswordToggles() {
    const toggles = Array.from(document.querySelectorAll("[data-password-toggle]"));

    toggles.forEach((toggle) => {
      const selector = toggle.getAttribute("data-password-toggle");
      const input = selector ? document.querySelector(selector) : null;

      if (!input) {
        return;
      }

      toggle.addEventListener("click", () => {
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        toggle.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
        const icon = toggle.querySelector(".material-symbols-outlined");
        if (icon) {
          icon.textContent = isHidden ? "visibility_off" : "visibility";
        }
      });
    });
  }

  function getRedirectTarget() {
    const fallbackTarget = "catalog.html";
    const params = new URLSearchParams(window.location.search);
    const requestedTarget = String(params.get("redirect") || "").trim();

    if (!/^[a-z0-9_-]+\.html(?:\?.*)?$/i.test(requestedTarget)) {
      return "";
    }

    return requestedTarget || fallbackTarget;
  }

  function setMessage(type, text) {
    message.textContent = text;
    message.classList.remove("hidden", "text-error", "text-primary-container");
    message.classList.add(
      type === "error" ? "text-error" : "text-primary-container"
    );
  }

  function clearMessage() {
    message.textContent = "";
    message.classList.add("hidden");
    message.classList.remove("text-error", "text-primary-container");
  }

  function setPending(isPending) {
    submitButton.disabled = isPending;
    submitButton.textContent = isPending ? "SIGNING IN..." : defaultButtonLabel;
    submitButton.classList.toggle("opacity-70", isPending);
    submitButton.classList.toggle("cursor-not-allowed", isPending);
  }

  function clearInputError(input) {
    if (!input) {
      return;
    }

    input.classList.remove("border-error");
    input.removeAttribute("aria-invalid");
  }

  function setInputError(input) {
    if (!input) {
      return;
    }

    input.classList.add("border-error");
    input.setAttribute("aria-invalid", "true");
  }

  function clearAllInputErrors() {
    clearInputError(emailInput);
    clearInputError(passwordInput);
  }

  function validateForm(email, password) {
    clearAllInputErrors();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setInputError(emailInput);
      setMessage("error", "Enter a valid email address to continue.");
      emailInput?.focus();
      return false;
    }

    if (!password) {
      setInputError(passwordInput);
      setMessage("error", "Enter your password to continue.");
      passwordInput?.focus();
      return false;
    }

    return true;
  }

  initializePasswordToggles();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();
    clearAllInputErrors();
    setPending(true);

    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!validateForm(email, password)) {
      setPending(false);
      return;
    }

    try {
      const response = await window.SneakerIndexAuthApi.login({
        email,
        password,
      });

      setMessage("success", "Authenticated. Redirecting...");
      form.reset();

      window.setTimeout(() => {
        const requestedRedirect = getRedirectTarget();
        const role = response?.data?.user?.role;
        const isAdmin = role === "admin";
        const isAdminRoute = /^admin-[a-z0-9_-]+\.html(?:\?.*)?$/i.test(
          requestedRedirect
        );
        const fallbackTarget = isAdmin ? "admin-dashboard.html" : "catalog.html";
        const safeRedirect = isAdmin
          ? isAdminRoute
            ? requestedRedirect
            : fallbackTarget
          : isAdminRoute
            ? fallbackTarget
            : requestedRedirect;

        window.location.href = safeRedirect || fallbackTarget;
      }, 1000);
    } catch (error) {
      setInputError(emailInput);
      setInputError(passwordInput);
      setMessage("error", error.message || "Unable to sign in. Verify your credentials and try again.");
    } finally {
      setPending(false);
    }
  });

  [emailInput, passwordInput].forEach((input) => {
    if (!input) {
      return;
    }

    input.addEventListener("input", () => {
      clearInputError(input);
    });
  });
});
