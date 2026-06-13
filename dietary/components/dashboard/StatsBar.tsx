type Stat = {
  label: string;
  value: string;
  small?: string;
  sparkType: "line" | "flat-line";
  sparkPoints?: string;
};

const stats: Stat[] = [
  {
    label: "Total users",
    value: "12,936",
    sparkType: "line",
    sparkPoints: "0,28 30,26 60,22 90,20 120,15 150,13 180,8 200,6",
  },
  {
    label: "Active profiles",
    value: "11,856",
    small: "94%",
    sparkType: "line",
    sparkPoints: "0,26 25,24 50,27 75,20 100,22 125,16 150,18 175,11 200,9",
  },
  {
    label: "Flagged meals",
    value: "80",
    small: "6%",
    sparkType: "flat-line",
  },
  {
    label: "Scan velocity",
    value: "1:42",
    small: "Normal",
    sparkType: "flat-line",
  },
  {
    label: "Data health",
    value: "82%",
    sparkType: "flat-line",
  },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border-b border-admin-border pt-[18px] pb-3 px-[26px]">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`px-[18px] ${i < stats.length - 1 ? "border-r border-admin-border" : ""} ${
            i >= 2 ? "hidden md:block" : ""
          } ${i >= 3 ? "lg:block" : ""}`}
        >
          <div className="text-[14px] text-admin-stat-label flex items-center gap-1.5 mb-2">
            {s.label}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[13px] h-[13px] text-admin-trend">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
          <div className="text-[30px] font-semibold flex items-baseline gap-2 text-admin-text">
            {s.value}
            {s.small && <small className="text-[13px] text-admin-muted font-normal">{s.small}</small>}
          </div>
          <svg className="mt-2.5 h-[34px] w-full" viewBox="0 0 200 34" preserveAspectRatio="none">
            {s.sparkType === "line" ? (
              <polyline
                fill="none"
                stroke="var(--color-admin-spark)"
                strokeWidth="1.5"
                points={s.sparkPoints}
              />
            ) : (
              <>
                <line x1="0" y1="17" x2="200" y2="17" stroke="var(--color-admin-dash-line)" strokeWidth="1" strokeDasharray={s.small === "6%" ? "2 4" : "1 3"} />
                <polygon
                  points={
                    s.small === "6%"
                      ? "40,8 36,2 44,2"
                      : s.small === "Normal"
                      ? "120,8 116,2 124,2"
                      : "190,8 186,2 194,2"
                  }
                  fill="var(--color-admin-spark)"
                />
              </>
            )}
          </svg>
        </div>
      ))}
    </div>
  );
}
