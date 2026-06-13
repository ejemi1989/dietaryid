"use client";

import { useState } from "react";
import Link from "next/link";

type Activity = {
  id: string;
  user: string;
  type: "review" | "post" | "message" | "creator" | "flag";
  action: string;
  target: string;
  timestamp: string;
  flagged: boolean;
};

const initialData: Activity[] = [
  { id: "a_001", user: "Sarah Mitchell", type: "review", action: "Left review", target: "The Italian Kitchen — 5⭐", timestamp: "2 min ago", flagged: false },
  { id: "a_002", user: "Mike Henderson", type: "flag", action: "Reported review", target: "Spice Route review by David L.", timestamp: "8 min ago", flagged: true },
  { id: "a_003", user: "Emma Collins", type: "post", action: "Created post", target: "Best vegan restaurants in London", timestamp: "15 min ago", flagged: false },
  { id: "a_004", user: "Jordan Lee", type: "message", action: "Sent message", target: "to Mike Henderson", timestamp: "22 min ago", flagged: false },
  { id: "a_005", user: "David Chen", type: "review", action: "Left review", target: "Burger Barn — 1⭐", timestamp: "1 hour ago", flagged: false },
  { id: "a_006", user: "Sophie Turner", type: "flag", action: "Account flagged", target: "Excessive reports received (5)", timestamp: "1 hour ago", flagged: true },
  { id: "a_007", user: "James Wilson", type: "creator", action: "Verified dish", target: "Gluten-Free Pasta at Green Plate", timestamp: "2 hours ago", flagged: false },
  { id: "a_008", user: "Olivia Brown", type: "post", action: "Created post", target: "Travelling with allergies — my tips", timestamp: "3 hours ago", flagged: false },
  { id: "a_009", user: "Liam Garcia", type: "review", action: "Left review", target: "Noodle House — 2⭐", timestamp: "4 hours ago", flagged: false },
  { id: "a_010", user: "Ava Martinez", type: "creator", action: "Created guide", target: "Safe eating in Manchester", timestamp: "5 hours ago", flagged: false },
  { id: "a_011", user: "Jordan Lee", type: "flag", action: "Spam pattern detected", target: "Multiple identical posts in last hour", timestamp: "5 hours ago", flagged: true },
  { id: "a_012", user: "Noah Anderson", type: "message", action: "Sent message", target: "to Sarah Mitchell", timestamp: "6 hours ago", flagged: false },
];

const typeColors: Record<Activity["type"], string> = {
  review: "bg-admin-active-bg text-admin-active-text",
  post: "bg-admin-new-bg text-admin-new-text",
  message: "bg-admin-muted/20 text-admin-text",
  creator: "bg-admin-tag-bg text-admin-tag-text",
  flag: "bg-admin-non-bg text-admin-non-text",
};

export default function ActivityPage() {
  const [data] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "flagged">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | Activity["type"]>("all");

  const filtered = data
    .filter((a) => filter === "all" || a.flagged)
    .filter((a) => typeFilter === "all" || a.type === typeFilter)
    .filter((a) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return [a.user, a.action, a.target].join(" ").toLowerCase().includes(q);
    });

  const flaggedCount = data.filter((a) => a.flagged).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">User Activity</h1>
        <p className="text-[14px] text-admin-muted">Real-time feed of user actions. Filter and search to investigate.</p>
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
            placeholder="Search by user or action..."
            className="border-none outline-none text-[14.5px] bg-none w-[240px] text-admin-text placeholder:text-admin-muted"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "flagged"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f
                  ? f === "flagged" ? "bg-admin-non-text text-white" : "bg-admin-dark text-white"
                  : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {f === "all" ? `All (${data.length})` : `Flagged (${flaggedCount})`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {(["all", "review", "post", "message", "creator", "flag"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t as typeof typeFilter)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors capitalize ${
                typeFilter === t ? "bg-admin-new-text text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {t === "all" ? "All types" : t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-4">
        <div className="space-y-2 max-w-[1000px]">
          {filtered.map((a) => (
            <Link
              key={a.id}
              href={`/admin/users/${a.user.toLowerCase().split(" ")[0].charAt(0)}${a.user.toLowerCase().split(" ")[1]?.charAt(0) || "x"}`}
              className="block bg-admin-bg border border-admin-border rounded-[10px] p-4 hover:border-admin-text transition-colors no-underline"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px] font-semibold text-admin-text">{a.user}</span>
                    <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${typeColors[a.type]}`}>
                      {a.type}
                    </span>
                    {a.flagged && (
                      <span className="text-[11px] py-[2px] px-2 rounded-[5px] bg-admin-non-bg text-admin-non-text">
                        ⚠ flagged
                      </span>
                    )}
                    <span className="text-[12px] text-admin-muted ml-auto">{a.timestamp}</span>
                  </div>
                  <p className="text-[13.5px] text-admin-nav-text mt-1">
                    <strong className="text-admin-text">{a.action}</strong> {a.target}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
