import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { SiteLayout } from "@/components/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A-1 Dry Fruits | Premium Dry Fruits, Nuts & Gift Hampers" },
      {
        name: "description",
        content:
          "Shop premium almonds, cashews, pistachios, dates, seeds and spices from A-1 Dry Fruits, Crawford Market Mumbai. Trusted since 2004. Bulk & corporate gifting available.",
      },
      { property: "og:title", content: "A-1 Dry Fruits | Premium Dry Fruits, Nuts & Gift Hampers" },
      {
        property: "og:description",
        content: "Premium nuts, dried fruits, seeds and spices, freshly packed in South Mumbai since 2004.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  { title: "Premium Quality", text: "Carefully selected high-grade products, graded by hand." },
  { title: "Freshly Packed", text: "Packed in small batches to preserve freshness and taste." },
  { title: "Trusted Since 2004", text: "Serving South Mumbai from Mahatma Phule Market." },
  { title: "Bulk & Corporate Orders", text: "Custom solutions for events, weddings and businesses." },
];

function Home() {
  const { products, categoryList, bannerList, settings } = useStore();
  const banner = bannerList.find((b) => b.active) ?? bannerList[0]!;
  const bestSellers = products.filter((p) => p.bestseller || p.featured).slice(0, 12);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-[var(--color-ivory)]">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
              Since 2004
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
              {banner.title || settings.heroHeading}
            </h1>
            <div className="gold-rule my-6" />
            <p className="max-w-lg text-base text-muted-foreground">{banner.subtitle || settings.heroSubtext}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/gift-hampers" className="btn-outline">
                Explore Gift Hampers
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["20+", "Years of trust"],
                ["120+", "Product varieties"],
                ["500+", "Corporate clients"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-semibold text-primary">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -right-6 -top-6 hidden h-32 w-32 rounded-full bg-accent/20 blur-2xl lg:block" />
            <img
              src={heroImage}
              alt="Premium almonds, pistachios, cashews, walnuts and dates in wooden bowls"
              width={1408}
              height={1104}
              className="relative w-full rounded-3xl border border-accent/30 object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-primary px-5 py-3 text-primary-foreground shadow-lg">
              <p className="text-xs uppercase tracking-widest text-accent">Crawford Market</p>
              <p className="text-sm font-semibold">Freshly packed daily</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="surface-card p-6">
            <div className="gold-rule" />
            <h3 className="mt-4 font-display text-lg font-semibold text-primary">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-[var(--color-ivory)] py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Shop by category</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                Everything from the counter, delivered
              </h2>
            </div>
            <Link to="/shop" className="btn-outline">
              View all products
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categoryList
              .filter((c) => c.active)
              .map((c) => (
                <Link
                  key={c.id}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="surface-card group overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold text-primary">{c.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                    <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-accent">
                      Shop Now →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Best sellers</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Loved by South Mumbai
            </h2>
          </div>
          <Link to="/offers" className="btn-outline">
            See running offers
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Corporate &amp; bulk</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Premium gifting for every occasion
            </h2>
            <p className="mt-4 max-w-lg text-sm text-primary-foreground/75">
              Bespoke packaging, private-label boxes and wholesale rates for weddings, festivals and corporate
              events — assembled and dispatched from our Crawford Market facility.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/corporate-orders" className="btn-gold">
                Request a Bulk Quote
              </Link>
              <Link to="/gift-hampers" className="btn-base border border-primary-foreground/30 text-primary-foreground">
                View Hampers
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Corporate Gifting", "Wedding Orders", "Festival Orders", "Private Label"].map((t) => (
              <div key={t} className="rounded-2xl border border-primary-foreground/20 p-5">
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="mt-1 text-xs text-primary-foreground/70">Custom quantities &amp; packaging</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
