"use client";

import { useState } from "react";
import Link from "next/link";

const monthlyData = [
  { month: "Oct 2024", earnings: 124350, growth: 12, reviews: 69083, verifications: 37305, guides: 12435, bookings: 0 },
  { month: "Sep 2024", earnings: 110850, growth: 8, reviews: 61583, verifications: 33255, guides: 11085, bookings: 0 },
  { month: "Aug 2024", earnings: 102640, growth: 0, reviews: 57022, verifications: 30792, guides: 10264, bookings: 0 },
  { month: "Jul 2024", earnings: 98500, growth: -3, reviews: 54722, verifications: 29550, guides: 9850, bookings: 0 },
  { month: "Jun 2024", earnings: 101550, growth: 5, reviews: 56416, verifications: 30465, guides: 10155, bookings: 0 },
  { month: "May 2024", earnings: 96714, growth: 2, reviews: 53730, verifications: 29014, guides: 9671, bookings: 0 },
  { month: "Apr 2024", earnings: 94800, growth: 1, reviews: 52666, verifications: 28440, guides: 9480, bookings: 0 },
  { month: "Mar 2024", earnings: 93800, growth: 0, reviews: 52111, verifications: 28140, guides: 9380, bookings: 0 },
  { month: "Feb 2024", earnings: 93450, growth: -1, reviews: 51916, verifications: 28035, guides: 9345, bookings: 0 },
  { month: "Jan 2024", earnings: 94680, growth: 8, reviews: 52599, verifications: 28404, guides: 9468, bookings: 0 },
  { month: "Dec 2023", earnings: 87500, growth: 10, reviews: 48611, verifications: 26250, guides: 8750, bookings: 0 },
  { month: "Nov 2023", earnings: 79545, growth: 0, reviews: 44191, verifications: 23863, guides: 7954, bookings: 0 },
];

