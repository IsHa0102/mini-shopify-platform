import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createShop(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  await prisma.shop.create({ data: { name, slug } });
  redirect("/admin/settings");
}

export default function CreateShopPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/admin/settings" className="text-slate-400 hover:text-slate-600 transition text-sm">
          ← Shops
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="page-title text-xl">New Shop</h1>
      </div>

      <div className="card p-8">
        <form action={createShop} className="space-y-5">
          <div>
            <label className="form-label">Shop Name</label>
            <input
              name="name"
              placeholder="e.g. My Awesome Store"
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Slug</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">/store/</span>
              <input
                name="slug"
                placeholder="my-awesome-store"
                required
                className="form-input pl-16"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Lowercase letters, numbers, and hyphens only.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-admin flex-1">
              Create Shop
            </button>
            <Link href="/admin/settings" className="btn-secondary flex-1 text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
