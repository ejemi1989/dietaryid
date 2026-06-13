"use client";

import { useState } from "react";
import Link from "next/link";

type Review = {
  id: string;
  author: string;
  restriction: string;
  rating: number;
  time: string;
  text: string;
  responded: boolean;
  response?: string;
};

const initialReviews: Review[] = [
  {
    id: "r_001",
    author: "Sarah M.",
    restriction: "Has Celiac",
    rating: 5,
    time: "2 days ago",
    text: "Excellent cross-contamination procedures. Staff was knowledgeable and took my allergy seriously. Highly recommend!",
    responded: true,
    response: "Thank you Sarah! We appreciate your trust. Hope to see you soon!",
  },
  {
    id: "r_002",
    author: "Mike H.",
    restriction: "Has Gluten-free",
    rating: 4,
    time: "5 days ago",
    text: "Great options, but I'd suggest labeling the gluten-free items more clearly.",
    responded: false,
  },
  {
    id: "r_003",
    author: "Jordan L.",
    restriction: "Nut allergy",
    rating: 5,
    time: "1 week ago",
    text: "Best nut-free restaurant in Manchester. Staff super careful. Worth the trip!",
    responded: true,
    response: "Thanks Jordan! We take nut allergies very seriously. See you next time!",
  },
];

const initialActionItems = [
  { id: "a1", text: "3 reviews mention wanting vegan + gluten-free options", type: "info" as const },
  { id: "a2", text: "2 reviews praise your cross-contamination procedures", type: "positive" as const },
  { id: "a3", text: "Action: Consider expanding vegan menu items", type: "action" as const, action: "View menu" },
];

const badgeCode = `<a href="https://dietaryid.com/r/the-italian-kitchen" target="_blank">
  <img src="https://dietaryid.com/badge/the-italian-kitchen.svg" alt="DietaryID Verified" width="180" />
</a>`;

const templateResponses = [
  "Thank you for visiting! We appreciate your feedback and hope to see you again soon.",
  "We're glad you felt safe dining with us. Your trust means everything to our team.",
  "Thank you for the kind words about our cross-contamination procedures. We'll share this with our staff!",
];

