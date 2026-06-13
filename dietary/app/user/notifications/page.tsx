"use client";

import { useState } from "react";
import Link from "next/link";

type Notification = {
  id: string;
  type: "review" | "follow" | "community" | "verify" | "booking" | "creator" | "system";
  actor: string;
  avatar?: string;
  text: string;
  context?: string;
  time: string;
  read: boolean;
  link: string;
  emoji: string;
};

const initialNotifications: Notification[] = [
  { id: "n1", type: "community", actor: "Mike H.", avatar: "https://i.pravatar.cc/80?u=mike", text: "replied to your post: &ldquo;The Healthy Crust pizza place&rdquo;", context: "&ldquo;YES! I was just there last week. Worth the trip!&rdquo;", time: "5 min ago", read: false, link: "/user/community", emoji: "💬" },
  { id: "n2", type: "follow", actor: "Emma T.", avatar: "https://i.pravatar.cc/80?u=emma", text: "started following you", time: "1 hour ago", read: false, link: "/user/profile", emoji: "👥" },
  { id: "n3", type: "verify", actor: "Community", avatar: "https://i.pravatar.cc/80?img=1", text: "3 new people confirmed The Italian Kitchen is safe for Celiac", time: "3 hours ago", read: false, link: "/user/verify", emoji: "✓" },
  { id: "n4", type: "review", actor: "Sarah M.", avatar: "https://i.pravatar.cc/80?u=sarah", text: "marked your review as helpful", context: "Quinoa Power Bowl — &ldquo;Excellent GF prep area&rdquo;", time: "Yesterday", read: true, link: "/user/reviews", emoji: "👍" },
  { id: "n5", type: "booking", actor: "The Italian Kitchen", avatar: "https://i.pravatar.cc/80?img=12", text: "confirmed your booking for Saturday, Jan 20 at 7:00 PM", time: "Yesterday", read: true, link: "/user/saved", emoji: "📅" },
  { id: "n6", type: "creator", actor: "DietaryID", avatar: "https://i.pravatar.cc/80?img=2", text: "You earned $1.35 from your review of The Healthy Bowl Co", time: "2 days ago", read: true, link: "/user/creator", emoji: "💰" },
  { id: "n7", type: "community", actor: "Jordan L.", avatar: "https://i.pravatar.cc/80?u=jordan", text: "asked a question: &ldquo;Has anyone tried the new bakery in Camden?&rdquo;", time: "3 days ago", read: true, link: "/user/community", emoji: "❓" },
  { id: "n8", type: "system", actor: "DietaryID", text: "Your weekly digest is ready — 8 new safe restaurants near you", time: "1 week ago", read: true, link: "/user/find", emoji: "📊" },
  { id: "n9", type: "review", actor: "David L.", avatar: "https://i.pravatar.cc/80?u=david", text: "left a review mentioning your recommendation: &ldquo;Thanks @SarahM for the tip on Fresh Bowl!&rdquo;", time: "1 week ago", read: true, link: "/user/community", emoji: "⭐" },
  { id: "n10", type: "creator", actor: "DietaryID", text: "You unlocked the Helpful Contributor badge 🌟 — 10+ comments marked helpful", time: "2 weeks ago", read: true, link: "/user/profile", emoji: "🏆" },
];

