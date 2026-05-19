import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { removeFromCart, updateCartItemQuantity } from "@/app/actions/cart";
import { checkout } from "@/app/actions/checkout";
import Link from "next/link";

export default async function CartPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  const emptyCart = (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href={`/store/${slug}`} className="text-slate-400 hover:text-slate-600 text-sm transition">
            ← Continue shopping
          </Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center text-slate-400">
        <div className="text-5xl mb-4">🛒</div>
        <p className="font-medium text-slate-600">Your cart is empty</p>
        <p className="text-sm mt-1">Add some products first.</p>
        <Link href={`/store/${slug}`} className="btn-store mt-6 inline-flex">
          Browse Products
        </Link>
      </div>
    </div>
  );

  if (!sessionId) return emptyCart;

  const cart = await prisma.cart.findFirst({
    where: { sessionId, shop: { slug } },
    include: { cartItems: { include: { product: true } } },
  });

  if (!cart || cart.cartItems.length === 0) return emptyCart;

  const total = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href={`/store/${slug}`} className="text-slate-400 hover:text-slate-600 text-sm transition">
            ← Continue shopping
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="page-title mb-8">Your Cart</h1>

        {/* Items */}
        <div className="card divide-y divide-slate-100">
          {cart.cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-5">
              {/* Product image/placeholder */}
              <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                {item.product.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "🛍️"
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">
                  {item.product.title}
                </p>
                <p className="text-sm text-slate-400">
                  ${item.product.price.toFixed(2)} each
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 shrink-0">
                <form action={updateCartItemQuantity.bind(null, item.id, -1)}>
                  <button
                    type="submit"
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition"
                  >
                    −
                  </button>
                </form>

                <span className="w-8 text-center font-semibold text-slate-900">
                  {item.quantity}
                </span>

                <form action={updateCartItemQuantity.bind(null, item.id, 1)}>
                  <button
                    type="submit"
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition"
                  >
                    +
                  </button>
                </form>
              </div>

              {/* Line total */}
              <div className="w-20 text-right shrink-0">
                <p className="font-semibold text-slate-900">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </div>

              {/* Remove */}
              <form action={removeFromCart.bind(null, item.id)}>
                <button
                  type="submit"
                  className="text-slate-300 hover:text-red-400 transition text-lg"
                  title="Remove"
                >
                  ×
                </button>
              </form>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="card mt-5 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
            <span className="font-bold text-lg text-slate-900">Total</span>
            <span className="font-bold text-xl text-slate-900">${total.toFixed(2)}</span>
          </div>

          <form action={checkout.bind(null, cart.shopId)}>
            <button className="btn-store w-full mt-5 py-3 text-base justify-center">
              Proceed to Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
