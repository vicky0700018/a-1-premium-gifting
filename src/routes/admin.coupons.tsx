import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/admin";
import { useStore } from "@/lib/store";
import type { Coupon } from "@/data/mock";

export const Route = createFileRoute("/admin/coupons")({
  head: () => ({
    meta: [
      { title: "Coupons | A-1 Dry Fruits Admin" },
      { name: "description", content: "Create and manage discount coupons for the A-1 Dry Fruits store." },
      { property: "og:title", content: "Coupons | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Discount coupon management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCoupons,
});

const blank: Coupon = { id: "", code: "", discount: 10, minOrder: 999, expiry: "2026-12-31", active: true };

function AdminCoupons() {
  const { couponList, setCouponList, toast } = useStore();
  const [form, setForm] = useState<Coupon | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !form.code.trim()) return toast("Coupon code is required");
    const code = form.code.toUpperCase().replace(/\s+/g, "");
    if (form.id) {
      setCouponList((prev) => prev.map((c) => (c.id === form.id ? { ...form, code } : c)));
      toast("Coupon updated");
    } else {
      setCouponList((prev) => [...prev, { ...form, code, id: `cp${Date.now()}` }]);
      toast("Coupon created");
    }
    setForm(null);
  };

  return (
    <AdminLayout title="Coupons">
      <div className="mb-4 flex justify-end">
        <button className="btn-primary" onClick={() => setForm({ ...blank })}>
          + Add Coupon
        </button>
      </div>

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3">Min Order</th>
            <th className="px-4 py-3">Expiry</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {couponList.map((c) => (
            <tr key={c.id} className="border-t border-border">
              <td className="px-4 py-3 font-mono font-semibold">{c.code}</td>
              <td className="px-4 py-3">{c.discount}%</td>
              <td className="px-4 py-3">₹{c.minOrder}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.expiry}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => setCouponList((prev) => prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)))}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    c.active ? "bg-secondary/15 text-secondary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.active ? "Active" : "Inactive"}
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
                      setCouponList((prev) => prev.filter((x) => x.id !== c.id));
                      toast("Coupon deleted");
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
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="surface-card w-full max-w-md p-6">
            <h2 className="font-display text-xl font-semibold text-primary">
              {form.id ? "Edit Coupon" : "Add Coupon"}
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <Field label="Coupon Code">
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="field" />
              </Field>
              <Field label="Discount (%)">
                <input
                  type="number"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                  className="field"
                />
              </Field>
              <Field label="Minimum Order (₹)">
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
                  className="field"
                />
              </Field>
              <Field label="Expiry Date">
                <input
                  type="date"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                  className="field"
                />
              </Field>
              <label className="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Active
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
