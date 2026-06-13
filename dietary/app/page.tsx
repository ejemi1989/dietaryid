import { Navbar } from "@/components/homepage/Navbar";
import { Hero } from "@/components/homepage/Hero";
import { Partners } from "@/components/homepage/Partners";
import { Features } from "@/components/homepage/Features";
import { Testimonials } from "@/components/homepage/Testimonials";
import { FAQ } from "@/components/homepage/FAQ";
import { CTA } from "@/components/homepage/CTA";
import { Footer } from "@/components/homepage/Footer";
import { getLatestPosts } from "@/lib/blog";
import Link from "next/link";

export default function HomePage() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <div className="p-6 px-[clamp(16px,5vw,64px)]">
        <Navbar />
        <Hero />
        <Partners />
        <Features />
        <Testimonials />

        <section className="py-[70px]">
          <div className="text-center mb-[46px]">
            <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)]">Blog</span>
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-[var(--color-navy)] mt-4 mb-3 tracking-[-1px]">Latest from the blog</h2>
            <p className="text-[14px] text-[var(--color-muted)]">Tips, stories, and updates from the DietaryID team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1050px] mx-auto">
            {latestPosts.map((p) => (
              <Link key={p.id} href="/blog" className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] no-underline hover:-translate-y-1.5 transition-all block">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[24px]">{p.img}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-nav-hover)] text-[var(--color-navy-soft)] font-semibold">{p.cat}</span>
                  <span className="text-[11px] text-[var(--color-muted)] ml-auto">{p.date}</span>
                </div>
                <h3 className="text-[16px] font-bold text-[var(--color-navy)] mb-2 leading-[1.3]">{p.title}</h3>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.6] line-clamp-2">{p.excerpt}</p>
                <span className="text-[13px] text-[var(--color-navy)] font-semibold mt-3 inline-block">Read more →</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-block no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-6 py-2.5 rounded-[11px] hover:bg-[var(--color-navy-dark)] hover:-translate-y-[1px]">View all posts →</Link>
          </div>
        </section>

        <FAQ />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
