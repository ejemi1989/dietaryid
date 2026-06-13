"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notifyUser, consumeApproval } from "@/lib/notifications";
import { useMyBookings } from "@/lib/bookings";
import { BookTableModal } from "@/components/ui/BookTableModal";

type SavedPlace = {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  safetyScore: number;
  safeDishes: number;
  lastVisited: string;
  emoji: string;
};

type Activity = {
  id: string;
  type: "review" | "verify" | "save" | "follow" | "earn";
  text: string;
  time: string;
  icon: string;
};

type Match = {
  id: string;
  restaurant: string;
  emoji: string;
  cuisine: string;
  distance: string;
  safetyScore: number;
  safeForMe: string[];
  communityCount: number;
  topDish: string;
  price: string;
};

const initialSaved: SavedPlace[] = [
  { id: "s1", name: "The Healthy Bowl Co", cuisine: "Mediterranean", distance: "2.3 km", safetyScore: 94, safeDishes: 8, lastVisited: "3 days ago", emoji: "🥗" },
  { id: "s2", name: "Green Garden Cafe", cuisine: "Vegan", distance: "1.1 km", safetyScore: 91, safeDishes: 12, lastVisited: "1 week ago", emoji: "🥬" },
  { id: "s3", name: "Sakura Sushi", cuisine: "Japanese", distance: "4.7 km", safetyScore: 78, safeDishes: 4, lastVisited: "2 weeks ago", emoji: "🍣" },
  { id: "s4", name: "Bella Italia", cuisine: "Italian", distance: "3.2 km", safetyScore: 87, safeDishes: 6, lastVisited: "1 month ago", emoji: "🍝" },
];

const initialActivity: Activity[] = [
  { id: "a1", type: "review", text: "You reviewed The Healthy Bowl Co — 5 stars", time: "2 hours ago", icon: "⭐" },
  { id: "a2", type: "verify", text: "Community verified Quinoa Power Bowl as safe", time: "5 hours ago", icon: "✓" },
  { id: "a3", type: "save", text: "You saved Green Garden Cafe to favorites", time: "1 day ago", icon: "🔖" },
  { id: "a4", type: "follow", text: "Mike H. (Has Celiac) followed you back", time: "2 days ago", icon: "👥" },
  { id: "a5", type: "earn", text: "You earned $1.35 from restaurant review", time: "3 days ago", icon: "💰" },
  { id: "a6", type: "review", text: "Your review of Bella Italia was marked helpful by 12 people", time: "4 days ago", icon: "👍" },
];

const recommendedMatches: Match[] = [
  { id: "m1", restaurant: "The Italian Kitchen", emoji: "🍝", cuisine: "Italian", distance: "2.1 km", safetyScore: 96, safeForMe: ["Celiac", "Gluten-Free"], communityCount: 47, topDish: "Gluten-Free Pasta Primavera", price: "$$" },
  { id: "m2", restaurant: "Fresh Bowl", emoji: "🥗", cuisine: "Mediterranean", distance: "1.4 km", safetyScore: 93, safeForMe: ["Celiac", "Dairy-Free"], communityCount: 28, topDish: "Quinoa Power Bowl", price: "$" },
  { id: "m3", restaurant: "Sakura Sushi", emoji: "🍣", cuisine: "Japanese", distance: "4.7 km", safetyScore: 78, safeForMe: ["Gluten-Free", "Dairy-Free"], communityCount: 12, topDish: "Sashimi Platter (no soy)", price: "$$$" },
  { id: "m4", restaurant: "The Vegan Table", emoji: "🥬", cuisine: "Vegan", distance: "0.8 km", safetyScore: 91, safeForMe: ["Celiac", "Dairy-Free", "Nut-Free"], communityCount: 33, topDish: "Buddha Bowl", price: "$$" },
];

