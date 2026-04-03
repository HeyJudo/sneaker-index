# Sneaker Index Phase 0

## Objective

Define the migration architecture for turning the current static Sneaker Index frontend into a functional CRUD e-commerce application while preserving the existing visual system from `DESIGN.md`.

Phase 0 does not implement backend logic or frontend behavior changes. It locks the structure, data boundaries, and rollout order so later phases do not break the brand system or require rework.

## Non-Negotiables

- Frontend remains plain HTML, Tailwind CSS via CDN, shared custom CSS, and Vanilla JavaScript.
- Visual identity from `DESIGN.md` and `css/global.css` must remain intact.
- Existing page styling is preserved unless a new screen is explicitly designed to match the same system.
- Backend is a lightweight Node.js + Express API.
- Database is MongoDB Atlas.
- Passwords are hashed with `bcrypt`.
- Protected API routes require authentication and role checks where appropriate.
- API routes are versioned under `/api/v1`.

## Current Frontend Baseline

### Existing Pages

- `html/index.html`
  - Marketing landing page
  - Contains hero, categories, featured products, editorial banners, testimonials, and footer
- `html/catalog.html`
  - Catalog/archive listing page
  - Contains desktop filter sidebar, product grid, sorting, and pagination shell
- `html/product.html`
  - Product detail page
  - Contains gallery, size selection, pricing, specs, testimonials, and related products
- `html/signup.html`
  - Registration page
  - Contains sign-up form only

### Shared Visual Layer

- `DESIGN.md`
  - Source of truth for palette, typography, layout rhythm, hover behavior, and component style
- `css/global.css`
  - Shared implementation layer for:
    - `.cobalt-grade`
    - `.glass-nav`
    - `.ambient-shadow`
    - global heading typography
    - scrollbar utilities
    - smooth scroll

### Frontend Preservation Rules

- Keep cobalt palette and token naming consistent with current Tailwind config objects.
- Keep all buttons, cards, tiles, and images sharp-cornered.
- Keep Bebas Neue for semantic headings and Lato for utility/body text.
- Keep the slow, editorial motion language already used in image hover states.
- Keep `.cobalt-grade` image treatment on product imagery.
- Do not replace the frontend with React, Vue, SSR templates, or component frameworks.

## Target Architecture

The project should be split into a static frontend layer and an API backend layer.

### Recommended Structure

```text
shoes-index/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
      app.js
      server.js
    scripts/
      seed.js
    package.json
    .env
    .env.example
  frontend/
    html/
      index.html
      catalog.html
      product.html
      signup.html
      login.html              <- new
      cart.html               <- new
      checkout.html           <- new
      account.html            <- new
      orders.html             <- new
      admin-dashboard.html    <- new
      admin-products.html     <- new
      admin-orders.html       <- new
    css/
      global.css
    js/
      api.js
      auth.js
      catalog.js
      product.js
      cart.js
      signup.js
      login.js
      account.js
      admin-products.js
      admin-orders.js
  DESIGN.md
  PHASE0.md
```

### Deployment Shape

Recommended initial deployment model:

- Express serves API routes under `/api/v1`
- Express also serves the static frontend files
- MongoDB Atlas holds application data

This keeps the stack simple and avoids frontend/backend CORS complexity during the first production version. If frontend and backend are later hosted separately, the API contract remains usable.

## Environment Variables

The backend should rely on environment variables for all sensitive configuration.

Required variables:

- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `COOKIE_SECRET`
- `CLIENT_BASE_URL`
- `BCRYPT_SALT_ROUNDS`

Optional later:

- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX`
- payment provider keys if checkout becomes paid

## Authentication Strategy

Recommended approach:

- User registers with email and password
- Password is hashed with `bcrypt`
- Backend issues JWT in an `httpOnly` cookie
- Frontend uses `fetch(..., { credentials: "include" })`
- Protected routes validate token and attach `req.user`
- Admin routes require role-based authorization

### Roles

- `customer`
- `admin`

### Auth Endpoints

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

## Core Collections

### 1. users

Purpose:

- authentication
- profile data
- role ownership

Suggested fields:

- `_id`
- `firstName`
- `lastName`
- `email` unique
- `passwordHash`
- `role` enum: `customer | admin`
- `phone` optional
- `createdAt`
- `updatedAt`

### 2. categories

Purpose:

- organize product browsing
- drive homepage categories and catalog filters

Suggested fields:

- `_id`
- `name`
- `slug` unique
- `description` optional
- `image`
- `isFeatured`
- `createdAt`
- `updatedAt`

### 3. products

Purpose:

- catalog and product page source of truth

Suggested fields:

- `_id`
- `name`
- `slug` unique
- `brand`
- `description`
- `price`
- `compareAtPrice` optional
- `categoryId`
- `tags` array
- `sizes` array of objects
- `colors` array of objects
- `images` array
- `heroImage`
- `rating` optional
- `reviewCount` optional
- `stockStatus`
- `isFeatured`
- `isArchived`
- `seoTitle` optional
- `seoDescription` optional
- `createdAt`
- `updatedAt`

Suggested size object:

- `label`
- `stock`
- `sku`

Suggested color object:

- `name`
- `hex`
- `image`

### 4. carts

Purpose:

- persist logged-in cart server-side

Suggested fields:

- `_id`
- `userId`
- `items` array
- `subtotal`
- `createdAt`
- `updatedAt`

Suggested cart item object:

- `productId`
- `nameSnapshot`
- `priceSnapshot`
- `imageSnapshot`
- `size`
- `color`
- `quantity`

### 5. orders

Purpose:

- checkout and order history

Suggested fields:

- `_id`
- `userId`
- `orderNumber`
- `items` array
- `subtotal`
- `shippingAmount`
- `taxAmount`
- `total`
- `status`
- `shippingAddress`
- `billingAddress`
- `paymentStatus`
- `createdAt`
- `updatedAt`

Suggested statuses:

- `pending`
- `paid`
- `fulfilled`
- `cancelled`

### 6. reviews

Purpose:

- optional later phase
- can support PDP testimonials based on actual product reviews

Suggested fields:

- `_id`
- `userId`
- `productId`
- `rating`
- `title`
- `body`
- `status`
- `createdAt`

## API Surface

### Health

- `GET /api/v1/health`

### Auth

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### Categories

- `GET /api/v1/categories`
- `GET /api/v1/categories/:slug`
- `POST /api/v1/categories` admin
- `PATCH /api/v1/categories/:id` admin
- `DELETE /api/v1/categories/:id` admin

### Products

- `GET /api/v1/products`
- `GET /api/v1/products/featured`
- `GET /api/v1/products/:slug`
- `POST /api/v1/products` admin
- `PATCH /api/v1/products/:id` admin
- `DELETE /api/v1/products/:id` admin

Suggested query params for `GET /products`:

- `page`
- `limit`
- `sort`
- `category`
- `brand`
- `minPrice`
- `maxPrice`
- `search`
- `featured`

### Cart

- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart`

