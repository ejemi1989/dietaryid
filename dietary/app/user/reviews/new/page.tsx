"use client";

import { useState } from "react";
import Link from "next/link";
import { notifyUser, notifyAdmin, notifyRestaurant } from "@/lib/notifications";

type Step = 0 | 1 | 2 | 3;

const restaurants = [
  { id: "r1", name: "The Italian Kitchen", emoji: "🍝", cuisine: "Italian", safety: 96 },
  { id: "r2", name: "Fresh Bowl", emoji: "🥗", cuisine: "Mediterranean", safety: 93 },
  { id: "r3", name: "Sakura Sushi", emoji: "🍣", cuisine: "Japanese", safety: 78 },
  { id: "r4", name: "The Vegan Table", emoji: "🥬", cuisine: "Vegan", safety: 91 },
  { id: "r5", name: "Pizza Roma", emoji: "🍕", cuisine: "Italian", safety: 88 },
  { id: "r6", name: "Spice Route", emoji: "🍛", cuisine: "Indian", safety: 82 },
];

const dishesByRestaurant: Record<string, { name: string; emoji: string; safety: number }[]> = {
  r1: [
    { name: "Gluten-Free Pasta Primavera", emoji: "🍝", safety: 96 },
    { name: "Risotto ai Funghi (GF)", emoji: "🍚", safety: 92 },
    { name: "Grilled Salmon", emoji: "🐟", safety: 95 },
  ],
  r2: [
    { name: "Quinoa Power Bowl", emoji: "🥗", safety: 93 },
    { name: "Falafel Wrap (GF)", emoji: "🌯", safety: 88 },
    { name: "Grilled Salmon Plate", emoji: "🐟", safety: 91 },
  ],
  r3: [
    { name: "Sashimi Platter (no soy)", emoji: "🍣", safety: 78 },
    { name: "Edamame", emoji: "🫛", safety: 90 },
  ],
  r4: [
    { name: "Buddha Bowl", emoji: "🥬", safety: 91 },
    { name: "Vegan Pad Thai (GF)", emoji: "🍜", safety: 85 },
    { name: "Coconut Curry", emoji: "🍛", safety: 89 },
  ],
  r5: [
    { name: "GF Margherita", emoji: "🍕", safety: 88 },
    { name: "Cauliflower Crust Pizza", emoji: "🥦", safety: 86 },
  ],
  r6: [
    { name: "Chicken Tikka Masala (GF)", emoji: "🍗", safety: 82 },
    { name: "Lamb Biryani", emoji: "🍖", safety: 85 },
  ],
};

