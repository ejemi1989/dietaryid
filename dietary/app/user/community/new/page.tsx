"use client";

import { useState } from "react";
import Link from "next/link";
import { notifyUser } from "@/lib/notifications";

const tagOptions = ["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free", "Soy-Free", "Egg-Free", "Shellfish-Free", "Low FODMAP", "Crohn's", "IBS", "Vegan", "Vegetarian", "Travel", "Hidden allergens", "Cross-contamination", "Restaurants abroad", "New restaurant", "Warning", "Local gems"];

const restaurants = [
  { id: "r1", name: "The Italian Kitchen", emoji: "🍝" },
  { id: "r2", name: "Fresh Bowl", emoji: "🥗" },
  { id: "r3", name: "Sakura Sushi", emoji: "🍣" },
  { id: "r4", name: "The Vegan Table", emoji: "🥬" },
  { id: "r5", name: "Pizza Roma", emoji: "🍕" },
];

export default function NewCommunityPostPage() {
  const [postType, setPostType] = useState<"question" | "recommendation" | "tip" | "win" | "warning" | "support">("question");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>(["Celiac"]);
  const [tagInput, setTagInput] = useState("");
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [taggedRestaurant, setTaggedRestaurant] = useState<typeof restaurants[0] | null>(null);
  const [taggedDish, setTaggedDish] = useState("");
  const [dishInput, setDishInput] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "restriction" | "friends">("public");
  const [photos, setPhotos] = useState<string[]>([]);
  const [showDraft, setShowDraft] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredRestaurants = restaurants.filter((r) => r.name.toLowerCase().includes(restaurantSearch.toLowerCase()));

  const canSubmit = title.trim().length > 5 && content.trim().length > 20;

  const handleAddTag = (t: string) => {
    if (tags.includes(t)) {
      setTags((prev) => prev.filter((x) => x !== t));
    } else {
      setTags((prev) => [...prev, t]);
    }
  };

  const handleAddCustomTag = () => {
    const t = tagInput.trim();
    if (!t || tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const handleAddPhoto = () => {
    if (photos.length >= 5) return;
    const emojis = ["🍽️", "🥗", "🍕", "🍝", "🍣", "🥑", "📸"];
    setPhotos((p) => [...p, emojis[Math.floor(Math.random() * emojis.length)]]);
  };

  const handleSaveDraft = () => {
    setShowDraft(true);
    setDraftSaved(true);
    setTimeout(() => { setShowDraft(false); setDraftSaved(false); }, 2000);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setShowSuccess(true);
    notifyUser("Your post was published to DietaryID community", "/user/community");
    setTimeout(() => {
      window.location.href = "/user/community";
    }, 2200);
  };

  const charCount = (n: number, max: number) => `${n}/${max}`;

  return (
    <div className="flex-1 overflow-y-auto">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 max-w-[440px] w-full text-center">
            <div className="text-[64px] mb-3">
              {postType === "question" ? "❓" : postType === "recommendation" ? "🍽️" : postType === "tip" ? "💡" : postType === "win" ? "🎉" : postType === "warning" ? "⚠️" : "💪"}
            </div>
            <h3 className="text-[20px] font-semibold text-admin-text mb-2">Posted to the community!</h3>
            <p className="text-[13.5px] text-admin-muted mb-3">Your post is now visible to {privacy === "public" ? "everyone in DietaryID" : privacy === "restriction" ? "people with your allergies" : "your friends"}.</p>
            <div className="text-[12.5px] text-admin-active-text">Redirecting to community...</div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/user/community" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">
          ← Back to community
        </Link>
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Share with the community</h1>
        <p className="text-[13.5px] text-admin-muted">Ask, recommend, warn, or share wins. Real experiences from people with your allergies.</p>
      </div>

      <div className="px-[26px] py-6 max-w-[700px] mx-auto">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <div className="mb-5">
            <h2 className="text-[14px] font-semibold text-admin-text mb-2">Post type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {([
                { v: "question", l: "Question", emoji: "❓", desc: "Ask for advice" },
                { v: "recommendation", l: "Recommendation", emoji: "🍽️", desc: "Share a great spot" },
                { v: "tip", l: "Tip / Hack", emoji: "💡", desc: "Helpful insight" },
                { v: "win", l: "Celebration", emoji: "🎉", desc: "Share a victory" },
                { v: "warning", l: "Warning", emoji: "⚠️", desc: "Heads up" },
                { v: "support", l: "Advice", emoji: "💪", desc: "Get support" },
              ] as const).map((t) => (
                <button
                  key={t.v}
                  onClick={() => setPostType(t.v)}
                  className={`p-2.5 rounded-md border text-left transition-colors ${
                    postType === t.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                  }`}
                >
                  <div className="text-[20px] mb-0.5">{t.emoji}</div>
                  <div className="text-[13px] text-admin-text font-medium">{t.l}</div>
                  <div className="text-[10.5px] text-admin-muted">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[12.5px] font-medium text-admin-text">Title</label>
              <span className="text-[11.5px] text-admin-muted">{charCount(title.length, 100)}</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              maxLength={100}
              placeholder="What's on your mind?"
              className="w-full px-3.5 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[12.5px] font-medium text-admin-text">Content</label>
              <span className="text-[11.5px] text-admin-muted">{charCount(content.length, 2000)}</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 2000))}
              rows={6}
              placeholder="Share your experience, question, or advice..."
              className="w-full px-3.5 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
            />
            <div className="flex items-center gap-1 mt-1.5 text-[11.5px] text-admin-muted">
              <span>Format:</span>
              <button onClick={() => setContent((c) => c + "**bold**")} className="px-1.5 py-0.5 rounded hover:bg-admin-hover font-bold">B</button>
              <button onClick={() => setContent((c) => c + "*italic*")} className="px-1.5 py-0.5 rounded hover:bg-admin-hover italic">I</button>
              <button onClick={() => setContent((c) => c + "[link](https://)")} className="px-1.5 py-0.5 rounded hover:bg-admin-hover">🔗</button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[12.5px] font-medium text-admin-text mb-2">Tags (your restrictions)</label>
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              {tagOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => handleAddTag(t)}
                  className={`text-[12.5px] px-2.5 py-1 rounded-md border transition-colors ${
                    tags.includes(t) ? "border-admin-dark bg-admin-active-bg text-admin-active-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                  }`}
                >
                  {tags.includes(t) ? "✓ " : ""}{t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomTag())}
                placeholder="Add custom tag..."
                className="flex-1 px-2.5 py-1 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
              <button onClick={handleAddCustomTag} className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">+ Add</button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 text-[12px] text-admin-muted">
                Selected: {tags.map((t) => `"${t}"`).join(", ")}
              </div>
            )}
          </div>

          {postType === "recommendation" && (
            <div className="mb-4 p-3 rounded-md border border-admin-border bg-admin-hover">
              <h3 className="text-[13px] font-semibold text-admin-text mb-2">🏪 Tag a restaurant</h3>
              <div className="relative mb-2">
                <input
                  type="text"
                  value={restaurantSearch}
                  onChange={(e) => setRestaurantSearch(e.target.value)}
                  placeholder="Search restaurants..."
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                />
                {restaurantSearch && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-admin-bg border border-admin-border rounded-md shadow-lg z-10 max-h-[180px] overflow-y-auto">
                    {filteredRestaurants.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => { setTaggedRestaurant(r); setRestaurantSearch(""); }}
                        className="w-full flex items-center gap-2 p-2 text-left hover:bg-admin-hover"
                      >
                        <span className="text-[18px]">{r.emoji}</span>
                        <span className="text-[13px] text-admin-text">{r.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {taggedRestaurant && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-admin-bg border border-admin-border mb-2">
                  <span className="text-[20px]">{taggedRestaurant.emoji}</span>
                  <span className="text-[13px] text-admin-text flex-1">{taggedRestaurant.name}</span>
                  <button onClick={() => setTaggedRestaurant(null)} className="text-admin-muted hover:text-admin-non-text">✕</button>
                </div>
              )}
              <h3 className="text-[13px] font-semibold text-admin-text mb-1.5">🍽️ Tag a specific dish (optional)</h3>
              <input
                type="text"
                value={dishInput}
                onChange={(e) => setTaggedDish(e.target.value)}
                placeholder="e.g. Quinoa Power Bowl"
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[12.5px] font-medium text-admin-text mb-2">Photos (optional, max 5)</label>
            <div className="flex items-center gap-2 flex-wrap">
              {photos.map((p, i) => (
                <div key={i} className="relative w-16 h-16 bg-admin-bg rounded-md flex items-center justify-center text-[32px] border border-admin-border">
                  {p}
                  <button onClick={() => setPhotos((ph) => ph.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-admin-non-text text-white text-[11px] flex items-center justify-center">✕</button>
                </div>
              ))}
              {photos.length < 5 && (
                <button onClick={handleAddPhoto} className="w-16 h-16 border-2 border-dashed border-admin-border rounded-md flex flex-col items-center justify-center text-admin-muted hover:border-admin-dark hover:text-admin-text">
                  <span className="text-[18px]">+</span>
                  <span className="text-[9px]">add</span>
                </button>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[12.5px] font-medium text-admin-text mb-2">Privacy</label>
            <div className="space-y-1.5">
              {[
                { v: "public", l: "Public", desc: "Visible to everyone in the DietaryID community" },
                { v: "restriction", l: "Restriction type only", desc: "Visible to people with your same allergies" },
                { v: "friends", l: "Friends only", desc: "Only people you follow and who follow you" },
              ].map((p) => (
                <label
                  key={p.v}
                  className={`flex items-start gap-2.5 p-2.5 rounded-md border cursor-pointer ${
                    privacy === p.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                  }`}
                >
                  <input
                    type="radio"
                    checked={privacy === p.v}
                    onChange={() => setPrivacy(p.v as typeof privacy)}
                    className="w-4 h-4 mt-0.5"
                  />
                  <div>
                    <div className="text-[13px] text-admin-text font-medium">{p.l}</div>
                    <div className="text-[11.5px] text-admin-muted">{p.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-md bg-admin-hover mb-5">
            <h3 className="text-[12.5px] font-semibold text-admin-text mb-2">Preview</h3>
            <div className="bg-admin-bg border border-admin-border rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <img src="https://i.pravatar.cc/80?img=12" alt="" className="w-7 h-7 rounded-full" />
                <span className="text-[13px] font-semibold text-admin-text">Sarah Mitchell</span>
                <span className="text-[11.5px] text-admin-muted">| Has Celiac</span>
                <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text ml-auto">
                  {postType === "question" ? "❓ Question" : postType === "recommendation" ? "🍽️ Recommendation" : postType === "tip" ? "💡 Tip" : postType === "win" ? "🎉 Win" : postType === "warning" ? "⚠️ Warning" : "💪 Support"}
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-admin-text mb-1">{title || "(Your title)"}</h4>
              <p className="text-[13px] text-admin-nav-text mb-2">{content || "(Your content)"}</p>
              {taggedRestaurant && (
                <div className="inline-flex items-center gap-2 text-[12px] px-2 py-1 rounded bg-admin-hover mb-1.5">
                  <span>🏪</span>
                  <span className="text-admin-text">{taggedRestaurant.name}{taggedDish && ` · ${taggedDish}`}</span>
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {tags.map((t) => (
                    <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-nav-text">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                {draftSaved ? "✓ Draft saved" : "💾 Save as draft"}
              </button>
              {showDraft && <span className="text-[12px] text-admin-active-text">Saved to drafts</span>}
            </div>
            <div className="flex items-center gap-2">
              <Link href="/user/community" className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">Cancel</Link>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="text-[14px] px-5 py-2.5 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Post to community
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-md bg-admin-active-bg">
          <h3 className="text-[12.5px] font-semibold text-admin-text mb-1">Community guidelines</h3>
          <ul className="text-[11.5px] text-admin-text space-y-0.5">
            <li>✓ Be kind — we&apos;re all figuring this out together</li>
            <li>✓ Share honestly — your truth helps others</li>
            <li>✓ Respect privacy — no sharing others&apos; medical info</li>
            <li>✗ No medical advice — share experiences, not prescriptions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
