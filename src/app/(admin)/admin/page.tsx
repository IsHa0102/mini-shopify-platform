import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [shopCount, productCount, orderCount] = await Promise.all([
    prisma.shop.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  const cards = [
    {
      emoji: "🏪",
      title: "Shops",
      description: "Configure storefronts and manage shop settings.",
      count: shopCount,
      label: shopCount === 1 ? "shop" : "shops",
      href: "/admin/settings",
      linkText: "Manage shops",
      color: "from-indigo-50 to-violet-50",
      border: "border-indigo-100",
      countColor: "text-indigo-700",
    },
    {
      emoji: "📦",
      title: "Products",
      description: "Create, edit, and organize your product catalog.",
      count: productCount,
      label: productCount === 1 ? "product" : "products",
      href: "/admin/products",
      linkText: "Manage products",
      color: "from-emerald-50 to-teal-50",
      border: "border-emerald-100",
      countColor: "text-emerald-700",
    },
    {
      emoji: "🧾",
      title: "Orders",
      description: "View and track recent customer purchases.",
      count: orderCount,
      label: orderCount === 1 ? "order" : "orders",
      href: "/admin/orders",
      linkText: "View orders",
      color: "from-amber-50 to-orange-50",
      border: "border-amber-100",
      countColor: "text-amber-700",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Manage shops, products, and orders from one place.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`card p-6 bg-gradient-to-br ${card.color} border ${card.border} hover:shadow-md transition-shadow`}
          >
            <div className="text-3xl mb-4">{card.emoji}</div>

            <div className={`text-3xl font-bold mb-1 ${card.countColor}`}>
              {card.count}
            </div>
            <div className="text-sm text-slate-500 mb-1">{card.label}</div>

            <h2 className="text-lg font-semibold text-slate-900 mt-4 mb-1">
              {card.title}
            </h2>
            <p className="text-sm text-slate-500 mb-5">{card.description}</p>

            <Link href={card.href} className="btn-admin text-sm">
              {card.linkText} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
