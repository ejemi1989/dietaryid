"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/restaurant/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/restaurant/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Menu",
    href: "/restaurant/menu",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    href: "/restaurant/reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2 5 5 .5-4 3.5 1.5 5L12 18l-4.5 3 1.5-5-4-3.5 5-.5z" />
      </svg>
    ),
    badge: 1,
  },
  {
    label: "Analytics",
    href: "/restaurant/analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </svg>
    ),
  },
  {
    label: "Bookings",
    href: "/restaurant/bookings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    badge: 3,
  },
  {
    label: "Marketing",
    href: "/restaurant/marketing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/restaurant/settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    label: "Help",
    href: "/restaurant/help",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    label: "Training",
    href: "/restaurant/training",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

type QuickAction = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const quickActions: QuickAction[] = [
  { label: "Add menu item", href: "/restaurant/menu", icon: <path d="M12 5v14M5 12h14" /> },
  { label: "Verify a dish", href: "/restaurant/menu", icon: <path d="M9 12l2 2 4-4" /> },
  { label: "Respond to reviews", href: "/restaurant/reviews", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { label: "View bookings", href: "/restaurant/bookings", icon: <rect x="3" y="4" width="18" height="18" rx="2" /> },
  { label: "Copy badge code", href: "/restaurant/marketing", icon: <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /> },
  { label: "Generate report", href: "/restaurant/reports", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /> },
  { label: "Open settings", href: "/restaurant/settings", icon: <circle cx="12" cy="12" r="3" /> },
  { label: "Get help", href: "/restaurant/help", icon: <circle cx="12" cy="12" r="10" /> },
];

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const quickRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setQuickOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setQuickOpen(false);
        setUserMenuOpen(false);
        setSidebarOpen(false);
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setQuickOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [searchOpen]);

  return (
    <div className="flex h-screen w-screen overflow-x-hidden bg-admin-bg text-admin-text">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 left-3 z-[60] bg-admin-bg border border-admin-border rounded-[9px] w-[42px] h-[42px] flex items-center justify-center cursor-pointer"
        aria-label="Menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-admin-icon-stroke">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <aside
        className={`w-[280px] flex-shrink-0 bg-admin-sidebar border-r border-admin-border flex flex-col py-4 px-[14px] overflow-y-auto fixed md:static z-[100] h-full transition-[left] duration-250 ${
          sidebarOpen ? "left-0" : "-left-[300px]"
        } md:left-0`}
      >
        <div className="flex items-center gap-3 pt-1.5 px-1 pb-[18px]">
          <Link href="/restaurant/dashboard" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-[9px] bg-admin-dark text-white flex items-center justify-center font-bold text-[18px]">
              D
            </div>
            <div className="font-semibold text-[17px] flex items-center gap-1 text-admin-text">
              DietaryID
              <span className="text-[11px] text-admin-muted font-normal">Restaurant</span>
            </div>
          </Link>
        </div>

        <div className="relative" ref={quickRef}>
          <button
            onClick={() => setQuickOpen((o) => !o)}
            className={`w-full flex items-center justify-between bg-admin-bg border rounded-[10px] py-[11px] px-3 mb-[14px] cursor-pointer text-[14.5px] text-admin-nav-text transition-colors ${
              quickOpen ? "border-admin-dark" : "border-admin-border hover:border-admin-dark"
            }`}
          >
            <div className="flex items-center gap-2.5 text-admin-icon-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Quick Actions
            </div>
            <span className="border border-admin-border rounded-md w-[22px] h-[22px] flex items-center justify-center text-[12px] text-admin-muted">
              /
            </span>
          </button>

          {quickOpen && (
            <div className="absolute top-full left-0 right-0 mt-[-8px] pt-2 z-[110]">
              <div className="bg-admin-bg border border-admin-border rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="px-3 py-2 text-[10px] uppercase tracking-[0.05em] text-admin-muted border-b border-admin-border">
                  Quick actions · press <kbd className="font-mono text-admin-text">/</kbd> to toggle
                </div>
                {quickActions.map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    onClick={() => {
                      setQuickOpen(false);
                      setSidebarOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 text-[14px] text-admin-text hover:bg-admin-hover transition-colors no-underline"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-admin-nav-icon">
                      {a.icon}
                    </svg>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[11px] tracking-[0.06em] uppercase text-admin-muted px-[11px] pt-4 pb-1.5 font-semibold">Manage</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 py-[9px] px-[11px] rounded-[9px] cursor-pointer text-[14.5px] text-admin-nav-text relative mb-px transition-colors no-underline hover:bg-admin-hover ${
                isActive ? "bg-admin-bg font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)]" : ""
              }`}
            >
              <span className="w-[18px] h-[18px] flex-shrink-0 text-admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="ml-auto bg-admin-badge-bg rounded-[20px] py-px px-2 text-[12px] text-admin-avatar-text">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="relative mt-auto" ref={userRef}>
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className="w-full flex items-center gap-[11px] py-3 px-1.5 pb-1 border-t border-admin-border text-left hover:bg-admin-hover rounded-b transition-colors"
          >
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt=""
              className="w-[34px] h-[34px] rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[14.5px] font-medium text-admin-text truncate">The Italian Kitchen</div>
              <div className="text-[11px] text-admin-muted truncate">Verified · Celiac, GF</div>
            </div>
            <svg className="text-admin-muted flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="9" cy="6" r="2" />
              <circle cx="15" cy="12" r="2" />
              <circle cx="9" cy="18" r="2" />
            </svg>
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 z-[110]">
              <div className="bg-admin-bg border border-admin-border rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="px-3 py-2.5 border-b border-admin-border">
                  <div className="text-[14px] font-medium text-admin-text">The Italian Kitchen</div>
                  <div className="text-[12px] text-admin-muted">owner@italiankitchen.com</div>
                </div>
                {[
                  { label: "Account settings", href: "/restaurant/settings" },
                  { label: "View public profile", href: "/restaurant/profile" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setUserMenuOpen(false);
                      setSidebarOpen(false);
                    }}
                    className="block px-3 py-2.5 text-[14px] text-admin-text hover:bg-admin-hover transition-colors no-underline"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={async () => {
                    setUserMenuOpen(false);
                    await supabase.auth.signOut();
                    window.location.href = "/auth/restaurant";
                  }}
                  className="w-full text-left px-3 py-2.5 text-[14px] text-admin-non-text hover:bg-admin-non-bg border-t border-admin-border"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
