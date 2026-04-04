document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-auth-form='signup']");
  const message = document.querySelector("[data-auth-message='signup']");
  const submitButton = document.querySelector("[data-auth-submit='signup']");

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
    message.classList.remove("hidden", "text-error", "text-primary");
    message.classList.add(type === "error" ? "text-error" : "text-primary");
  }

  function clearMessage() {
    message.textContent = "";
    message.classList.add("hidden");
    message.classList.remove("text-error", "text-primary");
  }

  function setPending(isPending) {
    submitButton.disabled = isPending;
    submitButton.textContent = isPending ? "CREATING ACCOUNT..." : defaultButtonLabel;
    submitButton.classList.toggle("opacity-70", isPending);
    submitButton.classList.toggle("cursor-not-allowed", isPending);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();
    setPending(true);

    const inputs = form.querySelectorAll("input");
    const fullName = String(inputs[0]?.value || "").trim();
    const email = String(inputs[1]?.value || "").trim();
    const password = String(inputs[2]?.value || "");
    const confirmPassword = String(inputs[3]?.value || "");

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
