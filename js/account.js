(function attachAccountPage(global) {
  const authApi = global.SneakerIndexAuthApi;

  if (!authApi) {
    return;
  }

  const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAzU9EANlwsMYot_w5DxWXrtMVsvffr_RPMcYJ5JZovWG75tyV1ecEHmTb6yQsWO8xGwwAYbHi7nlea6bsdclRLu9Xkr_eAYFm2YSfDwmB0g4YM68EPp6q2y3WxDic-grP2130DkyR6lYnHw2Nk3U2BulTIvSmu2d61O_e6Bu7F9-Kz3x67d5JTrqgQpm-uaDdyTzqHynxKmgh6opLo8mtOGzI23Bi6myH_iq-BoQlLTNBGwTbaZtFtwNfkPaOgQ8GBoL9e2hcZ2SA";

  const elements = {
    page: document.querySelector("[data-account-app]"),
    avatarPreview: document.querySelector("[data-account-avatar-preview]"),
    avatarFile: document.querySelector("[data-account-avatar-file]"),
    avatarTrigger: document.querySelector("[data-account-avatar-trigger]"),
    avatarReset: document.querySelector("[data-account-avatar-reset]"),
    unsavedNotice: document.querySelector("[data-account-unsaved-notice]"),
    unsavedText: document.querySelector("[data-account-unsaved-text]"),
    unsavedDismiss: document.querySelector("[data-account-unsaved-dismiss]"),
    profileForm: document.querySelector("[data-account-profile-form]"),
    profileName: document.querySelector("[data-account-profile-name]"),
    profileEmail: document.querySelector("[data-account-profile-email]"),
    profilePhone: document.querySelector("[data-account-profile-phone]"),
    profileStatus: document.querySelector("[data-account-profile-status]"),
    profileStatusText: document.querySelector("[data-account-profile-status-text]"),
    profileSubmit: document.querySelector("[data-account-profile-submit]"),
    addressList: document.querySelector("[data-account-address-list]"),
    addressEmpty: document.querySelector("[data-account-address-empty]"),
    addressForm: document.querySelector("[data-account-address-form]"),
    addressId: document.querySelector("[data-account-address-id]"),
    addressLabel: document.querySelector("[data-account-address-label]"),
    addressDefault: document.querySelector("[data-account-address-default]"),
    addressFirstName: document.querySelector("[data-account-address-first-name]"),
    addressLastName: document.querySelector("[data-account-address-last-name]"),
    addressStreet1: document.querySelector("[data-account-address-street-1]"),
    addressStreet2: document.querySelector("[data-account-address-street-2]"),
    addressCity: document.querySelector("[data-account-address-city]"),
    addressState: document.querySelector("[data-account-address-state]"),
    addressPostalCode: document.querySelector("[data-account-address-postal-code]"),
    addressCountry: document.querySelector("[data-account-address-country]"),
    addressAdd: document.querySelector("[data-account-address-add]"),
    addressCancel: document.querySelector("[data-account-address-cancel]"),
    addressSubmit: document.querySelector("[data-account-address-submit]"),
    addressStatus: document.querySelector("[data-account-address-status]"),
    addressStatusText: document.querySelector("[data-account-address-status-text]"),
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
    avatarUrl: "",
    shippingAddresses: [],
    editingAddressId: "",
    baselines: {
      profile: "",
      address: "",
      security: "",
    },
    dirty: {
      profile: false,
      address: false,
      security: false,
    },
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function normalizeValue(value) {
    if (typeof value === "string") {
      return value.trim();
    }

    return value ?? "";
  }

  function serializeComparable(value) {
    return JSON.stringify(value);
  }

  function getProfileSnapshot() {
    return serializeComparable({
      fullName: normalizeValue(elements.profileName?.value),
      email: normalizeValue(elements.profileEmail?.value),
      phone: normalizeValue(elements.profilePhone?.value),
      avatarUrl: normalizeValue(state.avatarUrl),
    });
  }

  function getAddressSnapshot() {
    return serializeComparable({
      id: normalizeValue(elements.addressId?.value),
      label: normalizeValue(elements.addressLabel?.value),
      isDefault: Boolean(elements.addressDefault?.checked),
      firstName: normalizeValue(elements.addressFirstName?.value),
      lastName: normalizeValue(elements.addressLastName?.value),
      addressLine1: normalizeValue(elements.addressStreet1?.value),
      addressLine2: normalizeValue(elements.addressStreet2?.value),
      city: normalizeValue(elements.addressCity?.value),
      state: normalizeValue(elements.addressState?.value),
      postalCode: normalizeValue(elements.addressPostalCode?.value),
      country: normalizeValue(elements.addressCountry?.value),
    });
  }

  function getSecuritySnapshot() {
    return serializeComparable({
      currentPassword: normalizeValue(elements.securityCurrentPassword?.value),
      newPassword: normalizeValue(elements.securityNewPassword?.value),
      confirmNewPassword: normalizeValue(elements.securityConfirmPassword?.value),
    });
  }

  function hasUnsavedChanges() {
    return Object.values(state.dirty).some(Boolean);
  }

  function getUnsavedMessage() {
    const activeSections = [];

    if (state.dirty.profile) {
      activeSections.push("profile");
    }

    if (state.dirty.address) {
      activeSections.push("destinations");
    }

    if (state.dirty.security) {
      activeSections.push("security");
    }

    if (!activeSections.length) {
      return "Save your updates before leaving this page so the archive reflects them everywhere.";
    }

    return `You have unsaved ${activeSections.join(", ")} changes. Save before leaving so the archive reflects them everywhere.`;
  }

  function renderUnsavedNotice() {
    if (!elements.unsavedNotice || !elements.unsavedText) {
      return;
    }

    const show = hasUnsavedChanges();
    elements.unsavedNotice.classList.toggle("hidden", !show);

    if (show) {
      elements.unsavedText.textContent = getUnsavedMessage();
    }
  }

  function setDirty(section, isDirty) {
    state.dirty[section] = Boolean(isDirty);
    renderUnsavedNotice();
  }

  function refreshDirtyState(section) {
    if (section === "profile") {
      setDirty("profile", getProfileSnapshot() !== state.baselines.profile);
      return;
    }

    if (section === "address") {
      const isFormVisible = !elements.addressForm?.classList.contains("hidden");
      setDirty(
        "address",
        Boolean(isFormVisible && getAddressSnapshot() !== state.baselines.address)
      );
      return;
    }

    if (section === "security") {
      setDirty("security", getSecuritySnapshot() !== state.baselines.security);
    }
  }

  function syncDirtyStates() {
    refreshDirtyState("profile");
    refreshDirtyState("address");
    refreshDirtyState("security");
  }

  function establishBaselines() {
    state.baselines.profile = getProfileSnapshot();
    state.baselines.address = getAddressSnapshot();
    state.baselines.security = getSecuritySnapshot();
    state.dirty.profile = false;
    state.dirty.address = false;
    state.dirty.security = false;
    renderUnsavedNotice();
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

  function buildDefaultAddress(address = {}) {
    return {
      id: address.id || "",
      label: address.label || "Primary Address",
      firstName: address.firstName || state.user?.firstName || "",
      lastName: address.lastName || state.user?.lastName || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "United States",
      isDefault: Boolean(address.isDefault),
    };
  }

  function getAddresses() {
    return Array.isArray(state.shippingAddresses) ? state.shippingAddresses : [];
  }

  function getResolvedAvatarUrl() {
    return state.avatarUrl || state.user?.avatarUrl || DEFAULT_AVATAR;
  }

  function renderAvatar() {
    if (elements.avatarPreview) {
      elements.avatarPreview.src = getResolvedAvatarUrl();
    }
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

  function renderAddressList() {
    if (!elements.addressList || !elements.addressEmpty) {
      return;
    }

    const addresses = getAddresses();

    elements.addressEmpty.classList.toggle("hidden", addresses.length > 0);
    elements.addressList.classList.toggle("hidden", addresses.length === 0);

    if (!addresses.length) {
      elements.addressList.innerHTML = "";
      return;
    }

    elements.addressList.innerHTML = addresses
      .map(
        (address) => `
          <article class="border border-surface-container-highest p-6 space-y-4 zero-radius si-fade-up" data-account-address-card="${escapeHtml(address.id || "")}">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">${escapeHtml(address.label || "Saved Address")}</p>
                <h4 class="font-headline text-2xl uppercase mt-2">${escapeHtml(`${address.firstName} ${address.lastName}`.trim())}</h4>
              </div>
              ${address.isDefault ? '<span class="text-[10px] tracking-[0.2em] font-bold bg-primary text-white px-3 py-2 uppercase">Default</span>' : ""}
            </div>
            <div class="text-sm space-y-1 text-on-surface-variant">
              <p>${escapeHtml(address.addressLine1)}</p>
              ${isNonEmptyString(address.addressLine2) ? `<p>${escapeHtml(address.addressLine2)}</p>` : ""}
              <p>${escapeHtml(`${address.city}, ${address.state} ${address.postalCode}`.trim())}</p>
              <p>${escapeHtml(address.country)}</p>
            </div>
            <div class="flex flex-wrap gap-4 pt-2">
              <button class="text-[10px] tracking-[0.2em] font-bold border-b border-primary text-primary uppercase py-1" data-account-address-edit="${escapeHtml(address.id || "")}" type="button">Edit</button>
              ${address.isDefault ? "" : `<button class="text-[10px] tracking-[0.2em] font-bold border-b border-outline text-on-surface-variant uppercase py-1" data-account-address-default="${escapeHtml(address.id || "")}" type="button">Make Default</button>`}
              <button class="text-[10px] tracking-[0.2em] font-bold border-b border-error text-error uppercase py-1" data-account-address-remove="${escapeHtml(address.id || "")}" type="button">Remove</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  function populateAddressForm(address) {
    const resolvedAddress = buildDefaultAddress(address);

    if (elements.addressId) {
      elements.addressId.value = resolvedAddress.id || "";
    }

    if (elements.addressLabel) {
      elements.addressLabel.value = resolvedAddress.label || "";
    }

    if (elements.addressDefault) {
      elements.addressDefault.checked = Boolean(resolvedAddress.isDefault);
    }

    if (elements.addressFirstName) {
      elements.addressFirstName.value = resolvedAddress.firstName;
    }

    if (elements.addressLastName) {
      elements.addressLastName.value = resolvedAddress.lastName;
    }

    if (elements.addressStreet1) {
      elements.addressStreet1.value = resolvedAddress.addressLine1;
    }

    if (elements.addressStreet2) {
      elements.addressStreet2.value = resolvedAddress.addressLine2;
    }

    if (elements.addressCity) {
      elements.addressCity.value = resolvedAddress.city;
    }

    if (elements.addressState) {
      elements.addressState.value = resolvedAddress.state;
    }

    if (elements.addressPostalCode) {
      elements.addressPostalCode.value = resolvedAddress.postalCode;
    }

    if (elements.addressCountry) {
      elements.addressCountry.value = resolvedAddress.country;
    }
  }

  function toggleAddressForm(show) {
    elements.addressForm?.classList.toggle("hidden", !show);
  }

  function normalizeAddresses(addresses) {
    const source = Array.isArray(addresses) ? addresses : [];

    if (!source.length && state.user?.defaultShippingAddress?.addressLine1) {
      return [buildDefaultAddress({ ...state.user.defaultShippingAddress, isDefault: true })];
    }

    const normalized = source.map((address, index) => buildDefaultAddress({
      ...address,
      label: address.label || `Address ${index + 1}`,
    }));

    if (!normalized.length) {
      return [];
    }

    const defaultIndex = normalized.findIndex((address) => address.isDefault);
    const resolvedDefaultIndex = defaultIndex >= 0 ? defaultIndex : 0;

    return normalized.map((address, index) => ({
      ...address,
      isDefault: index === resolvedDefaultIndex,
    }));
  }

  function renderUser(user) {
    state.user = user;
    state.avatarUrl = user.avatarUrl || state.avatarUrl || "";
    state.shippingAddresses = normalizeAddresses(user.shippingAddresses);
    renderProfile(user);
    renderAvatar();
    renderAddressList();
    renderLatestAcquisition();
    populateAddressForm(state.shippingAddresses.find((address) => address.isDefault));
    establishBaselines();
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
        avatarUrl: state.avatarUrl || "",
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

  async function persistAddresses(nextAddresses, successMessage) {
    const response = await authApi.updateProfile({
      shippingAddresses: nextAddresses,
    });

    renderUser(response.data.user);
    toggleAddressForm(false);
    setSectionStatus(
      elements.addressStatus,
      elements.addressStatusText,
      "success",
      successMessage
    );
  }

  async function submitAddress(event) {
    event.preventDefault();
    clearSectionStatus(elements.addressStatus, elements.addressStatusText);
    setPending(elements.addressSubmit, "SAVING ADDRESS...", true);

    try {
      const address = buildDefaultAddress({
        id: elements.addressId?.value.trim() || "",
        label: elements.addressLabel?.value.trim() || "Saved Address",
        firstName: elements.addressFirstName?.value.trim() || "",
        lastName: elements.addressLastName?.value.trim() || "",
        addressLine1: elements.addressStreet1?.value.trim() || "",
        addressLine2: elements.addressStreet2?.value.trim() || "",
        city: elements.addressCity?.value.trim() || "",
        state: elements.addressState?.value.trim() || "",
        postalCode: elements.addressPostalCode?.value.trim() || "",
        country: elements.addressCountry?.value.trim() || "United States",
        isDefault: Boolean(elements.addressDefault?.checked),
      });

      let nextAddresses = [...getAddresses()];
      const existingIndex = nextAddresses.findIndex((entry) => entry.id && entry.id === address.id);

      if (existingIndex >= 0) {
        nextAddresses[existingIndex] = address;
      } else {
        nextAddresses.push(address);
      }

      if (!nextAddresses.some((entry) => entry.isDefault)) {
        nextAddresses = nextAddresses.map((entry, index) => ({
          ...entry,
          isDefault: index === 0,
        }));
      } else if (address.isDefault) {
        nextAddresses = nextAddresses.map((entry) => ({
          ...entry,
          isDefault: (entry.id && address.id && entry.id === address.id) || (!entry.id && !address.id && entry.label === address.label),
        }));
      }

      await persistAddresses(nextAddresses, existingIndex >= 0 ? "ADDRESS UPDATED." : "ADDRESS SAVED.");
    } catch (error) {
      setSectionStatus(
        elements.addressStatus,
        elements.addressStatusText,
        "error",
        error.message || "Unable to save the address."
      );
    } finally {
      setPending(elements.addressSubmit, "SAVING ADDRESS...", false);
    }
  }

  async function setDefaultAddress(addressId) {
    clearSectionStatus(elements.addressStatus, elements.addressStatusText);

    try {
      const nextAddresses = getAddresses().map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      }));

      await persistAddresses(nextAddresses, "DEFAULT DESTINATION UPDATED.");
    } catch (error) {
      setSectionStatus(
        elements.addressStatus,
        elements.addressStatusText,
        "error",
        error.message || "Unable to update the default address."
      );
    }
  }

  async function removeAddress(addressId) {
    clearSectionStatus(elements.addressStatus, elements.addressStatusText);

    try {
      let nextAddresses = getAddresses().filter((address) => address.id !== addressId);

      if (nextAddresses.length && !nextAddresses.some((address) => address.isDefault)) {
        nextAddresses[0].isDefault = true;
      }

      await persistAddresses(nextAddresses, "ADDRESS REMOVED.");
    } catch (error) {
      setSectionStatus(
        elements.addressStatus,
        elements.addressStatusText,
        "error",
        error.message || "Unable to remove the address."
      );
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
      state.baselines.security = getSecuritySnapshot();
      refreshDirtyState("security");
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

  function openFilePicker() {
    elements.avatarFile?.click();
  }

  function scrollToDirtySection() {
    const target =
      state.dirty.profile
        ? elements.profileForm
        : state.dirty.address
          ? elements.addressForm || elements.addressList || elements.addressAdd
          : state.dirty.security
            ? elements.securityForm
            : null;

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetAvatar() {
    state.avatarUrl = "";
    renderAvatar();
    refreshDirtyState("profile");
    setSectionStatus(
      elements.profileStatus,
      elements.profileStatusText,
      "success",
      "PORTRAIT RESET LOCALLY. SAVE PROFILE CHANGES TO APPLY IT ACROSS YOUR ARCHIVE."
    );
  }

  function bindEvents() {
    elements.profileForm?.addEventListener("submit", submitProfile);
    elements.addressForm?.addEventListener("submit", submitAddress);
    elements.securityForm?.addEventListener("submit", submitPassword);

    elements.avatarTrigger?.addEventListener("click", openFilePicker);
    elements.avatarReset?.addEventListener("click", resetAvatar);

    elements.avatarFile?.addEventListener("change", async (event) => {
      const [file] = Array.from(event.target.files || []);

      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        state.avatarUrl = String(reader.result || "");
        renderAvatar();
        refreshDirtyState("profile");
        setSectionStatus(
          elements.profileStatus,
          elements.profileStatusText,
          "success",
          "PORTRAIT STAGED. SAVE PROFILE CHANGES TO REFLECT IT ACROSS YOUR ARCHIVE."
        );
      };
      reader.readAsDataURL(file);
    });

    elements.unsavedDismiss?.addEventListener("click", () => {
      scrollToDirtySection();
    });

    elements.profileForm
      ?.querySelectorAll("input, select, textarea")
      .forEach((field) => {
        field.addEventListener("input", () => refreshDirtyState("profile"));
        field.addEventListener("change", () => refreshDirtyState("profile"));
      });

    elements.addressForm
      ?.querySelectorAll("input, select, textarea")
      .forEach((field) => {
        field.addEventListener("input", () => refreshDirtyState("address"));
        field.addEventListener("change", () => refreshDirtyState("address"));
      });

    elements.securityForm
      ?.querySelectorAll("input, select, textarea")
      .forEach((field) => {
        field.addEventListener("input", () => refreshDirtyState("security"));
        field.addEventListener("change", () => refreshDirtyState("security"));
      });

    elements.addressAdd?.addEventListener("click", () => {
      clearSectionStatus(elements.addressStatus, elements.addressStatusText);
      elements.addressForm?.reset();
      populateAddressForm();
      toggleAddressForm(true);
      state.baselines.address = getAddressSnapshot();
      refreshDirtyState("address");
    });

    elements.addressCancel?.addEventListener("click", () => {
      if (state.dirty.address && !global.confirm("Discard your unsaved destination changes?")) {
        return;
      }

      toggleAddressForm(false);
      populateAddressForm(state.shippingAddresses.find((address) => address.isDefault));
      state.baselines.address = getAddressSnapshot();
      refreshDirtyState("address");
    });

    elements.addressList?.addEventListener("click", async (event) => {
      const editButton = event.target.closest("[data-account-address-edit]");
      const defaultButton = event.target.closest("[data-account-address-default]");
      const removeButton = event.target.closest("[data-account-address-remove]");

      if (editButton) {
        const address = getAddresses().find((entry) => entry.id === editButton.dataset.accountAddressEdit);
        if (address) {
          clearSectionStatus(elements.addressStatus, elements.addressStatusText);
          populateAddressForm(address);
          toggleAddressForm(true);
          state.baselines.address = getAddressSnapshot();
          refreshDirtyState("address");
        }
        return;
      }

      if (defaultButton) {
        await setDefaultAddress(defaultButton.dataset.accountAddressDefault);
        return;
      }

      if (removeButton) {
        await removeAddress(removeButton.dataset.accountAddressRemove);
      }
    });

    global.addEventListener("beforeunload", (event) => {
      if (!hasUnsavedChanges()) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    });

    document.addEventListener(
      "click",
      (event) => {
        const link = event.target.closest("a[href]");

        if (!link || !hasUnsavedChanges()) {
          return;
        }

        const href = link.getAttribute("href") || "";

        if (!href || href.startsWith("#")) {
          return;
        }

        if (!global.confirm("You have unsaved archive changes. Leave this page anyway?")) {
          event.preventDefault();
        }
      },
      true
    );
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
