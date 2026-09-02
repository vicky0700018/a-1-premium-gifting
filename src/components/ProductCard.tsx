import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/data/products";
import { inr, useStore } from "@/lib/store";
import { PriceTag, Stars } from "@/components/site";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [weightIndex, setWeightIndex] = useState(0);
  const [quickView, setQuickView] = useState(false);
  const w = product.availableWeights[weightIndex]!;
  const saved = wishlist.includes(product.slug);

  const add = () =>
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]!,
      weight: w.weight,
      price: w.price,
      mrp: w.mrp,
      qty: 1,
    });

  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="relative overflow-hidden bg-muted">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={900}
            height={900}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.bestseller && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
              Bestseller
            </span>
          )}
          {product.organic && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
              Organic
            </span>
          )}
          {product.stock === 0 && (
            <span className="rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase text-destructive-foreground">
              Out of stock
            </span>
          )}
        </div>
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 h-9 w-9 rounded-full border border-border text-sm transition-colors ${
            saved ? "bg-accent text-accent-foreground" : "bg-card text-primary hover:bg-muted"
          }`}
        >
          ♥
        </button>
        <button
          onClick={() => setQuickView(true)}
          className="absolute inset-x-3 bottom-3 rounded-full bg-card/95 py-2 text-xs font-semibold text-primary opacity-0 shadow transition-opacity group-hover:opacity-100"
        >
          Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="mt-1 block font-display text-base font-semibold text-foreground hover:text-primary"
          >
            {product.name}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Stars rating={product.rating} size="text-xs" />
          <span>
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <PriceTag price={w.price} mrp={w.mrp} />
        <div className="flex flex-wrap gap-1.5">
          {product.availableWeights.map((opt, i) => (
            <button
              key={opt.weight}
              onClick={() => setWeightIndex(i)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                i === weightIndex
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {opt.weight}
            </button>
          ))}
        </div>
        <button onClick={add} disabled={product.stock === 0} className="btn-primary mt-auto w-full">
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {quickView && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4"
          onClick={() => setQuickView(false)}
        >
          <div
            className="surface-card grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-y-auto p-6 sm:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={900}
              height={900}
              className="aspect-square w-full rounded-xl object-cover"
            />
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-primary">{product.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Stars rating={product.rating} size="text-xs" /> {product.reviewCount} reviews
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{product.shortDescription}</p>
              <div className="mt-4">
                <PriceTag price={w.price} mrp={w.mrp} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Origin: {product.origin} • In stock: {product.stock} packs • Base price {inr(product.price)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    add();
                    setQuickView(false);
                  }}
                  className="btn-primary"
                >
                  Add to Cart
                </button>
                <Link to="/product/$slug" params={{ slug: product.slug }} className="btn-outline">
                  View Full Details
                </Link>
                <button onClick={() => setQuickView(false)} className="btn-ghost">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
