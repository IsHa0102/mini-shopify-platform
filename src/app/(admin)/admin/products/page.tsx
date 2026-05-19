import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ProductsPage() {
  const shops = await prisma.shop.findMany({
    include: { products: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  const totalProducts = shops.reduce((sum, s) => sum + s.products.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">{totalProducts} product{totalProducts !== 1 ? "s" : ""} across {shops.length} shop{shops.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/products/new" className="btn-admin">
          + Add Product
        </Link>
      </div>

      {/* Shops */}
      <div className="space-y-12">
        {shops.map((shop) => (
          <div key={shop.id}>
            {/* Shop heading */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                {shop.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{shop.name}</h2>
              <span className="text-sm text-slate-400">
                {shop.products.length} product{shop.products.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Empty */}
            {shop.products.length === 0 && (
              <div className="card p-8 text-center text-slate-400 text-sm">
                No products in this shop yet.{" "}
                <Link href="/admin/products/new" className="text-indigo-600 hover:underline">
                  Add one
                </Link>
              </div>
            )}

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shop.products.map((product) => (
                <div
                  key={product.id}
                  className="card p-5 hover:shadow-md hover:border-slate-300 transition-all"
                >
                  {/* Product image placeholder */}
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-28 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl text-slate-200 mb-3">
                      📦
                    </div>
                  )}

                  <h3 className="font-semibold text-slate-900 mb-1 truncate">
                    {product.title}
                  </h3>

                  <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                    {product.description || "No description."}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/delete`}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 font-medium transition"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
