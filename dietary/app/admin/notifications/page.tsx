"use client";

import { useState } from "react";

type Notification = {
  id: string;
  type: "moderation" | "verification" | "dispute" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const initialData: Notification[] = [
  { id: "n_001", type: "moderation", title: "Review flagged", message: "David L.'s review on Spice Route needs review", time: "2 min ago", read: false },
  { id: "n_002", type: "verification", title: "New verification", message: "The Sushi Palace submitted for verification", time: "15 min ago", read: false },
  { id: "n_003", type: "dispute", title: "Dispute escalated", message: "High-severity dispute opened: Alex Kim", time: "1 hour ago", read: false },
  { id: "n_004", type: "system", title: "Backup complete", message: "Daily backup completed successfully", time: "2 hours ago", read: true },
];

export default function NotificationsPage() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? data.filter((n) => !n.read) : data;

  const markRead = (id: string) => {
    setData((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setData((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Notifications</h1>
        <p className="text-[14px] text-admin-muted">{data.filter((n) => !n.read).length} unread</p>
      </div>

      <div className="flex items-center gap-3 py-[14px] px-[26px] border-b border-admin-border">
        <div className="flex items-center gap-1">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {f === "all" ? "All" : "Unread"}
            </button>
          ))}
        </div>
        <button
          onClick={markAllRead}
          className="ml-auto text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
        >
          Mark all read
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-4">
        <div className="space-y-2 max-w-[800px]">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`bg-admin-bg border rounded-[10px] p-4 cursor-pointer transition-colors ${
                n.read ? "border-admin-border" : "border-admin-new-text"
              } ${!n.read ? "bg-admin-new-bg/30" : ""}`}
            >
              <div className="flex items-start gap-3">
                {!n.read && <div className="w-2 h-2 rounded-full bg-admin-new-text mt-1.5 flex-shrink-0" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-admin-text">{n.title}</span>
                    <span className="text-[12px] text-admin-muted">{n.time}</span>
                  </div>
                  <p className="text-[13.5px] text-admin-nav-text mt-0.5">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
