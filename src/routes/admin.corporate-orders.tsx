import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, TableWrap } from "@/components/admin";
import { useStore } from "@/lib/store";
import type { Inquiry } from "@/data/mock";

export const Route = createFileRoute("/admin/corporate-orders")({
  head: () => ({
    meta: [
      { title: "Corporate Inquiries | A-1 Dry Fruits Admin" },
      { name: "description", content: "Track bulk and corporate gifting inquiries from businesses." },
      { property: "og:title", content: "Corporate Inquiries | A-1 Dry Fruits Admin" },
      { property: "og:description", content: "B2B inquiry pipeline." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminInquiries,
});

const statuses: Inquiry["status"][] = ["New", "Contacted", "Quoted", "Confirmed", "Completed", "Cancelled"];

function AdminInquiries() {
  const { inquiryList, setInquiryList, toast } = useStore();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const list = inquiryList.filter((i) => filter === "all" || i.status === filter);
  const active = inquiryList.find((i) => i.id === open);

  return (
    <AdminLayout title="Corporate & Bulk Inquiries">
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="field mb-4 w-auto">
        <option value="all">All inquiries</option>
        {statuses.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <TableWrap>
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Requirement</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((i) => (
            <tr key={i.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{i.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{i.company}</td>
              <td className="px-4 py-3 text-muted-foreground">
                <p>{i.phone}</p>
                <p className="text-xs">{i.email}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{i.requirement || i.eventType}</td>
              <td className="px-4 py-3">{i.quantity}</td>
              <td className="px-4 py-3">
                <select
                  value={i.status}
                  onChange={(e) => {
                    const status = e.target.value as Inquiry["status"];
                    setInquiryList((prev) => prev.map((x) => (x.id === i.id ? { ...x, status } : x)));
                    toast(`Inquiry marked ${status}`);
                  }}
                  className="field w-auto !py-1.5 !text-xs"
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3">
                <button className="text-xs font-semibold text-primary" onClick={() => setOpen(i.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
      {list.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No inquiries in this state.</p>}

      {active && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="surface-card w-full max-w-lg p-6">
            <h2 className="font-display text-xl font-semibold text-primary">{active.company || active.name}</h2>
            <p className="text-sm text-muted-foreground">
              {active.name} · {active.phone} · {active.email}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Event / Purpose" value={active.eventType} />
              <Row label="Requirement" value={active.requirement} />
              <Row label="Quantity" value={active.quantity} />
              <Row label="Required by" value={active.requiredDate} />
              <Row label="Message" value={active.message} />
              <Row label="Status" value={active.status} />
            </dl>
            <button className="btn-ghost mt-6" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <dt className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
