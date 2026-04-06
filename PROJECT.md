# SNEAKER INDEX - PROJECT KNOWLEDGE BASE

**FOR AI AGENTS: Read this document to understand the codebase context, structural design, and critical aesthetic constraints before making changes.**

## 1. Project Overview
"Sneaker Index" is a premium, editorial-style sneaker archive and e-commerce application. It is currently mid-migration from a multi-page static prototype to a fully functional MongoDB + Express web application. The core philosophy is "editorial luxury" — stark, clinical, data-driven, and highly structured. 

## 2. Tech Stack & Architecture
- **Frontend Architecture:** Pure Vanilla. NO React, NO Vue, NO build tools for the frontend.
  - **HTML:** Multi-page architecture (files located in `html/`).
  - **CSS:** Tailwind CSS via CDN + `css/global.css` for custom brand utilities.
  - **JS:** Vanilla JavaScript interacting directly with the DOM and fetching from the REST API.
- **Backend Architecture:** Lightweight Node.js REST API.
  - **Server:** Express.js routing under `/api/v1`.
  - **Database:** MongoDB Atlas (accessed via Mongoose).
  - **Auth:** JWT issued in `httpOnly` cookies, `bcrypt` for password hashing.
  - **Location:** The entire Node.js server lives in the `backend/` directory.

## 3. The "Zero Radius" Design System (CRITICAL CONSTRAINTS)
The visual identity of this project is strictly defined in `DESIGN.md`. All additions to the frontend must adhere to these non-negotiable rules:
- **Geometry:** **ZERO BORDER RADIUS (0px).** No rounded buttons, no rounded panels, no pills, no soft shadows. Everything is perfectly sharp and rectangular. Use `DEFAULT: '0px'` overrides in Tailwind configurations.
- **Typography:** 
  - **Display:** `Bebas Neue` (all headings, page titles, dominant numbers, all-caps).
  - **Body/UI:** `Lato` (buttons, form labels, paragraphs, table data).
- **Core Colors:**
  - **Sovereign Cobalt:** `#00289c` (Primary active state, buttons, critical accents).
  - **Royal Blueprint:** `#1a3fc4` (Footer background, secondary container).
  - **Glacial Mist & White:** `#f7f9fe` / `#ffffff` (Main structural backgrounds).
- **The "Cobalt Grade":** All product thumbnails and avatars MUST have the `.cobalt-grade` CSS class wrapper applied to them to give them the distinct 15% Royal Blueprint brand tint.

## 4. Current State & Workflow
Right now, the project is migrating from static HTML to dynamic integration (Phase 1-2). 
- **Backend:** Models for `User`, `Category`, and `Product` exist. The Express server is runnable via `npm run dev` in the `backend/` folder.
- **Frontend Admin Console:** High-fidelity HTML blueprints for `admin-dashboard`, `admin-products`, `admin-orders`, `admin-product-form`, and `admin-categories` have been generated.
- **Frontend Consumer:** Core eCommerce pages (`index`, `catalog`, `product`, `checkout`, `cart`, `account`, `orders`) exist as static HTML files.

## 5. Development Rules for AI Agents
When generating new code, answering questions, or making edits, agents must observe the following:
1. **Never introduce framework syntax:** Do not add React, Vue, JSX, or SSR setups. Keep the HTML Vanilla.
2. **Never round corners:** Do not bring in Tailwind classes like `rounded`, `rounded-md`, `rounded-full` or iOS-style toggles.
3. **Respect the backend split:** Backend logic stays in `/backend`, frontend assets stay in the root `/html`, `/css`, `/js`.
4. **Use `DESIGN.md`:** Reference `DESIGN.md` explicitly if there is an aesthetic or topological ambiguity.
5. **Tailwind Config injection:** The Tailwind configuration is injected via a `<script>` tag in the `<head>` of each HTML file. Any new layout tokens or color variables must be placed there.

## 6. Testing & Running
To run the project locally (Backend serving static frontend files):
```bash
cd backend
npm install
npm run dev
# The server will run the API and serve the static HTML files typically on http://localhost:4000
```
