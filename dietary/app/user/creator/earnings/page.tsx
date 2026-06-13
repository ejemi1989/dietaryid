"use client";

import { useState } from "react";
import Link from "next/link";

type Tx = {
  id: string;
  date: string;
  type: "review" | "verification" | "guide" | "booking" | "adjustment" | "rejected";
  description: string;
  restaurant?: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
};

const initialTx: Tx[] = [
  { id: "t1", date: "Oct 14, 2024", type: "review", description: "Review of The Italian Kitchen", restaurant: "The Italian Kitchen", amount: 1.35, status: "approved" },
  { id: "t2", date: "Oct 13, 2024", type: "review", description: "Review of Fresh Bowl", restaurant: "Fresh Bowl", amount: 1.35, status: "approved" },
  { id: "t3", date: "Oct 13, 2024", type: "verification", description: "Verified Quinoa Power Bowl", restaurant: "Fresh Bowl", amount: 0.50, status: "approved" },
  { id: "t4", date: "Oct 12, 2024", type: "review", description: "Review of Bella Italia", restaurant: "Bella Italia", amount: 1.35, status: "pending" },
  { id: "t5", date: "Oct 11, 2024", type: "guide", description: "Gluten-Free Manchester — ongoing earnings", amount: 0.65, status: "approved" },
  { id: "t6", date: "Oct 10, 2024", type: "verification", description: "Verified Buddha Bowl", restaurant: "The Vegan Table", amount: 0.50, status: "approved" },
  { id: "t7", date: "Oct 9, 2024", type: "booking", description: "8 people used your guide", amount: 0.80, status: "approved" },
  { id: "t8", date: "Oct 8, 2024", type: "rejected", description: "Review removed (contained misinformation)", restaurant: "Sakura Sushi", amount: -1.35, status: "rejected" },
  { id: "t9", date: "Oct 7, 2024", type: "adjustment", description: "Dispute resolution — admin correction", amount: 2.00, status: "approved" },
  { id: "t10", date: "Oct 6, 2024", type: "review", description: "Review of The Vegan Table", restaurant: "The Vegan Table", amount: 1.35, status: "approved" },
  { id: "t11", date: "Oct 5, 2024", type: "review", description: "Review of Pizza Roma", restaurant: "Pizza Roma", amount: 1.35, status: "pending" },
  { id: "t12", date: "Oct 4, 2024", type: "verification", description: "Verified GF Margherita", restaurant: "Pizza Roma", amount: 0.50, status: "approved" },
];

const topDays = [
  { date: "Oct 1", count: 13, amount: 18.50 },
  { date: "Oct 8", count: 16, amount: 22.70 },
  { date: "Oct 11", count: 14, amount: 19.35 },
  { date: "Oct 14", count: 11, amount: 15.85 },
];

