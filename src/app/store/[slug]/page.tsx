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
products: {
orderBy: { createdAt: "desc" },
},
},
});

if (!shop) {
return <div className="p-10">Store not found</div>;
}

const cookieStore = await cookies();
const sessionId = cookieStore.get("cart_session")?.value;

let cartItemCount = 0;

if (sessionId) {
const cart = await prisma.cart.findFirst({
where: {
sessionId,
shopId: shop.id,
},
include: {
cartItems: true,
},
});

if (cart) {
  cartItemCount = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}


}

return ( <div className="max-w-6xl mx-auto px-6 py-12">
{/* Header */}


  <div className="flex justify-between items-center mb-10">
    <div>
      <h1 className="text-4xl font-bold">{shop.name}</h1>
      <p className="text-gray-400 mt-1">Explore our latest products</p>
    </div>

    <Link
      href={`/store/${slug}/cart`}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
    >
      🛒 Cart ({cartItemCount})
    </Link>
  </div>

  {/* Empty State */}

  {shop.products.length === 0 && (
    <p className="text-gray-400">No products available yet.</p>
  )}

  {/* Product Grid */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {shop.products.map((product) => (
      <div
        key={product.id}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow hover:shadow-lg transition"
      >
        <div className="block">
          <Link href={`/store/${slug}/product/${product.id}`}>
            <h2 className="text-xl font-semibold mb-2 hover:text-blue-400">
              {product.title}
            </h2>
          </Link>
        </div>

        <div className="block">
          <p className="text-gray-400 text-sm mb-3">
            {product.description || "No description provided."}
          </p>
        </div>

        <div className="block">
          <p className="text-lg font-bold mb-4">
            ${product.price}
          </p>
        </div>

        <div className="block">
          <form action={addToCart.bind(null, product.id, shop.id)}>
            <button
              type="submit"
              className="w-full bg-green-500 text-black py-2 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    ))}
  </div>
</div>

);
}
