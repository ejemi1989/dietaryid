"use client";

import { useState } from "react";

type Template = {
  id: string;
  name: string;
  category: "Warning" | "Ban" | "Verification" | "Review" | "Creator" | "Dispute";
  subject: string;
  body: string;
};

const initialTemplates: Template[] = [
  {
    id: "t_001",
    name: "First warning — misinformation",
    category: "Warning",
    subject: "Your account has been flagged for review",
    body: "Your account has been flagged for [reason]. [Specific feedback]. Please refrain from [behavior]. Continued violations will result in account suspension.",
  },
  {
    id: "t_002",
    name: "Permanent ban",
    category: "Ban",
    subject: "Your account has been suspended",
    body: "After multiple warnings, your account has been permanently suspended for [reason]. You can appeal this decision by replying to this email within 30 days.",
  },
  {
    id: "t_003",
    name: "Verification approved",
    category: "Verification",
    subject: "Your restaurant has been verified!",
    body: "Congratulations! [Restaurant name] has been verified on DietaryID. Your verification badge is now active. Re-verification will be required in 90 days.",
  },
  {
    id: "t_004",
    name: "Verification rejected",
    category: "Verification",
    subject: "Verification submission needs changes",
    body: "Thank you for submitting [Restaurant name] for verification. Unfortunately, we need some changes before we can approve: [feedback]. Please update your submission and resubmit.",
  },
  {
    id: "t_005",
    name: "Review rejected",
    category: "Review",
    subject: "Your review was not approved",
    body: "Your review of [Restaurant] was not approved because [reason]. If you believe this was a mistake, please reply to this email with details.",
  },
  {
    id: "t_006",
    name: "Creator payout sent",
    category: "Creator",
    subject: "Your creator payout has been sent",
    body: "Your monthly creator payout of [amount] has been sent to your registered account [account]. Thank you for being part of the DietaryID community!",
  },
  {
    id: "t_007",
    name: "Dispute resolved — in user's favor",
    category: "Dispute",
    subject: "Dispute resolved",
    body: "After reviewing the dispute between you and [Restaurant], we have decided in your favor. [Reasoning]. £[amount] compensation has been credited to your account.",
  },
  {
    id: "t_008",
    name: "Dispute resolved — in restaurant's favor",
    category: "Dispute",
    subject: "Dispute resolved",
    body: "After reviewing the dispute between you and [Restaurant], we have dismissed the claim. [Reasoning]. The review in question has been removed.",
  },
];

const categoryColors: Record<Template["category"], string> = {
  Warning: "bg-admin-vip-bg text-admin-vip-text",
  Ban: "bg-admin-non-bg text-admin-non-text",
  Verification: "bg-admin-active-bg text-admin-active-text",
  Review: "bg-admin-new-bg text-admin-new-text",
  Creator: "bg-admin-tag-bg text-admin-tag-text",
  Dispute: "bg-admin-muted/20 text-admin-text",
};

export default function TemplatesPage() {
  const [templates] = useState(initialTemplates);
  const [selected, setSelected] = useState<Template | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Template["category"]>("all");

  const filtered = templates
    .filter((t) => filter === "all" || t.category === filter)
    .filter((t) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return [t.name, t.subject, t.body].join(" ").toLowerCase().includes(q);
    });

  const startEdit = () => {
    if (!selected) return;
    setEditedSubject(selected.subject);
    setEditedBody(selected.body);
    setEditing(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Communication Templates</h1>
        <p className="text-[14px] text-admin-muted">Pre-written messages for common admin actions. Click to preview and edit.</p>
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
            placeholder="Search templates..."
            className="border-none outline-none text-[14.5px] bg-none w-[200px] text-admin-text placeholder:text-admin-muted"
          />
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {(["all", "Warning", "Ban", "Verification", "Review", "Creator", "Dispute"] as const).map((c) => (
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
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[1100px]">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelected(t);
                setEditing(false);
              }}
              className="text-left bg-admin-bg border border-admin-border rounded-[10px] p-4 hover:border-admin-text transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${categoryColors[t.category]}`}>
                  {t.category}
                </span>
              </div>
              <h3 className="text-[14px] font-semibold text-admin-text mb-1">{t.name}</h3>
              <p className="text-[12.5px] text-admin-muted line-clamp-2">{t.subject}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && !editing && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[640px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${categoryColors[selected.category]}`}>
                {selected.category}
              </span>
              <h3 className="text-[16px] font-semibold text-admin-text">{selected.name}</h3>
            </div>
            <div className="mb-3">
              <div className="text-[12px] text-admin-muted mb-1">Subject</div>
              <div className="text-[14px] text-admin-text font-medium">{selected.subject}</div>
            </div>
            <div className="mb-4">
              <div className="text-[12px] text-admin-muted mb-1">Body</div>
              <div className="text-[14px] text-admin-nav-text whitespace-pre-wrap bg-admin-hover rounded-md p-3">
                {selected.body}
              </div>
            </div>
            <div className="text-[12px] text-admin-muted mb-4">
              💡 Replace [bracketed placeholders] with actual values before sending.
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Close
              </button>
              <button
                onClick={startEdit}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Use template
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && editing && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setEditing(false)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[640px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-3">Customize: {selected.name}</h3>
            <label className="block text-[12px] text-admin-muted mb-1">Subject</label>
            <input
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] text-admin-text mb-3 outline-none focus:ring-2 focus:ring-admin-new-bg"
            />
            <label className="block text-[12px] text-admin-muted mb-1">Body</label>
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditing(false)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setSelected(null);
                  alert(`Message queued for sending. Subject: "${editedSubject}"`);
                }}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-active-text hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