const filterTabs = [
  { v: "all", l: "All", emoji: "🔔" },
  { v: "community", l: "Community", emoji: "💬" },
  { v: "reviews", l: "Reviews", emoji: "⭐" },
  { v: "creator", l: "Earnings", emoji: "💰" },
  { v: "system", l: "System", emoji: "📊" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "community" | "reviews" | "creator" | "system">("all");
  const [showPrefs, setShowPrefs] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "reviews") return n.type === "review" || n.type === "verify";
    if (filter === "community") return n.type === "community" || n.type === "follow";
    return n.type === filter;
  });

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Clear all notifications?")) setNotifications([]);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Notifications 🔔</h1>
            <p className="text-[13.5px] text-admin-muted">{unread > 0 ? `${unread} unread` : "All caught up"} · {notifications.length} total</p>
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={handleMarkAllRead} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">
                ✓ Mark all read
              </button>
            )}
            <button onClick={() => setShowPrefs(true)} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">
              ⚙ Preferences
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border flex-wrap">
        {filterTabs.map((f) => (
          <button
            key={f.v}
            onClick={() => setFilter(f.v as typeof filter)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
              filter === f.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {f.emoji} {f.l}
            {f.v === "all" && unread > 0 && (
              <span className="ml-1.5 text-[10.5px] px-1.5 rounded-full bg-admin-non-text text-white">{unread}</span>
            )}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[760px]">
        {filtered.length === 0 ? (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-12 text-center">
            <div className="text-[48px] mb-2">🔕</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">No notifications</h3>
            <p className="text-[13px] text-admin-muted">You&apos;re all caught up. We&apos;ll let you know when something new happens.</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {filtered.map((n) => (
              <Link
                key={n.id}
                href={n.link}
                onClick={() => handleMarkRead(n.id)}
                className={`flex items-start gap-3 p-3 rounded-[10px] border transition-colors no-underline group ${
                  n.read ? "bg-admin-bg border-admin-border hover:bg-admin-hover" : "bg-admin-new-bg/30 border-admin-new-text/30 hover:bg-admin-new-bg/50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  {n.actor === "DietaryID" || !n.avatar ? (
                    <div className="w-10 h-10 rounded-full bg-admin-dark text-white flex items-center justify-center text-[16px] font-bold">D</div>
                  ) : (
                    <img src={n.avatar} alt={n.actor} className="w-10 h-10 rounded-full" />
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-admin-bg border border-admin-border flex items-center justify-center text-[10px]">
                    {n.emoji}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] text-admin-text">
                    <strong className="font-semibold">{n.actor}</strong>{" "}
                    <span dangerouslySetInnerHTML={{ __html: n.text }} />
                  </p>
                  {n.context && (
                    <p className="text-[12.5px] text-admin-muted italic mt-1 pl-2 border-l-2 border-admin-border">
                      {n.context}
                    </p>
                  )}
                  <p className="text-[11.5px] text-admin-muted mt-1">{n.time}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {!n.read && <span className="w-2 h-2 rounded-full bg-admin-non-text" />}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDismiss(n.id); }}
                    className="text-admin-muted hover:text-admin-non-text text-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={handleClearAll}
              className="text-[12.5px] text-admin-non-text hover:underline"
            >
              Clear all notifications
            </button>
          </div>
        )}
      </div>

      {showPrefs && (
        <NotificationPreferences onClose={() => setShowPrefs(false)} />
      )}
    </div>
  );
}

function NotificationPreferences({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState({
    communityReplies: true,
    newFollowers: true,
    reviewHelpful: true,
    bookingUpdates: true,
    creatorEarnings: true,
    weeklyDigest: false,
    marketingTips: false,
    safetyAlerts: true,
  });

  const [channels, setChannels] = useState({
    inApp: true,
    email: true,
    push: false,
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={onClose}>
      <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-semibold text-admin-text">Notification preferences</h3>
          <button onClick={onClose} className="text-admin-muted hover:text-admin-text text-[18px]">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-[12.5px] font-semibold text-admin-muted uppercase tracking-wider mb-2">What you get notified about</h4>
            <div className="space-y-1.5">
              {[
                { k: "communityReplies" as const, l: "Community replies to your posts" },
                { k: "newFollowers" as const, l: "New followers" },
                { k: "reviewHelpful" as const, l: "When someone marks your review helpful" },
                { k: "bookingUpdates" as const, l: "Booking confirmations & changes" },
                { k: "creatorEarnings" as const, l: "Creator earnings & payouts" },
                { k: "safetyAlerts" as const, l: "Safety score changes for saved restaurants" },
                { k: "weeklyDigest" as const, l: "Weekly digest of new safe restaurants" },
                { k: "marketingTips" as const, l: "Marketing tips & product updates" },
              ].map((p) => (
                <label key={p.k} className="flex items-center gap-3 p-2.5 rounded-md border border-admin-border cursor-pointer hover:bg-admin-hover">
                  <input
                    type="checkbox"
                    checked={prefs[p.k]}
                    onChange={() => setPrefs((pr) => ({ ...pr, [p.k]: !pr[p.k] }))}
                    className="w-4 h-4"
                  />
                  <span className="text-[13.5px] text-admin-text flex-1">{p.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12.5px] font-semibold text-admin-muted uppercase tracking-wider mb-2">How we notify you</h4>
            <div className="space-y-1.5">
              {[
                { k: "inApp" as const, l: "In-app", desc: "Bell icon in sidebar" },
                { k: "email" as const, l: "Email", desc: "Daily digest if more than 3 notifications" },
                { k: "push" as const, l: "Push", desc: "Browser push (requires permission)" },
              ].map((c) => (
                <label key={c.k} className="flex items-center gap-3 p-2.5 rounded-md border border-admin-border cursor-pointer hover:bg-admin-hover">
                  <input
                    type="checkbox"
                    checked={channels[c.k]}
                    onChange={() => setChannels((ch) => ({ ...ch, [c.k]: !ch[c.k] }))}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="text-[13.5px] text-admin-text">{c.l}</div>
                    <div className="text-[11.5px] text-admin-muted">{c.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-admin-border">
          <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
          <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Save preferences</button>
        </div>
      </div>
    </div>
  );
}
