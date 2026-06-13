"use client";

import { useState } from "react";

type ReportType = "monthly" | "competitive" | "customer" | "custom";

const reportTypes: { v: ReportType; l: string; icon: string; desc: string; metrics: string[] }[] = [
  { v: "monthly", l: "Monthly Performance Report", icon: "📊", desc: "Profile views, customer reach, review metrics, top dishes, feedback summary", metrics: ["Profile views", "Customer reach", "Review metrics", "Top-rated dishes", "Customer feedback summary"] },
  { v: "competitive", l: "Competitive Analysis Report", icon: "🏆", desc: "How you rank vs. competitors, your strengths, market opportunities", metrics: ["Your rank vs. competitors", "Strengths vs. weaknesses", "Market opportunities"] },
  { v: "customer", l: "Customer Insights Report", icon: "👥", desc: "Demographics, allergen breakdowns, what they&apos;re saying, recommendations", metrics: ["Demographics", "Allergen breakdowns", "Customer feedback themes", "Actionable recommendations"] },
  { v: "custom", l: "Custom Date Range", icon: "📅", desc: "Pick dates and select which metrics to include", metrics: ["Custom"] },
];

const generatedReports = [
  { name: "Monthly Performance - December 2023", date: "Jan 1, 2024", size: "245 KB", type: "monthly" },
  { name: "Customer Insights - Q4 2023", date: "Dec 31, 2023", size: "189 KB", type: "customer" },
  { name: "Competitive Analysis - Nov 2023", date: "Nov 30, 2023", size: "312 KB", type: "competitive" },
];

export default function RestaurantReportsPage() {
  const [selected, setSelected] = useState<ReportType>("monthly");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-31");
  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(new Set(reportTypes[0].metrics));

  const handleSelect = (v: ReportType) => {
    setSelected(v);
    const found = reportTypes.find((r) => r.v === v);
    if (found) setSelectedMetrics(new Set(found.metrics));
  };

  const handleToggleMetric = (m: string) => {
    setSelectedMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  };

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(null);
    setTimeout(() => {
      setGenerating(false);
      const type = reportTypes.find((r) => r.v === selected);
      setGenerated(type?.l || "Report");
    }, 1500);
  };

  const handleDownload = () => {
    alert("Report downloaded as PDF (mock)");
  };

  const handleEmail = () => {
    alert("Report emailed to your team (mock)");
  };

  const current = reportTypes.find((r) => r.v === selected);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Reports 📄</h1>
        <p className="text-[14px] text-admin-muted">Generate performance reports to share with your team and stakeholders.</p>
      </div>

      <div className="px-[26px] py-6 max-w-[1000px]">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Generate a new report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {reportTypes.map((r) => (
              <button
                key={r.v}
                onClick={() => handleSelect(r.v)}
                className={`text-left p-4 rounded-md border transition-colors ${
                  selected === r.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[20px]">{r.icon}</span>
                  <span className="text-[14px] font-semibold text-admin-text">{r.l}</span>
                </div>
                <p className="text-[12.5px] text-admin-muted">{r.desc}</p>
              </button>
            ))}
          </div>

          {selected === "custom" && (
            <div className="border border-admin-border rounded-md p-3 mb-4">
              <div className="text-[12.5px] text-admin-muted mb-2">Pick date range</div>
              <div className="flex items-center gap-2 mb-3">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text" />
                <span className="text-[12.5px] text-admin-muted">to</span>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text" />
              </div>
            </div>
          )}

          <div className="border border-admin-border rounded-md p-3 mb-4">
            <div className="text-[12.5px] text-admin-muted mb-2">Metrics to include</div>
            <div className="space-y-1.5">
              {current?.metrics.map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer p-1.5 rounded-md hover:bg-admin-hover">
                  <input
                    type="checkbox"
                    checked={selectedMetrics.has(m)}
                    onChange={() => handleToggleMetric(m)}
                    className="w-4 h-4"
                  />
                  <span className="text-[13px] text-admin-text">{m}</span>
                </label>
              ))}
            </div>
            <p className="text-[11.5px] text-admin-muted mt-2">{selectedMetrics.size} metric{selectedMetrics.size !== 1 ? "s" : ""} selected</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleGenerate}
              disabled={generating || selectedMetrics.size === 0}
              className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
            >
              {generating ? "⏳ Generating..." : "📄 Generate report"}
            </button>
            {generated && (
              <>
                <button
                  onClick={handleDownload}
                  className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ⬇ Download PDF
                </button>
                <button
                  onClick={handleEmail}
                  className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ✉ Email to team
                </button>
                <button
                  onClick={() => window.print()}
                  className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  🖨 Print
                </button>
              </>
            )}
          </div>
          {generated && (
            <div className="mt-3 p-3 rounded-md bg-admin-active-bg">
              <p className="text-[12.5px] text-admin-active-text">✓ &quot;{generated}&quot; generated successfully. Choose an action above.</p>
            </div>
          )}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Recent reports</h2>
          <div className="space-y-2">
            {generatedReports.map((r) => (
              <div key={r.name} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                <div className="text-[24px]">📄</div>
                <div className="flex-1">
                  <div className="text-[13.5px] text-admin-text font-medium">{r.name}</div>
                  <div className="text-[12px] text-admin-muted">{r.date} · {r.size}</div>
                </div>
                <button
                  onClick={() => alert(`Downloaded ${r.name}.pdf (mock)`)}
                  className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ⬇ Download
                </button>
                <button
                  onClick={() => alert(`Emailed ${r.name} (mock)`)}
                  className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ✉
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
