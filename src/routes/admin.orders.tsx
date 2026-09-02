import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin";
import { inr, useStore } from "@/lib/store";
import type { Order } from "@/data/mock";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Manage Orders | A-1 Dry Fruits Admin" },
      { name: "description", content: "Track and update customer order status for A-1 Dry Fruits." },
      { property: "og:title", content: "Manage Orders | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Order fulfilment management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrders,
});

const statuses: Order["status"][] = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const { orderList, setOrderList, toast } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const list = orderList.filter(
    (o) =>
      (filter === "all" || o.status === filter) &&
      (o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <AdminLayout title="Orders">
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by order ID or customer"
          className="field max-w-xs"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="field w-auto">
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
              <td className="px-4 py-3">
                <p className="font-medium">{o.customer}</p>
                <p className="text-xs text-muted-foreground">{o.phone}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              <td className="px-4 py-3">{o.items}</td>
              <td className="px-4 py-3 font-semibold">{inr(o.amount)}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.payment}</td>
              <td className="px-4 py-3">
                <StatusPill status={o.status} />
              </td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) => {
                    const status = e.target.value as Order["status"];
                    setOrderList((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
                    toast(`${o.id} marked ${status}`);
                  }}
                  className="field w-auto !py-1.5 !text-xs"
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
      {list.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No orders match this filter.</p>}
    </AdminLayout>
  );
}
