"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "submitted" | "in_transit" | "paid" | "failed";

type BatchPayout = {
  id: string;
  creatorId: string;
  creatorName: string;
  avatar: string;
  amount: number;
  fees: number;
  net: number;
  method: "stripe" | "paypal";
  accountLast4: string;
  status: Status;
  stripePayoutId?: string;
  retries: number;
  failureReason?: string;
  submittedAt?: string;
  paidAt?: string;
};

type Batch = {
  id: string;
  name: string;
  createdAt: string | null;
  payoutDate: string;
  totalPayouts: number;
  totalAmount: number;
  totalFees: number;
  netDisbursed: number;
  payouts: BatchPayout[];
  status: "draft" | "submitted" | "in_progress" | "completed" | "partial";
};

const initialBatches: Batch[] = [
  {
    id: "batch_2024_10",
    name: "October 2024 Payouts",
    createdAt: "Oct 15, 2024 · 11:00 AM",
    payoutDate: "Oct 15, 2024",
    totalPayouts: 847,
    totalAmount: 124350.65,
    totalFees: 1856.40,
    netDisbursed: 122494.25,
    status: "completed",
    payouts: [
      { id: "p1", creatorId: "c_001", creatorName: "Sarah Mitchell", avatar: "https://i.pravatar.cc/80?u=c_001", amount: 247.30, fees: 3.91, net: 243.39, method: "stripe", accountLast4: "4567", status: "paid", stripePayoutId: "po_5555555555", retries: 0, submittedAt: "Oct 15 12:00 PM", paidAt: "Oct 18 9:23 AM" },
      { id: "p2", creatorId: "c_002", creatorName: "Mike Henderson", avatar: "https://i.pravatar.cc/80?u=c_002", amount: 234.50, fees: 3.72, net: 230.78, method: "stripe", accountLast4: "8910", status: "paid", stripePayoutId: "po_5555555556", retries: 0, submittedAt: "Oct 15 12:00 PM", paidAt: "Oct 18 9:45 AM" },
      { id: "p3", creatorId: "c_004", creatorName: "Emma Collins", avatar: "https://i.pravatar.cc/80?u=c_004", amount: 412.80, fees: 6.39, net: 406.41, method: "stripe", accountLast4: "3344", status: "paid", stripePayoutId: "po_5555555557", retries: 0, submittedAt: "Oct 15 12:00 PM", paidAt: "Oct 18 10:14 AM" },
      { id: "p4", creatorId: "c_005", creatorName: "David Chen", avatar: "https://i.pravatar.cc/80?u=c_005", amount: 89.40, fees: 1.54, net: 0, method: "stripe", accountLast4: "1234", status: "failed", retries: 2, failureReason: "Bank account invalid — closed account", submittedAt: "Oct 15 12:00 PM" },
      { id: "p5", creatorId: "c_006", creatorName: "Sophie Turner", avatar: "https://i.pravatar.cc/80?u=c_006", amount: 267.90, fees: 4.22, net: 263.68, method: "paypal", accountLast4: "sophie@gmail.com", status: "paid", stripePayoutId: "po_5555555558", retries: 0, submittedAt: "Oct 15 12:00 PM", paidAt: "Oct 18 11:02 AM" },
      { id: "p6", creatorId: "c_007", creatorName: "James Wilson", avatar: "https://i.pravatar.cc/80?u=c_007", amount: 523.10, fees: 8.05, net: 515.05, method: "stripe", accountLast4: "5566", status: "in_transit", retries: 0, stripePayoutId: "po_5555555559", submittedAt: "Oct 15 12:00 PM" },
    ],
  },
  {
    id: "batch_2024_09",
    name: "September 2024 Payouts",
    createdAt: "Sept 15, 2024 · 11:00 AM",
    payoutDate: "Sept 15, 2024",
    totalPayouts: 798,
    totalAmount: 110850.00,
    totalFees: 1662.75,
    netDisbursed: 109187.25,
    status: "completed",
    payouts: [
      { id: "p7", creatorId: "c_001", creatorName: "Sarah Mitchell", avatar: "https://i.pravatar.cc/80?u=c_001", amount: 225.10, fees: 3.58, net: 221.52, method: "stripe", accountLast4: "4567", status: "paid", stripePayoutId: "po_4444444444", retries: 0, submittedAt: "Sept 15 12:00 PM", paidAt: "Sept 18 10:14 AM" },
    ],
  },
  {
    id: "batch_2024_11",
    name: "November 2024 Payouts (upcoming)",
    createdAt: null,
    payoutDate: "Nov 15, 2024",
    totalPayouts: 0,
    totalAmount: 0,
    totalFees: 0,
    netDisbursed: 0,
    status: "draft",
    payouts: [],
  },
];

