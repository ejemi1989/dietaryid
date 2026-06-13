import Link from "next/link";

const stats = [
  { label: "Safe spots saved", value: "24", change: "↑ 6 this week" },
  { label: "Safety score", value: "88%", change: "↑ 2.4%" },
  { label: "Reviews written", value: "12", change: "↑ 3 new" },
  { label: "Creator earnings", value: "$76", change: "↑ $18" },
];

export function CTA() {
  return (
    <section className="bg-[var(--color-cta-bg)] rounded-[var(--radius-lg)] text-center py-[60px] px-[30px] mt-10 overflow-hidden" id="contact">
      <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-[var(--radius-pill)] px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">
        Get started
      </span>
      <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold text-[var(--color-navy)] mt-4 mb-6 tracking-[-1px] leading-[1.15]">
        Eat out without fear,<br />starting today!
      </h2>
      <Link href="/signup" className="inline-block no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-[11px] transition-all duration-200 hover:bg-[var(--color-navy-dark)] hover:-translate-y-[1px]">
        Start free
      </Link>

      <div className="max-w-[760px] mx-auto mt-[46px] bg-white rounded-t-[20px] shadow-[var(--shadow-dash)] px-[22px] py-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-left">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--color-dash-stat)] rounded-[12px] p-3.5">
            <div className="text-[11px] text-[var(--color-muted)]">{s.label}</div>
            <div className="text-[19px] font-extrabold text-[var(--color-navy)] mt-1">{s.value}</div>
            <div className="text-[10.5px] text-[var(--color-teal-dark)] font-semibold">{s.change}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
