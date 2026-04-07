# AGENTS Guide

## Scope
- Use this file as the quick operational guide for working in this repo.
- For product/design intent, read [DESIGN.md](/C:/Users/Jude%20Sangalang/OneDrive/Documents/JUDO%20FILES/Projects/shoes-index/DESIGN.md).
- For higher-level setup/context, see [README.md](/C:/Users/Jude%20Sangalang/OneDrive/Documents/JUDO%20FILES/Projects/shoes-index/README.md) and [backend/README.md](/C:/Users/Jude%20Sangalang/OneDrive/Documents/JUDO%20FILES/Projects/shoes-index/backend/README.md).

## Repo Layout
- `backend/`: Express API, MongoDB models, controllers, routes, seed scripts.
- `backend/src/config/`: env parsing, DB connection, constants.
- `backend/src/models/`: Mongoose models (`User`, `Product`, `Order`, `Cart`, `Category`, `Activity`).
- `backend/src/controllers/`: API and admin controller logic.
- `backend/src/routes/`: versioned API route modules.
- `backend/scripts/`: seed entrypoints and seed data.
- `html/`: static page entrypoints for storefront, auth, account, orders, cart, checkout, admin.
- `js/`: page-specific vanilla JS modules and shared session/API helpers.
- `css/`: shared styling and global tokens.
- `images/`: static image assets and branding.
- `.agents/`: local agent skills; do not modify unless explicitly working on agent tooling.

## How To Run
1. Install backend deps:
   - `cd backend`
   - `npm install`
2. Ensure `backend/.env` exists and includes at least:
   - `MONGODB_URI`
   - `COOKIE_SECRET`
   - `JWT_SECRET`
   - `CLIENT_BASE_URL` (defaults to `http://localhost:5500`)
3. Start the API:
   - `cd backend`
   - `npm run dev`
4. Serve the frontend as static files from repo root or `html/`.
   - Preferred during local development: VS Code Live Server on `http://127.0.0.1:5500`
5. Open:
   - `http://127.0.0.1:5500/html/index.html`

## Build, Test, Lint
- There is no formal build step for the frontend.
- Available backend scripts:
  - `cd backend && npm run dev`
  - `cd backend && npm start`
  - `cd backend && npm run seed`
- There are currently no repo-owned lint or automated test scripts configured.
- Do not claim lint/tests passed unless you actually added and ran them.

## Engineering Conventions
- Preserve the existing stack: HTML + Tailwind/CDN + custom CSS + vanilla JS on the frontend; Node/Express + MongoDB on the backend.
- Keep UI aligned with `DESIGN.md`; do not introduce off-brand colors, typography, spacing, or generic component styling.
- Prefer page-specific JS in `js/` and keep shared API/session logic centralized.
- Keep backend changes layered: `routes -> controllers -> models/utils`.
- Reuse existing response/error helpers and middleware patterns before inventing new ones.
- Prefer small, surgical patches over large rewrites.
- If a new UI surface is required and the design is missing, stop and flag it clearly for the user to generate in Stitch.

## PR / Change Expectations
- Change only what is necessary for the task.
- Call out any required manual steps, env changes, or migration/seed actions.
- Note risks, follow-ups, and anything not verified.
- If you touch UI, mention affected pages and user flows.

## Constraints And Do-Not Rules
- Do not break or restyle established branded pages without checking `DESIGN.md`.
- Do not replace vanilla JS with a framework.
- Do not commit secrets or copy real credentials into code, docs, or seed data.
- Do not remove user-authored changes you did not make.
- Do not invent commands or scripts that do not exist in `backend/package.json`.
- Do not assume frontend is bundled; browser code must run directly from static HTML.
- Do not hardcode API hosts beyond the existing local pattern unless the task is deployment-specific.

## Done Means
- Code matches the requested scope and existing architecture.
- API boots without startup errors:
  - `http://localhost:4000/api/v1/health`
- Affected frontend page loads from Live Server without console-breaking JS errors.
- Changed user flow works end-to-end manually.
- If data shape changed, seed/admin/manual flows still behave correctly.
- Any unverified area is stated explicitly.

## Verification Checklist
- Start backend:
  - `cd backend && npm run dev`
- Check health:
  - Open `http://localhost:4000/api/v1/health`
- If data is needed:
  - `cd backend && npm run seed`
- Load relevant page under Live Server:
  - `http://127.0.0.1:5500/html/index.html`
- Re-test the exact flow you changed:
  - storefront browsing
  - auth/session state
  - cart/checkout
  - account/orders
  - admin dashboard/products/categories/orders
