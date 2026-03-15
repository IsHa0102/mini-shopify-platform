import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function deleteProduct(id: string) {
  "use server";

  await prisma.product.delete({
    where: { id }
  });

  redirect("/admin/products");
}

export default async function DeleteProduct({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    redirect("/admin/products");
  }

  return (
    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Delete Product
      </h1>

      <p className="mb-6">
        Are you sure you want to delete <b>{product.title}</b>?
      </p>

      <div className="flex gap-4">

        <Link
          href="/admin/products"
          className="px-4 py-2 border border-gray-500 rounded"
        >
          Cancel
        </Link>

        <form action={deleteProduct.bind(null, id)}>
          <button className="px-4 py-2 bg-red-600 rounded">
            Delete Product
          </button>
        </form>

      </div>

    </div>
  );
}