const statusColors: Record<Status, string> = {
  submitted: "bg-admin-vip-bg text-admin-vip-text",
  in_transit: "bg-admin-new-bg text-admin-new-text",
  paid: "bg-admin-active-bg text-admin-active-text",
  failed: "bg-admin-non-bg text-admin-non-text",
};

export default function AdminPayoutsPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [activeBatchId, setActiveBatchId] = useState(batches[0].id);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [showRun, setShowRun] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<string | null>(null);

  const active = batches.find((b) => b.id === activeBatchId);
  const filteredPayouts = active?.payouts.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.creatorName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }) || [];

  const handleRetry = (payoutId: string) => {
    setBatches((prev) => prev.map((b) => ({
      ...b,
      payouts: b.payouts.map((p) => p.id === payoutId ? { ...p, status: "submitted" as const, retries: p.retries + 1, failureReason: undefined, submittedAt: new Date().toLocaleString() } : p),
    })));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Payout batches 💸</h1>
            <p className="text-[13.5px] text-admin-muted">Monthly payout processing, manual payouts, retries, and reconciliation.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowManual(true)}
              className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              💰 Manual payout
            </button>
            <button
              onClick={() => setShowRun(true)}
              className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 font-medium"
            >
              🚀 Run monthly batch
            </button>
          </div>
        </div>
      </div>

      <div className="px-[26px] py-3 border-b border-admin-border">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] text-admin-muted uppercase tracking-wider mr-1">Batches:</span>
          {batches.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBatchId(b.id)}
              className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
                activeBatchId === b.id ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
              }`}
            >
              {b.name}
              {b.status === "completed" && <span className="ml-1.5 text-[10px]">✓</span>}
              {b.status === "draft" && <span className="ml-1.5 text-[10px]">⏳</span>}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <>
          <div className="px-[26px] py-4 border-b border-admin-border">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[12px] text-admin-muted">Total payouts</div>
                <div className="text-[18px] font-semibold text-admin-text">{active.totalPayouts}</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[12px] text-admin-muted">Gross</div>
                <div className="text-[18px] font-semibold text-admin-text">£{active.totalAmount.toFixed(2)}</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[12px] text-admin-muted">Fees</div>
                <div className="text-[18px] font-semibold text-admin-vip-text">-£{active.totalFees.toFixed(2)}</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[12px] text-admin-muted">Net disbursed</div>
                <div className="text-[18px] font-semibold text-admin-active-text">£{active.netDisbursed.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {active.payouts.length === 0 ? (
            <div className="px-[26px] py-12 text-center">
              <div className="text-[40px] mb-2">📅</div>
              <p className="text-[14px] text-admin-muted mb-3">No payouts yet for this batch</p>
              <button
                onClick={() => setShowRun(true)}
                className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Process this batch
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 py-3 px-[26px] border-b border-admin-border flex-wrap">
                {([
                  { v: "all", l: "All" },
                  { v: "paid", l: "✓ Paid" },
                  { v: "in_transit", l: "🚚 In transit" },
                  { v: "submitted", l: "📤 Submitted" },
                  { v: "failed", l: "✗ Failed" },
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
                <div className="relative ml-auto">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search creator..."
                    className="px-3 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none w-[200px]"
                  />
                </div>
              </div>

              <div className="px-[26px] py-6">
                <div className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Creator</th>
                        <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Method</th>
                        <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Gross</th>
                        <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Fees</th>
                        <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Net</th>
                        <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Status</th>
                        <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayouts.map((p) => (
                        <tr key={p.id} className="hover:bg-admin-hover">
                          <td className="py-3 px-4 border-b border-admin-border">
                            <div className="flex items-center gap-2">
                              <img src={p.avatar} alt="" className="w-7 h-7 rounded-full" />
                              <div>
                                <div className="text-[14px] font-semibold text-admin-text">{p.creatorName}</div>
                                <div className="text-[11.5px] text-admin-muted">{p.creatorId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[12.5px] text-admin-nav-text border-b border-admin-border">
                            {p.method === "stripe" ? `🏦 ••${p.accountLast4}` : `💳 ${p.accountLast4}`}
                          </td>
                          <td className="py-3 px-4 text-right text-[14px] font-semibold text-admin-text border-b border-admin-border">£{p.amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-[12.5px] text-admin-vip-text border-b border-admin-border">-£{p.fees.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-[14px] font-semibold text-admin-active-text border-b border-admin-border">£{p.net.toFixed(2)}</td>
                          <td className="py-3 px-4 border-b border-admin-border">
                            <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${statusColors[p.status]}`}>{p.status}</span>
                            {p.retries > 0 && <span className="ml-1.5 text-[10.5px] text-admin-vip-text">retry #{p.retries}</span>}
                          </td>
                          <td className="py-3 px-4 text-right border-b border-admin-border">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedPayout(p.id)}
                                className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                              >
                                Details
                              </button>
                              {p.status === "failed" && (
                                <button
                                  onClick={() => handleRetry(p.id)}
                                  className="text-[12px] px-2 py-1 rounded-md bg-admin-active-text text-white hover:opacity-90"
                                >
                                  🔄 Retry
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {selectedPayout && active && (() => {
        const p = active.payouts.find((x) => x.id === selectedPayout);
        if (!p) return null;
        return (
          <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setSelectedPayout(null)}>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[16px] font-semibold text-admin-text mb-3">Payout details</h3>
              <div className="space-y-2 text-[13px] mb-4">
                <div className="flex items-center justify-between"><span className="text-admin-muted">Creator:</span><span className="text-admin-text font-medium">{p.creatorName}</span></div>
                <div className="flex items-center justify-between"><span className="text-admin-muted">Method:</span><span className="text-admin-text">{p.method === "stripe" ? `Bank ••${p.accountLast4}` : `PayPal ${p.accountLast4}`}</span></div>
                <div className="flex items-center justify-between"><span className="text-admin-muted">Gross:</span><span className="text-admin-text font-semibold">£{p.amount.toFixed(2)}</span></div>
                <div className="flex items-center justify-between"><span className="text-admin-muted">Fees:</span><span className="text-admin-vip-text">-£{p.fees.toFixed(2)}</span></div>
                <div className="flex items-center justify-between border-t border-admin-border pt-2"><span className="text-admin-muted">Net:</span><span className="text-admin-active-text font-bold text-[15px]">£{p.net.toFixed(2)}</span></div>
                {p.stripePayoutId && (
                  <div className="flex items-center justify-between"><span className="text-admin-muted">Stripe ID:</span><span className="text-admin-text font-mono text-[11px]">{p.stripePayoutId}</span></div>
                )}
                <div className="flex items-center justify-between"><span className="text-admin-muted">Status:</span><span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${statusColors[p.status]}`}>{p.status}</span></div>
                {p.submittedAt && <div className="flex items-center justify-between"><span className="text-admin-muted">Submitted:</span><span className="text-admin-text">{p.submittedAt}</span></div>}
                {p.paidAt && <div className="flex items-center justify-between"><span className="text-admin-muted">Paid:</span><span className="text-admin-text">{p.paidAt}</span></div>}
                {p.failureReason && (
                  <div className="mt-2 p-2 rounded bg-admin-non-bg border border-admin-non-text/30">
                    <div className="text-[12px] text-admin-non-text font-medium mb-0.5">⚠ Failure</div>
                    <p className="text-[12.5px] text-admin-text">{p.failureReason}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                {p.status === "failed" && (
                  <button
                    onClick={() => { handleRetry(p.id); setSelectedPayout(null); }}
                    className="text-[13px] px-3 py-2 rounded-md bg-admin-active-text text-white hover:opacity-90"
                  >
                    🔄 Retry
                  </button>
                )}
                <button onClick={() => setSelectedPayout(null)} className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Close</button>
              </div>
            </div>
          </div>
        );
      })()}

      {showManual && (
        <ManualPayoutModal onClose={() => setShowManual(false)} />
      )}

      {showRun && (
        <RunBatchModal onClose={() => setShowRun(false)} />
      )}
    </div>
  );
}

function ManualPayoutModal({ onClose }: { onClose: () => void }) {
  const [creator, setCreator] = useState("c_001");
  const [amount, setAmount] = useState(247.30);
  const [reason, setReason] = useState("emergency_payout");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<"stripe" | "paypal">("stripe");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 1500);
    }, 1500);
  };

  const fees = amount * 0.015 + 0.20;
  const net = amount - fees;

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => !submitting && !submitted && onClose()}>
      <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-[48px] mb-2">✓</div>
            <h3 className="text-[18px] font-semibold text-admin-text mb-2">Manual payout submitted</h3>
            <p className="text-[13px] text-admin-muted">Payout ID: payout_manual_001 · £{amount.toFixed(2)} to Sarah Mitchell</p>
          </div>
        ) : submitting ? (
          <div className="text-center py-4">
            <div className="text-[40px] mb-2">⏳</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Processing manual payout...</h3>
            <div className="w-full h-1.5 bg-admin-border rounded-full overflow-hidden">
              <div className="h-full bg-admin-active-text rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Manual payout</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Process a payout outside the monthly schedule. All actions are logged for audit.</p>

            <div className="space-y-3">
              <div>
                <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Creator</label>
                <select value={creator} onChange={(e) => setCreator(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none">
                  <option value="c_001">Sarah Mitchell (c_001) · Balance £247.30</option>
                  <option value="c_002">Mike Henderson (c_002) · Balance £234.50</option>
                  <option value="c_004">Emma Collins (c_004) · Balance £412.80</option>
                  <option value="c_005">David Chen (c_005) · Balance £89.40 (failed payout pending)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Amount (£)</label>
                  <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none" />
                </div>
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Method</label>
                  <select value={method} onChange={(e) => setMethod(e.target.value as "stripe" | "paypal")} className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none">
                    <option value="stripe">Stripe Connect</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Reason</label>
                <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none">
                  <option value="emergency_payout">Emergency payout (creator request)</option>
                  <option value="failed_retry">Failed payout retry (different method)</option>
                  <option value="dispute_compensation">Dispute compensation</option>
                  <option value="error_correction">Error correction</option>
                  <option value="bonus">Bonus / special</option>
                </select>
              </div>
              <div>
                <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Notes (optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Additional context for audit log..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
            </div>

            <div className="p-3 rounded-md bg-admin-hover mt-4 text-[12.5px]">
              <div className="font-semibold text-admin-text mb-2">Preview</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="text-[11px] text-admin-muted">Send</div>
                  <div className="font-semibold text-admin-text">£{amount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-admin-muted">Fees</div>
                  <div className="font-semibold text-admin-vip-text">-£{fees.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-admin-muted">Creator receives</div>
                  <div className="font-semibold text-admin-active-text">£{net.toFixed(2)}</div>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-admin-muted">By admin_001 · {new Date().toLocaleString()}</div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={amount <= 0}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
              >
                💸 Process manual payout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function RunBatchModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"review" | "submit" | "monitor" | "done">(typeof window === "undefined" ? "review" : "review");
  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    setStep("submit");
    setTimeout(() => setStep("monitor"), 1500);
    let p = 0;
    const iv = setInterval(() => {
      p += 12;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => setStep("done"), 500);
        setTimeout(onClose, 2500);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => step === "review" && onClose()}>
      <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
        {step === "review" && (
          <>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Run monthly batch</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Step 1 of 3: Review & approve</p>

            <div className="space-y-2 mb-4 text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Include only active accounts</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Exclude disputed earnings</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Exclude accounts with holds</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Only verified payment methods</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>Minimum threshold: £5.00</span>
              </label>
            </div>

            <div className="p-3 rounded-md bg-admin-active-bg mb-4">
              <div className="text-[12.5px] font-semibold text-admin-active-text mb-2">Batch preview</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
                <div>
                  <div className="text-admin-muted text-[10.5px]">Creators</div>
                  <div className="font-semibold text-admin-text">847</div>
                </div>
                <div>
                  <div className="text-admin-muted text-[10.5px]">Gross</div>
                  <div className="font-semibold text-admin-text">£124,350.65</div>
                </div>
                <div>
                  <div className="text-admin-muted text-[10.5px]">Fees</div>
                  <div className="font-semibold text-admin-vip-text">£1,856.40</div>
                </div>
                <div>
                  <div className="text-admin-muted text-[10.5px]">Net</div>
                  <div className="font-semibold text-admin-active-text">£122,494.25</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleSubmit}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                ✓ Confirm & process
              </button>
            </div>
          </>
        )}

        {step === "submit" && (
          <div className="text-center py-4">
            <div className="text-[40px] mb-2">📤</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Submitting to Stripe...</h3>
            <p className="text-[12.5px] text-admin-muted">Validating 847 payouts...</p>
          </div>
        )}

        {step === "monitor" && (
          <div>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Processing batch</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Step 2 of 3: Submitting to Stripe Connect</p>
            <div className="w-full h-2 bg-admin-border rounded-full overflow-hidden mb-3">
              <div className="h-full bg-admin-active-text transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-center text-[12.5px] text-admin-text mb-3">
              {Math.floor(progress * 8.47)}/847 submitted ({progress}%)
            </div>
            <div className="space-y-1 text-[12px] font-mono text-admin-muted max-h-[160px] overflow-y-auto">
              <div>14:32:15 — Batch created: batch_2024_10</div>
              <div>14:32:45 — Validating 847 payouts</div>
              <div>14:33:02 — Sending to Stripe Connect API</div>
              <div>14:33:30 — {Math.floor(progress * 8.47)}/847 submitted successfully</div>
              {progress > 50 && <div>14:33:45 — Retrying 5 failed submissions</div>}
              {progress > 90 && <div>14:34:00 — All payouts submitted ✓</div>}
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-4">
            <div className="text-[48px] mb-2">✓</div>
            <h3 className="text-[18px] font-semibold text-admin-text mb-2">Batch completed</h3>
            <p className="text-[12.5px] text-admin-muted mb-2">834 submitted · 13 failed (auto-retry scheduled) · 0 on hold</p>
            <p className="text-[12px] text-admin-muted">Redirecting to batch details...</p>
          </div>
        )}
      </div>
    </div>
  );
}
