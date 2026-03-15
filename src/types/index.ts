/**
 * Mini Shopify-like platform - TypeScript types
 * Mirrors the Prisma schema for use in components and API routes.
 */

// ─── Shop ──────────────────────────────────────────────────────────────────
export type Shop = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

// ─── Product ───────────────────────────────────────────────────────────────
export type Product = {
  id: string;
  shopId: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductWithShop = Product & { shop: Shop };

// ─── Order ──────────────────────────────────────────────────────────────────
export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export type Order = {
  id: string;
  shopId: string;
  status: OrderStatus;
  email: string;
  totalCents: number;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceCents: number;
  product?: Product;
};

export type OrderWithItems = Order & { orderItems: OrderItem[] };

// ─── Cart ───────────────────────────────────────────────────────────────────
export type Cart = {
  id: string;
  shopId: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product?: Product;
};

export type CartWithItems = Cart & { cartItems: (CartItem & { product: Product })[] };
