import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/admin";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers | A-1 Dry Fruits Admin" },
      { name: "description", content: "View customer records, order counts and lifetime spend." },
      { property: "og:title", content: "Customers | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Customer directory." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const { customerList, setCustomerList, orderList, toast } = useStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const list = customerList.filter((c) =>
    `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
  );
  const active = customerList.find((c) => c.id === open);

  return (
    <AdminLayout title="Customers">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search customers"
        className="field mb-4 max-w-xs"
      />

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Orders</th>
            <th className="px-4 py-3">Total Spent</th>
            <th className="px-4 py-3">Last Order</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{c.name}</td>
              <td className="px-4 py-3 text-muted-foreground">
                <p>{c.email}</p>
                <p className="text-xs">{c.phone}</p>
              </td>
              <td className="px-4 py-3">{c.orders}</td>
              <td className="px-4 py-3 font-semibold">{inr(c.spent)}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.lastOrder}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => {
                    setCustomerList((prev) =>
                      prev.map((x) =>
                        x.id === c.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x,
                      ),
                    );
                    toast("Customer status updated");
                  }}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    c.status === "Active" ? "bg-secondary/15 text-secondary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.status}
                </button>
              </td>
              <td className="px-4 py-3">
                <button className="text-xs font-semibold text-primary" onClick={() => setOpen(c.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      {active && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="surface-card w-full max-w-lg p-6">
            <h2 className="font-display text-xl font-semibold text-primary">{active.name}</h2>
            <p className="text-sm text-muted-foreground">
              {active.email} · {active.phone}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Stat label="Orders" value={String(active.orders)} />
              <Stat label="Spent" value={inr(active.spent)} />
              <Stat label="Status" value={active.status} />
            </div>
            <h3 className="mt-6 text-sm font-semibold text-primary">Order history</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {orderList
                .filter((o) => o.customer === active.name)
                .map((o) => (
                  <li key={o.id} className="flex justify-between rounded-lg bg-muted px-3 py-2">
                    <span className="font-mono text-xs">{o.id}</span>
                    <span className="text-muted-foreground">{o.date}</span>
                    <span className="font-semibold">{inr(o.amount)}</span>
                  </li>
                ))}
              {orderList.filter((o) => o.customer === active.name).length === 0 && (
                <li className="text-muted-foreground">No orders recorded yet.</li>
              )}
            </ul>
            <button className="btn-ghost mt-6" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-primary">{value}</p>
    </div>
  );
}
