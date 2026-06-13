"use client";

import { useState } from "react";
import Link from "next/link";

type Payout = {
  id: string;
  amount: number;
  fees: number;
  net: number;
  method: "stripe" | "paypal";
  accountLast4: string;
  status: "pending" | "submitted" | "in_transit" | "paid" | "failed";
  submittedAt: string;
  paidAt?: string;
  expectedDelivery: string;
  earningsBreakdown: { reviews: number; verifications: number; guides: number; bookings: number };
  failureReason?: string;
  retryCount?: number;
  receiptUrl?: string;
  stripePayoutId?: string;
};

const initialPayouts: Payout[] = [
  {
    id: "po_2024_10",
    amount: 235.55,
    fees: 3.73,
    net: 231.82,
    method: "stripe",
    accountLast4: "4567",
    status: "paid",
    submittedAt: "Oct 15, 2024 · 12:00 PM",
    paidAt: "Oct 18, 2024 · 9:23 AM",
    expectedDelivery: "Oct 18, 2024",
    earningsBreakdown: { reviews: 24, verifications: 17, guides: 1, bookings: 8 },
    receiptUrl: "receipts/po_2024_10.pdf",
    stripePayoutId: "po_1234567890",
  },
  {
    id: "po_2024_09",
    amount: 225.10,
    fees: 3.58,
    net: 221.52,
    method: "stripe",
    accountLast4: "4567",
    status: "paid",
    submittedAt: "Sept 15, 2024 · 12:00 PM",
    paidAt: "Sept 18, 2024 · 10:14 AM",
    expectedDelivery: "Sept 18, 2024",
    earningsBreakdown: { reviews: 22, verifications: 16, guides: 1, bookings: 7 },
    receiptUrl: "receipts/po_2024_09.pdf",
    stripePayoutId: "po_9876543210",
  },
  {
    id: "po_2024_08",
    amount: 198.50,
    fees: 3.18,
    net: 195.32,
    method: "stripe",
    accountLast4: "4567",
    status: "paid",
    submittedAt: "Aug 15, 2024 · 12:00 PM",
    paidAt: "Aug 19, 2024 · 11:05 AM",
    expectedDelivery: "Aug 19, 2024",
    earningsBreakdown: { reviews: 19, verifications: 14, guides: 1, bookings: 5 },
    receiptUrl: "receipts/po_2024_08.pdf",
  },
  {
    id: "po_2024_07",
    amount: 212.30,
    fees: 3.38,
    net: 208.92,
    method: "stripe",
    accountLast4: "4567",
    status: "paid",
    submittedAt: "Jul 15, 2024 · 12:00 PM",
    paidAt: "Jul 18, 2024 · 9:50 AM",
    expectedDelivery: "Jul 18, 2024",
    earningsBreakdown: { reviews: 21, verifications: 14, guides: 1, bookings: 6 },
    receiptUrl: "receipts/po_2024_07.pdf",
  },
  {
    id: "po_2024_11",
    amount: 247.30,
    fees: 3.91,
    net: 243.39,
    method: "stripe",
    accountLast4: "4567",
    status: "in_transit",
    submittedAt: "Nov 15, 2024 · 12:00 PM",
    expectedDelivery: "Nov 18, 2024",
    earningsBreakdown: { reviews: 25, verifications: 18, guides: 1, bookings: 8 },
    stripePayoutId: "po_5555555555",
  },
  {
    id: "po_failed_001",
    amount: 89.40,
    fees: 0,
    net: 0,
    method: "stripe",
    accountLast4: "1234",
    status: "failed",
    submittedAt: "Oct 15, 2024 · 12:00 PM",
    expectedDelivery: "Oct 18, 2024",
    earningsBreakdown: { reviews: 8, verifications: 5, guides: 0, bookings: 0 },
    failureReason: "Bank account invalid — closed account",
    retryCount: 2,
  },
];

