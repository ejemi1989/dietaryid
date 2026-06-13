import Link from "next/link";

const plans = [
  { tier: "Free", price: "0", period: "forever", desc: "Everything you need to eat safely", cta: "Start free", href: "/signup", popular: false, features: ["Find safely with allergy filters", "3-layer verification scores", "Community feed & peer reviews", "Save up to 50 restaurants", "Basic search filters", "Email support"] },
  { tier: "Creator", price: "0", period: "month", desc: "Turn your expertise into real earnings", cta: "Become a creator", href: "/user/become-creator", popular: true, features: ["All Free features", "Write verified reviews (£1.35 each)", "Dish verifications (£0.50 each)", "Create city guides (£6.50+)", "Creator profile & badge", "Monthly payouts via Stripe", "Priority support"] },
  { tier: "Premium", price: "9.99", period: "month", desc: "Advanced tools for restaurants & power users", cta: "Coming soon", href: "#", popular: false, features: ["Advanced analytics dashboard", "Marketing toolkit (badges, QR, social)", "Priority verification queue", "Team management (up to 10 staff)", "Custom allergen reports", "Dedicated account manager"] },
];

const faqs = [
  { q: "Is the Free plan really free?", a: "Yes. Core features — search, verification, community, and saving restaurants — are free forever. No credit card required." },
  { q: "How do creators earn money?", a: "Creators earn £1.35 per verified restaurant review, £0.50 per dish verification, £6.50 per city guide, and £0.10 per booking referral. Payouts are monthly via Stripe or PayPal." },
  { q: "When will Premium be available?", a: "Premium features are launching Q1 2025. Sign up for the Free plan in the meantime — you'll get early access when Premium goes live." },
  { q: "Do I need a separate account to be a creator?", a: "No. Your free DietaryID account lets you use the core features. Apply to the Creator Program from your dashboard and get approved within 24 hours." },
  { q: "What payment methods do you accept?", a: "Premium subscriptions will accept all major credit cards via Stripe. Creator payouts go to bank accounts (ACH/SEPA) or PayPal." },
  { q: "Are there any hidden fees?", a: "No. Creator earnings are 100% transparent — you see the full breakdown before every payout. DietaryID takes a 15% platform commission. Stripe/PayPal processing fees apply per payout." },
];

