import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-slate-200 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <span className="font-bold text-slate-900 text-lg tracking-tight">
          ShopBuilder
        </span>
        <Link
          href="/admin"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          Admin →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-6 uppercase tracking-wide">
          Multi-store platform
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight max-w-3xl">
          Build and manage{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            beautiful stores
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-xl leading-relaxed">
          Each shop gets its own storefront, product catalog, and order history.
          Simple to manage, great for customers.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            href="/stores"
            className="btn-store text-base px-7 py-3 shadow-sm shadow-emerald-200"
          >
            Browse Stores
          </Link>
          <Link
            href="/admin"
            className="btn-secondary text-base px-7 py-3"
          >
            Admin Panel
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">🏪</div>
            <h3 className="font-semibold text-slate-900 mb-1">Multi-store</h3>
            <p className="text-sm text-slate-500">
              Each shop runs independently with its own slug and products.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-semibold text-slate-900 mb-1">Cart & Checkout</h3>
            <p className="text-sm text-slate-500">
              Session-based cart with real-time quantity controls and instant checkout.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold text-slate-900 mb-1">Order Tracking</h3>
            <p className="text-sm text-slate-500">
              All orders captured with itemized receipts and totals in the admin.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
