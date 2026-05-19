import { prisma } from "@/lib/db";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="page-title">Orders</h1>
        <p className="page-subtitle">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="card p-16 text-center text-slate-400">
          <div className="text-5xl mb-4">🧾</div>
          <p className="font-medium text-slate-600 mb-1">No orders yet</p>
          <p className="text-sm">Orders will appear here once customers check out.</p>
        </div>
      )}

      {/* Orders list */}
      <div className="space-y-5">
        {orders.map((order) => {
          const total = typeof order.total === "number"
            ? order.total
            : order.items.reduce((s, i) => s + i.price * i.quantity, 0);

          return (
            <div key={order.id} className="card overflow-hidden">
              {/* Order header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-slate-700">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    Completed
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-sm">
                        📦
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
                <span className="text-sm font-medium text-slate-600">Order Total</span>
                <span className="text-lg font-bold text-slate-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
