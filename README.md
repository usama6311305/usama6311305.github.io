# MilkMart 🥛 — Milk Shop Website

A complete full-stack milk shop built with **Next.js 14** + **Tailwind CSS** + **Zustand**.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, featured products |
| `/shop` | Full product listing with search, filter, sort |
| `/cart` | Shopping cart with quantity controls |
| `/checkout` | Order form + payment method selection |
| `/order-success` | Order confirmation with status tracker |
| `/login` | Login page (admin + customer) |
| `/signup` | Registration page |
| `/admin/dashboard` | Admin stats, recent orders, top products |
| `/admin/orders` | Order management with status updates |
| `/admin/products` | Product CRUD (add, edit, delete, toggle stock) |

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

No API key needed — all data is mock/local!

## Admin Login

```
Email:    admin@milkshop.com
Password: admin123
```

## Features

- 🛒 Shopping cart with persistent state (localStorage via Zustand)
- 🔍 Product search, category filter, sort by price/rating
- 📦 12 products across 6 categories
- 💳 4 payment methods (Cash, Card, JazzCash, EasyPaisa)
- 👤 Auth system (admin + customer roles)
- 📊 Admin dashboard with stats
- 📋 Order management with status updates
- ➕ Product CRUD in admin panel
- 📱 Fully responsive (mobile + desktop)
- ✅ Form validation on checkout and signup
