"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "investigating" | "awaiting_response" | "ready_to_resolve" | "resolved";

type Dispute = {
  id: string;
  creatorId: string;
  creatorName: string;
  avatar: string;
  type: "miscalculation" | "payout_missing" | "payout_failed" | "duplicate_charge" | "other";
  claim: string;
  amount: number;
  evidence: string[];
  filedAt: string;
  ageDays: number;
  status: Status;
  findings?: string;
  resolution?: string;
  compensation?: number;
  auditTrail: { time: string; actor: string; action: string }[];
};

const initialDisputes: Dispute[] = [
  {
    id: "DSP-2024-048",
    creatorId: "c_001",
    creatorName: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/80?u=c_001",
    type: "miscalculation",
    claim: "I should have earned £500 this month, but balance shows £350.",
    amount: 150.00,
    evidence: ["screenshot_dashboard_oct.png", "review_log.csv"],
    filedAt: "Oct 18, 2024",
    ageDays: 5,
    status: "investigating",
    auditTrail: [
      { time: "Oct 18, 10:30 AM", actor: "Sarah M. (c_001)", action: "Filed dispute DSP-2024-048" },
      { time: "Oct 18, 11:00 AM", actor: "admin_001", action: "Assigned to self · Started investigation" },
    ],
  },
  {
    id: "DSP-2024-049",
    creatorId: "c_002",
    creatorName: "Mike Henderson",
    avatar: "https://i.pravatar.cc/80?u=c_002",
    type: "payout_missing",
    claim: "Payout never arrived in my bank account.",
    amount: 198.50,
    evidence: ["bank_statement_oct.pdf"],
    filedAt: "Oct 20, 2024",
    ageDays: 3,
    status: "awaiting_response",
    auditTrail: [
      { time: "Oct 20, 9:15 AM", actor: "Mike H. (c_002)", action: "Filed dispute DSP-2024-049" },
      { time: "Oct 20, 9:45 AM", actor: "admin_001", action: "Checked Stripe: payout in transit, ETA Oct 18-19 (timing normal)" },
      { time: "Oct 20, 9:50 AM", actor: "admin_001", action: "Sent status update to creator · Awaiting bank confirmation" },
    ],
  },
  {
    id: "DSP-2024-047",
    creatorId: "c_003",
    creatorName: "Jordan Lee",
    avatar: "https://i.pravatar.cc/80?u=c_003",
    type: "payout_failed",
    claim: "Payout failed, no explanation. £189.32 missing.",
    amount: 189.32,
    evidence: ["payout_history.pdf"],
    filedAt: "Oct 15, 2024",
    ageDays: 8,
    status: "ready_to_resolve",
    findings: "Bank account not verified in Stripe. Auto-email sent Oct 15 + reminder Oct 20. No response from creator.",
    auditTrail: [
      { time: "Oct 15, 12:00 PM", actor: "Stripe", action: "Payout failed — bank not verified" },
      { time: "Oct 15, 5:00 PM", actor: "system", action: "Email sent to creator" },
      { time: "Oct 20, 5:00 PM", actor: "system", action: "Reminder email sent" },
      { time: "Oct 23, 10:00 AM", actor: "admin_001", action: "Started investigation · Found no creator response" },
    ],
  },
  {
    id: "DSP-2024-046",
    creatorId: "c_004",
    creatorName: "Emma Collins",
    avatar: "https://i.pravatar.cc/80?u=c_004",
    type: "miscalculation",
    claim: "Review counted twice — I was paid £2.70 instead of £1.35.",
    amount: 1.35,
    evidence: ["earnings_log.png"],
    filedAt: "Oct 10, 2024",
    ageDays: 13,
    status: "resolved",
    findings: "Confirmed system error: review #4521 was double-counted. Resolved with correction + £5 goodwill bonus.",
    resolution: "Correction applied: +£1.35 (refund duplicate) + £5.00 (goodwill). Total: +£6.35 added to balance.",
    compensation: 6.35,
    auditTrail: [
      { time: "Oct 10, 2:30 PM", actor: "Emma C. (c_004)", action: "Filed dispute DSP-2024-046" },
      { time: "Oct 11, 9:00 AM", actor: "admin_001", action: "Started investigation · Found review #4521 double-counted" },
      { time: "Oct 11, 10:30 AM", actor: "admin_001", action: "Applied correction: +£1.35 refund + £5.00 bonus = +£6.35" },
      { time: "Oct 11, 10:35 AM", actor: "system", action: "Email sent to Emma: dispute resolved" },
    ],
  },
  {
    id: "DSP-2024-045",
    creatorId: "c_005",
    creatorName: "David Chen",
    avatar: "https://i.pravatar.cc/80?u=c_005",
    type: "duplicate_charge",
    claim: "I was charged a 2% fee twice on the same payout.",
    amount: 1.78,
    evidence: ["stripe_receipt.pdf"],
    filedAt: "Oct 5, 2024",
    ageDays: 18,
    status: "resolved",
    findings: "Verified Stripe logs: only one fee applied. Dispute was based on misunderstanding. Closed without compensation.",
    resolution: "No error found. Closed with explanation sent to creator. Stripe fee structure documented and shared.",
    auditTrail: [
      { time: "Oct 5, 11:00 AM", actor: "David C. (c_005)", action: "Filed dispute DSP-2024-045" },
      { time: "Oct 6, 9:00 AM", actor: "admin_002", action: "Verified Stripe logs · No duplicate fee found" },
      { time: "Oct 6, 2:00 PM", actor: "admin_002", action: "Sent fee structure explanation to creator" },
      { time: "Oct 7, 10:00 AM", actor: "admin_002", action: "Closed dispute · Marked as resolved" },
    ],
  },
];

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
  investigating: { bg: "bg-admin-new-bg", text: "text-admin-new-text", label: "Investigating" },
  awaiting_response: { bg: "bg-admin-vip-bg", text: "text-admin-vip-text", label: "Awaiting Response" },
  ready_to_resolve: { bg: "bg-admin-active-bg", text: "text-admin-active-text", label: "Ready to Resolve" },
  resolved: { bg: "bg-admin-non-bg", text: "text-admin-non-text", label: "Resolved" },
};

