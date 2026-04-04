(function attachCheckoutPage(global) {
  const api = global.SneakerIndexStoreApi;
  const authApi = global.SneakerIndexAuthApi;

  if (!api) {
    return;
  }

  const SHIPPING_METHODS = {
    standard: {
      label: "Standard Shipping",
      price: 0,
    },
    express: {
      label: "Express Delivery",
      price: 25,
    },
    overnight: {
      label: "Overnight Priority",
      price: 45,
    },
  };

  const TAX_RATE = 0.08;

  const elements = {
    app: document.querySelector("[data-checkout-app]"),
    shell: document.querySelector("[data-checkout-shell]"),
    status: document.querySelector("[data-checkout-status]"),
    empty: document.querySelector("[data-checkout-empty]"),
    confirmation: document.querySelector("[data-checkout-confirmation]"),
    shippingStep: document.querySelector("[data-checkout-step='shipping']"),
    paymentStep: document.querySelector("[data-checkout-step='payment']"),
    confirmStep: document.querySelector("[data-checkout-step='confirmation']"),
    email: document.querySelector("[data-checkout-email]"),
    firstName: document.querySelector("[data-checkout-first-name]"),
    lastName: document.querySelector("[data-checkout-last-name]"),
    addressLine1: document.querySelector("[data-checkout-address-line-1]"),
    addressLine2: document.querySelector("[data-checkout-address-line-2]"),
    city: document.querySelector("[data-checkout-city]"),
    state: document.querySelector("[data-checkout-state]"),
    postalCode: document.querySelector("[data-checkout-postal-code]"),
    country: document.querySelector("[data-checkout-country]"),
    shippingOptions: Array.from(document.querySelectorAll("[data-checkout-shipping-option]")),
    paymentButtons: Array.from(document.querySelectorAll("[data-checkout-payment-option]")),
    selectedItems: document.querySelector("[data-checkout-selected-items]"),
    subtotal: document.querySelector("[data-checkout-subtotal]"),
    shipping: document.querySelector("[data-checkout-shipping]"),
    tax: document.querySelector("[data-checkout-tax]"),
    discount: document.querySelector("[data-checkout-discount]"),
    total: document.querySelector("[data-checkout-total]"),
    placeOrder: document.querySelector("[data-checkout-place-order]"),
    confirmationOrderNumber: document.querySelector("[data-checkout-confirmation-order]"),
    confirmationTotal: document.querySelector("[data-checkout-confirmation-total]"),
    confirmationEmail: document.querySelector("[data-checkout-confirmation-email]"),
  };

  if (!elements.app) {
    return;
  }

  const state = {
    cart: null,
    selectedItems: [],
    shippingMethod: "standard",
    paymentMethod: "card",
  };

  const fieldConfig = [
    {
      key: "email",
      element: elements.email,
      label: "Email address",
      getValue: () => elements.email?.value.trim() || "",
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Enter a valid email address.",
    },
    {
      key: "firstName",
      element: elements.firstName,
      label: "First name",
      getValue: () => elements.firstName?.value.trim() || "",
      validate: Boolean,
      message: "First name is required.",
    },
    {
      key: "lastName",
      element: elements.lastName,
      label: "Last name",
      getValue: () => elements.lastName?.value.trim() || "",
      validate: Boolean,
      message: "Last name is required.",
    },
    {
      key: "addressLine1",
      element: elements.addressLine1,
      label: "Street address",
      getValue: () => elements.addressLine1?.value.trim() || "",
      validate: Boolean,
      message: "Street address is required.",
    },
    {
      key: "city",
      element: elements.city,
      label: "City",
      getValue: () => elements.city?.value.trim() || "",
      validate: Boolean,
      message: "City is required.",
    },
    {
      key: "state",
      element: elements.state,
      label: "State",
      getValue: () => elements.state?.value.trim() || "",
      validate: Boolean,
      message: "State is required.",
    },
    {
      key: "postalCode",
      element: elements.postalCode,
      label: "ZIP code",
      getValue: () => elements.postalCode?.value.trim() || "",
      validate: Boolean,
      message: "ZIP code is required.",
    },
    {
      key: "country",
      element: elements.country,
      label: "Country",
      getValue: () => elements.country?.value.trim() || "",
      validate: Boolean,
      message: "Country is required.",
    },
  ];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value || 0);
  }

  function getSummary() {
    const subtotal = state.selectedItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = SHIPPING_METHODS[state.shippingMethod]?.price || 0;
    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const discount = 0;

    return {
      subtotal,
      shipping,
      tax,
      discount,
      total: Number((subtotal + shipping + tax - discount).toFixed(2)),
    };
  }

  function setStatus(message, tone) {
    if (!elements.status) {
      return;
    }

    const className =
      tone === "error"
        ? "border-error bg-error-container/10 text-error"
        : "border-primary bg-secondary-fixed text-primary";

    elements.status.className = `border p-6 flex items-center gap-4 ${className}`;
    elements.status.innerHTML = `
      <span class="material-symbols-outlined">${tone === "error" ? "error" : "check_circle"}</span>
      <p class="font-bold uppercase text-xs tracking-widest">${escapeHtml(message)}</p>
    `;
    elements.status.classList.remove("hidden");
  }

  function clearStatus() {
    if (!elements.status) {
      return;
    }

    elements.status.classList.add("hidden");
    elements.status.innerHTML = "";
  }

  function getFieldLabel(element) {
    return element?.closest(".space-y-4")?.querySelector("label") || null;
  }

  function getFieldErrorElement(element) {
    const wrapper = element?.closest(".space-y-4");

    if (!wrapper) {
      return null;
    }

    let errorElement = wrapper.querySelector("[data-field-error]");

    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.setAttribute("data-field-error", "");
      errorElement.className = "hidden text-[10px] uppercase tracking-[0.2em] font-bold text-error";
      wrapper.appendChild(errorElement);
    }

    return errorElement;
  }

  function annotateRequiredFields() {
    fieldConfig.forEach((field) => {
      if (!field.element) {
        return;
      }

      const label = getFieldLabel(field.element);

      if (label && !label.dataset.requiredAnnotated) {
        label.insertAdjacentHTML(
          "beforeend",
          ' <span class="text-error font-bold" aria-hidden="true">*</span>'
        );
        label.dataset.requiredAnnotated = "true";
      }

      field.element.required = true;
      field.element.setAttribute("aria-required", "true");
    });
  }

  function clearFieldError(field) {
    if (!field?.element) {
      return;
    }

    field.element.classList.remove("border-error", "bg-error-container/20");
    field.element.classList.add("border-outline-variant");
    field.element.removeAttribute("aria-invalid");

    const errorElement = getFieldErrorElement(field.element);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }
  }

  function setFieldError(field, message) {
    if (!field?.element) {
      return;
    }

    field.element.classList.remove("border-outline-variant");
    field.element.classList.add("border-error", "bg-error-container/20");
    field.element.setAttribute("aria-invalid", "true");

    const errorElement = getFieldErrorElement(field.element);

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }
  }

  function clearAllFieldErrors() {
    fieldConfig.forEach(clearFieldError);
  }

  function validateFields() {
    clearAllFieldErrors();

    const invalidFields = fieldConfig.filter((field) => !field.validate(field.getValue()));

    invalidFields.forEach((field) => {
      setFieldError(field, field.message);
    });

    return invalidFields;
  }

  function markStep(activeStep) {
    const activeClass = "text-primary border-b-2 border-primary pb-2";
    const inactiveClass = "text-outline-variant pb-2";

    [
      [elements.shippingStep, "shipping"],
      [elements.paymentStep, "payment"],
      [elements.confirmStep, "confirmation"],
    ].forEach(([element, step]) => {
      if (!element) {
        return;
      }

      element.className = step === activeStep ? activeClass : inactiveClass;
    });
  }

  function renderEmptyState() {
    if (elements.shell) {
      elements.shell.classList.add("hidden");
    }

    if (elements.confirmation) {
      elements.confirmation.classList.add("hidden");
    }

    if (elements.empty) {
      elements.empty.classList.remove("hidden");
    }
  }

  function renderSelectedItems() {
    if (!elements.selectedItems) {
      return;
    }

    elements.selectedItems.innerHTML = state.selectedItems
      .map(
        (item) => `
          <div class="flex gap-6 group">
            <div class="w-24 h-24 cobalt-grade flex-shrink-0 bg-surface-container-low">
              <img alt="${escapeHtml(item.product.name)}" class="w-full h-full object-cover" src="${escapeHtml(item.product.heroImage || "")}">
            </div>
            <div class="flex flex-col justify-between py-1">
              <div>
                <h4 class="text-xl leading-none font-bebas">${escapeHtml(item.product.name)}</h4>
                <p class="text-xs text-on-surface-variant uppercase mt-2 font-bold">Size: US ${escapeHtml(item.sizeLabel)} | Qty: ${item.quantity}</p>
              </div>
              <span class="text-lg font-bebas">${formatPrice(item.lineTotal)}</span>
            </div>
          </div>
        `
      )
      .join("");
  }

  function renderSummary() {
    const summary = getSummary();

    renderSelectedItems();

    if (elements.subtotal) {
      elements.subtotal.textContent = formatPrice(summary.subtotal);
    }

    if (elements.shipping) {
      elements.shipping.textContent =
        summary.shipping === 0 ? "Free" : formatPrice(summary.shipping);
    }

    if (elements.tax) {
      elements.tax.textContent = formatPrice(summary.tax);
    }

    if (elements.discount) {
      elements.discount.textContent = formatPrice(summary.discount);
    }

    if (elements.total) {
      elements.total.textContent = formatPrice(summary.total);
    }
  }

  function renderShippingOptions() {
    elements.shippingOptions.forEach((option) => {
      const isActive = option.dataset.shippingMethod === state.shippingMethod;
      option.classList.toggle("border-primary", isActive);
      option.classList.toggle("bg-secondary-fixed/20", isActive);

      const input = option.querySelector("input[type='radio']");
      if (input) {
        input.checked = isActive;
      }
    });
  }

  function renderPaymentOptions() {
    elements.paymentButtons.forEach((button) => {
      const isActive = button.dataset.paymentMethod === state.paymentMethod;

      button.className = isActive
        ? "flex-1 py-4 bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2"
        : "flex-1 py-4 bg-surface-container-low text-on-surface-variant text-xs font-bold tracking-[0.2em] uppercase hover:bg-surface-container-highest flex items-center justify-center gap-2";
    });
  }

  async function loadCheckoutData() {
    const cartResponse = await api.getCart();
    state.cart = cartResponse.data.cart;
    state.selectedItems = (state.cart.items || []).filter((item) => item.selectedForCheckout);

    if (!state.selectedItems.length) {
      renderEmptyState();
      setStatus("Select at least one item in the cart before opening checkout.", "error");
      return;
    }

    if (authApi?.me) {
      try {
        const userResponse = await authApi.me();
        const user = userResponse.data.user;

        if (elements.email) {
          elements.email.value = user.email || "";
        }

        if (elements.firstName && !elements.firstName.value) {
          elements.firstName.value = user.firstName || "";
        }

        if (elements.lastName && !elements.lastName.value) {
          elements.lastName.value = user.lastName || "";
        }
      } catch (_error) {
        // Guests are allowed through checkout, so ignore auth preload failures.
      }
    }

    renderShippingOptions();
    renderPaymentOptions();
    renderSummary();
  }

  function collectPayload() {
    return {
      email: elements.email?.value.trim() || "",
      shippingMethod: state.shippingMethod,
      paymentMethod: state.paymentMethod,
      shippingAddress: {
        firstName: elements.firstName?.value.trim() || "",
        lastName: elements.lastName?.value.trim() || "",
        addressLine1: elements.addressLine1?.value.trim() || "",
        addressLine2: elements.addressLine2?.value.trim() || "",
        city: elements.city?.value.trim() || "",
        state: elements.state?.value.trim() || "",
        postalCode: elements.postalCode?.value.trim() || "",
        country: elements.country?.value.trim() || "",
      },
    };
  }

  function renderConfirmation(order) {
    if (elements.shell) {
      elements.shell.classList.add("hidden");
    }

    if (elements.empty) {
      elements.empty.classList.add("hidden");
    }

    if (elements.confirmation) {
      elements.confirmation.classList.remove("hidden");
    }

    if (elements.confirmationOrderNumber) {
      elements.confirmationOrderNumber.textContent = order.orderNumber;
    }

    if (elements.confirmationTotal) {
      elements.confirmationTotal.textContent = formatPrice(order.pricing.total);
    }

    if (elements.confirmationEmail) {
      elements.confirmationEmail.textContent = order.email;
    }

    clearStatus();
    markStep("confirmation");
  }

  async function submitOrder() {
    const payload = collectPayload();
    const invalidFields = validateFields();

    if (invalidFields.length) {
      setStatus("Complete the required checkout fields highlighted below.", "error");
      invalidFields[0].element?.focus();
      return;
    }

    if (!state.selectedItems.length) {
      setStatus("No cart items are selected for checkout.", "error");
      return;
    }

    const originalLabel = elements.placeOrder?.textContent;

    if (elements.placeOrder) {
      elements.placeOrder.disabled = true;
      elements.placeOrder.textContent = "PLACING ORDER";
    }

    clearStatus();

    try {
      const response = await api.createOrder(payload);
      renderConfirmation(response.data.order);
    } catch (error) {
      setStatus(error.message || "Unable to place order.", "error");
    } finally {
      if (elements.placeOrder) {
        elements.placeOrder.disabled = false;
        elements.placeOrder.textContent = originalLabel || "PLACE ORDER";
      }
    }
  }

  function bindEvents() {
    elements.shippingOptions.forEach((option) => {
      option.addEventListener("click", () => {
        state.shippingMethod = option.dataset.shippingMethod || "standard";
        renderShippingOptions();
        renderSummary();
      });
    });

    elements.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.paymentMethod = button.dataset.paymentMethod || "card";
        renderPaymentOptions();
        markStep("payment");
      });
    });

    if (elements.placeOrder) {
      elements.placeOrder.addEventListener("click", async (event) => {
        event.preventDefault();
        markStep("payment");
        await submitOrder();
      });
    }

    fieldConfig.forEach((field) => {
      if (!field.element) {
        return;
      }

      const eventName = field.element.tagName === "SELECT" ? "change" : "input";

      field.element.addEventListener(eventName, () => {
        if (field.validate(field.getValue())) {
          clearFieldError(field);
        }
      });
    });
  }

  async function init() {
    markStep("shipping");
    annotateRequiredFields();
    bindEvents();

    try {
      await loadCheckoutData();
    } catch (error) {
      renderEmptyState();
      setStatus(error.message || "Unable to load checkout.", "error");
    }
  }

  init();
})(window);
