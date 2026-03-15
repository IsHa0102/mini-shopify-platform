
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { removeFromCart } from "@/app/actions/cart";
import { checkout } from "@/app/actions/checkout";
import { updateCartItemQuantity } from "@/app/actions/cart";

export default async function CartPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) {
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-400">Your cart is empty.</p>
      </div>
    );
  }

  const cart = await prisma.cart.findFirst({
    where: {
      sessionId,
      shop: {
        slug,
      },
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.cartItems.length === 0) {
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-400">Your cart is empty.</p>
      </div>
    );
  }

  const total = cart.cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">

        {cart.cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-slate-900 border border-slate-700 p-6 rounded-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {item.product.title}
              </h2>

              <div className="flex items-center gap-3">

  <form action={updateCartItemQuantity.bind(null, item.id, -1)}>
    <button
      type="submit"
      className="px-3 py-1 bg-slate-700 rounded"
    >
      -
    </button>
  </form>

  <span>{item.quantity}</span>

  <form action={updateCartItemQuantity.bind(null, item.id, 1)}>
    <button
      type="submit"
      className="px-3 py-1 bg-slate-700 rounded"
    >
      +
    </button>
  </form>

</div>

              <p className="text-gray-300">
                ${item.product.price} * {item.quantity}
              </p>
            </div>

            <form action={removeFromCart.bind(null, item.id)}>
  <button
    type="submit"
    className="text-red-400 hover:text-red-300"
  >
    Remove
  </button>
</form>
          </div>
        ))}

      </div>

      <div className="mt-10 border-t border-slate-700 pt-6 flex justify-between items-center">

        <p className="text-xl font-semibold">
          Total: ${total.toFixed(2)}
        </p>

        <form action={checkout.bind(null, cart.shopId)}>
          <button className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400">
            Checkout
          </button>
        </form>

      </div>

    </div>
  );
}