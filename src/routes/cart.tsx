import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState, SiteLayout } from "@/components/site";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | A-1 Dry Fruits" },
      { name: "description", content: "Review your dry fruit selection before checkout at A-1 Dry Fruits." },
      { property: "og:title", content: "Your Cart | A-1 Dry Fruits" },
      { property: "og:description", content: "Review your premium dry fruit order and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal, settings, toggleWishlist } = useStore();
  const savings = cart.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);
  const deliveryFee = cartSubtotal >= settings.freeDeliveryThreshold || cartSubtotal === 0 ? 0 : settings.deliveryCharge;
  const total = cartSubtotal + deliveryFee;

  return (
    <SiteLayout>
      <div className="container-page py-12">
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Shopping Cart</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {cart.length} item{cart.length === 1 ? "" : "s"} in your basket
        </p>

        {cart.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              title="Your cart is empty"
              message="Add some premium almonds, pistachios or a festive hamper to get started."
              action={
                <Link to="/shop" className="btn-primary">
                  Start Shopping
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.weight}`} className="surface-card flex gap-4 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={200}
                    height={200}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      className="font-display text-base font-semibold text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">Pack size: {item.weight}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {inr(item.price)}{" "}
                      <span className="text-xs font-normal text-muted-foreground line-through">{inr(item.mrp)}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button className="px-3 py-1" onClick={() => updateQty(item.productId, item.weight, item.qty - 1)}>
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button className="px-3 py-1" onClick={() => updateQty(item.productId, item.weight, item.qty + 1)}>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(item.slug)}
                        className="text-xs font-semibold text-primary hover:text-accent"
                      >
                        Move to wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(item.productId, item.weight)}
                        className="text-xs font-semibold text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="hidden font-display text-lg font-semibold text-primary sm:block">
                    {inr(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>

            <aside className="surface-card h-fit p-6 lg:sticky lg:top-40">
              <h2 className="font-display text-xl font-semibold text-primary">Order Summary</h2>
              <div className="gold-rule my-4" />
              <dl className="space-y-3 text-sm">
                <Row label="Subtotal" value={inr(cartSubtotal)} />
                <Row label="You save" value={`− ${inr(savings)}`} />
                <Row label="Delivery" value={deliveryFee === 0 ? "Free" : inr(deliveryFee)} />
                <div className="border-t border-border pt-3">
                  <Row label="Total" value={inr(total)} bold />
                </div>
              </dl>
              {deliveryFee > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Add {inr(settings.freeDeliveryThreshold - cartSubtotal)} more for free delivery.
                </p>
              )}
              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="btn-ghost mt-3 w-full">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={bold ? "font-display text-base font-semibold text-primary" : "text-muted-foreground"}>{label}</dt>
      <dd className={bold ? "font-display text-base font-semibold text-primary" : "font-medium text-foreground"}>
        {value}
      </dd>
    </div>
  );
}
