import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState, PriceTag, SiteLayout } from "@/components/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | A-1 Dry Fruits" },
      { name: "description", content: "Saved dry fruits, nuts and hampers you plan to order from A-1 Dry Fruits." },
      { property: "og:title", content: "Your Wishlist | A-1 Dry Fruits" },
      { property: "og:description", content: "Keep track of the premium packs you love." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, products, removeWishlist, addToCart, toast } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  return (
    <SiteLayout>
      <div className="container-page py-12">
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">My Wishlist</h1>
        <p className="mt-2 text-sm text-muted-foreground">{items.length} saved item(s)</p>

        {items.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              title="No saved products yet"
              message="Tap the heart on any product to keep it here for later."
              action={
                <Link to="/shop" className="btn-primary">
                  Explore Products
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const w = p.availableWeights[0]!;
              return (
                <div key={p.id} className="surface-card flex gap-4 p-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    width={200}
                    height={200}
                    className="h-28 w-28 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      className="font-display text-base font-semibold text-foreground hover:text-primary"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                    <div className="mt-2">
                      <PriceTag price={w.price} mrp={w.mrp} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        className="btn-primary !px-3 !py-1.5 !text-xs"
                        onClick={() => {
                          addToCart({
                            productId: p.id,
                            slug: p.slug,
                            name: p.name,
                            image: p.images[0]!,
                            weight: w.weight,
                            price: w.price,
                            mrp: w.mrp,
                            qty: 1,
                          });
                          removeWishlist(p.slug);
                        }}
                      >
                        Move to Cart
                      </button>
                      <button
                        className="btn-ghost !px-3 !py-1.5 !text-xs"
                        onClick={() => {
                          removeWishlist(p.slug);
                          toast("Removed from wishlist");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
