"use client";

import { useState } from "react";
import Link from "next/link";

type FailedPayout = {
  id: string;
  creatorId: string;
  creatorName: string;
  amount: number;
  reason: string;
  retryCount: number;
  date: string;
};

type PendingPayout = {
  id: string;
  creatorId: string;
  creatorName: string;
  amount: number;
  earningsCount: number;
  method: "stripe" | "paypal";
  accountLast4: string;
};

const failedPayouts: FailedPayout[] = [
  { id: "po_f_001", creatorId: "c_005", creatorName: "David Chen", amount: 89.40, reason: "Bank account invalid — closed account", retryCount: 2, date: "Oct 15, 2024" },
  { id: "po_f_002", creatorId: "c_008", creatorName: "Olivia Brown", amount: 45.20, reason: "Account suspended (compliance hold)", retryCount: 0, date: "Oct 15, 2024" },
  { id: "po_f_003", creatorId: "c_011", creatorName: "Tom Wilson", amount: 23.50, reason: "Stripe Connect KYC incomplete", retryCount: 1, date: "Oct 15, 2024" },
];

const pendingPayouts: PendingPayout[] = [
  { id: "po_p_001", creatorId: "c_001", creatorName: "Sarah Mitchell", amount: 247.30, earningsCount: 38, method: "stripe", accountLast4: "4567" },
  { id: "po_p_002", creatorId: "c_002", creatorName: "Mike Henderson", amount: 234.50, earningsCount: 32, method: "stripe", accountLast4: "8910" },
  { id: "po_p_003", creatorId: "c_003", creatorName: "Jordan Lee", amount: 128.30, earningsCount: 18, method: "stripe", accountLast4: "1122" },
  { id: "po_p_004", creatorId: "c_004", creatorName: "Emma Collins", amount: 412.80, earningsCount: 51, method: "stripe", accountLast4: "3344" },
  { id: "po_p_005", creatorId: "c_006", creatorName: "Sophie Turner", amount: 267.90, earningsCount: 34, method: "paypal", accountLast4: "sophie@gmail.com" },
  { id: "po_p_006", creatorId: "c_007", creatorName: "James Wilson", amount: 523.10, earningsCount: 64, method: "stripe", accountLast4: "5566" },
  { id: "po_p_007", creatorId: "c_009", creatorName: "Lily Anderson", amount: 67.40, earningsCount: 9, method: "stripe", accountLast4: "7788" },
  { id: "po_p_008", creatorId: "c_010", creatorName: "Ben Martinez", amount: 189.70, earningsCount: 22, method: "stripe", accountLast4: "9900" },
];

