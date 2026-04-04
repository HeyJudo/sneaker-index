# Sneaker Index — Customer Account / Profile Dashboard (account.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, client profile reference image (structural reference only — styling completely overridden), signup.html, checkout.html -->

A premium, editorial-grade customer account dashboard for "Sneaker Index." This is the authenticated user's private headquarters — their personal archive within the vault. Completely reject the soft, rounded, floating-card SaaS aesthetic of the reference image (circular avatars, colored stat cards, pill buttons, drop shadows). Adopt only its functional concept of a sidebar + main content panel dashboard layout. Every surface is rebuilt using the Sneaker Index design system: zero-radius sharp geometry, the Bebas Neue / Lato typographic clash, and the Sovereign Cobalt accent thread. The page should feel like the private client portal of a luxury fashion house — exclusive, clinical, and devoid of unnecessary decoration. The language is curatorial: "Your Archive" not "Your Dashboard," "Curated Client" not "Member."

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- General Body Background: Glacial Mist (#f7f9fe) — `bg-surface`
- Canvas/Panel Background: Pure Canvas White (#ffffff) — `surface-container-lowest`
- Surface Panel (Sidebar / Section Blocks): Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Input Field Background: Powder Blue-Grey (#f1f4f9) — `surface-container-low`, with `border-0 border-b-2 border-surface-container-highest`
- Primary Accent — Sovereign Cobalt (#00289c): primary CTAs, active sidebar indicator, active states — `primary`
- Primary Container — Royal Blueprint (#1a3fc4): footer background, logo accent "S" color — `primary-container`
- Hover Accent — Electric Cobalt (#0051d5): primary CTA hover state — `secondary`, `hover:bg-secondary`
- Text Primary — Charcoal Ink (#181c20): section headlines, form input text, names — `on-surface`
- Text Secondary — Storm Slate (#444654): form labels, sidebar links, meta copy — `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8 / Tailwind `slate-400`): subdued labels, timestamps, inactive elements
- Error Color — Error (#ba1a1a): inline validation errors — `error`
- Success Color — muted teal-green (#166534 / Tailwind `green-800`): success confirmations
- Footer Background: Royal Blueprint (#1a3fc4) — matches all Sneaker Index pages
- Typography Display: Bebas Neue — all H1/H2/H3/section headers, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — form labels, inputs, button text, sidebar links, navigation, all interactive text
- Button Shape: ZERO border-radius — brand constraint
- Input Shape: ZERO border-radius — brand constraint
- Card/Panel Shape: ZERO border-radius
- Cobalt Grade Effect: `.cobalt-grade` — `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- Transitions: `transition-colors` 150ms ease; buttons use `transition-all` with `active:scale-[0.98]`
- Navigation: Glassmorphism — white/90 opacity, backdrop-blur-10px, bottom hairline border, max-w-[1440px]

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of all other Sneaker Index pages — pixel-perfect consistency required.
- `<nav class="fixed top-0 w-full z-50 glass-nav border-b border-black/5 shadow-sm">`.
- Inner container: `flex justify-between items-center px-8 h-20 max-w-[1440px] mx-auto w-full`.
- Left: "SNEAKER INDEX" wordmark — `<a href="index.html">`, Bebas Neue (`font-headline`), `text-3xl`, `tracking-tight`. Leading "S" in Royal Blueprint (#1a3fc4 via inline `style="color: #1a3fc4;"`), remaining "NEAKER INDEX" in Charcoal Ink (#181c20).
- Center nav links (`hidden md:flex items-center gap-8`): "Home" → `index.html` | "Shop" → `catalog.html` | "Men" → `catalog.html` | "Women" → `catalog.html`. All links: Lato (`font-body`), `text-xs`, `uppercase`, `tracking-widest`, `text-on-surface-variant`, `hover:text-primary`, `transition-colors`. No active state on any nav link.
- Right icon cluster (`flex items-center gap-6`): `shopping_bag` icon → `cart.html` | `person` icon → `account.html` (active state: `text-primary` Sovereign Cobalt, indicating we are on the account page) — both Material Symbols Outlined, `text-on-surface`, `hover:text-primary`, `transition-colors`.

---

**SECTION 2 — MAIN DASHBOARD CONTENT**

**Outer Wrapper:**
- `<main class="min-h-screen pt-28 pb-24 px-4 md:px-8">`.
- Inner container: `<div class="max-w-[1440px] mx-auto">`.

**Page Headline:**
- `<h1>` — "YOUR ARCHIVE" — Bebas Neue (`font-headline`), `text-5xl md:text-6xl`, Charcoal Ink (`text-on-surface`), `mb-2`.
- Subtitle: "Manage your profile, preferences, and shipping destinations." — Lato (`font-body`), `text-sm`, Storm Slate (`text-on-surface-variant`), `tracking-wide`.
- Divider: `<div class="w-full h-px bg-black/10 mt-4 mb-12"></div>`.

**Two-Column Dashboard Layout:**
- `<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">`.
- Left sidebar: `lg:col-span-1`.
- Right main panel: `lg:col-span-3`.

---

**SECTION 2A — LEFT SIDEBAR (Account Navigation & Summary)**

**Container:**
- `<aside class="lg:sticky lg:top-28">`.
- No background color on the sidebar itself — items within have their own surfaces.

**Client Identity Block:**
- Container: `<div class="bg-surface-container-low p-8 mb-6">`. Powder Blue-Grey background. ZERO radius.
- **Avatar Zone:** `<div class="relative cobalt-grade w-20 h-20 bg-surface-container-lowest overflow-hidden mb-6">`. A square avatar container (NOT circular — brand constraint), with the `.cobalt-grade` overlay applied. Contains an `<img class="w-full h-full object-cover">` — a placeholder editorial portrait or a default user silhouette. Sharp, square crop.
- **Client Name:** "ALEXANDER WANG" — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink (`text-on-surface`).
- **Email:** "curator@sneakerindex.com" — Lato (`font-body`), `text-xs`, Storm Slate (`text-on-surface-variant`), `tracking-wide`.
- **Status Badge:** `<div class="mt-4 inline-block border-2 border-primary px-4 py-1">` — sharp-edged badge frame (ZERO radius), Sovereign Cobalt border.
  - Text: "CURATED CLIENT" — Lato (`font-body`), `text-[9px]`, `uppercase`, `tracking-[0.2em]`, `font-black`, Sovereign Cobalt (`text-primary`).
- **Member Since:** "MEMBER SINCE 2024" — Lato, `text-[10px]`, Silver Mist (`text-slate-400`), `uppercase tracking-widest`, `mt-3`.

**Sidebar Navigation Links:**
- Container: `<nav class="space-y-0 mb-6">`.
- Each link is a block-level `<a>` with: `class="flex items-center gap-3 px-6 py-4 font-body text-xs uppercase tracking-[0.15em] transition-colors"`.
- **Default state:** `text-on-surface-variant hover:bg-surface-container-low hover:text-primary`.
- **Active state (Profile):** `border-l-4 border-primary bg-surface-container-low text-primary font-bold` — the 4px Sovereign Cobalt left border is the sole active indicator. Sharp, decisive.
- **Inactive state:** `border-l-4 border-transparent`.
- Navigation items (each with a Material Symbols Outlined icon on the left):
  1. `person` — "PROFILE" (active)
  2. `local_shipping` — "ORDERS"
  3. `favorite` — "WISHLIST"
  4. `settings` — "SETTINGS"
  5. `logout` — "SIGN OUT" — this link is visually distinct: `text-slate-400 hover:text-error transition-colors`, positioned after a `mt-4 border-t border-black/5 pt-4` separator.

**Recent Order Preview (Bottom of Sidebar):**
- Container: `<div class="bg-surface-container-low p-6">`. ZERO radius.
- Header: "LATEST ORDER" — Lato (`font-body`), `text-[10px]`, `uppercase`, `tracking-[0.2em]`, `font-black`, Storm Slate, `mb-4`.
- Order preview:
  - Order ID: "#SI-20240312" — Lato, `text-xs`, Charcoal Ink, `font-bold`.
  - Date: "March 12, 2024" — Lato, `text-[10px]`, Silver Mist, `uppercase tracking-widest`.
  - Status badge: `<span class="inline-block border border-primary px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-primary mt-2">IN TRANSIT</span>`. Sharp edges.
  - Total: "$340.00" — Lato, `text-sm`, `font-bold`, Charcoal Ink, `mt-2`.
- View link: "VIEW DETAILS →" — Lato, `text-[10px]`, `uppercase`, `tracking-widest`, `text-primary`, `hover:text-secondary`, `transition-colors`, `mt-3 inline-block`.

---

**SECTION 2B — RIGHT MAIN PANEL (Profile & Address Content)**

**Global Success Message Area (top of main panel):**
- Container: `<div class="mb-8">` — reserved zone for feedback.
- Default: hidden/empty.
- **Success state:** `<div class="border-2 border-green-800 bg-green-800/5 px-6 py-4 flex items-center gap-3">`.
  - Icon: Material Symbols `check_circle` in `text-green-800`.
  - Text: "Profile updated successfully." — Lato (`font-body`), `text-sm`, `font-bold`, `text-green-800`.
  - Dismiss: `<button class="ml-auto material-symbols-outlined text-green-800 hover:text-on-surface transition-colors text-sm">close</button>`.
  - Shape: ZERO radius. Sharp-bordered confirmation.
- **Error state:** same structure but with `border-error bg-error/5` and `text-error` (#ba1a1a).

---

**FORM BLOCK 1 — PROFILE INFORMATION**

**Section Header:**
- `<h2>` — "PROFILE" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink (`text-on-surface`), `mb-2`.
- Subtitle: "Your personal details and contact preferences." — Lato, `text-sm`, Storm Slate, `mb-6`.
- Accent bar: `<div class="w-16 h-[3px] bg-primary mb-8"></div>` — Sovereign Cobalt accent bar (brand signature).

**Form Container:**
- `<form class="space-y-6 mb-16">`.

**Fields (MUST match signup/checkout field convention):**
- Each field container: `<div class="space-y-1">`.
- Label: `<label>`, Lato (`font-lato`), `text-[10px]`, `uppercase`, `font-black`, `tracking-widest`, Storm Slate (`text-on-surface-variant`).
- Input: `<input class="w-full border-0 border-b-2 border-surface-container-highest bg-surface-container-low px-4 py-3 focus:ring-0 focus:border-primary transition-colors font-lato text-sm">`.
- Shape: ZERO border-radius.
- Placeholder: `placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest`.

**Field Layout:**
- Row 1: **Full Name** — full-width. Pre-filled value: "ALEXANDER WANG".
- Row 2: **Email Address** — full-width. Pre-filled value: "CURATOR@SNEAKERINDEX.COM". Include a small lock icon (Material Symbols `lock`, `text-slate-400 text-sm`) positioned to the right to suggest email may not be editable, or append "(NON-EDITABLE)" label in Silver Mist.
- Row 3: **Phone Number** — full-width. Pre-filled or placeholder: "+1 (555) 000-0000". Label includes "(OPTIONAL)" in Silver Mist.

**Inline Field Validation (error state for any field):**
- Below the input, a `<p class="text-error text-[10px] uppercase tracking-widest font-bold mt-1 hidden">REQUIRED FIELD</p>`. Hidden by default; shown when validation fails.

**Save Button:**
- Container: `<div class="pt-4 flex items-center gap-4">`.
- Primary: `<button type="submit" class="bg-primary px-10 py-4 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98]">SAVE CHANGES</button>`.
- Sovereign Cobalt background, sharp edges. Hover: Electric Cobalt.
- Cancel link (optional): `<button type="button" class="font-body text-xs uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors font-bold">CANCEL</button>`.

---

**FORM BLOCK 2 — SHIPPING DESTINATION**

**Section Header:**
- `<h2>` — "SHIPPING DESTINATION" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink, `mb-2`.
- Subtitle: "Your preferred delivery address for future drops." — Lato, `text-sm`, Storm Slate, `mb-6`.
- Accent bar: `<div class="w-16 h-[3px] bg-primary mb-8"></div>`.

**Empty Address State (shown when no address is on file — REQUIRED UX):**
- Container: `<div class="border-2 border-dashed border-black/10 p-12 text-center">`. Sharp-cornered dashed border box.
- Icon: Material Symbols `add_location_alt`, `text-[48px]`, `text-surface-container-highest` (#dfe3e8). Large, ghosted visual anchor.
- Headline: "NO DESTINATION ON FILE." — Bebas Neue (`font-headline`), `text-2xl`, Charcoal Ink, `mt-4`.
- Subtitle: "Add your address to expedite future drops and ensure seamless delivery." — Lato, `text-sm`, Storm Slate, `italic`, `max-w-md mx-auto`, `mt-2 mb-6`.
- CTA: `<button class="bg-primary px-8 py-4 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] inline-flex items-center gap-2">ADD ADDRESS <span class="material-symbols-outlined text-sm">add</span></button>`.

**Filled Address Form (shown when editing/adding — can replace or follow the empty state):**
- `<form class="space-y-6">`.
- Row 1: **First Name** + **Last Name** — side by side in `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`.
- Row 2: **Street Address** — full-width.
- Row 3: **Apartment / Suite / Unit** — full-width. Label includes "(OPTIONAL)".
- Row 4: **City** + **State / Province** — side by side.
- Row 5: **ZIP / Postal Code** + **Country** — side by side. Country uses a `<select>` dropdown with same sharp-edge styling.
- All fields use the same input styling as FORM BLOCK 1.

**Default Address Checkbox:**
- `<label class="flex items-center gap-3 cursor-pointer group mt-4">`.
- Custom checkbox: `<div class="w-4 h-4 border-2 border-black/30 flex items-center justify-center">` — ZERO radius (square). Checked state: `bg-primary border-primary` with white `check` icon (`text-[10px] text-white`).
- Text: "Set as default shipping address" — Lato, `text-xs`, Storm Slate.

**Save Address Button (mt-6):**
- Container: `<div class="pt-4 flex items-center gap-4">`.
- Secondary Ghost CTA: `<button type="submit" class="border-2 border-black/20 px-10 py-4 font-body font-bold uppercase tracking-[0.2em] text-xs text-on-surface hover:border-primary hover:text-primary transition-all active:scale-[0.98]">SAVE ADDRESS</button>`.
- Transparent background, Charcoal Ink text, sharp edges. Hover: border and text transition to Sovereign Cobalt.
- Delete link (optional): `<button type="button" class="font-body text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-error transition-colors font-bold">DELETE ADDRESS</button>`.

---

**FORM BLOCK 3 — PASSWORD & SECURITY (Optional Section)**

**Section Header:**
- `<h2>` — "SECURITY" — Bebas Neue (`font-headline`), `text-3xl`, Charcoal Ink, `mb-2`, `mt-16`.
- Subtitle: "Update your credentials." — Lato, `text-sm`, Storm Slate, `mb-6`.
- Accent bar: `<div class="w-16 h-[3px] bg-primary mb-8"></div>`.

**Fields:**
- **Current Password** — full-width. Type `password`.
- **New Password** — full-width. Type `password`.
- **Confirm New Password** — full-width. Type `password`.
- All use the standard input styling.

**Update Button:**
- `<button type="submit" class="bg-primary px-10 py-4 text-white font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98] mt-4">UPDATE PASSWORD</button>`.

---

**SECTION 3 — PERSISTENT FOOTER**
- Exact copy of all other Sneaker Index page footers — pixel-perfect consistency required.
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
- Full Tailwind config color token map MUST be defined in `<script id="tailwind-config">` (matching existing pages exactly): primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families in Tailwind config: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override in Tailwind config: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to the avatar container.
- CSS class `.glass-nav` MUST be defined for the navbar glassmorphism effect.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- HTML `lang="en"`, `<html class="light">`.
- No form inputs, buttons, avatars, checkboxes, badges, or panels may possess a border-radius greater than 0px.
- Custom checkboxes MUST be squares (0px radius), NOT circles.
- Avatar container MUST be square (0px radius), NOT circular.
