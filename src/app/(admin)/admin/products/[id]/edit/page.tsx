import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

async function updateProduct(id: string, formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.product.update({
    where: { id },
    data: { title, description, price }
  });

  redirect("/admin/products");
}

export default async function EditProductPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  return (
    <form action={updateProduct.bind(null, params.id)} className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <input
        name="name"
        defaultValue={product?.name}
        className="w-full p-2 bg-slate-900 rounded"
      />

      <textarea
        name="description"
        defaultValue={product?.description}
        className="w-full p-2 bg-slate-900 rounded"
      />

      <input
        name="price"
        type="number"
        defaultValue={product?.price}
        className="w-full p-2 bg-slate-900 rounded"
      />

      <button className="bg-blue-500 px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}