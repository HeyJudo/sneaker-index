# Sneaker Index — Admin Order Management (admin-orders.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, admin-dashboard-prompt.md (sidebar spec), admin-products-prompt.md (table/filter patterns), orders-prompt.md (status badge system), Mion Orders reference image (structural split-view reference only — styling completely overridden) -->

A premium, editorial-grade order management interface for the "Sneaker Index" admin console. This is the fulfillment command center — where every transaction is tracked, inspected, and actioned. The defining feature of this page is the **split-view layout**: a scrollable order list/table on the left and a fixed, contextual detail panel on the right that populates when an order is selected. Completely reject the soft, rounded, colorful pill-tag aesthetic of the reference image. Rebuild everything with the Sneaker Index design system: zero-radius sharp geometry, Bebas Neue / Lato typographic tension, and the Sovereign Cobalt accent thread. Status tags are sharp rectangles. The detail panel is a clinical invoice viewport, not a friendly card. The entire interface should feel like a logistics dispatch terminal at a luxury fulfillment center.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (fluid viewport — admin pages)
- Theme: Light, editorial luxury — stark, clinical, data-driven
- Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel: Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary — Sovereign Cobalt (#00289c) — `primary`
- Primary Container — Royal Blueprint (#1a3fc4) — `primary-container`
- Hover — Electric Cobalt (#0051d5) — `secondary`
- Sidebar — Deep Cobalt Midnight (#0d1b4b)
- Text Primary — Charcoal Ink (#181c20) — `on-surface`
- Text Secondary — Storm Slate (#444654) — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / `slate-400`)
- Error — (#ba1a1a) — `error`
- Success — (#166534 / `green-800`)
- Warning — (#92400e / `amber-800`)
- Typography Display: Bebas Neue — page title, order numbers, section headers, totals
- Typography Body/UI: Lato — table data, labels, filters, buttons
- ALL Shapes: ZERO border-radius
- Cobalt Grade: `.cobalt-grade` on product thumbnails
- Transitions: `transition-colors` 150ms; buttons `transition-all` with `active:scale-[0.98]`

---

**Page Structure:**

**SECTION 1 — PERSISTENT LEFT SIDEBAR ("ORDERS" active)**

**Container:**
- `<aside class="fixed left-0 top-0 h-screen w-[260px] bg-[#0d1b4b] text-white flex flex-col z-50 overflow-y-auto">`.

**Sidebar Header:**
- `<div class="px-6 py-8 border-b border-white/10">`.
- Logo: `<a href="admin-dashboard.html">` — "S" white Bebas `text-2xl` + "INDEX / ADMIN" Lato `text-[10px] uppercase tracking-[0.3em] font-black text-white/60`.
- Subtitle: "MANAGEMENT SUITE" — Lato `text-[9px] uppercase tracking-[0.2em] text-white/30`.

**Navigation — "MANAGEMENT":**
- `<p class="px-6 pt-8 pb-3 font-body text-[9px] uppercase tracking-[0.3em] font-black text-white/30">MANAGEMENT</p>`.
- **"ORDERS" is ACTIVE:**
  1. `dashboard` — "DASHBOARD" — inactive: `border-l-4 border-transparent text-white/50 hover:bg-white/5 hover:text-white/80`.
  2. `inventory_2` — "PRODUCTS" — inactive.
  3. `receipt_long` — "ORDERS" — **active:** `border-l-4 border-white bg-white/10 text-white font-bold`.
  4. `category` — "CATEGORIES" — inactive.
  5. `group` — "CUSTOMERS" — inactive.

**Navigation — "SYSTEM":**
  1. `settings` — "SETTINGS" — inactive.
  2. `analytics` — "ANALYTICS" — inactive.

**Sidebar Footer:**
- Admin: "ADMIN USER" / "admin@sneakerindex.com".
- Sign out: `text-white/30 hover:text-error`.

---

**SECTION 2 — TOP NAVIGATION BAR**

- `<div class="fixed top-0 left-[260px] right-0 h-14 bg-surface-container-lowest border-b border-black/5 flex items-center justify-between px-8 z-40">`.
- Left: Search input `w-[360px]`, `bg-surface-container-low`, placeholder "SEARCH ARCHIVE...". ZERO radius.
- Right: "MANAGEMENT CONSOLE" label + refresh button `w-8 h-8 border border-black/10`. ZERO radius.

---

**SECTION 3 — MAIN CONTENT AREA (Split View)**

**Outer Wrapper:**
- `<main class="ml-[260px] pt-14 min-h-screen bg-surface">`.

**Split Layout:**
- `<div class="flex h-[calc(100vh-56px)]">`.
- Left panel (order list): `<div class="flex-1 overflow-y-auto border-r border-black/5">`.
- Right panel (order detail): `<div class="w-[440px] xl:w-[480px] overflow-y-auto flex-shrink-0 bg-surface-container-lowest">`.

---

**SECTION 3A — LEFT PANEL (Order List)**

**Inner padding:**
- `<div class="p-8 lg:p-10">`.

**Page Header:**
- `<div class="mb-8">`.
- System label: "FULFILLMENT CENTER V3.0" — Lato `text-[10px] uppercase tracking-[0.3em] font-black text-primary`, `mb-2`.
- `<h1>` — "ORDER MANAGEMENT" — Bebas Neue (`font-headline`), `text-4xl lg:text-5xl`, Charcoal Ink.
- Accent bar: `<div class="w-20 h-[3px] bg-primary mt-3"></div>`.
- Stats: `<div class="flex items-center gap-6 mt-3">`.
  - "**362** Orders" — Lato `text-xs` Storm Slate, count `font-bold text-on-surface`.
  - "·" — "**$99,350** Revenue" — count `font-bold text-primary`.

---

**SEARCH & FILTER BAR:**

**Container:**
- `<div class="mb-6 space-y-4">`.

**Row 1 — Search + Date range:**
- `<div class="flex items-center gap-4">`.
- **Search:** `<div class="relative flex-1"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span><input class="w-full border border-black/15 bg-surface-container-low pl-10 pr-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors" placeholder="ORDER #, CUSTOMER EMAIL, OR NAME..."></div>`. ZERO radius.
- **Date Filter:** `<select class="border border-black/15 bg-surface-container-low px-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant focus:border-primary focus:ring-0 appearance-none pr-8 min-w-[160px]">`. ZERO radius.
  - Options: "ALL TIME" | "TODAY" | "LAST 7 DAYS" | "LAST 30 DAYS" | "THIS MONTH" | "CUSTOM RANGE"
- **Export:** `<button class="border border-black/15 px-4 py-2 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"><span class="material-symbols-outlined text-sm">download</span>EXPORT</button>`. ZERO radius.

**Row 2 — Status Filter Tabs:**
- `<div class="flex gap-0 border-b border-black/10">`.
- Each tab: `<button class="px-6 py-3 font-body text-[10px] uppercase tracking-[0.2em] font-bold transition-colors border-b-2 -mb-px">`.
- **Active tab:** `text-primary border-primary`.
- **Inactive:** `text-slate-400 border-transparent hover:text-on-surface-variant`.
- Tabs:
  1. "ALL" (active) — with count badge: `<span class="ml-2 bg-surface-container-low text-on-surface-variant px-2 py-0.5 text-[9px] font-black">362</span>`.
  2. "PROCESSING" — `<span class="ml-2 ...">48</span>`.
  3. "SHIPPED" — `<span class="ml-2 ...">27</span>`.
  4. "DELIVERED" — `<span class="ml-2 ...">271</span>`.
  5. "CANCELLED" — `<span class="ml-2 ...">16</span>`.
- Count badges: ZERO radius. Sharp rectangles.

---

**ORDER TABLE:**

**Container:**
- `<div class="bg-surface-container-lowest border border-black/5 overflow-x-auto">`. ZERO radius.

**Table:**
- `<table class="w-full min-w-[700px]">`.

**Header:**
- `<thead><tr class="border-b border-black/10 bg-surface-container-low/50">`.
- Columns:
  1. "ORDER #" — `font-body text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant`.
  2. "CUSTOMER"
  3. "DATE"
  4. "ITEMS"
  5. "TOTAL"
  6. "SHIPPING"
  7. "STATUS"

**Body Rows:**
- `<tbody class="divide-y divide-black/5">`.
- Each row: `<tr class="hover:bg-surface-container-low/30 transition-colors cursor-pointer group" data-order-id="SI-20240405">`.
- **Selected row (when detail panel shows this order):** `bg-primary/5 border-l-4 border-primary`. The left border signals which order is being viewed.
- **Unselected:** `border-l-4 border-transparent`.

**Column Cells:**

1. **Order #:**
   - `<td class="px-5 py-4">`.
   - Number: "#SI-20240405" — Bebas Neue (`font-headline`), `text-base`, Charcoal Ink.
   - Displayed prominently as the row identifier.

2. **Customer:**
   - `<td class="px-5 py-4">`.
   - Name: "Alexander Wang" — Lato, `text-xs font-bold text-on-surface`.
   - Email: "curator@sneakerindex.com" — Lato, `text-[10px] text-slate-400 tracking-wide mt-0.5`.

3. **Date:**
   - `<td class="px-5 py-4">`.
   - "APR 5, 2024" — Lato, `text-[10px] uppercase tracking-widest text-on-surface-variant`.
   - Time: "1:04 PM" — Lato, `text-[10px] text-slate-400`.

4. **Items:**
   - `<td class="px-5 py-4">`.
   - Count: "3" — Lato, `text-xs font-bold text-on-surface`.
   - Label: "items" — Lato, `text-[10px] text-slate-400`.

5. **Total:**
   - `<td class="px-5 py-4">`.
   - "$492.20" — Bebas Neue, `text-lg text-on-surface`.

6. **Shipping:**
   - `<td class="px-5 py-4">`.
   - "EXPRESS" — Lato, `text-[10px] uppercase tracking-widest font-bold text-on-surface-variant`.

7. **Status:**
   - `<td class="px-5 py-4">`.
   - **PROCESSING:** `<span class="border-2 border-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-primary">PROCESSING</span>`.
   - **SHIPPED:** `<span class="border-2 border-primary bg-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-white">SHIPPED</span>`.
   - **DELIVERED:** `<span class="border-2 border-green-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-green-800">DELIVERED</span>`.
   - **CANCELLED:** `<span class="border-2 border-error px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-error">CANCELLED</span>`.
   - All ZERO radius.

---

**8 Sample Order Rows:**

| # | Order # | Customer | Date | Items | Total | Shipping | Status |
|---|---------|----------|------|-------|-------|----------|--------|
| 1 | #SI-20240405 | Alexander Wang / curator@sneakerindex.com | APR 5, 2024 1:04 PM | 3 | $492.20 | EXPRESS | PROCESSING |
| 2 | #SI-20240404 | Maya Chen / maya.chen@email.com | APR 4, 2024 6:22 PM | 1 | $180.00 | STANDARD | SHIPPED |
| 3 | #SI-20240403 | James Rodriguez / j.rodriguez@email.com | APR 3, 2024 11:15 AM | 2 | $895.00 | OVERNIGHT | DELIVERED |
| 4 | #SI-20240402 | Sarah Kim / s.kim@email.com | APR 2, 2024 3:40 PM | 1 | $149.99 | STANDARD | DELIVERED |
| 5 | #SI-20240401 | David Park / d.park@email.com | APR 1, 2024 9:08 AM | 4 | $520.00 | EXPRESS | CANCELLED |
| 6 | #SI-20240331 | Elena Torres / e.torres@email.com | MAR 31, 2024 7:55 PM | 2 | $260.00 | STANDARD | DELIVERED |
| 7 | #SI-20240330 | Liam Foster / l.foster@email.com | MAR 30, 2024 2:12 PM | 1 | $110.00 | STANDARD | PROCESSING |
| 8 | #SI-20240329 | Aisha Patel / a.patel@email.com | MAR 29, 2024 10:30 AM | 3 | $370.00 | EXPRESS | SHIPPED |

---

**TABLE PAGINATION:**

- `<div class="flex items-center justify-between p-5 border-t border-black/5">`.
- Left: "Showing **1–8** of **362** orders" — Lato `text-xs` Storm Slate.
- Right: Sharp square page buttons. Active: `bg-primary text-white`. Inactive: `border border-black/10 text-on-surface-variant hover:border-primary hover:text-primary`. ZERO radius.

---

**SECTION 3B — RIGHT PANEL (Order Detail)**

This panel is always visible on desktop. When no order is selected, it shows a placeholder state. When a row is clicked, it populates with that order's details.

**Placeholder State (no selection):**
- `<div class="flex flex-col items-center justify-center h-full text-center px-8" id="detail-placeholder">`.
- Icon: Material Symbols `receipt_long`, `text-[64px] text-surface-container-highest`.
- Text: "SELECT AN ORDER" — Bebas Neue, `text-2xl`, Storm Slate, `mt-4`.
- Subtitle: "Click any order from the list to view its full details." — Lato, `text-xs`, Silver Mist, `italic mt-2`.

**Active Detail View (populated):**
- `<div class="h-full flex flex-col" id="detail-view" style="display:none;">`.

---

**DETAIL HEADER:**
- `<div class="px-8 py-6 border-b border-black/5 flex items-center justify-between flex-shrink-0">`.
- Left:
  - Order #: "#SI-20240405" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink.
  - Date: "APRIL 5, 2024 · 1:04 PM" — Lato, `text-[10px] uppercase tracking-widest text-slate-400`, `mt-1`.
- Right:
  - Close button: `<button class="w-8 h-8 border border-black/10 flex items-center justify-center text-slate-400 hover:border-error hover:text-error transition-colors"><span class="material-symbols-outlined text-sm">close</span></button>`. ZERO radius.

---

**DETAIL BODY (scrollable):**
- `<div class="flex-1 overflow-y-auto">`.

**STATUS UPDATE SECTION:**
- `<div class="px-8 py-6 border-b border-black/5 bg-surface-container-low/30">`.
- Label: "CURRENT STATUS" — Lato, `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-3`.
- Current status badge (large): `<span class="border-2 border-primary px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-black text-primary">PROCESSING</span>`. ZERO radius.
- **Status Update Control (mt-4):**
  - `<div class="flex gap-3 mt-4">`.
  - Dropdown: `<select class="flex-1 border border-black/15 bg-white px-4 py-3 font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant focus:border-primary focus:ring-0 appearance-none pr-8">`. ZERO radius.
    - Options: "UPDATE STATUS..." (placeholder) | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  - Action button: `<button class="bg-primary px-6 py-3 text-white font-body font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2 flex-shrink-0"><span class="material-symbols-outlined text-sm">update</span>UPDATE</button>`. ZERO radius.

**Tracking Number Input (shown when status = SHIPPED):**
- `<div class="mt-4">`.
- Label: "TRACKING NUMBER" — standard label.
- `<input class="w-full border border-black/15 bg-white px-4 py-3 font-body text-sm focus:ring-0 focus:border-primary transition-colors placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest" placeholder="ENTER TRACKING #">`. ZERO radius.

---

**CUSTOMER INFO:**
- `<div class="px-8 py-6 border-b border-black/5">`.
- Section title: "CUSTOMER" — Lato `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-4`.
- Name: "Alexander Wang" — Lato `text-sm font-bold text-on-surface`.
- Email: "curator@sneakerindex.com" — Lato `text-xs text-primary hover:text-secondary transition-colors cursor-pointer`.
  - Email is clickable (mailto: link).
- Phone: "+1 (555) 012-3456" — Lato `text-xs text-on-surface-variant mt-1`.

---

**SHIPPING ADDRESS:**
- `<div class="px-8 py-6 border-b border-black/5">`.
- Section title: "SHIPPING DESTINATION" — Lato `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-4`.
- Address block (Lato `text-xs text-on-surface-variant leading-relaxed`):
  - "Alexander Wang"
  - "123 Curator Way, Suite 400"
  - "New York, NY 10001"
  - "United States"
- Shipping method: "EXPRESS SHIPPING" — Lato `text-[10px] uppercase tracking-widest font-bold text-primary mt-3`.

---

**ORDERED ITEMS:**
- `<div class="px-8 py-6 border-b border-black/5">`.
- Section title: "ITEMS (3)" — Lato `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-4`.

**Item rows:**
- `<div class="space-y-4">`.
- Each: `<div class="flex gap-4 items-center py-3 border-b border-black/5 last:border-0">`.
  - Thumbnail: `<div class="relative cobalt-grade w-14 h-14 bg-surface-container-low overflow-hidden flex-shrink-0"><img class="w-full h-full object-contain p-2"></div>`. `.cobalt-grade` REQUIRED.
  - Details:
    - Name: "AIR MAX PULSE" — Bebas Neue `text-sm text-on-surface`.
    - Meta: "Wolf Grey · US 10 · Qty: 1" — Lato `text-[10px] text-slate-400 uppercase tracking-widest`.
  - Price: "$160.00" — Lato `text-sm font-bold text-on-surface`.

**3 sample items:**
1. Air Max Pulse — Wolf Grey · US 10 · Qty 1 — $160.00
2. AJ1 Retro High OG — University Blue · US 9.5 · Qty 1 — $180.00
3. 2002R Protection Pack — Rain Cloud · US 11 · Qty 1 — $149.99

---

**FINANCIAL BREAKDOWN:**
- `<div class="px-8 py-6 border-b border-black/5">`.
- Section title: "SUMMARY" — Lato `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-4`.
- Lines (each: `<div class="flex justify-between text-sm mb-2">`):
  - "Subtotal" → "$489.99" — Lato, Storm Slate / Charcoal Ink.
  - "Shipping (Express)" → "$14.99".
  - "Tax" → "$34.30".
  - "Discount" → "-$47.08" — `text-green-800`.
- Divider: `<div class="h-px bg-black/10 my-3"></div>`.
- Total: `<div class="flex justify-between">` — "TOTAL" / "$492.20" — both Bebas Neue `text-xl`, total in `text-primary`.

---

**PAYMENT:**
- `<div class="px-8 py-6 border-b border-black/5">`.
- Section title: "PAYMENT" — Lato `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-3`.
- Method: `<div class="flex items-center gap-2">`.
  - Icon: `<span class="material-symbols-outlined text-sm text-green-800">check_circle</span>`.
  - Text: "Visa ending in 4242" — Lato `text-xs font-bold text-on-surface`.
- Status: "PAID" — `<span class="border border-green-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-green-800 mt-2 inline-block">PAID</span>`. ZERO radius.

---

**ORDER TIMELINE:**
- `<div class="px-8 py-6">`.
- Section title: "TIMELINE" — Lato `text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-4`.

**Vertical timeline (square nodes — NOT circles):**
- Each step:
  ```
  <div class="flex gap-4">
    <div class="flex flex-col items-center">
      <div class="w-3 h-3 bg-primary"></div>
      <div class="w-px h-6 bg-black/10"></div>
    </div>
    <div class="pb-4">
      <p class="font-body text-xs font-bold text-on-surface">ORDER PLACED</p>
      <p class="font-body text-[10px] text-slate-400 uppercase tracking-widest">APR 5, 2024 — 1:04 PM</p>
    </div>
  </div>
  ```
- Completed nodes: `w-3 h-3 bg-primary` (filled cobalt square).
- Current/active node: `w-3 h-3 bg-primary animate-pulse` (filled, pulsing).
- Future nodes: `w-3 h-3 border-2 border-black/20` (hollow square).
- Last node: no vertical connector line.

**Timeline steps:**
1. "ORDER PLACED" — "APR 5, 2024 — 1:04 PM" — completed.
2. "PAYMENT CONFIRMED" — "APR 5, 2024 — 1:05 PM" — completed.
3. "PROCESSING" — "APR 5, 2024 — 2:30 PM" — **current** (pulsing).
4. "SHIPPED" — pending (hollow).
5. "DELIVERED" — pending (hollow).

---

**DETAIL FOOTER (Sticky at bottom of detail panel):**
- `<div class="px-8 py-4 border-t border-black/5 flex-shrink-0 bg-surface-container-lowest">`.
- `<div class="flex items-center gap-3">`.
- **Print Invoice:** `<button class="flex-1 border border-black/15 py-3 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2"><span class="material-symbols-outlined text-sm">print</span>PRINT</button>`. ZERO radius.
- **Send Email:** `<button class="flex-1 border border-black/15 py-3 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2"><span class="material-symbols-outlined text-sm">mail</span>EMAIL</button>`. ZERO radius.

---

**EMPTY STATE (When no orders match filters):**

Replace table content:
- `<div class="flex flex-col items-center justify-center py-20 px-8 text-center">`.
- Icon: `receipt_long`, `text-[64px] text-surface-container-highest`.
- Headline: "NO ORDERS FOUND." — Bebas Neue `text-3xl` Charcoal Ink `mt-4 mb-2`.
- Subtitle: "No orders match your current filters. Adjust your search criteria or wait for new acquisitions." — Lato `text-sm` Storm Slate `italic max-w-md`.
- CTA: `<button class="mt-6 border-2 border-black/20 px-8 py-3 font-body text-xs uppercase tracking-[0.2em] font-bold text-on-surface hover:border-primary hover:text-primary transition-all">CLEAR FILTERS</button>`. ZERO radius.

---

**SECTION 4 — ADMIN FOOTER**

- Inside the left panel, below pagination:
- `<div class="mt-8 pt-6 border-t border-black/5 flex items-center justify-between px-5">`.
- Left: "SNEAKER INDEX ADMIN v1.0" — Lato `text-[9px] uppercase tracking-[0.2em]` Silver Mist.
- Right: "© 2024 SNEAKER INDEX. ALL RIGHTS RESERVED." — same.

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map in `<script id="tailwind-config">`: primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to item thumbnails in the detail panel.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No buttons, tags, inputs, dropdowns, panels, timeline nodes, or badges may possess a border-radius > 0px.
- Timeline nodes MUST be squares (0px radius), NOT circles.
- Selected order row indicated by `border-l-4 border-primary bg-primary/5`.
- Sidebar uses Deep Cobalt Midnight (#0d1b4b).
