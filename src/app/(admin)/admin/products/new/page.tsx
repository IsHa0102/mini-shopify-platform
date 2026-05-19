import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createProduct(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const shopId = formData.get("shopId") as string;

  await prisma.product.create({ data: { title, description, price, shopId } });
  redirect("/admin/products");
}

export default async function NewProductPage() {
  const shops = await prisma.shop.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/admin/products" className="text-slate-400 hover:text-slate-600 transition text-sm">
          ← Products
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="page-title text-xl">New Product</h1>
      </div>

      <div className="card p-8">
        <form action={createProduct} className="space-y-5">
          <div>
            <label className="form-label">Product Name</label>
            <input
              name="title"
              placeholder="e.g. Running Shoes"
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              placeholder="Describe the product..."
              rows={3}
              className="form-input resize-none"
            />
          </div>

          <div>
            <label className="form-label">Price ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
                className="form-input pl-7"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Shop</label>
            {shops.length === 0 ? (
              <p className="text-sm text-slate-400">
                No shops yet.{" "}
                <Link href="/admin/settings/new" className="text-indigo-600 hover:underline">
                  Create one first.
                </Link>
              </p>
            ) : (
              <select name="shopId" required className="form-input">
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-admin flex-1">
              Create Product
            </button>
            <Link href="/admin/products" className="btn-secondary flex-1 text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