const statusStyles: Record<Payout["status"], { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-admin-non-bg", text: "text-admin-non-text", label: "⏳ Pending" },
  submitted: { bg: "bg-admin-vip-bg", text: "text-admin-vip-text", label: "📤 Submitted" },
  in_transit: { bg: "bg-admin-new-bg", text: "text-admin-new-text", label: "🚚 In transit" },
  paid: { bg: "bg-admin-active-bg", text: "text-admin-active-text", label: "✓ Paid" },
  failed: { bg: "bg-admin-non-bg", text: "text-admin-non-text", label: "✗ Failed" },
};

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [filter, setFilter] = useState<"all" | "paid" | "in_transit" | "failed" | "pending">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showRetryModal, setShowRetryModal] = useState<string | null>(null);
  const [retryReason, setRetryReason] = useState("bank_account_updated");

  const filtered = payouts.filter((p) => filter === "all" || p.status === filter);
  const totalPaid = payouts.filter((p) => p.status === "paid").reduce((s, p) => s + p.net, 0);
  const totalFees = payouts.filter((p) => p.status === "paid").reduce((s, p) => s + p.fees, 0);
  const totalLifetime = payouts.reduce((s, p) => s + p.amount, 0);

  const handleRetry = (id: string) => {
    setPayouts((prev) => prev.map((p) => p.id === id ? { ...p, status: "submitted" as const, retryCount: (p.retryCount || 0) + 1, failureReason: undefined } : p));
    setShowRetryModal(null);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/user/creator" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">← Back to Creator Hub</Link>
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Payout history 📋</h1>
        <p className="text-[13.5px] text-admin-muted">Every payout we&apos;ve sent to your bank account. Click any row for details.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 px-[26px] py-4 border-b border-admin-border">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-3">
          <div className="text-[12px] text-admin-muted">Paid (lifetime)</div>
          <div className="text-[20px] font-semibold text-admin-active-text">£{totalPaid.toFixed(2)}</div>
        </div>
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-3">
          <div className="text-[12px] text-admin-muted">Total fees paid</div>
          <div className="text-[20px] font-semibold text-admin-text">£{totalFees.toFixed(2)}</div>
        </div>
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-3">
          <div className="text-[12px] text-admin-muted">Total gross</div>
          <div className="text-[20px] font-semibold text-admin-text">£{totalLifetime.toFixed(2)}</div>
        </div>
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-3">
          <div className="text-[12px] text-admin-muted">Payouts sent</div>
          <div className="text-[20px] font-semibold text-admin-text">{payouts.filter((p) => p.status === "paid").length}</div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {([
          { v: "all", l: "All" },
          { v: "paid", l: "✓ Paid" },
          { v: "in_transit", l: "🚚 In transit" },
          { v: "pending", l: "⏳ Pending" },
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
      </div>

      <div className="px-[26px] py-6 max-w-[900px]">
        {filtered.length === 0 ? (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 text-center">
            <div className="text-[40px] mb-2">📭</div>
            <p className="text-[14px] text-admin-muted">No payouts in this category.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((p) => {
              const s = statusStyles[p.status];
              const expanded = expandedId === p.id;
              return (
                <div key={p.id} className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
                  <button
                    onClick={() => setExpandedId(expanded ? null : p.id)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-admin-hover"
                  >
                    <div className="text-[20px]">{p.status === "paid" ? "✓" : p.status === "failed" ? "✗" : p.status === "in_transit" ? "🚚" : "⏳"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[14px] font-semibold text-admin-text">Payout {p.id.replace("po_", "#")}</span>
                        <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${s.bg} ${s.text}`}>{s.label}</span>
                        {p.retryCount && p.retryCount > 0 && (
                          <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text">Retry #{p.retryCount}</span>
                        )}
                      </div>
                      <div className="text-[12px] text-admin-muted">Submitted {p.submittedAt}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[16px] font-semibold text-admin-text">£{p.amount.toFixed(2)}</div>
                      <div className="text-[11.5px] text-admin-muted">Net £{p.net.toFixed(2)}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-admin-muted transition-transform ${expanded ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {expanded && (
                    <div className="px-4 pb-4 border-t border-admin-border bg-admin-hover">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
                        <div>
                          <div className="text-[11.5px] text-admin-muted mb-1">Timeline</div>
                          <div className="space-y-1.5 text-[12.5px]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-admin-vip-text" />
                              <span className="text-admin-text">Submitted: {p.submittedAt}</span>
                            </div>
                            {p.paidAt ? (
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-admin-active-text" />
                                <span className="text-admin-text">Paid: {p.paidAt}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-admin-new-text" />
                                <span className="text-admin-text">Expected: {p.expectedDelivery}</span>
                              </div>
                            )}
                            {p.stripePayoutId && (
                              <div className="text-[10.5px] text-admin-muted font-mono pl-4">Stripe: {p.stripePayoutId}</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11.5px] text-admin-muted mb-1">Earnings breakdown</div>
                          <div className="space-y-1 text-[12.5px]">
                            {p.earningsBreakdown.reviews > 0 && (
                              <div className="flex items-center justify-between">
                                <span className="text-admin-nav-text">⭐ Reviews ({p.earningsBreakdown.reviews})</span>
                                <span className="text-admin-text">£{(p.earningsBreakdown.reviews * 1.35).toFixed(2)}</span>
                              </div>
                            )}
                            {p.earningsBreakdown.verifications > 0 && (
                              <div className="flex items-center justify-between">
                                <span className="text-admin-nav-text">✓ Verifications ({p.earningsBreakdown.verifications})</span>
                                <span className="text-admin-text">£{(p.earningsBreakdown.verifications * 0.50).toFixed(2)}</span>
                              </div>
                            )}
                            {p.earningsBreakdown.guides > 0 && (
                              <div className="flex items-center justify-between">
                                <span className="text-admin-nav-text">📖 Guides</span>
                                <span className="text-admin-text">£{p.earningsBreakdown.guides.toFixed(2)}</span>
                              </div>
                            )}
                            {p.earningsBreakdown.bookings > 0 && (
                              <div className="flex items-center justify-between">
                                <span className="text-admin-nav-text">🔖 Bookings ({p.earningsBreakdown.bookings})</span>
                                <span className="text-admin-text">£{(p.earningsBreakdown.bookings * 0.10).toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-admin-border grid grid-cols-1 md:grid-cols-3 gap-3 text-[12.5px]">
                        <div>
                          <div className="text-admin-muted text-[11px]">Method</div>
                          <div className="text-admin-text font-medium">{p.method === "stripe" ? "🏦 Bank Transfer" : "💳 PayPal"}</div>
                          <div className="text-[11px] text-admin-muted">••{p.accountLast4}</div>
                        </div>
                        <div>
                          <div className="text-admin-muted text-[11px]">Amount</div>
                          <div className="text-admin-text font-medium">£{p.amount.toFixed(2)}</div>
                          <div className="text-[11px] text-admin-muted">-£{p.fees.toFixed(2)} fees = £{p.net.toFixed(2)}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {p.status === "paid" && p.receiptUrl && (
                            <button
                              onClick={() => alert(`Downloaded ${p.id}.pdf (mock)`)}
                              className="text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                            >
                              ⬇ Download receipt
                            </button>
                          )}
                          {p.status === "failed" && (
                            <button
                              onClick={() => setShowRetryModal(p.id)}
                              className="text-[12px] px-2.5 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                            >
                              🔄 Retry payout
                            </button>
                          )}
                          {p.status === "in_transit" && (
                            <span className="text-[12px] text-admin-new-text">Arrives in 1-2 days</span>
                          )}
                        </div>
                      </div>
                      {p.failureReason && (
                        <div className="mt-3 p-2.5 rounded-md bg-admin-non-bg border border-admin-non-text/30">
                          <div className="text-[12px] text-admin-non-text font-medium mb-1">⚠ Failure reason</div>
                          <p className="text-[12.5px] text-admin-text">{p.failureReason}</p>
                          <p className="text-[11.5px] text-admin-muted mt-1">Auto-retried {p.retryCount} times. Update your bank account in <Link href="/user/creator/payment-settings" className="text-admin-new-text no-underline hover:underline">payment settings</Link> to retry.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showRetryModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowRetryModal(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Retry payout</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Manually retry this failed payout. Make sure you&apos;ve fixed the underlying issue first.</p>
            <div className="mb-3">
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Reason for retry</label>
              <select
                value={retryReason}
                onChange={(e) => setRetryReason(e.target.value)}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
              >
                <option value="bank_account_updated">Bank account updated</option>
                <option value="kyc_resolved">KYC verification resolved</option>
                <option value="manual_retry">Manual retry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRetryModal(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => handleRetry(showRetryModal)}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Resubmit payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
