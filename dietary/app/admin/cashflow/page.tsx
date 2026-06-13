"use client";

import { useState } from "react";

const monthlyForecast = [
  { month: "Oct 2024", income: 18652.60, outflows: 134700.65, net: -116048.05, opening: 171690.90, closing: 55642.85 },
  { month: "Nov 2024", income: 19500, outflows: 145200, net: -125700, opening: 55642.85, closing: -70057.15 },
  { month: "Dec 2024", income: 22100, outflows: 158500, net: -136400, opening: -70057.15, closing: -206457.15 },
  { month: "Jan 2025", income: 25300, outflows: 170100, net: -144800, opening: -206457.15, closing: -351257.15 },
];

export default function AdminCashflowPage() {
  const [period, setPeriod] = useState<"30d" | "90d" | "12m">("30d");

  const currentBalance = 55642.85;
  const daysOfOps = 12;
  const recommendedReserve = 50000;
  const belowRecommended = currentBalance < recommendedReserve;

  const maxAbs = Math.max(...monthlyForecast.map((m) => Math.abs(m.closing)));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Cash Flow & Liquidity 💰</h1>
        <p className="text-[13.5px] text-admin-muted">Platform balance, inflows, outflows, and forecasting.</p>
      </div>

      <div className="px-[26px] py-6 max-w-[1100px]">
        {belowRecommended && (
          <div className="mb-4 p-4 rounded-[10px] bg-admin-vip-bg border border-admin-vip-text/40">
            <div className="flex items-start gap-3">
              <div className="text-[24px]">⚠️</div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-admin-vip-text mb-1">Below recommended reserve</h3>
                <p className="text-[12.5px] text-admin-text mb-2">Current: £{currentBalance.toFixed(2)} · Recommended: £{recommendedReserve.toFixed(2)} · {daysOfOps} days of operations</p>
                <p className="text-[12px] text-admin-text">Platform spending exceeds income. Premium features launching Nov 2024 to bring in £3,000/month new income. Break-even target: Q1 2025.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Current balance</div>
            <div className="text-[28px] font-semibold text-admin-text">£{currentBalance.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Stripe platform account</div>
            <div className="text-[12px] mt-1 text-admin-muted">As of {new Date().toISOString().slice(0, 10)}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Income (30d)</div>
            <div className="text-[28px] font-semibold text-admin-active-text">£18,652.60</div>
            <div className="text-[12.5px] text-admin-text mt-1">From creator commissions</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">↑ +12% MoM</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Outflows (30d)</div>
            <div className="text-[28px] font-semibold text-admin-non-text">£134,700.65</div>
            <div className="text-[12.5px] text-admin-text mt-1">847 creator payouts + ops</div>
            <div className="text-[12px] mt-1 text-admin-muted">Predominantly payouts</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Net cash flow (30d)</div>
            <div className="text-[28px] font-semibold text-admin-non-text">-£116,048.05</div>
            <div className="text-[12.5px] text-admin-text mt-1">Net of income − outflows</div>
            <div className="text-[12px] mt-1 text-admin-muted">Sustainable via reserves</div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">4-month forecast</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">With premium features launching Nov 2024</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-admin-border">
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 pr-4">Month</th>
                  <th className="text-right text-[11px] uppercase tracking-wider text-admin-muted py-2 pr-4">Income</th>
                  <th className="text-right text-[11px] uppercase tracking-wider text-admin-muted py-2 pr-4">Outflows</th>
                  <th className="text-right text-[11px] uppercase tracking-wider text-admin-muted py-2 pr-4">Net</th>
                  <th className="text-right text-[11px] uppercase tracking-wider text-admin-muted py-2 pr-4">Closing</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 pl-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthlyForecast.map((m) => (
                  <tr key={m.month} className="border-b border-admin-border">
                    <td className="py-2.5 pr-4 font-medium text-admin-text">{m.month}</td>
                    <td className="py-2.5 pr-4 text-right text-admin-active-text">£{m.income.toLocaleString()}</td>
                    <td className="py-2.5 pr-4 text-right text-admin-text">£{m.outflows.toLocaleString()}</td>
                    <td className={`py-2.5 pr-4 text-right font-semibold ${m.net < 0 ? "text-admin-non-text" : "text-admin-active-text"}`}>
                      {m.net < 0 ? "-" : "+"}£{Math.abs(m.net).toLocaleString()}
                    </td>
                    <td className={`py-2.5 pr-4 text-right font-bold ${m.closing < 0 ? "text-admin-non-text" : "text-admin-text"}`}>
                      £{m.closing.toLocaleString()}
                    </td>
                    <td className="py-2.5 pl-4">
                      <div className="w-24 h-3 bg-admin-border rounded-full overflow-hidden">
                        <div
                          className={`h-full ${m.closing < 0 ? "bg-admin-non-text" : "bg-admin-active-text"}`}
                          style={{ width: `${Math.min(100, (Math.abs(m.closing) / maxAbs) * 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 rounded-md bg-admin-non-bg border border-admin-non-text/30">
            <div className="text-[12.5px] text-admin-non-text font-medium mb-1">⚠ Critical insight</div>
            <p className="text-[12px] text-admin-text">Premium features income is critical to platform solvency. Without it, reserves deplete to <strong>-£351k by Jan 2025</strong>. Recommend prioritizing Nov 2024 launch.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Payment reconciliation</h2>
            <div className="space-y-2 text-[13px]">
              {[
                { l: "Expected payouts", v: "£124,350.65", color: "text-admin-text" },
                { l: "Submitted to Stripe", v: "£124,350.65", color: "text-admin-text" },
                { l: "Paid to date", v: "£119,847.20", color: "text-admin-active-text" },
                { l: "In transit", v: "£4,503.45", color: "text-admin-new-text" },
                { l: "Failed (retried)", v: "£0.00", color: "text-admin-muted" },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                  <span className="text-admin-text">{r.l}</span>
                  <span className={`font-semibold ${r.color}`}>{r.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 rounded-md bg-admin-active-bg text-[12.5px] text-admin-active-text">
              ✓ Status: Balanced · All matched
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Daily cash position (payout day)</h2>
            <div className="space-y-2 text-[13px]">
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Oct 15 starting balance</span>
                <span className="font-semibold text-admin-text">£171,690.90</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Payouts submitted</span>
                <span className="font-semibold text-admin-non-text">-£124,350.65</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-active-bg">
                <span className="text-admin-text font-semibold">Ending balance</span>
                <span className="font-bold text-admin-active-text">£47,340.25</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Oct 16-20 daily outflow</span>
                <span className="font-semibold text-admin-non-text">-£2,403/day</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Oct 21 expected balance</span>
                <span className="font-semibold text-admin-text">£38,895.80</span>
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-md bg-admin-vip-bg text-[12.5px] text-admin-vip-text">
              ⚠ Alert threshold met: Below £40,000 reserve floor
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Recommended actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { n: 1, t: "Launch premium features", d: "Nov 2024 — expected £3,000/month new income, target £6,000/mo by Q2 2025. Break-even by Q1 2025." },
              { n: 2, t: "Optimize Stripe fees", d: "Negotiate volume discount at $1M+ monthly volume. Potential savings: £200-300/month." },
              { n: 3, t: "Top up reserve", d: "Move £50,000 from operating account to dedicated reserve to maintain 30-day buffer." },
              { n: 4, t: "Reduce payout fees", d: "Switch smaller payouts (&lt;£10) to PayPal to minimize per-transaction overhead." },
            ].map((a) => (
              <div key={a.n} className="p-3 rounded-md border border-admin-border">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-admin-dark text-white flex items-center justify-center text-[12px] font-semibold flex-shrink-0">
                    {a.n}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-admin-text">{a.t}</div>
                    <p className="text-[12px] text-admin-muted mt-0.5">{a.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
