# Sneaker Index — Sign In / Login Page (login.html)
<!-- Enhanced by the enhance-prompt skill | References: DESIGN.md, signup.html (sibling page), image_a5936d.png -->

A premium, editorial-grade login page for "Sneaker Index." This is the direct sibling to the Sign Up page — the returning user's gateway back into the vault. Where the signup page says "JOIN THE ARCHIVE," this page says "WELCOME BACK." It shares the identical split-screen DNA, the same stark editorial proportions, and every brand token from the design system, but with a dramatically simplified right panel: just two fields (email, password), a forgot-password link, and the primary CTA. The result is a page that feels even more minimal and confident than its sibling — a focused, no-nonsense re-entry point for the returning collector. The layout uses the same 50/50 split-screen body as signup.html — a massive immersive lifestyle image on the left, and a tightly structured, clinical form canvas on the right.

---

**DESIGN SYSTEM (REQUIRED — pulled directly from DESIGN.md):**
- Platform: Web, Desktop-first (max-width 1440px, responsive to mobile)
- Theme: Light, editorial luxury — stark, monumental, curatorial
- General Body Background: Glacial Mist (#f7f9fe)
- Canvas/Panel Background: Pure Canvas White (#ffffff)
- Form Field Background: Powder Blue-Grey (#f1f4f9) — `surface-container-low`
- Primary Accent — Sovereign Cobalt (#00289c): primary CTA background, active input borders, link hover states
- Primary Container — Royal Blueprint (#1a3fc4): footer background, logo accent "S" color
- Hover Accent — Electric Cobalt (#0051d5): primary CTA hover state (`hover:bg-secondary`)
- Text Primary — Charcoal Ink (#181c20): main headlines, input text
- Text Secondary — Storm Slate (#444654): form labels, sub-copy, `on-surface-variant`
- Text Meta — Silver Mist (#94a3b8): placeholders, subtle demarcators
- Error Color — Error (#ba1a1a): inline validation error text, `error` token
- Footer Background: Royal Blueprint (#1a3fc4) — matches all other Sneaker Index pages
- Typography Display: Bebas Neue — all H1/H2/H3, all-caps, condensed, letter-spacing 0.05em
- Typography Body/UI: Lato — form labels, inputs, button labels, nav, links
- Button Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Input Shape: ZERO border-radius — absolutely sharp corners. Brand constraint.
- Card/Panel Shape: ZERO border-radius.
- Cobalt Grade Effect (REQUIRED on left panel image): `::after { content: ''; position: absolute; inset: 0; background: rgba(26,63,196,0.15); pointer-events: none; mix-blend-mode: multiply; }`
- Transitions: transition-colors 150ms ease; buttons use `transition-all` with `active:scale-[0.98]`
- Navigation: Identical to landing page — glassmorphism (white/90, backdrop-blur-10px), bottom hairline border, max-w-1440px

---

**Page Structure:**

**SECTION 1 — PERSISTENT NAVIGATION BAR**
- Exact copy of the signup page navigation — pixel-perfect consistency required.
- Fixed, full-width sticky header; Pure Canvas White (#ffffff) at 90% opacity; backdrop-filter blur(10px); 1px bottom border at black/5 opacity; max-w-[1440px] content column; z-index 50; height h-20 (80px).
- Left: "SNEAKER INDEX" wordmark in Bebas Neue, font-headline, text-3xl, tracking-tight. Leading "S" in Royal Blueprint (#1a3fc4 via inline style `color: #1a3fc4`), remaining "NEAKER INDEX" in Charcoal Ink (#181c20). The entire wordmark is an `<a>` link to `index.html`.
- Center nav links row (hidden on mobile, `hidden md:flex`, gap-8): "Home" → `index.html` | "Shop" → `catalog.html` | "Men" → `catalog.html` | "Women" → `catalog.html`. All links styled: Lato (`font-body`), `text-xs`, `font-body`, `uppercase`, `tracking-widest`, `text-on-surface-variant`, `hover:text-primary`, `transition-colors`.
- Right icon cluster (flex, items-center, gap-6): `shopping_bag` icon → `catalog.html` | `person` icon → `login.html` (active state: `text-primary` Sovereign Cobalt, indicating we are on the account/auth page). All icons are Material Symbols Outlined, `text-on-surface`, `hover:text-primary`, `transition-colors`.

---

**SECTION 2 — MAIN SPLIT-SCREEN BODY**
- Outer wrapper: `<main>` with `min-h-screen pt-32 pb-20 flex items-center justify-center px-4 md:px-8` (clears the fixed nav with generous breathing room).
- Wrapping Container: `max-w-[1200px] w-full`, background Pure Canvas White (#ffffff) via `bg-surface-container-lowest`.
- Layout: `grid grid-cols-1 md:grid-cols-2`, `shadow-2xl`, `overflow-hidden`.
- Shape: ZERO border-radius. No rounded corners anywhere.

**SECTION 2A — LEFT PANEL (Editorial Image)**
- Structure: `<div class="relative cobalt-grade min-h-[400px] md:min-h-[700px] flex items-end p-12">`.
- Background Image: A compelling, full-height editorial lifestyle photograph of a person in a premium urban setting — different from the signup page image but the same editorial mood. Suggestions: a confident figure leaning against a concrete wall wearing pristine white sneakers, or a low-angle shot of someone walking on rain-wet city pavement at dusk. The image should complement the signup image, NOT duplicate it. Image rendered as `<img>` with `class="absolute inset-0 w-full h-full object-cover"`.
- **REQUIRED:** The `.cobalt-grade` CSS class must be applied to the container `<div>`, creating the brand-signature 15% Royal Blueprint blue tint overlay via `::after` pseudo-element with `mix-blend-mode: multiply`.
- Typography Overlay (Bottom Left, positioned over the image):
  - Container: `<div class="relative z-10">`, positioned at the bottom left of the panel.
  - Heading: "YOUR VAULT. YOUR LEGACY." — Bebas Neue (`font-bebas`), `text-6xl md:text-8xl`, Pure White (`text-white`), `leading-none`, `tracking-tight`. Use a `<br/>` to break across two lines for dramatic effect.

**SECTION 2B — RIGHT PANEL (Login Form Canvas)**
- Background: Pure Canvas White (#ffffff).
- Padding: `p-8 md:p-16` (generous interior breathing room — 32px mobile, 64px desktop).
- Layout: `flex flex-col justify-center`.

**Form Header Stack:**
- Margin bottom: `mb-10`.
- **Main Headline:** "WELCOME BACK" — Bebas Neue (`font-bebas`), `text-[48px]`, `leading-none`, Charcoal Ink (`text-on-surface`). This is the brand's confident re-entry statement.
- Subtitle: "Sign in to access your curated collection." — Lato (`font-lato`), `text-sm`, Storm Slate (`text-on-surface-variant`), `tracking-wide`.

**Error Message Zone:**
- Positioned between the header stack and the form, `mt-4 mb-2`.
- A `<div>` reserved for inline error feedback (e.g., "Invalid email or password.").
- Default state: hidden or empty.
- Active state: Error color (#ba1a1a, `text-error`), Lato `text-xs`, `font-bold`, `uppercase`, `tracking-widest`.

**Form Inputs Block:**
- `<form class="space-y-6">`.
- Total 2 stacked fields only:
  1. **Email Address**
  2. **Password**

- **Field Styling (applies to both — MUST match signup.html exactly):**
  - Container: `<div class="space-y-1">`.
  - Label: `<label>`, Lato (`font-lato`), `text-[10px]`, `uppercase`, `font-black`, `tracking-widest`, Storm Slate (`text-on-surface-variant`).
  - Input Box: `<input>` with `class="w-full border-0 border-b-2 border-surface-container-highest bg-surface-container-low px-4 py-3 focus:ring-0 focus:border-primary transition-colors font-lato text-sm"`.
  - Shape: ZERO border-radius (enforced globally by Tailwind config override `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`).
  - Email placeholder: "CURATOR@SNEAKERINDEX.COM" (uppercase, matching signup convention).
  - Password placeholder: "••••••••".

**Forgot Password Link (positioned below password field):**
- Container: `<div class="flex justify-end mt-2">`.
- Link: "Forgot Password?" — `<a>`, Lato (`font-lato`), `text-xs`, Storm Slate (`text-on-surface-variant`), `hover:text-primary` (Sovereign Cobalt on hover), `transition-colors`, `underline underline-offset-4`.
- Points to `#` (placeholder).

**Primary CTA Button:**
- Container: `<div class="pt-4">`.
- "SIGN IN" — Replaces registration button, identical styling treatment.
- `<button type="submit">` with `class="w-full bg-primary py-5 text-white font-lato font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all active:scale-[0.98]"`.
- Background: Sovereign Cobalt (#00289c) via `bg-primary`.
- Text: Pure White, Lato, font-bold, uppercase, tracking-[0.2em], text-xs.
- Hover: Electric Cobalt (#0051d5) via `hover:bg-secondary`.
- Shape: ZERO border-radius (global override).

**Social Auth Block (mt-12):**
- Exact same structure and styling as the signup page social auth section.
- Horizontal divider: `<div class="relative flex items-center mb-8">` with two `flex-grow border-t border-surface-container-highest` lines flanking centered text.
- Centered text: "Or sign in with" (note: "sign **in**" not "sign up") — Lato (`font-lato`), `text-[10px]`, `uppercase`, `tracking-widest`, Storm Slate (`text-on-surface-variant`).
- Button Row: `grid grid-cols-2 gap-4`.
- **Google Button:** `<button>` with `class="flex items-center justify-center gap-3 border-2 border-surface-container-highest py-3 hover:bg-surface-container-low transition-colors group"`. Contains the Google "G" SVG icon (4-color official) + "Google" label in Lato `text-[10px] uppercase font-black tracking-widest`.
- **Apple Button:** Same button styling. Contains Apple SVG icon + "Apple" label.
- Shape: ZERO border-radius on both buttons.

**Footer Link (mt-12):**
- Container: `<div class="mt-12 text-center">`.
- `<p>` in Lato (`font-lato`), `text-xs`, Storm Slate (`text-on-surface-variant`).
- Text: "Don't have an account? "
- "Sign Up" is a link (`<a>`): `text-primary`, `font-black`, `underline`, `underline-offset-4`, `hover:text-secondary`, pointing to `signup.html`.

---

**SECTION 3 — PERSISTENT FOOTER**
- Exact copy of the signup page and landing page footer — pixel-perfect consistency required.
- Royal Blueprint (#1a3fc4) background (matches all pages: `bg-[#1a3fc4]` or inline style `background-color: #1a3fc4`), full-width.
- Container: `py-20 px-16`, `grid grid-cols-1 md:grid-cols-4 gap-12`, `max-w-[1400px] mx-auto`.
- Column 1: "SNEAKER INDEX" wordmark Bebas Neue (`font-bebas`) `text-2xl tracking-tighter text-white` + brand description Lato `text-[10px] uppercase tracking-[0.2em] leading-relaxed text-white`.
- Column 2: "Navigations" header (`font-lato text-[11px] font-black uppercase tracking-[0.3em] mb-4 text-white`) + links (The Manifesto, Authentication, Contact) — `font-lato text-[10px] uppercase tracking-[0.1em] text-white/90 hover:text-white transition-opacity`.
- Column 3: "Support" header + links (Shipping, Terms, Privacy) — same styling.
- Column 4: "Connect" header + social icons (`material-symbols-outlined text-white hover:text-white cursor-pointer`) + copyright: `font-lato text-[9px] uppercase tracking-[0.2em] italic text-white/60`.

---

**Global Technical Requirements:**
- Tailwind CSS CDN (with forms and container-queries plugins): `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts: Bebas Neue + Lato (weights 300, 400, 700, 900)
- Material Symbols Outlined icon font (weight range 100–700, FILL 0–1)
- Full Tailwind config color token map MUST be defined in `<script id="tailwind-config">` (matching signup.html exactly): primary: #00289c, primary-container: #1a3fc4, secondary: #0051d5, on-surface: #181c20, on-surface-variant: #444654, surface: #f7f9fe, surface-container-low: #f1f4f9, surface-container-lowest: #ffffff, surface-container-highest: #dfe3e8, error: #ba1a1a, etc.
- Font families in Tailwind config: `headline: ["Bebas Neue"], body: ["Lato"], label: ["Lato"], bebas: ["Bebas Neue"], lato: ["Lato"]`
- Border radius override in Tailwind config: `borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "0px"}`
- CSS class `.cobalt-grade` MUST be defined and applied to the left panel image container.
- CSS class `.glass-nav` MUST be defined for the navbar glassmorphism effect.
- Global heading rule: `h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }`
- No form inputs, buttons, or panels may possess a border-radius greater than 0px.
- HTML `lang="en"`, `<html class="light">`.
