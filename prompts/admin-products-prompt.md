# Sneaker Index — Admin Product Management / Catalog Control (admin-products.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, admin-dashboard-prompt.md (sidebar spec), image_46a69e.png (structural reference only — styling completely overridden) -->

A premium, editorial-grade product management page for the "Sneaker Index" admin console. This is the catalog operator's workbench — the definitive registry of every sneaker in the vault. Completely reject the soft, rounded, colorful SaaS dashboard aesthetic of the reference image (pastel icons, rounded buttons, gradient sparklines, drop-shadow cards). Adopt only its functional structure: a clean page header, search/filter bar, prominent "Add Product" CTA, and a massive, structured data table below. Every surface is rebuilt using the Sneaker Index design system: zero-radius sharp geometry, the Bebas Neue / Lato typographic clash, and the Sovereign Cobalt accent thread. The page should feel like a museum collection database — clinical, exhaustive, and typographically precise.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width: fluid — admin pages use full viewport width)
- Theme: Light, editorial luxury — stark, clinical, data-driven
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel (Filter Bar / Table Container): Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): primary CTAs, active sidebar, price highlights, "in stock" status — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): sidebar header accent — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): CTA hover state — `secondary`, `hover:bg-secondary`
- Deep Cobalt Midnight (#0d1b4b): sidebar background
- Text Primary — Charcoal Ink (#181c20): all data, product names, headlines — `on-surface`
- Text Secondary — Storm Slate (#444654): table headers, label copy — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): SKU/slugs, subdued meta
- Error / Alert — Error (#ba1a1a): low stock, out-of-stock, delete actions — `error`
- Success — (#166534 / Tailwind `green-800`): in-stock indicators
- Warning — (#92400e / Tailwind `amber-800`): low-stock indicators
- Typography Display: Bebas Neue — page title, section headers, price displays, all-caps condensed
- Typography Body/UI: Lato — table data, labels, dropdowns, buttons, navigation
- Button Shape: ZERO border-radius
- Input/Select Shape: ZERO border-radius
- Card/Panel/Table Shape: ZERO border-radius
- Cobalt Grade Effect: `.cobalt-grade` on all product thumbnails
- Transitions: `transition-colors` 150ms ease; buttons `transition-all` with `active:scale-[0.98]`

---

**Page Structure:**

**SECTION 1 — PERSISTENT LEFT SIDEBAR (Admin Navigation — Identical to admin-dashboard.html, "PRODUCTS" now active)**

**Container:**
- `<aside class="fixed left-0 top-0 h-screen w-[260px] bg-[#0d1b4b] text-white flex flex-col z-50 overflow-y-auto">`.
- Deep Cobalt Midnight (#0d1b4b) background. ZERO radius.

**Sidebar Header:**
- Container: `<div class="px-6 py-8 border-b border-white/10">`.
- Logo: `<a href="admin-dashboard.html">` — "S" in white Bebas Neue `text-2xl` + "INDEX / ADMIN" in Lato `text-[10px] uppercase tracking-[0.3em] font-black text-white/60`.
- Subtitle: "STORE COMMAND CENTER" — Lato, `text-[9px]`, `uppercase tracking-[0.2em] text-white/30`.

**Navigation — "MANAGEMENT":**
- Section label: `<p class="px-6 pt-8 pb-3 font-body text-[9px] uppercase tracking-[0.3em] font-black text-white/30">MANAGEMENT</p>`.
- **CRITICAL CHANGE:** The **"PRODUCTS"** link is now ACTIVE (not "DASHBOARD").
  1. `dashboard` — "DASHBOARD" → `admin-dashboard.html` — **inactive:** `border-l-4 border-transparent text-white/50 hover:bg-white/5 hover:text-white/80`.
  2. `inventory_2` — "PRODUCTS" → `admin-products.html` — **active:** `border-l-4 border-white bg-white/10 text-white font-bold`.
  3. `receipt_long` — "ORDERS" — inactive.
  4. `category` — "CATEGORIES" — inactive.
  5. `group` — "CUSTOMERS" — inactive.

**Navigation — "SYSTEM":**
  1. `settings` — "SETTINGS" — inactive.
  2. `analytics` — "ANALYTICS" — inactive.

**Sidebar Footer:**
- Admin info: "ADMIN" / "admin@sneakerindex.com".
- Sign out: `text-white/30 hover:text-error`.

---

**SECTION 2 — MAIN CONTENT AREA**

**Outer Wrapper:**
- `<main class="ml-[260px] min-h-screen bg-surface p-8 lg:p-12">`.

---

**SECTION 2A — PAGE HEADER**

**Container:**
- `<div class="flex flex-col md:flex-row md:items-end md:justify-between mb-8">`.

**Left side:**
- `<h1>` — "PRODUCT ARCHIVE" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink, `mb-1`.
- Subtitle: "Complete catalog inventory. **1,525 products** registered." — Lato, `text-sm`, Storm Slate. The "1,525 products" is `font-bold text-on-surface`.

**Right side:**
- `<div class="mt-4 md:mt-0 flex items-center gap-4">`.
- **Export Button (Ghost):** `<button class="border border-black/15 px-6 py-3 font-body text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2"><span class="material-symbols-outlined text-sm">download</span>EXPORT CSV</button>`. ZERO radius.
- **Refresh:** `<button class="w-10 h-10 border border-black/10 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">refresh</span></button>`. ZERO radius.

---

**SECTION 2B — KPI SUMMARY STRIP (Compact — above filters)**

**Container:**
- `<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">`.

**Each KPI tile — compact variant (smaller than dashboard KPIs):**
- `<div class="bg-surface-container-lowest border border-black/5 p-4 md:p-5">`. ZERO radius.
- Label: Lato, `text-[9px]`, `uppercase tracking-[0.2em] font-black`, Storm Slate.
- Number: Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink.

**5 KPI tiles:**
1. "TOTAL" — `inventory_2` icon inline — "1,525" — Charcoal Ink.
2. "IN STOCK" — "1,389" — `text-green-800`.
3. "LOW STOCK" — "113" — `text-amber-800`.
4. "OUT OF STOCK" — "23" — `text-error`.
5. "FEATURED" — "42" — `text-primary` (Sovereign Cobalt).

---

**SECTION 2C — FILTER & SEARCH BAR**

**Container:**
- `<div class="bg-surface-container-lowest border border-black/5 p-4 md:p-6 mb-8">`. ZERO radius.
- Inner layout: `<div class="flex flex-col lg:flex-row lg:items-center gap-4">`.

**Row 1 (Left cluster — Bulk Actions + Search):**

- **Bulk Actions Section:**
  - `<div class="flex items-center gap-3">`.
  - Master checkbox: `<div class="w-4 h-4 border-2 border-black/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">` — ZERO radius, square. Checked state: `bg-primary border-primary` with white `check` icon.
  - Dropdown: `<select class="border border-black/15 bg-surface-container-low px-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant focus:border-primary focus:ring-0 transition-colors appearance-none pr-8">` — ZERO radius.
    - Options: "BULK ACTIONS" (placeholder/default) | "UPDATE FEATURED STATUS" | "ARCHIVE SELECTED" | "DELETE SELECTED".
  - Apply: `<button class="border border-black/15 px-4 py-2 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors">APPLY</button>`. ZERO radius.

- **Search Input:**
  - `<div class="relative flex-1 max-w-md">`.
  - Icon: `<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>`.
  - Input: `<input class="w-full border border-black/15 bg-surface-container-low pl-12 pr-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors" placeholder="SEARCH BY NAME, SKU, BRAND..." type="text">`. ZERO radius.

**Row 2 (Right cluster — Filter Dropdowns + Primary CTA):**

- **Filter Dropdowns (flex row, gap-3):**
  - All dropdowns share this styling: `<select class="border border-black/15 bg-surface-container-low px-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant focus:border-primary focus:ring-0 transition-colors appearance-none pr-8 min-w-[140px]">`. ZERO radius.

  1. **Category Filter:**
     - Options: "ALL CATEGORIES" (default) | "Running" | "Lifestyle" | "Basketball" | "Skateboarding" | "Training" | "Heritage"

  2. **Brand Filter:**
     - Options: "ALL BRANDS" (default) | "Nike" | "Jordan" | "Adidas" | "New Balance" | "Puma" | "Balenciaga" | "Converse"

  3. **Stock Status Filter:**
     - Options: "ALL STOCK" (default) | "In Stock" | "Low Stock" | "Out of Stock"

  4. **Featured Filter:**
     - Options: "ALL PRODUCTS" (default) | "Featured Only" | "Non-Featured"

- **Primary CTA — Add Product:**
  - `<a href="#" class="bg-primary px-8 py-2 text-white font-body font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2 flex-shrink-0"><span class="material-symbols-outlined text-sm">add</span>ADD PRODUCT</a>`.
  - Sovereign Cobalt filled. ZERO radius. Positioned flush right.

---

**SECTION 2D — PRODUCT ARCHIVE TABLE**

**Table Container:**
- `<div class="bg-surface-container-lowest border border-black/5 overflow-x-auto">`. ZERO radius.

**Table:**
- `<table class="w-full min-w-[1100px]">`.

**Table Header:**
- `<thead>`.
- `<tr class="border-b border-black/10 bg-surface-container-low/50">`.
- Each `<th class="px-6 py-4 text-left font-body text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant whitespace-nowrap">`.
- **Columns (left to right):**
  1. `<th class="w-12 px-4"><div class="w-4 h-4 border-2 border-black/30"></div></th>` — Master checkbox (square, ZERO radius).
  2. "PRODUCT" — wide column (name + thumbnail + SKU).
  3. "BRAND"
  4. "CATEGORY"
  5. "PRICE"
  6. "STOCK" — includes status and variant count.
  7. "FEATURED"
  8. "ACTIONS" — right-aligned.

**Table Body Rows:**
- `<tbody class="divide-y divide-black/5">`.
- Each row: `<tr class="hover:bg-surface-container-low/30 transition-colors group">`.

**Column Cell Specifications:**

1. **Checkbox Cell:**
   - `<td class="px-4 py-4">`.
   - `<div class="w-4 h-4 border-2 border-black/20 cursor-pointer hover:border-primary transition-colors">` — square checkbox. Checked: `bg-primary border-primary` with white checkmark.

2. **Product Cell (Name + Thumbnail + SKU):**
   - `<td class="px-6 py-4">`.
   - `<div class="flex items-center gap-4">`.
   - **Thumbnail:** `<div class="relative cobalt-grade w-14 h-14 bg-surface-container-low overflow-hidden flex-shrink-0">` with `<img class="w-full h-full object-contain p-2">`. **REQUIRED:** `.cobalt-grade` class on container.
   - **Text stack:**
     - Product Name: "Air Max Pulse" — Lato, `text-sm`, `font-bold`, Charcoal Ink. Clickable — `hover:text-primary transition-colors cursor-pointer`.
     - SKU/Slug: "NKE-AMP-WLFGRY-10 · #4523" — Lato, `text-[10px]`, Silver Mist (`text-slate-400`), `uppercase tracking-widest`.

3. **Brand Cell:**
   - `<td class="px-6 py-4 font-body text-xs text-on-surface">`. e.g., "Nike".

4. **Category Cell:**
   - `<td class="px-6 py-4 font-body text-xs text-on-surface-variant">`. e.g., "Running".

5. **Price Cell:**
   - `<td class="px-6 py-4">`.
   - Current: Bebas Neue (`font-headline`), `text-lg`, Sovereign Cobalt (`text-primary`). e.g., "$160.00".
   - Original (if on sale): Lato, `text-[10px]`, Silver Mist, `line-through`. e.g., "$200.00".

6. **Stock Cell (Status + Detail):**
   - `<td class="px-6 py-4">`.
   - **Status badge + count:**
     - **IN STOCK:** `<span class="border border-green-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-green-800">IN STOCK</span>` + below: Lato, `text-[10px]`, Storm Slate — "12,467 units · 8 variants".
     - **LOW STOCK:** `<span class="border border-amber-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-amber-800">LOW STOCK</span>` + "245 units · 4 variants".
     - **OUT OF STOCK:** `<span class="border border-error bg-error/5 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-error">OUT OF STOCK</span>` + "0 units".
   - All badges: ZERO radius.

7. **Featured Cell:**
   - `<td class="px-6 py-4">`.
   - **YES:** `<span class="bg-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-white">YES</span>` — filled Sovereign Cobalt. ZERO radius.
   - **NO:** `<span class="border border-black/15 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-slate-400">NO</span>` — ghost outline, muted. ZERO radius.

8. **Actions Cell:**
   - `<td class="px-6 py-4">`.
   - `<div class="flex items-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">`.
   - **Edit:** `<a href="#" class="font-body text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors">EDIT</a>`.
   - **Delete/Archive:** `<button class="font-body text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-error transition-colors">DELETE</button>`.
   - Actions are slightly faded at rest (`opacity-60`) and brighten on row hover — editorial restraint.

---

**8 Sample Product Rows:**

| # | Product | Brand | Category | Price | Stock | Featured |
|---|---------|-------|----------|-------|-------|----------|
| 1 | Air Max Pulse · NKE-AMP-WLFGRY-10 | Nike | Running | $160.00 | IN STOCK · 12,467 units · 8 variants | YES |
| 2 | AJ1 Retro High OG · JRD-AJ1-UNIBLU-95 | Jordan | Lifestyle | $180.00 | IN STOCK · 1,547 units · 6 variants | YES |
| 3 | 2002R Protection Pack · NB-2002R-RNCLD-11 | New Balance | Heritage | $149.99 | LOW STOCK · 245 units · 4 variants | NO |
| 4 | Dunk Low · NKE-DNKL-PANDA-10 | Nike | Lifestyle | $110.00 | IN STOCK · 21,547 units · 12 variants | YES |
| 5 | Air Max 90 · NKE-AM90-WHT-9 | Nike | Running | $130.00 | OUT OF STOCK · 0 units | NO |
| 6 | Samba OG · ADS-SMB-WHT-8 | Adidas | Heritage | $100.00 | LOW STOCK · 654 units · 5 variants | NO |
| 7 | Track Sneaker · BAL-TRK-BLK-42 | Balenciaga | Luxury | $895.00 | IN STOCK · 32,158 units · 3 variants | YES |
| 8 | Suede Classic · PMA-SDE-NVY-9 | Puma | Heritage | $75.00 | LOW STOCK · 4,574 units · 7 variants | NO |

---

**SECTION 2E — TABLE PAGINATION**

**Container:**
- `<div class="flex items-center justify-between p-6 border-t border-black/5">`.

**Left side — Results count:**
- "Showing **1–8** of **1,525** products" — Lato, `text-xs`, Storm Slate. Bold portions in Charcoal Ink.

**Right side — Page controls:**
- `<div class="flex items-center gap-2">`.
- **Rows per page:** `<select class="border border-black/15 bg-surface-container-low px-3 py-1 font-body text-[10px] uppercase tracking-widest text-on-surface-variant focus:border-primary focus:ring-0">` with options: "10" | "25" | "50" | "100". ZERO radius.
- **Page buttons:** Each `<button class="w-8 h-8 flex items-center justify-center font-body text-[10px] font-bold transition-colors">`.
  - Active: `bg-primary text-white`.
  - Inactive: `border border-black/10 text-on-surface-variant hover:border-primary hover:text-primary`.
  - Arrows: `<span class="material-symbols-outlined text-sm">chevron_left</span>` and `chevron_right`.
  - All ZERO radius.
- Display: `< 1 [2] 3 ... 153 >`

---

**SECTION 2F — EMPTY STATE (When no products match filters)**

Replaces the table body content when filters return zero results.

- Container: `<div class="flex flex-col items-center justify-center py-20 px-8 text-center">`.
- Icon: Material Symbols `inventory_2`, `text-[64px]`, `text-surface-container-highest` (#dfe3e8).
- Headline: "NO PRODUCTS FOUND." — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink, `mt-4 mb-2`.
- Subtitle: "No items match your current filters. Try adjusting your search criteria." — Lato, `text-sm`, Storm Slate, `italic`, `max-w-md`.
- CTA: `<button class="mt-6 border-2 border-black/20 px-8 py-3 font-body text-xs uppercase tracking-[0.2em] font-bold text-on-surface hover:border-primary hover:text-primary transition-all">CLEAR FILTERS</button>`. ZERO radius.

---

**SECTION 3 — ADMIN FOOTER BAR (Minimal)**

- No customer-facing footer.
- `<div class="mt-12 pt-6 border-t border-black/5 flex items-center justify-between">`.
- Left: "SNEAKER INDEX ADMIN v1.0" — Lato, `text-[9px]`, `uppercase tracking-[0.2em]`, Silver Mist.
- Right: "© 2024 SNEAKER INDEX. ALL RIGHTS RESERVED." — Lato, `text-[9px]`, `uppercase tracking-[0.2em]`, Silver Mist.

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map in `<script id="tailwind-config">`: primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to all product thumbnail containers in the table.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No dropdowns, inputs, buttons, table cells, badges, checkboxes, or panels may possess a border-radius greater than 0px.
- Custom checkboxes MUST be squares (0px radius), NOT circles.
- Sidebar uses Deep Cobalt Midnight (#0d1b4b) — NOT the customer-facing glassmorphism nav.
