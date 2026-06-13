"use client";

import { useState } from "react";

type Review = {
  id: string;
  author: string;
  restriction: string;
  rating: number;
  time: string;
  text: string;
  helpful: number;
  responded: boolean;
  response?: string;
  concerning?: boolean;
};

const initialReviews: Review[] = [
  { id: "r_001", author: "Sarah M.", restriction: "Has Celiac", rating: 5, time: "2 days ago", text: "Excellent cross-contamination procedures. Staff was knowledgeable and took my allergy seriously. Highly recommend!", helpful: 12, responded: true, response: "Thank you Sarah! We appreciate your trust. Hope to see you soon!" },
  { id: "r_002", author: "Mike H.", restriction: "Has Gluten-free", rating: 4, time: "5 days ago", text: "Great options, but I'd suggest labeling the gluten-free items more clearly.", helpful: 5, responded: false, concerning: false },
  { id: "r_003", author: "Jordan L.", restriction: "Nut allergy", rating: 5, time: "1 week ago", text: "Best nut-free restaurant in Manchester. Staff super careful. Worth the trip!", helpful: 8, responded: true, response: "Thanks Jordan! We take nut allergies very seriously. See you next time!" },
  { id: "r_004", author: "Emma C.", restriction: "Multiple", rating: 2, time: "2 weeks ago", text: "Had a reaction after eating here. Staff said the nuts were 'just a little bit' which wasn't acceptable for my severe allergy.", helpful: 15, responded: false, concerning: true },
  { id: "r_005", author: "David L.", restriction: "Celiac", rating: 5, time: "3 weeks ago", text: "Finally a restaurant that takes celiac seriously! The dedicated prep area is a game-changer.", helpful: 22, responded: true, response: "We're so glad you felt safe here, David!" },
];

const ratingBreakdown = [
  { label: "Safe for Celiac", rating: "4.8", count: 23 },
  { label: "Safe for Gluten-Free", rating: "4.6", count: 12 },
  { label: "Safe for Nut Allergy", rating: "4.9", count: 8 },
  { label: "Safe for IBS", rating: "4.3", count: 4 },
];

export default function RestaurantReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState<"all" | "responded" | "not-responded" | "concerning">("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = reviews.filter((r) => {
    if (filter === "all") return true;
    if (filter === "responded") return r.responded;
    if (filter === "not-responded") return !r.responded;
    if (filter === "concerning") return r.concerning;
    return true;
  });

  const positive = reviews.filter((r) => r.rating >= 4).length;
  const neutral = reviews.filter((r) => r.rating === 3).length;
  const concerning = reviews.filter((r) => r.rating <= 2).length;
  const responseRate = Math.round((reviews.filter((r) => r.responded).length / reviews.length) * 100);

  const handleSubmitReply = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, responded: true, response: replyText } : r)));
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Customer Reviews</h1>
        <p className="text-[14px] text-admin-muted">See what customers say and manage your responses.</p>
      </div>

      {/* Summary cards */}
      <div className="px-[26px] py-4 border-b border-admin-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Overall Rating</div>
            <div className="text-[22px] font-semibold text-admin-text">⭐ 4.8 <span className="text-[13px] text-admin-muted font-normal">(47 reviews)</span></div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Response Rate</div>
            <div className="text-[22px] font-semibold text-admin-text">{responseRate}%</div>
            <div className="text-[12px] text-admin-active-text mt-1">{reviews.filter((r) => r.responded).length} of {reviews.length} responded</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Sentiment</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-2 flex-1 rounded-full bg-admin-active-text" style={{ width: `${(positive / reviews.length) * 100}%` }} />
              <div className="h-2 flex-1 rounded-full bg-admin-vip-text" style={{ width: `${(neutral / reviews.length) * 100}%` }} />
              <div className="h-2 flex-1 rounded-full bg-admin-non-text" style={{ width: `${(concerning / reviews.length) * 100}%` }} />
            </div>
            <div className="text-[11px] text-admin-muted mt-1">✓ {positive} · → {neutral} · ✗ {concerning}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Unresponded</div>
            <div className="text-[22px] font-semibold text-admin-vip-text">{reviews.filter((r) => !r.responded).length}</div>
            <div className="text-[12px] text-admin-muted mt-1">Need attention</div>
          </div>
        </div>
      </div>

      {/* Rating breakdown */}
      <div className="px-[26px] py-4 border-b border-admin-border">
        <h2 className="text-[14px] font-semibold text-admin-text mb-2">Ratings by Allergy Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ratingBreakdown.map((r) => (
            <div key={r.label} className="bg-admin-hover rounded-md p-3">
              <div className="text-[12px] text-admin-muted">{r.label}</div>
              <div className="text-[16px] font-semibold text-admin-text">⭐ {r.rating} <span className="text-[12px] text-admin-muted">({r.count})</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 py-[14px] px-[26px] border-b border-admin-border">
        {(["all", "not-responded", "responded", "concerning"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
              filter === f ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
            }`}
          >
            {f === "all" ? "All" : f === "not-responded" ? "Not responded" : f === "responded" ? "Responded" : " Concerning"}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="px-[26px] py-6">
        <div className="space-y-3 max-w-[900px]">
          {filtered.map((r) => (
            <div key={r.id} className={`bg-admin-bg border rounded-[10px] p-5 ${r.concerning ? "border-admin-non-text" : "border-admin-border"}`}>
              {r.concerning && (
                <div className="text-[12px] text-admin-non-text font-semibold mb-2">⚠️ CONCERNING REVIEW</div>
              )}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[15px] font-semibold text-admin-text">{r.author}</span>
                <span className="text-[12px] text-admin-muted">| {r.restriction}</span>
                <span className="text-[13px] text-admin-vip-text">{"⭐".repeat(r.rating)}</span>
                <span className="text-[12px] text-admin-muted ml-auto">{r.time}</span>
              </div>
              <p className="text-[14px] text-admin-nav-text italic mb-2">"{r.text}"</p>
              <p className="text-[12px] text-admin-muted mb-3">Helpful: {r.helpful} people found this helpful</p>

              {r.responded && r.response && (
                <div className="bg-admin-hover rounded-md p-3 text-[13px] text-admin-text mb-2">
                  <span className="font-medium">✓ Responded:</span> "{r.response}"
                </div>
              )}

              {replyingTo === r.id ? (
                <div className="mt-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={3}
                    placeholder="Thank you for the feedback..."
                    className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-2 outline-none focus:ring-2 focus:ring-admin-new-bg bg-admin-bg"
                    maxLength={500}
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
                <div className="flex items-center gap-2">
                  {!r.responded && (
                    <button
                      onClick={() => setReplyingTo(r.id)}
                      className={`text-[13px] px-3 py-1.5 rounded-md ${
                        r.concerning ? "bg-admin-non-text text-white hover:opacity-90" : "bg-admin-dark text-white hover:opacity-90"
                      }`}
                    >
                      {r.concerning ? "Respond Immediately" : "Respond"}
                    </button>
                  )}
                  {r.responded && (
                    <button
                      onClick={() => setReplyingTo(r.id)}
                      className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      Reply Again
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
