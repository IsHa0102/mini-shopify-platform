import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function deleteProduct(id: string) {
  "use server";
  await prisma.product.delete({ where: { id } });
  redirect("/admin/products");
}

export default async function DeleteProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) redirect("/admin/products");

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl mx-auto mb-5">
          🗑️
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Delete product?
        </h1>

        <p className="text-slate-500 text-sm mb-8">
          <span className="font-semibold text-slate-700">{product!.title}</span>{" "}
          will be permanently removed. This cannot be undone.
        </p>

        <div className="flex gap-3">
          <Link href="/admin/products" className="btn-secondary flex-1">
            Cancel
          </Link>

          <form action={deleteProduct.bind(null, id)} className="flex-1">
            <button type="submit" className="btn-danger w-full">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
