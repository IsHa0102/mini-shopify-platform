import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

async function createProduct(formData: FormData) {
"use server";

const title = formData.get("title") as string;
const description = formData.get("description") as string;
const price = Number(formData.get("price"));
const shopId = formData.get("shopId") as string;

await prisma.product.create({
data: {
title,
description,
price,
shopId
}
});

redirect("/admin/products");
}

export default async function NewProductPage() {
const shops = await prisma.shop.findMany();

return ( <div className="max-w-xl mx-auto px-6 py-12">


  <h1 className="text-4xl font-bold mb-8">
    Add Product
  </h1>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

    <form action={createProduct} className="space-y-6">

      {/* Product Name */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Product Name
        </label>

        <input
          name="title"
          placeholder="Running Shoes"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none transition"
        />
      </div>

      {/* Description */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Product description..."
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none transition"
        />
      </div>

      {/* Price */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Price
        </label>

        <input
          name="price"
          type="number"
          placeholder="99"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none transition"
        />
      </div>

      {/* Shop Selector */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Shop
        </label>

        <select
          name="shopId"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none transition"
        >
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}

      <button
        className="w-full bg-emerald-500 text-black py-3 rounded-xl font-semibold hover:bg-emerald-400 transition"
      >
        Create Product
      </button>

    </form>

  </div>

</div>

);
}
