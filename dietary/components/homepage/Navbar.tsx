"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-30 bg-white rounded-[18px] flex items-center justify-between px-3.5 py-2.5 shadow-[var(--shadow-soft)]">
      <Link href="/" className="flex items-center gap-2.5 font-bold text-[18px] text-[var(--color-navy)] no-underline">
        <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#ff9a6c] to-[#ff6a8e] flex items-center justify-center text-white text-[17px]">
          🍽️
        </span>
        DietaryID
      </Link>

      <ul className="hidden md:flex items-center gap-1.5 list-none m-0 p-0">
        <li><a href="#features" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-navy)]">Product</a></li>
        <li><Link href="/pricing" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-navy)]">Pricing</Link></li>
        <li><Link href="/resources" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-navy)]">Resources</Link></li>
        <li><Link href="/blog" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-navy)]">Blog</Link></li>
        <li><Link href="/auth/restaurant" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-navy)]">For Restaurants</Link></li>
        <li><Link href="/login" className="no-underline text-[var(--color-navy-soft)] text-[14.5px] font-medium px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-[var(--color-nav-hover)] hover:text-[var(--color-navy)]">Sign in</Link></li>
      </ul>

      <div className="flex items-center gap-2.5">
        <Link href="/signup" className="hidden md:inline-block no-underline bg-[var(--color-navy)] text-white font-semibold text-[14.5px] px-5.5 py-2.5 rounded-[11px] transition-all duration-200 hover:bg-[var(--color-navy-dark)] hover:-translate-y-[1px]">
          Get started
        </Link>
        <button
          className="md:hidden bg-none border-none text-[24px] text-[var(--color-navy)] cursor-pointer p-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[16px] shadow-[var(--shadow-soft)] p-3 flex flex-col gap-1 z-50">
          <a href="#features" className="no-underline text-[var(--color-navy)] font-medium px-3.5 py-3 rounded-[10px] hover:bg-[var(--color-nav-hover)]" onClick={() => setMenuOpen(false)}>Product</a>
          <Link href="/pricing" className="no-underline text-[var(--color-navy)] font-medium px-3.5 py-3 rounded-[10px] hover:bg-[var(--color-nav-hover)]" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/resources" className="no-underline text-[var(--color-navy)] font-medium px-3.5 py-3 rounded-[10px] hover:bg-[var(--color-nav-hover)]" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link href="/blog" className="no-underline text-[var(--color-navy)] font-medium px-3.5 py-3 rounded-[10px] hover:bg-[var(--color-nav-hover)]" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/login" className="no-underline text-[var(--color-navy)] font-medium px-3.5 py-3 rounded-[10px] hover:bg-[var(--color-nav-hover)]" onClick={() => setMenuOpen(false)}>Sign in</Link>
          <Link href="/signup" className="no-underline text-white font-semibold text-center bg-[var(--color-navy)] px-3.5 py-3 rounded-[10px] hover:bg-[var(--color-navy-dark)]" onClick={() => setMenuOpen(false)}>Get started — free</Link>
          <Link href="/auth/restaurant" className="no-underline text-[var(--color-navy-soft)] font-medium text-center text-[12.5px] px-3.5 py-2 rounded-[10px] hover:bg-[var(--color-nav-hover)]" onClick={() => setMenuOpen(false)}>For Restaurants →</Link>
        </div>
      )}
    </nav>
  );
}
