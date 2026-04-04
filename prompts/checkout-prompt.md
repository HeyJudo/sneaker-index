# Sneaker Index — Secure Checkout Page (checkout.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, checkout reference image (structural reference only — styling overridden), cart.html, signup.html -->

A premium, editorial-grade secure checkout page for "Sneaker Index." This is the final transactional gate — the moment curatorial browsing becomes ownership. Disregard entirely the soft, rounded, pastel-blue SaaS checkout aesthetic of the reference image; adopt only its functional two-column architecture (forms left, order summary right) and its step-based progress indicator concept. Every surface is rebuilt from the ground up using the Sneaker Index design system: zero-radius sharp geometry, the Bebas Neue / Lato typographic clash, and the Sovereign Cobalt accent thread. The page should feel like signing a purchase agreement at a high-fashion auction house — secure, authoritative, and immaculately structured. There is no visual softness here.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel (Summary Sidebar): Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Input Field Background: Powder Blue-Grey (#f1f4f9) — `surface-container-low`, with `border-0 border-b-2 border-surface-container-highest`
- Primary Accent — Sovereign Cobalt (#00289c): primary CTA background, active form borders, selected radio states, active progress step — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): footer background, logo accent "S" color — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): primary CTA hover state — `secondary`, `hover:bg-secondary`
- Text Primary — Charcoal Ink (#181c20): section headlines, input text, form labels — `on-surface`
- Text Secondary — Storm Slate (#444654): secondary labels, helper text — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): placeholders, inactive progress steps, subdued labels
- Error Color — Error (#ba1a1a): inline validation errors, required field highlights — `error`
- Success Color — use a muted teal-green (#166534 or Tailwind `green-800`) for success confirmations, keeping it within the cool-toned palette
- Footer Background: Royal Blueprint (#1a3fc4) — matches all Sneaker Index pages
- Typography Display: Bebas Neue — all H1/H2/H3/section headers, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — form labels, inputs, button text, pricing, navigation, all interactive text
- Button Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Input Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Card/Panel Shape: ZERO border-radius.
- Cobalt Grade Effect (REQUIRED on product thumbnails): `.cobalt-grade` — `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- Transitions: `transition-colors` 150ms ease; buttons use `transition-all` with `active:scale-[0.98]`
- Navigation: Glassmorphism — white/90 opacity, backdrop-blur-10px, bottom hairline border, max-w-[1440px]

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of all other Sneaker Index pages — pixel-perfect consistency required.
- `<nav class="fixed top-0 w-full z-50 glass-nav border-b border-black/5 shadow-sm">`.
- Inner container: `flex justify-between items-center px-8 h-20 max-w-[1440px] mx-auto w-full`.
- Left: "SNEAKER INDEX" wordmark — `<a href="index.html">`, Bebas Neue (`font-headline`), `text-3xl`, `tracking-tight`. Leading "S" in Royal Blueprint (#1a3fc4 via inline `style="color: #1a3fc4;"`), remaining "NEAKER INDEX" in Charcoal Ink (#181c20).
- Center nav links (`hidden md:flex items-center gap-8`): "Home" → `index.html` | "Shop" → `catalog.html` | "Men" → `catalog.html` | "Women" → `catalog.html`. All links: Lato (`font-body`), `text-xs`, `uppercase`, `tracking-widest`, `text-on-surface-variant`, `hover:text-primary`, `transition-colors`. No active state on any nav link (checkout is not a nav destination).
- Right icon cluster (`flex items-center gap-6`): `shopping_bag` icon → `cart.html` | `person` icon → `signup.html` — both Material Symbols Outlined, `text-on-surface`, `hover:text-primary`, `transition-colors`.

---

**SECTION 2 — PROGRESS INDICATOR**

**Container:**
- `<div class="max-w-[1440px] mx-auto px-4 md:px-8 pt-28 pb-6">`.
- A horizontal, typographic step tracker — NO circles, NO colored dots. Pure text-based, editorial.

**Structure:**
- `<div class="flex items-center justify-center gap-3 md:gap-6">`.
- 3 steps displayed inline, separated by arrow chevrons:
  1. **"1. SHIPPING"** — completed state: Sovereign Cobalt (`text-primary`), `font-bold`.
  2. **Chevron separator:** Material Symbols Outlined `chevron_right`, Silver Mist (`text-slate-400`), `text-sm`.
  3. **"2. PAYMENT"** — active state: Sovereign Cobalt (`text-primary`), `font-bold`, with a 2px bottom border underline (`border-b-2 border-primary pb-1`).
  4. **Chevron separator.**
  5. **"3. CONFIRMATION"** — inactive: Silver Mist (`text-slate-400`), `font-normal`.
- All step labels: Lato (`font-body`), `text-[10px] md:text-xs`, `uppercase`, `tracking-[0.2em]`.

---

**SECTION 3 — MAIN CHECKOUT CONTENT**

**Outer Wrapper:**
- `<main class="pb-24 px-4 md:px-8">`.
- Inner container: `<div class="max-w-[1440px] mx-auto">`.

**Two-Column Layout:**
- `<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">`.
- Left panel (forms): `lg:col-span-2`.
- Right panel (order summary): `lg:col-span-1`.

---

**SECTION 3A — LEFT PANEL (Checkout Forms)**

**Inline Message Zone (top of left panel):**
- `<div class="mb-6">` — reserved for validation feedback.
- Default state: hidden or empty.
- Error state: `<div class="border-2 border-error bg-error/5 px-6 py-4 flex items-center gap-3">` — sharp-cornered box (ZERO radius), thin Error (#ba1a1a) border, barely tinted error background, Material Symbols `error` icon in `text-error`, message text in Lato `text-sm font-bold text-error`.
- Success state: `<div class="border-2 border-green-800 bg-green-800/5 px-6 py-4 flex items-center gap-3">` — same structure, green-toned.

---

**FORM BLOCK 1 — CONTACT INFORMATION**

**Section Header:**
- `<h2>` — "CONTACT INFORMATION" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink (`text-on-surface`), `mb-6`.
- A thin divider beneath: `<div class="w-16 h-[3px] bg-primary mb-8"></div>` — a small Sovereign Cobalt accent bar (brand signature detail from the landing page hero).

**Fields:**
- Container: `<div class="space-y-6 mb-12">`.
- **Email Address** — single full-width field.

**Field Styling (applies to ALL form inputs on this page — MUST match signup.html field convention):**
- Container: `<div class="space-y-1">`.
- Label: `<label>`, Lato (`font-lato`), `text-[10px]`, `uppercase`, `font-black`, `tracking-widest`, Storm Slate (`text-on-surface-variant`).
- Input: `<input class="w-full border-0 border-b-2 border-surface-container-highest bg-surface-container-low px-4 py-3 focus:ring-0 focus:border-primary transition-colors font-lato text-sm">`.
- Shape: ZERO border-radius (enforced globally by Tailwind config).
- Placeholder: uppercase, Silver Mist color via `placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest`.

---

**FORM BLOCK 2 — SHIPPING DETAILS**

**Section Header:**
- `<h2>` — "SHIPPING DETAILS" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink, `mb-6`.
- Accent bar: `<div class="w-16 h-[3px] bg-primary mb-8"></div>`.

**Fields:**
- Container: `<div class="space-y-6 mb-12">`.
- Row 1: **First Name** + **Last Name** — side by side in `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`.
- Row 2: **Street Address** — full-width.
- Row 3: **Apartment / Suite / Unit** — full-width (optional, label includes "(OPTIONAL)").
- Row 4: **City** + **State/Province** — side by side.
- Row 5: **ZIP / Postal Code** + **Country** — side by side. Country uses a `<select>` dropdown with the same sharp-edge styling as inputs.

**Shipping Method Selection (mt-8):**
- `<h3>` — "SHIPPING METHOD" — Bebas Neue, `text-2xl`, Charcoal Ink, `mb-6`.
- 3 options displayed as sharp-bordered selectable cards (custom radio):
  - Container for each: `<label class="flex items-center justify-between p-5 border-2 border-black/10 cursor-pointer hover:border-primary transition-colors mb-3 group">`.
  - Selected state: `border-2 border-primary bg-primary/5`.
  - Left side: Custom sharp radio indicator (a `<div class="w-4 h-4 border-2 border-black/30 mr-4 flex-shrink-0">` — when selected, inner fill with `<div class="w-2 h-2 bg-primary m-auto">`). ZERO radius — these are squares, not circles.
  - Center: Shipping name + estimated delivery — Lato, `text-sm`, Charcoal Ink for name, Storm Slate for delivery estimate.
  - Right: Price — Lato, `text-sm`, `font-bold`, Charcoal Ink.
  - Options:
    1. "STANDARD SHIPPING" — "5-7 Business Days" — "FREE"
    2. "EXPRESS SHIPPING" — "2-3 Business Days" — "$14.99"
    3. "OVERNIGHT" — "Next Business Day" — "$29.99"

---

**FORM BLOCK 3 — PAYMENT METHOD**

**Section Header:**
- `<h2>` — "PAYMENT METHOD" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink, `mb-6`.
- Accent bar: `<div class="w-16 h-[3px] bg-primary mb-8"></div>`.

**Payment Option Tabs (custom radio selection):**
- Container: `<div class="flex gap-0 mb-8">` — flush tabs with no gap.
- 3 tab buttons, behaving as radio selectors:
  1. "CREDIT CARD" — default active.
  2. "PAYPAL"
  3. "BANK TRANSFER"
- Each tab: `<button class="flex-1 py-4 border-2 border-black/10 font-body text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant transition-all hover:border-primary">`.
- Active tab override: `border-primary bg-primary text-white` — filled Sovereign Cobalt, white text. The tab "lights up" in brand color.
- Shape: ZERO border-radius. Tabs are sharp rectangles placed flush next to each other with overlapping borders (`-ml-[2px]` on non-first tabs to collapse double borders).

**Credit Card Fields (shown when "CREDIT CARD" tab is active):**
- Container: `<div class="space-y-6">`.
- **Card Number** — full-width. Input includes a Material Symbols `credit_card` icon positioned inside the input (left-padded: `pl-12`, icon absolute-positioned at `left-4`).
- **Expiry Date** + **CVV** — side by side in `grid grid-cols-2 gap-6`. CVV input includes a Material Symbols `help_outline` icon on the right for tooltip hint.
- **Cardholder Name** — full-width.
- Accepted card badges: below the Card Number field, a row of 4 small monochrome payment icons (Visa, Mastercard, Amex, Discover) rendered as small `<span>` badges: `text-[9px] uppercase tracking-widest font-bold border border-black/10 px-2 py-1 text-slate-400`. Sharp edges. Displayed inline: `<div class="flex gap-2 mt-2">`.

**Save Info Checkbox (mt-6):**
- `<label class="flex items-center gap-3 cursor-pointer group">`.
- Custom checkbox: `<div class="w-4 h-4 border-2 border-black/30 flex items-center justify-center">` — ZERO radius (square). Checked state: `bg-primary border-primary` with a white `check` Material Symbol icon inside (`text-[10px] text-white`).
- Text: "Save my information for faster checkout" — Lato, `text-xs`, Storm Slate (`text-on-surface-variant`).

---

**SECTION 3B — RIGHT PANEL (Order Summary Sidebar)**

**Container:**
- `<div class="bg-surface-container-low p-8 md:p-12 lg:sticky lg:top-28">` — Powder Blue-Grey (#f1f4f9) background, generous padding, sticky on scroll (offset `top-28` to clear the fixed nav).
- Shape: ZERO border-radius.

**Headline:**
- `<h2>` — "ORDER SUMMARY" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink (`text-on-surface`), `mb-8`.

**Cart Items Preview (Mini Cart):**
- Container: `<div class="space-y-6 mb-8 pb-8 border-b border-black/10">`.
- Each item row: `<div class="flex gap-4 items-center">`.
  - **Thumbnail:** `<div class="relative cobalt-grade w-[64px] h-[64px] bg-surface-container-lowest flex-shrink-0 overflow-hidden">` with `<img class="w-full h-full object-contain p-2">`. **REQUIRED:** `.cobalt-grade` class on container.
  - **Details:** `<div class="flex-1">`.
    - Name: "AIR MAX PULSE" — Bebas Neue (`font-headline`), `text-sm`, Charcoal Ink.
    - Meta: "Size: US 10 · Qty: 1" — Lato, `text-[10px]`, Storm Slate, `uppercase tracking-widest`.
  - **Price:** "$160.00" — Lato (`font-body`), `text-sm`, `font-bold`, Charcoal Ink.
- Display 3 sample items:
  1. Nike Air Max Pulse — US 10 — Qty 1 — $160.00
  2. Jordan AJ1 Retro High OG — US 9.5 — Qty 1 — $180.00
  3. New Balance 2002R — US 11 — Qty 1 — $149.99

**Promo Code Input:**
- Container: `<div class="flex gap-2 mb-8 pb-8 border-b border-black/10">`.
- Input: `<input class="flex-1 border border-black/15 bg-white px-4 py-3 font-body text-sm uppercase tracking-widest placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors" placeholder="PROMO CODE">`.
- Apply Button: `<button class="bg-on-surface text-white px-6 py-3 font-body text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-colors">APPLY</button>`.
- All ZERO border-radius.

**Summary Line Items:**
- Container: `<div class="space-y-4 mb-8">`.
- Each line: `<div class="flex justify-between items-center">`.
  - Label: Lato, `text-sm`, Storm Slate.
  - Value: Lato, `text-sm`, Charcoal Ink, `font-bold`.
- Lines:
  1. "Subtotal" → "$489.99"
  2. "Shipping" → "FREE" (Sovereign Cobalt `text-primary`)
  3. "Tax" → "$34.30"
  4. "Discount" → "-$0.00"

**Divider:**
- `<div class="w-full h-px bg-black/10 my-6"></div>`.

**Grand Total:**
- `<div class="flex justify-between items-center mb-10">`.
  - Label: "TOTAL" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink.
  - Value: "$524.29" — Bebas Neue (`font-headline`), `text-3xl`, Sovereign Cobalt (`text-primary`).

**Primary CTA:**
- `<button class="w-full bg-primary py-5 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] flex items-center justify-center gap-2">`.
- Text: "PLACE ORDER" with optional `<span class="material-symbols-outlined text-sm">lock</span>` lock icon for security emphasis.
- Background: Sovereign Cobalt (#00289c). Hover: Electric Cobalt (#0051d5). Shape: ZERO border-radius.

**Security Assurance (Below CTA):**
- `<div class="mt-6 flex items-center justify-center gap-2">`.
- Material Symbols `lock` icon in Silver Mist, `text-sm`.
- Text: "SECURED BY 256-BIT SSL ENCRYPTION" — Lato, `text-[9px]`, Silver Mist (`text-slate-400`), `uppercase tracking-[0.2em]`.

**Trust Badges (mt-6):**
- `<div class="mt-6 space-y-3">`.
- 3 trust lines, each: `<div class="flex items-center gap-3">` + Material Symbols icon (`verified`, `local_shipping`, `replay`) in Silver Mist + Lato `text-[10px] uppercase tracking-widest text-on-surface-variant`:
  1. `verified` — "AUTHENTICITY GUARANTEED"
  2. `local_shipping` — "FREE RETURNS WITHIN 30 DAYS"
  3. `replay` — "EASY EXCHANGES"

---

**SECTION 4 — PERSISTENT FOOTER**
- Exact copy of all other Sneaker Index page footers — pixel-perfect consistency required.
- Royal Blueprint (#1a3fc4) background (`style="background-color: #1a3fc4;"` to override any Tailwind class conflict), full-width.
- Container: `py-20 px-16`, `grid grid-cols-1 md:grid-cols-4 gap-12`, `max-w-[1400px] mx-auto`.
- Column 1: "SNEAKER INDEX" wordmark Bebas Neue (`font-bebas`) `text-2xl tracking-tighter text-white` + brand description Lato `text-[10px] uppercase tracking-[0.2em] leading-relaxed text-white`.
- Column 2: "Navigations" header (`font-lato text-[11px] font-black uppercase tracking-[0.3em] mb-4 text-white`) + links (The Manifesto, Authentication, Contact) — `font-lato text-[10px] uppercase tracking-[0.1em] text-white/90 hover:text-white transition-opacity`.
- Column 3: "Support" header + links (Shipping, Terms, Privacy) — same styling.
- Column 4: "Connect" header + social icons (`material-symbols-outlined text-white hover:text-white cursor-pointer`: `public`, `chat_bubble`, `alternate_email`) + copyright divider `border-t border-white/10 pt-8 mt-8` with `font-lato text-[9px] uppercase tracking-[0.2em] italic text-white/60`: "© 2024 SNEAKER INDEX. CURATED EXCELLENCE."

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map MUST be defined in `<script id="tailwind-config">` (matching existing pages exactly): primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families in Tailwind config: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override in Tailwind config: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to all product thumbnail containers.
- CSS class `.glass-nav` MUST be defined for the navbar glassmorphism effect.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No form inputs, buttons, radio selectors, checkboxes, tabs, or panels may possess a border-radius greater than 0px.
- Custom radio and checkbox indicators MUST be squares (0px radius), NOT circles.
