<div align="center">
  <img src="images/ICON.png" alt="Sneaker Index Logo" width="120" style="margin-bottom: 20px;" />
  <h1 align="center">Sneaker Index</h1>
  <p align="center">
    <strong>A Digital Curator of Footwear</strong>
  </p>
  <p align="center">
    <a href="#-about-the-project">About</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-tech-stack">Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Architecture</a>
  </p>
</div>

<br/>

## 📖 About The Project

**Sneaker Index** is a premium, full-stack digital storefront and curation platform designed for the modern sneakerhead. Operating under our bespoke **"Cobalt Grade"** design system, it delivers a boutique shopping experience through highly interactive UI/UX patterns, sleek minimalist aesthetics, and custom fluid animations. 

More than just a store, Sneaker Index provides a high-fidelity environment built to highlight sneaker culture with deep integration of dynamic frontend interactions and robust backend e-commerce capabilities.

---

## ✨ Key Features

- 🛍️ **Immersive Shopping Experience**: Fully responsive, curated product catalogs with skeleton loaders, fluid staggered animations, and ambient spatial UI designs.
- 🎨 **Cobalt Grade Aesthetics**: Built from the ground up to follow a strict color methodology relying on Cobalt Blues, deep contrasts, and modern glassmorphism (frosted glass) effects.
- ⚡ **Performance & Motion**: Employs real-time continuous scroll observers for cinematic fade-ins, levitating hero elements, and tactile magnetic buttons.
- 🔐 **Secure Authentication**: End-to-end user login and sign-up flows with inline visual feedback and real-time form validation.
- 🛒 **Dynamic Cart & Checkout**: Interactive side-panel cart flows seamlessly into a full checkout wizard.
- 🎛️ **Powerful Admin Console**: Dedicated backend interface for managing product data, executing destructive actions via safe modals, and managing overarching category visibility.

---

## 🛠️ Tech Stack

### Frontend Architecture
- **HTML5** & **Vanilla Javascript**: Lightweight, zero-dependency custom routing and state management.
- **Tailwind CSS**: Rapid styling utilizing JIT, custom keyframes, and the container query plugin.
- **Global CSS Extensibility**: Modular custom CSS for highly specific micro-interactions (e.g., `si-lift-card`, `animate-float`, `.smart-nav`).
- **Typography**: `Bebas Neue` for high-impact display headers and `Lato` for highly readable body copy.

### Backend Infrastructure
- **Node.js**: The core runtime powering the API layers.
- **Express**: Seamless handling of static file routing, backend queries, and administration authentication.

---

## 🚀 Getting Started

Follow these instructions to run Sneaker Index locally for testing or development.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or navigate to your local directory:
   ```bash
   cd paths/to/shoes-index
   ```

2. **Navigate to the Backend Directory**:
   All dependencies and server logic reside within the backend environment.
   ```bash
   cd backend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Launch the Development Server**:
   ```bash
   npm run dev
   ```

5. **View the Application**:
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal output) to begin interactively testing the app.

---

## 📂 Project Structure

```text
shoes-index/
├── backend/            # Node/Express API, routing, and database handlers
│   ├── package.json
│   ├── server.js
│   └── models/
├── css/                # Global style overrides and Cobalt design tokens
│   └── global.css
├── html/               # Static component views
│   ├── index.html      # The dynamic landing page
│   ├── catalog.html    # Main storefront collection
│   ├── login.html      # Authentication portal
│   └── ...
├── images/             # Localized static assets (Logos, Icons)
└── js/                 # Feature-specific JavaScript modules
    ├── global-ux.js    # Intersection observers & global animations
    ├── cart.js         # Cart state & local storage
    └── ...
```

---

> _"More Than A Shoe. A Statement."_ 
> — **Sneaker Index**
