import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function SettingsPage() {
  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="page-title">Shops</h1>
          <p className="page-subtitle">{shops.length} shop{shops.length !== 1 ? "s" : ""} configured</p>
        </div>
        <Link href="/admin/settings/new" className="btn-admin">
          + Create Shop
        </Link>
      </div>

      {/* Empty state */}
      {shops.length === 0 && (
        <div className="card p-16 text-center text-slate-400">
          <div className="text-5xl mb-4">🏪</div>
          <p className="font-medium text-slate-600 mb-1">No shops yet</p>
          <p className="text-sm mb-6">Create your first shop to get started.</p>
          <Link href="/admin/settings/new" className="btn-admin">
            Create Shop
          </Link>
        </div>
      )}

      {/* Shop grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="card p-6 hover:shadow-md hover:border-slate-300 transition-all"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                {shop.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900 truncate">{shop.name}</h2>
                <p className="text-xs text-slate-400">{shop.slug}</p>
              </div>
            </div>

            {/* Stats */}
            <p className="text-sm text-slate-500 mb-5">
              {shop._count.products} product{shop._count.products !== 1 ? "s" : ""}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                href={`/store/${shop.slug}`}
                className="btn-secondary text-xs flex-1"
                target="_blank"
              >
                View Store
              </Link>
              <Link
                href="/admin/products/new"
                className="btn-admin text-xs flex-1"
              >
                Add Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
