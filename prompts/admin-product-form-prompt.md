# Sneaker Index — Admin Product Form / Entry Creation (admin-product-form.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, admin-dashboard-prompt.md (sidebar spec), admin-products-prompt.md (sibling page), image_471bb7.png (The Curator Management Suite — direct visual reference for sidebar/nav aesthetic) -->

A premium, editorial-grade product creation and editing form for the "Sneaker Index" admin console. This is the data-entry workbench — where a new sneaker is cataloged into the vault. The visual language MUST perfectly match the attached reference image ("The Curator Management Suite"): the same persistent dark Deep Cobalt Midnight sidebar, the same minimal top search/nav bar, and the same stark, clinical content area. The form itself is a structured document — broken into discrete, labeled sections like a museum acquisition form. Every input field, dropdown, textarea, toggle, and button uses zero-radius sharp geometry. There are no rounded corners, no soft shadows, no pastel accents — just the Sovereign Cobalt thread on a clean white canvas.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width: fluid — admin pages use full viewport width)
- Theme: Light, editorial luxury — stark, clinical, data-driven
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel / Input Backgrounds: Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): primary CTAs, active inputs, active toggles, selected states — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): sidebar accent — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): CTA hover state — `secondary`, `hover:bg-secondary`
- Deep Cobalt Midnight (#0d1b4b): sidebar background
- Text Primary — Charcoal Ink (#181c20): headlines, input text — `on-surface`
- Text Secondary — Storm Slate (#444654): form labels, section descriptions — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): placeholders, helper text, optional markers
- Error — (#ba1a1a): validation errors, required field highlights — `error`
- Success — (#166534 / Tailwind `green-800`): success confirmations
- Typography Display: Bebas Neue — page title, section headers, all-caps condensed
- Typography Body/UI: Lato — all form labels, inputs, textareas, buttons, dropdowns
- ALL Shapes: ZERO border-radius — inputs, textareas, dropdowns, buttons, toggles, file zones, panels
- Transitions: `transition-colors` 150ms ease; buttons `transition-all` with `active:scale-[0.98]`

---

**Page Structure:**

**SECTION 1 — PERSISTENT LEFT SIDEBAR (Identical to admin-products.html — "PRODUCTS" remains active)**

**Container:**
- `<aside class="fixed left-0 top-0 h-screen w-[260px] bg-[#0d1b4b] text-white flex flex-col z-50 overflow-y-auto">`.
- Deep Cobalt Midnight (#0d1b4b). ZERO radius.

**Sidebar Header:**
- Container: `<div class="px-6 py-8 border-b border-white/10">`.
- Logo: `<a href="admin-dashboard.html">` — "S" in white Bebas Neue `text-2xl` + "INDEX / ADMIN" in Lato `text-[10px] uppercase tracking-[0.3em] font-black text-white/60`.
- Subtitle: "MANAGEMENT SUITE" — Lato, `text-[9px]`, `uppercase tracking-[0.2em] text-white/30`, `mt-1`.

**Navigation — "MANAGEMENT":**
- Section label: `<p class="px-6 pt-8 pb-3 font-body text-[9px] uppercase tracking-[0.3em] font-black text-white/30">MANAGEMENT</p>`.
- **"PRODUCTS" is ACTIVE** (user navigated here from the product list):
  1. `dashboard` — "DASHBOARD" → `admin-dashboard.html` — inactive: `border-l-4 border-transparent text-white/50 hover:bg-white/5 hover:text-white/80`.
  2. `inventory_2` — "PRODUCTS" → `admin-products.html` — **active:** `border-l-4 border-white bg-white/10 text-white font-bold`.
  3. `receipt_long` — "ORDERS" — inactive.
  4. `category` — "CATEGORIES" — inactive.
  5. `group` — "CUSTOMERS" — inactive.

**Navigation — "SYSTEM":**
  1. `settings` — "SETTINGS" — inactive.
  2. `analytics` — "ANALYTICS" — inactive.

**Sidebar Footer:**
- Admin info: "ADMIN USER" / "admin@sneakerindex.com" — Lato, white/white-40.
- Sign out: `text-white/30 hover:text-error`.

---

**SECTION 2 — TOP NAVIGATION BAR (Matches reference image exactly)**

This is a slim horizontal bar that sits at the very top of the main content area, flush with the sidebar's top edge.

**Container:**
- `<div class="fixed top-0 left-[260px] right-0 h-14 bg-surface-container-lowest border-b border-black/5 flex items-center justify-between px-8 z-40">`.
- Pure Canvas White background, sharp, minimal.

**Left side — Search:**
- `<div class="relative">`.
- Icon: `<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>`.
- Input: `<input class="bg-surface-container-low border-0 pl-10 pr-4 py-2 font-body text-[10px] uppercase tracking-[0.15em] placeholder:text-slate-400 focus:ring-0 focus:bg-surface-container-low w-[360px]" placeholder="SEARCH ARCHIVE..." type="text">`. ZERO radius.

**Right side:**
- `<div class="flex items-center gap-4">`.
- Label: "MANAGEMENT CONSOLE" — Lato, `text-[10px]`, `uppercase tracking-[0.2em] font-bold`, Storm Slate.
- Refresh: `<button class="w-8 h-8 border border-black/10 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">refresh</span></button>`. ZERO radius.

---

**SECTION 3 — MAIN CONTENT AREA (Form)**

**Outer Wrapper:**
- `<main class="ml-[260px] pt-14 min-h-screen bg-surface">`.
- Inner: `<div class="p-8 lg:p-12 max-w-[1100px]">`.
- The form is constrained to 1100px max-width for readability — not fully fluid like the table pages.

---

**SECTION 3A — PAGE HEADER**

**Container:**
- `<div class="mb-10">`.

**Breadcrumb:**
- `<div class="flex items-center gap-2 mb-4">`.
- `<a href="admin-products.html" class="font-body text-[10px] uppercase tracking-[0.2em] text-primary hover:text-secondary transition-colors font-bold">PRODUCT ARCHIVE</a>`.
- `<span class="material-symbols-outlined text-[10px] text-slate-400">chevron_right</span>`.
- `<span class="font-body text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">NEW ENTRY</span>`.

**System Label:**
- "INVENTORY SYSTEM V4.0" — Lato, `text-[10px]`, `uppercase tracking-[0.3em] font-black`, Sovereign Cobalt (`text-primary`), `mb-2`.

**Page Title:**
- `<h1>` — "NEW PRODUCT ENTRY" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink.

**Accent bar:**
- `<div class="w-20 h-[3px] bg-primary mt-4"></div>`.

**Subtitle:**
- "Register a new sneaker into the catalog archive." — Lato, `text-sm`, Storm Slate, `tracking-wide mt-3`.

---

**SECTION 3B — GLOBAL VALIDATION MESSAGE ZONE**

**Container:**
- `<div class="mb-8">` — reserved for form-level feedback.
- Default: hidden/empty.

**Error State:**
- `<div class="border-2 border-error bg-error/5 px-6 py-4 flex items-center gap-3">`.
- Icon: Material Symbols `error` in `text-error`.
- Text: "Error: Please correct the highlighted fields below." — Lato, `text-sm`, `font-bold`, `text-error`.
- Dismiss: `<button class="ml-auto material-symbols-outlined text-error hover:text-on-surface transition-colors text-sm">close</button>`.
- ZERO radius.

**Success State:**
- Same structure: `border-2 border-green-800 bg-green-800/5`, icons and text in `text-green-800`.
- Text: "Product saved successfully. Redirecting to archive..."

---

**FORM ELEMENT — `<form class="space-y-0">`**

---

**FORM BLOCK 1 — CORE DETAILS**

**Section Header:**
- `<div class="bg-surface-container-lowest border border-black/5 p-6 md:p-8 mb-6">`. ZERO radius.
- Inner:
  - `<h2>` — "CORE DETAILS" — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink, `mb-1`.
  - Subtitle: "Product identity and classification." — Lato, `text-xs`, Storm Slate, `tracking-wide`.

**Fields Container:**
- `<div class="bg-surface-container-lowest border border-black/5 border-t-0 p-6 md:p-8 space-y-6 -mt-6">`. Connected visually to the header (no top border, negative margin to merge).

**Standard Input Styling (applies to ALL inputs on this page):**
- Label: `<label>`, Lato (`font-lato`), `text-[10px]`, `uppercase`, `font-black`, `tracking-widest`, Storm Slate (`text-on-surface-variant`), `mb-2 block`.
- Input: `<input class="w-full border border-black/15 bg-surface-container-low px-4 py-3 focus:ring-0 focus:border-primary transition-colors font-lato text-sm text-on-surface placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest">`. ZERO radius.
- Optional marker: "(OPTIONAL)" appended to label in Silver Mist.
- Error state per field: `<p class="text-error text-[10px] uppercase tracking-widest font-bold mt-1 hidden">THIS FIELD IS REQUIRED</p>`.

**Fields:**
- Row 1: **Product Name** — full-width. Placeholder: "AIR MAX PULSE 'WOLF GREY'".
- Row 2: **Brand** + **Category** — side by side `grid grid-cols-1 md:grid-cols-2 gap-6`.
  - Brand: `<input>`. Placeholder: "NIKE".
  - Category: `<select class="w-full border border-black/15 bg-surface-container-low px-4 py-3 font-lato text-sm text-on-surface focus:ring-0 focus:border-primary transition-colors appearance-none">`. ZERO radius.
    - Options: "SELECT CATEGORY" (placeholder) | "Running" | "Lifestyle" | "Basketball" | "Skateboarding" | "Training" | "Heritage" | "Luxury" | "Performance"
- Row 3: **Description** — full-width textarea.
  - `<textarea class="w-full border border-black/15 bg-surface-container-low px-4 py-3 focus:ring-0 focus:border-primary transition-colors font-lato text-sm text-on-surface placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest resize-y min-h-[120px]">`. ZERO radius.
  - Placeholder: "ENTER PRODUCT DESCRIPTION, COLORWAY DETAILS, AND KEY FEATURES..."
  - Helper text below: "Markdown supported." — Lato, `text-[10px]`, Silver Mist, `italic mt-1`.

---

**FORM BLOCK 2 — PRICING & STATUS**

**Section Header:**
- `<div class="bg-surface-container-lowest border border-black/5 p-6 md:p-8 mb-6 mt-10">`.
- `<h2>` — "PRICING & STATUS" — Bebas Neue, `text-2xl`, Charcoal Ink, `mb-1`.
- Subtitle: "Set retail pricing and catalog visibility." — Lato, `text-xs`, Storm Slate.

**Fields Container:**
- `<div class="bg-surface-container-lowest border border-black/5 border-t-0 p-6 md:p-8 space-y-6 -mt-6">`.

**Fields:**
- Row 1: **Price (USD)** + **Compare-at Price** — side by side.
  - Price: Input with "$" prefix. `<div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 font-headline text-lg text-primary">$</span><input class="... pl-10" placeholder="160.00" type="number" step="0.01"></div>`.
  - Compare-at: Same structure. Label includes "(OPTIONAL)". Placeholder: "200.00".

- Row 2: **Featured Entry** + **Visibility** — side by side.

  - **Featured Entry — Sharp Segmented Control (NOT a rounded toggle):**
    - Label: "FEATURED ENTRY" — standard label styling.
    - `<div class="flex gap-0 mt-2">`.
    - Two flush buttons acting as a binary toggle:
      - **YES (active):** `<button type="button" class="px-8 py-3 border-2 border-primary bg-primary text-white font-body text-[10px] uppercase tracking-[0.2em] font-bold transition-all">YES</button>`.
      - **NO (inactive):** `<button type="button" class="px-8 py-3 border-2 border-black/15 bg-transparent text-on-surface-variant font-body text-[10px] uppercase tracking-[0.2em] font-bold hover:border-primary hover:text-primary transition-all -ml-[2px]">NO</button>`.
    - The active segment fills with Sovereign Cobalt. The inactive segment is a ghost outline. ZERO radius. NOT a rounded iOS toggle.

  - **Visibility — Same Segmented Control:**
    - Label: "VISIBILITY".
    - Two segments: "ACTIVE" (active, filled cobalt) | "ARCHIVED" (inactive, ghost).

---

**FORM BLOCK 3 — MEDIA ARCHIVE**

**Section Header:**
- `<div class="bg-surface-container-lowest border border-black/5 p-6 md:p-8 mb-6 mt-10">`.
- `<h2>` — "MEDIA ARCHIVE" — Bebas Neue, `text-2xl`, Charcoal Ink, `mb-1`.
- Subtitle: "Product imagery for the catalog. First image becomes the primary thumbnail." — Lato, `text-xs`, Storm Slate.

**Fields Container:**
- `<div class="bg-surface-container-lowest border border-black/5 border-t-0 p-6 md:p-8 -mt-6">`.

**Primary Image Upload Zone:**
- `<div class="border-2 border-dashed border-black/15 p-12 text-center hover:border-primary transition-colors cursor-pointer group">`. ZERO radius. Dashed border.
- Icon: Material Symbols `cloud_upload`, `text-[48px]`, `text-surface-container-highest group-hover:text-primary transition-colors`.
- Headline: "DROP FILES OR CLICK TO UPLOAD" — Lato, `text-xs`, `uppercase tracking-[0.2em] font-bold`, Storm Slate, `mt-4`.
- Subtitle: "PNG, JPG, WEBP · Max 5MB per file" — Lato, `text-[10px]`, Silver Mist, `mt-1`.
- Hidden file input behind the entire zone.

**Image URL Alternative:**
- `<p class="font-body text-[10px] uppercase tracking-widest text-slate-400 my-4 text-center">— OR PROVIDE A DIRECT URL —</p>`.
- `<div class="flex gap-3">`.
  - Input: `<input class="flex-1 border border-black/15 bg-surface-container-low px-4 py-3 font-body text-sm placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest focus:border-primary focus:ring-0 transition-colors" placeholder="HTTPS://..." type="url">`. ZERO radius.
  - Add button: `<button type="button" class="border border-black/15 px-6 py-3 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors">ADD</button>`. ZERO radius.

**Image Preview Grid (shown after upload/URL entry):**
- `<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">`.
- Each preview: `<div class="relative cobalt-grade aspect-square bg-surface-container-low overflow-hidden group">`.
  - `<img class="w-full h-full object-contain p-4">`.
  - `.cobalt-grade` applied to container.
  - Delete overlay (on hover): `<div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><button class="material-symbols-outlined text-white text-xl hover:text-error transition-colors">delete</button></div>`.
  - Primary badge (first image): `<span class="absolute top-2 left-2 bg-primary px-2 py-1 text-[8px] uppercase tracking-widest font-bold text-white">PRIMARY</span>`. ZERO radius.

---

**FORM BLOCK 4 — INVENTORY VARIANTS**

**Section Header:**
- `<div class="bg-surface-container-lowest border border-black/5 p-6 md:p-8 mb-6 mt-10">`.
- `<h2>` — "INVENTORY VARIANTS" — Bebas Neue, `text-2xl`, Charcoal Ink, `mb-1`.
- Subtitle: "Define available colorways and size runs. Each variant generates a unique SKU." — Lato, `text-xs`, Storm Slate.

**Fields Container:**
- `<div class="bg-surface-container-lowest border border-black/5 border-t-0 p-6 md:p-8 -mt-6">`.

---

**SUB-BLOCK 4A — COLORS**

**Sub-header:**
- "COLORWAYS" — Lato, `text-[10px]`, `uppercase tracking-[0.2em] font-black`, Storm Slate, `mb-4`.

**Color Entry Row (repeatable):**
- `<div class="flex items-center gap-4 mb-4">`.
  - **Color Swatch Preview:** `<div class="w-10 h-10 border border-black/15 flex-shrink-0" style="background-color: #808080;">` — live-updating preview square. ZERO radius.
  - **Color Name:** `<input class="flex-1 border border-black/15 bg-surface-container-low px-4 py-3 font-body text-sm focus:ring-0 focus:border-primary transition-colors" placeholder="WOLF GREY" type="text">`. ZERO radius.
  - **Hex Value:** `<input class="w-[140px] border border-black/15 bg-surface-container-low px-4 py-3 font-body text-sm uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors" placeholder="#808080" type="text" maxlength="7">`. ZERO radius.
  - **Remove:** `<button type="button" class="w-10 h-10 border border-black/15 flex items-center justify-center text-slate-400 hover:border-error hover:text-error transition-colors flex-shrink-0"><span class="material-symbols-outlined text-sm">close</span></button>`. ZERO radius.

**Sample Color Entries (show 2 pre-filled):**
1. Swatch: #808080 | Name: "WOLF GREY" | Hex: "#808080"
2. Swatch: #FFFFFF | Name: "WHITE" | Hex: "#FFFFFF"

**Add Color Button:**
- `<button type="button" class="border border-dashed border-black/15 px-6 py-3 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2 mt-2"><span class="material-symbols-outlined text-sm">add</span>ADD COLORWAY</button>`. ZERO radius.

---

**SUB-BLOCK 4B — SIZES & STOCK**

**Sub-header:**
- "SIZE MATRIX" — Lato, `text-[10px]`, `uppercase tracking-[0.2em] font-black`, Storm Slate, `mb-4 mt-8`.

**Size Matrix Table:**
- `<table class="w-full">`.
- **Header:** `<thead><tr class="border-b border-black/10">`.
  - `<th class="py-3 text-left font-body text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant">SIZE LABEL</th>`.
  - `<th>SKU</th>`.
  - `<th>STOCK COUNT</th>`.
  - `<th class="w-12"></th>` — action column.

- **Body Rows (repeatable):** `<tbody class="divide-y divide-black/5">`.
  - Each: `<tr class="group">`.
  - **Size Label:** `<td class="py-3 pr-4"><input class="w-full border border-black/15 bg-surface-container-low px-3 py-2 font-body text-xs focus:ring-0 focus:border-primary transition-colors" placeholder="US 10" type="text"></td>`. ZERO radius.
  - **SKU:** `<td class="py-3 pr-4"><input class="w-full border border-black/15 bg-surface-container-low px-3 py-2 font-body text-[10px] uppercase tracking-widest focus:ring-0 focus:border-primary transition-colors" placeholder="NKE-AMP-WLFGRY-10" type="text"></td>`. ZERO radius.
  - **Stock Count:** `<td class="py-3 pr-4"><input class="w-full border border-black/15 bg-surface-container-low px-3 py-2 font-body text-xs text-center focus:ring-0 focus:border-primary transition-colors" placeholder="0" type="number" min="0"></td>`. ZERO radius.
  - **Remove:** `<td class="py-3"><button type="button" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-error transition-colors opacity-0 group-hover:opacity-100"><span class="material-symbols-outlined text-sm">close</span></button></td>`.

**Sample Size Rows (show 4 pre-filled):**
1. US 8 | NKE-AMP-WLFGRY-08 | 150
2. US 9 | NKE-AMP-WLFGRY-09 | 245
3. US 10 | NKE-AMP-WLFGRY-10 | 312
4. US 11 | NKE-AMP-WLFGRY-11 | 180

**Add Size Button:**
- `<button type="button" class="border border-dashed border-black/15 px-6 py-3 font-body text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2 mt-4"><span class="material-symbols-outlined text-sm">add</span>ADD SIZE</button>`. ZERO radius.

**Variant Summary (below the matrix):**
- `<div class="mt-6 bg-surface-container-low p-4 flex items-center justify-between">`.
- Left: "TOTAL VARIANTS: **8**" — Lato, `text-xs`, Storm Slate. Count in `font-bold text-on-surface`.
- Right: "TOTAL STOCK: **887 UNITS**" — Lato, `text-xs`, Storm Slate. Count in `font-bold text-primary`.

---

**SECTION 3C — STICKY BOTTOM ACTION BAR**

**Container:**
- `<div class="fixed bottom-0 left-[260px] right-0 bg-surface-container-lowest border-t border-black/10 px-8 lg:px-12 py-4 z-30">`.
- Inner: `<div class="max-w-[1100px] flex items-center justify-between">`.

**Left side — Status hint:**
- "Unsaved changes" — Lato, `text-[10px]`, `uppercase tracking-widest`, Sovereign Cobalt (`text-primary`), `font-bold`, with a pulsing dot: `<span class="inline-block w-2 h-2 bg-primary mr-2 animate-pulse"></span>`. The dot is a square (ZERO radius).

**Right side — Action buttons:**
- `<div class="flex items-center gap-4">`.
- **Cancel:** `<a href="admin-products.html" class="border-2 border-black/20 px-10 py-3 font-body font-bold uppercase tracking-[0.2em] text-xs text-on-surface hover:border-primary hover:text-primary transition-all active:scale-[0.98]">CANCEL</a>`. Transparent ghost. ZERO radius.
- **Save:** `<button type="submit" class="bg-primary px-10 py-3 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2"><span class="material-symbols-outlined text-sm">save</span>SAVE ENTRY</button>`. Sovereign Cobalt filled. ZERO radius.

---

**SECTION 4 — ADMIN FOOTER BAR (Minimal — below form, before sticky bar)**

- `<div class="mt-16 mb-20 pt-6 border-t border-black/5 flex items-center justify-between">`.
- Left: "SNEAKER INDEX ADMIN v1.0" — Lato, `text-[9px]`, `uppercase tracking-[0.2em]`, Silver Mist.
- Right: "© 2024 SNEAKER INDEX. ALL RIGHTS RESERVED." — same styling.
- Extra bottom margin (`mb-20`) to ensure content doesn't hide behind the sticky action bar.

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map in `<script id="tailwind-config">`: primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to image preview containers.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No inputs, textareas, selects, buttons, toggles, file zones, swatches, or panels may possess a border-radius greater than 0px.
- Featured/Visibility controls MUST be sharp segmented buttons (ZERO radius), NOT rounded iOS toggle switches.
- Checkboxes MUST be squares (0px radius), NOT circles.
- Sidebar uses Deep Cobalt Midnight (#0d1b4b).
- Form max-width constrained to 1100px for readability.
