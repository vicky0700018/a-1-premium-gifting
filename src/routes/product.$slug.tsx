import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EmptyState, PriceTag, SiteLayout, Stars } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const name = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${name} | A-1 Dry Fruits` },
        {
          name: "description",
          content: `Buy ${name} online from A-1 Dry Fruits — premium grade, freshly packed in Mumbai with 250g, 500g and 1kg options.`,
        },
        { property: "og:title", content: `${name} | A-1 Dry Fruits` },
        { property: "og:description", content: `Premium ${name}, freshly packed and delivered across India.` },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { products, reviewList, addToCart, toggleWishlist, wishlist } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const [wIdx, setWIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);

  if (!product) {
    return (
      <SiteLayout>
        <div className="container-page py-20">
          <EmptyState
            title="Product not found"
            message="This product may have been removed from the catalogue."
            action={
              <Link to="/shop" className="btn-primary">
                Back to Shop
              </Link>
            }
          />
        </div>
      </SiteLayout>
    );
  }

  const w = product.availableWeights[wIdx]!;
  const productReviews = reviewList.filter((r) => r.productSlug === product.slug && r.status === "Approved");
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const saved = wishlist.includes(product.slug);

  const cartItem = {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0]!,
    weight: w.weight,
    price: w.price,
    mrp: w.mrp,
    qty,
  };

  return (
    <SiteLayout>
      <div className="container-page py-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-accent">
            Shop
          </Link>{" "}
          /{" "}
          <Link to="/category/$slug" params={{ slug: product.categorySlug }} className="hover:text-accent">
            {product.category}
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="surface-card group overflow-hidden">
              <img
                src={product.images[img]}
                alt={product.name}
                width={900}
                height={900}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-4 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImg(i)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${
                    i === img ? "border-accent" : "border-border"
                  }`}
                >
                  <img src={src} alt={`${product.name} view ${i + 1}`} loading="lazy" width={200} height={200} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{product.category}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <Stars rating={product.rating} />
              <span>
                {product.rating} • {product.reviewCount} reviews
              </span>
            </div>
            <div className="mt-5">
              <PriceTag price={w.price} mrp={w.mrp} />
            </div>
            <p className="mt-2 text-sm">
              {product.stock > 0 ? (
                <span className="font-semibold text-secondary">In stock — {product.stock} packs available</span>
              ) : (
                <span className="font-semibold text-destructive">Currently out of stock</span>
              )}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Select weight</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.availableWeights.map((opt, i) => (
                  <button
                    key={opt.weight}
                    onClick={() => setWIdx(i)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      i === wIdx ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    {opt.weight} — {inr(opt.price)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-border">
                <button className="px-4 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button className="px-4 py-2" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                  +
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Total {inr(w.price * qty)}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary" disabled={product.stock === 0} onClick={() => addToCart(cartItem)}>
                Add to Cart
              </button>
              <button
                className="btn-gold"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(cartItem);
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </button>
              <button className="btn-ghost" onClick={() => toggleWishlist(product.slug)}>
                {saved ? "♥ Saved" : "♡ Add to Wishlist"}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <p>Origin: <span className="text-foreground">{product.origin}</span></p>
              <p>Freshly packed on order</p>
              <p>Free delivery above ₹1,499</p>
              <p>Bulk pricing available</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Section title="Product Description">
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </Section>
          <Section title="Product Benefits">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-accent">◆</span> {b}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Nutritional Information">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {product.nutrition.map((n) => (
                <div key={n.label} className="rounded-lg bg-muted p-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{n.label}</dt>
                  <dd className="font-semibold text-foreground">{n.value}</dd>
                </div>
              ))}
            </dl>
          </Section>
          <Section title="Origin, Packaging & Storage">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Origin:</strong> {product.origin}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="text-foreground">Packaging:</strong> {product.packaging}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="text-foreground">Storage:</strong> {product.storage}
            </p>
          </Section>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-primary">Customer Reviews</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {productReviews.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No reviews yet for this pack — be the first to share your experience in store.
              </p>
            )}
            {productReviews.map((r) => (
              <div key={r.id} className="surface-card p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{r.customer}</p>
                  <Stars rating={r.rating} size="text-xs" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                <p className="mt-3 text-xs text-muted-foreground">{r.date}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-primary">Related Products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold text-primary">{title}</h2>
      <div className="gold-rule my-3" />
      {children}
    </div>
  );
}
