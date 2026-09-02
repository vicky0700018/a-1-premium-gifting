import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminCard, AdminLayout } from "@/components/admin";
import { useStore } from "@/lib/store";
import type { Settings } from "@/data/mock";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Store Settings | A-1 Dry Fruits Admin" },
      { name: "description", content: "Update store contact details, delivery charges and homepage copy." },
      { property: "og:title", content: "Store Settings | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Store configuration." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const { settings, setSettings, toast } = useStore();
  const [draft, setDraft] = useState<Settings>(settings);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <AdminLayout title="Settings">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSettings(draft);
          toast("Settings saved — storefront updated");
        }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <AdminCard>
          <h2 className="font-display text-lg font-semibold text-primary">Business Details</h2>
          <div className="mt-4 space-y-4 text-sm">
            <Field label="Business Name">
              <input value={draft.businessName} onChange={(e) => set("businessName", e.target.value)} className="field" />
            </Field>
            <Field label="Phone">
              <input value={draft.phone} onChange={(e) => set("phone", e.target.value)} className="field" />
            </Field>
            <Field label="Email">
              <input value={draft.email} onChange={(e) => set("email", e.target.value)} className="field" />
            </Field>
            <Field label="Address">
              <textarea rows={3} value={draft.address} onChange={(e) => set("address", e.target.value)} className="field" />
            </Field>
            <Field label="Currency Symbol">
              <input value={draft.currency} onChange={(e) => set("currency", e.target.value)} className="field" />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-display text-lg font-semibold text-primary">Storefront & Delivery</h2>
          <div className="mt-4 space-y-4 text-sm">
            <Field label="Delivery Charge (₹)">
              <input
                type="number"
                value={draft.deliveryCharge}
                onChange={(e) => set("deliveryCharge", Number(e.target.value))}
                className="field"
              />
            </Field>
            <Field label="Free Delivery Above (₹)">
              <input
                type="number"
                value={draft.freeDeliveryThreshold}
                onChange={(e) => set("freeDeliveryThreshold", Number(e.target.value))}
                className="field"
              />
            </Field>
            <Field label="Announcement Bar">
              <input value={draft.announcement} onChange={(e) => set("announcement", e.target.value)} className="field" />
            </Field>
            <Field label="Hero Heading">
              <input value={draft.heroHeading} onChange={(e) => set("heroHeading", e.target.value)} className="field" />
            </Field>
            <Field label="Hero Subtext">
              <textarea rows={2} value={draft.heroSubtext} onChange={(e) => set("heroSubtext", e.target.value)} className="field" />
            </Field>
            <Field label="Footer Text">
              <input value={draft.footerText} onChange={(e) => set("footerText", e.target.value)} className="field" />
            </Field>
          </div>
        </AdminCard>

        <div className="lg:col-span-2">
          <button type="submit" className="btn-primary">
            Save Settings
          </button>
        </div>
      </form>
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
