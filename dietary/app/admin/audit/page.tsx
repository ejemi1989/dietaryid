"use client";

import { useState } from "react";

type LogEntry = {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  category: "Moderation" | "Verification" | "Users" | "Dispute" | "Creator" | "Settings";
  target: string;
  details: string;
};

const initialData: LogEntry[] = [
  { id: "l_001", timestamp: "2024-10-15 14:32:01", admin: "Emily Davis", action: "Review Approved", category: "Moderation", target: "Review #rv_001", details: "Approved Sarah M.'s review of The Italian Kitchen" },
  { id: "l_002", timestamp: "2024-10-15 14:28:45", admin: "Emily Davis", action: "Restaurant Verified", category: "Verification", target: "The Sushi Palace", details: "Approved verification for Glasgow location" },
  { id: "l_003", timestamp: "2024-10-15 14:15:22", admin: "Emily Davis", action: "User Suspended", category: "Users", target: "u_003 (Jordan Lee)", details: "Suspended for 30 days — repeated misinformation" },
  { id: "l_004", timestamp: "2024-10-15 13:50:10", admin: "Emily Davis", action: "Payout Processed", category: "Creator", target: "c_001 (Sarah Mitchell)", details: "Processed payout of £239.60 to bank ****4567" },
  { id: "l_005", timestamp: "2024-10-15 13:22:55", admin: "Emily Davis", action: "Dispute Resolved", category: "Dispute", target: "d_001", details: "Awarded £50 to user — restaurant cross-contamination confirmed" },
  { id: "l_006", timestamp: "2024-10-15 12:45:30", admin: "Emily Davis", action: "Review Rejected", category: "Moderation", target: "Review #rv_004", details: "Rejected for harassment — required edit or removal" },
  { id: "l_007", timestamp: "2024-10-15 12:10:18", admin: "Emily Davis", action: "User Banned", category: "Users", target: "u_004 (Alex Kim)", details: "Permanently banned — harassment pattern" },
  { id: "l_008", timestamp: "2024-10-15 11:55:42", admin: "Emily Davis", action: "Restaurant Rejected", category: "Verification", target: "Burger Express", details: "Rejected — incomplete menu submission" },
  { id: "l_009", timestamp: "2024-10-15 11:30:00", admin: "Emily Davis", action: "Post Approved", category: "Moderation", target: "Post #p_001", details: "Approved Sarah M.'s GF pizza tips post" },
  { id: "l_010", timestamp: "2024-10-15 11:00:15", admin: "Emily Davis", action: "Warning Sent", category: "Users", target: "u_005 (Emma Collins)", details: "First warning — out of scope reply" },
  { id: "l_011", timestamp: "2024-10-15 10:45:30", admin: "Emily Davis", action: "Payout Processed", category: "Creator", target: "c_004 (Emma Collins)", details: "Processed payout of £412.80" },
  { id: "l_012", timestamp: "2024-10-15 10:20:00", admin: "Emily Davis", action: "Dispute Opened", category: "Dispute", target: "d_005", details: "High-severity dispute opened: Jordan L. vs Green Plate" },
];

const categoryStyles: Record<LogEntry["category"], string> = {
  Moderation: "bg-admin-new-bg text-admin-new-text",
  Verification: "bg-admin-active-bg text-admin-active-text",
  Users: "bg-admin-vip-bg text-admin-vip-text",
  Dispute: "bg-admin-muted/20 text-admin-text",
  Creator: "bg-admin-tag-bg text-admin-tag-text",
  Settings: "bg-admin-non-bg text-admin-non-text",
};

export default function AuditPage() {
  const [data] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | LogEntry["category"]>("all");

  const filtered = data
    .filter((l) => filter === "all" || l.category === filter)
    .filter((l) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return [l.admin, l.action, l.target, l.details].join(" ").toLowerCase().includes(q);
    })
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const exportCsv = () => {
    const csv = [
      ["Timestamp", "Admin", "Category", "Action", "Target", "Details"],
      ...data.map((l) => [l.timestamp, l.admin, l.category, l.action, l.target, l.details]),
    ]
      .map((row) => row.map((c) => `"${c}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Audit Log</h1>
        <p className="text-[14px] text-admin-muted">Full history of admin actions. Searchable and exportable.</p>
      </div>

      <div className="flex items-center gap-3 py-[14px] px-[26px] border-b border-admin-border flex-wrap">
        <div className="flex items-center gap-[7px] text-[14.5px] text-admin-nav-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by admin, action, target..."
            className="border-none outline-none text-[14.5px] bg-none w-[280px] text-admin-text placeholder:text-admin-muted"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "Moderation", "Verification", "Users", "Dispute", "Creator"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c as typeof filter)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === c ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
        <button
          onClick={exportCsv}
          className="ml-auto text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
        >
          Export CSV
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold w-[180px]">
                Timestamp
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Admin
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Action
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold hidden md:table-cell">
                Target
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-admin-hover">
                <td className="py-[13px] px-[14px] text-[12.5px] border-b border-admin-border text-admin-muted whitespace-nowrap">
                  {l.timestamp}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text">
                  {l.admin}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${categoryStyles[l.category]}`}>
                      {l.category}
                    </span>
                    <span className="text-admin-text">{l.action}</span>
                  </div>
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text hidden md:table-cell font-mono text-[12.5px]">
                  {l.target}
                </td>
                <td className="py-[13px] px-[14px] text-[13px] border-b border-admin-border text-admin-nav-text">
                  {l.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
