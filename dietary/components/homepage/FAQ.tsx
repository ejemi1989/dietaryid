"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does DietaryID verify that food is safe?",
    a: "Every listing combines three layers: menus verified directly with restaurant staff, ingredient cross-checks against allergen databases, and live reviews from community members with your exact allergy profile.",
  },
  {
    q: "Is my health data secure?",
    a: "Yes. Your allergy profile is encrypted end-to-end, never sold to third parties, and you control exactly what is shared with the community. We are fully GDPR and HIPAA compliant.",
  },
  {
    q: "Can I use DietaryID when travelling abroad?",
    a: "Absolutely. DietaryID covers 40+ countries and automatically translates your allergy profile into the local language, including printable allergy cards you can show restaurant staff.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — the core search and community features are free forever. Premium adds offline maps, travel translations, and creator monetization, with a 14-day free trial and no credit card required.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-[70px]" id="faq">
      <div className="text-center mb-[46px]">
        <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-[var(--radius-pill)] px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">
          FAQ
        </span>
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-[var(--color-navy)] mt-4 mb-3 tracking-[-1px]">
          FAQs
        </h2>
        <p className="text-[var(--color-muted)] text-[14px]">
          Everything you need to know before getting started
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
        <div className="bg-[var(--color-faq-visual)] rounded-[var(--radius-lg)] p-9 flex items-center justify-center min-h-[320px]">
          <div className="bg-white rounded-[18px] shadow-[var(--shadow-soft)] p-5 w-full max-w-[300px]">
            <h4 className="text-[14px] text-[var(--color-navy)] mb-3.5">Safety check · Thai Garden</h4>
            {[
              { num: 1, text: "Menu verified by staff", badge: "Safe" },
              { num: 2, text: "38 community reviews", badge: "Safe" },
              { num: 3, text: "Cross-contamination check", badge: "98%" },
              { num: 4, text: "Oliv Potter recommends", badge: "✓" },
            ].map((row) => (
              <div key={row.num} className="flex items-center gap-2.5 p-2.5 rounded-[10px] mb-1.5 bg-[var(--color-mock-row)] text-[12px] text-[var(--color-navy-soft)]">
                <span className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e] text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                  {row.num}
                </span>
                {row.text}
                <span className="ml-auto bg-[var(--color-safe-bg)] text-[var(--color-safe-text)] text-[10px] font-bold px-2.5 py-0.5 rounded-[var(--radius-pill)]">
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[var(--color-faq-border)]">
              <button
                className="w-full bg-none border-none font-sans text-[16px] font-semibold text-[var(--color-navy)] flex justify-between items-center py-5 px-1 cursor-pointer text-left gap-4"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                {faq.q}
                <span className={`transition-transform duration-300 text-[var(--color-muted)] flex-shrink-0 ${openIndex === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-350 ease-in-out"
                style={{ maxHeight: openIndex === i ? "200px" : "0" }}
              >
                <div className="px-1 pb-5 text-[var(--color-muted)] text-[14px] leading-[1.65]">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
