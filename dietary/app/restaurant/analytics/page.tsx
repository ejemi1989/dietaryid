"use client";

import { useState } from "react";

type Period = "month" | "quarter" | "year" | "custom";

const periodLabels: Record<Period, string> = {
  month: "This Month",
  quarter: "Last 3 Months",
  year: "Last Year",
  custom: "Custom Range",
};

const topDishes = [
  { rank: 1, name: "Grilled Salmon", emoji: "🐟", rating: 4.9, reviews: 18, note: "Safe for Celiac: ⭐ 4.9", flag: false },
  { rank: 2, name: "Quinoa Power Bowl", emoji: "🥗", rating: 4.7, reviews: 12, note: "Safe for Vegan + GF: ⭐ 4.8", flag: false },
  { rank: 3, name: "Caesar Salad (GF)", emoji: "🥬", rating: 4.5, reviews: 8, note: "Safe for Celiac: ⭐ 4.6", flag: false },
  { rank: 4, name: "Pasta Primavera", emoji: "🍝", rating: 4.4, reviews: 9, note: "Safe for GF version: ⭐ 4.5", flag: false },
];

const flaggedDishes = [
  { name: "French Fries", emoji: "🍟", rating: 3.2, reviews: 8, issue: "Cross-contamination concerns", feedback: "Asked about frying oil, staff weren't sure" },
  { name: "Chocolate Cake (GF)", emoji: "🍰", rating: 3.7, reviews: 6, issue: "Inconsistent prep", feedback: "Some bites tasted different, unsure if GF" },
];

const demographics = [
  { label: "Celiac", pct: 60 },
  { label: "Gluten-Free", pct: 30 },
  { label: "Nut Allergy", pct: 10 },
];

const ageRanges = [
  { label: "18-25", pct: 22 },
  { label: "25-35", pct: 38 },
  { label: "35-45", pct: 25 },
  { label: "45-55", pct: 10 },
  { label: "55+", pct: 5 },
];

const positiveThemes = [
  { text: "Staff knowledge", count: 23 },
  { text: "Cross-contamination procedures", count: 18 },
  { text: "Menu options", count: 15 },
  { text: "Cleanliness", count: 12 },
];

const improvementThemes = [
  { text: "Want more vegan options", count: 5 },
  { text: "Menu clearer about allergens", count: 4 },
  { text: "Dedicated prep area", count: 3 },
  { text: "Pricing slightly high", count: 3 },
];

const competitors = [
  { name: "Your Restaurant (The Italian Kitchen)", rating: 4.8, highlight: true, reviews: 47 },
  { name: "Competitor A (Bella Italia)", rating: 4.3, highlight: false, reviews: 32 },
  { name: "Competitor B (Pizza Roma)", rating: 4.5, highlight: false, reviews: 28 },
  { name: "Competitor C (Olive Garden)", rating: 3.9, highlight: false, reviews: 21 },
];

