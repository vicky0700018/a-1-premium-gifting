import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState, SiteLayout } from "@/components/site";
import { ProductGrid } from "@/components/ProductGrid";
import { useStore } from "@/lib/store";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search['q'] === "string" ? (search['q'] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Dry Fruits & Nuts | A-1 Dry Fruits" },
      {
        name: "description",
        content: "Search our catalogue of almonds, cashews, pistachios, dates, seeds, spices and gift hampers.",
      },
      { property: "og:title", content: "Search Dry Fruits & Nuts | A-1 Dry Fruits" },
      { property: "og:description", content: "Find the exact pack you need across our premium range." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const { products } = useStore();
  const term = q.trim().toLowerCase();

  const results = term
    ? products.filter((p) =>
        [p.name, p.category, p.description, p.shortDescription, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
    : [];

  return (
    <SiteLayout>
      <section className="bg-[var(--color-ivory)] py-10">
        <div className="container-page">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Search results</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
            {term ? `Results for “${q}”` : "Search our catalogue"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {term ? `${results.length} product${results.length === 1 ? "" : "s"} found` : "Use the search bar above to begin."}
          </p>
        </div>
      </section>
      <div className="container-page py-10">
        {results.length === 0 ? (
          <EmptyState
            title={term ? "No matching products" : "Start a search"}
            message={
              term
                ? "Try a different spelling, or browse by category — we stock over 120 varieties in store."
                : "Search by product name, category or use terms like badam, kaju, pista or khajoor."
            }
            action={
              <Link to="/shop" className="btn-primary">
                Browse all products
              </Link>
            }
          />
        ) : (
          <ProductGrid baseProducts={results} />
        )}
      </div>
    </SiteLayout>
  );
}
