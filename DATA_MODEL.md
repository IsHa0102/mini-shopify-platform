# Data Model – Mini Shop Builder

## Overview

```
Shop (1) ──< Product (many)
   │
   ├──< Order (many) ──< OrderItem (many) ── Product
   │
   └──< Cart (many) ──< CartItem (many) ── Product
```

## Entities

| Model     | Purpose |
|----------|---------|
| **Shop** | Merchant store. Has `name`, `slug` (e.g. `demo-shop` for `/store/demo-shop`). |
| **Product** | Belongs to a shop. `title`, `description`, `price`, `imageUrl`, `stock`. |
| **Order** | Completed purchase. `status`, `email`, `totalCents`. |
| **OrderItem** | Line item in an order. `quantity`, `priceCents` (snapshot at purchase). |
| **Cart** | Shopping cart. Identified by `sessionId` (no login required). |
| **CartItem** | Line item in a cart. `quantity`, links to `Product`. |

## Notes

- **Price**: `Product.price` is a float (e.g. `19.99`). `OrderItem.priceCents` and `Order.totalCents` use integers to avoid rounding issues.
- **Cart**: Session-based via `sessionId` (cookie). Can add user-based carts later.
- **Stock**: `Product.stock = 0` can mean “unlimited” if you prefer.

## Setup

```bash
npm install prisma @prisma/client
npx prisma generate
npx prisma db push
```

Then create `src/lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```
