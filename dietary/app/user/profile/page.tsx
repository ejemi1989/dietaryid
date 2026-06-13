"use client";

import { useState } from "react";
import Link from "next/link";
import { saveProfile } from "@/actions/db";

const allergies = ["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free", "Soy-Free", "Egg-Free", "Shellfish-Free", "Low FODMAP"];
const allAllergyOptions = ["Celiac", "Crohn's", "IBS", "Gluten-Free", "Dairy-Free", "Nut-Free", "Soy-Free", "Egg-Free", "Shellfish-Free", "Low FODMAP", "Vegan", "Vegetarian", "Pescatarian"];

const restrictions = [
  { name: "Celiac", severity: "Severe", since: "2016" },
  { name: "Gluten-Free", severity: "Severe", since: "2016" },
  { name: "Dairy-Free", severity: "Moderate", since: "2019" },
];

type Review = {
  id: string;
  restaurant: string;
  emoji: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  dish: string;
};

const reviews: Review[] = [
  { id: "r1", restaurant: "The Healthy Bowl Co", emoji: "🥗", rating: 5, date: "2 weeks ago", text: "Excellent! Dedicated GF prep area, knowledgeable staff. Best in Manchester for sure.", helpful: 23, dish: "Quinoa Power Bowl" },
  { id: "r2", restaurant: "Bella Italia", emoji: "🍝", rating: 4, date: "1 month ago", text: "Good GF pasta options. They have a separate menu which is helpful.", helpful: 12, dish: "Gluten-Free Pasta" },
  { id: "r3", restaurant: "The Italian Kitchen", emoji: "🍕", rating: 5, date: "2 months ago", text: "Pizza was amazing. Dedicated GF oven. Will definitely return.", helpful: 18, dish: "GF Margherita" },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Sarah Mitchell");
  const [email] = useState("sarah@dietaryid.com");
  const [city, setCity] = useState("Manchester, UK");
  const [bio, setBio] = useState("I've had Celiac for 8 years and have tried 50+ restaurants in Manchester. I share honest reviews to help others eat safely.");
  const [activeAllergies, setActiveAllergies] = useState<string[]>(["Celiac", "Gluten-Free", "Dairy-Free"]);
  const [privacy, setPrivacy] = useState({ publicProfile: true, showReviews: true, showSaved: false, showFollowers: true, allowMessages: true, allowFollows: true, searchEngine: false });
  const [notifs, setNotifs] = useState({ newReviews: true, communityReplies: true, weeklyDigest: false, marketingTips: false, safetyAlerts: true, followActivity: true });
  const [showDelete, setShowDelete] = useState(false);
  const [savedNotif, setSavedNotif] = useState(false);
  const [saving, setSaving] = useState(false);
  const [yearsWithCondition, setYearsWithCondition] = useState("8+");
  const [preferredCities, setPreferredCities] = useState<string[]>(["Manchester"]);
  const [newCity, setNewCity] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [creatorSpecialties, setCreatorSpecialties] = useState<string[]>(["Celiac", "Gluten-Free"]);
  const [isCreator, setIsCreator] = useState(true);

  const completionFields = [
    { label: "Display name", done: !!name },
    { label: "Allergies set", done: activeAllergies.length > 0 },
    { label: "Location", done: !!city },
    { label: "Bio", done: !!bio },
    { label: "Years with condition", done: !!yearsWithCondition },
    { label: "Preferred cities", done: preferredCities.length > 0 },
  ];
  const completionPct = Math.round((completionFields.filter((f) => f.done).length / completionFields.length) * 100);

  const handleToggleAllergy = (a: string) => {
    setActiveAllergies((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const handleSaveNotif = () => {
    setSavedNotif(true);
    setTimeout(() => setSavedNotif(false), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile({
        display_name: name, bio, location_city: city,
        dietary_restrictions: activeAllergies,
        years_with_condition: yearsWithCondition,
        is_creator: isCreator, creator_bio: bio,
        creator_specialties: isCreator ? creatorSpecialties : [],
        preferred_cities: preferredCities,
        linkedin_url: linkedinUrl, instagram_url: instagramUrl,
      });
      setSavedNotif(true);
      setEditing(false);
      setTimeout(() => setSavedNotif(false), 2000);
    } catch (e: any) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCity = (cityName: string) => {
    if (!cityName.trim() || preferredCities.includes(cityName.trim())) return;
    setPreferredCities((p) => [...p, cityName.trim()]);
    setNewCity("");
  };

  const handleRemoveCity = (i: number) => {
    setPreferredCities((p) => p.filter((_, idx) => idx !== i));
  };

  const toggleSpecialty = (s: string) => {
    setCreatorSpecialties((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">My Profile 👤</h1>
        <p className="text-[13.5px] text-admin-muted">Manage your allergies, preferences, and how others see you</p>
      </div>

      <div className="px-[26px] py-6 max-w-[900px]">

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-admin-text">Profile completion</span>
            <span className="text-[13px] font-semibold text-admin-active-text">{completionPct}%</span>
          </div>
          <div className="w-full h-2 bg-admin-border rounded-full overflow-hidden mb-2">
            <div className="h-full bg-admin-active-text rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {completionFields.map((f) => (
              <span key={f.label} className={`text-[11px] px-2 py-0.5 rounded ${f.done ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-non-bg text-admin-non-text"}`}>
                {f.done ? "✓" : "✗"} {f.label}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <img src="https://i.pravatar.cc/120?img=12" alt="" className="w-20 h-20 rounded-full" />
            <div className="flex-1">
              {!editing ? (
                <>
                  <h2 className="text-[20px] font-semibold text-admin-text">{name}</h2>
                  <p className="text-[13.5px] text-admin-muted">{email} · {city}</p>
                  <p className="text-[13.5px] text-admin-nav-text mt-2">{bio}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">Has Celiac</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">Gluten-Free</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">Dairy-Free</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text font-medium">✓ Verified Creator</span>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text" />
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text" />
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text resize-none" />
                  <div>
                    <div className="text-[11.5px] text-admin-muted mb-1">Years with condition</div>
                    <select value={yearsWithCondition} onChange={(e) => setYearsWithCondition(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                      <option>&lt; 1 year</option><option>1-2 years</option><option>3-5 years</option><option>5-8 years</option><option>8+ years</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-[11.5px] text-admin-muted mb-1">Preferred cities</div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                      {preferredCities.map((c, i) => (
                        <span key={i} className="text-[12px] px-2 py-0.5 rounded-md bg-admin-active-bg text-admin-active-text flex items-center gap-1">{c} <button onClick={() => handleRemoveCity(i)} className="hover:text-admin-non-text">✕</button></span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCity(newCity))} placeholder="Add city..." className="flex-1 px-2.5 py-1.5 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none" />
                      <button onClick={() => handleAddCity(newCity)} className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">+ Add</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11.5px] text-admin-muted mb-1">LinkedIn URL</div>
                      <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="linkedin.com/in/..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
                    </div>
                    <div>
                      <div className="text-[11.5px] text-admin-muted mb-1">Instagram URL</div>
                      <input type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="instagram.com/..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isCreator} onChange={(e) => setIsCreator(e.target.checked)} className="w-4 h-4" />
                    <span className="text-[14px] text-admin-text">Become a Creator</span>
                  </label>
                  {isCreator && (
                    <div className="space-y-2 pl-6">
                      <div>
                        <div className="text-[11.5px] text-admin-muted mb-1">Creator specialties</div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free", "IBS", "Crohn's", "Vegan", "Vegetarian", "Low FODMAP"].map((s) => (
                            <button key={s} onClick={() => toggleSpecialty(s)} className={`text-[11.5px] px-2 py-0.5 rounded-md ${creatorSpecialties.includes(s) ? "bg-admin-active-bg text-admin-active-text" : "border border-admin-border text-admin-nav-text hover:bg-admin-hover"}`}>{creatorSpecialties.includes(s) ? "✓ " : ""}{s}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setEditing((e) => !e)}
              className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              {editing ? "Cancel" : "Edit profile"}
            </button>
          </div>
          {editing && (
            <div className="flex justify-end gap-2 pt-3 border-t border-admin-border">
              <button onClick={() => setEditing(false)} className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">{saving ? "Saving..." : "Save changes"}</button>
            </div>
          )}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 mb-6" id="allergies">
          <h2 className="text-[17px] font-semibold text-admin-text mb-1">Your allergies & restrictions</h2>
          <p className="text-[12.5px] text-admin-muted mb-4">This filters every search. Always confirm with restaurant staff when ordering.</p>

          <div className="space-y-2 mb-4">
            {restrictions.map((r) => (
              <div key={r.name} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                <div className="text-[20px]">🛡️</div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-admin-text">{r.name}</div>
                  <div className="text-[12px] text-admin-muted">Since {r.since}</div>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded ${
                  r.severity === "Severe" ? "bg-admin-non-bg text-admin-non-text" : "bg-admin-vip-bg text-admin-vip-text"
                }`}>
                  {r.severity}
                </span>
                <button className="text-admin-muted hover:text-admin-non-text">✕</button>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[12.5px] text-admin-muted mb-2">Add another restriction:</div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {allAllergyOptions.filter((a) => !activeAllergies.includes(a)).slice(0, 8).map((a) => (
                <button
                  key={a}
                  onClick={() => handleToggleAllergy(a)}
                  className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                >
                  + {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Reviews written</div>
            <div className="text-[24px] font-semibold text-admin-text">{reviews.length}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Helpful votes</div>
            <div className="text-[24px] font-semibold text-admin-text">{reviews.reduce((s, r) => s + r.helpful, 0)}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Member since</div>
            <div className="text-[24px] font-semibold text-admin-text">2023</div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold text-admin-text">Your recent reviews</h2>
            <Link href="/user/reviews" className="text-[12.5px] text-admin-new-text no-underline hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="flex items-start gap-3 pb-3 border-b border-admin-border last:border-b-0 last:pb-0">
                <div className="text-[24px]">{r.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[14px] font-semibold text-admin-text">{r.restaurant}</span>
                    <span className="text-[12px] text-admin-vip-text">{"⭐".repeat(r.rating)}</span>
                    <span className="text-[12px] text-admin-muted ml-auto">{r.date}</span>
                  </div>
                  <div className="text-[12px] text-admin-muted mb-1">Re: {r.dish}</div>
                  <p className="text-[13px] text-admin-nav-text">&ldquo;{r.text}&rdquo;</p>
                  <div className="text-[11.5px] text-admin-muted mt-1">👍 {r.helpful} found this helpful</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Notification preferences</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Choose what you want to hear about.</p>
          <div className="space-y-2 mb-4">
            {[
              { k: "newReviews" as const, l: "When someone marks your review helpful", desc: "Get a notification for each new helpful vote" },
              { k: "communityReplies" as const, l: "Replies to your community posts", desc: "Stay in the conversation" },
              { k: "followActivity" as const, l: "New followers and their activity", desc: "See what people you follow are up to" },
              { k: "safetyAlerts" as const, l: "Safety score changes for saved restaurants", desc: "Know when a restaurant you trust has issues" },
              { k: "weeklyDigest" as const, l: "Weekly digest of new safe restaurants", desc: "A summary every Monday" },
              { k: "marketingTips" as const, l: "Product updates & tips", desc: "From the DietaryID team" },
            ].map((n) => (
              <label key={n.k} className="flex items-start gap-3 p-2.5 rounded-md border border-admin-border cursor-pointer hover:bg-admin-hover">
                <input
                  type="checkbox"
                  checked={notifs[n.k]}
                  onChange={() => setNotifs((p) => ({ ...p, [n.k]: !p[n.k] }))}
                  className="w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <div className="text-[13.5px] text-admin-text font-medium">{n.l}</div>
                  <div className="text-[11.5px] text-admin-muted">{n.desc}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-admin-border">
            <div className="flex items-center gap-3">
              <Link href="/user/notifications" className="text-[12.5px] text-admin-new-text no-underline hover:underline">View all notifications →</Link>
              {savedNotif && <span className="text-[12px] text-admin-active-text">✓ Saved</span>}
            </div>
            <button
              onClick={handleSaveNotif}
              className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
            >
              Save preferences
            </button>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Privacy</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Control who sees what.</p>
          <div className="space-y-2">
            {[
              { k: "publicProfile" as const, l: "Public profile", desc: "Your profile is visible to everyone" },
              { k: "showReviews" as const, l: "Show my reviews on profile", desc: "Others can see the reviews you've written" },
              { k: "showSaved" as const, l: "Show saved restaurants", desc: "Others can see your saved list" },
              { k: "showFollowers" as const, l: "Show followers list", desc: "Your followers are visible to others" },
              { k: "allowMessages" as const, l: "Allow direct messages", desc: "Others can DM you (you can still block individuals)" },
              { k: "allowFollows" as const, l: "Allow new followers", desc: "If off, you must approve each new follower" },
              { k: "searchEngine" as const, l: "Index profile in search engines", desc: "Allow Google/Bing to show your profile" },
            ].map((p) => (
              <label key={p.k} className="flex items-start gap-3 p-2.5 rounded-md border border-admin-border cursor-pointer hover:bg-admin-hover">
                <input
                  type="checkbox"
                  checked={privacy[p.k]}
                  onChange={() => setPrivacy((pr) => ({ ...pr, [p.k]: !pr[p.k] }))}
                  className="w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <div className="text-[13.5px] text-admin-text font-medium">{p.l}</div>
                  <div className="text-[11.5px] text-admin-muted">{p.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Account</h2>
          <div className="space-y-2">
            <button
              onClick={() => alert("Verification email sent (mock)")}
              className="w-full text-left p-3 rounded-md border border-admin-border hover:bg-admin-hover flex items-center justify-between"
            >
              <div>
                <div className="text-[13.5px] text-admin-text font-medium">📧 Verify email</div>
                <div className="text-[11.5px] text-admin-muted">sarah@dietaryid.com · Verified ✓</div>
              </div>
              <span className="text-[12px] text-admin-muted">Resend</span>
            </button>
            <button
              onClick={() => alert("Password change email sent (mock)")}
              className="w-full text-left p-3 rounded-md border border-admin-border hover:bg-admin-hover flex items-center justify-between"
            >
              <div>
                <div className="text-[13.5px] text-admin-text font-medium">🔒 Change password</div>
                <div className="text-[11.5px] text-admin-muted">Last changed 3 months ago</div>
              </div>
              <span className="text-[12px] text-admin-new-text">Update</span>
            </button>
            <Link href="/user/saved" className="w-full text-left p-3 rounded-md border border-admin-border hover:bg-admin-hover flex items-center justify-between no-underline">
              <div>
                <div className="text-[13.5px] text-admin-text font-medium">📦 Download my data</div>
                <div className="text-[11.5px] text-admin-muted">Reviews, saves, activity as a ZIP</div>
              </div>
              <span className="text-[12px] text-admin-muted">→</span>
            </Link>
            <button
              onClick={() => setShowDelete(true)}
              className="w-full text-left p-3 rounded-md border border-admin-non-text/30 hover:bg-admin-non-bg/30 flex items-center justify-between"
            >
              <div>
                <div className="text-[13.5px] text-admin-non-text font-medium">🗑 Delete account</div>
                <div className="text-[11.5px] text-admin-muted">Permanently delete your account and data</div>
              </div>
              <span className="text-[12px] text-admin-non-text">→</span>
            </button>
            <button
              onClick={() => { window.location.href = "/"; }}
              className="w-full text-left p-3 rounded-md border border-admin-border hover:bg-admin-hover flex items-center justify-between"
            >
              <div>
                <div className="text-[13.5px] text-admin-text font-medium">↪ Logout</div>
                <div className="text-[11.5px] text-admin-muted">Sign out of DietaryID</div>
              </div>
              <span className="text-[12px] text-admin-muted">→</span>
            </button>
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowDelete(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-non-text mb-1">Delete account permanently?</h3>
            <p className="text-[13.5px] text-admin-nav-text mb-3">This will permanently delete your account, reviews, saves, and activity. This action cannot be undone.</p>
            <div className="mb-3">
              <label className="text-[12.5px] text-admin-text block mb-1">Type <strong>DELETE</strong> to confirm:</label>
              <input
                type="text"
                placeholder="DELETE"
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-non-text"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDelete(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => { alert("Account deleted (mock)"); window.location.href = "/"; }}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-non-text text-white hover:opacity-90"
              >
                Delete permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
