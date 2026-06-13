"use client";

import { useState } from "react";
import Link from "next/link";
import { notifyUser, notifyAdmin, notifyRestaurant } from "@/lib/notifications";
import { BookTableModal } from "@/components/ui/BookTableModal";

type Review = {
  id: string;
  author: string;
  restriction: string;
  rating: number;
  time: string;
  text: string;
  dish: string;
  helpful: number;
};

type Layer = {
  name: string;
  icon: string;
  weight: number;
  score: number;
  detail: string;
  items: { label: string; status: "verified" | "flagged" | "warning" }[];
};

const reviews: Review[] = [
  { id: "rv1", author: "Sarah M.", restriction: "Has Celiac", rating: 5, time: "2 days ago", text: "I ordered this multiple times. No reactions. Staff is knowledgeable about cross-contamination.", dish: "Gluten-Free Pasta Primavera", helpful: 23 },
  { id: "rv2", author: "Mike H.", restriction: "Has Celiac", rating: 5, time: "3 weeks ago", text: "Amazing gluten-free option. Asked about bread and they use dedicated toaster. Very careful.", dish: "Gluten-Free Pasta Primavera", helpful: 18 },
  { id: "rv3", author: "Emma T.", restriction: "Has Gluten-free", rating: 4, time: "1 month ago", text: "Good option but make sure to specify no cheese. Otherwise staff default to putting parmesan on top.", dish: "Risotto ai Funghi", helpful: 12 },
  { id: "rv4", author: "Jordan L.", restriction: "Has Celiac + IBS", rating: 5, time: "2 months ago", text: "Best gluten-free Italian in Manchester! No reaction, no issues. The dedicated GF prep area is a game changer.", dish: "Gluten-Free Pasta Primavera", helpful: 31 },
];

const layers: Layer[] = [
  {
    name: "Menu Verified",
    icon: "📋",
    weight: 40,
    score: 100,
    detail: "Restaurant confirmed these items are safe for your allergies",
    items: [
      { label: "Grilled Salmon - Gluten-free, Nut-free", status: "verified" },
      { label: "Vegetable Stir-fry - Can be made dairy-free", status: "verified" },
      { label: "Caesar Salad - Ask for allergy menu", status: "verified" },
      { label: "Gluten-Free Pasta - Dedicated GF prep area", status: "verified" },
    ],
  },
  {
    name: "Database Verified",
    icon: "🔍",
    weight: 30,
    score: 95,
    detail: "All ingredients checked against allergen databases. No issues found.",
    items: [
      { label: "Salmon: ✓ Safe", status: "verified" },
      { label: "Olive Oil: ✓ Safe", status: "verified" },
      { label: "Garlic: ✓ Safe", status: "verified" },
      { label: "Salt: ✓ Safe", status: "verified" },
      { label: "Black Pepper: ✓ Safe", status: "verified" },
      { label: "Cross-contamination risks: NONE detected", status: "verified" },
    ],
  },
  {
    name: "Community Verified",
    icon: "👥",
    weight: 30,
    score: 88,
    detail: "47 people with Celiac confirmed safe · Average rating: 4.8 stars",
    items: [
      { label: "47 reviews with Celiac", status: "verified" },
      { label: "Average rating: 4.8/5", status: "verified" },
      { label: "Most recent review: 2 days ago", status: "verified" },
      { label: "5★: 42 reviews · 4★: 4 reviews · 3★: 1 review", status: "verified" },
    ],
  },
];

const timeline = [
  { time: "2 days ago", type: "review", text: "Sarah M. (Has Celiac) reviewed — 'No issues, staff very careful'", rating: 5 },
  { time: "3 weeks ago", type: "review", text: "Mike H. (Has Celiac) reviewed — 'Great gluten-free handling'", rating: 5 },
  { time: "Jan 10, 2024", type: "menu", text: "Menu Verified with restaurant — Confirmed items and cross-contamination procedures" },
  { time: "Jan 5, 2024", type: "database", text: "Database Cross-Check — All ingredients verified, no allergens detected" },
];

const ratingDistribution = [
  { stars: 5, count: 42, pct: 89 },
  { stars: 4, count: 4, pct: 9 },
  { stars: 3, count: 1, pct: 2 },
  { stars: 2, count: 0, pct: 0 },
  { stars: 1, count: 0, pct: 0 },
];

