import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { inr, useStore } from "@/lib/store";

export function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  return (
    <span className={`${size} text-accent tracking-tight`} aria-label={`Rated ${rating} out of 5`}>
      {"★★★★★".slice(0, Math.round(rating))}
      <span className="text-border">{"★★★★★".slice(Math.round(rating))}</span>
    </span>
  );
}

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[70] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Gift Hampers", to: "/gift-hampers" as const },
  { label: "Offers", to: "/offers" as const },
  { label: "Corporate Gifting", to: "/corporate-orders" as const },
  { label: "About Us", to: "/about" as const },
];

const catLinks = [
  { label: "Dry Fruits", slug: "dried-fruits" },
  { label: "Nuts", slug: "almonds" },
  { label: "Seeds", slug: "seeds" },
  { label: "Dates", slug: "dates" },
  { label: "Spices", slug: "spices" },
];

export function Header() {
  const { cartCount, wishlist, settings } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate({ to: "/search", search: { q: q.trim() } });
    setOpen(false);
    setMobileSearch(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-primary text-primary-foreground">
        <p className="container-page py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          {settings.announcement}
        </p>
      </div>

      <div className="container-page flex items-center gap-4 py-3">
        <button
          className="rounded-md p-2 text-primary lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            A-1
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-primary">A-1 Dry Fruits</span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
              Since 2004 • Mumbai
            </span>
          </span>
        </Link>

        <form onSubmit={submit} className="ml-auto hidden flex-1 max-w-xl md:block">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search almonds, cashews, dates, pistachios..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search products"
            />
            <button type="submit" className="text-xs font-semibold uppercase tracking-wide text-accent">
              Search
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            className="rounded-full p-2 text-sm text-primary md:hidden"
            onClick={() => setMobileSearch((v) => !v)}
            aria-label="Search"
          >
            ⌕
          </button>
          <Link to="/admin/login" className="hidden rounded-full px-3 py-2 text-sm text-primary hover:text-accent lg:block">
            Account
          </Link>
          <Link to="/wishlist" className="relative rounded-full px-3 py-2 text-sm text-primary hover:text-accent">
            ♡
            {wishlist.length > 0 && (
              <span className="absolute -right-0 top-0 rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileSearch && (
        <form onSubmit={submit} className="container-page pb-3 md:hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search almonds, cashews, dates..."
            className="field"
            aria-label="Search products"
          />
        </form>
      )}

      <nav className="hidden border-t border-border lg:block">
        <div className="container-page flex flex-wrap items-center gap-6 py-2.5 text-sm">
          {navLinks.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-accent" }}
              className="font-medium text-primary transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          {catLinks.map((c) => (
            <Link
              key={c.label}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="font-medium text-primary transition-colors hover:text-accent"
            >
              {c.label}
            </Link>
          ))}
          {navLinks.slice(2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-accent" }}
              className="font-medium text-primary transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container-page grid grid-cols-2 gap-2 py-4 text-sm">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1.5 font-medium text-primary">
                {l.label}
              </Link>
            ))}
            {catLinks.map((c) => (
              <Link
                key={c.label}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="py-1.5 font-medium text-primary"
              >
                {c.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="py-1.5 font-medium text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { settings, toast } = useStore();
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-semibold">A-1 Dry Fruits</p>
          <div className="gold-rule my-4" />
          <p className="max-w-sm text-sm text-primary-foreground/75">{settings.footerText}</p>
          <div className="mt-6">
            <p className="text-sm font-semibold">Newsletter</p>
            <p className="mt-1 text-sm text-primary-foreground/70">Get premium offers &amp; festive updates</p>
            <form
              className="mt-3 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast("Please enter a valid email");
                setEmail("");
                toast("Subscribed! Festive offers on the way.");
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-primary-foreground/25 bg-transparent px-4 py-2 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/50"
                aria-label="Email address"
              />
              <button type="submit" className="btn-gold">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <FooterCol
          title="Company"
          links={[
            { label: "About Us", to: "/about" },
            { label: "Contact Us", to: "/contact" },
            { label: "Our Story", to: "/about" },
            { label: "Bulk Orders", to: "/corporate-orders" },
          ]}
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {catLinks.concat([{ label: "Gift Hampers", slug: "gift-hampers" }]).map((c) => (
              <li key={c.label}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-accent">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Customer Care</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {["Shipping", "Returns", "Privacy Policy", "Terms & Conditions", "FAQs"].map((l) => (
              <li key={l}>
                <Link to="/contact" className="hover:text-accent">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            <li>{settings.phone}</li>
            <li className="break-all">{settings.email}</li>
            <li>Crawford Market, Fort, Mumbai 400001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} A-1 Dry Fruits. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-accent">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toasts />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-primary py-14 text-primary-foreground">
      <div className="container-page">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-primary-foreground/75 sm:text-base">{subtitle}</p>
      </div>
    </section>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card mx-auto max-w-lg p-10 text-center">
      <h2 className="font-display text-2xl font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function PriceTag({ price, mrp }: { price: number; mrp: number }) {
  const off = Math.round(((mrp - price) / mrp) * 100);
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="font-display text-xl font-semibold text-primary">{inr(price)}</span>
      <span className="text-sm text-muted-foreground line-through">{inr(mrp)}</span>
      <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary">
        {off}% off
      </span>
    </div>
  );
}
