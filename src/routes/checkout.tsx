import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EmptyState, SiteLayout } from "@/components/site";
import { inr, useStore, type PlacedOrder } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | A-1 Dry Fruits" },
      { name: "description", content: "Complete your premium dry fruits order with A-1 Dry Fruits, Mumbai." },
      { property: "og:title", content: "Checkout | A-1 Dry Fruits" },
      { property: "og:description", content: "Secure demo checkout for your dry fruit order." },
    ],
  }),
  component: Checkout,
});

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",
  city: "",
  state: "Maharashtra",
  pincode: "",
  delivery: "Standard Delivery",
  payment: "Cash on Delivery",
  coupon: "",
};

function Checkout() {
  const { cart, cartSubtotal, settings, placeOrder, couponList, toast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [applied, setApplied] = useState<{ code: string; discount: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof initialForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const expressFee = form.delivery === "Express Delivery" ? 149 : 0;
  const baseDelivery = cartSubtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryCharge;
  const deliveryFee = baseDelivery + expressFee;
  const discount = applied ? Math.round((cartSubtotal * applied.discount) / 100) : 0;
  const total = Math.max(0, cartSubtotal - discount + deliveryFee);

  const applyCoupon = () => {
    const c = couponList.find((x) => x.code.toLowerCase() === form.coupon.trim().toLowerCase() && x.active);
    if (!c) return toast("Invalid or expired coupon code");
    if (cartSubtotal < c.minOrder) return toast(`Coupon needs a minimum order of ${inr(c.minOrder)}`);
    setApplied({ code: c.code, discount: c.discount });
    toast(`${c.code} applied — ${c.discount}% off`);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e["name"] = "Enter your full name";
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) e["phone"] = "Enter a valid mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e["email"] = "Enter a valid email";
    if (form.address.trim().length < 8) e["address"] = "Enter your full address";
    if (!form.city.trim()) e["city"] = "City is required";
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) e["pincode"] = "Enter a 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return toast("Please correct the highlighted fields");
    setLoading(true);
    setTimeout(() => {
      const order: PlacedOrder = {
        id: `A1-${Math.floor(100000 + Math.random() * 899999)}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        landmark: form.landmark,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        delivery: form.delivery,
        payment: form.payment,
        items: cart,
        subtotal: cartSubtotal,
        discount,
        deliveryFee,
        total,
        placedAt: new Date().toISOString().slice(0, 10),
        eta: new Date(Date.now() + (form.delivery === "Express Delivery" ? 2 : 5) * 86400000)
          .toDateString()
          .slice(4),
      };
      placeOrder(order);
      setLoading(false);
      navigate({ to: "/order-success" });
    }, 700);
  };

  if (cart.length === 0) {
    return (
      <SiteLayout>
        <div className="container-page py-20">
          <EmptyState
            title="Nothing to check out"
            message="Your cart is empty — add a few packs and come back."
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

  return (
    <SiteLayout>
      <div className="container-page py-12">
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Checkout</h1>
        <p className="mt-2 rounded-full bg-accent/15 px-4 py-2 text-xs font-semibold text-accent-foreground sm:inline-block">
          Demo checkout — no real payment is processed.
        </p>

        <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <Block title="Customer Details">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Full Name" value={form.name} onChange={(v) => set("name", v)} error={errors["name"]} />
                <Field label="Mobile" value={form.phone} onChange={(v) => set("phone", v)} error={errors["phone"]} />
                <Field label="Email" value={form.email} onChange={(v) => set("email", v)} error={errors["email"]} />
              </div>
            </Block>

            <Block title="Delivery Address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Address" value={form.address} onChange={(v) => set("address", v)} error={errors["address"]} />
                <Field label="Landmark" value={form.landmark} onChange={(v) => set("landmark", v)} />
                <Field label="City" value={form.city} onChange={(v) => set("city", v)} error={errors["city"]} />
                <Field label="State" value={form.state} onChange={(v) => set("state", v)} />
                <Field label="Pincode" value={form.pincode} onChange={(v) => set("pincode", v)} error={errors["pincode"]} />
              </div>
            </Block>

            <Block title="Delivery Method">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Standard Delivery", "4-6 working days", baseDelivery === 0 ? "Free" : inr(settings.deliveryCharge)],
                  ["Express Delivery", "1-2 working days", "+ ₹149"],
                ].map(([label, sub, price]) => (
                  <label
                    key={label}
                    className={`cursor-pointer rounded-xl border p-4 text-sm ${
                      form.delivery === label ? "border-accent bg-accent/10" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-2 accent-[var(--color-primary)]"
                      checked={form.delivery === label}
                      onChange={() => set("delivery", label!)}
                    />
                    <span className="font-semibold text-foreground">{label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {sub} • {price}
                    </span>
                  </label>
                ))}
              </div>
            </Block>

            <Block title="Payment Method">
              <div className="grid gap-3 sm:grid-cols-4">
                {["Cash on Delivery", "UPI", "Card", "Net Banking"].map((p) => (
                  <label
                    key={p}
                    className={`cursor-pointer rounded-xl border p-3 text-sm ${
                      form.payment === p ? "border-accent bg-accent/10" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="mr-2 accent-[var(--color-primary)]"
                      checked={form.payment === p}
                      onChange={() => set("payment", p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </Block>
          </div>

          <aside className="surface-card h-fit p-6 lg:sticky lg:top-40">
            <h2 className="font-display text-xl font-semibold text-primary">Order Summary</h2>
            <div className="gold-rule my-4" />
            <ul className="space-y-3 text-sm">
              {cart.map((i) => (
                <li key={`${i.productId}-${i.weight}`} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {i.name} ({i.weight}) × {i.qty}
                  </span>
                  <span className="font-medium">{inr(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <input
                value={form.coupon}
                onChange={(e) => set("coupon", e.target.value)}
                placeholder="Coupon code"
                className="field"
                aria-label="Coupon code"
              />
              <button type="button" onClick={applyCoupon} className="btn-ghost">
                Apply
              </button>
            </div>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <SummaryRow label="Subtotal" value={inr(cartSubtotal)} />
              <SummaryRow label={applied ? `Discount (${applied.code})` : "Discount"} value={`− ${inr(discount)}`} />
              <SummaryRow label="Delivery" value={deliveryFee === 0 ? "Free" : inr(deliveryFee)} />
              <div className="border-t border-border pt-2">
                <SummaryRow label="Total" value={inr(total)} bold />
              </div>
            </dl>
            <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
              {loading ? "Placing order…" : "Place Order"}
            </button>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card p-6">
      <h2 className="font-display text-lg font-semibold text-primary">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="field" />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className={bold ? "font-display font-semibold text-primary" : "text-muted-foreground"}>{label}</dt>
      <dd className={bold ? "font-display font-semibold text-primary" : "font-medium"}>{value}</dd>
    </div>
  );
}
