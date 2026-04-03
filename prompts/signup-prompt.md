# Sneaker Index — Sign Up / Registration Page (signup.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, image13.png (Login/Signup reference), index.html -->

A premium, editorial-grade registration page for "Sneaker Index." This page serves as the gateway to the vault. It abandons the typical soft, friendly SaaS signup aesthetics (seen in the reference image13.png) in favor of our stark, monumental lookbook style. It inherits every design decision from the Sneaker Index design system: the Bebas Neue/Lato typographic clash, the strict zero-radius sharp geometry, and the Sovereign Cobalt accent thread. The layout uses a classic 50/50 split-screen body — a massive immersive lifestyle image on the left, and a tightly structured, clinical form canvas on the right.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- General Body Background: Glacial Mist (#f7f9fe)
- Canvas/Panel Background: Pure Canvas White (#ffffff)
- Form Field Background: Pure Canvas White (#ffffff) with border-black/15
- Primary Accent — Sovereign Cobalt (#00289c): primary CTA background, active input borders, checkbox checked state, link hover states
- Primary Action — Royal Blueprint (#1a3fc4): unused on this specific page (CTAs are Sovereign Cobalt)
- Hover Accent — Electric Cobalt (#0051d5): primary CTA hover state
- Text Primary — Charcoal Ink (#181c20): main headlines, input text
- Text Secondary — Storm Slate (#444654): form labels, standard body copy
- Text Meta — Silver Mist (#94a3b8): placeholders, subtle demarcators
- Footer Background: Absolute Black (#000000)
- Typography Display: Bebas Neue — all H1/H2/H3, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — form labels, inputs, button labels, nav, links
- Button Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Input Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Card/Panel Shape: ZERO border-radius.
- Cobalt Grade Effect (REQUIRED on left panel image): `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- Transitions: transition-colors 150ms ease
- Navigation: Identical to landing page — glassmorphism (white/90, backdrop-blur-10px), bottom hairline border, max-w-1440px

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of the landing page and catalog navigation
- Fixed, full-width sticky header; Pure Canvas White (#ffffff) at 90% opacity; backdrop-filter blur(10px); 1px bottom border at black/5 opacity; max-w-1440px content column; z-index 50
- Left: "SNEAKER INDEX" wordmark in Bebas Neue, Charcoal Ink, leading "S" in Sovereign Cobalt (#00289c); links to index.html
- Center nav links in Lato, bold, uppercase, tracking-widest: "Home" | "Shop" | "Men" | "Women" | "Sale"
- Right icon cluster: search, shopping_cart, person (active state: Sovereign Cobalt color, indicating we are in the account section) — Material Symbols Outlined, hover: Sovereign Cobalt

---

**SECTION 2 — MAIN SPLIT-SCREEN BODY**
- Background: Glacial Mist (#f7f9fe) on the viewport, but the main container is a central box.
- Wrapping Container: max-w-[1200px], mx-auto, mt-32 mb-24 (to clear the fixed nav with generous breathing room).
- Container Background: Pure Canvas White (#ffffff)
- Shape: ZERO border-radius. Border: border border-black/5, shadow-2xl shadow-black/5
- Layout: 50% / 50% split using grid (`grid-cols-2`). Left side is the Image Panel, Right side is the Form Panel. On mobile (`< md`), it stacks (image hidden or on top, form below).

**SECTION 2A — LEFT PANEL (Editorial Image)**
- Fills its 50% container completely (h-full). Min-height: 700px.
- Background Image: A striking, full-height editorial lifestyle photograph of a person wearing premium sneakers in a gritty urban environment (referencing the vibe of image13.png but tailored to high-end streetwear). Image `object-cover`, positioned center.
- **REQUIRED:** The `.cobalt-grade` effect must be applied over this image. A pseudo-element overlay with `background: rgba(26, 63, 196, 0.15)` and `mix-blend-mode: multiply`. This aligns the photo strictly to the brand identity.
- Typography Overlay (Bottom Left):
  - Positioned absolute, bottom-0, left-0, p-12.
  - Heading: "THE ARCHIVE AWAITS." — Bebas Neue, 48px, Pure White, tracking-[0.05em].
  - Subheading: "Curate your collection, track drops, and secure the culture." — Lato, 16px, Pure White/80.

**SECTION 2B — RIGHT PANEL (Registration Form Canvas)**
- Background: Pure Canvas White (#ffffff).
- Padding: p-16 (generous 64px padding all around to create a clinical, minimal focal area).
- Flex-col layout, justify-center, h-full.

**Form Header Stack:**
- **Main Headline:** "JOIN THE INDEX" — Bebas Neue, 48px, Charcoal Ink (#181c20), letter-spacing 0.05em, text-center. (Replaces the generic "Welcome to..." from the reference).
- Subtitle: "Create your account to unlock exclusive drops." — Lato, 14px, Storm Slate (#444654), mt-2, text-center.

**Form Inputs Block (mt-12):**
- **CRUCIAL OVERRIDE:** Disregard all rounded input fields from image_13.png. All inputs must be perfectly square (`border-radius: 0`).
- Total 4 stacked fields:
  1. Full Name
  2. Email Address
  3. Password
  4. Confirm Password
- **Field Styling (applies to all):**
  - Wrapper: `mb-6`
  - Label: Lato, 11px, font-bold, uppercase, tracking-[0.15em], Charcoal Ink (#181c20), mb-2 block.
  - Input Box: `w-full`, `h-12` (48px tall), ZERO border-radius.
  - Input Border: `border border-black/15` at rest. Focus state: `focus:border-primary` (Sovereign Cobalt #00289c), `focus:ring-1 focus:ring-primary`, `outline-none`.
  - Placeholder text: Lato, 14px, Silver Mist (#94a3b8).
  - Icons: Password fields should include a Material Symbols `visibility_off` icon on the far right (text-slate-400, hover: text-primary).

**Terms & Conditions Row (mt-4 mb-8):**
- Flex row, items-center.
- Checkbox: Custom sharp square (`border-radius: 0`), 16px × 16px, border border-black/30.
- Checked State: Background Sovereign Cobalt (#00289c), border Sovereign Cobalt, white checkmark.
- Label: "I agree to the Terms of Service and Privacy Policy." — Lato, 13px, Storm Slate.
- Links: "Terms of Service" and "Privacy Policy" should be clickable (Charcoal Ink, underline-offset-4 hover:text-primary).

**Primary CTA Button:**
- "CREATE ACCOUNT" — Replaces generic button.
- Styling exactly as per DESIGN.md: Background Sovereign Cobalt (#00289c), text Pure White.
- Typography: Lato, 14px, font-bold, uppercase, tracking-[0.2em].
- Dimensions: `w-full`, `h-14` (56px tall).
- Shape: ZERO border-radius.
- Hover: Background transitions to Electric Cobalt (#0051d5).

**Social Auth Block (mt-8):**
- Layout: "Or sign up with" horizontal divider. A thin line `border-t border-black/5` with text centered in a white background gap. Text: Lato 12px, Silver Mist.
- Button Row: Grid cols-2, gap-4, mt-6.
- **Social Buttons Styling (Secondary Ghost Button from DESIGN.md):**
  - Google / Apple buttons.
  - Background: Transparent (`bg-transparent`).
  - Shape: ZERO border-radius.
  - Border: `border border-black/20`.
  - Text: Lato, 13px, font-bold, Charcoal Ink.
  - Hover: Background changes to Powder Blue-Grey (#f1f4f9), border changes to Charcoal Ink.
  - Icons: Monochrome black/dark-slate icons (or SVG paths) for Google/Apple, maintaining strict editorial neutrality.

**Footer Link (mt-12):**
- Text-center.
- "Already have an account? Sign In"
- Typography: Lato, 14px, Storm Slate.
- "Sign In" is a link: font-bold, Charcoal Ink, Sovereign Cobalt (#00289c) underline on hover, pointing to `login.html`.

---

**SECTION 3 — PERSISTENT FOOTER**
- Exact copy of the landing page and catalog footer — pixel-perfect consistency.
- Absolute Black (#000000) background, full-width.
- 4-column grid (max-w-1440px, px-12, py-24, gap-16).
- Column 1: "SNEAKER INDEX" wordmark Bebas Neue 36px white + brand description Lato 13px slate-400 + social icons.
- Column 2: "SHOP" header + links.
- Column 3: "SUPPORT" header + links.
- Column 4: "LEGAL" header + links.
- Copyright bar: border-t border-white/5, px-12 py-10, "© 2025 Sneaker Index. All rights reserved." Lato text-[10px] text-slate-500 uppercase tracking-[0.3em].

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms plugin)
- Google Fonts: Bebas Neue + Lato
- Material Symbols Outlined icon font
- Full Tailwind config color token map MUST be defined: (primary: #00289c, etc.)
- CSS class `.cobalt-grade` MUST be defined and applied to the left panel image.
- CSS class `.glass-nav` MUST be defined for the navbar.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- No form inputs, buttons, or panels may possess a border-radius greater than 0px.
