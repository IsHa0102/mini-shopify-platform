import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-0 flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-slate-900 tracking-tight">
              ShopBuilder
              <span className="ml-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                Admin
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden sm:flex items-center gap-1">
              <Link href="/admin" className="nav-link">
                Dashboard
              </Link>
              <Link href="/admin/settings" className="nav-link">
                Shops
              </Link>
              <Link href="/admin/products" className="nav-link">
                Products
              </Link>
              <Link href="/admin/orders" className="nav-link">
                Orders
              </Link>
            </nav>
          </div>

          <Link
            href="/stores"
            className="text-sm text-slate-500 hover:text-slate-900 transition"
          >
            View Storefront →
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>
    </div>
  );
}