export default function PricingPage() {
  return (
    <>
      <div className="p-6 px-[clamp(16px,5vw,64px)]">
        <nav className="bg-white rounded-[18px] flex items-center justify-between p-2.5 px-3.5 shadow-[0_14px_40px_rgba(30,45,90,.10)] relative z-30">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-[18px] text-[var(--color-navy)] no-underline">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e] flex items-center justify-center text-white text-[17px]">🍽️</span>
            DietaryID
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            <Link href="/" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]">Home</Link>
            <Link href="/pricing" className="no-underline text-[var(--color-navy)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] bg-[var(--color-nav-hover)]">Pricing</Link>
            <Link href="/resources" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]">Resources</Link>
            <Link href="/blog" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]">Blog</Link>
            <Link href="/signup" className="no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-5.5 py-2.5 rounded-[11px] hover:bg-[var(--color-navy-dark)] ml-2">Get started</Link>
          </div>
        </nav>

        <div className="text-center py-[80px] pb-[50px]">
          <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">Pricing</span>
          <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold text-[var(--color-navy)] mt-4 mb-5 tracking-[-1px] leading-[1.12]">
            Simple, transparent pricing<br />for everyone
          </h1>
          <p className="max-w-[540px] mx-auto text-[16px] leading-[1.6] text-[var(--color-muted)]">
            Free forever for core features. Earn money as a creator. Premium tools coming soon for restaurants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-[60px] max-w-[1050px] mx-auto">
          {plans.map((p) => (
            <div key={p.tier} className={`relative rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)] flex flex-col ${p.popular ? "bg-[var(--color-navy)] text-white ring-4 ring-[var(--color-navy)]/10 scale-[1.03]" : "bg-white text-[var(--color-navy)]"}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-peach)] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most popular</div>}
              <h3 className={`text-[20px] font-bold mb-1 ${p.popular ? "text-white" : "text-[var(--color-navy)]"}`}>{p.tier}</h3>
              <div className={`mb-1 ${p.popular ? "text-white/80" : "text-[var(--color-muted)]"}`}>
                <span className="text-[36px] font-extrabold">{p.price === "0" ? "Free" : `$${p.price}`}</span>
                <span className="text-[14px]"> /{p.period}</span>
              </div>
              <p className={`text-[13.5px] mb-6 ${p.popular ? "text-white/70" : "text-[var(--color-muted)]"}`}>{p.desc}</p>
              <Link href={p.href} className={`text-center font-semibold text-[14.5px] py-3 px-5 rounded-[11px] no-underline mb-6 transition-all hover:-translate-y-[1px] ${p.popular ? "bg-white text-[var(--color-navy)] hover:shadow-lg" : "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)]"}`}>{p.cta}</Link>
              <ul className="space-y-3 flex-1">
                {p.features.map((f) => <li key={f} className={`flex items-start gap-2 text-[13px] ${p.popular ? "text-white/80" : "text-[var(--color-navy-soft)]"}`}><span className={`mt-0.5 ${p.popular ? "text-[var(--color-peach)]" : "text-[var(--color-teal-dark)]"}`}>✓</span>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="pb-[80px] max-w-[760px] mx-auto">
          <div className="text-center mb-[50px]">
            <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">FAQ</span>
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-[var(--color-navy)] mt-4 tracking-[-1px]">Frequently asked questions</h2>
          </div>
          <div className="divide-y divide-[var(--color-faq-border)]">
            {faqs.map((f, i) => (
              <details key={i} className="group" open={i === 0}>
                <summary className="text-[16px] font-semibold text-[var(--color-navy)] py-5 cursor-pointer list-none flex items-center justify-between gap-4">{f.q}<span className="text-[var(--color-muted)] group-open:rotate-180 transition-transform">▾</span></summary>
                <p className="text-[14px] text-[var(--color-muted)] pb-5 leading-[1.65]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[var(--color-navy)] text-[var(--color-foot-text)] mt-[80px] py-[54px] pb-7 px-[clamp(16px,5vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-9 max-w-[1100px] mx-auto mb-[44px]">
          <div><span className="flex items-center gap-2.5 font-bold text-[18px] text-white">🍽️ DietaryID</span><p className="text-[13px] leading-[1.6] mt-3.5 max-w-[280px] text-[var(--color-foot-muted)]">Helping people with allergies and dietary restrictions eat normally and find safely — everywhere.</p></div>
          <div><h5 className="text-white text-[14px] mb-4">Product</h5><ul className="list-none space-y-2.5"><li><Link href="/user/find" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Find Safely</Link></li><li><Link href="/user/community" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Community</Link></li><li><Link href="/user/creator" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Creator Program</Link></li><li><Link href="/pricing" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Pricing</Link></li></ul></div>
          <div><h5 className="text-white text-[14px] mb-4">Company</h5><ul className="list-none space-y-2.5"><li><a href="#" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">About us</a></li><li><Link href="/blog" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Blog</Link></li><li><a href="#" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Careers</a></li><li><a href="#" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Contact</a></li></ul></div>
          <div><h5 className="text-white text-[14px] mb-4">Legal</h5><ul className="list-none space-y-2.5"><li><a href="#" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Privacy Policy</a></li><li><a href="#" className="text-[var(--color-foot-link)] no-underline text-[13.5px] hover:text-white">Terms of Service</a></li></ul></div>
        </div>
        <div className="border-t border-white/12 pt-5.5 flex justify-between items-center gap-3.5 flex-wrap max-w-[1100px] mx-auto text-[12.5px] text-[var(--color-foot-bottom)]"><span>© 2025 DietaryID. All rights reserved.</span></div>
      </footer>
    </>
  );
}
