import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="card p-12 text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-6">
          ✅
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Order placed!
        </h1>
        <p className="text-slate-500 mb-8">
          Your order has been received and is being processed. Thank you for
          shopping with us.
        </p>
        <Link href="/stores" className="btn-store">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