export default function RestaurantDashboardPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [actionItems, setActionItems] = useState(initialActionItems);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showActionCard, setShowActionCard] = useState({ verify: true, respond: true, badge: true });
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const periodDays = chartPeriod === "7d" ? 7 : chartPeriod === "30d" ? 30 : 90;
  const chartData = Array.from({ length: periodDays }).map((_, i) => {
    const h = 20 + Math.sin(i * 0.5) * 15 + ((i * 7) % 30);
    return parseFloat(h.toFixed(4));
  });
  const avg = (chartData.reduce((s, h) => s + h, 0) / chartData.length * 0.3).toFixed(1);

  const handleSubmitReply = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, responded: true, response: replyText } : r)));
    setReplyingTo(null);
    setReplyText("");
  };

  const handleResolveAction = (id: string) => {
    setActionItems((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCopyBadge = async () => {
    try {
      await navigator.clipboard.writeText(badgeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const unresponded = reviews.filter((r) => !r.responded).length;
  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Welcome onboarding modal */}
      {showWelcome && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setShowWelcome(false)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-admin-active-bg flex items-center justify-center text-[20px]">👋</div>
              <div>
                <h3 className="text-[16px] font-semibold text-admin-text">Welcome to DietaryID for Restaurants!</h3>
                <p className="text-[12.5px] text-admin-muted">Get started in 3 steps</p>
              </div>
            </div>
            <div className="space-y-3 my-4">
              {[
                { n: 1, t: "Verify your menu", d: "Mark which items are safe for each allergy" },
                { n: 2, t: "Respond to reviews", d: "Build trust with your customers" },
                { n: 3, t: "Share your badge", d: "Show you're verified on your website" },
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
            <div className="flex justify-end">
              <button
                onClick={() => setShowWelcome(false)}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Welcome back, The Italian Kitchen 👋</h1>
        <div className="flex items-center gap-4 text-[13px] text-admin-muted flex-wrap">
          <span>✓ Verified Safe for Celiac, Gluten-Free</span>
          <span>·</span>
          <span>Last Updated: Jan 10, 2024</span>
          <span>·</span>
          <span>Customer Reach: 2,340 people with allergies in your area</span>
        </div>
      </div>

      <div className="px-[26px] py-6">
        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Profile Views</div>
            <div className="text-[22px] font-semibold text-admin-text">284</div>
            <div className="text-[12.5px] text-admin-muted mt-1">People viewed your profile this month</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">↑ +47 from last month</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Average Safety Rating</div>
            <div className="text-[22px] font-semibold text-admin-text">4.8★</div>
            <div className="text-[12.5px] text-admin-muted mt-1">From 47 customer reviews</div>
            <div className="text-[12px] mt-1 font-medium text-admin-nav-text">Celiac: 4.8 · GF: 4.6</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">New Customers</div>
            <div className="text-[22px] font-semibold text-admin-text">12</div>
            <div className="text-[12.5px] text-admin-muted mt-1">This month from DietaryID</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">Est. revenue: £240-360</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Verified Dishes</div>
            <div className="text-[22px] font-semibold text-admin-text">8 / 20</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Menu items verified safe</div>
            <Link href="/restaurant/menu" className="text-[12px] mt-1 font-medium text-admin-vip-text no-underline hover:underline">
              40% complete — Add more →
            </Link>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted mb-1">Review Sentiment</div>
            <div className="text-[22px] font-semibold text-admin-text">{positiveReviews} / 0 / 0</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Positive / Neutral / Concerning</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">100% positive</div>
          </div>
          <Link
            href="/restaurant/bookings"
            className="bg-admin-bg border border-admin-border rounded-[10px] p-5 no-underline hover:border-admin-text transition-colors"
          >
            <div className="text-[12px] text-admin-muted mb-1">Booking Requests</div>
            <div className="text-[22px] font-semibold text-admin-vip-text">3</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Pending responses</div>
            <div className="text-[12px] mt-1 font-medium text-admin-new-text">View all →</div>
          </Link>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">
          {showActionCard.verify && (
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 relative">
              <button
                onClick={() => setShowActionCard((s) => ({ ...s, verify: false }))}
                className="absolute top-2 right-2 w-6 h-6 rounded-full text-admin-muted hover:bg-admin-hover text-[14px]"
                title="Dismiss"
              >
                ✕
              </button>
              <div className="text-[15px] font-semibold text-admin-text mb-2">Complete Menu Verification</div>
              <p className="text-[13px] text-admin-muted mb-3">Only 8 of 20 menu items verified</p>
              <div className="w-full h-2 bg-admin-border rounded-full mb-3">
                <div className="h-full bg-admin-vip-text rounded-full transition-all" style={{ width: "40%" }} />
              </div>
              <p className="text-[12px] text-admin-muted mb-3">40% complete · ~15 min to finish</p>
              <Link href="/restaurant/menu" className="text-[13px] text-admin-new-text no-underline hover:underline font-medium">
                Continue verification →
              </Link>
            </div>
          )}

          {showActionCard.respond && unresponded > 0 && (
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 relative">
              <button
                onClick={() => setShowActionCard((s) => ({ ...s, respond: false }))}
                className="absolute top-2 right-2 w-6 h-6 rounded-full text-admin-muted hover:bg-admin-hover text-[14px]"
                title="Dismiss"
              >
                ✕
              </button>
              <div className="text-[15px] font-semibold text-admin-text mb-2">Respond to New Review</div>
              <p className="text-[13px] text-admin-muted mb-2">1 new review from Mike H. (Gluten-free)</p>
              <p className="text-[13px] text-admin-nav-text italic mb-3">"Great options, but I'd suggest labeling the gluten-free items more clearly."</p>
              <button
                onClick={() => {
                  const r = reviews.find((rv) => !rv.responded);
                  if (r) {
                    setReplyingTo(r.id);
                    setReplyText("");
                  }
                }}
                className="text-[13px] text-admin-new-text no-underline hover:underline font-medium cursor-pointer"
              >
                Respond now →
              </button>
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
              <div className="text-[15px] font-semibold text-admin-text mb-2">Use Your Badge</div>
              <p className="text-[13px] text-admin-muted mb-3">You're now verified safe for Celiac! Add the badge to your website or social media.</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowBadgeModal(true)}
                  className="text-[13px] text-admin-new-text no-underline hover:underline font-medium cursor-pointer"
                >
                  Copy badge code →
                </button>
                <span className="text-admin-border">|</span>
                <Link href="/restaurant/marketing" className="text-[13px] text-admin-new-text no-underline hover:underline font-medium">
                  All marketing →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Analytics chart with period filter and click-to-view */}
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Profile Views</h2>
            <div className="flex items-center gap-1">
              {(["7d", "30d", "90d"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`text-[12px] px-2.5 py-1 rounded-md transition-colors ${
                    chartPeriod === p ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="text-[13px] text-admin-active-text font-medium ml-3">Avg {avg}/day</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-[120px]">
            {chartData.map((h, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex-1 rounded-t-sm transition-colors cursor-pointer ${
                  selectedDay === i ? "bg-admin-dark/60" : "bg-admin-dark/20 hover:bg-admin-dark/40"
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
                <div className="text-[18px] font-semibold text-admin-text">{Math.round(chartData[selectedDay] * 0.3)} views</div>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-[12px] text-admin-muted hover:text-admin-text"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Recent reviews with inline reply */}
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-admin-text">Recent Reviews</h2>
            <Link href="/restaurant/reviews" className="text-[13px] text-admin-new-text no-underline hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="pb-4 border-b border-admin-border last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[14px] font-semibold text-admin-text">{r.author}</span>
                  <span className="text-[12px] text-admin-muted">| {r.restriction}</span>
                  <span className="text-[13px] text-admin-vip-text">{"⭐".repeat(r.rating)}</span>
                  <span className="text-[12px] text-admin-muted ml-auto">{r.time}</span>
                </div>
                <p className="text-[14px] text-admin-nav-text italic mb-2">"{r.text}"</p>
                {r.responded && r.response && (
                  <div className="bg-admin-hover rounded-md p-3 text-[13px] text-admin-text">
                    <span className="font-medium">You responded:</span> "{r.response}"
                  </div>
                )}
                {!r.responded && (
                  <>
                    {replyingTo === r.id ? (
                      <div className="mt-2">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-[11px] text-admin-muted">Quick templates:</span>
                          {templateResponses.map((t, i) => (
                            <button
                              key={i}
                              onClick={() => setReplyText(t)}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-nav-text hover:bg-admin-border"
                            >
                              Template {i + 1}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          placeholder="Thank you for the feedback..."
                          className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-2 outline-none focus:ring-2 focus:ring-admin-new-bg bg-admin-bg"
                          maxLength={500}
                          autoFocus
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-admin-muted">{replyText.length}/500</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setReplyingTo(null); setReplyText(""); }}
                              className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSubmitReply(r.id)}
                              disabled={!replyText.trim()}
                              className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                            >
                              Post response
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setReplyingTo(r.id); setReplyText(""); }}
                        className="text-[13px] text-admin-new-text no-underline hover:underline font-medium cursor-pointer"
                      >
                        Respond →
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action items with dismiss */}
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Suggested Improvements</h2>
          {actionItems.length === 0 ? (
            <p className="text-[14px] text-admin-active-text">✓ All caught up! No action items right now.</p>
          ) : (
            <div className="space-y-2">
              {actionItems.map((a) => (
                <div
                  key={a.id}
                  className={`flex items-start gap-2 text-[14px] p-2 rounded-md ${
                    a.type === "positive"
                      ? "text-admin-active-text bg-admin-active-bg/30"
                      : a.type === "action"
                      ? "text-admin-new-text bg-admin-new-bg/20"
                      : "text-admin-nav-text"
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleResolveAction(a.id)}
                    className="mt-1 w-4 h-4 cursor-pointer"
                    title="Mark as done"
                  />
                  <span className="flex-1">{a.text}</span>
                  {a.action && (
                    <Link
                      href="/restaurant/menu"
                      className="text-[12px] text-admin-new-text no-underline hover:underline font-medium"
                    >
                      {a.action} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Badge code modal */}
      {showBadgeModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setShowBadgeModal(false)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Your Verification Badge</h3>
            <p className="text-[13px] text-admin-muted mb-3">Paste this HTML code into your website to display your verified badge.</p>
            <div className="bg-admin-hover rounded-md p-3 text-[12px] font-mono text-admin-text mb-3 overflow-x-auto whitespace-pre">
              {badgeCode}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[12px] text-admin-active-text">
                {copied && "✓ Copied to clipboard!"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBadgeModal(false)}
                  className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  Close
                </button>
                <button
                  onClick={handleCopyBadge}
                  className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
                >
                  {copied ? "Copied!" : "Copy code"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
