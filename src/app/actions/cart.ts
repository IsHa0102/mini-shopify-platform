"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

// ADD TO CART
export async function addToCart(productId: string, shopId: string) {

  const cookieStore = await cookies();
  let sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) {
    sessionId = randomUUID();

    cookieStore.set("cart_session", sessionId, {
      httpOnly: true,
      path: "/",
    });
  }

  const cart = await prisma.cart.upsert({
    where: {
      sessionId_shopId: {
        sessionId,
        shopId,
      },
    },
    create: {
      sessionId,
      shopId,
    },
    update: {},
  });

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + 1,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  // refresh storefront + cart badge
  revalidatePath("/");
}


// REMOVE FROM CART
export async function removeFromCart(cartItemId: string) {

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  revalidatePath("/");
}


// UPDATE QUANTITY (+ / - buttons)
export async function updateCartItemQuantity(cartItemId: string, change: number) {

  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!item) return;

  const newQuantity = item.quantity + change;

  if (newQuantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });
  }

  revalidatePath("/");
}