### Orders

- `POST /api/v1/orders`
- `GET /api/v1/orders/me`
- `GET /api/v1/orders/:id`
- `GET /api/v1/admin/orders` admin
- `PATCH /api/v1/admin/orders/:id` admin

### Users

- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/admin/users` admin

## Page-To-Feature Mapping

### `index.html`

Current role:

- brand-led landing page

Future dynamic responsibilities:

- featured categories from `categories`
- featured products from `products`
- optional testimonials from static data for v1

Frontend JS needs:

- fetch featured products
- render homepage product cards from API data
- preserve current card markup and classes

### `catalog.html`

Current role:

- product listing/archive page

Future dynamic responsibilities:

- fetch product listing
- fetch categories/brands for filters
- apply sorting and filtering
- paginate results

Frontend JS needs:

- read query params
- fetch `/products` with filters
- render cards into current grid
- update pagination controls

### `product.html`

Current role:

- product detail page

Future dynamic responsibilities:

- fetch product by slug or id
- render gallery, sizes, colors, price, stock state
- add to cart
- render related products

Frontend JS needs:

- read product slug from URL
- fetch PDP data
- bind size and color selection
- call cart API

### `signup.html`

Current role:

- account creation form

Future dynamic responsibilities:

- submit to `/auth/signup`
- show validation and backend error states
- redirect after success

Frontend JS needs:

- form validation
- secure API submission
- inline field feedback without redesigning layout

## Missing Screens

These screens do not currently exist in the workspace and should be supplied if we want a complete e-commerce flow aligned with the same design language.

Required:

- `login.html`
- `cart.html`
- `checkout.html`
- `account.html`
- `orders.html`
- `admin-dashboard.html`
- `admin-products.html`
- `admin-orders.html`

Recommended:

- empty cart state
- order confirmation page
- 404 page
- unauthorized/forbidden page
- password reset flow

If any of these are expected to match Stitch-level polish, they should be generated before the corresponding implementation phase.

## Security Boundaries

### Required Controls

- hash passwords with `bcrypt`
- never return password hashes in API responses
- validate and sanitize request bodies server-side
- use `httpOnly` cookies for auth token transport
- enforce admin middleware on all write routes that affect products, categories, users, or orders
- validate product stock before order creation
- rate limit login and signup endpoints
- centralize error handling and avoid leaking stack traces in production

### API Conventions

- all API responses should be JSON
- use consistent response envelopes
- separate public and admin route groups
- avoid embedding secrets or database credentials in frontend code

## Frontend Integration Rules

- Add page-specific JavaScript files instead of stuffing all logic inline in the HTML.
- Keep current HTML structure as much as possible; inject dynamic data into dedicated containers.
- Preserve current class names and visual hierarchy from the static pages.
- Prefer data attributes for product IDs, slugs, sizes, and cart actions.
- Keep business logic in JS modules and keep markup focused on presentation.

## Seed Data Strategy

Phase 2 should seed:

- 6 to 10 categories matching current homepage vocabulary
- 12 to 24 products covering brands already visible in the static pages
- at least a few featured products for homepage and related-product sections
- one admin user

Suggested starter categories:

- running
- basketball
- lifestyle
- outdoor
- training
- skate

## Migration Order

### Step 1

Create backend foundation and MongoDB connection.

### Step 2

Add schemas and seed catalog data.

### Step 3

Implement auth and connect `signup.html`.

### Step 4

Make `catalog.html` and `product.html` API-driven.

### Step 5

Make homepage featured sections API-driven.

### Step 6

Add cart and order flow.

### Step 7

Add account pages.

### Step 8

Add admin CRUD with dedicated admin UI.

### Step 9

Harden, test, and prepare deployment.

## Phase 0 Exit Criteria

Phase 0 is complete when:

- the migration architecture is agreed
- the API shape is agreed
- the collections are agreed
- the auth approach is agreed
- the missing UI screens are acknowledged
- implementation starts only after this blueprint is approved

