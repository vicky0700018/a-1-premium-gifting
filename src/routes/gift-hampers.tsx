import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SiteLayout } from "@/components/site";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/gift-hampers")({
  head: () => ({
    meta: [
      { title: "Premium Dry Fruit Gift Hampers | A-1 Dry Fruits" },
      {
        name: "description",
        content:
          "Festive, wedding and corporate dry fruit gift hampers, hand-assembled in Mumbai with custom packaging and branding.",
      },
      { property: "og:title", content: "Premium Dry Fruit Gift Hampers | A-1 Dry Fruits" },
      { property: "og:description", content: "Luxury hampers of almonds, pistachios, dates and saffron." },
    ],
  }),
  component: GiftHampers,
});

function GiftHampers() {
  const { hamperList, addToCart, toast } = useStore();
  const [enquiry, setEnquiry] = useState<string | null>(null);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gifting"
        title="Hampers that carry your name beautifully"
        subtitle="Hand-assembled boxes of premium nuts, dates and saffron — customised with your greeting, ribbon or corporate branding."
      />
      <div className="container-page py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hamperList.map((h) => (
            <article key={h.id} className="surface-card group overflow-hidden">
              <img
                src={h.image}
                alt={h.name}
                loading="lazy"
                width={900}
                height={900}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                {h.featured && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase text-accent-foreground">
                    Featured
                  </span>
                )}
                <h2 className="mt-3 font-display text-xl font-semibold text-primary">{h.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {h.contents.map((c) => (
                    <li key={c}>◆ {c}</li>
                  ))}
                </ul>
                <p className="mt-4 font-display text-xl font-semibold text-primary">
                  {inr(h.price)}{" "}
                  <span className="text-sm font-normal text-muted-foreground line-through">{inr(h.mrp)}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Customisable: ribbon colour, greeting card, logo foiling
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    className="btn-primary !px-4 !py-2 !text-xs"
                    onClick={() =>
                      addToCart({
                        productId: h.id,
                        slug: "signature-festive-hamper-box",
                        name: h.name,
                        image: h.image,
                        weight: "1 box",
                        price: h.price,
                        mrp: h.mrp,
                        qty: 1,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                  <button className="btn-ghost !px-4 !py-2 !text-xs" onClick={() => setEnquiry(h.name)}>
                    Enquire Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="surface-card mt-14 flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-primary">Need 100+ hampers?</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Our team handles bespoke packaging, private-label boxes and phased delivery for weddings and corporate
            events across Mumbai.
          </p>
          <Link to="/corporate-orders" className="btn-gold">
            Request a Bulk Quote
          </Link>
        </div>
      </div>

      {enquiry && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setEnquiry(null)}>
          <div className="surface-card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-semibold text-primary">Enquire: {enquiry}</h3>
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setEnquiry(null);
                toast("Enquiry received — our team will call you shortly.");
              }}
            >
              <input required placeholder="Your name" className="field" />
              <input required placeholder="Phone number" className="field" />
              <input required placeholder="Quantity needed" className="field" />
              <button type="submit" className="btn-primary w-full">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