export default function UserDashboardPage() {
  const [saved, setSaved] = useState(initialSaved);
  const [activity, setActivity] = useState(initialActivity);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [creatorApplication, setCreatorApplication] = useState<"not_applied" | "submitted" | "reviewing" | "approved">("approved");
  const [dismissedMatches, setDismissedMatches] = useState<Set<string>>(new Set());
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [showActionCard, setShowActionCard] = useState({ verify: true, respond: true, badge: true });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showBadge, setShowBadge] = useState(false);
  const [badgeCopied, setBadgeCopied] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookResto, setBookResto] = useState({ id: "rest_the_italian_kitchen", name: "The Italian Kitchen", emoji: "🍝" });

  const myBookings = useMyBookings();

  const safeMatch = 92;
  const perfectForYou = 24;
  const peopleLikeYou = 1247;
  const reviewsWritten = 18;

  const periodDays = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const chartData = Array.from({ length: periodDays }).map((_, i) => {
    return parseFloat((20 + Math.sin(i * 0.4) * 12 + ((i * 11) % 25)).toFixed(4));
  });

  const handleCopyBadge = async () => {
    const code = `<a href="https://dietaryid.com/r/the-italian-kitchen" target="_blank"><img src="https://dietaryid.com/badge.svg" alt="DietaryID Verified" width="180"/></a>`;
    try {
      await navigator.clipboard.writeText(code);
      setBadgeCopied(true);
      setTimeout(() => setBadgeCopied(false), 2000);
    } catch {
      setBadgeCopied(false);
    }
  };

  useEffect(() => {
    if (consumeApproval()) {
      setCreatorApplication("approved");
    }
  }, []);

  const handleRemoveSaved = (id: string) => {
    setSaved((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDismissMatch = (id: string) => {
    setDismissedMatches((prev) => new Set(prev).add(id));
  };

  const handleDismissActivity = (id: string) => {
    setActivity((prev) => prev.filter((a) => a.id !== id));
  };

  const visibleMatches = recommendedMatches.filter((m) => !dismissedMatches.has(m.id));

  return (
    <div className="flex-1 overflow-y-auto">
      {showOnboarding && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setShowOnboarding(false)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-admin-active-bg flex items-center justify-center text-[20px]">🛡️</div>
              <div>
                <h3 className="text-[16px] font-semibold text-admin-text">Welcome to DietaryID</h3>
                <p className="text-[12.5px] text-admin-muted">Eat out with confidence</p>
              </div>
            </div>
            <p className="text-[14px] text-admin-nav-text mb-4">
              We&apos;ve set your safety profile to <strong>Celiac, Gluten-Free, Dairy-Free</strong>. Every search will filter for what&apos;s safe for YOU.
            </p>
            <div className="space-y-2 my-4">
              {[
                { n: 1, t: "Search restaurants safely", d: "Filter by your exact allergies" },
                { n: 2, t: "See 3-layer verification", d: "Menu + Database + Community confirmed" },
                { n: 3, t: "Earn as a creator", d: "Turn reviews into real money" },
              ].map((s) => (
                <div key={s.n} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-admin-dark text-white flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-admin-text">{s.t}</div>
                    <div className="text-[12.5px] text-admin-muted">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Link
                href="/user/find"
                onClick={() => setShowOnboarding(false)}
                className="text-[14px] px-4 py-2 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover"
              >
                Skip
              </Link>
              <button
                onClick={() => setShowOnboarding(false)}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Start searching
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Welcome back, Sarah 👋</h1>
        <div className="flex items-center gap-4 text-[13px] text-admin-muted flex-wrap">
          <span>🛡️ Verified profile: Celiac, Gluten-Free, Dairy-Free</span>
          <span>·</span>
          <span>{peopleLikeYou.toLocaleString()} people like you in Manchester</span>
        </div>
      </div>

      <div className="px-[26px] py-6">
        {creatorApplication === "not_applied" ? (
          <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-4 mb-6 flex items-start gap-3">
            <div className="text-[24px]">💰</div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-admin-text mb-1">Earn money as a Creator</div>
              <p className="text-[13px] text-admin-nav-text mb-2">
                You&apos;ve already written {reviewsWritten} reviews. Turn your expertise into $$$. Earn $1.35 per review, $0.50 per dish verification, and $6.50+ per city guide.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/user/become-creator"
                  className="text-[13px] text-admin-active-text no-underline hover:underline font-medium"
                >
                  Become a Creator →
                </Link>
                <span className="text-admin-border">|</span>
                <button
                  onClick={() => setCreatorApplication("submitted")}
                  className="text-[13px] text-admin-nav-text no-underline hover:underline"
                >
                  Preview application tracker
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`rounded-[10px] p-5 mb-6 border ${
            creatorApplication === "approved" ? "bg-admin-active-bg border-admin-active-text/30" :
            creatorApplication === "reviewing" ? "bg-admin-new-bg border-admin-new-text/30" :
            "bg-admin-bg border-admin-border"
          }`}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-[16px] font-semibold text-admin-text">
                  {creatorApplication === "approved" ? "🎉 Creator application approved" :
                   creatorApplication === "reviewing" ? "🔍 Application under review" :
                   "📝 Creator application submitted"}
                </h2>
                <p className="text-[12.5px] text-admin-muted">
                  {creatorApplication === "approved"
                    ? "You're now a verified creator. Start earning today."
                    : "We'll notify you as your application progresses."}
                </p>
              </div>
              {creatorApplication === "approved" && (
                <Link
                  href="/user/creator/earnings"
                  className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white no-underline hover:opacity-90"
                >
                  Start earning →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { n: 1, t: "Apply", d: "Submit your application", detail: "Takes less than 2 minutes", done: true },
                { n: 2, t: "Quick review", d: "Our team reviews your application", detail: "Usually < 1 hour", done: creatorApplication !== "submitted" },
                { n: 3, t: "Get approved", d: "Receive email confirmation", detail: "Check your inbox", done: creatorApplication === "approved" },
                { n: 4, t: "Start earning", d: "Write your first review and get $1.35!", detail: "Earn per review & verification", done: creatorApplication === "approved" },
              ].map((s, i) => (
                <div key={s.n} className="relative">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mx-auto mb-2 text-[12px] font-semibold ${
                    s.done ? "bg-admin-active-text text-white" :
                    i === 1 && creatorApplication === "submitted" ? "bg-admin-dark text-white ring-2 ring-admin-new-text" :
                    "bg-admin-hover text-admin-muted"
                  }`}>
                    {s.done ? "✓" : s.n}
                  </div>
                  <div className="text-[13px] font-semibold text-admin-text text-center leading-tight">{s.t}</div>
                  <div className="text-[11px] text-admin-muted text-center mt-0.5">{s.d}</div>
                </div>
              ))}
            </div>

            {creatorApplication === "approved" && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { label: "Earnings this month", value: "£47.50", href: "/user/creator/earnings" },
                  { label: "Reviews written", value: "24", href: "/user/reviews" },
                  { label: "Payout method", value: "Bank ••4567", href: "/user/creator/payment-settings" },
                  { label: "Lifetime earned", value: "£347.20", href: "/user/creator/earnings" },
                ].map((c) => (
                  <Link key={c.label} href={c.href} className="bg-admin-bg border border-admin-border rounded-md p-2.5 no-underline hover:border-admin-dark transition-colors">
                    <div className="text-[11px] text-admin-muted">{c.label}</div>
                    <div className="text-[16px] font-semibold text-admin-text mt-0.5">{c.value}</div>
                  </Link>
                ))}
              </div>
            )}

            {creatorApplication === "submitted" && (
              <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                <p className="text-[12px] text-admin-muted">Want to test the approval flow?</p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCreatorApplication("reviewing")}
                    className="text-[11.5px] px-2.5 py-1 rounded-md bg-admin-dark text-white hover:opacity-90"
                  >
                    Simulate review →
                  </button>
                </div>
              </div>
            )}

            {creatorApplication === "reviewing" && (
              <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-admin-new-text rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-admin-new-text rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-1.5 h-1.5 bg-admin-new-text rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <span className="text-[12px] text-admin-muted">Team is reviewing your application...</span>
                </div>
                <button
                  onClick={() => setCreatorApplication("approved")}
                  className="text-[11.5px] px-2.5 py-1 rounded-md bg-admin-dark text-white hover:opacity-90"
                >
                  Simulate approval ✓
                </button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-admin-muted">Your Safe Match</div>
              <div className="text-[18px]">🛡️</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-active-text">{safeMatch}%</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Restaurants verified safe for you</div>
            <Link href="/user/verify" className="text-[12px] mt-2 font-medium text-admin-new-text no-underline hover:underline block">
              How is this calculated? →
            </Link>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-admin-muted">Perfect For You</div>
              <div className="text-[18px]">✨</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-text">{perfectForYou}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Restaurants matching all your needs</div>
            <div className="text-[12px] mt-2 font-medium text-admin-active-text">↑ 6 new this week</div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-admin-muted">Community</div>
              <div className="text-[18px]">👥</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-text">{peopleLikeYou.toLocaleString()}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">People with Celiac in Manchester</div>
            <Link href="/user/community" className="text-[12px] mt-2 font-medium text-admin-new-text no-underline hover:underline block">
              Join the conversation →
            </Link>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-admin-muted">Your Reviews</div>
              <div className="text-[18px]">⭐</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-text">{reviewsWritten}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Helping others eat safely</div>
            <div className="text-[12px] mt-2 font-medium text-admin-active-text">{Math.round(reviewsWritten * 0.85)} helpful votes</div>
          </div>
        </div>

        {(showActionCard.verify || showActionCard.respond || (showActionCard.badge && creatorApplication === "not_applied")) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {showActionCard.verify && (
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 relative">
                <button
                  onClick={() => setShowActionCard((s) => ({ ...s, verify: false }))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full text-admin-muted hover:bg-admin-hover text-[14px]"
                  title="Dismiss"
                >
                  ✕
                </button>
                <div className="text-[18px] mb-2">📋</div>
                <div className="text-[14.5px] font-semibold text-admin-text mb-1">Verify a dish you ate</div>
                <p className="text-[12.5px] text-admin-muted mb-3">Help people with your allergies by verifying a dish you recently tried.</p>
                <Link href="/user/reviews/new" className="text-[12.5px] text-admin-new-text no-underline hover:underline font-medium">
                  Write verification →
                </Link>
              </div>
            )}

            {showActionCard.respond && (
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 relative">
                <button
                  onClick={() => setShowActionCard((s) => ({ ...s, respond: false }))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full text-admin-muted hover:bg-admin-hover text-[14px]"
                  title="Dismiss"
                >
                  ✕
                </button>
                <div className="text-[18px] mb-2">💬</div>
                <div className="text-[14.5px] font-semibold text-admin-text mb-1">Join the conversation</div>
                <p className="text-[12.5px] text-admin-muted mb-3">3 unread replies on your posts. Share what you know.</p>
                <Link href="/user/community" className="text-[12.5px] text-admin-new-text no-underline hover:underline font-medium">
                  Open community →
                </Link>
              </div>
            )}

            {showActionCard.badge && (
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 relative">
                <button
                  onClick={() => setShowActionCard((s) => ({ ...s, badge: false }))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full text-admin-muted hover:bg-admin-hover text-[14px]"
                  title="Dismiss"
                >
                  ✕
                </button>
                <div className="text-[18px] mb-2">🏆</div>
                <div className="text-[14.5px] font-semibold text-admin-text mb-1">Earn as a creator</div>
                <p className="text-[12.5px] text-admin-muted mb-3">You&apos;ve written {reviewsWritten} reviews. Turn them into $$$. Become a creator.</p>
                <div className="flex items-center gap-2">
                  <Link href="/user/become-creator" className="text-[12.5px] text-admin-new-text no-underline hover:underline font-medium">
                    Apply →
                  </Link>
                  <span className="text-admin-border">·</span>
                  <button
                    onClick={() => setShowBadge(true)}
                    className="text-[12.5px] text-admin-muted hover:underline"
                  >
                    Preview badge
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-[16px] font-semibold text-admin-text">Your bookings</h2>
              <p className="text-[12.5px] text-admin-muted">
                {myBookings.length > 0
                  ? `${myBookings.filter((b) => b.status === "Confirmed").length} confirmed · ${myBookings.filter((b) => b.status === "Waiting").length} waiting`
                  : "Book a table at verified restaurants"}
              </p>
            </div>
            <button
              onClick={() => setShowBookModal(true)}
              className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
            >
              📅 Book a table
            </button>
          </div>
          {myBookings.length === 0 ? (
            <div className="text-center py-4">
              <div className="text-[36px] mb-2">📅</div>
              <p className="text-[13px] text-admin-muted mb-3">No bookings yet. Find a verified restaurant and book a table.</p>
              <button
                onClick={() => setShowBookModal(true)}
                className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Book your first table →
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {myBookings.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                  <div className="text-[22px]">{b.restaurantEmoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[14px] font-semibold text-admin-text">{b.restaurantName}</span>
                      <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${
                        b.status === "Confirmed" ? "bg-admin-active-bg text-admin-active-text" :
                        b.status === "Declined" ? "bg-admin-non-bg text-admin-non-text" :
                        "bg-admin-vip-bg text-admin-vip-text"
                      }`}>{b.status}</span>
                    </div>
                    <div className="text-[12px] text-admin-muted">
                      {new Date(b.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {b.time} · {b.partySize} {b.partySize === 1 ? "person" : "people"}
                    </div>
                    {b.requests && (
                      <div className="text-[11.5px] text-admin-muted mt-0.5 truncate">&ldquo;{b.requests}&rdquo;</div>
                    )}
                  </div>
                </div>
              ))}
              {myBookings.length > 4 && (
                <p className="text-center text-[12.5px] text-admin-new-text">
                  +{myBookings.length - 4} more bookings
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-[16px] font-semibold text-admin-text">3-Layer Verification for The Italian Kitchen</h2>
              <p className="text-[12.5px] text-admin-muted">How we know this restaurant is safe for your allergies</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[36px] font-bold text-admin-active-text">{safeMatch}%</div>
              <div className="text-[11px] text-admin-muted uppercase tracking-wider">Safe Match</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { layer: "Menu Verified", icon: "📋", weight: 40, score: 100, detail: "Confirmed with restaurant Jan 10, 2024", color: "admin-active" },
              { layer: "Database Check", icon: "🔍", weight: 30, score: 95, detail: "All ingredients verified, no allergens detected", color: "admin-active" },
              { layer: "Community Reviews", icon: "👥", weight: 30, score: 88, detail: "47 reviews from people with Celiac", color: "admin-active" },
            ].map((l) => (
              <div key={l.layer} className="border border-admin-border rounded-[9px] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">{l.icon}</span>
                    <span className="text-[13px] font-semibold text-admin-text">{l.layer}</span>
                  </div>
                  <div className="text-[14px] font-bold text-admin-active-text">{l.score}%</div>
                </div>
                <div className="w-full h-1.5 bg-admin-border rounded-full mb-2">
                  <div className="h-full bg-admin-active-text rounded-full" style={{ width: `${l.score}%` }} />
                </div>
                <p className="text-[11.5px] text-admin-muted">{l.detail}</p>
                <p className="text-[10.5px] text-admin-muted mt-1 uppercase tracking-wide">{l.weight}% of total score</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Link
              href="/user/verify"
              className="text-[13px] text-admin-new-text no-underline hover:underline font-medium"
            >
              See full verification details →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-admin-text">Recommended for you</h2>
              <Link href="/user/find" className="text-[13px] text-admin-new-text no-underline hover:underline">
                See all →
              </Link>
            </div>
            <div className="space-y-3">
              {visibleMatches.slice(0, 3).map((m) => (
                <div key={m.id} className="flex items-start gap-3 pb-3 border-b border-admin-border last:border-b-0 last:pb-0">
                  <div className="text-[28px]">{m.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[14px] font-semibold text-admin-text">{m.restaurant}</span>
                      <span className="text-[12px] text-admin-muted">· {m.cuisine}</span>
                      <span className="text-[12px] text-admin-muted">· {m.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                      <span className="text-[12px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">
                        ✓ {m.safetyScore}% Safe
                      </span>
                      {m.safeForMe.map((tag) => (
                        <span key={tag} className="text-[11px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-nav-text">
                          {tag} ✓
                        </span>
                      ))}
                    </div>
                    <div className="text-[12.5px] text-admin-nav-text">
                      Top dish: <span className="font-medium">{m.topDish}</span>
                    </div>
                    <div className="text-[11.5px] text-admin-muted mt-0.5">
                      {m.communityCount} people with Celiac confirmed safe · {m.price}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/user/find"
                      className="text-[11.5px] px-2.5 py-1 rounded-md bg-admin-dark text-white no-underline hover:opacity-90"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDismissMatch(m.id)}
                      className="text-[11.5px] px-2.5 py-1 rounded-md border border-admin-border text-admin-muted hover:bg-admin-hover"
                    >
                      Hide
                    </button>
                  </div>
                </div>
              ))}
              {visibleMatches.length === 0 && (
                <p className="text-[13px] text-admin-muted text-center py-4">No more recommendations. Try adjusting your allergies.</p>
              )}
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text">Your saved restaurants</h2>
              <Link href="/user/saved" className="text-[13px] text-admin-new-text no-underline hover:underline">View all →</Link>
            </div>
            {saved.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-[36px] mb-2">🔖</div>
                <p className="text-[13px] text-admin-muted mb-3">No saved restaurants yet</p>
                <Link href="/user/find" className="inline-block text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white no-underline hover:opacity-90">Find restaurants</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {saved.slice(0, 4).map((r) => (
                  <div key={r.id} className="flex items-start gap-3 pb-3 border-b border-admin-border last:border-b-0 last:pb-0">
                    <div className="text-[26px]">{r.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[14px] font-semibold text-admin-text">{r.name}</span>
                        <span className="text-[12px] text-admin-muted">· {r.cuisine}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1 text-[12px]">
                        <span className="text-admin-active-text font-medium">✓ {r.safetyScore}% safe</span>
                        <span className="text-admin-muted">{r.safeDishes} safe dishes</span>
                      </div>
                      <div className="text-[11.5px] text-admin-muted">{r.distance} · Last visited {r.lastVisited}</div>
                    </div>
                    <button onClick={() => handleRemoveSaved(r.id)} className="text-admin-muted hover:text-admin-non-text text-[16px]" title="Remove">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Restaurants viewed</h2>
            <div className="flex items-center gap-1">
              {(["7d", "30d", "90d"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`text-[12px] px-2.5 py-1 rounded-md transition-colors ${
                    period === p ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 h-[100px]">
            {chartData.map((h, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i === selectedDay ? null : i)}
                className={`flex-1 rounded-t-sm transition-colors cursor-pointer ${
                  selectedDay === i ? "bg-admin-active-text" : "bg-admin-active-text/40 hover:bg-admin-active-text/70"
                }`}
                style={{ height: `${h}%` }}
                title={`Day ${i + 1}: ${Math.round(h * 0.3)} views`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-admin-muted mt-2">
            <span>{periodDays} days ago</span>
            <span>Today</span>
          </div>
          {selectedDay !== null && (
            <div className="mt-3 pt-3 border-t border-admin-border flex items-center justify-between">
              <div>
                <div className="text-[12px] text-admin-muted">Day {selectedDay + 1}</div>
                <div className="text-[18px] font-semibold text-admin-text">{Math.round(chartData[selectedDay] * 0.3)} profile views</div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="text-[12px] text-admin-muted hover:text-admin-text">Close</button>
            </div>
          )}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-admin-text">Recent activity</h2>
            <span className="text-[12px] text-admin-muted">Last 7 days</span>
          </div>
          {activity.length === 0 ? (
            <p className="text-[14px] text-admin-active-text text-center py-4">✓ All quiet here. Start exploring to see activity.</p>
          ) : (
            <div className="space-y-2">
              {activity.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-admin-hover transition-colors group">
                  <div className="text-[18px] flex-shrink-0">{a.icon}</div>
                  <div className="flex-1">
                    <p className="text-[13.5px] text-admin-text">{a.text}</p>
                    <p className="text-[11.5px] text-admin-muted">{a.time}</p>
                  </div>
                  <button
                    onClick={() => handleDismissActivity(a.id)}
                    className="text-admin-muted hover:text-admin-text text-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showBadge && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowBadge(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Your DietaryID Verified badge</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">You&apos;re verified for Celiac, Gluten-Free, Dairy-Free. Add this to your website or social.</p>
            <div className="bg-admin-active-text text-white rounded-[10px] p-4 text-center mb-3">
              <div className="text-[24px] mb-1">🛡️</div>
              <div className="font-bold text-[15px]">DietaryID Verified</div>
              <div className="text-[11.5px] opacity-90">Safe for Celiac · Gluten-Free · Dairy-Free</div>
            </div>
            <div className="bg-admin-hover rounded-md p-2.5 text-[12px] font-mono text-admin-text overflow-x-auto mb-3 whitespace-pre">
{`<a href="https://dietaryid.com/u/sarah" target="_blank">
  <img src="badge.svg" alt="DietaryID Verified" width="180"/>
</a>`}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowBadge(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Close</button>
              <button
                onClick={handleCopyBadge}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                {badgeCopied ? "✓ Copied!" : "Copy HTML"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showBookModal && (
        <BookTableModal
          restaurantId={bookResto.id}
          restaurantName={bookResto.name}
          restaurantEmoji={bookResto.emoji}
          userName="Sarah Mitchell"
          userRestriction="Celiac"
          onClose={() => setShowBookModal(false)}
        />
      )}
    </div>
  );
}
