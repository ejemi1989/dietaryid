const testimonials = [
  {
    brand: "🌾 Celiac & thriving",
    quote: '"DietaryID is by far my favorite tool for living with celiac disease. It\'s incredibly thorough yet surprisingly simple. I went from anxiously interrogating waiters to just… eating. The freedom it gives me is unmatched."',
    initials: "JG",
    name: "Jake George",
    meta: "Celiac for 11 years · London",
    avatarBg: "bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e]",
    cardClass: "bg-gradient-to-b from-[#fffdfc] to-[#fdeee8]",
  },
  {
    brand: "🥜 Nut-allergy parent",
    quote: '"I recently started using DietaryID to plan meals out for my son with a severe nut allergy, and the results have been incredible. It streamlines everything, removes the guesswork, and saves us a ton of stress every single week."',
    initials: "SA",
    name: "Steve Armenti",
    meta: "Parent & community moderator",
    avatarBg: "bg-gradient-to-br from-[#7c9bf2] to-[#5b6ee8]",
    cardClass: "bg-gradient-to-b from-[#eef2ff] to-[#fdeff0]",
  },
  {
    brand: "✳ Top creator",
    quote: '"I absolutely love contributing on DietaryID — it has enabled me to build genuinely useful safe-eating guides for my city. It drives real value for my followers and pays me for it. A game-changer for our community!"',
    initials: "SR",
    name: "Sam Rahmanian",
    meta: "Creator · 340 verified reviews",
    avatarBg: "bg-gradient-to-br from-[#5fcfb2] to-[#37b3a0]",
    cardClass: "bg-gradient-to-b from-[#fffdfc] to-[#eef4ff]",
  },
];

export function Testimonials() {
  return (
    <section className="py-[70px]" id="testimonials">
      <div className="text-center mb-[46px]">
        <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-[var(--radius-pill)] px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">
          Testimonials
        </span>
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-[var(--color-navy)] mt-4 mb-3 tracking-[-1px]">
          What our community is saying
        </h2>
        <p className="text-[var(--color-muted)] text-[14px]">
          Trusted by people with allergies, intolerances and dietary restrictions worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className={`${t.cardClass} rounded-[var(--radius-lg)] px-[26px] py-7 shadow-[var(--shadow-card)] flex flex-col gap-[18px] transition-all duration-250 hover:-translate-y-[5px]`}
          >
            <div className="font-bold text-[var(--color-navy)] flex items-center gap-2 text-[15px]">{t.brand}</div>
            <blockquote className="text-[13.5px] text-[var(--color-navy-soft)] leading-[1.7] flex-1">{t.quote}</blockquote>
            <div className="flex items-center gap-3">
              <div className={`w-[42px] h-[42px] rounded-full ${t.avatarBg} flex items-center justify-center text-white font-bold text-[15px]`}>
                {t.initials}
              </div>
              <div>
                <b className="block text-[14px] text-[var(--color-navy)]">{t.name}</b>
                <small className="text-[var(--color-muted)] text-[12px]">{t.meta}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
