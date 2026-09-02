import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/admin";
import { Stars } from "@/components/site";
import { useStore } from "@/lib/store";
import type { Review } from "@/data/mock";

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews | A-1 Dry Fruits Admin" },
      { name: "description", content: "Moderate customer product reviews and ratings." },
      { property: "og:title", content: "Reviews | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "Review moderation." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminReviews,
});

const statuses: Review["status"][] = ["Approved", "Pending", "Rejected"];

function AdminReviews() {
  const { reviewList, setReviewList, toast } = useStore();
  const [filter, setFilter] = useState("all");

  const list = reviewList.filter((r) => filter === "all" || r.status === filter);

  const setStatus = (id: string, status: Review["status"]) => {
    setReviewList((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast(`Review ${status.toLowerCase()}`);
  };

  return (
    <AdminLayout title="Reviews">
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="field mb-4 w-auto">
        <option value="all">All reviews</option>
        {statuses.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Rating</th>
            <th className="px-4 py-3">Review</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} className="border-t border-border align-top">
              <td className="px-4 py-3 font-medium">{r.customer}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.product}</td>
              <td className="px-4 py-3">
                <Stars rating={r.rating} />
              </td>
              <td className="max-w-sm px-4 py-3 text-muted-foreground">{r.text}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    r.status === "Approved"
                      ? "bg-secondary/15 text-secondary"
                      : r.status === "Pending"
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <button className="text-secondary" onClick={() => setStatus(r.id, "Approved")}>
                    Approve
                  </button>
                  <button className="text-primary" onClick={() => setStatus(r.id, "Rejected")}>
                    Reject
                  </button>
                  <button
                    className="text-destructive"
                    onClick={() => {
                      setReviewList((prev) => prev.filter((x) => x.id !== r.id));
                      toast("Review deleted");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
      {list.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No reviews in this state.</p>}
    </AdminLayout>
  );
}
