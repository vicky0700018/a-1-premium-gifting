import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Premium Dry Fruits, Nuts & Seeds | A-1 Dry Fruits" },
      {
        name: "description",
        content:
          "Browse almonds, cashews, pistachios, walnuts, dates, raisins, seeds and spices with filters for price, weight, rating and offers.",
      },
      { property: "og:title", content: "Shop Premium Dry Fruits, Nuts & Seeds | A-1 Dry Fruits" },
      {
        property: "og:description",
        content: "Filter, sort and shop premium dry fruits freshly packed in Mumbai.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <SiteLayout>
      <section className="bg-[var(--color-ivory)] py-10">
        <div className="container-page">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Shop</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Premium dry fruits, nuts &amp; seeds
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Every pack is graded, cleaned and sealed at our Crawford Market facility before it ships.
          </p>
        </div>
      </section>
      <div className="container-page py-10">
        <ProductGrid />
      </div>
    </SiteLayout>
  );
}
