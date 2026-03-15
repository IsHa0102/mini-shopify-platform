import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ProductsPage() {

const shops = await prisma.shop.findMany({
include: {
products: true
}
});

return ( <div className="max-w-6xl mx-auto px-6 py-10">


  {/* Header */}

  <div className="flex items-center justify-between mb-10">

    <h1 className="text-4xl font-bold tracking-tight">
      Products
    </h1>

    <Link
      href="/admin/products/new"
      className="bg-emerald-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-400 transition"
    >
      Add Product
    </Link>

  </div>

  {/* Shops */}

  <div className="space-y-12">

    {shops.map((shop) => (
      <div key={shop.id}>

        {/* Shop Header */}

        <h2 className="text-2xl font-semibold mb-6">
          {shop.name}
        </h2>

        {/* Empty State */}

        {shop.products.length === 0 && (
          <p className="text-gray-400">
            No products yet.
          </p>
        )}

        {/* Product Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {shop.products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-lg transition"
            >

              <h3 className="text-xl font-semibold mb-2">
                {product.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {product.description}
              </p>

              <p className="font-bold text-lg mb-6">
                ${product.price}
              </p>

              <div className="flex gap-4">

                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                >
                  Edit
                </Link>

                <Link
                  href={`/admin/products/${product.id}/delete`}
                  className="px-4 py-2 rounded-lg bg-red-500 text-black hover:bg-red-400 transition"
                >
                  Delete
                </Link>

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
