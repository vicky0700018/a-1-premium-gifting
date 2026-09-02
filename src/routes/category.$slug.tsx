import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState, SiteLayout } from "@/components/site";
import { ProductGrid } from "@/components/ProductGrid";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const name = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `Buy ${name} Online | A-1 Dry Fruits Mumbai` },
        {
          name: "description",
          content: `Shop premium ${name} from A-1 Dry Fruits, Crawford Market Mumbai. Freshly packed, graded quality, 250g to 1kg packs.`,
        },
        { property: "og:title", content: `Buy ${name} Online | A-1 Dry Fruits` },
        { property: "og:description", content: `Premium ${name} freshly packed in South Mumbai since 2004.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { products, categoryList } = useStore();
  const category = categoryList.find((c) => c.slug === slug);
  const list = products.filter((p) => p.categorySlug === slug);

  return (
    <SiteLayout>
      <section className="bg-[var(--color-ivory)] py-10">
        <div className="container-page">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Category</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
            {category?.name ?? "Products"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {category?.description ?? "Explore our premium selection."}
          </p>
        </div>
      </section>
      <div className="container-page py-10">
        {list.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            message="We're restocking this category. Meanwhile, explore the full range."
            action={
              <Link to="/shop" className="btn-primary">
                Browse all products
              </Link>
            }
          />
        ) : (
          <ProductGrid baseProducts={list} hideCategoryFilter />
        )}
      </div>
    </SiteLayout>
  );
}
