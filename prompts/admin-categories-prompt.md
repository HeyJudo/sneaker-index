# Sneaker Index — Admin Category Management / Category Control (admin-categories.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, admin-dashboard-prompt.md (sidebar spec), admin-products-prompt.md (table/filter patterns), image_471bb7.png (The Curator Management Suite visual reference) -->

A premium, editorial-grade category management page for the "Sneaker Index" admin console. This is the taxonomy control room — where the vault's classification system is maintained. Categories are the structural backbone of the catalog; this page treats them with the same clinical precision as the product archive. The layout follows the established admin pattern: persistent Deep Cobalt Midnight sidebar, minimal top search bar, and a clean white content area split into two functional zones — a top creation/edit form panel and a bottom category table. Every surface uses zero-radius sharp geometry, Bebas Neue / Lato typographic tension, and the Sovereign Cobalt accent thread. Additionally, this page includes critical safety UX: a destructive-action confirmation modal, system toast notifications, and explicit empty/loading states — all rendered in the same stark, editorial aesthetic.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width: fluid — admin pages use full viewport width)
- Theme: Light, editorial luxury — stark, clinical, data-driven
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel: Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): active sidebar, primary CTAs, active toggles — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): sidebar accent — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): CTA hover — `secondary`
- Deep Cobalt Midnight (#0d1b4b): sidebar background
- Text Primary — Charcoal Ink (#181c20) — `on-surface`
- Text Secondary — Storm Slate (#444654) — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / `slate-400`)
- Error — (#ba1a1a) — `error`
- Success — (#166534 / `green-800`)
- Warning — (#92400e / `amber-800`)
- Typography Display: Bebas Neue — page titles, section headers, category names in table
- Typography Body/UI: Lato — form labels, inputs, table data, buttons
- ALL Shapes: ZERO border-radius — inputs, buttons, toggles, modals, toasts, tags, everything
- Transitions: `transition-colors` 150ms; buttons `transition-all` with `active:scale-[0.98]`

---

**Page Structure:**

**SECTION 1 — PERSISTENT LEFT SIDEBAR (Admin Nav — "CATEGORIES" now active)**

**Container:**
- `<aside class="fixed left-0 top-0 h-screen w-[260px] bg-[#0d1b4b] text-white flex flex-col z-50 overflow-y-auto">`.

**Sidebar Header:**
- `<div class="px-6 py-8 border-b border-white/10">`.
- Logo: `<a href="admin-dashboard.html">` — "S" in white Bebas Neue `text-2xl` + "INDEX / ADMIN" Lato `text-[10px] uppercase tracking-[0.3em] font-black text-white/60`.
- Subtitle: "MANAGEMENT SUITE" — Lato, `text-[9px]`, `uppercase tracking-[0.2em] text-white/30`.

**Navigation — "MANAGEMENT":**
- Section label: `<p class="px-6 pt-8 pb-3 font-body text-[9px] uppercase tracking-[0.3em] font-black text-white/30">MANAGEMENT</p>`.
- **"CATEGORIES" is ACTIVE:**
  1. `dashboard` — "DASHBOARD" → `admin-dashboard.html` — inactive: `border-l-4 border-transparent text-white/50 hover:bg-white/5 hover:text-white/80`.
  2. `inventory_2` — "PRODUCTS" → `admin-products.html` — inactive.
  3. `receipt_long` — "ORDERS" — inactive.
  4. `category` — "CATEGORIES" → `admin-categories.html` — **active:** `border-l-4 border-white bg-white/10 text-white font-bold`.
  5. `group` — "CUSTOMERS" — inactive.

**Navigation — "SYSTEM":**
  1. `settings` — "SETTINGS" — inactive.
  2. `analytics` — "ANALYTICS" — inactive.

**Sidebar Footer:**
- `<div class="mt-auto px-6 py-6 border-t border-white/10">`.
- Admin: "ADMIN USER" / "admin@sneakerindex.com".
- Sign out: `<a class="flex items-center gap-2 mt-4 font-body text-[10px] uppercase tracking-widest text-white/30 hover:text-error transition-colors"><span class="material-symbols-outlined text-sm">logout</span>SIGN OUT</a>`.

---

**SECTION 2 — TOP NAVIGATION BAR**

**Container:**
- `<div class="fixed top-0 left-[260px] right-0 h-14 bg-surface-container-lowest border-b border-black/5 flex items-center justify-between px-8 z-40">`.

**Left — Search:**
- `<div class="relative">`.
- `<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>`.
- `<input class="bg-surface-container-low border-0 pl-10 pr-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] placeholder:text-slate-400 focus:ring-0 w-[360px]" placeholder="SEARCH ARCHIVE...">`. ZERO radius.

**Right:**
- "MANAGEMENT CONSOLE" — Lato, `text-[10px] uppercase tracking-[0.2em] font-bold`, Storm Slate.
- Refresh button: `w-8 h-8 border border-black/10` square. ZERO radius.

---

**SECTION 3 — MAIN CONTENT AREA**

**Outer Wrapper:**
- `<main class="ml-[260px] pt-14 min-h-screen bg-surface">`.
- Inner: `<div class="p-8 lg:p-12">`.

---

**SECTION 3A — PAGE HEADER**

**Container:**
- `<div class="mb-10">`.

**System Label:**
- "TAXONOMY ENGINE V2.0" — Lato, `text-[10px] uppercase tracking-[0.3em] font-black text-primary`, `mb-2`.

**Page Title:**
- `<h1>` — "CATEGORY CONTROL" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink.

**Accent bar + Subtitle:**
- `<div class="w-20 h-[3px] bg-primary mt-4"></div>`.
- "Manage catalog classification and product taxonomy." — Lato, `text-sm`, Storm Slate, `tracking-wide mt-3`.

**Stats inline:**
- `<div class="flex items-center gap-6 mt-4">`.
- "**12** Categories" — Lato, `text-xs`, Storm Slate. Count in `font-bold text-on-surface`.
- "·"
- "**10** Active" — count in `font-bold text-green-800`.
- "·"
- "**2** Hidden" — count in `font-bold text-slate-400`.

---

**SECTION 3B — SYSTEM TOAST NOTIFICATIONS (Fixed Position)**

These are positioned at the top-right of the main content area. Hidden by default, shown via JS. Include the HTML structure for both variants.

**Toast Container:**
- `<div class="fixed top-20 right-8 z-[60] space-y-3 w-[400px]" id="toast-container">`.

**Success Toast:**
- `<div class="bg-green-800 text-white px-6 py-4 flex items-center gap-3 shadow-lg" id="toast-success" style="display:none;">`.
- Icon: `<span class="material-symbols-outlined text-white text-sm flex-shrink-0">check_circle</span>`.
- Text: "Category saved successfully." — Lato, `text-sm font-bold`.
- Dismiss: `<button class="ml-auto material-symbols-outlined text-white/60 hover:text-white text-sm">close</button>`.
- ZERO radius. Sharp rectangle.

**Error Toast:**
- `<div class="bg-error text-white px-6 py-4 flex items-center gap-3 shadow-lg" id="toast-error" style="display:none;">`.
- Same structure. Icon: `error`. Text: "Error: Category name already exists."
- ZERO radius.

**Warning Toast:**
- `<div class="border-2 border-amber-800 bg-amber-800/10 text-amber-800 px-6 py-4 flex items-center gap-3" id="toast-warning" style="display:none;">`.
- Icon: `warning`. Text: "Warning: 3 products linked to this category."
- ZERO radius.

---

**SECTION 3C — CATEGORY CREATION / EDIT FORM**

**Panel Container:**
- `<div class="bg-surface-container-low border border-black/5 p-6 md:p-8 mb-10">`. Powder Blue-Grey background. ZERO radius.

**Panel Header:**
- `<div class="flex items-center justify-between mb-6">`.
- Left: `<h2>` — "NEW CATEGORY" — Bebas Neue, `text-2xl`, Charcoal Ink. (Changes to "EDIT CATEGORY" when editing).
- Right: A text badge showing mode: `<span class="border border-primary px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-primary">CREATING</span>` (or "EDITING" when in edit mode). ZERO radius.

**Inline Validation Zone:**
- `<div class="mb-6" id="form-errors" style="display:none;">`.
- `<div class="border-2 border-error bg-error/5 px-5 py-3 flex items-center gap-3">`.
- Icon: `error` in `text-error`.
- Text: "Please correct the errors below." — Lato, `text-xs font-bold text-error`.
- ZERO radius.

**Form Fields:**
- `<form class="space-y-6" id="category-form">`.

**Standard Input Styling:**
- Label: Lato, `text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-2 block`.
- Input: `border border-black/15 bg-white px-4 py-3 font-lato text-sm focus:ring-0 focus:border-primary transition-colors w-full`. ZERO radius.
- Error per field: `<p class="text-error text-[10px] uppercase tracking-widest font-bold mt-1 hidden">REQUIRED</p>`.

**Field Layout:**
- Row 1: **Category Name** + **Slug** — side by side `grid grid-cols-1 md:grid-cols-2 gap-6`.
  - Name: required. Placeholder: "RUNNING".
  - Slug: optional (auto-generates from name). Placeholder: "running". Label includes "(AUTO-GENERATED)".
    - Helper: "Leave blank to auto-generate from name." — Lato, `text-[10px] italic text-slate-400 mt-1`.

- Row 2: **Display Order** + **Visibility Toggle** — side by side.
  - Display Order: `type="number"`, `min="0"`. Placeholder: "1". Narrow input `max-w-[200px]`.
  - **Visibility — Sharp Segmented Control:**
    - Label: "VISIBILITY".
    - `<div class="flex gap-0 mt-2">`.
    - **ACTIVE (selected):** `<button type="button" class="px-8 py-3 border-2 border-primary bg-primary text-white font-body text-[10px] uppercase tracking-[0.2em] font-bold transition-all">ACTIVE</button>`.
    - **HIDDEN (unselected):** `<button type="button" class="px-8 py-3 border-2 border-black/15 bg-transparent text-on-surface-variant font-body text-[10px] uppercase tracking-[0.2em] font-bold hover:border-primary hover:text-primary transition-all -ml-[2px]">HIDDEN</button>`.
    - ZERO radius. NOT a rounded toggle.

- Row 3: **Description** — full-width textarea.
  - `<textarea class="w-full border border-black/15 bg-white px-4 py-3 font-lato text-sm focus:ring-0 focus:border-primary transition-colors resize-y min-h-[80px] placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest" placeholder="SHORT DESCRIPTION FOR INTERNAL REFERENCE..."></textarea>`. ZERO radius.

**Form Action Buttons:**
- `<div class="flex items-center gap-4 pt-4">`.
- **Primary:** `<button type="submit" class="bg-primary px-10 py-3 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2"><span class="material-symbols-outlined text-sm">save</span>SAVE CATEGORY</button>`.
- **Cancel:** `<button type="button" class="border-2 border-black/20 px-10 py-3 font-body font-bold uppercase tracking-[0.2em] text-xs text-on-surface hover:border-primary hover:text-primary transition-all active:scale-[0.98]" id="cancel-btn">CANCEL</button>`.
- Both ZERO radius.

---

**SECTION 3D — CATEGORY TABLE**

**Table Header Bar (Search + Sort):**
- `<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">`.

**Left — Section title:**
- `<h2>` — "CATEGORY ARCHIVE" — Bebas Neue, `text-2xl`, Charcoal Ink.

**Right — Search + Sort:**
- `<div class="flex items-center gap-4 mt-4 md:mt-0">`.
- **Search:** `<div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span><input class="border border-black/15 bg-surface-container-low pl-10 pr-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors w-[240px]" placeholder="SEARCH CATEGORIES..."></div>`. ZERO radius.
- **Sort Dropdown:** `<select class="border border-black/15 bg-surface-container-low px-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant focus:border-primary focus:ring-0 appearance-none pr-8 min-w-[160px]">`. ZERO radius.
  - Options: "SORT: DISPLAY ORDER" (default) | "SORT: NAME A–Z" | "SORT: NAME Z–A" | "SORT: NEWEST" | "SORT: PRODUCT COUNT"

**Table Container:**
- `<div class="bg-surface-container-lowest border border-black/5 overflow-x-auto">`. ZERO radius.

**Table:**
- `<table class="w-full min-w-[800px]">`.

**Table Header:**
- `<thead><tr class="border-b border-black/10 bg-surface-container-low/50">`.
- Columns:
  1. `<th class="px-6 py-4 text-left font-body text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant">CATEGORY NAME</th>` — widest column.
  2. "SLUG"
  3. "STATUS"
  4. "PRODUCTS"
  5. "DISPLAY ORDER"
  6. "CREATED"
  7. "ACTIONS" — right-aligned.

**Table Body:**
- `<tbody class="divide-y divide-black/5">`.
- Each row: `<tr class="hover:bg-surface-container-low/30 transition-colors group">`.

**Column Cell Specifications:**

1. **Category Name:**
   - `<td class="px-6 py-5">`.
   - Name: Bebas Neue (`font-headline`), `text-lg`, Charcoal Ink. e.g., "RUNNING".
   - Description preview (below name): Lato, `text-[10px]`, Silver Mist, `italic mt-1`. e.g., "Performance running silhouettes".

2. **Slug:**
   - Lato, `text-[10px]`, `uppercase tracking-widest`, Silver Mist. e.g., "running".
   - Monospaced feel: `font-mono text-[10px]`.

3. **Status:**
   - **ACTIVE:** `<span class="border border-green-800 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-green-800">ACTIVE</span>`. ZERO radius.
   - **HIDDEN:** `<span class="border border-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black text-slate-400">HIDDEN</span>`. ZERO radius.

4. **Product Count:**
   - Bebas Neue, `text-lg`, Charcoal Ink. e.g., "342".
   - If 0: Silver Mist — "0".

5. **Display Order:**
   - Lato, `text-xs`, `font-bold text-center`, Storm Slate. e.g., "1".

6. **Created Date:**
   - Lato, `text-[10px]`, Silver Mist, `uppercase tracking-widest`. e.g., "JAN 15, 2024".

7. **Actions:**
   - `<td class="px-6 py-5">`.
   - `<div class="flex items-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">`.
   - **Edit:** `<button class="font-body text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors" data-edit>EDIT</button>`.
   - **Delete:** `<button class="font-body text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-error transition-colors" data-delete>DELETE</button>`.

---

**12 Sample Category Rows:**

| # | Name | Slug | Status | Products | Order | Created |
|---|------|------|--------|----------|-------|---------|
| 1 | RUNNING | running | ACTIVE | 342 | 1 | JAN 15, 2024 |
| 2 | LIFESTYLE | lifestyle | ACTIVE | 528 | 2 | JAN 15, 2024 |
| 3 | BASKETBALL | basketball | ACTIVE | 186 | 3 | JAN 15, 2024 |
| 4 | HERITAGE | heritage | ACTIVE | 143 | 4 | FEB 02, 2024 |
| 5 | SKATEBOARDING | skateboarding | ACTIVE | 92 | 5 | FEB 02, 2024 |
| 6 | LUXURY | luxury | ACTIVE | 67 | 6 | FEB 10, 2024 |
| 7 | PERFORMANCE | performance | ACTIVE | 89 | 7 | MAR 01, 2024 |
| 8 | TRAINING | training | ACTIVE | 45 | 8 | MAR 01, 2024 |
| 9 | COLLABORATION | collaboration | ACTIVE | 28 | 9 | MAR 15, 2024 |
| 10 | LIMITED EDITION | limited-edition | ACTIVE | 5 | 10 | APR 01, 2024 |
| 11 | ARCHIVED CLASSICS | archived-classics | HIDDEN | 0 | 11 | APR 01, 2024 |
| 12 | UNCATEGORIZED | uncategorized | HIDDEN | 0 | 99 | JAN 15, 2024 |

---

**SECTION 3E — TABLE PAGINATION**

- `<div class="flex items-center justify-between p-6 border-t border-black/5">`.
- Left: "Showing **1–12** of **12** categories" — Lato, `text-xs`, Storm Slate.
- Right: Sharp square page buttons (same pattern as admin-products). Active: `bg-primary text-white`. Inactive: `border border-black/10`. ZERO radius.

---

**SECTION 4 — DELETE CONFIRMATION MODAL (Hidden by default)**

**Overlay:**
- `<div class="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center" id="delete-modal" style="display:none;">`.

**Modal Container:**
- `<div class="bg-surface-container-lowest w-full max-w-[520px] mx-4">`. ZERO radius. No shadow — the dark overlay provides enough separation.

**Modal Header:**
- `<div class="bg-error px-8 py-5">`.
- `<div class="flex items-center gap-3">`.
- Icon: `<span class="material-symbols-outlined text-white text-xl">warning</span>`.
- Title: "DESTRUCTIVE ACTION" — Bebas Neue, `text-2xl`, `text-white`.
- ZERO radius. The header is a solid error-red bar — immediately signals danger.

**Modal Body:**
- `<div class="px-8 py-6">`.
- Warning headline: "DELETE CATEGORY: RUNNING" — Bebas Neue, `text-xl`, Charcoal Ink, `mb-3`. (Category name is dynamic).
- Warning text: "This category has **342 linked products**. Deleting it will de-classify those products. Consider reassigning them first." — Lato, `text-sm`, Storm Slate, `leading-relaxed`.
- **Linked Products Warning Box (conditional — shown when products > 0):**
  - `<div class="border-2 border-amber-800 bg-amber-800/5 px-5 py-3 mt-4 flex items-center gap-3">`.
  - Icon: `warning` in `text-amber-800`.
  - Text: "WARNING: 342 products are linked to this category. They will become uncategorized." — Lato, `text-xs font-bold text-amber-800`.
  - ZERO radius.
- **Confirmation Input (extra safety for critical categories):**
  - `<div class="mt-6">`.
  - Label: "TYPE THE CATEGORY NAME TO CONFIRM:" — Lato, `text-[10px] uppercase tracking-widest font-black text-on-surface-variant`.
  - Input: `<input class="w-full border border-black/15 bg-surface-container-low px-4 py-3 font-lato text-sm focus:ring-0 focus:border-error transition-colors mt-2" placeholder="RUNNING">`. ZERO radius. Focus border is error-red.

**Modal Footer:**
- `<div class="px-8 py-5 border-t border-black/5 flex items-center justify-end gap-4">`.
- **Cancel:** `<button class="border-2 border-black/20 px-8 py-3 font-body font-bold uppercase tracking-[0.2em] text-xs text-on-surface hover:border-primary hover:text-primary transition-all" id="modal-cancel">CANCEL</button>`. ZERO radius.
- **Confirm Delete:** `<button class="bg-error px-8 py-3 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-red-900 transition-all active:scale-[0.98] inline-flex items-center gap-2" id="modal-confirm" disabled><span class="material-symbols-outlined text-sm">delete_forever</span>DELETE PERMANENTLY</button>`. ZERO radius. Error-red. Disabled by default until confirmation input matches.

---

**SECTION 5 — EMPTY STATE (When zero categories exist)**

Replace table body when no categories are found. Live inside the table container.

- `<div class="flex flex-col items-center justify-center py-20 px-8 text-center">`.
- Icon: Material Symbols `category`, `text-[64px]`, `text-surface-container-highest` (#dfe3e8).
- Headline: "NO CATEGORIES FOUND." — Bebas Neue, `text-3xl`, Charcoal Ink, `mt-4 mb-2`.
- Subtitle: "Create your first curation to begin organizing the archive." — Lato, `text-sm`, Storm Slate, `italic max-w-md`.
- CTA: `<button class="mt-6 bg-primary px-8 py-3 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2" onclick="document.getElementById('category-form').scrollIntoView()"><span class="material-symbols-outlined text-sm">add</span>CREATE CATEGORY</button>`. ZERO radius.

---

**SECTION 6 — LOADING / SKELETON STATE**

Replace table body while data is loading.

- `<div class="divide-y divide-black/5">`.
- 5 skeleton rows, each:
  - `<div class="flex items-center gap-6 px-6 py-5">`.
  - Name placeholder: `<div class="h-5 bg-surface-container-low animate-pulse w-40"></div>`.
  - Slug placeholder: `<div class="h-3 bg-surface-container-low animate-pulse w-24"></div>`.
  - Status placeholder: `<div class="h-5 bg-surface-container-low animate-pulse w-16"></div>`.
  - Count placeholder: `<div class="h-5 bg-surface-container-low animate-pulse w-10"></div>`.
  - Date placeholder: `<div class="h-3 bg-surface-container-low animate-pulse w-20"></div>`.
- All shapes: ZERO radius. Sharp pulsing rectangles.

---

**SECTION 7 — ADMIN FOOTER BAR**

- `<div class="mt-12 pt-6 border-t border-black/5 flex items-center justify-between">`.
- Left: "SNEAKER INDEX ADMIN v1.0" — Lato, `text-[9px] uppercase tracking-[0.2em]`, Silver Mist.
- Right: "© 2024 SNEAKER INDEX. ALL RIGHTS RESERVED." — same styling.

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map in `<script id="tailwind-config">`: primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No inputs, buttons, modals, toasts, dropdowns, tags, or panels may possess a border-radius greater than 0px.
- Visibility toggle MUST be a sharp segmented control (ZERO radius), NOT a rounded iOS toggle.
- Modal uses a solid `bg-error` header bar for maximum danger signaling.
- Sidebar uses Deep Cobalt Midnight (#0d1b4b).
