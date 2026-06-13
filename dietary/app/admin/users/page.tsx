"use client";

import { useState } from "react";
import Link from "next/link";
import { SelectionBar } from "@/components/dashboard/SelectionBar";

type User = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Suspended" | "Banned";
  reviews: number;
  isCreator: boolean;
};

const initialData: User[] = [
  { id: "u_001", name: "Sarah Mitchell", email: "sarah.m@email.com", status: "Active", reviews: 47, isCreator: true },
  { id: "u_002", name: "Mike Henderson", email: "mike.h@email.com", status: "Active", reviews: 23, isCreator: false },
  { id: "u_003", name: "Jordan Lee", email: "jordan.l@email.com", status: "Suspended", reviews: 0, isCreator: false },
  { id: "u_004", name: "Alex Kim", email: "alex.k@email.com", status: "Banned", reviews: 156, isCreator: false },
  { id: "u_005", name: "Emma Collins", email: "emma.c@email.com", status: "Active", reviews: 89, isCreator: true },
  { id: "u_006", name: "David Chen", email: "david.c@email.com", status: "Active", reviews: 34, isCreator: false },
  { id: "u_007", name: "Sophie Turner", email: "sophie.t@email.com", status: "Active", reviews: 12, isCreator: false },
  { id: "u_008", name: "James Wilson", email: "james.w@email.com", status: "Active", reviews: 67, isCreator: true },
  { id: "u_009", name: "Olivia Brown", email: "olivia.b@email.com", status: "Suspended", reviews: 3, isCreator: false },
  { id: "u_010", name: "Liam Garcia", email: "liam.g@email.com", status: "Active", reviews: 45, isCreator: false },
  { id: "u_011", name: "Ava Martinez", email: "ava.m@email.com", status: "Active", reviews: 78, isCreator: true },
  { id: "u_012", name: "Noah Anderson", email: "noah.a@email.com", status: "Active", reviews: 19, isCreator: false },
  { id: "u_013", name: "Isabella Thomas", email: "isabella.t@email.com", status: "Banned", reviews: 0, isCreator: false },
  { id: "u_014", name: "Ethan Jackson", email: "ethan.j@email.com", status: "Active", reviews: 56, isCreator: true },
  { id: "u_015", name: "Mia White", email: "mia.w@email.com", status: "Active", reviews: 28, isCreator: false },
];

