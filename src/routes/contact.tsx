import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SiteLayout } from "@/components/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact A-1 Dry Fruits | Crawford Market, Mumbai" },
      {
        name: "description",
        content:
          "Visit A-1 Dry Fruits at Shop No. 160, Mahatma Phule Market, Fort, Mumbai 400001. Call +91 88797 23634 or email support.a-1dryfruits@gmail.com.",
      },
      { property: "og:title", content: "Contact A-1 Dry Fruits | Crawford Market, Mumbai" },
      { property: "og:description", content: "Store address, phone, business hours and enquiry form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { settings, toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 3 || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      return toast("Please fill in your name, a valid email and a short message");
    }
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    toast("Message sent — we'll reply within one working day");
  };

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Mahatma+Phule+Market+Crawford+Market+Fort+Mumbai+400001";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Come see us at Crawford Market"
        subtitle="Walk in for grade selection and samples, or reach our team for orders, bulk quotes and delivery support."
      />

      <div className="container-page grid gap-8 py-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <h2 className="font-display text-xl font-semibold text-primary">A-1 Dry Fruits</h2>
            <div className="gold-rule my-3" />
            <p className="text-sm text-muted-foreground">
              Shop No. 160, Mahatma Phule Market (Crawford Market),
              <br />
              1st Lane, Opposite Badshah Cold Drink,
              <br />
              Dhobi Talao, CSMT Area,
              <br />
              Fort, Mumbai, Maharashtra 400001
            </p>
            <p className="mt-4 text-sm">
              <strong className="text-foreground">Phone:</strong>{" "}
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-primary hover:text-accent">
                {settings.phone}
              </a>
            </p>
            <p className="text-sm">
              <strong className="text-foreground">Email:</strong>{" "}
              <a href={`mailto:${settings.email}`} className="break-all text-primary hover:text-accent">
                {settings.email}
              </a>
            </p>
          </div>

          <div className="surface-card p-6">
            <h2 className="font-display text-xl font-semibold text-primary">Business Hours</h2>
            <div className="gold-rule my-3" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Monday – Saturday</span> <span className="text-foreground">9:30 AM – 8:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> <span className="text-foreground">10:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Bulk desk</span> <span className="text-foreground">10:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="surface-card overflow-hidden">
            <div className="relative flex h-56 items-center justify-center bg-primary text-primary-foreground">
              <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,transparent,transparent_18px,var(--color-accent)_18px,var(--color-accent)_19px)]" />
              <div className="relative text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Location</p>
                <p className="mt-2 font-display text-xl font-semibold">Mahatma Phule Market, Fort</p>
                <p className="text-xs text-primary-foreground/70">2 min walk from CSMT station</p>
              </div>
            </div>
            <div className="p-5">
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-gold">
                Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="surface-card h-fit p-6">
          <h2 className="font-display text-xl font-semibold text-primary">Send us a message</h2>
          <div className="gold-rule my-3" />
          {sent ? (
            <div className="py-10 text-center">
              <p className="font-display text-2xl font-semibold text-primary">Thank you!</p>
              <p className="mt-2 text-sm text-muted-foreground">Your message has reached our team.</p>
              <button className="btn-outline mt-5" onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <input
                className="field"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="field"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="field"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <textarea
                className="field"
                rows={5}
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
