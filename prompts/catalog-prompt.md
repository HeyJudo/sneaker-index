# Sneaker Index — Product Catalog Page (catalog.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, image8.png, image9.png -->

A premium, editorial-grade product catalog page for "Sneaker Index" that feels like a curated museum archive rather than a standard e-commerce grid. The page inherits every design decision from the landing page — the same Bebas Neue/Lato typographic clash, the same zero-radius sharpness, the same Sovereign Cobalt brand thread — and applies it to a fully functional shopping experience with sidebar filtering and a rich product grid. The layout structure is sourced from `image9.png` (hero banner + sidebar + grid layout), while the product card design is an exact recreation of the architecture seen in `image8.png`, fully translated into the Sneaker Index cobalt-and-white design language.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- Background Body: Glacial Mist (#f7f9fe) — the cool blue-white body canvas
- Background Section/Cards: Pure Canvas White (#ffffff)
- Surface Alternate: Powder Blue-Grey (#f1f4f9) — sidebar fill, image zones, filter backgrounds
- Primary Accent — Sovereign Cobalt (#00289c): active nav state, price displays, size selector borders, star ratings, cobalt-grade overlay
- Primary Action — Royal Blueprint (#1a3fc4): "Add to Bag" button background, filter apply button, active filter chip fill
- Hover Accent — Electric Cobalt (#0051d5): all hover states on cobalt elements
- Deep Cobalt Midnight (#0d1b4b): hero banner background overlay
- Text Primary — Charcoal Ink (#181c20): product titles, section headers
- Text Secondary — Storm Slate (#444654): filter labels, breadcrumb text, meta copy
- Text Meta — Silver Mist (#94a3b8): brand attribution labels, item count text, placeholder text
- Footer Background: Absolute Black (#000000)
- Typography Display: Bebas Neue — all H1/H2/H3, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — all nav, filter labels, card body text, button labels
- Button Shape: ZERO border-radius on all buttons — sharp, squared-off edges, brand-critical
- Card Shape: ZERO border-radius — sharp corners on all product cards, sidebar panels, filter inputs
- Card Border at Rest: border-black/5 (nearly invisible)
- Card Border on Hover: Sovereign Cobalt (#00289c) — the card "activates" under cursor
- Cobalt Grade Effect: All product images receive a ::after pseudo-element overlay of rgba(26, 63, 196, 0.15) using mix-blend-mode: multiply
- Image Hover: scale-110 over 700ms (duration-700) — slow, cinematic, deliberate
- Color Transitions: transition-colors at 150ms (Tailwind default)
- Navigation: Identical to landing page — glassmorphism (white/90, backdrop-blur-10px), hairline bottom border, max-w-1440px, "Shop" link active with 2px cobalt underline

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of the landing page navigation — do not alter any element
- Fixed, full-width sticky header; Pure Canvas White (#ffffff) at 90% opacity; backdrop-filter blur(10px); 1px bottom border at black/5 opacity; max-w-1440px content column
- Left: "SNEAKER INDEX" wordmark in Bebas Neue, near-black, with the leading "S" colored Sovereign Cobalt (#00289c). Logo links to index.html
- Center nav links in Lato, bold, uppercase, tracking-widest: "Home" | "Shop" (THIS PAGE — active state: Sovereign Cobalt color, 2px cobalt underline) | "Men" | "Women" | "Sale"
- Right icon cluster: search (magnifying glass), shopping_cart, person — all Material Symbols Outlined, Charcoal Ink (#181c20), spacing gap-6, hover: Sovereign Cobalt

---

**SECTION 2 — HERO BREADCRUMB BANNER**
- Full-width, no horizontal margins — bleeds edge to edge
- Height: ~380px tall
- Background: A full-bleed editorial photograph of premium sneakers shot from a dramatic low angle on a concrete surface; the image is desaturated slightly and has a Deep Cobalt Midnight (#0d1b4b) overlay at 60% opacity to create a near-black-blue atmospheric canvas
- This replaces the orange-toned shop hero from image9.png entirely — same structure, new brand-aligned aesthetic
- Centered content stack, vertically centered:
  - Page title: "THE VAULT" — Bebas Neue, ~120px, Pure White, letter-spacing 0.05em, line-height 0.9 — this is the "Shop" page's editorial name
  - Below title: Breadcrumb navigation in Lato, 13px, Storm Slate (#444654): "Home / Shop / The Vault" — with "/" separators; "Home" and "Shop" are clickable text links at Silver Mist (#94a3b8)
- No decorative CTAs in this banner — the hero is pure identity, not conversion

---

**SECTION 3 — MAIN BODY (Sidebar + Product Grid)**
- Background: Glacial Mist (#f7f9fe)
- Full-width container max-w-1440px, px-8 (32px) horizontal padding
- Top bar above sidebar+grid: "Showing 1–12 of 48 items" in Lato, 13px, Storm Slate on the left; on the right: sort controls — "Sort By:" label + a dropdown styled with a sharp border-black/5 border, Lato, 13px, Storm Slate; a "Show:" dropdown (10 / 20 / 30 items); and two view-toggle icon buttons (grid view, list view) using Material Symbols — the active view icon is Sovereign Cobalt, inactive is Silver Mist
- Layout split: **Left Sidebar 260px fixed width** + **Right Product Grid fills remaining width**; gap-8 between them; both flush to the top of the section

---

**SECTION 3A — LEFT SIDEBAR (Filter Panel)**
- No outer card wrapper — the sidebar sections are direct, with tonal separation via background and spacing only (the "No Divider" rule from DESIGN.md)
- Sidebar background: Pure Canvas White (#ffffff), full height
- Top: "FILTER" heading — Bebas Neue, 24px, Charcoal Ink
- Each filter group separated by `pb-8 mb-8 border-b border-black/5` — only the most subtle hairlines

**Filter Group 1 — PRODUCT CATEGORIES**
- Header: "CATEGORIES" — Bebas Neue, 18px, Charcoal Ink (#181c20)
- List of 5 clickable filter items in Lato, 13px bold uppercase, tracking-[0.15em]:
  - "MEN'S SHOES" → right-arrow icon (chevron_right, Material Symbols, Silver Mist)
  - "WOMEN'S SHOES" → right-arrow icon
  - "KID'S SHOES" → right-arrow icon
  - "RUNNING" → right-arrow icon
  - "LIMITED EDITION" → right-arrow icon
- Each item: full-width row, py-2, text Storm Slate (#444654) at rest; on hover: text becomes Sovereign Cobalt (#00289c), the arrow icon also turns cobalt
- Active/selected category item: left border 3px Sovereign Cobalt, text Sovereign Cobalt, background Powder Blue-Grey (#f1f4f9), pl-3 indent — a clear but sharp active state

**Filter Group 2 — PRICING RANGE**
- Header: "PRICING" — Bebas Neue, 18px, Charcoal Ink
- Below header: Two price labels on a row — "$150" left-aligned, "$2,790" right-aligned — both in Lato 12px, Storm Slate
- A modern dual-handle range slider track:
  - Track: Powder Blue-Grey (#f1f4f9) base color, 4px height, sharp
  - Selected range fill (between the two handles): Sovereign Cobalt (#00289c)
  - Handles: 16px × 16px circles, Sovereign Cobalt fill, Pure White border 2px — the only pill/circle shape permitted on the page, as it's intrinsic to range sliders
- This replaces the orange slider from image9.png entirely — everything is cobalt

**Filter Group 3 — BRANDS**
- Header: "BRANDS" — Bebas Neue, 18px, Charcoal Ink
- A vertical list of brand checkboxes in Lato, 13px, Storm Slate:
  - ☐ Nike Air Max
  - ☐ Adidas Superstar
  - ☐ Jordan Retro
  - ☐ New Balance 574
  - ☐ Puma Suede
  - ☐ Converse All-Star
- Checkboxes: custom styled — sharp square (border-radius: 0), border-2 border-black/20 at rest; when checked: background Sovereign Cobalt (#00289c), white checkmark icon center; border becomes Sovereign Cobalt
- Each brand label sits 8px to the right of the checkbox; the entire row is hoverable with background Powder Blue-Grey (#f1f4f9)

**Sidebar Bottom — Apply Filters Button**
- Full-width, sharp-cornered button: Royal Blueprint (#1a3fc4) background, Pure White text, Lato bold uppercase tracking-[0.2em], py-4
- Hover: Electric Cobalt (#0051d5) background
- Text: "APPLY FILTERS"

---

**SECTION 3B — PRODUCT GRID**
- Background: Glacial Mist (#f7f9fe) container; each card itself is Pure Canvas White (#ffffff)
- Grid: 3 columns × N rows; gap-6 (24px) between all cards; this matches the 3-column layout from image9.png
- Minimum 9 cards visible on page load (3×3); can scroll to show more

**Product Card Architecture — Exact recreation of image8.png, fully rebranded:**

Each card is:
- Background: Pure Canvas White (#ffffff)
- Shape: ZERO border-radius — sharp corners, brand-critical
- Border at rest: border border-black/5 (barely visible)
- Border on hover: border-primary (Sovereign Cobalt #00289c, full card border, 1px)
- Padding: p-4 (16px all sides)
- Hover: card lifts 2px (translateY(-2px)), shadow: 0 8px 32px rgba(0,40,156,0.10), border turns cobalt — activated state

**Card Internal Layout (top to bottom):**

a) **Card Header Row** — flex justify-between items-start, no padding (sits at card edges):
- Top-left stack:
  - Brand attribution: "Shoes" — Lato, 10px, font-bold, uppercase, tracking-[0.2em], Silver Mist (#94a3b8)
  - Product name: "Air M32 Pro" — Lato, 14px, font-bold, Charcoal Ink (#181c20); on the second line: full name again "Air M32 Pro" (matching the image8.png double-name pattern) — OR use Brand on line 1, Model name on line 2
- Top-right:
  - Price: "$560" — Bebas Neue, 22px, Sovereign Cobalt (#00289c)
  - NOTE: No orange anywhere. Any sale badge that would have been orange from image9.png is converted to a Sovereign Cobalt (#00289c) small pill with white text "SALE" — Lato 9px uppercase, sits as absolute top-left corner of the IMAGE zone (not the card header)

b) **Color Swatch Row** — directly below the header row, left-aligned:
- 3–4 small circular swatch indicators (12px diameter circles), spaced 4px apart
- Swatch colors represent available colorways: use brand-coherent blues/whites/greys; DO NOT use orange or warm colors
- ALL swatches must use cobalt-family colors or neutrals:
  - Swatch 1: Sovereign Cobalt (#00289c)
  - Swatch 2: Pure Canvas White (#ffffff) with border-black/20 border (so it's visible)
  - Swatch 3: Powder Blue-Grey (#f1f4f9) with border-black/20 border
  - Swatch 4 (optional): Deep Cobalt Midnight (#0d1b4b)
- Active swatch: receives a 2px outer ring in Sovereign Cobalt (#00289c) at 2px offset (outline-style)

c) **Product Image Zone** — the dominant visual area:
- Background: Powder Blue-Grey (#f1f4f9) — `aspect-square`, fills the full card width
- The `.cobalt-grade` effect is REQUIRED: a `::after` pseudo-element with `background: rgba(26, 63, 196, 0.15)` and `mix-blend-mode: multiply` lays over the image
- Sneaker image is centered, object-contain with generous padding (p-6 inside the image zone)
- Image zooms to `scale-110` over `700ms` on the card's hover state
- "SALE" badge (if applicable): absolute top-left of the image zone, Royal Blueprint (#1a3fc4) background, white text "SALE", Lato 9px bold uppercase — replaces all orange "Sales!" badges from image9.png
- Sneaker photographs should feature diverse, premium footwear: Nike Air Max (white/cobalt), Adidas Samba (black/white), New Balance 2002R (grey), Jordan 1 (cobalt/white), Puma (clean white), Salomon trail runner — all are high-def/isolated on transparent/white bg

d) **Size Selector Row** — sits below the image zone, left-aligned:
- 3 size bubble chips: "42" | "43" | "44" — displayed exactly as in image8.png
- Each size chip: sharp-cornered square (border-radius: 0), ~32px × 32px, border-2 border-black/15, Lato 12px bold, Storm Slate (#444654) text
- Hover state: border turns Sovereign Cobalt (#00289c), text turns Sovereign Cobalt
- Selected/active state: background Sovereign Cobalt (#00289c), white text, border Sovereign Cobalt
- Chips are left-aligned with gap-2

e) **Card CTA Bottom Row** — flex justify-between items-center, sits flush at the card's bottom:
- Left: Wishlist heart icon — Material Symbols Outlined `favorite_border` (outline heart, 20px), Storm Slate (#444654); on hover: icon becomes `favorite` (filled), color Sovereign Cobalt (#00289c)
- Right: "Add to Bag" button with a shopping bag icon:
  - Button text: "Add to Bag" + Material Symbols Outlined `shopping_bag` icon to the right
  - Style: bg-black text-white, Lato bold, uppercase, text-xs, tracking-widest, px-4 py-2, zero border-radius
  - Hover: bg-primary (#1a3fc4) text-white — transitions to cobalt on hover, NOT staying black
  - This matches the image8.png CTA row exactly

---

**SECTION 4 — PAGINATION**
- Centered below the product grid, mt-12 mb-24
- Sharp-cornered pagination buttons — not rounded pills
- Style: A row of numbered page buttons and prev/next arrows
  - Inactive: border border-black/10, Lato 13px, Storm Slate, ~40px×40px square
  - Active page: background Sovereign Cobalt (#00289c), white text, border Sovereign Cobalt
  - Prev/Next: "← PREV" and "NEXT →" in Lato 12px bold uppercase tracking-widest, Storm Slate; hover: text turns Sovereign Cobalt
- Show pages: ← 1 2 [3] 4 5 →

---

**SECTION 5 — PERSISTENT FOOTER**
- Exact copy of the landing page footer — do not alter any element
- Absolute Black (#000000) background, full-width
- 4-column grid layout (max-w-1440px, px-12, py-24, gap-16):
  - Column 1: "SNEAKER INDEX" wordmark in Bebas Neue, 36px, white. Brand description in Lato, 13px, slate-400 uppercase tracking-tighter. Social icons (public, share, mail) Material Symbols, white, hover:text-primary (cobalt)
  - Column 2: "SHOP" header Bebas Neue 24px. Links: New Arrivals, Best Sellers, Exclusives, Sale — Lato xs, bold, uppercase, tracking-[0.2em], slate-400 → white on hover
  - Column 3: "SUPPORT" header. Links: Shipping & Returns, Order Tracker, Size Guide, Contact Us
  - Column 4: "LEGAL" header. Links: Privacy Policy (active: white + cobalt underline), Terms of Service, Cookies Policy
- Footer bottom bar: border-t border-white/5, px-12 py-10, center text "© 2025 Sneaker Index. All rights reserved. Urban Editorial Experience." in Lato text-[10px] text-slate-500 uppercase tracking-[0.3em]

---

**Global Technical Requirements:**
- Tailwind CSS (CDN with forms plugin) — same setup as landing page
- Tailwind config: MUST include the full color token map from DESIGN.md (primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, surface-container-low: #f1f4f9, surface: #f7f9fe, on-surface: #181c20, on-surface-variant: #444654, surface-container-lowest: #ffffff)
- Font imports: Bebas Neue + Lato (Google Fonts), Material Symbols Outlined (Google Fonts)
- Border radius override: All border-radius values set to 0px EXCEPT border-radius-full (9999px — for swatch circles and range slider handles only)
- The `.cobalt-grade` CSS class must be defined identically to the landing page: `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- The `.glass-nav` CSS class must be defined identically: `background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);`
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- `scroll-smooth` on the `<html>` element
- `bg-surface font-body text-on-surface` on `<body>`
- The nav is `position: fixed; top: 0; z-index: 50` — main content must have `pt-20` to clear the nav height
- Product images sourced from the Stitch AIDA public CDN (same pattern as landing page)
- No orange colors anywhere on the page — all warm accent colors from reference images are replaced with Sovereign Cobalt, Royal Blueprint, or Electric Cobalt equivalents
