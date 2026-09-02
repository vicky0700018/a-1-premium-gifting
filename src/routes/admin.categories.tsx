import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/admin";
import { useStore } from "@/lib/store";
import type { Category } from "@/data/categories";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Manage Categories | A-1 Dry Fruits Admin" },
      { name: "description", content: "Create, edit and toggle product categories for the storefront." },
      { property: "og:title", content: "Manage Categories | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Category management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCategories,
});

const blank: Category = { id: "", name: "", slug: "", description: "", image: "", active: true };

function AdminCategories() {
  const { categoryList, setCategoryList, toast } = useStore();
  const [form, setForm] = useState<Category | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !form.name.trim()) return toast("Category name is required");
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (form.id) {
      setCategoryList((prev) => prev.map((c) => (c.id === form.id ? { ...form, slug } : c)));
      toast("Category updated");
    } else {
      setCategoryList((prev) => [...prev, { ...form, slug, id: `c${Date.now()}` }]);
      toast("Category added");
    }
    setForm(null);
  };

  return (
    <AdminLayout title="Categories">
      <div className="mb-4 flex justify-end">
        <button className="btn-primary" onClick={() => setForm({ ...blank, image: categoryList[0]?.image ?? "" })}>
          + Add Category
        </button>
      </div>

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((c) => (
            <tr key={c.id} className="border-t border-border">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={c.image} alt={c.name} loading="lazy" width={80} height={80} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="font-medium">{c.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.slug}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.description}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() =>
                    setCategoryList((prev) => prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)))
                  }
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    c.active ? "bg-secondary/15 text-secondary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.active ? "Enabled" : "Disabled"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 text-xs font-semibold">
                  <button className="text-primary" onClick={() => setForm(c)}>
                    Edit
                  </button>
                  <button
                    className="text-destructive"
                    onClick={() => {
                      setCategoryList((prev) => prev.filter((x) => x.id !== c.id));
                      toast("Category deleted");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      {form && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setForm(null)}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="surface-card w-full max-w-lg p-6">
            <h2 className="font-display text-xl font-semibold text-primary">
              {form.id ? "Edit Category" : "Add Category"}
            </h2>
            <div className="mt-5 space-y-4">
              {(
                [
                  ["Name", "name"],
                  ["Slug", "slug"],
                  ["Description", "description"],
                  ["Image URL", "image"],
                ] as const
              ).map(([label, key]) => (
                <label key={key} className="block text-sm">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="field"
                  />
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Enabled on storefront
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" className="btn-primary">
                Save
              </button>
              <button type="button" className="btn-ghost" onClick={() => setForm(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
