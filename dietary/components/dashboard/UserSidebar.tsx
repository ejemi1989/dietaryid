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
  tag?: string;
};

const mainNav: NavItem[] = [
  {
    label: "Find Safely",
    href: "/user/find",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    tag: "NEW",
  },
  {
    label: "Notifications",
    href: "/user/notifications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
    badge: 3,
  },
  {
    label: "Saved",
    href: "/user/saved",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badge: 12,
  },
  {
    label: "Messages",
    href: "/user/messages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badge: 2,
  },
];

const myNav: NavItem[] = [
  {
    label: "My Reviews",
    href: "/user/reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Verification",
    href: "/user/verify",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    label: "Community",
    href: "/user/community",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    badge: 5,
  },
  {
    label: "Creator Hub",
    href: "/user/creator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    tag: "EARN",
  },
];

type Props = {
  open?: boolean;
  onClose?: () => void;
};

type QuickAction = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const quickActions: QuickAction[] = [
  { label: "Search restaurants", href: "/user/find", icon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
  { label: "View community feed", href: "/user/community", icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /> },
  { label: "Write a review", href: "/user/reviews/new", icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /> },
  { label: "Check verification", href: "/user/verify", icon: <path d="M9 12l2 2 4-4" /> },
  { label: "Creator earnings", href: "/user/creator/earnings", icon: <circle cx="12" cy="12" r="10" /> },
  { label: "Payout history", href: "/user/creator/payouts", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { label: "Payment settings", href: "/user/creator/payment-settings", icon: <circle cx="12" cy="12" r="3" /> },
  { label: "Tax documents", href: "/user/creator/tax-documents", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /> },
  { label: "My saved", href: "/user/saved", icon: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /> },
  { label: "Messages", href: "/user/messages", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { label: "Update allergies", href: "/user/profile", icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /> },
];

export function UserSidebar({ open = false, onClose }: Props) {
  const supabase = createClient();
  const pathname = usePathname();
  const [quickOpen, setQuickOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const quickRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setQuickOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setQuickOpen(false);
        setUserMenuOpen(false);
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
  }, []);

  return (
    <aside
      className={`w-[280px] flex-shrink-0 bg-admin-sidebar border-r border-admin-border flex flex-col py-4 px-[14px] overflow-y-auto fixed md:static z-[100] h-full transition-[left] duration-250 ${
        open ? "left-0" : "-left-[300px]"
      } md:left-0`}
    >
      <div className="flex items-center gap-3 pt-1.5 px-1 pb-[18px]">
        <Link href="/user/dashboard" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-[9px] bg-admin-dark text-white flex items-center justify-center font-bold text-[18px]">
            D
          </div>
          <div className="font-semibold text-[17px] flex items-center gap-1 text-admin-text">
            DietaryID
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[13px] h-[13px] text-admin-muted">
              <polyline points="6 9 12 15 18 9" />
            </svg>
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
                    onClose?.();
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

      {mainNav.map((item) => (
        <NavRow key={item.label} item={item} pathname={pathname} onClose={onClose} />
      ))}

      <div className="text-[11px] tracking-[0.06em] uppercase text-admin-muted px-[11px] pt-4 pb-1.5 font-semibold">My Activity</div>
      {myNav.map((item) => (
        <NavRow key={item.label} item={item} pathname={pathname} onClose={onClose} />
      ))}

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
            <div className="text-[14.5px] font-medium text-admin-text truncate">Sarah Mitchell</div>
            <div className="text-[11px] text-admin-muted truncate">Has Celiac · sarah@dietaryid.com</div>
          </div>
          <svg className="text-admin-muted flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="9" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {userMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 z-[110]">
            <div className="bg-admin-bg border border-admin-border rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="px-3 py-2.5 border-b border-admin-border">
                <div className="text-[14px] font-medium text-admin-text">Sarah Mitchell</div>
                <div className="text-[12px] text-admin-muted">sarah@dietaryid.com</div>
              </div>
              {[
                { label: "My profile", href: "/user/profile" },
                { label: "My allergies", href: "/user/profile#allergies" },
                { label: "View creator profile", href: "/user/creator" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setUserMenuOpen(false);
                    onClose?.();
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
                  window.location.href = "/login";
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
  );
}

function NavRow({ item, pathname, onClose }: { item: NavItem; pathname: string; onClose?: () => void }) {
  const isActive = pathname === item.href || (item.href !== "/user/dashboard" && item.href !== "/user/find" && pathname.startsWith(item.href));
  const isExact = pathname === item.href;
  const active = item.href === "/user/dashboard" ? isExact : isActive;
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`flex items-center gap-3 py-[9px] px-[11px] rounded-[9px] cursor-pointer text-[14.5px] text-admin-nav-text relative mb-px transition-colors no-underline hover:bg-admin-hover ${
        active ? "bg-admin-bg font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)]" : ""
      }`}
    >
      <span className="w-[18px] h-[18px] flex-shrink-0 text-admin-nav-icon">{item.icon}</span>
      <span>{item.label}</span>
      {item.badge !== undefined && (
        <span className="ml-auto bg-admin-badge-bg rounded-[20px] py-px px-2 text-[12px] text-admin-avatar-text">
          {item.badge}
        </span>
      )}
      {item.tag && (
        <span className="ml-auto bg-admin-tag-bg text-admin-tag-text text-[10px] font-semibold py-0.5 px-1.5 rounded-md">
          {item.tag}
        </span>
      )}
    </Link>
  );
}
