import Link from "next/link";

const guides = [
  { title: "The Complete Guide to Eating Out with Celiac Disease", cat: "Guide", read: "12 min", desc: "From verifying menus to talking confidently with staff — everything you need to eat out safely with celiac disease.", icon: "🌾" },
  { title: "How to Build Your First City Guide & Earn Money", cat: "Creator", read: "8 min", desc: "Step-by-step walkthrough on creating a comprehensive safe-eating guide for your city and monetizing it.", icon: "💰" },
  { title: "Understanding the 3-Layer Verification System", cat: "Product", read: "5 min", desc: "How DietaryID combines menu verification, database cross-checks, and community reviews into a single trust score.", icon: "🛡️" },
  { title: "A Parent's Guide to Allergy-Friendly Restaurants", cat: "Guide", read: "10 min", desc: "Tips for families managing nut allergies, dairy allergies, and multiple restrictions when dining out.", icon: "👨‍👩‍👧" },
  { title: "Hidden Allergens: What Restaurant Menus Don't Tell You", cat: "Education", read: "7 min", desc: "Common hidden sources of gluten, dairy, soy, and nuts in restaurant dishes — and how to ask about them.", icon: "🔍" },
  { title: "Creator Spotlight: How Sarah Earns £230/month Reviewing Restaurants", cat: "Creator", read: "6 min", desc: "Sarah Mitchell shares her journey from celiac diagnosis to becoming DietaryID's top creator in Manchester.", icon: "⭐" },
];

const tutorials = [
  { title: "How to set up your allergy profile", duration: "2:14", href: "/signup" },
  { title: "How to search for safe restaurants", duration: "3:08", href: "/user/find" },
  { title: "How to verify a restaurant dish", duration: "5:32", href: "/user/verify" },
  { title: "How to apply as a creator", duration: "4:21", href: "/user/become-creator" },
];

const partners = [
  { name: "Allergy UK", desc: "National charity supporting people with allergies", icon: "🏥" },
  { name: "Coeliac UK", desc: "The charity for people who need to live gluten-free", icon: "🌾" },
  { name: "FARE", desc: "Leading food allergy advocacy organization", icon: "🔬" },
  { name: "Anaphylaxis Campaign", desc: "Supporting people at risk of severe allergic reactions", icon: "⚕️" },
];

export default function ResourcesPage() {
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
            <Link href="/pricing" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]">Pricing</Link>
            <Link href="/resources" className="no-underline text-[var(--color-navy)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] bg-[var(--color-nav-hover)]">Resources</Link>
            <Link href="/blog" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]">Blog</Link>
            <Link href="/signup" className="no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-5.5 py-2.5 rounded-[11px] hover:bg-[var(--color-navy-dark)] ml-2">Get started</Link>
          </div>
        </nav>

        <div className="text-center py-[80px] pb-[50px]">
          <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">Resources</span>
          <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold text-[var(--color-navy)] mt-4 mb-5 tracking-[-1px] leading-[1.12]">Guides, tutorials & tools<br />for eating safely</h1>
          <p className="max-w-[540px] mx-auto text-[16px] leading-[1.6] text-[var(--color-muted)]">Everything you need to navigate dining with food allergies, intolerances, and dietary restrictions.</p>
        </div>

        <div className="mb-[60px]">
          <h2 className="text-[22px] font-bold text-[var(--color-navy)] mb-6">🎥 Video tutorials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tutorials.map((t) => (
              <Link key={t.title} href={t.href} className="bg-white rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] no-underline hover:-translate-y-1.5 transition-all">
                <div className="w-12 h-9 rounded bg-[var(--color-navy)] text-white flex items-center justify-center text-[14px] mb-3">▶</div>
                <div className="text-[15px] font-semibold text-[var(--color-navy)] mb-1">{t.title}</div>
                <span className="text-[12px] text-[var(--color-muted)]">{t.duration}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-[60px]">
          <h2 className="text-[22px] font-bold text-[var(--color-navy)] mb-6">📚 Written guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((g) => (
              <article key={g.title} className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] hover:-translate-y-1.5 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3"><span className="text-[24px]">{g.icon}</span><span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-nav-hover)] text-[var(--color-navy-soft)] font-semibold">{g.cat}</span><span className="text-[11px] text-[var(--color-muted)] ml-auto">{g.read}</span></div>
                <h3 className="text-[16px] font-bold text-[var(--color-navy)] mb-2 leading-[1.3]">{g.title}</h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6]">{g.desc}</p>
                <span className="text-[13px] text-[var(--color-navy)] font-semibold mt-3 inline-block hover:underline">Read guide →</span>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-[60px] bg-white rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="text-[22px] font-bold text-[var(--color-navy)] mb-2">🤝 Partners & organizations</h2>
          <p className="text-[14px] text-[var(--color-muted)] mb-6">We collaborate with leading allergy and dietary health organizations to ensure accuracy.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partners.map((p) => (
              <div key={p.name} className="bg-[var(--color-nav-hover)] rounded-[14px] p-4 text-center">
                <div className="text-[32px] mb-2">{p.icon}</div><div className="text-[14px] font-semibold text-[var(--color-navy)] mb-1">{p.name}</div><p className="text-[12px] text-[var(--color-muted)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-[60px] text-center">
          <div className="bg-gradient-to-b from-[#fdeae2] to-[#f9e3e6] rounded-[var(--radius-lg)] p-10">
            <h2 className="text-[clamp(26px,3.5vw,36px)] font-extrabold text-[var(--color-navy)] mb-4 tracking-[-1px]">Can&apos;t find what you need?</h2>
            <p className="text-[14px] text-[var(--color-muted)] mb-6 max-w-[480px] mx-auto">Join thousands of others in our community. Ask questions, share tips, and learn from people with your exact allergies.</p>
            <Link href="/user/community" className="inline-block no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-[11px] hover:bg-[var(--color-navy-dark)] hover:-translate-y-[1px]">Join the community →</Link>
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
