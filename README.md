# The Unplugged Wear — Customer Storefront (`TUW-Website`)

[![Live Deployment](https://img.shields.io/badge/Live_Site-tuw--storefront.vercel.app-10B981?style=for-the-badge&logo=vercel)](https://tuw-storefront.vercel.app/)
[![GitHub Branch](https://img.shields.io/badge/GitHub_Branch-preview-blue?style=for-the-badge&logo=github)](https://github.com/UnmarriedIdentity/TUW-Website/tree/preview)

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

A high-craft, editorial ecommerce storefront for **The Unplugged Wear**, crafted with **Next.js 16.3.8 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **TypeScript 5.7**.

Dedicated to quiet permanence and heavyweight organic garments (500 GSM French terry, 280 GSM combed jersey) printed purely on-demand with zero deadstock.

---

## 🌐 Live Production Deployment

* **Production URL**: **[https://tuw-storefront.vercel.app/](https://tuw-storefront.vercel.app/)**
* **Deployment Platform**: Vercel (Edge Network)
* **GitHub Repository**: [UnmarriedIdentity/TUW-Website (Branch: preview)](https://github.com/UnmarriedIdentity/TUW-Website/tree/preview)

---

## 🗺️ Live Storefront Route & Endpoint Directory

Every storefront route is deployed live, pre-rendered with zero runtime external database dependencies, and accessible directly via the links below:

| # | Live Endpoint Link | Page / Feature | Description | Status |
|---|---|---|---|:---:|
| 1 | [**`/`**](https://tuw-storefront.vercel.app/) | **Home Page** | Editorial landing page with hero, brand values, selected essentials, capsule series, and the Rolls-Royce scroll-morph navbar. | 🟢 Live |
| 2 | [**`/login`**](https://tuw-storefront.vercel.app/login) | **Customer Login** | Standalone pixel-perfect authentication screen matching Figma Node `233:11587` with lifestyle hero imagery, password eye toggle, and demo sandbox login. | 🟢 Live |
| 3 | [**`/register`**](https://tuw-storefront.vercel.app/register) | **Customer Registration** | Standalone pixel-perfect registration screen matching Figma Node `233:11647` with lifestyle hero imagery and form validation. | 🟢 Live |
| 4 | [**`/forgot-password`**](https://tuw-storefront.vercel.app/forgot-password) | **Forgot Password** | Secure password reset request flow with email validation and simulated recovery dispatch. | 🟢 Live |
| 5 | [**`/reset-password`**](https://tuw-storefront.vercel.app/reset-password) | **Reset Password** | New password confirmation view with token validation and security guidelines. | 🟢 Live |
| 6 | [**`/design-system`**](https://tuw-storefront.vercel.app/design-system) | **Design System Specimen** | Interactive specimen showcasing Futura/Outfit typography, 3-tier color tokens, 1612×529 auto-layout frame metrics, and UI component catalog. | 🟢 Live |
| 7 | [**`/shop`**](https://tuw-storefront.vercel.app/shop) | **Catalog & Shop** | Complete product browsing with desktop FilterBar, mobile slide-over filter drawer, sort dropdown, and active filter pills. | 🟢 Live |
| 8 | [**`/products/[slug]`**](https://tuw-storefront.vercel.app/products/monolith-heavyweight-hoodie-vintage-black) | **Product Detail Page (PDP)** | Architectural PDP with thumbnail gallery, interactive color/size selectors, stock counters, accordions, and customer reviews. | 🟢 Live |
| 9 | [**`/collections`**](https://tuw-storefront.vercel.app/collections) | **Capsule Collections** | Seasonal slow-fashion capsule overview with high-res lookbook banners and garment counts. | 🟢 Live |
| 10 | [**`/collections/[slug]`**](https://tuw-storefront.vercel.app/collections/winter-monolith) | **Capsule Detail** | Dedicated capsule collection view with curated matching product grid. | 🟢 Live |
| 11 | [**`/cart`**](https://tuw-storefront.vercel.app/cart) | **Shopping Bag** | Full-page shopping cart with free-shipping threshold tracker (₹3,000 threshold), item quantity controls, and coupon code entry. | 🟢 Live |
| 12 | [**`/checkout`**](https://tuw-storefront.vercel.app/checkout) | **Checkout & Simulation** | Multi-step checkout with address selection and interactive Payment Simulation Panel (UPI QR, Card, COD). | 🟢 Live |
| 13 | [**`/search`**](https://tuw-storefront.vercel.app/search) | **Catalog Search** | Instant product and collection search overlay and dedicated results page. | 🟢 Live |
| 14 | [**`/wishlist`**](https://tuw-storefront.vercel.app/wishlist) | **Saved Garments** | Customer wishlist with real-time counter in header and one-click add to cart. | 🟢 Live |
| 15 | [**`/account`**](https://tuw-storefront.vercel.app/account) | **Customer Account Portal** | Account overview with order history, saved addresses, profile settings, and returns management. | 🟢 Live |
| 16 | [**`/track-order`**](https://tuw-storefront.vercel.app/track-order) | **Order Tracking** | Real-time shipment tracker supporting reference lookups (e.g., `TUW-98214-DEL`) with chronological checkpoint milestones. | 🟢 Live |
| 17 | [**`/about`**](https://tuw-storefront.vercel.app/about) | **Brand Philosophy** | The Unplugged Wear founding story, slow-living philosophy, and Tiruppur craft manifesto. | 🟢 Live |
| 18 | [**`/about/sustainability`**](https://tuw-storefront.vercel.app/about/sustainability) | **Sustainability & POD** | Zero-deadstock on-demand manufacturing manifesto, 500 GSM loopback cotton sourcing, and eco-certified water dyes. | 🟢 Live |
| 19 | [**`/journal`**](https://tuw-storefront.vercel.app/journal) | **Editorial Journal** | Slow-living publications, design essays, and behind-the-scenes craft stories. | 🟢 Live |
| 20 | [**`/journal/[slug]`**](https://tuw-storefront.vercel.app/journal/the-anatomy-of-500-gsm-cotton) | **Longform Article View** | Clean editorial typography reader with author byline, publication dates, and related articles. | 🟢 Live |
| 21 | [**`/faq`**](https://tuw-storefront.vercel.app/faq) | **Frequently Asked Questions** | Interactive accordion FAQ covering sizing, garment care, shipping timelines, and POD practices. | 🟢 Live |
| 22 | [**`/size-guide`**](https://tuw-storefront.vercel.app/size-guide) | **Interactive Size Guide** | Sizing tables with dynamic centimeter/inch unit toggles across Chest, Length, Sleeve, and Shoulder. | 🟢 Live |
| 23 | [**`/contact`**](https://tuw-storefront.vercel.app/contact) | **Concierge & Inquiries** | Atelier contact form, customer concierge details, and wholesale studio inquiries. | 🟢 Live |
| 24 | [**`/policies`**](https://tuw-storefront.vercel.app/policies) | **Policy Hub** | Centralized legal and customer service policy navigation. | 🟢 Live |
| 25 | [**`/policies/privacy`**](https://tuw-storefront.vercel.app/policies/privacy) | **Privacy Policy** | Comprehensive data protection and privacy policy. | 🟢 Live |
| 26 | [**`/policies/terms`**](https://tuw-storefront.vercel.app/policies/terms) | **Terms of Service** | Store terms of service and order agreements. | 🟢 Live |
| 27 | [**`/policies/shipping`**](https://tuw-storefront.vercel.app/policies/shipping) | **Shipping & Delivery Policy** | Production turnaround and courier delivery timelines. | 🟢 Live |
| 28 | [**`/policies/returns`**](https://tuw-storefront.vercel.app/policies/returns) | **Returns & Exchanges** | 14-day unworn garment return and exchange guidelines. | 🟢 Live |
| 29 | [**`/_not-found`**](https://tuw-storefront.vercel.app/non-existent-page) | **Custom 404 Experience** | Architectural slow-fashion 404 page with quick recovery links back to the catalog. | 🟢 Live |

---

## 🎨 Visual Identity & Navigation Invariants

1. **Brand Aesthetics**:
   - Canvas: Warm Ivory (`#FCFAF6` / `--tuw-store-canvas`)
   - Surface: Pure White (`#FFFFFF`)
   - Typography: Deep Charcoal (`#0F0F0F` / `#1A1A1A`)
   - Accent: Refined Gold (`#C8A96A`) & Secondary Teal (`#005B6C`)
   - Headings: **Futura** (`--font-heading`, uppercase tracking)
   - Body & Controls: **Outfit** (`--font-sans`, weights 300 to 800)

2. **Rolls-Royce Inspired Header Animation**:
   - **Top Bar (36px, `#171535`)**: Displays Blogs, FAQ's, Support, 4 social vector icons, and interactive currency selector (USD, INR, EUR, GBP).
   - **Main Bar (73px, `#FCFAF6`)**:
     - At the top of the page, the center brand displays **THE UNPLUGGED WEAR** wordmark in Futura uppercase.
     - As the user scrolls (`scrollY > 24px`), the wordmark smoothly morphs into the **Official Leaping Deer Silhouette Emblem** with zero layout shift (CLS = 0).
     - As the user scrolls back to top, it seamlessly reverses back to the full wordmark.

3. **Browser Tab Icon**:
   - Official black leaping deer logo configured as `/icon.png` (512×512) and `/favicon.ico` in app layout metadata.

---

## ⚡ Local Development Commands

```bash
# Install dependencies
pnpm install

# Start local Turbopack dev server on port 3007
pnpm run dev

# Validate TypeScript (strict mode, zero errors)
pnpm run typecheck

# Execute unit test suites (10/10 green)
pnpm run test

# Run production build (all 29 routes prerendered)
pnpm run build

# Start production server
pnpm run start
```
