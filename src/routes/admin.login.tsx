import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Toasts } from "@/components/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | A-1 Dry Fruits" },
      { name: "description", content: "Secure admin access to the A-1 Dry Fruits store management panel." },
      { property: "og:title", content: "Admin Login | A-1 Dry Fruits" },
      { property: "og:description", content: "Manage products, orders and hampers for A-1 Dry Fruits." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, toast } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast("Welcome back, admin");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Use the demo login shown below.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-3 text-primary-foreground">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
            A-1
          </span>
          <span className="font-display text-2xl font-semibold">A-1 Dry Fruits</span>
        </Link>
        <div className="surface-card p-8">
          <h1 className="font-display text-2xl font-semibold text-primary">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage the storefront.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="field" type="email" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field"
                type="password"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              Remember me
            </label>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
          <div className="mt-6 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Demo credentials</p>
            <p>admin@a-1dryfruits.com</p>
            <p>admin123</p>
          </div>
          <Link to="/" className="mt-5 block text-center text-xs font-semibold text-primary hover:text-accent">
            ← Back to storefront
          </Link>
        </div>
      </div>
      <Toasts />
    </div>
  );
}
