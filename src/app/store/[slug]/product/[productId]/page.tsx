import { prisma } from "@/lib/db";
import { addToCart } from "@/app/actions/cart";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { slug: string; productId: string };
}) {
  const { slug, productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href={`/store/${slug}`}
            className="text-slate-400 hover:text-slate-600 text-sm transition"
          >
            ← Back to store
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="card overflow-hidden md:flex">
          {/* Image */}
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full md:w-80 object-cover"
            />
          ) : (
            <div className="w-full md:w-80 h-64 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-6xl text-slate-300 shrink-0">
              🛍️
            </div>
          )}

          {/* Details */}
          <div className="p-8 flex flex-col flex-1">
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              {product.title}
            </h1>

            <p className="text-slate-500 mb-6 leading-relaxed flex-1">
              {product.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-3xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>

              <form action={addToCart.bind(null, product.id, product.shopId)}>
                <button type="submit" className="btn-store px-8 py-3 text-base">
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