export default function AdminPaymentsPage() {
  const [tab, setTab] = useState<"overview" | "payouts" | "failed" | "adjustments">("overview");
  const [failed, setFailed] = useState(failedPayouts);
  const [pending, setPending] = useState(pendingPayouts);
  const [search, setSearch] = useState("");
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchMinThreshold, setBatchMinThreshold] = useState(5);
  const [excludeSuspended, setExcludeSuspended] = useState(true);
  const [testMode, setTestMode] = useState(false);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchResult, setBatchResult] = useState<{ id: string; submitted: number; failed: number; total: number } | null>(null);

  const creatorEarningsMonth = 12345.67;
  const platformCommission = 15;
  const platformRevenue = creatorEarningsMonth * 0.15;
  const payoutCosts = 1856.40;
  const netRevenue = platformRevenue - payoutCosts;
  const lifetimeRevenue = 157644.18;

  const totalPending = pending.reduce((s, p) => s + p.amount, 0);
  const totalFailed = failed.reduce((s, f) => s + f.amount, 0);

  const filteredPending = pending.filter((p) => p.creatorName.toLowerCase().includes(search.toLowerCase()));

  const handleRetry = (id: string) => {
    setFailed((prev) => prev.map((f) => f.id === id ? { ...f, retryCount: f.retryCount + 1 } : f));
    setTimeout(() => {
      setFailed((prev) => prev.filter((f) => f.id !== id));
    }, 800);
  };

  const handleHold = (id: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReleaseHold = () => {
    setBatchResult({ id: "released", submitted: 0, failed: 0, total: 0 });
    setTimeout(() => setBatchResult(null), 2000);
  };

  const handleRunBatch = () => {
    setBatchRunning(true);
    setTimeout(() => {
      const eligible = pending.filter((p) => p.amount >= batchMinThreshold);
      const skipped = excludeSuspended ? 1 : 0;
      const submitted = Math.max(0, eligible.length - skipped - (testMode ? 0 : 1));
      const failedCount = testMode ? 0 : 1;
      setBatchRunning(false);
      setBatchResult({ id: `batch_${Date.now()}`, submitted, failed: failedCount, total: eligible.length });
      setShowBatchModal(false);
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Payments 💳</h1>
            <p className="text-[13.5px] text-admin-muted">Platform revenue, creator payouts, disputes, and tax compliance.</p>
          </div>
          <button
            onClick={() => setShowBatchModal(true)}
            className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 font-medium"
          >
            💸 Run payout batch
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {([
          { v: "overview", l: "Overview" },
          { v: "payouts", l: `Pending (${pending.length})` },
          { v: "failed", l: `Failed (${failed.length})` },
          { v: "adjustments", l: "Adjustments" },
        ] as const).map((t) => (
          <button
            key={t.v}
            onClick={() => setTab(t.v)}
            className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
              tab === t.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[1200px]">
        {batchResult && (
          <div className="mb-4 p-3 rounded-[10px] bg-admin-active-bg border border-admin-active-text/30 flex items-center gap-3">
            <span className="text-[20px]">{batchResult.id === "released" ? "✓" : "💸"}</span>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-admin-active-text">
                {batchResult.id === "released" ? "Hold released" : `Batch ${batchResult.id} created`}
              </div>
              <div className="text-[12.5px] text-admin-text">
                {batchResult.total > 0 && (
                  <>
                    {batchResult.submitted} submitted, {batchResult.failed} failed, {batchResult.total} eligible
                  </>
                )}
              </div>
            </div>
            <Link href="/admin/payouts" className="text-[12.5px] text-admin-new-text no-underline hover:underline font-medium">
              View batch status →
            </Link>
          </div>
        )}

        {tab === "overview" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-5">
                <div className="text-[12px] text-admin-muted">Platform revenue (Oct)</div>
                <div className="text-[28px] font-semibold text-admin-active-text">£{platformRevenue.toFixed(2)}</div>
                <div className="text-[12.5px] text-admin-text mt-1">{platformCommission}% of creator earnings</div>
                <div className="text-[12px] mt-1 font-medium text-admin-active-text">↑ +18% MoM</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="text-[12px] text-admin-muted">Creator earnings (Oct)</div>
                <div className="text-[28px] font-semibold text-admin-text">£{creatorEarningsMonth.toFixed(2)}</div>
                <div className="text-[12.5px] text-admin-text mt-1">{pending.length} creators with earnings</div>
                <div className="text-[12px] mt-1 text-admin-muted">Gross before commission</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="text-[12px] text-admin-muted">Payout costs (Oct)</div>
                <div className="text-[28px] font-semibold text-admin-vip-text">£{payoutCosts.toFixed(2)}</div>
                <div className="text-[12.5px] text-admin-text mt-1">Stripe fees: 1.5% + £0.20</div>
                <div className="text-[12px] mt-1 text-admin-muted">847 payouts processed</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="text-[12px] text-admin-muted">Net revenue (Oct)</div>
                <div className="text-[28px] font-semibold text-admin-text">£{netRevenue.toFixed(2)}</div>
                <div className="text-[12.5px] text-admin-text mt-1">83% margin</div>
                <div className="text-[12px] mt-1 text-admin-muted">YTD: £{lifetimeRevenue.toFixed(0)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[16px] font-semibold text-admin-text">Pending payouts</h2>
                  <Link href="#" onClick={(e) => { e.preventDefault(); setTab("payouts"); }} className="text-[13px] text-admin-new-text no-underline hover:underline">View all ({pending.length})</Link>
                </div>
                <div className="text-[36px] font-bold text-admin-text mb-2">£{totalPending.toFixed(2)}</div>
                <p className="text-[12.5px] text-admin-muted mb-3">{pending.length} creators ready for Oct 15 payout</p>
                <button
                  onClick={() => setShowBatchModal(true)}
                  className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
                >
                  Process October batch →
                </button>
              </div>

              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[16px] font-semibold text-admin-text">⚠ Failed payouts</h2>
                  <Link href="#" onClick={(e) => { e.preventDefault(); setTab("failed"); }} className="text-[13px] text-admin-non-text no-underline hover:underline">View all ({failed.length})</Link>
                </div>
                <div className="text-[36px] font-bold text-admin-non-text mb-2">£{totalFailed.toFixed(2)}</div>
                <p className="text-[12.5px] text-admin-muted mb-3">{failed.length} payouts need attention</p>
                <button
                  onClick={() => setTab("failed")}
                  className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-non-text text-white hover:opacity-90"
                >
                  Review failed payouts →
                </button>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Recent activity</h2>
              <div className="space-y-2 text-[13px]">
                {[
                  { time: "5 min ago", text: "Sarah Mitchell submitted review → +£1.35 (auto-approved)", color: "admin-active" },
                  { time: "12 min ago", text: "Mike Henderson requested manual payout (compliance review)", color: "admin-vip" },
                  { time: "1 hour ago", text: "Stripe batch Oct 15 completed · 834 paid, 13 failed, 0 on hold", color: "admin-new" },
                  { time: "2 hours ago", text: "Fraud detection flagged Olivia Brown (10x earnings spike) → auto-hold", color: "admin-non" },
                  { time: "Yesterday", text: "Tom Wilson updated bank account → payout requeued", color: "admin-new" },
                  { time: "Yesterday", text: "Dispute #DSP-2024-047 resolved: awarded £45 correction to Emma Collins", color: "admin-active" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-md hover:bg-admin-hover">
                    <span className={`w-2 h-2 mt-1.5 rounded-full bg-admin-${a.color}-text`} />
                    <div className="flex-1">
                      <p className="text-admin-text">{a.text}</p>
                      <p className="text-[11.5px] text-admin-muted">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "payouts" && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1 max-w-[400px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-admin-muted">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search creators..."
                  className="w-full pl-8 pr-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                />
              </div>
              <div className="text-[12.5px] text-admin-muted">{filteredPending.length} creators</div>
            </div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Creator</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Method</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Amount</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold hidden sm:table-cell">Activities</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-4 border-b border-admin-border font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPending.map((p) => (
                    <tr key={p.id} className="hover:bg-admin-hover">
                      <td className="py-3 px-4 border-b border-admin-border">
                        <div className="flex items-center gap-2">
                          <img src={`https://i.pravatar.cc/80?u=${p.creatorId}`} alt="" className="w-7 h-7 rounded-full" />
                          <div>
                            <div className="text-[14px] font-semibold text-admin-text">{p.creatorName}</div>
                            <div className="text-[11.5px] text-admin-muted">{p.creatorId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[12.5px] text-admin-nav-text border-b border-admin-border">
                        {p.method === "stripe" ? `🏦 ••${p.accountLast4}` : `💳 ${p.accountLast4}`}
                      </td>
                      <td className="py-3 px-4 text-right text-[15px] font-semibold text-admin-text border-b border-admin-border">£{p.amount.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-[12.5px] text-admin-muted border-b border-admin-border hidden sm:table-cell">{p.earningsCount}</td>
                      <td className="py-3 px-4 text-right border-b border-admin-border">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/admin/creators/${p.creatorId}`} className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-bg">View</Link>
                          <button
                            onClick={() => handleHold(p.id)}
                            className="text-[12px] px-2 py-1 rounded-md text-admin-vip-text hover:bg-admin-vip-bg"
                          >
                            Hold
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-[13px] text-admin-text">
                Total to pay: <strong>£{totalPending.toFixed(2)}</strong>
              </div>
              <button
                onClick={() => setShowBatchModal(true)}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                💸 Process this batch
              </button>
            </div>
          </div>
        )}

        {tab === "failed" && (
          <div>
            <div className="bg-admin-non-bg border border-admin-non-text/30 rounded-[10px] p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="text-[24px]">⚠️</div>
                <div>
                  <h3 className="text-[15px] font-semibold text-admin-non-text">{failed.length} failed payouts need attention</h3>
                  <p className="text-[12.5px] text-admin-text">Total stuck: £{totalFailed.toFixed(2)} · Auto-retries: {failed.reduce((s, f) => s + f.retryCount, 0)} of {failed.length * 3} max</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {failed.map((f) => (
                <div key={f.id} className="bg-admin-bg border border-admin-non-text/30 rounded-[10px] p-4">
                  <div className="flex items-start gap-3">
                    <img src={`https://i.pravatar.cc/80?u=${f.creatorId}`} alt="" className="w-9 h-9 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[15px] font-semibold text-admin-text">{f.creatorName}</span>
                        <span className="text-[12px] text-admin-muted">({f.creatorId})</span>
                        <span className="text-[12px] text-admin-non-text ml-auto">£{f.amount.toFixed(2)}</span>
                      </div>
                      <p className="text-[12.5px] text-admin-text mb-2">⚠ {f.reason}</p>
                      <div className="flex items-center gap-2 text-[11.5px] text-admin-muted flex-wrap">
                        <span>Failed {f.date}</span>
                        <span>·</span>
                        <span>Retried {f.retryCount}/3 times</span>
                        <span>·</span>
                        <span>Max retries reached → manual action needed</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-admin-border flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleRetry(f.id)}
                      className="text-[12px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                    >
                      🔄 Retry now
                    </button>
                    <button
                      onClick={() => alert(`Email sent to ${f.creatorName} (mock)`)}
                      className="text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      ✉ Email creator
                    </button>
                    <Link href={`/admin/creators/${f.creatorId}`} className="text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">View creator</Link>
                    <button
                      onClick={() => alert("Held for 30 days, then refunded to platform")}
                      className="text-[12px] px-3 py-1.5 rounded-md text-admin-non-text hover:bg-admin-non-bg ml-auto"
                    >
                      ⏸ Hold 30 days
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "adjustments" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
              <h2 className="text-[16px] font-semibold text-admin-text mb-1">Manual earnings adjustment</h2>
              <p className="text-[12.5px] text-admin-muted mb-4">Use this to correct errors or resolve disputes. All adjustments are logged for audit.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Creator</label>
                  <select className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none">
                    <option>Sarah Mitchell (c_001)</option>
                    <option>Mike Henderson (c_002)</option>
                    <option>Emma Collins (c_004)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Adjustment type</label>
                  <select className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none">
                    <option value="correction">Correction (positive)</option>
                    <option value="clawback">Clawback (negative)</option>
                    <option value="bonus">Bonus</option>
                    <option value="dispute_resolution">Dispute resolution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Amount (£)</label>
                  <input type="number" defaultValue="0" step="0.01" className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none" />
                </div>
                <div>
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Reference (e.g. dispute ID)</label>
                  <input type="text" placeholder="dispute_earnings_001" className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Reason (required, audit log)</label>
                  <textarea rows={3} placeholder="System error in review counting on Oct 5..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none resize-none" />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                <button
                  onClick={() => alert("Adjustment submitted: +£45 to Sarah Mitchell (audit log entry created)")}
                  className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
                >
                  Apply adjustment
                </button>
                <span className="text-[11.5px] text-admin-muted">Authorized by: admin_001 · Logged to audit trail</span>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Recent adjustments</h2>
              <div className="space-y-2">
                {[
                  { date: "Oct 14, 2024", creator: "Emma Collins", amount: 45, type: "correction", reason: "System error — missing 30 reviews from Sep batch", admin: "admin_001" },
                  { date: "Oct 10, 2024", creator: "David Chen", amount: -1.35, type: "clawback", reason: "Fraudulent review removed", admin: "admin_002" },
                  { date: "Sept 28, 2024", creator: "Sarah Mitchell", amount: 50, type: "bonus", reason: "Top creator Q3 bonus", admin: "admin_001" },
                  { date: "Sept 15, 2024", creator: "Mike Henderson", amount: 23.50, type: "dispute_resolution", reason: "DSP-2024-042 resolved", admin: "admin_002" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                    <div className="text-[14px]">{a.amount > 0 ? "✓" : "✗"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[13.5px] font-semibold text-admin-text">{a.creator}</span>
                        <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${a.amount > 0 ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-non-bg text-admin-non-text"}`}>{a.type}</span>
                      </div>
                      <p className="text-[12px] text-admin-muted">{a.reason}</p>
                      <p className="text-[11.5px] text-admin-muted">By {a.admin} · {a.date}</p>
                    </div>
                    <div className={`text-[15px] font-semibold ${a.amount > 0 ? "text-admin-active-text" : "text-admin-non-text"}`}>
                      {a.amount > 0 ? "+" : ""}£{a.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showBatchModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => !batchRunning && setShowBatchModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Create payout batch</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">This will submit all eligible payouts to Stripe Connect.</p>

            {batchRunning ? (
              <div className="text-center py-4">
                <div className="text-[40px] mb-2">⏳</div>
                <h4 className="text-[15px] font-semibold text-admin-text mb-1">Processing batch...</h4>
                <p className="text-[12.5px] text-admin-muted mb-3">Submitting {pending.length} payouts to Stripe</p>
                <div className="w-full h-1.5 bg-admin-border rounded-full overflow-hidden">
                  <div className="h-full bg-admin-active-text rounded-full animate-pulse" style={{ width: "70%" }} />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Batch name</label>
                    <input type="text" defaultValue="October 2024 Payouts" className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Minimum threshold</label>
                    <select
                      value={batchMinThreshold}
                      onChange={(e) => setBatchMinThreshold(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
                    >
                      <option value="5">£5 (default)</option>
                      <option value="10">£10</option>
                      <option value="25">£25</option>
                      <option value="50">£50</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={excludeSuspended} onChange={(e) => setExcludeSuspended(e.target.checked)} className="w-4 h-4" />
                      <span className="text-[12.5px] text-admin-text">Exclude suspended accounts</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={testMode} onChange={(e) => setTestMode(e.target.checked)} className="w-4 h-4" />
                      <span className="text-[12.5px] text-admin-text">Test mode (no real Stripe calls)</span>
                    </label>
                  </div>
                </div>

                <div className="p-3 rounded-md bg-admin-hover mb-4 text-[12px] text-admin-text">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-admin-muted text-[10.5px]">Eligible</div>
                      <div className="font-semibold">{pending.length} creators</div>
                    </div>
                    <div>
                      <div className="text-admin-muted text-[10.5px]">Total</div>
                      <div className="font-semibold">£{totalPending.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-admin-muted text-[10.5px]">Est. fees</div>
                      <div className="font-semibold">£{(totalPending * 0.016).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowBatchModal(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                  <button
                    onClick={handleRunBatch}
                    className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
                  >
                    💸 Submit batch to Stripe
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
