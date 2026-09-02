import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminCard, AdminLayout } from "@/components/admin";
import { useStore } from "@/lib/store";
import type { Banner } from "@/data/mock";

export const Route = createFileRoute("/admin/banners")({
  head: () => ({
    meta: [
      { title: "Banners | A-1 Dry Fruits Admin" },
      { name: "description", content: "Manage homepage hero banners and promotional slides." },
      { property: "og:title", content: "Banners | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Homepage banner management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminBanners,
});

const blank: Banner = {
  id: "",
  title: "",
  subtitle: "",
  cta: "Shop Now",
  ctaLink: "/shop",
  image: "",
  active: true,
};

function AdminBanners() {
  const { bannerList, setBannerList, toast } = useStore();
  const [form, setForm] = useState<Banner | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !form.title.trim()) return toast("Banner title is required");
    if (form.id) {
      setBannerList((prev) => prev.map((b) => (b.id === form.id ? form : b)));
      toast("Banner updated");
    } else {
      setBannerList((prev) => [...prev, { ...form, id: `b${Date.now()}` }]);
      toast("Banner added");
    }
    setForm(null);
  };

  return (
    <AdminLayout title="Banners">
      <div className="mb-4 flex justify-end">
        <button className="btn-primary" onClick={() => setForm({ ...blank, image: bannerList[0]?.image ?? "" })}>
          + Add Banner
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {bannerList.map((b) => (
          <AdminCard key={b.id} className="overflow-hidden !p-0">
            <img src={b.image} alt={b.title} loading="lazy" width={800} height={400} className="h-44 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-primary">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.subtitle}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                CTA: {b.cta} → {b.ctaLink}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
                <button
                  onClick={() => setBannerList((prev) => prev.map((x) => (x.id === b.id ? { ...x, active: !x.active } : x)))}
                  className={`rounded-full px-2.5 py-1 ${
                    b.active ? "bg-secondary/15 text-secondary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {b.active ? "Active" : "Hidden"}
                </button>
                <button className="ml-auto text-primary" onClick={() => setForm(b)}>
                  Edit
                </button>
                <button
                  className="text-destructive"
                  onClick={() => {
                    setBannerList((prev) => prev.filter((x) => x.id !== b.id));
                    toast("Banner deleted");
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
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="surface-card w-full max-w-lg p-6">
            <h2 className="font-display text-xl font-semibold text-primary">
              {form.id ? "Edit Banner" : "Add Banner"}
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              {(
                [
                  ["Title", "title"],
                  ["Subtitle", "subtitle"],
                  ["CTA Label", "cta"],
                  ["CTA Link", "ctaLink"],
                  ["Image URL", "image"],
                ] as const
              ).map(([label, key]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="field" />
                </label>
              ))}
              <label className="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Show on homepage
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
