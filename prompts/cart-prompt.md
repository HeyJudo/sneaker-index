# Sneaker Index — Shopping Cart / Shopping Bag Page (cart.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, image_3272a7.png (structural reference only — styling overridden), signup.html, catalog.html -->

A premium, editorial-grade shopping cart page for "Sneaker Index." This is the functional heartbeat of the storefront — where the curatorial browsing experience converts into a transaction. Disregard the soft, rounded tech-product aesthetic of the reference image (image_3272a7.png); adopt only its functional two-column layout structure (cart items left, order summary right). Every visual surface — buttons, cards, inputs, panels — is rebuilt from scratch using the Sneaker Index design system: zero-radius sharp geometry, Bebas Neue / Lato typographic clash, and the Sovereign Cobalt accent thread. The page should feel like a well-organized invoice at a high-fashion atelier — clinical, confident, and devoid of unnecessary decoration.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel (Summary Sidebar): Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): primary CTA background, price displays, active interactive states — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): footer background, logo accent "S" color — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): primary CTA hover state — `secondary`, `hover:bg-secondary`
- Text Primary — Charcoal Ink (#181c20): main headlines, product names, body text — `on-surface`
- Text Secondary — Storm Slate (#444654): meta labels, secondary copy — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): subdued labels, brand attribution
- Error / Remove Actions — Error (#ba1a1a): remove button hover or destructive action accents — `error`
- Footer Background: Royal Blueprint (#1a3fc4) — matches all other Sneaker Index pages
- Typography Display: Bebas Neue — all H1/H2/H3, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — labels, prices, button text, navigation, all interactive text
- Button Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Input Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Card/Panel Shape: ZERO border-radius.
- Cobalt Grade Effect (REQUIRED on all product imagery): `.cobalt-grade` — `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- Transitions: `transition-colors` 150ms ease for color changes; `transition-all` with `active:scale-[0.98]` for button presses
- Navigation: Glassmorphism — white/90 opacity, backdrop-blur-10px, bottom hairline border `border-b border-black/5`, max-w-[1440px]

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of the catalog and signup page navigation — pixel-perfect consistency required.
- `<nav class="fixed top-0 w-full z-50 glass-nav border-b border-black/5 shadow-sm">`
- Inner container: `flex justify-between items-center px-8 h-20 max-w-[1440px] mx-auto w-full`.
- Left: "SNEAKER INDEX" wordmark — `<a href="index.html">`, Bebas Neue (`font-headline`), `text-3xl`, `tracking-tight`. Leading "S" in Royal Blueprint (#1a3fc4 via inline `style="color: #1a3fc4;"`), remaining "NEAKER INDEX" in Charcoal Ink (#181c20).
- Center nav links (`hidden md:flex items-center gap-8`): "Home" → `index.html` | "Shop" → `catalog.html` | "Men" → `catalog.html` | "Women" → `catalog.html`. All links: Lato (`font-body`), `text-xs`, `uppercase`, `tracking-widest`, `text-on-surface-variant`, `hover:text-primary`, `transition-colors`.
- Right icon cluster (`flex items-center gap-6`): `shopping_bag` icon → `cart.html` (active state: `text-primary` Sovereign Cobalt, indicating we are on the cart page) | `person` icon → `signup.html` — both Material Symbols Outlined, `text-on-surface`, `hover:text-primary`, `transition-colors`.

---

**SECTION 2 — MAIN CART CONTENT AREA**

**Outer Wrapper:**
- `<main class="min-h-screen pt-28 pb-24 px-4 md:px-8">`.
- Inner container: `<div class="max-w-[1440px] mx-auto">`.

**Page Headline:**
- `<h1>` — "YOUR SHOPPING BAG" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink (`text-on-surface`), `mb-2`.
- Subtitle item count: "(3 ITEMS)" — Lato (`font-body`), `text-sm`, Storm Slate (`text-on-surface-variant`), `uppercase tracking-widest`, positioned inline or directly below the H1.
- A thin horizontal divider separating the headline from the content: `<div class="w-full h-px bg-black/10 mt-4 mb-12"></div>`.

**Two-Column Layout:**
- `<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">`.
- Left panel (cart items): `lg:col-span-2`.
- Right panel (order summary): `lg:col-span-1`.

---

**SECTION 2A — LEFT PANEL (Cart Item List)**

**Cart Item Row Structure (repeat for each product — show 3 sample items):**
- Each item is a `<div>` with `class="flex gap-6 md:gap-8 py-8 border-b border-black/5"`.
- No rounded corners. No card elevation. Flat, minimal, separated by hairline borders.
- Layout: horizontal flex row — image on left, details center, price right.

**Product Image (Left):**
- Container: `<div class="relative cobalt-grade w-[120px] h-[120px] md:w-[160px] md:h-[160px] bg-surface-container-low flex-shrink-0 overflow-hidden">`.
- Image: `<img class="w-full h-full object-contain p-4">` — a clean product shot (sneaker against neutral background).
- **REQUIRED:** The `.cobalt-grade` class MUST be on the container `<div>`, applying the 15% Royal Blueprint tint overlay via `::after` pseudo-element.

**Product Details (Center):**
- Container: `<div class="flex-1 flex flex-col justify-between">`.
- Top section:
  - Brand label: "NIKE" — Lato (`font-label`), `text-[10px]`, `uppercase`, `tracking-[0.2em]`, Silver Mist (`text-slate-400`).
  - Product Name: "AIR MAX PULSE" — Bebas Neue (`font-headline`), `text-xl md:text-2xl`, Charcoal Ink (`text-on-surface`).
  - Colorway: "Wolf Grey / White / Black" — Lato (`font-body`), `text-xs`, Storm Slate (`text-on-surface-variant`).
  - Size: "Size: US 10" — Lato (`font-body`), `text-xs`, Storm Slate (`text-on-surface-variant`), `mt-1`.
- Bottom section (actions row): `<div class="flex items-center gap-6 mt-4">`.
  - **Quantity Selector:** A compact inline control with ZERO border-radius:
    - Container: `<div class="flex items-center border border-black/15">`.
    - Minus button: `<button class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors">` containing a Material Symbols Outlined `remove` icon (or a "−" character).
    - Quantity display: `<span class="w-10 h-8 flex items-center justify-center text-sm font-bold font-body border-x border-black/15">1</span>`.
    - Plus button: same as minus but with `add` icon (or "+").
    - No rounded corners. Pure sharp geometry.
  - **Remove Link:** `<button class="font-body text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors font-bold">REMOVE</button>`. Hover state transitions to Error (#ba1a1a).

**Price (Right):**
- Container: `<div class="flex-shrink-0 text-right flex flex-col justify-between">`.
- Current Price: "$160.00" — Bebas Neue (`font-headline`), `text-2xl`, Sovereign Cobalt (`text-primary`).
- Optional original price (if on sale): "$200.00" — Lato (`font-body`), `text-sm`, Silver Mist (`text-slate-400`), `line-through`.

**Sample Cart Items (3 products for demo):**
1. **Nike Air Max Pulse** — Wolf Grey / White / Black — Size US 10 — $160.00
2. **Jordan AJ1 Retro High OG** — University Blue / White — Size US 9.5 — $180.00
3. **New Balance 2002R Protection Pack** — Rain Cloud / Phantom — Size US 11 — $149.99

**"Clear All" Link (positioned above cart items, flush right):**
- `<div class="flex justify-end mb-4">`.
- `<button class="font-body text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors font-bold">CLEAR CART</button>`.

---

**SECTION 2B — RIGHT PANEL (Order Summary Sidebar)**

**Container:**
- `<div class="bg-surface-container-low p-8 md:p-12 lg:sticky lg:top-28">` — Powder Blue-Grey (#f1f4f9) background, generous padding, sticky on scroll (offset to clear the fixed nav).
- Shape: ZERO border-radius. No shadow. Just tonal surface differentiation.

**Headline:**
- `<h2>` — "ORDER SUMMARY" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink (`text-on-surface`), `mb-8`.

**Promo Code Input (Optional):**
- Container: `<div class="flex gap-2 mb-8">`.
- Input: `<input class="flex-1 border border-black/15 bg-white px-4 py-3 font-body text-sm uppercase tracking-widest placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors" placeholder="PROMO CODE" type="text">`.
- Apply Button: `<button class="bg-on-surface text-white px-6 py-3 font-body text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-colors">APPLY</button>`.
- All ZERO border-radius.

**Line Items:**
- Container: `<div class="space-y-4 mb-8">`.
- Each line: `<div class="flex justify-between items-center">`.
  - Label: Lato (`font-body`), `text-sm`, Storm Slate (`text-on-surface-variant`).
  - Value: Lato (`font-body`), `text-sm`, Charcoal Ink (`text-on-surface`), `font-bold`.
- Lines to display:
  1. "Subtotal" → "$489.99"
  2. "Shipping" → "FREE" (Sovereign Cobalt `text-primary` for emphasis)
  3. "Discount" → "-$0.00"

**Divider:**
- `<div class="w-full h-px bg-black/10 my-6"></div>`.

**Grand Total:**
- `<div class="flex justify-between items-center mb-10">`.
  - Label: "TOTAL" — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink.
  - Value: "$489.99" — Bebas Neue (`font-headline`), `text-2xl`, Sovereign Cobalt (`text-primary`).

**Primary CTA:**
- `<button class="w-full bg-primary py-5 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] flex items-center justify-center gap-2">PROCEED TO CHECKOUT <span class="material-symbols-outlined text-sm">arrow_forward</span></button>`.
- Background: Sovereign Cobalt (#00289c). Hover: Electric Cobalt (#0051d5). Shape: ZERO border-radius.

**Secondary CTA:**
- `<a href="catalog.html" class="w-full mt-4 border-2 border-black/20 py-4 text-on-surface font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-surface-container-lowest hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">CONTINUE SHOPPING</a>`.
- Transparent background, Charcoal Ink text. Hover: border transitions to Sovereign Cobalt, text transitions to Sovereign Cobalt. Shape: ZERO border-radius. Display as `block` or `inline-flex`.

**Trust Badges (Below CTAs):**
- `<div class="mt-8 space-y-3">`.
- 3 minimal trust lines, each: `<div class="flex items-center gap-3">` with a Material Symbols Outlined icon (`verified`, `local_shipping`, `lock`) in Silver Mist + Lato `text-[10px] uppercase tracking-widest text-on-surface-variant`.
  1. `verified` — "AUTHENTICITY GUARANTEED"
  2. `local_shipping` — "FREE SHIPPING OVER $150"
  3. `lock` — "SECURE CHECKOUT"

---

**SECTION 2C — EMPTY CART STATE (Alternate View)**

This view replaces the entire two-column layout when the cart has zero items. It must be built into the page as a hidden/shown toggle (or just present as the default state for Stitch to render).

**Container:**
- `<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-8">`.

**Icon:**
- Material Symbols Outlined `shopping_bag` — `text-[80px]`, Powder Blue-Grey (#dfe3e8 / `text-surface-container-highest`), `mb-8`. Very large, ghosted, serving as a visual anchor.

**Headline:**
- "YOUR BAG IS EMPTY." — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink (`text-on-surface`), `mb-4`.

**Subtitle:**
- "Discover our latest drops and start building your collection." — Lato (`font-body`), `text-base`, Storm Slate (`text-on-surface-variant`), `italic`, `max-w-md`, `mb-10`.

**CTA Button:**
- `<a href="catalog.html" class="bg-primary px-12 py-5 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2">EXPLORE COLLECTION <span class="material-symbols-outlined text-sm">arrow_forward</span></a>`.
- Sovereign Cobalt background, sharp edges, uppercase Lato bold.

---

**SECTION 3 — PERSISTENT FOOTER**
- Exact copy of the signup page and landing page footer — pixel-perfect consistency required.
- Royal Blueprint (#1a3fc4) background (`style="background-color: #1a3fc4;"` to override), full-width.
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
- Full Tailwind config color token map MUST be defined in `<script id="tailwind-config">` (matching existing pages): primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families in Tailwind config: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override in Tailwind config: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to all product image containers.
- CSS class `.glass-nav` MUST be defined for the navbar glassmorphism effect.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No form inputs, buttons, or panels may possess a border-radius greater than 0px.
