# Mini Shopify Platform

A multi-store ecommerce platform where merchants can create stores, manage products, and process orders.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- TailwindCSS

## Features

- Multi-store architecture
- Storefront for each shop
- Product management (CRUD)
- Session-based cart
- Checkout system
- Order management
- Admin dashboard

## Architecture

Each store has its own:

- Products
- Cart
- Orders

Routes:

/stores  
/store/[slug]  
/admin

## Setup

```bash
npm install
npm run dev