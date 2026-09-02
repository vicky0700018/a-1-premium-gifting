import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { Toasts } from "@/components/site";

const adminNav = [
  { label: "Dashboard", to: "/admin/dashboard" as const },
  { label: "Products", to: "/admin/products" as const },
  { label: "Categories", to: "/admin/categories" as const },
  { label: "Orders", to: "/admin/orders" as const },
  { label: "Customers", to: "/admin/customers" as const },
  { label: "Coupons", to: "/admin/coupons" as const },
  { label: "Banners", to: "/admin/banners" as const },
  { label: "Reviews", to: "/admin/reviews" as const },
  { label: "Gift Hampers", to: "/admin/gift-hampers" as const },
  { label: "Corporate Orders", to: "/admin/corporate-orders" as const },
  { label: "Settings", to: "/admin/settings" as const },
];

export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const { isAdmin, logout } = useStore();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isAdmin) navigate({ to: "/admin/login" });
      setChecked(true);
    }, 120);
    return () => clearTimeout(t);
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <p className="text-sm text-muted-foreground">
          {checked ? "Redirecting to admin login…" : "Checking session…"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="hidden w-60 shrink-0 flex-col bg-primary p-5 text-primary-foreground lg:flex">
        <Link to="/" className="font-display text-xl font-semibold">
          A-1 Dry Fruits
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-accent">Admin Panel</p>
        <nav className="mt-8 flex flex-col gap-1 text-sm">
          {adminNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "bg-primary-foreground/10 text-accent" }}
              className="rounded-lg px-3 py-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => {
            logout();
            navigate({ to: "/admin/login" });
          }}
          className="mt-auto rounded-lg border border-primary-foreground/25 px-3 py-2 text-sm"
        >
          Log out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
          <button className="rounded-md border border-border px-3 py-1.5 text-sm lg:hidden" onClick={() => setOpen((v) => !v)}>
            Menu
          </button>
          <h1 className="font-display text-lg font-semibold text-primary sm:text-xl">{title}</h1>
          <Link to="/" className="ml-auto text-xs font-semibold text-accent">
            View storefront →
          </Link>
        </header>
        {open && (
          <div className="grid grid-cols-2 gap-1 border-b border-border bg-card p-4 text-sm lg:hidden">
            {adminNav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded px-2 py-1.5 text-primary">
                {n.label}
              </Link>
            ))}
          </div>
        )}
        <div className="min-w-0 flex-1 p-5">{children}</div>
      </div>
      <Toasts />
    </div>
  );
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`surface-card p-5 ${className}`}>{children}</div>;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="surface-card overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">{children}</table>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    ["Delivered", "Approved", "Confirmed", "Completed", "Active"].includes(status)
      ? "bg-secondary/15 text-secondary"
      : ["Cancelled", "Rejected", "Inactive"].includes(status)
        ? "bg-destructive/10 text-destructive"
        : "bg-accent/15 text-accent-foreground";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}
