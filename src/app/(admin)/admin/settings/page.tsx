import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function SettingsPage() {
const shops = await prisma.shop.findMany({
orderBy: { createdAt: "desc" }
});

return ( <div className="max-w-6xl mx-auto px-6 py-10">

  {/* Header */}

  <div className="flex items-center justify-between mb-8">

    <h1 className="text-4xl font-bold tracking-tight">
      Shops
    </h1>

    <Link
      href="/admin/settings/new"
      className="bg-emerald-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-400 transition"
    >
      Create Shop
    </Link>

  </div>

  {/* Empty State */}

  {shops.length === 0 && (
    <p className="text-gray-400">
      No shops created yet.
    </p>
  )}

  {/* Shop List */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {shops.map((shop) => (

      <div
        key={shop.id}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-lg transition"
      >

        <h2 className="text-xl font-semibold mb-4">
          {shop.name}
        </h2>

        <Link
          href={`/store/${shop.slug}`}
          className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:translate-x-1 transition"
        >
          View Storefront →
        </Link>

      </div>

    ))}

  </div>

</div>


);
}
