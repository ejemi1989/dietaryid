type Metric = {
  label: string;
  value: string;
  sub?: string;
};

const sections: { title: string; items: Metric[] }[] = [
  {
    title: "USERS",
    items: [
      { label: "Total", value: "47,230" },
      { label: "New this month", value: "2,450", sub: "↑ 12% vs last month" },
      { label: "Active (7 days)", value: "12,450" },
      { label: "Retention (3-month)", value: "68%", sub: "↑ 3% vs last quarter" },
    ],
  },
  {
    title: "RESTAURANTS",
    items: [
      { label: "Total", value: "1,240" },
      { label: "Verified", value: "892 (72%)" },
      { label: "New this month", value: "156" },
      { label: "Active", value: "1,100" },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { label: "Reviews this month", value: "3,200" },
      { label: "Avg rating", value: "4.6⭐" },
      { label: "Community posts", value: "8,340" },
      { label: "Moderation queue", value: "12 pending" },
    ],
  },
  {
    title: "REVENUE",
    items: [
      { label: "This month", value: "£12,450", sub: "↑ 8% vs last month" },
      { label: "Creator payouts", value: "£8,230" },
      { label: "Platform fee", value: "£4,220" },
      { label: "Lifetime", value: "£234,560" },
    ],
  },
  {
    title: "HEALTH",
    items: [
      { label: "Disputes open", value: "8" },
      { label: "System uptime", value: "99.98%" },
      { label: "Response time", value: "120ms avg" },
      { label: "Last backup", value: "2 hours ago" },
    ],
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Analytics</h1>
        <p className="text-[14px] text-admin-muted mb-6">Key platform metrics — updated daily.</p>

        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-[11.5px] tracking-[0.05em] uppercase text-admin-muted font-semibold mb-3">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {section.items.map((m) => (
                <div
                  key={m.label}
                  className="bg-admin-bg border border-admin-border rounded-[10px] p-5"
                >
                  <div className="text-[12px] text-admin-muted mb-1">{m.label}</div>
                  <div className="text-[22px] font-semibold text-admin-text">{m.value}</div>
                  {m.sub && (
                    <div className="text-[11.5px] text-admin-active-text mt-1">{m.sub}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
