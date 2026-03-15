import Link from "next/link";

export default function HomePage() {
return ( <main className="min-h-screen flex items-center justify-center px-6">


  <div className="text-center max-w-2xl">

    <h1 className="text-5xl font-bold tracking-tight">
      Mini Shopify Platform
    </h1>

    <p className="text-gray-400 mt-4 text-lg">
      A multi-store ecommerce platform where each shop has its own
      storefront, products, and orders.
    </p>

    <div className="flex justify-center gap-4 mt-8">

      <Link
        href="/stores"
        className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
      >
        Go to Storefront
      </Link>

      <Link
        href="/admin"
        className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition"
      >
        Admin Panel
      </Link>

    </div>

  </div>

</main>


);
}