export default function NewReviewPage() {
  const [step, setStep] = useState<Step>(0);
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null);
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [visitDate, setVisitDate] = useState("");
  const [rating, setRating] = useState(5);
  const [safetyRating, setSafetyRating] = useState(9);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [crossContamination, setCrossContamination] = useState("");
  const [staffKnowledge, setStaffKnowledge] = useState(4);
  const [modifications, setModifications] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [wouldReturn, setWouldReturn] = useState<"yes" | "no" | "maybe" | "">("");
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredRestaurants = restaurants.filter((r) => r.name.toLowerCase().includes(restaurantSearch.toLowerCase()));
  const availableDishes = selectedRestaurant ? dishesByRestaurant[selectedRestaurant.id] || [] : [];

  const tagOptions = ["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free", "Vegan", "Vegetarian", "Excellent staff", "Dedicated prep area", "Good value", "Worth the trip", "Cozy", "Date night", "Family-friendly", "Quick service"];

  const canProceed = () => {
    if (step === 0) return !!selectedRestaurant;
    if (step === 1) return !!visitDate;
    if (step === 2) return title.trim().length > 5 && text.trim().length > 20;
    if (step === 3) return wouldReturn !== "";
    return false;
  };

  const handleAddTag = (t: string) => {
    setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  const handleAddPhoto = () => {
    if (photos.length >= 5) return;
    const emojis = ["🍽️", "🥗", "🍕", "🍝", "🍣", "🥑"];
    setPhotos((p) => [...p, emojis[Math.floor(Math.random() * emojis.length)]]);
  };

  const handleSubmit = () => {
    if (!canProceed()) return;
    setShowSuccess(true);
    const resto = selectedRestaurant?.name || "this restaurant";
    notifyUser("Review published for " + resto, "/user/reviews");
    notifyAdmin("New review from Sarah Mitchell for " + resto, "/admin/moderation/reviews");
    notifyRestaurant("New review from Sarah Mitchell · " + rating + "★", "/restaurant/reviews");
    setTimeout(() => {
      window.location.href = "/user/reviews";
    }, 2200);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 max-w-[440px] w-full text-center">
            <div className="text-[64px] mb-3">🎉</div>
            <h3 className="text-[20px] font-semibold text-admin-text mb-2">Review published!</h3>
            <p className="text-[13.5px] text-admin-muted mb-3">Your review will help {selectedRestaurant?.name || "this restaurant"} be found by people with your allergies.</p>
            <div className="text-[12.5px] text-admin-active-text">Redirecting to your reviews...</div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/user/reviews" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">
          ← Back to reviews
        </Link>
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Write a review ✍️</h1>
        <p className="text-[13.5px] text-admin-muted">Help others eat safely by sharing your honest experience.</p>
      </div>

      <div className="px-[26px] py-4 border-b border-admin-border">
        <div className="flex items-center gap-1.5 max-w-[700px] mx-auto">
          {["Restaurant", "Visit", "Your review", "Details"].map((label, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-colors ${
                  i < step ? "bg-admin-active-text text-white" :
                  i === step ? "bg-admin-dark text-white" :
                  "bg-admin-hover text-admin-muted"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[12.5px] hidden sm:inline ${i === step ? "text-admin-text font-medium" : "text-admin-muted"}`}>{label}</span>
              {i < 3 && <div className={`flex-1 h-0.5 ${i < step ? "bg-admin-active-text" : "bg-admin-border"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="px-[26px] py-6 max-w-[700px] mx-auto">
        {step === 0 && (
          <div>
            <h2 className="text-[18px] font-semibold text-admin-text mb-1">Which restaurant did you visit?</h2>
            <p className="text-[12.5px] text-admin-muted mb-4">Search for a restaurant in our database. Can&apos;t find it? <button className="text-admin-new-text hover:underline">Add a new one</button>.</p>
            <div className="relative mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-admin-muted">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={restaurantSearch}
                onChange={(e) => setRestaurantSearch(e.target.value)}
                placeholder="Search restaurants..."
                className="w-full pl-8 pr-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
            </div>
            <div className="space-y-2">
              {filteredRestaurants.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedRestaurant(r); setSelectedDish(""); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-md border text-left transition-colors ${
                    selectedRestaurant?.id === r.id ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                  }`}
                >
                  <div className="text-[28px]">{r.emoji}</div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-admin-text">{r.name}</div>
                    <div className="text-[12px] text-admin-muted">{r.cuisine} · ✓ {r.safety}% safe</div>
                  </div>
                  {selectedRestaurant?.id === r.id && <span className="text-admin-dark text-[18px]">✓</span>}
                </button>
              ))}
              {filteredRestaurants.length === 0 && (
                <p className="text-[13px] text-admin-muted text-center py-4">No restaurants match &ldquo;{restaurantSearch}&rdquo;</p>
              )}
            </div>

            {selectedRestaurant && (
              <div className="mt-5 pt-5 border-t border-admin-border">
                <h3 className="text-[14px] font-semibold text-admin-text mb-2">What did you order? (optional)</h3>
                <p className="text-[12px] text-admin-muted mb-3">Pick the dish you ate, or skip if you don&apos;t remember.</p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedDish("")}
                    className={`w-full text-left p-2.5 rounded-md border text-[13px] ${
                      !selectedDish ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                    }`}
                  >
                    <span className="text-admin-text">Skip — review the restaurant overall</span>
                  </button>
                  {availableDishes.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => setSelectedDish(d.name)}
                      className={`w-full flex items-center gap-2 p-2.5 rounded-md border text-left ${
                        selectedDish === d.name ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                      }`}
                    >
                      <span className="text-[18px]">{d.emoji}</span>
                      <span className="text-[13px] text-admin-text flex-1">{d.name}</span>
                      <span className="text-[11.5px] text-admin-active-text">✓ {d.safety}%</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-[18px] font-semibold text-admin-text mb-1">When did you visit?</h2>
            <p className="text-[12.5px] text-admin-muted mb-4">This helps people see how recent the verification is.</p>
            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Visit date</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="px-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
            </div>
            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Overall rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)} className="text-[32px]">
                    <span className={n <= rating ? "text-admin-vip-text" : "text-admin-border"}>★</span>
                  </button>
                ))}
                <span className="text-[12.5px] text-admin-muted ml-2">{rating === 5 ? "Loved it" : rating === 4 ? "Good" : rating === 3 ? "OK" : rating === 2 ? "Disappointing" : "Avoid"}</span>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Allergen safety rating: <span className="text-admin-active-text font-bold">{safetyRating}/10</span></label>
              <p className="text-[11.5px] text-admin-muted mb-1.5">How confident are you that this is safe for your allergies?</p>
              <input
                type="range"
                min="1"
                max="10"
                value={safetyRating}
                onChange={(e) => setSafetyRating(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10.5px] text-admin-muted mt-1">
                <span>1 — Avoid</span>
                <span>5 — Verify with staff</span>
                <span>10 — Perfect</span>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Staff knowledge rating: <span className="text-admin-text font-bold">{staffKnowledge}/5</span></label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setStaffKnowledge(n)} className="text-[26px]">
                    <span className={n <= staffKnowledge ? "text-admin-vip-text" : "text-admin-border"}>★</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-[18px] font-semibold text-admin-text mb-1">Write your review</h2>
            <p className="text-[12.5px] text-admin-muted mb-4">Be specific — what did the staff do? Any modifications? Cross-contamination details?</p>

            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Title (max 100 chars)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                placeholder="e.g. &ldquo;Dedicated GF prep area, knowledgeable staff&rdquo;"
                className="w-full px-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
              <div className="text-[11.5px] text-admin-muted text-right mt-1">{title.length}/100</div>
            </div>

            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Your review (max 2000 chars)</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 2000))}
                rows={6}
                placeholder="Describe your experience in detail. What did you eat? How did staff handle your allergies? Any cross-contamination concerns?"
                className="w-full px-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
              />
              <div className="text-[11.5px] text-admin-muted text-right mt-1">{text.length}/2000</div>
            </div>

            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Cross-contamination notes</label>
              <textarea
                value={crossContamination}
                onChange={(e) => setCrossContamination(e.target.value)}
                rows={2}
                placeholder="e.g. Shared fryer with breaded items, dedicated prep area, etc."
                className="w-full px-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
              />
            </div>

            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Modifications available</label>
              <input
                type="text"
                value={modifications}
                onChange={(e) => setModifications(e.target.value)}
                placeholder="e.g. Can remove cheese, GF bread on request"
                className="w-full px-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
            </div>

            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-2">Tags (select all that apply)</label>
              <div className="flex items-center gap-1.5 flex-wrap">
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
            </div>

            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-admin-text mb-2">Add photos (max 5)</label>
              <div className="flex items-center gap-2 flex-wrap">
                {photos.map((p, i) => (
                  <div key={i} className="relative w-16 h-16 bg-admin-hover rounded-md flex items-center justify-center text-[32px]">
                    {p}
                    <button
                      onClick={() => setPhotos((ph) => ph.filter((_, idx) => idx !== i))}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-admin-non-text text-white text-[11px] flex items-center justify-center"
                    >✕</button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <button
                    onClick={handleAddPhoto}
                    className="w-16 h-16 border-2 border-dashed border-admin-border rounded-md flex flex-col items-center justify-center text-admin-muted hover:border-admin-dark hover:text-admin-text text-[18px]"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-[18px] font-semibold text-admin-text mb-1">Final details</h2>
            <p className="text-[12.5px] text-admin-muted mb-4">A few more details before publishing.</p>

            <div className="mb-4">
              <label className="block text-[13px] font-medium text-admin-text mb-2">Would you eat here again?</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: "yes", l: "Yes, definitely", emoji: "👍" },
                  { v: "maybe", l: "Maybe", emoji: "🤔" },
                  { v: "no", l: "Probably not", emoji: "👎" },
                ].map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setWouldReturn(o.v as typeof wouldReturn)}
                    className={`p-3 rounded-md border text-center transition-colors ${
                      wouldReturn === o.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                    }`}
                  >
                    <div className="text-[24px] mb-1">{o.emoji}</div>
                    <div className="text-[12.5px] text-admin-text font-medium">{o.l}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4 mb-4">
              <h3 className="text-[14px] font-semibold text-admin-text mb-3">Review preview</h3>
              <div className="border border-admin-border rounded-md p-3">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <img src="https://i.pravatar.cc/80?img=12" alt="" className="w-7 h-7 rounded-full" />
                  <span className="text-[13px] font-semibold text-admin-text">Sarah Mitchell</span>
                  <span className="text-[12px] text-admin-muted">| Has Celiac</span>
                  <span className="text-[12px] text-admin-vip-text ml-auto">{"★".repeat(rating)}</span>
                </div>
                {selectedRestaurant && (
                  <div className="text-[12px] text-admin-muted mb-1">Re: {selectedRestaurant.emoji} {selectedRestaurant.name} {selectedDish && `· ${selectedDish}`}</div>
                )}
                <h4 className="text-[15px] font-semibold text-admin-text mb-1">{title || "(Your title)"}</h4>
                <p className="text-[13px] text-admin-nav-text mb-2">{text || "(Your review text)"}</p>
                {tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {tags.map((t) => (
                      <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-nav-text">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-md bg-admin-active-bg mb-4">
              <span className="text-[18px]">💡</span>
              <p className="text-[12.5px] text-admin-text">
                <strong>Tip:</strong> Honest, specific reviews help people the most. Mention staff knowledge, cross-contamination, and what you ordered.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-admin-border">
          {step > 0 ? (
            <button onClick={() => setStep((s) => (s - 1) as Step)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">
              ← Back
            </button>
          ) : (
            <Link href="/user/reviews" className="text-[13px] text-admin-muted no-underline hover:text-admin-text">
              Cancel
            </Link>
          )}
          {step < 3 ? (
            <button
              onClick={() => canProceed() && setStep((s) => (s + 1) as Step)}
              disabled={!canProceed()}
              className="text-[14px] px-5 py-2.5 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="text-[14px] px-5 py-2.5 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Publish review 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
