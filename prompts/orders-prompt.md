# Sneaker Index — Order History / Purchase Archive (orders.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, account-prompt.md (sidebar spec), appliances-direct order history image (functional reference only — styling completely overridden), Sneaker Index account.html screenshot -->

A premium, editorial-grade order history page for "Sneaker Index." This is the authenticated user's purchase archive — a chronological ledger of every acquisition. It shares the identical dashboard layout established in `account.html`: the same left sidebar (client identity, navigation, recent order preview), but the right main panel is now dedicated entirely to order records. Completely reject the rounded, generic e-commerce order list styling from the reference image. Instead, design order records as sharp-edged digital invoices — clinical, archival, and typographically deliberate. Each order row should feel like a filed receipt at a luxury fashion house. The language is curatorial: "Purchase Archive" not "Order History," "Acquisition" not "Purchase."

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel (Sidebar / Order Cards): Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): active filter tab, active sidebar, status highlights, links — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): footer background, logo accent "S" color — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): CTA hover states — `secondary`, `hover:bg-secondary`
- Text Primary — Charcoal Ink (#181c20): section headlines, order numbers, product names — `on-surface`
- Text Secondary — Storm Slate (#444654): dates, addresses, secondary copy — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): timestamps, inactive tabs, muted labels
- Error Color — Error (#ba1a1a): cancelled order status, error states — `error`
- Success Color — muted teal-green (#166534 / Tailwind `green-800`): delivered status
- Warning/Processing — Sovereign Cobalt (#00289c): processing/shipped status (brand-consistent, no orange/yellow)
- Footer Background: Royal Blueprint (#1a3fc4)
- Typography Display: Bebas Neue — all H1/H2/H3, order numbers, section headers, all-caps, condensed
- Typography Body/UI: Lato — dates, statuses, item details, prices, button text, navigation
- Button Shape: ZERO border-radius
- Card/Panel Shape: ZERO border-radius
- Cobalt Grade Effect: `.cobalt-grade` on all product thumbnails
- Transitions: `transition-colors` 150ms ease; buttons `transition-all` with `active:scale-[0.98]`
- Navigation: Glassmorphism — white/90 opacity, backdrop-blur-10px, bottom hairline border, max-w-[1440px]

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of all other Sneaker Index pages — pixel-perfect consistency.
- `<nav class="fixed top-0 w-full z-50 glass-nav border-b border-black/5 shadow-sm">`.
- Inner container: `flex justify-between items-center px-8 h-20 max-w-[1440px] mx-auto w-full`.
- Left: "SNEAKER INDEX" wordmark — `<a href="index.html">`, Bebas Neue (`font-headline`), `text-3xl`, `tracking-tight`. Leading "S" in Royal Blueprint (#1a3fc4 via inline `style="color: #1a3fc4;"`), remaining "NEAKER INDEX" in Charcoal Ink (#181c20).
- Center nav links (`hidden md:flex items-center gap-8`): "Home" → `index.html` | "Shop" → `catalog.html` | "Men" → `catalog.html` | "Women" → `catalog.html`. All links: Lato (`font-body`), `text-xs`, `uppercase`, `tracking-widest`, `text-on-surface-variant`, `hover:text-primary`, `transition-colors`. No active state on any nav link.
- Right icon cluster (`flex items-center gap-6`): `shopping_bag` icon → `cart.html` | `person` icon → `account.html` (active state: `text-primary` Sovereign Cobalt) — both Material Symbols Outlined.

---

**SECTION 2 — MAIN DASHBOARD CONTENT**

**Outer Wrapper:**
- `<main class="min-h-screen pt-28 pb-24 px-4 md:px-8">`.
- Inner container: `<div class="max-w-[1440px] mx-auto">`.

**Page Headline:**
- `<h1>` — "YOUR ARCHIVE" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink (`text-on-surface`), `mb-2`.
- Subtitle: "A complete record of every acquisition." — Lato (`font-body`), `text-sm`, Storm Slate (`text-on-surface-variant`), `tracking-wide`.
- Divider: `<div class="w-full h-px bg-black/10 mt-4 mb-12"></div>`.

**Two-Column Dashboard Layout:**
- `<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">`.
- Left sidebar: `lg:col-span-1`.
- Right main panel: `lg:col-span-3`.

---

**SECTION 2A — LEFT SIDEBAR (Identical to account.html — "ORDERS" link is now active)**

**Container:**
- `<aside class="lg:sticky lg:top-28">`.

**Client Identity Block:**
- Container: `<div class="bg-surface-container-low p-8 mb-6">`. ZERO radius.
- **Avatar Zone:** `<div class="relative cobalt-grade w-20 h-20 bg-surface-container-lowest overflow-hidden mb-6">`. Square avatar (NOT circular). `.cobalt-grade` overlay. `<img class="w-full h-full object-cover">`.
- **Client Name:** "ALEXANDER WANG" — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink.
- **Email:** "curator@sneakerindex.com" — Lato, `text-xs`, Storm Slate, `tracking-wide`.
- **Status Badge:** `<div class="mt-4 inline-block border-2 border-primary px-4 py-1">` — "CURATED CLIENT" — Lato, `text-[9px]`, `uppercase tracking-[0.2em] font-black text-primary`.
- **Member Since:** "MEMBER SINCE 2024" — Lato, `text-[10px]`, Silver Mist, `uppercase tracking-widest`, `mt-3`.

**Sidebar Navigation Links:**
- Container: `<nav class="space-y-0 mb-6">`.
- Each link: `<a class="flex items-center gap-3 px-6 py-4 font-body text-xs uppercase tracking-[0.15em] transition-colors border-l-4">`.
- **CRITICAL CHANGE from account.html:** The **"ORDERS"** link is now the ACTIVE item (not "PROFILE").
  1. `person` — "IDENTITY" → `account.html` — **inactive:** `border-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-primary`.
  2. `local_shipping` — "ARCHIVE" → `orders.html` — **active:** `border-l-4 border-primary bg-surface-container-low text-primary font-bold`.
  3. `favorite` — "WISHLIST" — **inactive**.
  4. `settings` — "SETTINGS" — **inactive**.
  5. `logout` — "SIGN OUT" — `text-slate-400 hover:text-error`, separated by `mt-4 border-t border-black/5 pt-4`.

**Recent Order Preview (Bottom of Sidebar):**
- Container: `<div class="bg-surface-container-low p-6">`. ZERO radius.
- Header: "LATEST ACQUISITION" — Lato, `text-[10px]`, `uppercase tracking-[0.2em] font-black`, Storm Slate, `mb-4`.
- Thumbnail: `<div class="relative cobalt-grade w-12 h-12 bg-surface-container-lowest overflow-hidden mb-3">` with `<img class="w-full h-full object-contain p-1">`. `.cobalt-grade` applied.
- Order ID: "#SI-20240312" — Lato, `text-xs`, Charcoal Ink, `font-bold`.
- Date: "March 12, 2024" — Lato, `text-[10px]`, Silver Mist, `uppercase tracking-widest`.
- Status: `<span class="inline-block border border-primary px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-primary mt-2">DELIVERED</span>`.
- Total: "$340.00" — Lato, `text-sm`, `font-bold`, Charcoal Ink, `mt-2`.

---

**SECTION 2B — RIGHT MAIN PANEL (Order History Content)**

**Section Header Row:**
- `<div class="flex flex-col md:flex-row md:items-end md:justify-between mb-8">`.
- Left side:
  - `<h2>` — "PURCHASE HISTORY" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink, `mb-2`.
  - Subtitle: "You have **6 orders** in your archive." — Lato, `text-sm`, Storm Slate. The "6 orders" portion is `font-bold text-on-surface`.
  - Accent bar: `<div class="w-16 h-[3px] bg-primary mt-4"></div>`.
- Right side (search — optional):
  - `<div class="mt-4 md:mt-0">`.
  - `<input class="border border-black/15 bg-surface-container-low px-4 py-2 font-body text-[10px] uppercase tracking-widest placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors w-64" placeholder="SEARCH ORDERS..." type="text">`.
  - ZERO radius.

---

**FILTER TABS (Below section header):**

**Container:**
- `<div class="flex gap-0 border-b border-black/10 mb-10">`.
- Tabs sit flush on the bottom border — the active tab's underline replaces the shared border.

**Tab Buttons:**
- Each: `<button class="px-6 py-3 font-body text-[10px] uppercase tracking-[0.2em] font-bold transition-colors">`.
- **Active tab:** `text-primary border-b-2 border-primary -mb-px` — Sovereign Cobalt text with a sharp 2px Cobalt bottom border that sits precisely on the container's bottom border. NOT rounded pills. Sharp, typographic.
- **Inactive tabs:** `text-slate-400 hover:text-on-surface-variant border-b-2 border-transparent -mb-px`.
- Tab items:
  1. "ALL" (active — default)
  2. "PROCESSING"
  3. "SHIPPED"
  4. "DELIVERED"
  5. "CANCELLED"

---

**ORDER LIST (The Invoice Cards):**

**Container:**
- `<div class="space-y-6">` — vertical stack of order cards.

**Individual Order Card Structure (repeat for each — show 4 sample orders):**

Each order card is a sharp-edged panel:
- `<div class="bg-surface-container-lowest border border-black/5 hover:border-primary/30 transition-colors">`.
- ZERO radius. No drop shadow at rest. Subtle border highlight on hover.

**Card Header Row:**
- `<div class="flex flex-col md:flex-row md:items-center md:justify-between p-6 md:p-8 border-b border-black/5">`.
- Left cluster:
  - Order Number: "#SI-20240312" — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink. This is the invoice's dominant identifier.
  - Date: "MARCH 12, 2024" — Lato, `text-[10px]`, Silver Mist (`text-slate-400`), `uppercase tracking-[0.2em]`, `mt-1`.
- Right cluster (`flex items-center gap-6`):
  - **Status Badge:** A sharp-bordered label. Styling varies by status:
    - **PROCESSING:** `<span class="border-2 border-primary px-4 py-1 text-[9px] uppercase tracking-[0.2em] font-black text-primary">PROCESSING</span>` — Sovereign Cobalt border and text.
    - **SHIPPED:** `<span class="border-2 border-primary bg-primary px-4 py-1 text-[9px] uppercase tracking-[0.2em] font-black text-white">SHIPPED</span>` — filled Sovereign Cobalt, white text.
    - **DELIVERED:** `<span class="border-2 border-green-800 px-4 py-1 text-[9px] uppercase tracking-[0.2em] font-black text-green-800">DELIVERED</span>` — green border and text.
    - **CANCELLED:** `<span class="border-2 border-error px-4 py-1 text-[9px] uppercase tracking-[0.2em] font-black text-error">CANCELLED</span>` — error-red border and text.
  - All badges: ZERO radius. Sharp rectangles.
  - **Total:** "$340.00" — Bebas Neue (`font-headline`), `text-xl`, Charcoal Ink.

**Card Body (Product Thumbnails + Summary):**
- `<div class="flex flex-col md:flex-row md:items-center md:justify-between p-6 md:p-8">`.
- Left side — Product thumbnail strip:
  - `<div class="flex items-center gap-3">`.
  - 1–3 mini thumbnails, each: `<div class="relative cobalt-grade w-16 h-16 bg-surface-container-low overflow-hidden flex-shrink-0">` with `<img class="w-full h-full object-contain p-2">`. **REQUIRED:** `.cobalt-grade` class on each container.
  - If more than 3 items, add an overflow indicator: `<div class="w-16 h-16 bg-surface-container-low flex items-center justify-center text-sm font-bold text-on-surface-variant">+2</div>`.
  - Item count text (next to thumbnails): "3 items" — Lato, `text-xs`, Storm Slate, `uppercase tracking-widest ml-3`.
- Right side — Action link:
  - `<button class="mt-4 md:mt-0 font-body text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1" data-order-toggle>VIEW DETAILS <span class="material-symbols-outlined text-sm transition-transform" data-chevron>expand_more</span></button>`.

**Card Expansion Panel (Accordion Detail — hidden by default, toggled by "VIEW DETAILS"):**
- `<div class="border-t border-black/5 p-6 md:p-8 hidden" data-order-details>`.
- Layout: `<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">`.

**Expansion Column 1 — Item List (lg:col-span-2):**
- `<h3>` — "ITEMS" — Bebas Neue, `text-xl`, Charcoal Ink, `mb-4`.
- Each item row: `<div class="flex gap-4 items-center py-4 border-b border-black/5 last:border-0">`.
  - Thumbnail: `<div class="relative cobalt-grade w-14 h-14 bg-surface-container-low overflow-hidden flex-shrink-0">` + `<img>`. `.cobalt-grade` applied.
  - Details:
    - Name: "AIR MAX PULSE" — Bebas Neue (`font-headline`), `text-base`, Charcoal Ink.
    - Meta: "Wolf Grey / White · Size US 10 · Qty: 1" — Lato, `text-[10px]`, Storm Slate, `uppercase tracking-widest`.
  - Price: "$160.00" — Lato, `text-sm`, `font-bold`, Charcoal Ink.

**Expansion Column 2 — Financial Breakdown + Shipping (lg:col-span-1):**
- **Order Summary Sub-block:**
  - `<h3>` — "SUMMARY" — Bebas Neue, `text-xl`, Charcoal Ink, `mb-4`.
  - Line items (each: `<div class="flex justify-between text-sm mb-2">`):
    - "Subtotal" → "$460.00" (Lato, Storm Slate label / Charcoal Ink value).
    - "Curated Shipping" → "FREE" (value in `text-primary`).
    - "Tax" → "$32.20".
  - Divider: `<div class="w-full h-px bg-black/10 my-3"></div>`.
  - Total: `<div class="flex justify-between">` — "TOTAL" → "$492.20" — both Bebas Neue (`font-headline`), `text-lg`, value in Sovereign Cobalt (`text-primary`).

- **Shipping Address Sub-block (mt-6):**
  - `<h3>` — "SHIPPED TO" — Bebas Neue, `text-xl`, Charcoal Ink, `mb-3`.
  - Address block: Lato, `text-xs`, Storm Slate, `leading-relaxed`:
    - "Alexander Wang"
    - "123 Curator Way, Suite 400"
    - "New York, NY 10001"
    - "United States"

- **Payment Method (mt-4):**
  - Label: "PAYMENT" — Lato, `text-[10px]`, `uppercase tracking-[0.2em] font-black`, Storm Slate, `mb-1`.
  - Value: "Visa ending in 4242" — Lato, `text-xs`, Charcoal Ink.

- **Order Status Timeline (mt-6):**
  - `<h3>` — "TIMELINE" — Bebas Neue, `text-xl`, Charcoal Ink, `mb-4`.
  - A minimal vertical timeline using sharp lines and SQUARE nodes (not circles):
  - Container: `<div class="space-y-0">`.
  - Each step:
    ```
    <div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="w-3 h-3 bg-primary"></div>  <!-- SQUARE node, filled cobalt = completed -->
        <div class="w-px h-8 bg-black/10"></div> <!-- vertical line connector -->
      </div>
      <div class="pb-6">
        <p class="font-body text-xs font-bold text-on-surface">ORDER CONFIRMED</p>
        <p class="font-body text-[10px] text-slate-400 uppercase tracking-widest">MARCH 12, 2024 — 10:42 AM</p>
      </div>
    </div>
    ```
  - Timeline steps (top to bottom, most recent first):
    1. "DELIVERED" — `w-3 h-3 bg-green-800` (green filled square) — "March 16, 2024 — 2:15 PM" — **completed**.
    2. "OUT FOR DELIVERY" — `w-3 h-3 bg-primary` (cobalt filled) — "March 16, 2024 — 8:00 AM" — **completed**.
    3. "SHIPPED" — `w-3 h-3 bg-primary` — "March 13, 2024 — 4:30 PM" — **completed**.
    4. "ORDER CONFIRMED" — `w-3 h-3 bg-primary` — "March 12, 2024 — 10:42 AM" — **completed**.
  - **Incomplete steps** use: `w-3 h-3 border-2 border-black/20 bg-transparent` (hollow square) and `w-px h-8 bg-black/5` (faded connector).
  - Last step has no vertical connector line.

---

**Sample Order Data (4 orders for the demo):**

1. **#SI-20240312** — March 12, 2024 — **DELIVERED** (green) — 3 items — $492.20
   - Nike Air Max Pulse, Jordan AJ1 Retro, New Balance 2002R

2. **#SI-20240228** — February 28, 2024 — **SHIPPED** (cobalt filled) — 1 item — $180.00
   - Jordan AJ1 Retro High OG

3. **#SI-20240115** — January 15, 2024 — **PROCESSING** (cobalt outline) — 2 items — $310.00
   - Nike Dunk Low, Adidas Samba OG

4. **#SI-20231201** — December 1, 2023 — **CANCELLED** (error red) — 1 item — $895.00
   - Balenciaga Track Sneaker

---

**EMPTY STATE (When user has zero orders):**

Replaces the entire order list and filter tabs. Centered within the main panel.

- Container: `<div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-8">`.
- Icon: Material Symbols `inventory_2`, `text-[72px]`, `text-surface-container-highest` (#dfe3e8). Large, ghosted.
- Headline: "YOUR ARCHIVE IS EMPTY." — Bebas Neue (`font-headline`), `text-4xl md:text-5xl`, Charcoal Ink, `mt-6 mb-3`.
- Subtitle: "Your purchase history will appear here once you make your first acquisition." — Lato, `text-sm`, Storm Slate, `italic`, `max-w-md`, `mb-8`.
- CTA: `<a href="catalog.html" class="bg-primary px-10 py-5 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2">BROWSE LATEST DROPS <span class="material-symbols-outlined text-sm">arrow_forward</span></a>`.

---

**PAGINATION (Below order list):**

- Container: `<div class="flex items-center justify-center gap-2 mt-12">`.
- Each page button: `<button class="w-10 h-10 flex items-center justify-center font-body text-xs font-bold transition-colors">`.
- **Active page:** `bg-primary text-white` — filled Sovereign Cobalt square.
- **Inactive pages:** `border border-black/10 text-on-surface-variant hover:border-primary hover:text-primary` — outlined square.
- **Navigation arrows:** `<button class="w-10 h-10 flex items-center justify-center border border-black/10 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">chevron_left</span></button>` and `chevron_right`.
- All ZERO radius. Sharp square blocks.
- Display: `< 1 [2] 3 4 ... 8 >`

---

**LOADING STATE (Skeleton — for dynamic rendering contexts):**

- Container: same as order list.
- 3 skeleton order cards, each:
  - `<div class="bg-surface-container-lowest border border-black/5 p-8">`.
  - Header row: two `<div class="h-4 bg-surface-container-low animate-pulse w-32"></div>` blocks + status `<div class="h-6 bg-surface-container-low animate-pulse w-24"></div>`.
  - Body row: three `<div class="w-16 h-16 bg-surface-container-low animate-pulse"></div>` thumbnail placeholders.
  - All shapes: ZERO radius. Sharp rectangles pulsing.

**ERROR STATE (Failed fetch):**

- Container: `<div class="border-2 border-error bg-error/5 p-8 text-center">`.
- Icon: Material Symbols `error_outline`, `text-3xl`, `text-error`.
- Headline: "UNABLE TO LOAD ARCHIVE." — Bebas Neue, `text-2xl`, `text-error`, `mt-3`.
- Body: "We encountered an issue retrieving your order data. Please try again." — Lato, `text-sm`, Storm Slate, `mt-2 mb-6`.
- Retry CTA: `<button class="border-2 border-error px-8 py-3 font-body text-xs uppercase tracking-[0.2em] font-bold text-error hover:bg-error hover:text-white transition-all">RETRY</button>`.

---

**SECTION 3 — PERSISTENT FOOTER**
- Exact copy of all other Sneaker Index page footers — pixel-perfect consistency.
- Royal Blueprint (#1a3fc4) background (`style="background-color: #1a3fc4;"`), full-width.
- Container: `py-20 px-16`, `grid grid-cols-1 md:grid-cols-4 gap-12`, `max-w-[1400px] mx-auto`.
- Column 1: "SNEAKER INDEX" wordmark Bebas Neue (`font-bebas`) `text-2xl tracking-tighter text-white` + brand description Lato `text-[10px] uppercase tracking-[0.2em] leading-relaxed text-white`.
- Column 2: "Navigations" header + links — same as all pages.
- Column 3: "Support" header + links — same.
- Column 4: "Connect" header + social icons + copyright `font-lato text-[9px] uppercase tracking-[0.2em] italic text-white/60`: "© 2024 SNEAKER INDEX. CURATED EXCELLENCE."

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map in `<script id="tailwind-config">`: primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to all product thumbnail containers and the avatar.
- CSS class `.glass-nav` MUST be defined for the navbar.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No buttons, cards, badges, pagination blocks, timeline nodes, or panels may possess a border-radius greater than 0px.
- Timeline nodes MUST be squares (0px radius), NOT circles.
- Avatar MUST be square (0px radius), NOT circular.