export default function AdminEarningsDisputesPage() {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [filter, setFilter] = useState<"open" | "resolved" | "all">("open");
  const [activeId, setActiveId] = useState(disputes[0].id);
  const [showResolve, setShowResolve] = useState<string | null>(null);
  const [resolution, setResolution] = useState({ type: "compensation", amount: 0, notes: "", notify: true });

  const active = disputes.find((d) => d.id === activeId);
  const filtered = disputes.filter((d) => {
    if (filter === "open") return d.status !== "resolved";
    if (filter === "resolved") return d.status === "resolved";
    return true;
  });

  const handleResolve = (id: string) => {
    setDisputes((prev) => prev.map((d) => d.id === id ? {
      ...d,
      status: "resolved" as const,
      resolution: resolution.notes || "Dispute resolved by admin",
      compensation: resolution.amount > 0 ? resolution.amount : undefined,
      auditTrail: [...d.auditTrail, { time: new Date().toLocaleString(), actor: "admin_001", action: `Resolved: ${resolution.notes}${resolution.amount > 0 ? ` (+£${resolution.amount.toFixed(2)} compensation)` : ""}` }],
    } : d));
    setShowResolve(null);
    setResolution({ type: "compensation", amount: 0, notes: "", notify: true });
  };

  const handleAddNote = (id: string, note: string) => {
    if (!note.trim()) return;
    setDisputes((prev) => prev.map((d) => d.id === id ? {
      ...d,
      auditTrail: [...d.auditTrail, { time: new Date().toLocaleString(), actor: "admin_001", action: note }],
    } : d));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Earnings Disputes 💼</h1>
            <p className="text-[13.5px] text-admin-muted">Resolve creator disputes about earnings calculations, missing payouts, and platform fees.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[12.5px] text-admin-muted">
              {disputes.filter((d) => d.status !== "resolved").length} open · {disputes.filter((d) => d.status === "resolved").length} resolved
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {([
          { v: "open", l: "Open" },
          { v: "resolved", l: "Resolved" },
          { v: "all", l: "All" },
        ] as const).map((f) => (
          <button
            key={f.v}
            onClick={() => setFilter(f.v)}
            className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
              filter === f.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        <div className="w-[360px] flex-shrink-0 border-r border-admin-border bg-admin-bg overflow-y-auto">
          {filtered.map((d) => {
            const s = statusStyles[d.status];
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className={`w-full text-left p-3 border-b border-admin-border transition-colors ${
                  isActive ? "bg-admin-hover" : "hover:bg-admin-hover"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <img src={d.avatar} alt="" className="w-7 h-7 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-admin-text truncate">{d.creatorName}</div>
                    <div className="text-[10.5px] text-admin-muted">{d.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${s.bg} ${s.text}`}>{s.label}</span>
                  <span className="text-[10.5px] text-admin-muted">· {d.ageDays}d</span>
                </div>
                <p className="text-[11.5px] text-admin-muted line-clamp-2">{d.claim}</p>
                <div className="text-[12px] font-semibold text-admin-text mt-1">£{d.amount.toFixed(2)}</div>
              </button>
            );
          })}
        </div>

        {active && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-[800px]">
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div>
                  <h2 className="text-[20px] font-semibold text-admin-text mb-1">{active.id}</h2>
                  <p className="text-[12.5px] text-admin-muted">Filed {active.filedAt} · {active.ageDays} days ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11.5px] px-2.5 py-1 rounded font-medium ${statusStyles[active.status].bg} ${statusStyles[active.status].text}`}>
                    {statusStyles[active.status].label}
                  </span>
                  {active.status !== "resolved" && (
                    <button
                      onClick={() => setShowResolve(active.id)}
                      className="text-[13px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                    >
                      ✓ Resolve
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <img src={active.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="text-[14px] font-semibold text-admin-text">{active.creatorName}</div>
                    <div className="text-[12px] text-admin-muted">{active.creatorId}</div>
                  </div>
                  <Link href={`/admin/creators/${active.creatorId}`} className="ml-auto text-[12px] text-admin-new-text no-underline hover:underline">View creator →</Link>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[12.5px] mb-3">
                  <div className="p-2 rounded bg-admin-hover">
                    <div className="text-admin-muted text-[11px]">Type</div>
                    <div className="text-admin-text font-medium capitalize">{active.type.replace("_", " ")}</div>
                  </div>
                  <div className="p-2 rounded bg-admin-hover">
                    <div className="text-admin-muted text-[11px]">Disputed amount</div>
                    <div className="text-admin-text font-medium">£{active.amount.toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Creator&apos;s claim</div>
                  <div className="p-3 rounded-md bg-admin-hover text-[13.5px] text-admin-text italic">&ldquo;{active.claim}&rdquo;</div>
                </div>
                <div className="mt-2">
                  <div className="text-[12px] text-admin-muted mb-1">Evidence ({active.evidence.length})</div>
                  <div className="space-y-1">
                    {active.evidence.map((e) => (
                      <div key={e} className="flex items-center gap-2 p-2 rounded bg-admin-hover text-[12.5px]">
                        <span>📎</span>
                        <span className="text-admin-text font-mono">{e}</span>
                        <button
                          onClick={() => alert(`Viewed ${e} (mock)`)}
                          className="ml-auto text-[11px] text-admin-new-text hover:underline"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {active.findings && (
                <div className="bg-admin-new-bg border border-admin-new-text/30 rounded-[10px] p-4 mb-3">
                  <div className="text-[12.5px] font-semibold text-admin-new-text mb-1">🔍 Investigation findings</div>
                  <p className="text-[13px] text-admin-text">{active.findings}</p>
                </div>
              )}

              {active.resolution && (
                <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-4 mb-3">
                  <div className="text-[12.5px] font-semibold text-admin-active-text mb-1">✓ Resolution</div>
                  <p className="text-[13px] text-admin-text">{active.resolution}</p>
                  {active.compensation && (
                    <p className="text-[12.5px] text-admin-text mt-1">Compensation: <strong>£{active.compensation.toFixed(2)}</strong></p>
                  )}
                </div>
              )}

              {active.status !== "resolved" && (
                <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4 mb-3">
                  <h3 className="text-[14px] font-semibold text-admin-text mb-2">Add investigation note</h3>
                  <NoteForm onAdd={(note) => handleAddNote(active.id, note)} />
                </div>
              )}

              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
                <h3 className="text-[14px] font-semibold text-admin-text mb-3">Audit trail</h3>
                <div className="space-y-2">
                  {active.auditTrail.map((t, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12.5px]">
                      <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-admin-new-text flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-admin-text">{t.action}</div>
                        <div className="text-[11.5px] text-admin-muted">{t.actor} · {t.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showResolve && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowResolve(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Resolve dispute {showResolve}</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Choose a resolution and document the outcome.</p>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Resolution type</label>
                <select
                  value={resolution.type}
                  onChange={(e) => setResolution((r) => ({ ...r, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
                >
                  <option value="compensation">Award compensation</option>
                  <option value="correction">Apply correction (no bonus)</option>
                  <option value="dismiss">Dismiss (no error found)</option>
                  <option value="manual_payout">Process manual payout</option>
                </select>
              </div>
              {resolution.type === "compensation" && (
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Compensation amount (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={resolution.amount}
                    onChange={(e) => setResolution((r) => ({ ...r, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Resolution notes (logged to audit)</label>
                <textarea
                  value={resolution.notes}
                  onChange={(e) => setResolution((r) => ({ ...r, notes: e.target.value }))}
                  rows={3}
                  placeholder="Document the decision and findings..."
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none resize-none"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={resolution.notify}
                  onChange={(e) => setResolution((r) => ({ ...r, notify: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span className="text-[12.5px] text-admin-text">Email creator with resolution</span>
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowResolve(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => handleResolve(showResolve)}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                ✓ Apply resolution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoteForm({ onAdd }: { onAdd: (note: string) => void }) {
  const [note, setNote] = useState("");
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), note.trim() && (onAdd(note), setNote("")))}
        placeholder="e.g. Verified Stripe logs, no duplicate fee..."
        className="flex-1 px-3 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
      />
      <button
        onClick={() => { note.trim() && (onAdd(note), setNote("")); }}
        disabled={!note.trim()}
        className="text-[12px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
      >
        Add note
      </button>
    </div>
  );
}
