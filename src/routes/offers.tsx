import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Dry Fruit Offers & Combo Deals | A-1 Dry Fruits" },
      {
        name: "description",
        content:
          "Save up to 20% on premium dry fruits, combo packs, bulk savings and festive gift hamper offers at A-1 Dry Fruits, Mumbai.",
      },
      { property: "og:title", content: "Dry Fruit Offers & Combo Deals | A-1 Dry Fruits" },
      { property: "og:description", content: "Running discounts on almonds, pistachios, dates and hampers." },
    ],
  }),
  component: Offers,
});

const promos = [
  {
    title: "Up to 20% Off Selected Dry Fruits",
    text: "Anjeer, cranberries and Ajwa dates at their lowest price this season.",
    code: "FESTIVE20",
  },
  {
    title: "Combo Offers",
    text: "Almonds + Cashews + Raisins bundle at a flat combo price.",
    code: "DRYFRUIT15",
  },
  {
    title: "Buy More, Save More",
    text: "Extra 8% off on carts above ₹4,999 — perfect for monthly stocking.",
    code: "WELCOME10",
  },
  {
    title: "Festive Specials",
    text: "Diwali and Eid hampers with complimentary personalised cards.",
    code: "FESTIVE20",
  },
  {
    title: "Gift Hamper Offers",
    text: "Free premium ribbon and foiling on orders of 25 hampers or more.",
    code: "DRYFRUIT15",
  },
];

function Offers() {
  const { products, couponList, toast } = useStore();
  const deals = products.filter((p) => p.discount >= 18).slice(0, 8);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Offers"
        title="Premium quality, honest pricing"
        subtitle="Running discounts, combos and festive bundles across our most-loved packs."
      />

      <div className="container-page py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((p) => (
            <div key={p.title} className="surface-card flex flex-col p-6">
              <div className="gold-rule" />
              <h2 className="mt-4 font-display text-xl font-semibold text-primary">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              <button
                onClick={() => {
                  void navigator.clipboard?.writeText(p.code);
                  toast(`Coupon ${p.code} copied`);
                }}
                className="btn-ghost mt-4 w-fit border-dashed !border-accent font-mono"
              >
                {p.code}
              </button>
            </div>
          ))}
          <div className="surface-card flex flex-col justify-center bg-primary p-6 text-primary-foreground">
            <h2 className="font-display text-xl font-semibold">Active coupon codes</h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              {couponList
                .filter((c) => c.active)
                .map((c) => (
                  <li key={c.id} className="flex justify-between gap-3">
                    <span className="font-mono text-accent">{c.code}</span>
                    <span>
                      {c.discount}% off above ₹{c.minOrder.toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
            </ul>
            <Link to="/shop" className="btn-gold mt-6 w-fit">
              Shop the deals
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-semibold text-primary">Biggest savings right now</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
