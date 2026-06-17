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
    label: "Assistant",
    href: "/admin/assistant",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2 5 5 .5-4 3.5 1.5 5L12 18l-4.5 3 1.5-5-4-3.5 5-.5z" />
      </svg>
    ),
    tag: "NEW",
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
    badge: 4,
  },
  {
    label: "My hub",
    href: "/admin/hub",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Meal Plans",
    href: "/admin/meal-plans",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badge: 1,
  },
];

const workNav: NavItem[] = [
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Verifications",
    href: "/admin/restaurants/verification",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    badge: 8,
  },
  {
    label: "Moderation",
    href: "/admin/moderation/reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2 5 5 .5-4 3.5 1.5 5L12 18l-4.5 3 1.5-5-4-3.5 5-.5z" />
      </svg>
    ),
    badge: 12,
  },
  {
    label: "Creators",
    href: "/admin/creators",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    badge: 4,
  },
  {
    label: "Disputes",
    href: "/admin/disputes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
      </svg>
    ),
    badge: 5,
  },
  {
    label: "Posts",
    href: "/admin/moderation/posts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badge: 6,
  },
  {
    label: "Chat",
    href: "/admin/moderation/chat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    badge: 3,
  },
  {
    label: "Activity",
    href: "/admin/activity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Audit Log",
    href: "/admin/audit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    label: "Templates",
    href: "/admin/templates",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18" />
        <path d="M3 6v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6" />
        <line x1="9 12" x2="15" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    badge: 13,
  },
  {
    label: "Payouts",
    href: "/admin/payouts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Revenue",
    href: "/admin/revenue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </svg>
    ),
  },
  {
    label: "Cash flow",
    href: "/admin/cashflow",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Earnings Disputes",
    href: "/admin/earnings-disputes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    badge: 2,
  },
  {
    label: "Tax compliance",
    href: "/admin/tax-compliance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Training",
    href: "/admin/training",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Help",
    href: "/admin/help",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    badge: 2,
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
  { label: "Review verifications", href: "/admin/restaurants/verification", icon: <path d="M9 12l2 2 4-4" /> },
  { label: "Moderate reviews", href: "/admin/moderation/reviews", icon: <path d="M12 2l2 5 5 .5-4 3.5 1.5 5L12 18l-4.5 3 1.5-5-4-3.5 5-.5z" /> },
  { label: "Process creator payout", href: "/admin/payouts", icon: <circle cx="12" cy="12" r="10" /> },
  { label: "View earnings disputes", href: "/admin/earnings-disputes", icon: <path d="M3 6h18M3 12h18M3 18h18" /> },
  { label: "View revenue", href: "/admin/revenue", icon: <path d="M3 3v18h18M7 16l4-6 4 3 5-7" /> },
  { label: "Tax compliance", href: "/admin/tax-compliance", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /> },
  { label: "Open payments", href: "/admin/payments", icon: <rect x="2" y="5" width="20" height="14" rx="2" /> },
  { label: "Get help", href: "/admin/help", icon: <circle cx="12" cy="12" r="10" /> },
];

export function Sidebar({ open = false, onClose }: Props) {
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
        <Link href="/admin/analytics" className="flex items-center gap-3 no-underline">
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

      <div className="text-[11px] tracking-[0.06em] uppercase text-admin-muted px-[11px] pt-4 pb-1.5 font-semibold">Work</div>
      {workNav.map((item) => (
        <NavRow key={item.label} item={item} pathname={pathname} onClose={onClose} />
      ))}

      <div className="relative mt-auto" ref={userRef}>
        <button
          onClick={() => setUserMenuOpen((o) => !o)}
          className="w-full flex items-center gap-[11px] py-3 px-1.5 pb-1 border-t border-admin-border text-left hover:bg-admin-hover rounded-b transition-colors"
        >
          <img
            src="https://i.pravatar.cc/80?img=47"
            alt=""
            className="w-[34px] h-[34px] rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[14.5px] font-medium text-admin-text truncate">Emily Davis</div>
            <div className="text-[11px] text-admin-muted truncate">Admin · emily@dietaryid.com</div>
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
                <div className="text-[14px] font-medium text-admin-text">Emily Davis</div>
                <div className="text-[12px] text-admin-muted">emily@dietaryid.com</div>
              </div>
              {[
                { label: "View activity", href: "/admin/activity" },
                { label: "View audit log", href: "/admin/audit" },
                { label: "Open templates", href: "/admin/templates" },
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
                  window.location.href = "/auth/admin";
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
  const isActive = pathname === item.href || (item.href !== "/admin/analytics" && pathname.startsWith(item.href));
  return (
    <Link
      href={item.href}
      onClick={onClose}
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
      {item.tag && (
        <span className="ml-auto bg-admin-tag-bg text-admin-tag-text text-[10px] font-semibold py-0.5 px-1.5 rounded-md">
          {item.tag}
        </span>
      )}
    </Link>
  );
}
