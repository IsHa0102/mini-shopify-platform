import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function updateProduct(id: string, formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.product.update({ where: { id }, data: { title, description, price } });
  redirect("/admin/products");
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) redirect("/admin/products");

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/admin/products" className="text-slate-400 hover:text-slate-600 transition text-sm">
          ← Products
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="page-title text-xl">Edit Product</h1>
      </div>

      <div className="card p-8">
        <form action={updateProduct.bind(null, id)} className="space-y-5">
          <div>
            <label className="form-label">Product Name</label>
            <input
              name="title"
              defaultValue={product!.title}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              defaultValue={product!.description ?? ""}
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
                defaultValue={product!.price}
                required
                className="form-input pl-7"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-admin flex-1">
              Save Changes
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
