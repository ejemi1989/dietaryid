"use client";

import { useState } from "react";
import Link from "next/link";
import { notifyUser, notifyAdmin } from "@/lib/notifications";

type Review = {
  id: string;
  restaurant: string;
  emoji: string;
  cuisine: string;
  rating: number;
  date: string;
  text: string;
  dish: string;
  helpful: number;
  views: number;
  safetyScore: number;
  status: "published" | "draft";
};

const initialReviews: Review[] = [
  { id: "r1", restaurant: "The Healthy Bowl Co", emoji: "🥗", cuisine: "Mediterranean", rating: 5, date: "2 weeks ago", text: "Excellent! Dedicated GF prep area, knowledgeable staff. Best in Manchester for sure.", dish: "Quinoa Power Bowl", helpful: 23, views: 342, safetyScore: 94, status: "published" },
  { id: "r2", restaurant: "Bella Italia", emoji: "🍝", cuisine: "Italian", rating: 4, date: "1 month ago", text: "Good GF pasta options. They have a separate menu which is helpful. Staff was responsive about cross-contamination.", dish: "Gluten-Free Pasta", helpful: 12, views: 187, safetyScore: 87, status: "published" },
  { id: "r3", restaurant: "The Italian Kitchen", emoji: "🍕", cuisine: "Italian", rating: 5, date: "2 months ago", text: "Pizza was amazing. Dedicated GF oven. Will definitely return. Highly recommend for Celiac.", dish: "GF Margherita", helpful: 18, views: 256, safetyScore: 96, status: "published" },
  { id: "r4", restaurant: "Sakura Sushi", emoji: "🍣", cuisine: "Japanese", rating: 3, date: "Draft", text: "Good sashimi options but communication was unclear. Need to specify no soy sauce. Working on full review.", dish: "Sashimi Platter", helpful: 0, views: 0, safetyScore: 0, status: "draft" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editDish, setEditDish] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handlePublishDraft = (id: string) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: "published" as const, date: "Just now" } : r));
  };

  const handleStartEdit = (r: Review) => {
    setEditingId(r.id);
    setEditText(r.text);
    setEditRating(r.rating);
    setEditDish(r.dish);
  };

  const handleSaveEdit = (id: string) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, text: editText, rating: editRating, dish: editDish } : r));
    setEditingId(null);
    notifyUser("Review updated", "/user/reviews");
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setConfirmDelete(null);
    notifyUser("Review deleted");
  };

  const handleNewReview = () => {
    if (!newRestaurant.trim() || !newText.trim()) return;
    const newReview: Review = {
      id: `r_${Date.now()}`,
      restaurant: newRestaurant,
      emoji: "🍽️",
      cuisine: "Various",
      rating: newRating,
      date: "Just now",
      text: newText,
      dish: "Various dishes",
      helpful: 0,
      views: 0,
      safetyScore: 90,
      status: "published",
    };
    setReviews((prev) => [newReview, ...prev]);
    setShowNewModal(false);
    setNewRestaurant("");
    setNewText("");
    notifyUser("New review published for " + newRestaurant, "/user/reviews");
    notifyAdmin("New review from Sarah Mitchell for " + newRestaurant, "/admin/moderation/reviews");
  };

  const filtered = reviews.filter((r) => filter === "all" || r.status === filter);
  const totalHelpful = reviews.reduce((s, r) => s + r.helpful, 0);
  const totalViews = reviews.reduce((s, r) => s + r.views, 0);
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">My Reviews ⭐</h1>
            <p className="text-[13.5px] text-admin-muted">Reviews you&apos;ve written and their impact</p>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="text-[14px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 font-medium"
          >
            + Write a new review
          </button>
        </div>
      </div>

      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setShowNewModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-3">Write a new review</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Restaurant</div>
                <input type="text" value={newRestaurant} onChange={(e) => setNewRestaurant(e.target.value)} placeholder="Search restaurants..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Rating (1-5)</div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNewRating(n)}
                      className={`text-[26px] ${n <= newRating ? "text-admin-vip-text" : "text-admin-border"}`}
                    >⭐</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Your review</div>
                <textarea value={newText} onChange={(e) => setNewText(e.target.value)} rows={5} placeholder="Describe the dish, staff, cross-contamination procedures..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowNewModal(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button onClick={handleNewReview} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Publish review</button>
            </div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Total reviews</div>
            <div className="text-[24px] font-semibold text-admin-text">{reviews.length}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Helpful votes</div>
            <div className="text-[24px] font-semibold text-admin-text">{totalHelpful}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Profile views</div>
            <div className="text-[24px] font-semibold text-admin-text">{totalViews.toLocaleString()}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Avg rating</div>
            <div className="text-[24px] font-semibold text-admin-text">⭐ {avgRating}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[
            { v: "all", l: `All (${reviews.length})` },
            { v: "published", l: `Published (${reviews.filter((r) => r.status === "published").length})` },
            { v: "draft", l: `Drafts (${reviews.filter((r) => r.status === "draft").length})` },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v as typeof filter)}
              className={`text-[12.5px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
              }`}
            >
              {f.l}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 text-center">
              <div className="text-[40px] mb-2">📝</div>
              <p className="text-[14px] text-admin-muted">No reviews in this category</p>
            </div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-[32px]">{r.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Link href={`/user/verify?restaurant=${r.id}`} className="text-[15px] font-semibold text-admin-text no-underline hover:underline">{r.restaurant}</Link>
                      <span className="text-[12px] text-admin-muted">· {r.cuisine}</span>
                      <span className="text-[13px] text-admin-vip-text">{"⭐".repeat(r.rating)}</span>
                      <span className="text-[12px] text-admin-muted ml-auto">{r.date}</span>
                    </div>
                    <div className="text-[12.5px] text-admin-muted">Re: {r.dish}</div>
                  </div>
                  {r.status === "draft" ? (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text font-medium">DRAFT</span>
                  ) : (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">PUBLISHED</span>
                  )}
                </div>

                {editingId === r.id ? (
                  <div className="space-y-2 mt-2 pt-3 border-t border-admin-border">
                    <div>
                      <div className="text-[11.5px] text-admin-muted mb-1">Dish</div>
                      <input type="text" value={editDish} onChange={(e) => setEditDish(e.target.value)} className="w-full px-3 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                    </div>
                    <div>
                      <div className="text-[11.5px] text-admin-muted mb-1">Rating</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} onClick={() => setEditRating(n)} className={`text-[26px] ${n <= editRating ? "text-admin-vip-text" : "text-admin-border"}`}>⭐</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11.5px] text-admin-muted mb-1">Review text</div>
                      <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={4} className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none" />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditingId(null)} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                      <button onClick={() => handleSaveEdit(r.id)} className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90">Save changes</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[14px] text-admin-nav-text mb-3">&ldquo;{r.text}&rdquo;</p>

                    {r.status === "published" && (
                      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                        <div className="bg-admin-hover rounded-md p-2">
                          <div className="text-[12px] text-admin-muted">Helpful</div>
                          <div className="text-[16px] font-semibold text-admin-text">👍 {r.helpful}</div>
                        </div>
                        <div className="bg-admin-hover rounded-md p-2">
                          <div className="text-[12px] text-admin-muted">Views</div>
                          <div className="text-[16px] font-semibold text-admin-text">{r.views}</div>
                        </div>
                        <div className="bg-admin-hover rounded-md p-2">
                          <div className="text-[12px] text-admin-muted">Safety</div>
                          <div className="text-[16px] font-semibold text-admin-active-text">{r.safetyScore}%</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                      {r.status === "draft" ? (
                        <button
                          onClick={() => handlePublishDraft(r.id)}
                          className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
                        >
                          Publish draft
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(r)}
                          className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                        >
                          Edit
                        </button>
                      )}
                      <Link
                        href={`/user/verify?restaurant=${r.id}`}
                        className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover"
                      >
                        View on restaurant
                      </Link>
                      {confirmDelete === r.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-non-text text-white hover:opacity-90"
                          >
                            Confirm delete
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(r.id)}
                          className="text-[12.5px] px-3 py-1.5 rounded-md text-admin-non-text hover:bg-admin-non-bg"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
