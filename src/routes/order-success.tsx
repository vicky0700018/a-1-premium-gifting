import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyState, SiteLayout } from "@/components/site";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Placed Successfully | A-1 Dry Fruits" },
      { name: "description", content: "Your A-1 Dry Fruits order has been placed. Track details and estimated delivery." },
      { property: "og:title", content: "Order Placed Successfully | A-1 Dry Fruits" },
      { property: "og:description", content: "Thank you for shopping premium dry fruits with A-1." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { lastOrder } = useStore();

  if (!lastOrder) {
    return (
      <SiteLayout>
        <div className="container-page py-20">
          <EmptyState
            title="No recent order"
            message="Once you place an order, its confirmation appears here."
            action={
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
            }
          />
        </div>
      </SiteLayout>
    );
  }

  const o = lastOrder;

  return (
    <SiteLayout>
      <div className="container-page py-14">
        <div className="surface-card mx-auto max-w-3xl p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-2xl text-secondary">
            ✓
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold text-primary">Order Placed Successfully!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you {o.name} — we've received your order and started packing.
          </p>
          <p className="mt-4 inline-block rounded-full bg-primary px-5 py-2 font-mono text-sm text-primary-foreground">
            Order ID: {o.id}
          </p>

          <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-semibold text-primary">Delivery Address</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {o.name}
                <br />
                {o.address}
                {o.landmark && `, ${o.landmark}`}
                <br />
                {o.city}, {o.state} — {o.pincode}
                <br />
                {o.phone}
              </p>
              <p className="mt-3 text-sm">
                <strong className="text-foreground">Estimated delivery:</strong> {o.eta}
              </p>
              <p className="text-sm">
                <strong className="text-foreground">Method:</strong> {o.delivery} • {o.payment}
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-primary">Order Summary</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {o.items.map((i) => (
                  <li key={`${i.productId}-${i.weight}`} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">
                      {i.name} ({i.weight}) × {i.qty}
                    </span>
                    <span>{inr(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd>{inr(o.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Discount</dt>
                  <dd>− {inr(o.discount)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Delivery</dt>
                  <dd>{o.deliveryFee === 0 ? "Free" : inr(o.deliveryFee)}</dd>
                </div>
                <div className="flex justify-between font-display text-base font-semibold text-primary">
                  <dt>Total Paid</dt>
                  <dd>{inr(o.total)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/contact" className="btn-outline">
              View Order Support
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
