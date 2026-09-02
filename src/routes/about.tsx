import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import spices from "@/assets/spices.jpg";
import { SiteLayout } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About A-1 Dry Fruits | Trusted Since 2004" },
      {
        name: "description",
        content:
          "A-1 Dry Fruits began in 2004 under Mr. Bban Pawar at Mahatma Phule (Crawford) Market and is today a premier South Mumbai supplier of nuts, dried fruits and spices.",
      },
      { property: "og:title", content: "About A-1 Dry Fruits | Trusted Since 2004" },
      {
        property: "og:description",
        content: "Two decades of premium sourcing, freshness and trust from Crawford Market, Mumbai.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  { title: "Quality", text: "Every lot is graded by hand before it reaches the shelf or the box." },
  { title: "Freshness", text: "Small-batch packing means stock moves fast and never sits." },
  { title: "Trust", text: "Two decades of families and businesses who buy from us on a name alone." },
  { title: "B2B Expertise", text: "Wholesale volumes, contracted rates and reliable festive timelines." },
  { title: "Premium Sourcing", text: "Direct imports from Chile, Iran, Jordan, Afghanistan and California." },
  { title: "Custom Gifting", text: "Bespoke hampers, private-label boxes and personalised presentation." },
];

function About() {
  return (
    <SiteLayout>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Our story</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Established in 2004, on the lanes of Crawford Market
            </h1>
            <p className="mt-5 text-sm text-primary-foreground/80">
              A-1 Dry Fruits was founded in 2004 under the leadership of Mr. Bban Pawar, with a single counter at
              Mahatma Phule Market. What began as a small shop selling almonds and cashews to neighbourhood families
              has grown into a premier supplier of high-grade nuts, dried fruits and spices in South Mumbai.
            </p>
          </div>
          <img
            src={heroImage}
            alt="Premium dry fruits displayed in wooden bowls"
            loading="lazy"
            width={1408}
            height={1104}
            className="w-full rounded-3xl border border-accent/30 object-cover"
          />
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold text-primary">
            From a market counter to a trusted supply partner
          </h2>
          <div className="gold-rule my-4" />
          <p className="text-sm text-muted-foreground">
            Operating from the historic Mahatma Phule (Crawford) Market, we supply premium everyday health essentials
            — Chilean walnuts, Iranian pistachios, California almonds, W320 cashews, imported dates, organic seeds,
            dried fruits and premium spices. Every consignment passes through the same routine our customers have
            trusted for twenty years: inspect, grade, clean, pack fresh.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Alongside retail, our B2B desk handles bespoke packaging, luxury gift hampers, custom bulk orders,
            corporate event gifting, wedding gifting and festival programmes for clients across Mumbai. Zakir and the
            team personally oversee grade selection for every bulk order, because a hamper carries the client's name
            before it carries ours.
          </p>
          <Link to="/corporate-orders" className="btn-primary mt-6">
            Work with our B2B team
          </Link>
        </div>
        <img
          src={spices}
          alt="Premium Indian spices including saffron and cardamom"
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full rounded-3xl object-cover"
        />
      </section>

      <section className="bg-[var(--color-ivory)] py-16">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold text-primary">What we stand for</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="surface-card p-6">
                <div className="gold-rule" />
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
