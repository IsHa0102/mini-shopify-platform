import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function StoresPage() {
  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-slate-900 text-lg tracking-tight">
            ShopBuilder
          </Link>
          <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-900 transition">
            Admin →
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="page-title">Stores</h1>
          <p className="page-subtitle">Browse all available storefronts</p>
        </div>

        {/* Empty state */}
        {shops.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-4">🏪</div>
            <p className="font-medium">No stores yet</p>
            <p className="text-sm mt-1">Ask an admin to create one.</p>
          </div>
        )}

        {/* Store grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {shops.map((shop) => {
            const initial = shop.name.charAt(0).toUpperCase();
            return (
              <Link
                key={shop.id}
                href={`/store/${shop.slug}`}
                className="group card p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex items-center gap-5"
              >
                {/* Avatar */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {initial}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition">
                    {shop.name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {shop.slug}
                  </p>
                </div>

                <span className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
