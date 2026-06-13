import Link from "next/link";
import { getPublishedPosts, getLatestPosts } from "@/lib/blog";

const categories = ["All", "Product", "Creators", "Education", "Stories", "Guides"];

export default function BlogPage() {
  const posts = getPublishedPosts();
  const popularPosts = getLatestPosts(3);

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
            <Link href="/resources" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]">Resources</Link>
            <Link href="/blog" className="no-underline text-[var(--color-navy)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] bg-[var(--color-nav-hover)]">Blog</Link>
            <Link href="/signup" className="no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-5.5 py-2.5 rounded-[11px] hover:bg-[var(--color-navy-dark)] ml-2">Get started</Link>
          </div>
        </nav>

        <div className="text-center py-[60px] pb-[40px]">
          <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">Blog</span>
          <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold text-[var(--color-navy)] mt-4 mb-5 tracking-[-1px] leading-[1.12]">Stories, tips & updates<br />from the DietaryID team</h1>
          <p className="max-w-[540px] mx-auto text-[16px] leading-[1.6] text-[var(--color-muted)]">Insights on eating safely, creator stories, product updates, and allergen education.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-[50px]">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1.5 mb-6 flex-wrap">
              {categories.map((c) => (
                <button key={c} className={`text-[13px] px-3.5 py-1.5 rounded-full border transition-colors ${c === "All" ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]" : "border-[var(--color-btn-border)] text-[var(--color-navy-soft)] hover:bg-[var(--color-nav-hover)]"}`}>{c}</button>
              ))}
            </div>
            <div className="space-y-5">
              {posts.map((p) => (
                <article key={p.id} className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all cursor-pointer flex gap-5">
                  <div className="hidden sm:flex w-[80px] h-[80px] rounded-[16px] bg-gradient-to-br from-[var(--color-nav-hover)] to-[var(--color-indigo-light)]/20 items-center justify-center text-[36px] flex-shrink-0">{p.img}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap"><span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-nav-hover)] text-[var(--color-navy-soft)] font-semibold">{p.cat}</span><span className="text-[12px] text-[var(--color-muted)]">{p.date}</span></div>
                    <h3 className="text-[18px] font-bold text-[var(--color-navy)] mb-2 leading-[1.3] hover:underline">{p.title}</h3>
                    <p className="text-[14px] text-[var(--color-muted)] leading-[1.65] mb-3">{p.excerpt}</p>
                    <div className="flex items-center gap-2 text-[12px] text-[var(--color-muted)]"><span className="font-semibold text-[var(--color-navy-soft)]">{p.author}</span><span>·</span><span>{p.role}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] mb-4">
              <h3 className="text-[16px] font-bold text-[var(--color-navy)] mb-4">✉ Newsletter</h3>
              <p className="text-[13px] text-[var(--color-muted)] mb-3">Get the latest safe-eating tips, creator stories, and product updates.</p>
              <input type="email" placeholder="your@email.com" className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] mb-2" />
              <button className="w-full bg-[var(--color-navy)] text-white font-semibold text-[14px] py-2.5 rounded-[11px] hover:bg-[var(--color-navy-dark)]">Subscribe</button>
            </div>
            <div className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] mb-4">
              <h3 className="text-[16px] font-bold text-[var(--color-navy)] mb-4">🔥 Popular posts</h3>
              <div className="space-y-3">
                {popularPosts.map((p, i) => (
                  <div key={p.id} className="flex items-start gap-3 cursor-pointer hover:bg-[var(--color-nav-hover)] p-2 -mx-2 rounded-lg">
                    <div className="text-[20px] font-extrabold text-[var(--color-muted)]">0{i + 1}</div>
                    <div><div className="text-[13.5px] font-semibold text-[var(--color-navy)] leading-[1.3]">{p.title}</div><div className="text-[11.5px] text-[var(--color-muted)] mt-0.5">{p.date}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-[16px] font-bold text-[var(--color-navy)] mb-3">🏷 Categories</h3>
              <div className="space-y-1.5">
                {categories.slice(1).map((c) => (
                  <button key={c} className="w-full text-left text-[13.5px] text-[var(--color-navy-soft)] hover:text-[var(--color-navy)] hover:bg-[var(--color-nav-hover)] px-2 py-1.5 rounded-lg flex items-center justify-between">{c}<span className="text-[11px] text-[var(--color-muted)]">{posts.filter((p) => p.cat === c).length}</span></button>
                ))}
              </div>
            </div>
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
