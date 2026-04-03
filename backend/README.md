# Sneaker Index Backend

## Phase 1A-2A

This backend provides the initial Express foundation for the Sneaker Index migration:

- environment loading
- MongoDB Atlas connection wiring
- versioned API routing
- health endpoint
- centralized error handling
- Mongoose models for users, categories, and products
- seed script foundation

## Setup

1. Copy `.env.example` to `.env`
2. Fill in `MONGODB_URI` and any other values you want to customize
3. Install dependencies with `npm install`
4. Start the API with `npm run dev`

## Seed Script

- `npm run seed`

Phase 2A only adds the seed-script foundation. It connects to the database, loads the models, and reports collection counts. Real category and product inserts will be added in Phase 2B.

## Initial Endpoint

- `GET /api/v1/health`

Example local URL:

- `http://localhost:4000/api/v1/health`
