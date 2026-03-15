"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkout(shopId: string) {

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) return;

  const cart = await prisma.cart.findUnique({
  where: {
    sessionId_shopId: {
      sessionId,
      shopId
    }
  }, 
    include: {
      cartItems: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart || cart.cartItems.length === 0) return;

  const total = cart.cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      shopId: cart.shopId,
      total,
      items: {
        create: cart.cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    }
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });

  redirect("/order-success");
}

