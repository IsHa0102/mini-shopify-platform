import Link from "next/link";

export default function AdminDashboardPage() {
return ( <div className="max-w-6xl mx-auto px-6 py-10">


  {/* Header */}

  <div className="mb-10">
    <h1 className="text-4xl font-bold tracking-tight">
      Merchant Admin
    </h1>

    <p className="text-gray-400 mt-2">
      Manage shops, products, and orders from one place.
    </p>
  </div>

  {/* Dashboard Cards */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Shops */}

    <div className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500 hover:shadow-lg transition">

      <h2 className="text-xl font-semibold mb-2">
        Shops
      </h2>

      <p className="text-gray-400 mb-6">
        Configure your shop settings and storefronts.
      </p>

      <Link
        href="/admin/settings"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition"
      >
        View shops →
      </Link>

    </div>

    {/* Products */}

    <div className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500 hover:shadow-lg transition">

      <h2 className="text-xl font-semibold mb-2">
        Products
      </h2>

      <p className="text-gray-400 mb-6">
        Create, edit, and organize your product catalog.
      </p>

      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition"
      >
        Manage products →
      </Link>

    </div>

    {/* Orders */}

    <div className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500 hover:shadow-lg transition">

      <h2 className="text-xl font-semibold mb-2">
        Orders
      </h2>

      <p className="text-gray-400 mb-6">
        View and track recent customer orders.
      </p>

      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition"
      >
        View orders →
      </Link>

    </div>

  </div>

</div>


);
}