export default function VerificationPage() {
  const [showExplain, setShowExplain] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [expandedLayer, setExpandedLayer] = useState<string | null>("Menu Verified");
  const [showReportModal, setShowReportModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const [verifyRating, setVerifyRating] = useState(5);
  const [verifyText, setVerifyText] = useState("");
  const [verifyConfidence, setVerifyConfidence] = useState(9);
  const [verifyDish, setVerifyDish] = useState("");

  const [allReviews, setAllReviews] = useState(reviews);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [reportingReview, setReportingReview] = useState<string | null>(null);
  const [reportReviewReason, setReportReviewReason] = useState("");
  const [helpfulClicks, setHelpfulClicks] = useState<Set<string>>(new Set());
  const [communityReviews, setCommunityReviews] = useState(reviews);
  const [showBookModal, setShowBookModal] = useState(false);

  const handleVerify = () => {
    setShowVerifyModal(false);
    setVerified(true);
    notifyUser("Verification published for The Italian Kitchen", "/user/reviews");
    notifyAdmin("Sarah Mitchell verified The Italian Kitchen — new safety data", "/admin/restaurants/verification");
    notifyRestaurant("New verification from Sarah Mitchell · Rated " + verifyRating + "/5", "/restaurant/reviews");
    setVerifyRating(5);
    setVerifyText("");
    setVerifyConfidence(9);
    setVerifyDish("");
    setTimeout(() => setVerified(false), 4000);
  };

  const handleSubmitReply = (id: string) => {
    if (!replyText.trim()) return;
    setCommunityReviews((prev) => prev.map((r) => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
    setReplyTo(null);
    setReplyText("");
  };

  const handleHelpful = (id: string) => {
    setHelpfulClicks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) return prev;
      next.add(id);
      return next;
    });
    if (!helpfulClicks.has(id)) {
      setCommunityReviews((prev) => prev.map((r) => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
    }
  };

  const handleReportReview = () => {
    if (!reportReviewReason.trim()) return;
    setReportingReview(null);
    setReportReviewReason("");
    alert("Review reported for moderation. Thank you.");
  };

  const safeMatch = 96;
  const totalScore = 0.4 * layers[0].score + 0.3 * layers[1].score + 0.3 * layers[2].score;
  const scoreClass = safeMatch >= 90
    ? { bg: "bg-admin-active-bg", text: "text-admin-active-text", border: "border-admin-active-text/30" }
    : safeMatch >= 70
    ? { bg: "bg-admin-new-bg", text: "text-admin-new-text", border: "border-admin-new-text/30" }
    : safeMatch >= 50
    ? { bg: "bg-admin-vip-bg", text: "text-admin-vip-text", border: "border-admin-vip-text/30" }
    : { bg: "bg-admin-non-bg", text: "text-admin-non-text", border: "border-admin-non-text/30" };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/user/find" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">
          ← Back to Find Safely
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">🍝 The Italian Kitchen</h1>
            <p className="text-[13.5px] text-admin-muted">Italian · 2.1 km · Open now · $$ · Manchester, UK</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBookModal(true)}
              className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              📅 Book a table
            </button>
            <button
              onClick={() => setShowVerifyModal(true)}
              className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
            >
              ✓ Verify this restaurant
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              ⚐ Report issue
            </button>
          </div>
        </div>
      </div>

      <div className="px-[26px] py-6">

        {verified && (
          <div className="mb-4 p-4 rounded-[10px] bg-admin-active-bg border border-admin-active-text/30 flex items-center gap-3">
            <div className="text-[24px]">✅</div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-admin-active-text">Verification published!</div>
              <div className="text-[12.5px] text-admin-text">Your review helps people with Celiac eat safely. The safety score will update within 24 hours.</div>
            </div>
            <button onClick={() => setVerified(false)} className="text-admin-muted hover:text-admin-text text-[16px]">✕</button>
          </div>
        )}

        {reportSubmitted && (
          <div className="mb-4 p-4 rounded-[10px] bg-admin-vip-bg border border-admin-vip-text/30 flex items-center gap-3">
            <div className="text-[24px]">📤</div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-admin-vip-text">Report submitted</div>
              <div className="text-[12.5px] text-admin-text">Thank you for helping keep DietaryID accurate. Our moderation team will review within 24 hours.</div>
            </div>
            <button onClick={() => setReportSubmitted(false)} className="text-admin-muted hover:text-admin-text text-[16px]">✕</button>
          </div>
        )}

        <div className={`${scoreClass.bg} border ${scoreClass.border} rounded-[10px] p-6 mb-6`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="text-[11px] text-admin-muted uppercase tracking-wider mb-1">Your Safety Verification</div>
              <div className={`text-[48px] font-bold ${scoreClass.text} leading-none`}>{safeMatch}%</div>
              <div className="text-[15px] text-admin-text font-medium mt-2">Safe Match for your allergies</div>
              <p className="text-[13px] text-admin-nav-text mt-2">
                This restaurant is verified safe for your allergies (Celiac, Gluten-Free, Dairy-Free) through three independent checks.
              </p>
              <div className="mt-3 text-[12px] text-admin-muted">
                <strong>Always confirm with restaurant staff when ordering.</strong> Restaurant procedures can change.
              </div>
            </div>
            <button
              onClick={() => setShowExplain(true)}
              className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              ? What does 96% mean?
            </button>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">3-Layer Verification</h2>
          <div className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.name} className="border border-admin-border rounded-[9px]">
                <button
                  onClick={() => setExpandedLayer(expandedLayer === layer.name ? null : layer.name)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-admin-hover transition-colors"
                >
                  <div className="text-[24px]">{layer.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[15px] font-semibold text-admin-text">✓ {layer.name}</span>
                      <span className="text-[11px] text-admin-muted uppercase tracking-wide">{layer.weight}% of total score</span>
                    </div>
                    <p className="text-[12.5px] text-admin-muted">{layer.detail}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-[20px] font-bold ${scoreClass.text}`}>{layer.score}%</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-admin-muted transition-transform ${expandedLayer === layer.name ? "rotate-180" : ""}`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {expandedLayer === layer.name && (
                  <div className="px-4 pb-4 space-y-1.5">
                    {layer.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px]">
                        <span className={
                          item.status === "verified" ? "text-admin-active-text" : item.status === "flagged" ? "text-admin-vip-text" : "text-admin-non-text"
                        }>
                          {item.status === "verified" ? "✓" : item.status === "flagged" ? "⚠" : "✕"}
                        </span>
                        <span className="text-admin-nav-text">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-admin-border text-[12.5px] text-admin-muted">
            <strong>Score calculation:</strong> (Menu × 0.4) + (Database × 0.3) + (Community × 0.3) = ({layers[0].score} × 0.4) + ({layers[1].score} × 0.3) + ({layers[2].score} × 0.3) = {totalScore.toFixed(0)}% → displayed as {safeMatch}% (conservative)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-4">Timeline of verification</h2>
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      t.type === "review" ? "bg-admin-active-text" : t.type === "menu" ? "bg-admin-new-text" : "bg-admin-vip-text"
                    }`} />
                    {i < timeline.length - 1 && <div className="w-px h-12 bg-admin-border mt-1" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="text-[11.5px] text-admin-muted uppercase tracking-wide mb-0.5">{t.time}</div>
                    <p className="text-[13.5px] text-admin-text">
                      {t.type === "review" && "👥 Community review "}
                      {t.type === "menu" && "📋 "}
                      {t.type === "database" && "🔍 "}
                      {t.text}
                    </p>
                    {t.rating && <div className="text-[12px] text-admin-vip-text mt-1">{"⭐".repeat(t.rating)}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-4">Rating distribution</h2>
            <div className="text-center mb-4">
              <div className="text-[36px] font-bold text-admin-text">4.8</div>
              <div className="text-[14px] text-admin-vip-text">⭐⭐⭐⭐⭐</div>
              <div className="text-[12px] text-admin-muted mt-1">From 47 reviews</div>
            </div>
            <div className="space-y-1.5">
              {ratingDistribution.map((r) => (
                <div key={r.stars} className="flex items-center gap-2">
                  <div className="text-[12px] text-admin-muted w-12">{r.stars} star</div>
                  <div className="flex-1 h-2 bg-admin-border rounded-full overflow-hidden">
                    <div className="h-full bg-admin-vip-text rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                  <div className="text-[12px] text-admin-muted w-8 text-right">{r.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Community reviews ({communityReviews.length})</h2>
            <select
              onChange={() => {}}
              className="text-[12.5px] px-3 py-1.5 border border-admin-border rounded-md bg-admin-bg text-admin-text outline-none"
            >
              <option>Most recent</option>
              <option>Most helpful</option>
              <option>Highest rated</option>
              <option>Lowest rated</option>
            </select>
          </div>
          <div className="space-y-4">
            {communityReviews.map((r) => (
              <div key={r.id} className="pb-4 border-b border-admin-border last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <img src={`https://i.pravatar.cc/80?u=${r.author}`} alt={r.author} className="w-7 h-7 rounded-full" />
                  <span className="text-[13.5px] font-semibold text-admin-text">{r.author}</span>
                  <span className="text-[12px] text-admin-muted">| {r.restriction}</span>
                  <span className="text-[13px] text-admin-vip-text">{"⭐".repeat(r.rating)}</span>
                  <span className="text-[12px] text-admin-muted ml-auto">{r.time}</span>
                </div>
                <div className="text-[12px] text-admin-muted mb-1">Re: <span className="font-medium text-admin-nav-text">{r.dish}</span></div>
                <p className="text-[13.5px] text-admin-nav-text mb-2">&ldquo;{r.text}&rdquo;</p>

                {replyTo === r.id ? (
                  <div className="mb-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      placeholder="Write a reply..."
                      className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none resize-none"
                      autoFocus
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] text-admin-muted">{replyText.length}/500</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setReplyTo(null); setReplyText(""); }} className="text-[11.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                        <button
                          onClick={() => handleSubmitReply(r.id)}
                          disabled={!replyText.trim()}
                          className="text-[11.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[11.5px] text-admin-muted">
                    <button
                      onClick={() => handleHelpful(r.id)}
                      className={`hover:text-admin-text ${helpfulClicks.has(r.id) ? "text-admin-active-text font-medium" : ""}`}
                    >
                      👍 Helpful ({r.helpful})
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => { setReplyTo(r.id); setReplyText(""); }}
                      className="hover:text-admin-text"
                    >
                      💬 Reply
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => setReportingReview(r.id)}
                      className="hover:text-admin-non-text"
                    >
                      ⚐ Report
                    </button>
                  </div>
                )}

                {reportingReview === r.id && (
                  <div className="mt-2 p-2.5 rounded-md bg-admin-hover border border-admin-border">
                    <div className="text-[12px] text-admin-text mb-1.5">Why are you reporting this review?</div>
                    <input
                      type="text"
                      value={reportReviewReason}
                      onChange={(e) => setReportReviewReason(e.target.value)}
                      placeholder="e.g. Misinformation, spam, harassment..."
                      className="w-full px-2.5 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none"
                    />
                    <div className="flex items-center justify-end gap-1.5 mt-1.5">
                      <button onClick={() => { setReportingReview(null); setReportReviewReason(""); }} className="text-[11px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg">Cancel</button>
                      <button onClick={handleReportReview} disabled={!reportReviewReason.trim()} className="text-[11px] px-2.5 py-1 rounded-md bg-admin-non-text text-white hover:opacity-90 disabled:opacity-50">Submit</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showExplain && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowExplain(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-3">What does {safeMatch}% mean?</h3>
            <div className="space-y-3 text-[13.5px] text-admin-nav-text">
              <div>
                <strong className="text-admin-text">&ldquo;Should I trust {safeMatch}%?&rdquo;</strong>
                <p className="mt-1">
                  {safeMatch}% means we have very strong confidence this is safe for your allergies. It was verified by:
                </p>
                <ul className="list-disc list-inside mt-1 ml-2 text-[12.5px]">
                  <li>The restaurant directly confirmed their menu and procedures</li>
                  <li>Ingredient databases confirmed no hidden allergens</li>
                  <li>47 people with Celiac ate here and felt fine</li>
                </ul>
                <p className="mt-1 text-[12.5px] text-admin-muted">But restaurant procedures can change, so always confirm with staff when ordering.</p>
              </div>
              <div>
                <strong className="text-admin-text">&ldquo;What if I see 60%?&rdquo;</strong>
                <p className="mt-1">60% means we have moderate confidence. This might be because of fewer community reviews, some ingredients not fully verified, or the restaurant hasn&apos;t directly confirmed. It could still be safe! Ask staff for specific details about your allergies.</p>
              </div>
              <div>
                <strong className="text-admin-text">&ldquo;What about 100%?&rdquo;</strong>
                <p className="mt-1">We rarely show 100% because things change. Even with perfect data, we want you to always confirm with restaurant staff. Your health is too important to leave to chance.</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowExplain(false)} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Got it</button>
            </div>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowVerifyModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[500px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Verify The Italian Kitchen</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Confirm safety based on your personal visit</p>
            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">What dish did you order?</div>
                <input type="text" value={verifyDish} onChange={(e) => setVerifyDish(e.target.value)} placeholder="e.g. Gluten-Free Pasta Primavera" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Star rating for allergen safety: <span className="text-admin-vip-text font-semibold">{verifyRating}/5</span></div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setVerifyRating(n)}
                      className={`text-[28px] transition-transform hover:scale-110 ${n <= verifyRating ? "text-admin-vip-text" : "text-admin-border"}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Your experience</div>
                <textarea rows={4} value={verifyText} onChange={(e) => setVerifyText(e.target.value)} placeholder="Describe staff knowledge, cross-contamination procedures, what you ate..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[12px] text-admin-muted">Confidence level: <span className="text-admin-active-text font-bold">{verifyConfidence}/10</span></div>
                </div>
                <input type="range" min="1" max="10" value={verifyConfidence} onChange={(e) => setVerifyConfidence(parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between text-[10px] text-admin-muted mt-0.5">
                  <span>1 — Not confident</span>
                  <span>10 — Very confident</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowVerifyModal(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleVerify}
                disabled={!verifyText.trim() || !verifyDish.trim()}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
              >
                Publish verification
              </button>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <RestaurantReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={() => { setShowReportModal(false); setReportSubmitted(true); }}
        />
      )}

      {showBookModal && (
        <BookTableModal
          restaurantId="rest_the_italian_kitchen"
          restaurantName="The Italian Kitchen"
          restaurantEmoji="🍝"
          userName="Sarah Mitchell"
          userRestriction="Celiac"
          onClose={() => setShowBookModal(false)}
        />
      )}
    </div>
  );
}

function RestaurantReportModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmit = () => {
    if (!type || !description.trim()) return;
    onSubmit();
    notifyUser("Report submitted for The Italian Kitchen", "/user/notifications");
    notifyAdmin("⚠ New report for The Italian Kitchen — " + type, "/admin/disputes");
    setType("");
    setDescription("");
    setContactEmail("");
  };

  const reportTypes = ["Menu change", "Cross-contamination issue", "Had a reaction", "Wrong info on DietaryID", "Closed permanently", "Other"];

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-[17px] font-semibold text-admin-text mb-3">⚐ Report a concern</h3>
        <div className="space-y-1.5 mb-3">
          {reportTypes.map((r) => (
            <label key={r} className={`flex items-center gap-2 p-2.5 rounded-md cursor-pointer transition-colors ${type === r ? "bg-admin-active-bg border border-admin-dark" : "hover:bg-admin-hover border border-admin-border"}`}>
              <input
                type="radio"
                name="restaurant-report"
                checked={type === r}
                onChange={() => setType(r)}
                className="w-4 h-4"
              />
              <span className="text-[13.5px] text-admin-text">{r}</span>
            </label>
          ))}
        </div>
        <div className="mb-3">
          <div className="text-[12px] text-admin-muted mb-1">Description (required)</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Tell us what happened so we can investigate..."
            className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none resize-none"
          />
        </div>
        <div className="mb-3">
          <div className="text-[12px] text-admin-muted mb-1">Contact email (optional — for follow-up)</div>
          <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@email.com" className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!type || !description.trim()}
            className="text-[13px] px-4 py-2 rounded-md bg-admin-non-text text-white hover:opacity-90 disabled:opacity-50"
          >
            Submit report
          </button>
        </div>
      </div>
    </div>
  );
}