export default function CreatorEarningsPage() {
  const [transactions, setTransactions] = useState(initialTx);
  const [filter, setFilter] = useState<"all" | "review" | "verification" | "guide" | "booking" | "rejected">("all");
  const [period, setPeriod] = useState<"30d" | "3m" | "all">("30d");

  const thisMonth = transactions
    .filter((t) => t.status === "approved")
    .reduce((s, t) => s + t.amount, 0);
  const pending = transactions
    .filter((t) => t.status === "pending")
    .reduce((s, t) => s + t.amount, 0);
  const lastMonth = 235.55;
  const lifetime = 2847.30;
  const avg3m = 186.38;

  const reviewsTotal = transactions.filter((t) => t.type === "review" && t.status === "approved").reduce((s, t) => s + t.amount, 0);
  const verificationsTotal = transactions.filter((t) => t.type === "verification" && t.status === "approved").reduce((s, t) => s + t.amount, 0);
  const guidesTotal = transactions.filter((t) => t.type === "guide" && t.status === "approved").reduce((s, t) => s + t.amount, 0);
  const bookingsTotal = transactions.filter((t) => t.type === "booking" && t.status === "approved").reduce((s, t) => s + t.amount, 0);

  const filtered = transactions.filter((t) => {
    if (filter === "all") return t.status !== "rejected" || filter === "all";
    if (filter === "rejected") return t.type === "rejected" || t.status === "rejected";
    return t.type === filter;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Earnings 💰</h1>
            <p className="text-[13.5px] text-admin-muted">Your creator earnings, payout history, and payment settings.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/user/creator/payouts" className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">📋 Payout history</Link>
            <Link href="/user/creator/payment-settings" className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white no-underline hover:opacity-90">⚙ Payment settings</Link>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {(["30d", "3m", "all"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
              period === p ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {p === "30d" ? "This month" : p === "3m" ? "3-month avg" : "All time"}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[1100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">This month</div>
            <div className="text-[28px] font-semibold text-admin-active-text">£{thisMonth.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Pending payout: Nov 15</div>
            <div className="text-[12px] mt-1 font-medium text-admin-text">↑ £{(thisMonth - 145.50).toFixed(2)} vs last month</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Last month (paid)</div>
            <div className="text-[28px] font-semibold text-admin-text">£{lastMonth.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">✓ Paid Oct 18, 2024</div>
            <div className="text-[12px] mt-1 text-admin-muted">After fees: £231.82</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">3-month average</div>
            <div className="text-[28px] font-semibold text-admin-text">£{avg3m.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">£{transactions.filter((t) => t.status === "approved" && t.amount > 0).length} activities this month</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Lifetime earnings</div>
            <div className="text-[28px] font-semibold text-admin-text">£{lifetime.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Across 156 reviews, 89 verifications</div>
            <div className="text-[12px] mt-1 text-admin-muted">Lifetime payouts: £2,760.07</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-1">This month breakdown</h2>
            <p className="text-[12.5px] text-admin-muted mb-3">How you earned £{thisMonth.toFixed(2)}</p>
            <div className="space-y-2">
              {[
                { l: "Reviews", count: transactions.filter((t) => t.type === "review" && t.status === "approved").length, total: reviewsTotal, rate: 1.35, color: "admin-active" },
                { l: "Verifications", count: transactions.filter((t) => t.type === "verification" && t.status === "approved").length, total: verificationsTotal, rate: 0.50, color: "admin-new" },
                { l: "City guide", count: 1, total: guidesTotal, rate: 0.65, color: "admin-vip" },
                { l: "Bookings", count: transactions.filter((t) => t.type === "booking" && t.status === "approved").length, total: bookingsTotal, rate: 0.10, color: "admin-icon-secondary" },
              ].map((row) => (
                <div key={row.l}>
                  <div className="flex items-center justify-between mb-1 text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="text-admin-text font-medium">{row.l}</span>
                      <span className="text-[11.5px] text-admin-muted">{row.count} × £{row.rate.toFixed(2)}</span>
                    </div>
                    <span className={`text-admin-${row.color}-text font-semibold`}>£{row.total.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-admin-border rounded-full overflow-hidden">
                    <div className={`h-full bg-admin-${row.color}-text rounded-full`} style={{ width: `${(row.total / thisMonth) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {transactions.some((t) => t.status === "rejected") && (
              <div className="mt-3 pt-3 border-t border-admin-border text-[12.5px] text-admin-non-text">
                ⚠ 1 review rejected (misinformation): -£1.35
              </div>
            )}
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Top earning days</h2>
            <div className="space-y-2">
              {topDays.map((d) => (
                <div key={d.date} className="flex items-center gap-3">
                  <div className="text-[12.5px] text-admin-text w-16">{d.date}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[12.5px] text-admin-muted">{d.count} activities</span>
                      <span className="text-[13px] font-semibold text-admin-active-text">£{d.amount.toFixed(2)}</span>
                    </div>
                    <div className="h-1.5 bg-admin-border rounded-full overflow-hidden">
                      <div className="h-full bg-admin-active-text rounded-full" style={{ width: `${(d.amount / 25) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-admin-border">
              <h3 className="text-[13.5px] font-semibold text-admin-text mb-2">Activity mix (lifetime)</h3>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="bg-admin-hover rounded-md p-2">
                  <div className="text-admin-muted">Reviews</div>
                  <div className="font-semibold text-admin-text">£2,145.20 <span className="text-[10.5px] text-admin-muted">(75%)</span></div>
                </div>
                <div className="bg-admin-hover rounded-md p-2">
                  <div className="text-admin-muted">Verifications</div>
                  <div className="font-semibold text-admin-text">£412.50 <span className="text-[10.5px] text-admin-muted">(15%)</span></div>
                </div>
                <div className="bg-admin-hover rounded-md p-2">
                  <div className="text-admin-muted">Guides</div>
                  <div className="font-semibold text-admin-text">£289.60 <span className="text-[10.5px] text-admin-muted">(10%)</span></div>
                </div>
                <div className="bg-admin-hover rounded-md p-2">
                  <div className="text-admin-muted">Bookings</div>
                  <div className="font-semibold text-admin-text">£0 <span className="text-[10.5px] text-admin-muted">(0%)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Next payout</h2>
            <Link href="/user/creator/payouts" className="text-[12.5px] text-admin-new-text no-underline hover:underline">View all payouts →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-admin-hover rounded-md p-3">
              <div className="text-[12px] text-admin-muted">Date</div>
              <div className="text-[14px] font-semibold text-admin-text">Nov 15, 2024</div>
              <div className="text-[11.5px] text-admin-muted mt-0.5">in 31 days</div>
            </div>
            <div className="bg-admin-hover rounded-md p-3">
              <div className="text-[12px] text-admin-muted">Estimated amount</div>
              <div className="text-[14px] font-semibold text-admin-text">£{thisMonth.toFixed(2)}</div>
              <div className="text-[11.5px] text-admin-muted mt-0.5">Current balance</div>
            </div>
            <div className="bg-admin-hover rounded-md p-3">
              <div className="text-[12px] text-admin-muted">Method</div>
              <div className="text-[14px] font-semibold text-admin-text">Bank Transfer</div>
              <div className="text-[11.5px] text-admin-muted mt-0.5">Stripe Connect ••4567</div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Recent transactions</h2>
            <div className="flex items-center gap-1">
              {([
                { v: "all", l: "All" },
                { v: "review", l: "Reviews" },
                { v: "verification", l: "Verifications" },
                { v: "guide", l: "Guides" },
                { v: "booking", l: "Bookings" },
                { v: "rejected", l: "Rejected" },
              ] as const).map((f) => (
                <button
                  key={f.v}
                  onClick={() => setFilter(f.v)}
                  className={`text-[12px] px-2.5 py-1 rounded-md transition-colors ${
                    filter === f.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-2 px-2 border-b border-admin-border font-semibold">Date</th>
                  <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-2 px-2 border-b border-admin-border font-semibold">Description</th>
                  <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-2 px-2 border-b border-admin-border font-semibold">Status</th>
                  <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-2 px-2 border-b border-admin-border font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-admin-hover">
                    <td className="py-2.5 px-2 text-[12.5px] text-admin-muted border-b border-admin-border whitespace-nowrap">{t.date}</td>
                    <td className="py-2.5 px-2 text-[13px] text-admin-text border-b border-admin-border">
                      <div>{t.description}</div>
                      {t.restaurant && <div className="text-[11.5px] text-admin-muted">{t.restaurant}</div>}
                    </td>
                    <td className="py-2.5 px-2 text-[12px] border-b border-admin-border">
                      {t.status === "approved" && <span className="text-[11.5px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text">✓ Approved</span>}
                      {t.status === "pending" && <span className="text-[11.5px] px-1.5 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text">⏳ Pending</span>}
                      {t.status === "rejected" && <span className="text-[11.5px] px-1.5 py-0.5 rounded bg-admin-non-bg text-admin-non-text">✗ Rejected</span>}
                    </td>
                    <td className={`py-2.5 px-2 text-right text-[13.5px] font-semibold border-b border-admin-border whitespace-nowrap ${t.amount < 0 ? "text-admin-non-text" : t.status === "rejected" ? "text-admin-non-text" : "text-admin-active-text"}`}>
                      {t.amount > 0 ? "+" : ""}£{t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[13px] text-admin-muted py-6">No transactions in this filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
