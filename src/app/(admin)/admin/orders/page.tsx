import { prisma } from "@/lib/db";

export default async function OrdersPage() {

const orders = await prisma.order.findMany({
include: {
items: {
include: {
product: true
}
}
},
orderBy: {
createdAt: "desc"
}
});

return ( <div className="max-w-6xl mx-auto px-6 py-10">

  <h1 className="text-4xl font-bold tracking-tight mb-10">
    Orders
  </h1>

  {orders.length === 0 && (
    <p className="text-gray-400">
      No orders yet.
    </p>
  )}

  <div className="space-y-10">

    {orders.map((order) => (

      <div
        key={order.id}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500 transition"
      >

        {/* Order header */}

        <div className="mb-6">

          <h2 className="text-lg font-semibold">
            Order #{order.id.slice(0,8)}
          </h2>

          <p className="text-gray-400 text-sm">
            {new Date(order.createdAt).toLocaleString()}
          </p>

        </div>

        {/* Items */}

        <div className="space-y-3">

          {order.items.map((item) => (

            <div
              key={item.id}
              className="flex justify-between text-sm"
            >

              <span className="text-gray-300">
                {item.product.title} × {item.quantity}
              </span>

              <span className="font-medium">
                ${item.price}
              </span>

            </div>

          ))}

        </div>

        {/* Total */}

        <div className="border-t border-slate-800 mt-6 pt-4 flex justify-between font-semibold text-lg">

          <span>Total</span>

          <span>${order.total}</span>

        </div>

      </div>

    ))}

  </div>

</div>

);
}