export default function AdminRevenuePage() {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");
  const [showExport, setShowExport] = useState(false);
  const [exportType, setExportType] = useState<"pdf" | "csv" | "excel">("pdf");

  const maxEarnings = Math.max(...monthlyData.map((m) => m.earnings));
  const current = monthlyData[0];
  const ytd = monthlyData.filter((m) => m.month.includes("2024")).reduce((s, m) => s + m.earnings, 0);
  const avgMonthly = ytd / 10;

  const grossRevenue = current.earnings;
  const platformCommission = grossRevenue * 0.15;
  const stripeFees = grossRevenue * 0.015 + current.earnings * 0.0016;
  const opsCosts = 7150;
  const totalCosts = stripeFees + opsCosts;
  const netProfit = platformCommission - totalCosts;
  const operatingMargin = (netProfit / platformCommission) * 100;

  const handleExport = () => {
    const text = `DietaryID Revenue Report\n${period}\nGross: £${grossRevenue.toFixed(2)}\nNet: £${netProfit.toFixed(2)}\nMargin: ${operatingMargin.toFixed(1)}%\nGenerated: ${new Date().toISOString()}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `revenue-report-${current.month}.${exportType === "excel" ? "csv" : exportType}`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExport(false);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Revenue & Profitability 💹</h1>
            <p className="text-[13.5px] text-admin-muted">Platform revenue, costs, profit margins, and financial trends.</p>
          </div>
          <button
            onClick={() => setShowExport(true)}
            className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
          >
            ⬇ Export report
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {([
          { v: "month", l: "This month" },
          { v: "quarter", l: "This quarter" },
          { v: "year", l: "Year to date" },
        ] as const).map((p) => (
          <button
            key={p.v}
            onClick={() => setPeriod(p.v)}
            className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
              period === p.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {p.l}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Platform revenue (15%)</div>
            <div className="text-[28px] font-semibold text-admin-active-text">£{platformCommission.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">From £{grossRevenue.toLocaleString()} gross</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">↑ +{current.growth}% MoM</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Operating costs</div>
            <div className="text-[28px] font-semibold text-admin-text">£{totalCosts.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Stripe £{stripeFees.toFixed(0)} + Ops £{opsCosts.toFixed(0)}</div>
            <div className="text-[12px] mt-1 text-admin-muted">Cost ratio: {(totalCosts / grossRevenue * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Net profit</div>
            <div className="text-[28px] font-semibold text-admin-text">£{netProfit.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Operating margin</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">{operatingMargin.toFixed(1)}% margin</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">YTD earnings</div>
            <div className="text-[28px] font-semibold text-admin-text">£{ytd.toLocaleString()}</div>
            <div className="text-[12.5px] text-admin-text mt-1">10 months · £{avgMonthly.toFixed(0)}/mo avg</div>
            <div className="text-[12px] mt-1 text-admin-muted">+12% vs prior 10mo</div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold text-admin-text">Monthly creator earnings (12 months)</h2>
            <span className="text-[12px] text-admin-muted">£{ytd.toLocaleString()} YTD</span>
          </div>
          <div className="flex items-end gap-1 h-[180px]">
            {monthlyData.slice().reverse().map((m, i) => {
              const heightPct = (m.earnings / maxEarnings) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center justify-end gap-1 group relative">
                  <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-admin-dark text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                    £{m.earnings.toLocaleString()}
                  </div>
                  <div
                    className={`w-full rounded-t transition-colors ${
                      m.growth > 0 ? "bg-admin-active-text/70 hover:bg-admin-active-text" :
                      m.growth < 0 ? "bg-admin-non-text/70 hover:bg-admin-non-text" :
                      "bg-admin-new-text/70 hover:bg-admin-new-text"
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="text-[9.5px] text-admin-muted whitespace-nowrap">{m.month.split(" ")[0]}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Revenue breakdown by activity</h2>
            <div className="space-y-3">
              {[
                { l: "Reviews", val: current.reviews, rate: 1.35, total: current.reviews * 1.35, pct: 75, color: "admin-active" },
                { l: "Verifications", val: current.verifications, rate: 0.50, total: current.verifications * 0.50, pct: 15, color: "admin-new" },
                { l: "Guides", val: 1, rate: 12435, total: 12435, pct: 10, color: "admin-vip" },
                { l: "Bookings", val: 0, rate: 0.10, total: 0, pct: 0, color: "admin-icon-secondary" },
              ].map((row) => (
                <div key={row.l}>
                  <div className="flex items-center justify-between mb-1 text-[13px]">
                    <span className="text-admin-text font-medium">{row.l}</span>
                    <span className={`text-admin-${row.color}-text font-semibold`}>£{row.total.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-admin-border rounded-full overflow-hidden">
                    <div className={`h-full bg-admin-${row.color}-text rounded-full`} style={{ width: `${row.pct}%` }} />
                  </div>
                  <div className="text-[10.5px] text-admin-muted mt-0.5">{row.pct}% of total</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Cost analysis</h2>
            <div className="space-y-2 text-[13px]">
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Payment processing (Stripe 1.5% + £0.20)</span>
                <span className="text-admin-vip-text font-semibold">£{stripeFees.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Engineering (est.)</span>
                <span className="text-admin-text">£2,150</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Support (est.)</span>
                <span className="text-admin-text">£1,200</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Infrastructure</span>
                <span className="text-admin-text">£800</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-hover">
                <span className="text-admin-text">Marketing</span>
                <span className="text-admin-text">£3,000</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-admin-active-bg border-t-2 border-admin-active-text">
                <span className="text-admin-text font-semibold">Total costs</span>
                <span className="text-admin-text font-bold text-[15px]">£{totalCosts.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Profitability metrics (this month)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Gross margin</div>
              <div className="text-[20px] font-semibold text-admin-text">15.0%</div>
              <div className="text-[11px] text-admin-muted">Commission rate</div>
            </div>
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Operating margin</div>
              <div className="text-[20px] font-semibold text-admin-active-text">{operatingMargin.toFixed(1)}%</div>
              <div className="text-[11px] text-admin-muted">After costs</div>
            </div>
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Cost per payout</div>
              <div className="text-[20px] font-semibold text-admin-text">2.5%</div>
              <div className="text-[11px] text-admin-muted">Of payout amount</div>
            </div>
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Per-review profit</div>
              <div className="text-[20px] font-semibold text-admin-active-text">£0.15</div>
              <div className="text-[11px] text-admin-muted">11.1% of £1.35</div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-md bg-admin-hover">
            <h3 className="text-[13px] font-semibold text-admin-text mb-2">Unit economics (per review)</h3>
            <div className="space-y-1.5 text-[12.5px]">
              <div className="flex items-center justify-between"><span className="text-admin-text">Creator earns</span><span className="font-semibold text-admin-text">£1.35 (100%)</span></div>
              <div className="flex items-center justify-between"><span className="text-admin-text">DietaryID makes</span><span className="font-semibold text-admin-active-text">£0.20 (15%)</span></div>
              <div className="flex items-center justify-between"><span className="text-admin-text">Costs (Stripe + ops allocation)</span><span className="font-semibold text-admin-vip-text">£0.05 (3.7%)</span></div>
              <div className="flex items-center justify-between border-t border-admin-border pt-1.5"><span className="text-admin-text font-semibold">Net profit</span><span className="font-bold text-admin-active-text">£0.15 (11.3%)</span></div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Risk & quality metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Disputed earnings</div>
              <div className="text-[18px] font-semibold text-admin-text">£450</div>
              <div className="text-[11px] text-admin-active-text">0.4% of total ✓</div>
            </div>
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Payout success rate</div>
              <div className="text-[18px] font-semibold text-admin-text">98.5%</div>
              <div className="text-[11px] text-admin-active-text">834/847 ✓</div>
            </div>
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Avg time to payout</div>
              <div className="text-[18px] font-semibold text-admin-text">2.3 days</div>
              <div className="text-[11px] text-admin-muted">From submission</div>
            </div>
            <div className="p-3 rounded-md bg-admin-hover">
              <div className="text-[11.5px] text-admin-muted">Top 10 creators earn</div>
              <div className="text-[18px] font-semibold text-admin-text">25%</div>
              <div className="text-[11px] text-admin-active-text">Healthy diversification</div>
            </div>
          </div>
        </div>
      </div>

      {showExport && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowExport(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Export revenue report</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">{current.month} · {period === "year" ? "YTD" : period}</p>
            <div className="mb-3">
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(["pdf", "csv", "excel"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setExportType(f)}
                    className={`text-[12.5px] py-2 rounded-md border ${
                      exportType === f ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowExport(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleExport}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                ⬇ Download {exportType.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
