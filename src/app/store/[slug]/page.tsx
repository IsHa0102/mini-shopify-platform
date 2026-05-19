import { prisma } from "@/lib/db";
import { addToCart } from "@/app/actions/cart";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function StorefrontPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const shop = await prisma.shop.findUnique({
    where: { slug },
    include: {
      products: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Store not found.
      </div>
    );
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;

  let cartItemCount = 0;
  if (sessionId) {
    const cart = await prisma.cart.findFirst({
      where: { sessionId, shopId: shop.id },
      include: { cartItems: true },
    });
    if (cart) {
      cartItemCount = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/stores" className="text-slate-400 hover:text-slate-600 text-sm transition shrink-0">
              ← Stores
            </Link>
            <span className="text-slate-300">/</span>
            <h1 className="font-bold text-slate-900 truncate">{shop.name}</h1>
          </div>

          <Link
            href={`/store/${slug}/cart`}
            className="shrink-0 flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            <span>🛒</span>
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-slate-500 mb-8">Explore our latest products</p>

        {/* Empty state */}
        {shop.products.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-4">📦</div>
            <p className="font-medium">No products yet</p>
            <p className="text-sm mt-1">Check back soon.</p>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shop.products.map((product) => (
            <div
              key={product.id}
              className="card overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col"
            >
              {/* Image placeholder or actual image */}
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl text-slate-300">
                  🛍️
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <Link href={`/store/${slug}/product/${product.id}`}>
                  <h2 className="font-semibold text-slate-900 hover:text-emerald-700 transition text-base mb-1">
                    {product.title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">
                  {product.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>

                  <form action={addToCart.bind(null, product.id, shop.id)}>
                    <button
                      type="submit"
                      className="btn-store text-sm px-4 py-2"
                    >
                      Add to Cart
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
