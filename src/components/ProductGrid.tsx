import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/site";
import { useStore } from "@/lib/store";
import type { Product } from "@/data/products";

type Props = {
  baseProducts?: Product[];
  hideCategoryFilter?: boolean;
};

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
  "Newest",
  "Best Selling",
] as const;

export function ProductGrid({ baseProducts, hideCategoryFilter = false }: Props) {
  const { products, categoryList } = useStore();
  const source = baseProducts ?? products;

  const [cats, setCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [weight, setWeight] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [offers, setOffers] = useState(false);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Featured");
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let list = source.filter((p) => {
      const w = p.availableWeights.find((x) => weight === "All" || x.weight === weight);
      if (!w) return false;
      if (cats.length && !cats.includes(p.categorySlug)) return false;
      if (w.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStock && p.stock === 0) return false;
      if (organic && !p.organic) return false;
      if (bestseller && !p.bestseller) return false;
      if (offers && p.discount < 15) return false;
      return true;
    });

    list = [...list];
    switch (sort) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "Best Selling":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [source, cats, maxPrice, weight, minRating, inStock, organic, bestseller, offers, sort]);

  const toggleCat = (slug: string) =>
    setCats((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]));

  const filters = (
    <div className="space-y-7 text-sm">
      {!hideCategoryFilter && (
        <div>
          <p className="font-display text-base font-semibold text-primary">Category</p>
          <div className="mt-3 space-y-2">
            {categoryList
              .filter((c) => c.active)
              .map((c) => (
                <label key={c.id} className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={cats.includes(c.slug)}
                    onChange={() => toggleCat(c.slug)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  {c.name}
                </label>
              ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-display text-base font-semibold text-primary">Price range</p>
        <input
          type="range"
          min={100}
          max={4000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--color-accent)]"
        />
        <p className="text-xs text-muted-foreground">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
      </div>

      <div>
        <p className="font-display text-base font-semibold text-primary">Weight</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["All", "250g", "500g", "1kg"].map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`rounded-full border px-3 py-1 text-xs ${
                weight === w ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-display text-base font-semibold text-primary">Rating</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`rounded-full border px-3 py-1 text-xs ${
                minRating === r ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {[
          ["In stock only", inStock, setInStock],
          ["Organic", organic, setOrganic],
          ["Bestsellers", bestseller, setBestseller],
          ["On offer (15%+)", offers, setOffers],
        ].map(([label, val, set]) => (
          <label key={label as string} className="flex cursor-pointer items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={val as boolean}
              onChange={(e) => (set as (v: boolean) => void)(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            {label as string}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block">
        <div className="surface-card sticky top-40 p-5">{filters}</div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button className="btn-ghost lg:hidden" onClick={() => setDrawer(true)}>
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sortOptions)[number])}
              className="field w-auto"
              aria-label="Sort products"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No products match those filters"
            message="Try widening the price range or clearing a filter to see more of our range."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[80] flex lg:hidden" onClick={() => setDrawer(false)}>
          <div className="flex-1 bg-foreground/50" />
          <div
            className="h-full w-80 max-w-[85vw] overflow-y-auto bg-card p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-lg font-semibold text-primary">Filters</p>
              <button onClick={() => setDrawer(false)} className="text-sm text-muted-foreground">
                Close
              </button>
            </div>
            {filters}
            <button className="btn-primary mt-6 w-full" onClick={() => setDrawer(false)}>
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