const statusStyles: Record<User["status"], string> = {
  Active: "bg-admin-active-bg text-admin-active-text",
  Suspended: "bg-admin-vip-bg text-admin-vip-text",
  Banned: "bg-admin-non-bg text-admin-non-text",
};

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function UsersPage() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | User["status"]>("all");
  const [confirmAction, setConfirmAction] = useState<{ index: number; action: "ban" } | null>(null);

  const filtered = data
    .filter((u) => filter === "all" || u.status === filter)
    .filter((u) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return [u.name, u.email].join(" ").toLowerCase().includes(q);
    });

  const toggleRow = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((_, i) => i)));
  };

  const handleStatusChange = (index: number, newStatus: User["status"]) => {
    setData((prev) => prev.map((u, i) => (i === index ? { ...u, status: newStatus } : u)));
  };

  const confirmBan = () => {
    if (confirmAction) {
      handleStatusChange(confirmAction.index, "Banned");
      setConfirmAction(null);
    }
  };

  const getSelectedUsers = () => {
    return data.filter((u, i) => selected.has(i));
  };

  const handleBulkSuspend = () => {
    if (!confirm(`Suspend ${selected.size} user(s)?`)) return;
    const sel = new Set(selected);
    setData((prev) => prev.map((u, i) => sel.has(i) && u.status === "Active" ? { ...u, status: "Suspended" as const } : u));
    setSelected(new Set());
  };

  const handleBulkRestore = () => {
    if (!confirm(`Restore ${selected.size} user(s)?`)) return;
    const sel = new Set(selected);
    setData((prev) => prev.map((u, i) => sel.has(i) && u.status !== "Active" ? { ...u, status: "Active" as const } : u));
    setSelected(new Set());
  };

  const handleBulkDelete = () => {
    if (!confirm(`Permanently delete ${selected.size} user(s)? This cannot be undone.`)) return;
    const sel = new Set(selected);
    setData((prev) => prev.filter((_, i) => !sel.has(i)));
    setSelected(new Set());
  };

  const handleBulkExport = () => {
    const sel = getSelectedUsers();
    const csv = "name,email,status,reviews,creator\n" +
      sel.map((u) => `${u.name},${u.email},${u.status},${u.reviews},${u.isCreator ? "Yes" : "No"}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasSuspended = getSelectedUsers().some((u) => u.status === "Suspended" || u.status === "Banned");
  const hasActive = getSelectedUsers().some((u) => u.status === "Active");

  const allSelected = selected.size > 0 && selected.size === filtered.length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Users</h1>
        <p className="text-[14px] text-admin-muted">Manage user accounts, warnings, and bans.</p>
      </div>

      <div className="flex items-center gap-5 py-[14px] px-[26px] border-b border-admin-border">
        <div className="flex items-center gap-[7px] text-[14.5px] text-admin-nav-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="border-none outline-none text-[14.5px] bg-none w-[260px] text-admin-text placeholder:text-admin-muted"
          />
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {(["all", "Active", "Suspended", "Banned"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f
                  ? "bg-admin-dark text-white"
                  : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold w-[42px]">
                <Checkbox checked={allSelected} onClick={toggleAll} />
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Name
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Status
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Reviews
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Creator
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold w-[200px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const originalIndex = data.indexOf(row);
              const isSelected = selected.has(originalIndex);
              return (
                <tr
                  key={row.id}
                  onClick={() => toggleRow(originalIndex)}
                  className={`cursor-pointer ${isSelected ? "bg-admin-sel-row" : "hover:bg-admin-hover"}`}
                >
                  <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                    <Checkbox checked={isSelected} onClick={() => toggleRow(originalIndex)} />
                  </td>
                  <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text">
                    <div className="flex items-center gap-3">
                      <div className="w-[30px] h-[30px] rounded-full bg-admin-avatar-bg flex items-center justify-center text-[11px] font-semibold text-admin-avatar-text flex-shrink-0">
                        {getInitials(row.name)}
                      </div>
                      <div>
                        <div>{row.name}</div>
                        <div className="text-[12px] text-admin-muted">{row.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                    <span className={`text-[12.5px] py-[3px] px-[11px] rounded-[7px] inline-block ${statusStyles[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text">
                    {row.reviews}
                  </td>
                  <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text">
                    {row.isCreator ? "Yes" : "No"}
                  </td>
                  <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1.5">
                      {row.status !== "Active" && (
                        <button
                          onClick={() => handleStatusChange(originalIndex, "Active")}
                          className="text-[12px] px-2 py-1 rounded-md text-admin-active-text hover:bg-admin-active-bg transition-colors"
                        >
                          Restore
                        </button>
                      )}
                      {row.status === "Active" && (
                        <button
                          onClick={() => handleStatusChange(originalIndex, "Suspended")}
                          className="text-[12px] px-2 py-1 rounded-md text-admin-vip-text hover:bg-admin-vip-bg transition-colors"
                        >
                          Suspend
                        </button>
                      )}
                      {row.status !== "Banned" && (
                        <button
                          onClick={() => setConfirmAction({ index: originalIndex, action: "ban" })}
                          className="text-[12px] px-2 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg transition-colors"
                        >
                          Ban
                        </button>
                      )}
                      <Link
                        href={`/admin/users/${row.id}`}
                        className="text-[12px] px-2 py-1 rounded-md text-admin-new-text hover:bg-admin-new-bg transition-colors no-underline"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <SelectionBar
        count={selected.size}
        onClear={() => setSelected(new Set())}
        onExport={handleBulkExport}
        onSuspend={hasActive ? handleBulkSuspend : undefined}
        onRestore={hasSuspended ? handleBulkRestore : undefined}
        onDelete={handleBulkDelete}
      />

      {confirmAction && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setConfirmAction(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[420px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Confirm ban</h3>
            <p className="text-[14px] text-admin-nav-text mb-1">
              Are you sure you want to ban <strong>{data[confirmAction.index]?.name}</strong>?
            </p>
            <p className="text-[13px] text-admin-muted mb-5">This cannot be easily undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={confirmBan}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Checkbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-[18px] h-[18px] border-[1.5px] rounded-[5px] cursor-pointer inline-flex items-center justify-center align-middle ${
        checked ? "bg-admin-dark border-admin-dark" : "bg-admin-bg border-admin-cb-border"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[11px] h-[11px]">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}
