(function attachAccountPage(global) {
  const authApi = global.SneakerIndexAuthApi;

  if (!authApi) {
    return;
  }

  const elements = {
    page: document.querySelector("[data-account-app]"),
    profileForm: document.querySelector("[data-account-profile-form]"),
    profileName: document.querySelector("[data-account-profile-name]"),
    profileEmail: document.querySelector("[data-account-profile-email]"),
    profilePhone: document.querySelector("[data-account-profile-phone]"),
    profileStatus: document.querySelector("[data-account-profile-status]"),
    profileStatusText: document.querySelector("[data-account-profile-status-text]"),
    profileSubmit: document.querySelector("[data-account-profile-submit]"),
    addressSummary: document.querySelector("[data-account-address-summary]"),
    addressName: document.querySelector("[data-account-address-name]"),
    addressLine1: document.querySelector("[data-account-address-line1]"),
    addressLine2: document.querySelector("[data-account-address-line2]"),
    addressLine3: document.querySelector("[data-account-address-line3]"),
    addressSummaryCountry: document.querySelector("[data-account-address-summary-country]"),
    addressEmpty: document.querySelector("[data-account-address-empty]"),
    addressForm: document.querySelector("[data-account-address-form]"),
    addressEdit: document.querySelector("[data-account-address-edit]"),
    addressAdd: document.querySelector("[data-account-address-add]"),
    addressCancel: document.querySelector("[data-account-address-cancel]"),
    addressSubmit: document.querySelector("[data-account-address-submit]"),
    addressStatus: document.querySelector("[data-account-address-status]"),
    addressStatusText: document.querySelector("[data-account-address-status-text]"),
    addressFirstName: document.querySelector("[data-account-address-first-name]"),
    addressLastName: document.querySelector("[data-account-address-last-name]"),
    addressStreet1: document.querySelector("[data-account-address-street-1]"),
    addressStreet2: document.querySelector("[data-account-address-street-2]"),
    addressCity: document.querySelector("[data-account-address-city]"),
    addressState: document.querySelector("[data-account-address-state]"),
    addressPostalCode: document.querySelector("[data-account-address-postal-code]"),
    addressCountry: document.querySelector("[data-account-address-country]"),
    securityForm: document.querySelector("[data-account-security-form]"),
    securityCurrentPassword: document.querySelector("[data-account-current-password]"),
    securityNewPassword: document.querySelector("[data-account-new-password]"),
    securityConfirmPassword: document.querySelector("[data-account-confirm-password]"),
    securityStatus: document.querySelector("[data-account-security-status]"),
    securityStatusText: document.querySelector("[data-account-security-status-text]"),
    securitySubmit: document.querySelector("[data-account-security-submit]"),
    latestOrderName: document.querySelector("[data-account-latest-order-name]"),
    latestOrderMeta: document.querySelector("[data-account-latest-order-meta]"),
  };

  if (!elements.page) {
    return;
  }

  const state = {
    user: null,
  };

  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function hasSavedAddress(address) {
    if (!address) {
      return false;
    }

    return [
      address.firstName,
      address.lastName,
      address.addressLine1,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].every(isNonEmptyString);
  }

  function setSectionStatus(container, textNode, tone, message) {
    if (!container || !textNode) {
      return;
    }

    const toneClass =
      tone === "error"
        ? "bg-error text-white"
        : "bg-primary text-white";

    container.className = `${toneClass} border-none p-4 flex justify-between items-center zero-radius`;
    textNode.textContent = message;
    container.classList.remove("hidden");
  }

  function clearSectionStatus(container, textNode) {
    if (!container || !textNode) {
      return;
    }

    textNode.textContent = "";
    container.classList.add("hidden");
  }

  function setPending(button, pendingLabel, isPending) {
    if (!button) {
      return;
    }

    if (!button.dataset.defaultLabel) {
      button.dataset.defaultLabel = button.textContent.trim();
    }

    button.disabled = isPending;
    button.textContent = isPending
      ? pendingLabel
      : button.dataset.defaultLabel;
    button.classList.toggle("opacity-70", isPending);
    button.classList.toggle("cursor-not-allowed", isPending);
  }

  function renderLatestAcquisition() {
    if (!elements.latestOrderName || !elements.latestOrderMeta) {
      return;
    }

    elements.latestOrderName.textContent = "ORDER HISTORY";
    elements.latestOrderMeta.textContent = "Review your recent acquisitions.";
  }

  function renderProfile(user) {
    if (elements.profileName) {
      elements.profileName.value = user.fullName || `${user.firstName} ${user.lastName}`.trim();
    }

    if (elements.profileEmail) {
      elements.profileEmail.value = user.email || "";
    }

    if (elements.profilePhone) {
      elements.profilePhone.value = user.phone || "";
    }
  }

  function renderAddressSummary(address) {
    const isSaved = hasSavedAddress(address);

    elements.addressSummary?.classList.toggle("hidden", !isSaved);
    elements.addressEmpty?.classList.toggle("hidden", isSaved);

    if (!isSaved) {
      return;
    }

    if (elements.addressName) {
      elements.addressName.textContent = `${address.firstName} ${address.lastName}`.trim();
    }

    if (elements.addressLine1) {
      elements.addressLine1.textContent = address.addressLine1 || "";
    }

    if (elements.addressLine2) {
      elements.addressLine2.textContent = address.addressLine2 || "";
      elements.addressLine2.classList.toggle("hidden", !isNonEmptyString(address.addressLine2));
    }

    if (elements.addressLine3) {
      elements.addressLine3.textContent = `${address.city}, ${address.state} ${address.postalCode}`.trim();
    }

    if (elements.addressSummaryCountry) {
      elements.addressSummaryCountry.textContent = address.country || "";
    }
  }

  function populateAddressForm(address) {
    if (elements.addressFirstName) {
      elements.addressFirstName.value = address?.firstName || state.user?.firstName || "";
    }

    if (elements.addressLastName) {
      elements.addressLastName.value = address?.lastName || state.user?.lastName || "";
    }

    if (elements.addressStreet1) {
      elements.addressStreet1.value = address?.addressLine1 || "";
    }

    if (elements.addressStreet2) {
      elements.addressStreet2.value = address?.addressLine2 || "";
    }

    if (elements.addressCity) {
      elements.addressCity.value = address?.city || "";
    }

    if (elements.addressState) {
      elements.addressState.value = address?.state || "";
    }

    if (elements.addressPostalCode) {
      elements.addressPostalCode.value = address?.postalCode || "";
    }

    if (elements.addressCountry) {
      elements.addressCountry.value = address?.country || "United States";
    }
  }

  function toggleAddressForm(show) {
    elements.addressForm?.classList.toggle("hidden", !show);
  }

  function renderUser(user) {
    state.user = user;
    renderProfile(user);
    renderAddressSummary(user.defaultShippingAddress);
    populateAddressForm(user.defaultShippingAddress);
    renderLatestAcquisition();
  }

  async function refreshUser() {
    const response = await authApi.me();
    renderUser(response.data.user);
  }

  async function submitProfile(event) {
    event.preventDefault();
    clearSectionStatus(elements.profileStatus, elements.profileStatusText);
    setPending(elements.profileSubmit, "SAVING PROFILE...", true);

    try {
      const response = await authApi.updateProfile({
        fullName: elements.profileName?.value.trim() || "",
        email: elements.profileEmail?.value.trim() || "",
        phone: elements.profilePhone?.value.trim() || "",
      });

      renderUser(response.data.user);
      setSectionStatus(
        elements.profileStatus,
        elements.profileStatusText,
        "success",
        "PROFILE UPDATED SUCCESSFULLY."
      );
    } catch (error) {
      setSectionStatus(
        elements.profileStatus,
        elements.profileStatusText,
        "error",
        error.message || "Unable to update profile."
      );
    } finally {
      setPending(elements.profileSubmit, "SAVING PROFILE...", false);
    }
  }

  async function submitAddress(event) {
    event.preventDefault();
    clearSectionStatus(elements.addressStatus, elements.addressStatusText);
    setPending(elements.addressSubmit, "SAVING ADDRESS...", true);

    try {
      const response = await authApi.updateProfile({
        defaultShippingAddress: {
          firstName: elements.addressFirstName?.value.trim() || "",
          lastName: elements.addressLastName?.value.trim() || "",
          addressLine1: elements.addressStreet1?.value.trim() || "",
          addressLine2: elements.addressStreet2?.value.trim() || "",
          city: elements.addressCity?.value.trim() || "",
          state: elements.addressState?.value.trim() || "",
          postalCode: elements.addressPostalCode?.value.trim() || "",
          country: elements.addressCountry?.value.trim() || "",
        },
      });

      renderUser(response.data.user);
      toggleAddressForm(false);
      setSectionStatus(
        elements.addressStatus,
        elements.addressStatusText,
        "success",
        "DEFAULT SHIPPING ADDRESS SAVED."
      );
    } catch (error) {
      setSectionStatus(
        elements.addressStatus,
        elements.addressStatusText,
        "error",
        error.message || "Unable to save the default address."
      );
    } finally {
      setPending(elements.addressSubmit, "SAVING ADDRESS...", false);
    }
  }

  async function submitPassword(event) {
    event.preventDefault();
    clearSectionStatus(elements.securityStatus, elements.securityStatusText);

    const currentPassword = elements.securityCurrentPassword?.value || "";
    const newPassword = elements.securityNewPassword?.value || "";
    const confirmNewPassword = elements.securityConfirmPassword?.value || "";

    if (newPassword !== confirmNewPassword) {
      setSectionStatus(
        elements.securityStatus,
        elements.securityStatusText,
        "error",
        "NEW PASSWORD CONFIRMATION DOES NOT MATCH."
      );
      return;
    }

    setPending(elements.securitySubmit, "UPDATING SECURITY...", true);

    try {
      await authApi.updatePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      elements.securityForm?.reset();
      setSectionStatus(
        elements.securityStatus,
        elements.securityStatusText,
        "success",
        "SECURITY PROTOCOLS UPDATED."
      );
    } catch (error) {
      setSectionStatus(
        elements.securityStatus,
        elements.securityStatusText,
        "error",
        error.message || "Unable to update the password."
      );
    } finally {
      setPending(elements.securitySubmit, "UPDATING SECURITY...", false);
    }
  }

  function bindEvents() {
    elements.profileForm?.addEventListener("submit", submitProfile);
    elements.addressForm?.addEventListener("submit", submitAddress);
    elements.securityForm?.addEventListener("submit", submitPassword);

    elements.addressEdit?.addEventListener("click", () => {
      clearSectionStatus(elements.addressStatus, elements.addressStatusText);
      populateAddressForm(state.user?.defaultShippingAddress);
      toggleAddressForm(true);
    });

    elements.addressAdd?.addEventListener("click", () => {
      clearSectionStatus(elements.addressStatus, elements.addressStatusText);
      populateAddressForm(state.user?.defaultShippingAddress);
      toggleAddressForm(true);
    });

    elements.addressCancel?.addEventListener("click", () => {
      toggleAddressForm(false);
    });
  }

  async function init() {
    bindEvents();
    toggleAddressForm(false);

    try {
      await refreshUser();
    } catch (_error) {
      // Protected route handling is already managed by session-ui.
    }
  }

  init();
})(window);
