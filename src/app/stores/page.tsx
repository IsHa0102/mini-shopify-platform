import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function StoresPage() {

const shops = await prisma.shop.findMany({
orderBy: { createdAt: "desc" }
});

return ( <div className="max-w-6xl mx-auto px-6 py-12">


  {/* Header */}

  <div className="mb-10">
    <h1 className="text-4xl font-bold tracking-tight">
      Stores
    </h1>

    <p className="text-gray-400 mt-2">
      Browse all available storefronts
    </p>
  </div>

  {/* Stores Grid */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {shops.map((shop) => (
      <Link
        key={shop.id}
        href={`/store/${shop.slug}`}
        className="group bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition flex items-center justify-between"
      >

        <div>
          <h2 className="text-xl font-semibold group-hover:text-emerald-400 transition">
            {shop.name}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Enter storefront
          </p>
        </div>

        <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition">
          →
        </span>

      </Link>
    ))}

  </div>

</div>

);
}
