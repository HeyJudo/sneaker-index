document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-auth-form='login']");
  const message = document.querySelector("[data-auth-message='login']");
  const submitButton = document.querySelector("[data-auth-submit='login']");

  if (!form || !message || !submitButton || !window.SneakerIndexAuthApi) {
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();
    setPending(true);

    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      await window.SneakerIndexAuthApi.login({
        email,
        password,
      });

      setMessage("success", "Authenticated. Redirecting...");
      form.reset();

      window.setTimeout(() => {
        window.location.href = getRedirectTarget();
      }, 1000);
    } catch (error) {
      setMessage("error", error.message || "Unable to sign in.");
    } finally {
      setPending(false);
    }
  });
});