export default function RestaurantAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("month");
  const [customStart, setCustomStart] = useState("2024-01-01");
  const [customEnd, setCustomEnd] = useState("2024-01-31");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = period === "month" ? 30 : period === "quarter" ? 90 : period === "year" ? 365 : 30;
  const viewsData = Array.from({ length: Math.min(days, 60) }).map((_, i) => {
    return parseFloat((30 + Math.sin(i * 0.4) * 18 + ((i * 7) % 25) + (period === "year" ? 5 : 0)).toFixed(4));
  });

  const profileViews = 284;
  const customerReach = 2340;
  const savedCount = 156;
  const newReviews = 8;
  const responseTime = 4.2;
  const estRevenue = 432;
  const estAnnual = 5184;
  const newCustomers = 12;

  const avgDailyViews = (viewsData.reduce((s, v) => s + v, 0) / viewsData.length).toFixed(1);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Analytics & Insights 📊</h1>
            <p className="text-[14px] text-admin-muted">Understand your customer base and measure ROI from DietaryID.</p>
          </div>
          <button
            onClick={() => alert("Report exported as PDF (mock)")}
            className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
          >
            ⬇ Export report
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border flex-wrap">
        {(["month", "quarter", "year", "custom"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
              period === p ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
        {period === "custom" && (
          <div className="flex items-center gap-2 ml-2">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="text-[12.5px] px-2 py-1 border border-admin-border rounded-md bg-admin-bg text-admin-text"
            />
            <span className="text-[12.5px] text-admin-muted">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="text-[12.5px] px-2 py-1 border border-admin-border rounded-md bg-admin-bg text-admin-text"
            />
          </div>
        )}
      </div>

      <div className="px-[26px] py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Profile Views</div>
            <div className="text-[28px] font-semibold text-admin-text">{profileViews}</div>
            <div className="text-[12px] text-admin-active-text mt-1 font-medium">↑ +47 from last month</div>
            <div className="text-[11.5px] text-admin-muted mt-1">{avgDailyViews} avg/day</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Customer Reach</div>
            <div className="text-[28px] font-semibold text-admin-text">{customerReach.toLocaleString()}</div>
            <div className="text-[12px] text-admin-active-text mt-1 font-medium">Users in search results</div>
            <div className="text-[11.5px] text-admin-muted mt-1">{savedCount} saved you</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Review Metrics</div>
            <div className="text-[28px] font-semibold text-admin-text">{newReviews}</div>
            <div className="text-[12px] text-admin-active-text mt-1 font-medium">↑ New reviews this month</div>
            <div className="text-[11.5px] text-admin-muted mt-1">Avg response: {responseTime}h</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Est. Customer Value</div>
            <div className="text-[28px] font-semibold text-admin-text">${estRevenue}</div>
            <div className="text-[12px] text-admin-active-text mt-1 font-medium">From {newCustomers} new customers</div>
            <div className="text-[11.5px] text-admin-muted mt-1">Projected annual: ${estAnnual.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Profile views over time</h2>
            <div className="text-[12px] text-admin-muted">
              {viewsData.length} {viewsData.length === 1 ? "day" : "days"} · {periodLabels[period]}
            </div>
          </div>
          <div className="flex items-end gap-0.5 h-[140px]">
            {viewsData.map((h, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i === selectedDay ? null : i)}
                className={`flex-1 rounded-t-sm transition-colors cursor-pointer ${
                  selectedDay === i ? "bg-admin-dark/70" : "bg-admin-dark/20 hover:bg-admin-dark/40"
                }`}
                style={{ height: `${h}%` }}
                title={`Day ${i + 1}: ${Math.round(h * 0.5)} views`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-admin-muted mt-2">
            <span>{viewsData.length} days ago</span>
            <span>Today</span>
          </div>
          {selectedDay !== null && (
            <div className="mt-3 pt-3 border-t border-admin-border flex items-center justify-between">
              <div>
                <div className="text-[12px] text-admin-muted">Day {selectedDay + 1}</div>
                <div className="text-[20px] font-semibold text-admin-text">{Math.round(viewsData[selectedDay] * 0.5)} views</div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="text-[12px] text-admin-muted hover:text-admin-text">Close</button>
            </div>
          )}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-4">Top rated dishes</h2>
          <div className="space-y-2">
            {topDishes.map((d) => (
              <div key={d.name} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                <div className="text-[24px]">{d.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold text-admin-text">#{d.rank} {d.name}</span>
                    <span className="text-[13px] text-admin-vip-text">⭐ {d.rating}</span>
                    <span className="text-[12px] text-admin-muted ml-auto">{d.reviews} reviews</span>
                  </div>
                  <p className="text-[12px] text-admin-muted">{d.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-2">⚠️ Items needing attention</h2>
          <p className="text-[12px] text-admin-muted mb-4">Based on customer feedback, these dishes may need review.</p>
          <div className="space-y-3">
            {flaggedDishes.map((d) => (
              <div key={d.name} className="border border-admin-non-text/40 rounded-md p-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[20px]">{d.emoji}</span>
                  <span className="text-[14px] font-semibold text-admin-text">{d.name}</span>
                  <span className="text-[13px] text-admin-non-text">⭐ {d.rating}</span>
                  <span className="text-[12px] text-admin-muted">({d.reviews} reviews)</span>
                </div>
                <p className="text-[12.5px] text-admin-nav-text">✗ Main issue: {d.issue}</p>
                <p className="text-[12px] text-admin-muted italic mt-0.5">"{d.feedback}"</p>
                <div className="mt-2">
                  <button className="text-[12px] text-admin-new-text hover:underline font-medium">
                    → Recommendation: review this dish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Customer demographics</h2>
            <div className="mb-4">
              <div className="text-[12.5px] text-admin-muted mb-2">Primary allergies</div>
              <div className="space-y-2">
                {demographics.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between mb-0.5 text-[12.5px]">
                      <span className="text-admin-text">{d.label}</span>
                      <span className="text-admin-muted">{d.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-admin-border rounded-full">
                      <div className="h-full bg-admin-active-text rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12.5px] text-admin-muted mb-2">Age range</div>
              <div className="space-y-2">
                {ageRanges.map((a) => (
                  <div key={a.label} className="flex items-center gap-2 text-[12.5px]">
                    <span className="text-admin-text w-12">{a.label}</span>
                    <div className="flex-1 h-1.5 bg-admin-border rounded-full">
                      <div className="h-full bg-admin-new-text rounded-full" style={{ width: `${a.pct}%` }} />
                    </div>
                    <span className="text-admin-muted w-8 text-right">{a.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-admin-border grid grid-cols-2 gap-2 text-[12px]">
              <div>
                <div className="text-admin-muted">Group size</div>
                <div className="text-admin-text font-medium">Avg 2-3 people</div>
              </div>
              <div>
                <div className="text-admin-muted">Frequency</div>
                <div className="text-admin-text font-medium">40% first-time · 60% repeat</div>
              </div>
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Feedback themes</h2>
            <div className="mb-4">
              <div className="text-[12.5px] text-admin-active-text font-medium mb-2">✓ Positive themes</div>
              {positiveThemes.map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-[12.5px] py-0.5">
                  <span className="text-admin-active-text">✓</span>
                  <span className="text-admin-text flex-1">{t.text}</span>
                  <span className="text-admin-muted">({t.count} reviews)</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[12.5px] text-admin-vip-text font-medium mb-2">→ Areas for improvement</div>
              {improvementThemes.map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-[12.5px] py-0.5">
                  <span className="text-admin-vip-text">→</span>
                  <span className="text-admin-text flex-1">{t.text}</span>
                  <span className="text-admin-muted">({t.count} reviews)</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-admin-border">
              <div className="text-[12.5px] text-admin-new-text font-medium mb-2">💡 Action opportunities</div>
              {["Expand vegan menu items (based on demand)", "Create allergen-specific menu cards (ease of ordering)", "Add more low-price options (accessibility)"].map((a) => (
                <div key={a} className="text-[12.5px] text-admin-nav-text py-0.5">💡 {a}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">🏆 Competitive positioning</h2>
          <p className="text-[12px] text-admin-muted mb-4">Safety ratings in your area for Celiac-safe options</p>
          <div className="space-y-2 mb-4">
            {competitors.map((c) => (
              <div
                key={c.name}
                className={`flex items-center gap-3 p-3 rounded-md ${c.highlight ? "bg-admin-active-bg border border-admin-active-text/30" : "border border-admin-border"}`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`text-[14px] font-semibold ${c.highlight ? "text-admin-active-text" : "text-admin-text"}`}>{c.name}</div>
                  <div className="text-[11.5px] text-admin-muted">{c.reviews} reviews</div>
                </div>
                <div className="text-right">
                  <div className="text-[18px] font-bold text-admin-text">⭐ {c.rating}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-md bg-admin-active-bg">
            <p className="text-[13px] text-admin-active-text font-medium">🎉 You&apos;re #1 for Celiac-safe options in Manchester!</p>
            <ul className="mt-2 text-[12px] text-admin-nav-text space-y-0.5">
              <li>• Nearest competitor (Bella Italia) has fewer gluten-free items</li>
              <li>• No competitors emphasize staff training like you do</li>
              <li>• You&apos;re rated 0.3★ higher than the next best</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
