import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminLayout, StatusPill, TableWrap } from "@/components/admin";
import { salesOverview } from "@/data/mock";
import { inr, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | A-1 Dry Fruits" },
      { name: "description", content: "Sales, orders and inventory overview for A-1 Dry Fruits." },
      { property: "og:title", content: "Admin Dashboard | A-1 Dry Fruits" },
      { property: "og:description", content: "Store performance at a glance." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { orderList, customerList, products, inquiryList, wishlist } = useStore();
  const totalSales = orderList.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.amount, 0);
  const pending = orderList.filter((o) => o.status === "Pending").length;
  const lowStock = products.filter((p) => p.stock < 80).length;
  const max = Math.max(...salesOverview.map((s) => s.value));

  const stats = [
    ["Total Sales", inr(totalSales)],
    ["Total Orders", String(orderList.length)],
    ["Total Customers", String(customerList.length)],
    ["Total Products", String(products.length)],
    ["Pending Orders", String(pending)],
    ["Low Stock Products", String(lowStock)],
    ["Bulk Inquiries", String(inquiryList.length)],
    ["Wishlist Count", String(wishlist.length)],
  ];

  const top = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <AdminCard key={label}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-2xl font-semibold text-primary">{value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AdminCard>
          <h2 className="font-display text-lg font-semibold text-primary">Sales Overview</h2>
          <p className="text-xs text-muted-foreground">Last 6 months (₹)</p>
          <div className="mt-6 flex h-56 items-end gap-4">
            {salesOverview.map((s) => (
              <div key={s.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] text-muted-foreground">{(s.value / 1000).toFixed(0)}k</span>
                <div
                  className="w-full rounded-t-lg bg-primary transition-all hover:bg-accent"
                  style={{ height: `${(s.value / max) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{s.month}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-display text-lg font-semibold text-primary">Top Selling Products</h2>
          <ol className="mt-4 space-y-3 text-sm">
            {top.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <img src={p.images[0]} alt={p.name} loading="lazy" width={80} height={80} className="h-9 w-9 rounded-lg object-cover" />
                <span className="min-w-0 flex-1 truncate">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.reviewCount} sold</span>
              </li>
            ))}
          </ol>
        </AdminCard>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-primary">Recent Orders</h2>
        <TableWrap>
          <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.slice(0, 6).map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                <td className="px-4 py-3 font-semibold">{inr(o.amount)}</td>
                <td className="px-4 py-3">
                  <StatusPill status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </AdminLayout>
  );
}
