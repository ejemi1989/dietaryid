"use client";

import { useState } from "react";
import Link from "next/link";

type Dispute = {
  id: string;
  type: "Allergen Accuracy" | "Review Authenticity" | "Creator Earnings";
  parties: string;
  status: "Investigating" | "Awaiting Response" | "Closed";
  severity: "High" | "Medium" | "Low";
  summary: string;
};

const initialData: Dispute[] = [
  { id: "d_001", type: "Allergen Accuracy", parties: "Sarah M. vs The Italian Kitchen", status: "Investigating", severity: "High", summary: "User claims allergic reaction after dining" },
  { id: "d_002", type: "Review Authenticity", parties: "David Chen vs Mike H.", status: "Awaiting Response", severity: "Medium", summary: "Restaurant claims review is fake" },
  { id: "d_003", type: "Creator Earnings", parties: "Sarah Mitchell — payment missing", status: "Investigating", severity: "Medium", summary: "Creator claims £50 missing from last payout" },
  { id: "d_004", type: "Allergen Accuracy", parties: "Emma C. vs Spice Route", status: "Awaiting Response", severity: "Low", summary: "Dispute over allergen labeling accuracy" },
  { id: "d_005", type: "Review Authenticity", parties: "Jordan L. vs Green Plate", status: "Investigating", severity: "High", summary: "Multiple fake positive reviews suspected" },
];

const statusStyles: Record<Dispute["status"], string> = {
  Investigating: "bg-admin-new-bg text-admin-new-text",
  "Awaiting Response": "bg-admin-vip-bg text-admin-vip-text",
  Closed: "bg-admin-non-bg text-admin-non-text",
};

const severityStyles: Record<Dispute["severity"], string> = {
  High: "bg-admin-non-bg text-admin-non-text",
  Medium: "bg-admin-vip-bg text-admin-vip-text",
  Low: "bg-admin-new-bg text-admin-new-text",
};

export default function DisputesPage() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState<"all" | Dispute["status"]>("all");

  const filtered = filter === "all" ? data : data.filter((d) => d.status === filter);

  const closeDispute = (id: string) => {
    setData((prev) => prev.map((d) => (d.id === id ? { ...d, status: "Closed" } : d)));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Disputes</h1>
        <p className="text-[14px] text-admin-muted">Resolve conflicts between users, restaurants, and creators.</p>
      </div>

      <div className="flex items-center gap-6 py-[14px] px-[26px] border-b border-admin-border text-[13.5px]">
        <span className="text-admin-muted">
          Open: <strong className="text-admin-text">{data.filter((d) => d.status !== "Closed").length}</strong>
        </span>
        <span className="text-admin-muted">
          Investigating: <strong className="text-admin-new-text">{data.filter((d) => d.status === "Investigating").length}</strong>
        </span>
        <span className="text-admin-muted">
          Awaiting: <strong className="text-admin-vip-text">{data.filter((d) => d.status === "Awaiting Response").length}</strong>
        </span>
        <div className="ml-auto flex items-center gap-1">
          {(["all", "Investigating", "Awaiting Response", "Closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-6">
        <div className="space-y-3 max-w-[900px]">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="bg-admin-bg border border-admin-border rounded-[10px] p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-[15px] font-semibold text-admin-text">{d.type}</h3>
                    <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${severityStyles[d.severity]}`}>
                      {d.severity}
                    </span>
                    <span className={`text-[11.5px] py-[2px] px-2 rounded-[6px] ${statusStyles[d.status]}`}>
                      {d.status}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-admin-nav-text font-medium">{d.parties}</p>
                  <p className="text-[13px] text-admin-muted mt-1">{d.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                <Link
                  href={`/admin/disputes/${d.id}`}
                  className="text-[13px] px-3 py-1.5 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover no-underline"
                >
                  View Details
                </Link>
                {d.status !== "Closed" && (
                  <button
                    onClick={() => closeDispute(d.id)}
                    className="text-[13px] px-3 py-1.5 rounded-md text-admin-non-text border border-admin-border hover:bg-admin-non-bg"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
