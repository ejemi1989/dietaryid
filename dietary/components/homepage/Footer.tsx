import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Find Safely", href: "/user/find" },
    { label: "Community", href: "/user/community" },
    { label: "Creator Program", href: "/user/creator" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About us", href: "#" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-[var(--color-foot-text)] mt-[80px] py-[54px] pb-7 px-[clamp(16px,5vw,64px)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-9 max-w-[1100px] mx-auto mb-11">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-bold text-[18px] text-white no-underline">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e] flex items-center justify-center text-white text-[17px]">🍽️</span>
            DietaryID
          </Link>
          <p className="text-[13px] leading-[1.6] mt-3.5 max-w-[280px] text-[var(--color-foot-muted)]">
            Helping people with allergies and dietary restrictions eat normally and find safely — everywhere.
          </p>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h5 className="text-white text-[14px] mb-4">{heading}</h5>
            <ul className="list-none m-0 p-0">
              {links.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <Link href={link.href} className="text-[var(--color-foot-link)] no-underline text-[13.5px] transition-all duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/12 pt-5.5 flex justify-between items-center gap-3.5 flex-wrap max-w-[1100px] mx-auto text-[12.5px] text-[var(--color-foot-bottom)]">
        <span>&copy; 2025 DietaryID. All rights reserved.</span>
      </div>
    </footer>
  );
}
