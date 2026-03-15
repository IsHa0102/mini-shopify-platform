import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

async function createShop(formData: FormData) {
"use server";

const name = formData.get("name") as string;
const slug = formData.get("slug") as string;

await prisma.shop.create({
data: {
name,
slug
}
});

redirect("/admin/settings");
}

export default function CreateShopPage() {
return ( <div className="max-w-xl mx-auto px-6 py-12">


  <h1 className="text-4xl font-bold mb-8">
    Create Shop
  </h1>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

    <form action={createShop} className="space-y-6">

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Shop Name
        </label>

        <input
          name="name"
          placeholder="My Awesome Store"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Store Slug
        </label>

        <input
          name="slug"
          placeholder="my-awesome-store"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none transition"
        />
      </div>

      <button
        className="w-full bg-emerald-500 text-black py-3 rounded-xl font-semibold hover:bg-emerald-400 transition"
      >
        Create Shop
      </button>

    </form>

  </div>

</div>


);
}
