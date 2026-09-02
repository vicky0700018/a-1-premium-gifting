import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/admin";
import { inr, useStore } from "@/lib/store";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Manage Products | A-1 Dry Fruits Admin" },
      { name: "description", content: "Add, edit and manage the A-1 Dry Fruits product catalogue." },
      { property: "og:title", content: "Manage Products | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Product catalogue management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProducts,
});

type FormState = {
  id: string;
  name: string;
  categorySlug: string;
  description: string;
  price: string;
  mrp: string;
  weight: string;
  stock: string;
  image: string;
  origin: string;
  tags: string;
  benefits: string;
  organic: boolean;
  featured: boolean;
  bestseller: boolean;
};

const emptyForm: FormState = {
  id: "",
  name: "",
  categorySlug: "almonds",
  description: "",
  price: "",
  mrp: "",
  weight: "250g",
  stock: "50",
  image: "",
  origin: "",
  tags: "",
  benefits: "",
  organic: false,
  featured: false,
  bestseller: false,
};

function AdminProducts() {
  const { products, setProducts, categoryList, toast } = useStore();
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [form, setForm] = useState<FormState | null>(null);

  const list = products.filter(
    (p) =>
      (filterCat === "all" || p.categorySlug === filterCat) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const openNew = () => setForm({ ...emptyForm, image: products[0]?.images[0] ?? "" });

  const openEdit = (p: Product) =>
    setForm({
      id: p.id,
      name: p.name,
      categorySlug: p.categorySlug,
      description: p.description,
      price: String(p.availableWeights[0]!.price),
      mrp: String(p.availableWeights[0]!.mrp),
      weight: p.availableWeights[0]!.weight,
      stock: String(p.stock),
      image: p.images[0]!,
      origin: p.origin,
      tags: p.tags.join(", "),
      benefits: p.benefits.join(", "),
      organic: p.organic,
      featured: p.featured,
      bestseller: p.bestseller,
    });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (!form.name.trim() || !form.price || !form.mrp) return toast("Name, price and MRP are required");
    const price = Number(form.price);
    const mrp = Number(form.mrp);
    const category = categoryList.find((c) => c.slug === form.categorySlug)!;
    const weights = [
      { weight: form.weight, price, mrp },
      { weight: "500g", price: Math.round(price * 1.92), mrp: Math.round(mrp * 1.92) },
      { weight: "1kg", price: Math.round(price * 3.7), mrp: Math.round(mrp * 3.7) },
    ];

    if (form.id) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === form.id
            ? {
                ...p,
                name: form.name,
                category: category.name,
                categorySlug: category.slug,
                description: form.description,
                shortDescription: form.description.slice(0, 110),
                price,
                mrp,
                discount: Math.round(((mrp - price) / mrp) * 100),
                availableWeights: weights,
                stock: Number(form.stock),
                images: [form.image, ...p.images.slice(1)],
                origin: form.origin,
                tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
                benefits: form.benefits.split(",").map((t) => t.trim()).filter(Boolean),
                organic: form.organic,
                featured: form.featured,
                bestseller: form.bestseller,
              }
            : p,
        ),
      );
      toast("Product updated");
    } else {
      const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setProducts((prev) => [
        {
          id: `p${Date.now()}`,
          name: form.name,
          slug,
          category: category.name,
          categorySlug: category.slug,
          description: form.description,
          shortDescription: form.description.slice(0, 110),
          images: [form.image || category.image],
          price,
          mrp,
          discount: Math.round(((mrp - price) / mrp) * 100),
          rating: 4.5,
          reviewCount: 0,
          availableWeights: weights,
          stock: Number(form.stock),
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          bestseller: form.bestseller,
          featured: form.featured,
          organic: form.organic,
          origin: form.origin,
          benefits: form.benefits.split(",").map((t) => t.trim()).filter(Boolean),
          nutrition: [{ label: "Packed", value: "Fresh on order" }],
          packaging: "Resealable food-grade pouch.",
          storage: "Store in a cool, dry place.",
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      toast("Product added — live on the storefront");
    }
    setForm(null);
  };

  const patch = (id: string, data: Partial<Product>) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));

  return (
    <AdminLayout title="Products">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="field max-w-xs"
        />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="field w-auto">
          <option value="all">All categories</option>
          {categoryList.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="btn-primary ml-auto" onClick={openNew}>
          + Add Product
        </button>
      </div>

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Flags</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id} className="border-t border-border align-middle">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.name} loading="lazy" width={80} height={80} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="font-medium">{p.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
              <td className="px-4 py-3">{inr(p.price)}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => patch(p.id, { stock: p.stock > 0 ? 0 : 100 })}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    p.stock > 0 ? "bg-secondary/15 text-secondary" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => patch(p.id, { featured: !p.featured })}
                    className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      p.featured ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    Featured
                  </button>
                  <button
                    onClick={() => patch(p.id, { bestseller: !p.bestseller })}
                    className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      p.bestseller ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    Bestseller
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 text-xs font-semibold">
                  <button className="text-primary" onClick={() => openEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="text-destructive"
                    onClick={() => {
                      setProducts((prev) => prev.filter((x) => x.id !== p.id));
                      toast("Product deleted");
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
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="surface-card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6"
          >
            <h2 className="font-display text-xl font-semibold text-primary">
              {form.id ? "Edit Product" : "Add Product"}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Product Name" value={form.name} onChange={(v) => set("name", v)} />
              <label className="block text-sm">
                <Label text="Category" />
                <select
                  value={form.categorySlug}
                  onChange={(e) => set("categorySlug", e.target.value)}
                  className="field"
                >
                  {categoryList.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm sm:col-span-2">
                <Label text="Description" />
                <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className="field" />
              </label>
              <Input label="Price (base pack)" value={form.price} onChange={(v) => set("price", v)} />
              <Input label="MRP (base pack)" value={form.mrp} onChange={(v) => set("mrp", v)} />
              <Input label="Base Weight" value={form.weight} onChange={(v) => set("weight", v)} />
              <Input label="Stock" value={form.stock} onChange={(v) => set("stock", v)} />
              <Input label="Product Image URL" value={form.image} onChange={(v) => set("image", v)} />
              <Input label="Origin" value={form.origin} onChange={(v) => set("origin", v)} />
              <Input label="Tags (comma separated)" value={form.tags} onChange={(v) => set("tags", v)} />
              <Input label="Benefits (comma separated)" value={form.benefits} onChange={(v) => set("benefits", v)} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {(["organic", "featured", "bestseller"] as const).map((k) => (
                <label key={k} className="flex items-center gap-2 capitalize text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form[k]}
                    onChange={(e) => set(k, e.target.checked)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  {k}
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" className="btn-primary">
                {form.id ? "Save Changes" : "Add Product"}
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

function Label({ text }: { text: string }) {
  return <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{text}</span>;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <Label text={label} />
      <input value={value} onChange={(e) => onChange(e.target.value)} className="field" />
    </label>
  );
}
