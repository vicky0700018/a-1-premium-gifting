import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminCard, AdminLayout } from "@/components/admin";
import { inr, useStore } from "@/lib/store";
import type { GiftHamper } from "@/data/mock";

export const Route = createFileRoute("/admin/gift-hampers")({
  head: () => ({
    meta: [
      { title: "Gift Hampers | A-1 Dry Fruits Admin" },
      { name: "description", content: "Manage curated gift hampers, pricing and contents." },
      { property: "og:title", content: "Gift Hampers | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Gift hamper management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminHampers,
});

const blank: GiftHamper = {
  id: "",
  name: "",
  slug: "",
  description: "",
  contents: [],
  price: 1499,
  mrp: 1899,
  image: "",
  stock: 25,
  featured: false,
};

function AdminHampers() {
  const { hamperList, setHamperList, toast } = useStore();
  const [form, setForm] = useState<(GiftHamper & { contentsText?: string }) | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !form.name.trim()) return toast("Hamper name is required");
    const contents = (form.contentsText ?? form.contents.join(", "))
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const next: GiftHamper = {
      id: form.id || `g${Date.now()}`,
      name: form.name,
      slug,
      description: form.description,
      contents,
      price: form.price,
      mrp: form.mrp,
      image: form.image,
      stock: form.stock,
      featured: form.featured,
    };
    setHamperList((prev) => (form.id ? prev.map((h) => (h.id === form.id ? next : h)) : [...prev, next]));
    toast(form.id ? "Hamper updated" : "Hamper added");
    setForm(null);
  };

  return (
    <AdminLayout title="Gift Hampers">
      <div className="mb-4 flex justify-end">
        <button
          className="btn-primary"
          onClick={() => setForm({ ...blank, image: hamperList[0]?.image ?? "", contentsText: "" })}
        >
          + Add Hamper
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hamperList.map((h) => (
          <AdminCard key={h.id} className="overflow-hidden !p-0">
            <img src={h.image} alt={h.name} loading="lazy" width={600} height={400} className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-primary">{h.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                {h.contents.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
              <p className="mt-3 font-semibold text-primary">
                {inr(h.price)} <span className="text-xs font-normal text-muted-foreground line-through">{inr(h.mrp)}</span>
              </p>
              <p className="text-xs text-muted-foreground">Stock: {h.stock}</p>
              <div className="mt-4 flex items-center gap-3 text-xs font-semibold">
                <button
                  onClick={() => setHamperList((prev) => prev.map((x) => (x.id === h.id ? { ...x, featured: !x.featured } : x)))}
                  className={`rounded-full px-2.5 py-1 ${
                    h.featured ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  Featured
                </button>
                <button className="ml-auto text-primary" onClick={() => setForm({ ...h, contentsText: h.contents.join(", ") })}>
                  Edit
                </button>
                <button
                  className="text-destructive"
                  onClick={() => {
                    setHamperList((prev) => prev.filter((x) => x.id !== h.id));
                    toast("Hamper deleted");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setForm(null)}>
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="surface-card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6"
          >
            <h2 className="font-display text-xl font-semibold text-primary">
              {form.id ? "Edit Hamper" : "Add Hamper"}
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <Field label="Name">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field" />
              </Field>
              <Field label="Description">
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="field"
                />
              </Field>
              <Field label="Contents (comma separated)">
                <input
                  value={form.contentsText ?? ""}
                  onChange={(e) => setForm({ ...form, contentsText: e.target.value })}
                  className="field"
                />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Price">
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="field"
                  />
                </Field>
                <Field label="MRP">
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={(e) => setForm({ ...form, mrp: Number(e.target.value) })}
                    className="field"
                  />
                </Field>
                <Field label="Stock">
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="field"
                  />
                </Field>
              </div>
              <Field label="Image URL">
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="field" />
              </Field>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
