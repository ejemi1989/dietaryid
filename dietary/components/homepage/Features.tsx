import Link from "next/link";

const features = [
  {
    icon: "🔍",
    iconClass: "bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e]",
    title: "Find Safely",
    description: "Search restaurants and dishes filtered by your exact allergy profile. Every listing is verified by our community and cross-checked against menus, so you always know what's safe before you order.",
    mini: "12,480 verified spots · updated in real time",
  },
  {
    icon: "🤝",
    iconClass: "bg-gradient-to-br from-[#7c9bf2] to-[#5b6ee8]",
    title: "Connect with Peers",
    description: "Join a community of people with the same dietary needs as you. Share experiences, swap restaurant tips, and get honest answers from people who actually understand your allergies.",
    mini: "48k members · 2,100+ daily conversations",
  },
  {
    icon: "💸",
    iconClass: "bg-gradient-to-br from-[#5fcfb2] to-[#37b3a0]",
    title: "Earn as Creator",
    description: "Review dishes, verify menus, and create safe-eating guides for your city. Top contributors earn real rewards while helping thousands of others eat out without fear.",
    mini: "$120k+ paid to creators this year",
  },
];

export function Features() {
  return (
    <section className="py-[70px]" id="features">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-11">
        <div>
          <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-[var(--radius-pill)] px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">
            Benefits
          </span>
          <h2 className="text-[clamp(30px,4vw,44px)] font-extrabold text-[var(--color-navy)] mt-4 tracking-[-1px] leading-[1.15]">
            Why thousands trust<br />DietaryID every day
          </h2>
        </div>
        <Link href="#features" className="no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-5.5 py-2.5 rounded-[11px] transition-all duration-200 hover:bg-[var(--color-navy-dark)] hover:-translate-y-[1px]">
          Learn more
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {features.map((f) => (
          <article
            key={f.title}
            className="bg-[var(--color-feature-card)] rounded-[var(--radius-xl)] px-7 py-[30px] shadow-[var(--shadow-card)] transition-all duration-250 cursor-default hover:-translate-y-1.5 hover:shadow-[var(--shadow-feature-hover)]"
          >
            <div className={`w-[52px] h-[52px] rounded-[var(--radius-icon)] ${f.iconClass} flex items-center justify-center text-[24px] text-white mb-5`}>
              {f.icon}
            </div>
            <h3 className="text-[20px] font-bold text-[var(--color-navy)] mb-2.5">{f.title}</h3>
            <p className="text-[14px] text-[var(--color-muted)] leading-[1.65]">{f.description}</p>
            <div className="mt-[22px] bg-[var(--color-feature-mini)] rounded-[14px] px-4 py-3.5 text-[12.5px] text-[var(--color-navy-soft)] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-teal)] flex-shrink-0 animate-[pulse_2s_infinite]" />
              {f.mini}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
