import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SiteLayout } from "@/components/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/corporate-orders")({
  head: () => ({
    meta: [
      { title: "Corporate & Bulk Dry Fruit Gifting | A-1 Dry Fruits" },
      {
        name: "description",
        content:
          "Corporate gifting, wedding and festival bulk dry fruit orders with bespoke packaging and private label options from A-1 Dry Fruits, Mumbai.",
      },
      { property: "og:title", content: "Corporate & Bulk Dry Fruit Gifting | A-1 Dry Fruits" },
      { property: "og:description", content: "Bespoke packaging and wholesale rates for businesses and events." },
    ],
  }),
  component: Corporate,
});

const services = [
  { title: "Corporate Gifting", text: "Client and employee boxes with branded lids, cards and foiling." },
  { title: "Wedding Orders", text: "Shagun boxes and trays from 50 units, with phased delivery." },
  { title: "Festival Orders", text: "Diwali, Eid and New Year hampers in your budget bracket." },
  { title: "Bulk Dry Fruits", text: "Wholesale kilos of almonds, cashews, pista and dates at trade rates." },
  { title: "Custom Packaging", text: "Rigid boxes, jars, pouches, ribbons and personalised inserts." },
  { title: "Private Label", text: "Your brand on our packaging, with consistent grade and supply." },
];

const empty = {
  name: "",
  company: "",
  phone: "",
  email: "",
  eventType: "Corporate Gifting",
  quantity: "",
  requiredDate: "",
  requirement: "",
  message: "",
};

function Corporate() {
  const { setInquiryList, toast } = useStore();
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs["name"] = "Enter your name";
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) errs["phone"] = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs["email"] = "Enter a valid email";
    if (!form.quantity.trim()) errs["quantity"] = "Approximate quantity helps us quote";
    setErrors(errs);
    if (Object.keys(errs).length) return toast("Please correct the highlighted fields");

    setInquiryList((prev) => [
      {
        id: `BQ-${Math.floor(2000 + Math.random() * 8000)}`,
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        eventType: form.eventType,
        quantity: form.quantity,
        requiredDate: form.requiredDate || "To be confirmed",
        requirement: form.requirement,
        message: form.message,
        status: "New" as const,
      },
      ...prev,
    ]);
    setDone(true);
    setForm(empty);
    toast("Bulk inquiry submitted successfully");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="B2B & Bulk"
        title="Premium Gifting for Every Occasion"
        subtitle="From 50-box wedding shagun to 5,000-unit corporate programmes — sourced, packed and delivered from Crawford Market."
      />

      <section className="container-page grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="surface-card p-6">
            <div className="gold-rule" />
            <h2 className="mt-4 font-display text-lg font-semibold text-primary">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-[var(--color-ivory)] py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Enquiry</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary">Tell us what you need</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Share your requirement and our team responds with a quote, samples and a packing timeline — usually
              within one working day.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>Direct line: +91 88797 23634</p>
              <p>Email: support.a-1dryfruits@gmail.com</p>
              <p>Minimum bulk order: 25 kg or 50 boxes</p>
            </div>
          </div>

          <div className="surface-card p-6">
            {done ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-xl text-secondary">
                  ✓
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-primary">Inquiry received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you. Our bulk desk will call you on the number provided.
                </p>
                <button className="btn-outline mt-6" onClick={() => setDone(false)}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <F label="Name" value={form.name} onChange={(v) => set("name", v)} error={errors["name"]} />
                <F label="Company Name" value={form.company} onChange={(v) => set("company", v)} />
                <F label="Phone" value={form.phone} onChange={(v) => set("phone", v)} error={errors["phone"]} />
                <F label="Email" value={form.email} onChange={(v) => set("email", v)} error={errors["email"]} />
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Event Type
                  </span>
                  <select value={form.eventType} onChange={(e) => set("eventType", e.target.value)} className="field">
                    {["Corporate Gifting", "Wedding", "Festival", "Bulk Dry Fruits", "Private Label"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <F label="Quantity" value={form.quantity} onChange={(v) => set("quantity", v)} error={errors["quantity"]} />
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Required Date
                  </span>
                  <input
                    type="date"
                    value={form.requiredDate}
                    onChange={(e) => set("requiredDate", e.target.value)}
                    className="field"
                  />
                </label>
                <F label="Product Requirement" value={form.requirement} onChange={(v) => set("requirement", v)} />
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="field"
                  />
                </label>
                <button type="submit" className="btn-primary sm:col-span-2">
                  Submit Bulk Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function F({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="field" />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
