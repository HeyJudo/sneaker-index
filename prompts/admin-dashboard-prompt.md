# Sneaker Index — Admin Dashboard / Store Command Center (admin-dashboard.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, Prodex admin dashboard image (structural reference only — styling completely overridden), account-prompt.md (sidebar pattern reference) -->

A premium, editorial-grade admin dashboard for "Sneaker Index." This is the store operator's command center — the nerve system behind the vault. Completely reject the soft, rounded, pastel-purple SaaS dashboard aesthetic of the reference image (pill buttons, colored circle icons, gradient charts, rounded cards, drop shadows). Adopt only its functional concept of a sidebar navigation + KPI cards + data tables layout. Every surface is rebuilt from scratch using the Sneaker Index design system: zero-radius sharp geometry, the Bebas Neue / Lato typographic clash, and the Sovereign Cobalt accent thread. The page should feel like a military-grade operations console — clinical, authoritative, and data-obsessed. No decorative flourishes. The data speaks for itself.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width: fluid — admin dashboards should use full viewport width)
- Theme: Light, editorial luxury — stark, clinical, data-driven
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel (KPI Cards / Sidebar): Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): active sidebar, primary CTAs, highlighted KPIs — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): sidebar header background, logo accent — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): CTA hover state — `secondary`, `hover:bg-secondary`
- Deep Cobalt Midnight (#0d1b4b): sidebar background — the admin sidebar uses the darkest cobalt for maximum authority
- Text Primary — Charcoal Ink (#181c20): all data, table rows, headlines — `on-surface`
- Text Secondary — Storm Slate (#444654): labels, column headers, secondary copy — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): timestamps, subdued indicators
- Error / Alert Color — Error (#ba1a1a): low stock alerts, critical indicators — `error`
- Success Color — (#166534 / Tailwind `green-800`): completed/delivered indicators
- Warning Color — (#92400e / Tailwind `amber-800`): pending/processing indicators — maintaining cool sobriety
- Typography Display: Bebas Neue — all section headers, KPI numbers, page titles, all-caps, condensed
- Typography Body/UI: Lato — table data, labels, buttons, navigation text
- Button Shape: ZERO border-radius
- Card/Panel Shape: ZERO border-radius
- Table Shape: ZERO border-radius on all cells, headers, and containers
- Transitions: `transition-colors` 150ms ease; buttons `transition-all` with `active:scale-[0.98]`

---

**Page Structure:**

**SECTION 1 — PERSISTENT LEFT SIDEBAR (Admin Navigation — Full Height)**

This is NOT the customer-facing glassmorphism navbar. This is a dedicated admin sidebar that spans the full viewport height.

**Container:**
- `<aside class="fixed left-0 top-0 h-screen w-[260px] bg-[#0d1b4b] text-white flex flex-col z-50 overflow-y-auto">`.
- Background: Deep Cobalt Midnight (#0d1b4b) — the darkest expression of the brand palette. Creates maximum authority separation from the light content area.
- ZERO border-radius. Sharp, full-bleed vertical column.

**Sidebar Header:**
- Container: `<div class="px-6 py-8 border-b border-white/10">`.
- Logo/Title: `<a href="admin-dashboard.html" class="flex items-center gap-3">`.
  - Brand mark: `<span class="font-headline text-2xl tracking-tight"><span class="text-white">S</span></span>` — the "S" in white against the dark background.
  - Title: "INDEX / ADMIN" — Lato (`font-body`), `text-[10px]`, `uppercase`, `tracking-[0.3em]`, `font-black`, `text-white/60`, `ml-1`.
- Subtitle below: "STORE COMMAND CENTER" — Lato, `text-[9px]`, `uppercase`, `tracking-[0.2em]`, `text-white/30`, `mt-1`.

**Navigation Section — "MANAGEMENT":**
- Section label: `<p class="px-6 pt-8 pb-3 font-body text-[9px] uppercase tracking-[0.3em] font-black text-white/30">MANAGEMENT</p>`.
- Container: `<nav class="space-y-0">`.
- Each link: `<a class="flex items-center gap-3 px-6 py-3 font-body text-xs uppercase tracking-[0.15em] transition-colors border-l-4">`.
- **Active state (Dashboard):** `border-l-4 border-white bg-white/10 text-white font-bold`.
- **Inactive state:** `border-l-4 border-transparent text-white/50 hover:bg-white/5 hover:text-white/80`.
- Navigation items (each with Material Symbols Outlined icon, `text-lg`):
  1. `dashboard` — "DASHBOARD" (active)
  2. `inventory_2` — "PRODUCTS"
  3. `receipt_long` — "ORDERS"
  4. `category` — "CATEGORIES"
  5. `group` — "CUSTOMERS"

**Navigation Section — "SYSTEM":**
- Section label: `<p class="px-6 pt-8 pb-3 font-body text-[9px] uppercase tracking-[0.3em] font-black text-white/30">SYSTEM</p>`.
- Items:
  1. `settings` — "SETTINGS" — inactive.
  2. `analytics` — "ANALYTICS" — inactive.

**Sidebar Footer:**
- Container: `<div class="mt-auto px-6 py-6 border-t border-white/10">`.
- Admin user info:
  - Name: "ADMIN" — Lato, `text-xs`, `uppercase tracking-widest font-bold text-white`.
  - Email: "admin@sneakerindex.com" — Lato, `text-[10px]`, `text-white/40`, `tracking-wide`.
- Sign out link: `<a class="flex items-center gap-2 mt-4 font-body text-[10px] uppercase tracking-widest text-white/30 hover:text-error transition-colors"><span class="material-symbols-outlined text-sm">logout</span>SIGN OUT</a>`.

---

**SECTION 2 — MAIN CONTENT AREA (Right of Sidebar)**

**Outer Wrapper:**
- `<main class="ml-[260px] min-h-screen bg-surface p-8 lg:p-12">`.
- Left margin of 260px to clear the fixed sidebar. Full remaining viewport width.

---

**SECTION 2A — TOP BAR (Page Header)**

**Container:**
- `<div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12">`.

**Left side:**
- `<h1>` — "DASHBOARD" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink (`text-on-surface`).
- Subtitle: "Store performance at a glance." — Lato (`font-body`), `text-sm`, Storm Slate (`text-on-surface-variant`), `tracking-wide`, `mt-1`.

**Right side:**
- Date/time display: `<div class="mt-4 md:mt-0 text-right">`.
  - Date: "APRIL 5, 2026" — Lato, `text-[10px]`, `uppercase`, `tracking-[0.2em]`, `font-black`, Storm Slate.
  - Time: "11:55 PM" — Bebas Neue, `text-2xl`, Charcoal Ink.
- Refresh button: `<button class="ml-4 w-10 h-10 border border-black/10 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">refresh</span></button>`. ZERO radius.

---

**SECTION 2B — KPI CARDS (Top Row)**

**Container:**
- `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">`.

**Individual KPI Card Structure:**
- Each: `<div class="bg-surface-container-lowest border border-black/5 p-6 md:p-8 hover:border-primary/30 transition-colors">`.
- ZERO radius. No shadows. Pure tonal differentiation.

**Card Interior:**
- Top row: `<div class="flex items-center justify-between mb-4">`.
  - Label: "TOTAL PRODUCTS" — Lato (`font-body`), `text-[10px]`, `uppercase`, `tracking-[0.2em]`, `font-black`, Storm Slate.
  - Icon: Material Symbols Outlined (contextual icon), `text-xl`, `text-slate-400`.
- Hero number: `<p class="font-headline text-5xl text-on-surface">1,525</p>`.
  - Bebas Neue, massive, Charcoal Ink. This is the dominant visual element of each card.
- Trend indicator (optional): `<div class="flex items-center gap-1 mt-3">`.
  - Up arrow: `<span class="material-symbols-outlined text-sm text-green-800">trending_up</span>`.
  - Percentage: "+12.5%" — Lato, `text-[10px]`, `uppercase tracking-widest font-bold text-green-800`.
  - Context: "vs last month" — Lato, `text-[10px]`, Silver Mist.

**4 KPI Cards:**

1. **Total Products:**
   - Icon: `inventory_2` — `text-primary` (Sovereign Cobalt).
   - Number: "1,525" — Charcoal Ink.
   - Trend: `trending_up` "+8.3%" — green.

2. **Total Orders:**
   - Icon: `receipt_long` — `text-primary`.
   - Number: "10,892" — Charcoal Ink.
   - Trend: `trending_up` "+15.2%" — green.

3. **Low Stock Alerts:**
   - **CRITICAL CARD — visually distinct:**
   - Container override: `bg-error/5 border-2 border-error` instead of the default. This card screams urgency.
   - Icon: `warning` — `text-error` (#ba1a1a).
   - Label: "LOW STOCK ALERTS" — `text-error`.
   - Number: "23" — Bebas Neue, `text-5xl`, `text-error`. The number is in error-red.
   - Sub-label: "ITEMS NEED RESTOCKING" — Lato, `text-[10px]`, `uppercase tracking-widest`, `text-error/70`.
   - No trend indicator — replace with a CTA: `<a href="#low-stock" class="inline-flex items-center gap-1 mt-3 font-body text-[10px] uppercase tracking-widest font-bold text-error hover:text-on-surface transition-colors">VIEW ALL <span class="material-symbols-outlined text-sm">arrow_forward</span></a>`.

4. **Total Categories:**
   - Icon: `category` — `text-primary`.
   - Number: "12" — Charcoal Ink.
   - No trend (categories are relatively static).

---

**SECTION 2C — QUICK ACTION BUTTONS**

**Container:**
- `<div class="flex flex-wrap gap-4 mb-12">`.

**Buttons:**
1. **Primary — Add Product:**
   - `<a href="#" class="bg-primary px-8 py-4 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2"><span class="material-symbols-outlined text-sm">add</span>ADD PRODUCT</a>`.
   - Sovereign Cobalt filled. ZERO radius.

2. **Ghost — Manage Orders:**
   - `<a href="#" class="border-2 border-black/20 px-8 py-4 font-body font-bold uppercase tracking-[0.2em] text-xs text-on-surface hover:border-primary hover:text-primary transition-all active:scale-[0.98] inline-flex items-center gap-2"><span class="material-symbols-outlined text-sm">receipt_long</span>MANAGE ORDERS</a>`.
   - ZERO radius. Ghost style.

3. **Ghost — Manage Categories:**
   - Same ghost styling as above.
   - Icon: `category`. Text: "MANAGE CATEGORIES".

4. **Ghost — View Customers:**
   - Icon: `group`. Text: "VIEW CUSTOMERS".

---

**SECTION 2D — DATA PREVIEW GRID**

**Container:**
- `<div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">`.

---

**DATA TABLE 1 — RECENT ORDERS (Left Column)**

**Panel Container:**
- `<div class="bg-surface-container-lowest border border-black/5">`. ZERO radius.

**Panel Header:**
- `<div class="flex items-center justify-between p-6 md:p-8 border-b border-black/5">`.
  - Title: "RECENT ORDERS" — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink.
  - Link: "VIEW ALL →" — Lato, `text-[10px]`, `uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors`.

**Table:**
- `<table class="w-full">`.
- **Table Header Row:** `<thead>`.
  - `<tr class="border-b border-black/10">`.
  - Each `<th class="px-6 md:px-8 py-4 text-left font-body text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant">`.
  - Columns: "ORDER ID" | "CUSTOMER" | "AMOUNT" | "STATUS"

- **Table Body Rows:** `<tbody>`.
  - Each `<tr class="border-b border-black/5 hover:bg-surface-container-low/50 transition-colors">`.
  - Each `<td class="px-6 md:px-8 py-4">`.

- **Column Styling:**
  - **Order ID:** Lato, `text-xs`, `font-bold`, Charcoal Ink. e.g., "#SI-20240405".
  - **Customer:** Lato, `text-xs`, Storm Slate. e.g., "Alexander Wang".
  - **Amount:** Lato, `text-xs`, `font-bold`, Charcoal Ink. e.g., "$340.00".
  - **Status:** Sharp badge — same treatment as orders.html:
    - **PROCESSING:** `<span class="border border-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-primary">PROCESSING</span>`.
    - **SHIPPED:** `<span class="bg-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-white">SHIPPED</span>`.
    - **DELIVERED:** `<span class="border border-green-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-green-800">DELIVERED</span>`.
    - **CANCELLED:** `<span class="border border-error px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-error">CANCELLED</span>`.
    - All ZERO radius.

- **5 Sample Rows:**
  1. #SI-20240405 | Alexander Wang | $340.00 | PROCESSING
  2. #SI-20240404 | Maya Chen | $180.00 | SHIPPED
  3. #SI-20240403 | James Rodriguez | $895.00 | DELIVERED
  4. #SI-20240402 | Sarah Kim | $149.99 | DELIVERED
  5. #SI-20240401 | David Park | $520.00 | CANCELLED

---

**DATA TABLE 2 — LOW STOCK ALERTS (Right Column)**

**Panel Container:**
- `<div class="bg-surface-container-lowest border border-black/5" id="low-stock">`. ZERO radius.

**Panel Header:**
- `<div class="flex items-center justify-between p-6 md:p-8 border-b border-black/5">`.
  - Title: "LOW STOCK ALERTS" — Bebas Neue, `text-2xl`, `text-error` (#ba1a1a). Error-colored to signal urgency.
  - Count badge: `<span class="border-2 border-error px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-error">23 ITEMS</span>`.

**Table:**
- Same table structure as Recent Orders.
- Columns: "PRODUCT" | "SKU" | "STOCK" | "ACTION"

- **Column Styling:**
  - **Product:** `<div class="flex items-center gap-3">` — mini `.cobalt-grade` thumbnail (`<div class="relative cobalt-grade w-10 h-10 bg-surface-container-low overflow-hidden flex-shrink-0"><img class="w-full h-full object-contain p-1"></div>`) + product name in Lato `text-xs font-bold`.
  - **SKU:** Lato, `text-[10px]`, `uppercase tracking-widest`, Silver Mist. e.g., "NKE-AMP-GRY-10".
  - **Stock:** Lato, `text-xs`, `font-bold`. Color-coded:
    - 0 units: `text-error font-black` — "0" (critical).
    - 1–5 units: `text-error` — e.g., "3".
    - 6–10 units: `text-amber-800` — e.g., "8".
  - **Action:** `<button class="font-body text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors">RESTOCK</button>`.

- **5 Sample Rows:**
  1. Nike Air Max 90 | NKE-AM90-WHT-9 | **0** (critical red) | RESTOCK
  2. Jordan AJ4 Retro | JRD-AJ4-BLK-10 | **2** (red) | RESTOCK
  3. New Balance 550 | NB-550-GRN-11 | **3** (red) | RESTOCK
  4. Adidas Samba OG | ADS-SMB-WHT-8 | **5** (red) | RESTOCK
  5. Puma Suede Classic | PMA-SDE-NVY-9 | **8** (amber) | RESTOCK

---

**SECTION 2E — RECENT ACTIVITY FEED (Full Width Below Tables)**

**Panel Container:**
- `<div class="bg-surface-container-lowest border border-black/5">`. ZERO radius.

**Panel Header:**
- `<div class="flex items-center justify-between p-6 md:p-8 border-b border-black/5">`.
  - Title: "RECENT ACTIVITY" — Bebas Neue, `text-2xl`, Charcoal Ink.
  - Filter: "TODAY ▾" — Lato, `text-[10px]`, `uppercase tracking-widest font-bold text-on-surface-variant cursor-pointer hover:text-primary transition-colors`.

**Activity Rows:**
- Container: `<div class="divide-y divide-black/5">`.
- Each row: `<div class="flex items-center gap-4 px-6 md:px-8 py-5">`.

**Row Structure:**
- **Event Icon:** `<div class="w-10 h-10 flex items-center justify-center flex-shrink-0">` with contextual styling:
  - New Order: `bg-primary/10` + `<span class="material-symbols-outlined text-primary text-sm">receipt_long</span>`.
  - Low Stock: `bg-error/10` + `<span class="material-symbols-outlined text-error text-sm">warning</span>`.
  - New Customer: `bg-green-800/10` + `<span class="material-symbols-outlined text-green-800 text-sm">person_add</span>`.
  - Product Update: `bg-surface-container-low` + `<span class="material-symbols-outlined text-on-surface-variant text-sm">inventory_2</span>`.
  - All icon containers: ZERO radius. Sharp squares.
- **Event Text:** `<div class="flex-1">`.
  - Primary: Lato, `text-sm`, Charcoal Ink. e.g., "New order **#SI-20240405** from Alexander Wang".
  - Timestamp: Lato, `text-[10px]`, Silver Mist, `uppercase tracking-widest`. e.g., "2 HOURS AGO".
- **Event Tag (right side):** Sharp badge:
  - "NEW ORDER" — `border border-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-primary`.
  - "LOW STOCK" — `border border-error px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-error`.
  - "NEW USER" — `border border-green-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-green-800`.
  - "SYSTEM" — `border border-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-on-surface-variant`.

**5 Sample Activity Rows:**
1. `receipt_long` — "New order **#SI-20240405** placed by Alexander Wang for $340.00" — "2 HOURS AGO" — NEW ORDER
2. `warning` — "**Nike Air Max 90 (White, US 9)** has reached 0 stock" — "4 HOURS AGO" — LOW STOCK
3. `person_add` — "New customer account created: **Maya Chen**" — "6 HOURS AGO" — NEW USER
4. `inventory_2` — "**Jordan AJ1 Retro High OG** inventory updated (+50 units)" — "8 HOURS AGO" — SYSTEM
5. `receipt_long` — "Order **#SI-20240404** shipped via Express" — "12 HOURS AGO" — NEW ORDER

---

**SECTION 3 — NO FOOTER ON ADMIN PAGES**

Admin dashboard pages do NOT include the customer-facing footer. The sidebar provides all navigation. The main content area extends to the bottom of the viewport.

Optionally, include a minimal admin footer bar at the bottom of the main content:
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
- CSS class `.cobalt-grade` MUST be defined and applied to product thumbnails in the Low Stock table.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No cards, buttons, badges, table cells, icon containers, or panels may possess a border-radius greater than 0px.
- Sidebar uses Deep Cobalt Midnight (#0d1b4b) — NOT the customer-facing glassmorphism nav.
- No pie charts, donut charts, or complex graph visualizations. Keep data representation strictly tabular and typographic.
