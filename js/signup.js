document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-auth-form='signup']");
  const message = document.querySelector("[data-auth-message='signup']");
  const submitButton = document.querySelector("[data-auth-submit='signup']");
  const fullNameInput = document.querySelector("[name='fullName']");
  const emailInput = document.querySelector("[name='email']");
  const passwordInput = document.querySelector("[name='password']");
  const confirmPasswordInput = document.querySelector("[name='confirmPassword']");
  const passwordRules = {
    length: document.querySelector("[data-password-rule='length']"),
    case: document.querySelector("[data-password-rule='case']"),
    number: document.querySelector("[data-password-rule='number']"),
    special: document.querySelector("[data-password-rule='special']"),
  };

  if (
    !form ||
    !message ||
    !submitButton ||
    !window.SneakerIndexAuthApi ||
    !fullNameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput
  ) {
    return;
  }

  const defaultButtonLabel = submitButton.textContent.trim();

  function getRedirectTarget() {
    const fallbackTarget = "catalog.html";
    const params = new URLSearchParams(window.location.search);
    const requestedTarget = String(params.get("redirect") || "").trim();

    if (!/^[a-z0-9_-]+\.html(?:\?.*)?$/i.test(requestedTarget)) {
      return fallbackTarget;
    }

    return requestedTarget;
  }

  function setMessage(type, text) {
    message.textContent = text;
    message.classList.remove("hidden", "text-error", "text-primary");
    message.classList.add(type === "error" ? "text-error" : "text-primary");
  }

  function clearMessage() {
    message.textContent = "";
    message.classList.add("hidden");
    message.classList.remove("text-error", "text-primary");
  }

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

  function getPasswordValidationState(password) {
    return {
      length: password.length >= 8,
      case: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }

  function updateRuleIndicator(ruleElement, isValid) {
    if (!ruleElement) {
      return;
    }

    ruleElement.classList.remove("text-error", "text-primary", "text-on-surface-variant");
    ruleElement.classList.add(isValid ? "text-primary" : "text-error");
    ruleElement.textContent = `${isValid ? "✓" : "✕"} ${ruleElement.textContent.replace(/^[✓✕]\s*/, "")}`;
  }

  function syncPasswordRequirements(password) {
    const validationState = getPasswordValidationState(password);

    updateRuleIndicator(passwordRules.length, validationState.length);
    updateRuleIndicator(passwordRules.case, validationState.case);
    updateRuleIndicator(passwordRules.number, validationState.number);
    updateRuleIndicator(passwordRules.special, validationState.special);

    return Object.values(validationState).every(Boolean);
  }

  function setPending(isPending) {
    submitButton.disabled = isPending;
    submitButton.textContent = isPending ? "CREATING ACCOUNT..." : defaultButtonLabel;
    submitButton.classList.toggle("opacity-70", isPending);
    submitButton.classList.toggle("cursor-not-allowed", isPending);
  }

  initializePasswordToggles();
  syncPasswordRequirements("");

  passwordInput.addEventListener("input", () => {
    syncPasswordRequirements(String(passwordInput.value || ""));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();
    setPending(true);

    const fullName = String(fullNameInput.value || "").trim();
    const email = String(emailInput.value || "").trim();
    const password = String(passwordInput.value || "");
    const confirmPassword = String(confirmPasswordInput.value || "");
    const passwordIsValid = syncPasswordRequirements(password);

    if (!passwordIsValid) {
      setPending(false);
      setMessage(
        "error",
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPending(false);
      setMessage("error", "Password confirmation does not match.");
      return;
    }

    try {
      await window.SneakerIndexAuthApi.signup({
        fullName,
        email,
        password,
        confirmPassword,
      });

      setMessage("success", "Account created. Redirecting...");
      form.reset();
      syncPasswordRequirements("");

      window.setTimeout(() => {
        window.location.href = getRedirectTarget();
      }, 1200);
    } catch (error) {
      setMessage("error", error.message || "Unable to create account.");
    } finally {
      setPending(false);
    }
  });
});
