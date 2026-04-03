# Sneaker Index — Product Detail Page (product.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, image11.png (PDP reference), catalog.html, index.html -->

A premium, editorial product detail page for "Sneaker Index" that treats a single sneaker as a museum artifact — worthy of close study, multiple angles, and confident purchasing decision. The page inherits every design decision from the landing page and catalog: Bebas Neue/Lato typographic duality, zero-radius sharp geometry, Sovereign Cobalt as the singular brand thread, the `.cobalt-grade` image tint unifying all photography. The structural template is the two-column PDP layout from image11.png, completely rebadged into the Sneaker Index cobalt-and-white aesthetic — all black UI elements converted to Sovereign Cobalt, all warm/gold accents neutralized into the blue family.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md, same as index.html and catalog.html):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- Background Body: Glacial Mist (#f7f9fe)
- Background Cards/Surfaces: Pure Canvas White (#ffffff)
- Surface Alternate (image zones, thumbnail bg): Powder Blue-Grey (#f1f4f9)
- Primary Accent — Sovereign Cobalt (#00289c): star ratings, price display, active size selector, active color swatch ring, "Favorite" button border, section heading accents, breadcrumb active state
- Primary Action — Royal Blueprint (#1a3fc4): "Add to Bag" primary CTA button background, hover state of secondary buttons, active thumbnail border
- Hover Accent — Electric Cobalt (#0051d5): all hover states on cobalt-background elements
- Deep Cobalt Midnight (#0d1b4b): used sparingly — "Save X%" badge background on price block
- Text Primary — Charcoal Ink (#181c20): product title, section headings, body description
- Text Secondary — Storm Slate (#444654): meta labels, spec table keys, policy text
- Text Meta — Silver Mist (#94a3b8): review count, "viewing right now" count, size guide link
- Footer / Absolute Black (#000000): footer background
- Typography Display: Bebas Neue — all H1/H2/H3, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — all labels, description body, spec table, button labels, nav
- Icons: Material Symbols Outlined — favorite_border (wishlist), shopping_bag (add to bag), visibility (viewing count), inventory_2 (stock), chevron_left/right (image nav), star (ratings)
- Button Shape: ZERO border-radius — absolutely no rounded corners on any button. Brand-critical constraint.
- Size Selector Chips: ZERO border-radius — sharp square chips
- Color Swatches: border-radius: 9999px (full pill/circle — ONLY exception per DESIGN.md, intrinsic to swatch UI)
- Thumbnail Strip: ZERO border-radius — sharp square thumbnails
- Card Shape: ZERO border-radius
- Cobalt Grade Effect (REQUIRED on ALL product imagery): `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- Image Hover: scale-105 over 500ms — slightly subtler than the landing page's 700ms, appropriate for a detail context
- Transitions: transition-all 150ms ease for color/border changes; transition-transform 500ms ease for image scale
- Navigation: Identical to landing page and catalog — glassmorphism (white/90, backdrop-blur-10px), bottom hairline border, max-w-1440px, "Shop" link active state

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of the landing page and catalog navigation — pixel-perfect consistency
- Fixed, full-width sticky header; Pure Canvas White (#ffffff) at 90% opacity; backdrop-filter blur(10px); 1px bottom border at black/5; max-w-1440px content column; z-index 50
- Left: "SNEAKER INDEX" wordmark — Bebas Neue, near-black (Charcoal Ink), with the leading "S" in Sovereign Cobalt (#00289c); links to index.html
- Center nav in Lato, bold, uppercase, tracking-widest: "Home" | "Shop" (active cobalt underline — this product came from the shop) | "Men" | "Women" | "Sale"
- Right icon cluster: search, shopping_cart (with badge), person — Material Symbols, Charcoal Ink, hover: Sovereign Cobalt

---

**SECTION 2 — BREADCRUMB BAR**
- Full-width, Pure Canvas White (#ffffff) background; py-3; max-w-1440px px-8
- Lato 12px, Storm Slate (#444654): "Home / Shop / The Vault / Nike Initiator Class 2.2"
- Each link in Silver Mist (#94a3b8), hovering turns Sovereign Cobalt; current page ("Nike Initiator Class 2.2") in Charcoal Ink (#181c20), not a link
- Separator: "/" at Silver Mist
- A thin hairline border-b border-black/5 separates this bar from the main content

---

**SECTION 3 — MAIN PDP BODY (Two-Column Layout)**
- Background: Glacial Mist (#f7f9fe)
- Full-width max-w-1440px, px-8, py-12
- Layout: Two columns side by side with `gap-16` (64px) between them
  - **Left Column: ~55% width** — Image Cluster
  - **Right Column: ~45% width** — Product Info Block

---

**SECTION 3A — IMAGE CLUSTER (Left Column)**
- Internal layout: Two sub-columns side by side — thumbnail strip on the far left, main image fills the rest

**Thumbnail Strip (far left, ~100px wide):**
- A vertical stack of 6 thumbnail images; each thumbnail: 90px × 90px square, ZERO border-radius, background: Powder Blue-Grey (#f1f4f9)
- Thumbnail images show: full side profile, rear 3/4 view, sole/outsole detail, toebox close-up, on-foot lifestyle shot, heel detail — all are technical sneaker photography
- Each thumbnail wrapped in `.cobalt-grade` class — receives the 15% blue tint
- At rest: border border-black/5 (subtle)
- Active/selected thumbnail: border-2 border-primary (Royal Blueprint #1a3fc4, 2px), elevated with: shadow: 0 4px 16px rgba(26,63,196,0.15)
- On hover: border transitions to Sovereign Cobalt (#00289c)
- Thumbnail images zoom to scale-105 on hover (500ms transition)
- gap-3 between thumbnails

**Main Product Image (fills remainder of left column):**
- Background: Pure Canvas White (#ffffff), sharp corners (ZERO border-radius)
- Aspect ratio: matches image11.png reference — approximately 4:3 or square, large and dominant
- The sneaker image is center-positioned, `object-contain`, with generous padding (p-8 inside the zone)
- **REQUIRED:** The main image container has the `.cobalt-grade` class — 15% Royal Blueprint blue tint applied via ::after pseudo-element, mix-blend-mode: multiply
- On hover: the sneaker image scales to 1.05 (scale-105), transition 500ms ease — a slow, confident reveal
- Border: border border-black/5 at rest
- Below the main image, centered within the image container's bottom edge, sits the image navigation row:
  - Left arrow: `<` (chevron_left Material Symbol) — 40px × 40px, sharp square button, bg: Pure Canvas White, border border-black/10, Charcoal Ink icon; hover: bg Powder Blue-Grey, icon turns Sovereign Cobalt
  - Right arrow: `>` (chevron_right) — same styling
  - Between arrows: small dot indicator row — 3–5 dots; active dot: Sovereign Cobalt (#00289c), 8px circle; inactive: Silver Mist (#94a3b8), 6px circle
  - Arrows spaced at the corners of the bottom edge, or centered with dot indicators between them

---

**SECTION 3B — PRODUCT INFO BLOCK (Right Column)**
Layout from top to bottom, all left-aligned, generous spacing between each block using mb-6 or mb-8:

**a) Product Identity Block:**
- Brand meta-label: "NIKE" — Lato, 10px, font-bold, uppercase, tracking-[0.2em], Silver Mist (#94a3b8)
- Product Title: "Nike Initiator Class 2.2" — Bebas Neue, 48px, Charcoal Ink (#181c20), letter-spacing 0.05em, line-height 1.0 — this is an H1 element
- Below title: Star rating row — 5 star icons (Material Symbols `star` at FILL: 1 for filled), Sovereign Cobalt (#00289c); show 4.5 stars (4 fully filled, 1 half-rendered or at lower opacity); next to stars: "(87 Customer Reviews)" in Lato 13px, Silver Mist (#94a3b8), this text links to the reviews section below

**b) Pricing Block:**
- Current Price: "$125.00" — Bebas Neue, 40px, Charcoal Ink (#181c20)
- Original Price: "$160.00" — Lato, 16px, Silver Mist (#94a3b8), line-through text-decoration
- "Save 23%" badge — positioned immediately to the right of original price: background Deep Cobalt Midnight (#0d1b4b) OR Royal Blueprint (#1a3fc4), white text, Lato 10px bold uppercase, px-2 py-1, zero border-radius (sharp rectangular badge) — this REPLACES the green "Save 23%" badge from image11.png with a brand-aligned cobalt badge
- All on one line: Current Price | Strikethrough Price | Cobalt "Save X%" badge

**c) Social Proof / Urgency Row:**
- Two inline indicators side by side, separated by a vertical divider `|` in Silver Mist:
  - Left indicator: `visibility` Material Symbol icon (20px, Sovereign Cobalt) + "28 viewing this right now" — Lato 12px, Storm Slate (#444654)
  - Right indicator: `inventory_2` Material Symbol icon (20px, Sovereign Cobalt) + "Only 3 items left in stock!" — Lato 12px, Storm Slate; the word "3" is colored Sovereign Cobalt and font-bold to create urgency
- This row matches the "28 viewing right now | Only 3 Item(s) left in stock" from image11.png, rebranded into cobalt

**d) Color Selection Block:**
- "Color" label: Lato, 12px, font-bold, uppercase, tracking-[0.15em], Charcoal Ink (#181c20)
- Subtitle: "Light Bone / Limestone / Olive Aura" — Lato 12px, Storm Slate (#444654) — updates dynamically to reflect the hovered swatch name
- Color swatches row — 3 circular swatches (20px diameter circles; border-radius: 9999px — the ONLY exception to the zero-radius rule):
  - Swatch 1 (active): Light Bone colorway — a very light cream/off-white circle (#ede8dc fill) with a 2px outer ring in Sovereign Cobalt (#00289c) at 2px offset (ring/outline style) to indicate selected state
  - Swatch 2: Clean midsole grey (#c4c5c7 fill), border border-black/15 — matches the grey colorway from image11.png
  - Swatch 3: Cobalt Blue colorway (#00289c fill) — replaces the black swatch from image11.png; this is the brand's own navy/cobalt colorway
  - Swatch 4 (optional): Deep Cobalt Midnight (#0d1b4b) — an ultra-dark navy option
- On hover over a swatch: the colorway name subtitle text updates; swatch scale-110 animation 150ms ease

**e) Size Selection Block:**
- "Select Size" label: Lato, 12px, font-bold, uppercase, tracking-[0.15em], Charcoal Ink (#181c20) — positioned left
- "Size guide" link: Lato, 12px, Storm Slate, underline — positioned flush right, same baseline — this matches image11.png layout
- Size conversion header row (subtle, above the grid): "US | UK | EU" displayed as helper text in Lato 10px Silver Mist uppercase
- **Size grid:** A 5-column × 3-row grid of size selector chips; each chip is a sharp square button (ZERO border-radius), precisely matching image11.png's size grid architecture but extended for sneaker e-commerce standards:

  Row 1: US 7 / UK 6 | US 7.5 / UK 6.5 | US 8 / UK 7 | US 8.5 / UK 7.5 | US 9 / UK 8
  Row 2: US 9.5 / UK 8.5 | US 10 / UK 9 | US 10.5 / UK 9.5 | US 11 / UK 10 | US 11.5 / UK 10.5
  Row 3: US 12 / UK 10.5 | US 12.5 / UK 11 | US 13 / UK 11.5 | US 14 / UK 12 | — (greyed out / out of stock)

- Each size chip: ~80px wide × 44px tall; ZERO border-radius; border border-black/15; background Pure Canvas White; Lato 11px, Storm Slate
  - Primary line: "US 9" — Lato 12px, font-bold, Charcoal Ink
  - Secondary line: "UK 8 / EU 42.5" — Lato 9px, Silver Mist (below the primary size, stacked within the chip)
- **Selected chip state:** background Sovereign Cobalt (#00289c), white text (all text in card turns white), border Sovereign Cobalt — matches the filled black chip in image11.png, converted to cobalt
- **Hover state:** border turns Sovereign Cobalt (#00289c), text turns Sovereign Cobalt, background remains white
- **Out-of-stock chip:** background Powder Blue-Grey (#f1f4f9), text Silver Mist, a subtle diagonal strikethrough line across the chip surface, not interactive (cursor: not-allowed)
- gap-2 between chips in both directions

**f) CTA Button Row:**
- Two buttons stacked vertically, full-width, gap-3:

  **Primary — "Add to Bag":**
  - Background: Sovereign Cobalt (#00289c) — IMPORTANT: image11.png shows black; this CRUCIAL CHANGE replaces black with Sovereign Cobalt
  - Text: "ADD TO BAG" — Lato, bold, uppercase, tracking-[0.2em], text-sm (14px), Pure White
  - Icon: shopping_bag Material Symbol, 20px, white, positioned to the right of the text
  - Hover: background transitions to Electric Cobalt (#0051d5)
  - Height: py-5 (20px top/bottom padding) — tall, substantial presence
  - Width: 100% of the right column
  - ZERO border-radius — sharp, squared-off

  **Secondary — "Favorite":**
  - Background: Pure Canvas White (#ffffff)
  - Border: border-2 border-sovereign-cobalt (Sovereign Cobalt #00289c, 2px line)
  - Text: "FAVORITE" — Lato, bold, uppercase, tracking-[0.2em], text-sm, Sovereign Cobalt (#00289c)
  - Icon: favorite_border Material Symbol (outline heart), 20px, Sovereign Cobalt, positioned to the right of the text
  - Hover: background Sovereign Cobalt, text turns white, icon turns from `favorite_border` to `favorite` (filled heart) in white
  - Same height as primary button (py-5)
  - ZERO border-radius — sharp, squared-off
  - This REPLACES the plain "Favorite ♡" ghost button from image11.png with a branded, active cobalt-bordered version

**g) Delivery / Policy Strip (below CTAs):**
- A 3-column icon+text strip, border-t border-black/5 pt-6 mt-6, separated from CTAs by a hairline
- Each column: Icon (Material Symbol 24px, Sovereign Cobalt) + short label text (Lato 11px, Storm Slate):
  - Column 1: `local_shipping` icon + "Free Shipping" + subtitle "On orders over $100" (Lato 9px, Silver Mist)
  - Column 2: `autorenew` icon + "Free Returns" + subtitle "Within 30 days, no questions"
  - Column 3: `verified_user` icon + "Authenticated" + subtitle "100% genuine product"
- Background: Powder Blue-Grey (#f1f4f9); px-4 py-4 per column; ZERO border-radius

---

**SECTION 4 — PRODUCT DETAILS (Full-width, Below the Two-Column Hero)**
- Background: Pure Canvas White (#ffffff); max-w-1440px, px-8, py-16
- A 3-column layout: "About the Product" (wider, ~50%) | "Product Features" (~25%) | "Technical Specs Table" (~25%)

**Column 1 — "About the Product":**
- Section label: "ABOUT THE PRODUCT" — Bebas Neue, 24px, Charcoal Ink, letter-spacing 0.05em
- A 2px wide, 32px tall vertical bar in Sovereign Cobalt positioned to the left of the heading (border-left-style treatment) — the same signature left-accent from the testimonial cards in DESIGN.md, repurposed here as a section marker
- Description body: Lato, 15px, Storm Slate (#444654), line-height: 1.7, max-width: 480px for readability
  - Text: "Go the distance in comfort with the Nike Initiator Class 2.2. Engineered for breathability and soft-cushioned landings, this running shoe is built for the modern urbanite who demands performance without compromising aesthetic integrity. The clean silhouette and tonal construction make it equally at home on the track and the street."
- Below description: A bullet-point feature list styled with Sovereign Cobalt tick marks (✓ or `check_circle` Material Symbol at 16px in Sovereign Cobalt), Lato 14px, Storm Slate:
  - ✓ Breathable mesh upper for maximum airflow
  - ✓ Nike React foam midsole for responsive cushioning
  - ✓ Reinforced rubber outsole for durable traction
  - ✓ Reflective detailing for low-light visibility
  - ✓ Pull tab at heel for easy entry

**Column 2 — "Product Features":**
- Section label: "FEATURES" — same Bebas Neue 24px + left cobalt bar treatment
- A vertical list of specification rows, each row: Key in Lato 11px bold uppercase tracking-[0.15em] Storm Slate | Value in Lato 14px Charcoal Ink; separated by a hairline border-b border-black/5:
  - Color: Light Bone / Limestone / Olive Aura / Khaki
  - Style Code: NY7576-021
  - Origin: Crafted in Vietnam
  - Upper: Breathable mesh + synthetic overlays
  - Midsole: Nike React foam technology
  - Outsole: Durable carbon rubber
  - Closure: Traditional lace-up
  - Drop Height: 10mm heel-to-toe

**Column 3 — "Size Conversion Chart":**
- Section label: "SIZE GUIDE" — same header treatment
- A compact table with 4 columns (US | UK | EU | CM) and 8–10 size rows
- Table header row: background Sovereign Cobalt (#00289c), text Pure White, Lato 10px bold uppercase tracking-[0.15em], text-center
- Table body rows alternating: Pure Canvas White (#ffffff) and Powder Blue-Grey (#f1f4f9) — no border between rows (tonal alternation)
- Data in Lato 12px, Storm Slate, text-center per cell; highlighted row (the currently selected size) gets a 2px left border in Sovereign Cobalt and slightly bolder text
- Size data (sample rows):
  | US | UK | EU | CM |
  |---|---|---|---|
  | 7 | 6 | 40 | 25.0 |
  | 7.5 | 6.5 | 40.5 | 25.5 |
  | 8 | 7 | 41 | 26.0 |
  | 8.5 | 7.5 | 42 | 26.5 |
  | **9** | **8** | **42.5** | **27.0** (highlighted — selected) |
  | 9.5 | 8.5 | 43 | 27.5 |
  | 10 | 9 | 44 | 28.0 |
  | 10.5 | 9.5 | 44.5 | 28.5 |
  | 11 | 10 | 45 | 29.0 |

---

**SECTION 5 — CUSTOMER REVIEWS (Preview)**
- Background: Powder Blue-Grey (#f1f4f9), py-16, max-w-1440px, px-8
- Section header: "VOICES OF THE CULTURE" — Bebas Neue 48px, Charcoal Ink — exact match to landing page section header naming convention
- Sub-header: "87 verified reviews · 4.5 average" — Lato 14px, Storm Slate
- Rating breakdown bar chart (5-star through 1-star): Each row is a star count label + thin progress bar (filled portion in Sovereign Cobalt, empty portion in Powder Blue-Grey #f1f4f9 with border border-black/5) + percentage label
- 3 testimonial cards below the rating chart — identical styling to landing page testimonials:
  - Sharp corners (ZERO border-radius)
  - Background Pure Canvas White (#ffffff)
  - 4px Sovereign Cobalt left border (border-l-4 border-primary)
  - p-8 inner padding
  - 5 filled cobalt star icons
  - Italic Lato 15px font-light quote text
  - Author avatar: 48px × 48px square (ZERO border-radius), followed by name (Lato bold) and role label (Lato 10px, Sovereign Cobalt uppercase)
- "View All Reviews →" ghost CTA button: border-2 border-primary (Sovereign Cobalt), text Sovereign Cobalt, Lato bold uppercase tracking-[0.2em], ZERO border-radius, centered below the 3 cards; hover: bg-primary text-white

---

**SECTION 6 — YOU MAY ALSO LIKE (Related Products)**
- Background: Pure Canvas White (#ffffff), py-16, max-w-1440px, px-8
- Section header: "YOU MAY ALSO LIKE" — Bebas Neue 48px, Charcoal Ink
- A horizontal row of 4 product cards — exact same card architecture as catalog.html:
  - ZERO border-radius, Pure Canvas White background, border border-black/5
  - Card header row: brand + name (top-left) + price in Sovereign Cobalt (top-right)
  - Color swatch row: 3 circles (cobalt family only)
  - Product image zone: Powder Blue-Grey (#f1f4f9) aspect-square, `.cobalt-grade` overlay REQUIRED
  - Size selector row: 3 sharp square chips (42 | 43 | 44)
  - CTA row: heart wishlist icon (left) + "Add to Bag" button bg-black hover:bg-primary (right)
  - Hover: card translateY(-2px), border turns Sovereign Cobalt, box-shadow: 0 8px 32px rgba(0,40,156,0.10)

---

**SECTION 7 — PERSISTENT FOOTER**
- Exact copy of landing page and catalog footer — no changes
- Absolute Black (#000000) background, full-width
- 4-column grid (max-w-1440px, px-12, py-24, gap-16):
  - Column 1: "SNEAKER INDEX" wordmark Bebas Neue 36px white + brand description Lato 13px slate-400 + social icons (public, share, mail) white hover:text-primary
  - Column 2: "SHOP" Bebas Neue 24px + New Arrivals, Best Sellers, Exclusives, Sale
  - Column 3: "SUPPORT" + Shipping & Returns, Order Tracker, Size Guide, Contact Us
  - Column 4: "LEGAL" + Privacy Policy (active: white + cobalt underline), Terms of Service, Cookies Policy
- **Delivery Policy Block** (within the footer, below the 4-column layout, above the copyright bar): a narrow full-width row on Pure Canvas White strip inside the footer... actually add as a separate dark strip: bg-[#111] px-12 py-8, 3-column horizontal icon+text row:
  - `local_shipping` — "FREE SHIPPING ON ORDERS OVER $100" | `autorenew` — "30-DAY FREE RETURNS" | `verified_user` — "100% AUTHENTIC GUARANTEE"
  - Icons: 24px Material Symbols at Sovereign Cobalt (#00289c); Labels: Bebas Neue 16px white; Border-r border-white/10 between columns
- Copyright bar: border-t border-white/5, px-12 py-10, "© 2025 Sneaker Index. All rights reserved. Urban Editorial Experience." Lato text-[10px] text-slate-500 uppercase tracking-[0.3em]

---

**Global Technical Requirements (consistent with index.html and catalog.html):**
- Tailwind CSS CDN (with forms plugin): `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font
- Full Tailwind config color token map (REQUIRED — identical to landing page):
  - primary: #00289c | primary-container: #1a3fc4 | secondary: #0051d5
  - surface-container-low: #f1f4f9 | surface: #f7f9fe | surface-container-lowest: #ffffff
  - on-surface: #181c20 | on-surface-variant: #444654 | outline: #747686
- fontFamily config: headline: ['Bebas Neue', sans-serif] | body: ['Lato', sans-serif] | label: ['Lato', sans-serif]
- borderRadius override: DEFAULT: 0px | lg: 0px | xl: 0px | full: 9999px
- CSS class `.cobalt-grade` (REQUIRED on ALL product images — thumbnails, main image, related product cards):
  `.cobalt-grade { position: relative; overflow: hidden; } .cobalt-grade::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- CSS class `.glass-nav`:
  `.glass-nav { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); }`
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- `class="scroll-smooth"` on `<html>` element
- `class="bg-surface font-body text-on-surface"` on `<body>` element
- Nav is `position: fixed; top: 0; z-index: 50` — all page body content must begin with `pt-20` to clear nav height
- NO orange, gold, warm yellow, or red anywhere on the page — all image11.png warm/gold accents (gold swoosh, warm rating stars, green "Save" badge) are fully neutralized into the cobalt family
- Product images sourced from the Stitch AIDA public CDN image pattern (same as landing page and catalog)
