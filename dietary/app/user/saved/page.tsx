"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "restaurants" | "dishes" | "posts" | "searches" | "guides";

type SavedRestaurant = {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  distance: string;
  safetyScore: number;
  safeDishes: number;
  saved: string;
  lastVisited: string;
  notes: string;
};

type SavedDish = {
  id: string;
  name: string;
  restaurant: string;
  emoji: string;
  safetyScore: number;
  safeFor: string[];
  saved: string;
};

type SavedPost = {
  id: string;
  author: string;
  authorRestriction: string;
  type: string;
  title: string;
  content: string;
  saved: string;
};

type SavedSearch = {
  id: string;
  query: string;
  filters: string;
  saved: string;
  notify: boolean;
  results: number;
};

type SavedGuide = {
  id: string;
  title: string;
  author: string;
  city: string;
  restaurants: number;
  saved: number;
};

const initialRestaurants: SavedRestaurant[] = [
  { id: "sr1", name: "The Healthy Bowl Co", emoji: "🥗", cuisine: "Mediterranean", distance: "2.3 km", safetyScore: 94, safeDishes: 8, saved: "2 weeks ago", lastVisited: "3 days ago", notes: "Great GF options, try the Buddha Bowl" },
  { id: "sr2", name: "Green Garden Cafe", emoji: "🥬", cuisine: "Vegan", distance: "1.1 km", safetyScore: 91, safeDishes: 12, saved: "1 month ago", lastVisited: "1 week ago", notes: "Dairy-free heaven" },
  { id: "sr3", name: "Sakura Sushi", emoji: "🍣", cuisine: "Japanese", distance: "4.7 km", safetyScore: 78, safeDishes: 4, saved: "1 month ago", lastVisited: "2 weeks ago", notes: "" },
  { id: "sr4", name: "Bella Italia", emoji: "🍝", cuisine: "Italian", distance: "3.2 km", safetyScore: 87, safeDishes: 6, saved: "2 months ago", lastVisited: "1 month ago", notes: "Birthday dinner spot" },
  { id: "sr5", name: "Pizza Roma", emoji: "🍕", cuisine: "Italian", distance: "3.5 km", safetyScore: 88, safeDishes: 3, saved: "2 months ago", lastVisited: "Never", notes: "" },
  { id: "sr6", name: "Spice Route", emoji: "🍛", cuisine: "Indian", distance: "2.9 km", safetyScore: 82, safeDishes: 4, saved: "3 months ago", lastVisited: "Never", notes: "" },
];

const initialDishes: SavedDish[] = [
  { id: "sd1", name: "Gluten-Free Pasta Primavera", restaurant: "The Italian Kitchen", emoji: "🍝", safetyScore: 96, safeFor: ["Celiac", "GF", "DF"], saved: "1 week ago" },
  { id: "sd2", name: "Quinoa Power Bowl", restaurant: "Fresh Bowl", emoji: "🥗", safetyScore: 93, safeFor: ["Celiac", "DF"], saved: "2 weeks ago" },
  { id: "sd3", name: "Sashimi Platter (no soy)", restaurant: "Sakura Sushi", emoji: "🍣", safetyScore: 78, safeFor: ["GF", "DF"], saved: "3 weeks ago" },
  { id: "sd4", name: "Buddha Bowl", restaurant: "The Vegan Table", emoji: "🥬", safetyScore: 91, safeFor: ["Celiac", "DF", "Vegan"], saved: "1 month ago" },
];

const initialPosts: SavedPost[] = [
  { id: "sp1", author: "Mike H.", authorRestriction: "Has Celiac", type: "tip", title: "Always ask about the dedicated fryer", content: "Pro tip: always ask if the restaurant has a dedicated gluten-free fryer. Most places share fryers with everything else.", saved: "1 week ago" },
  { id: "sp2", author: "Sarah M.", authorRestriction: "Has Celiac", type: "recommendation", title: "The Healthy Crust pizza place", content: "They have a dedicated oven for gluten-free. Super knowledgeable staff. 10/10 would recommend.", saved: "2 weeks ago" },
  { id: "sp3", author: "Emma T.", authorRestriction: "Has Crohn's", type: "win", title: "I just successfully ate out and felt AMAZING 🎉", content: "This community made it possible. After 3 years of being afraid to eat out, I went to dinner last night and had zero pain.", saved: "3 weeks ago" },
];

const initialSearches: SavedSearch[] = [
  { id: "ss1", query: "Italian restaurants near Manchester", filters: "Gluten-free · 5km · 4★+", saved: "1 week ago", notify: true, results: 12 },
  { id: "ss2", query: "Nut-free desserts", filters: "5km · Open now", saved: "2 weeks ago", notify: false, results: 4 },
  { id: "ss3", query: "Gluten-free pasta near home", filters: "5km · Italian", saved: "1 month ago", notify: true, results: 8 },
  { id: "ss4", query: "Thai food (Crohn's safe)", filters: "10km · 4★+", saved: "1 month ago", notify: false, results: 6 },
];

const initialGuides: SavedGuide[] = [
  { id: "sg1", title: "Gluten-Free Manchester", author: "Sarah M.", city: "Manchester, UK", restaurants: 18, saved: 1200 },
  { id: "sg2", title: "Dairy-Free Eater's Guide to Manchester", author: "Emma T.", city: "Manchester, UK", restaurants: 12, saved: 458 },
];

export default function SavedPage() {
  const [tab, setTab] = useState<Tab>("restaurants");
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [dishes, setDishes] = useState(initialDishes);
  const [posts, setPosts] = useState(initialPosts);
  const [searches, setSearches] = useState(initialSearches);
  const [guides, setGuides] = useState(initialGuides);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showOrganize, setShowOrganize] = useState(false);
  const [folder, setFolder] = useState("All");

  const tabs: { v: Tab; l: string; count: number; emoji: string }[] = [
    { v: "restaurants", l: "Restaurants", count: restaurants.length, emoji: "🏪" },
    { v: "dishes", l: "Dishes", count: dishes.length, emoji: "🍽️" },
    { v: "posts", l: "Posts", count: posts.length, emoji: "💬" },
    { v: "searches", l: "Searches", count: searches.length, emoji: "🔍" },
    { v: "guides", l: "Guides", count: guides.length, emoji: "📖" },
  ];

  const handleRemoveRestaurant = (id: string) => setRestaurants((p) => p.filter((r) => r.id !== id));
  const handleRemoveDish = (id: string) => setDishes((p) => p.filter((d) => d.id !== id));
  const handleRemovePost = (id: string) => setPosts((p) => p.filter((p) => p.id !== id));
  const handleRemoveSearch = (id: string) => setSearches((p) => p.filter((s) => s.id !== id));
  const handleRemoveGuide = (id: string) => setGuides((p) => p.filter((g) => g.id !== id));
  const handleToggleNotify = (id: string) => setSearches((p) => p.map((s) => s.id === id ? { ...s, notify: !s.notify } : s));
  const handleRerunSearch = (query: string) => {
    window.location.href = `/user/find?q=${encodeURIComponent(query)}`;
  };
  const handleSaveNotes = () => {
    setRestaurants((p) => p.map((r) => r.id === editingNotes ? { ...r, notes: notesValue } : r));
    setEditingNotes(null);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    if (!confirm(`Remove ${selected.size} item(s)?`)) return;
    if (tab === "restaurants") setRestaurants((p) => p.filter((r) => !selected.has(r.id)));
    if (tab === "dishes") setDishes((p) => p.filter((d) => !selected.has(d.id)));
    if (tab === "posts") setPosts((p) => p.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  };

  const folders = ["All", "Want to try", "Favorites", "For special occasions"];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Saved 🔖</h1>
            <p className="text-[13.5px] text-admin-muted">Restaurants, dishes, posts, and searches you&apos;ve saved for later.</p>
          </div>
          <button
            onClick={() => setShowOrganize(true)}
            className="text-[12.5px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
          >
            📁 Organize
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.v}
            onClick={() => { setTab(t.v); setSelected(new Set()); }}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
              tab === t.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {t.emoji} {t.l} ({t.count})
          </button>
        ))}
      </div>

      <div className="px-[26px] py-3 border-b border-admin-border flex items-center gap-2 flex-wrap">
        <span className="text-[12.5px] text-admin-muted">Folder:</span>
        {folders.map((f) => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`text-[12px] px-2.5 py-1 rounded-md ${
              folder === f ? "bg-admin-dark text-white" : "text-admin-nav-text border border-admin-border hover:bg-admin-hover"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {selected.size > 0 && (
        <div className="mx-[26px] mt-3 p-3 rounded-[10px] bg-admin-dark text-white flex items-center gap-2">
          <span className="text-[13px] font-medium">{selected.size} selected</span>
          <div className="flex items-center gap-1.5 ml-auto">
            <button onClick={handleBulkDelete} className="text-[12.5px] px-2.5 py-1 rounded-md hover:bg-admin-hover">🗑 Remove</button>
            <button onClick={() => setSelected(new Set())} className="text-[12.5px] px-2.5 py-1 rounded-md hover:bg-admin-hover">Cancel</button>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6 max-w-[1000px]">
        {tab === "restaurants" && (
          <div className="space-y-3">
            {restaurants.length === 0 ? (
              <EmptyState emoji="🏪" title="No saved restaurants yet" cta="Find restaurants" href="/user/find" />
            ) : (
              restaurants.map((r) => (
                <div key={r.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggleSelect(r.id)}
                    className="mt-1.5 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-[32px]">{r.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Link href={`/user/verify?restaurant=${r.id}`} className="text-[15px] font-semibold text-admin-text no-underline hover:underline">{r.name}</Link>
                      <span className="text-[12px] text-admin-muted">· {r.cuisine}</span>
                      <span className="text-[12.5px] text-admin-active-text font-medium">✓ {r.safetyScore}%</span>
                      <span className="text-[12px] text-admin-muted">· {r.distance}</span>
                    </div>
                    {editingNotes === r.id ? (
                      <div className="mt-1">
                        <textarea
                          value={notesValue}
                          onChange={(e) => setNotesValue(e.target.value)}
                          rows={2}
                          className="w-full px-2.5 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
                          placeholder="Add a note..."
                        />
                        <div className="flex gap-1.5 mt-1.5">
                          <button onClick={handleSaveNotes} className="text-[11.5px] px-2 py-0.5 rounded bg-admin-dark text-white hover:opacity-90">Save</button>
                          <button onClick={() => setEditingNotes(null)} className="text-[11.5px] px-2 py-0.5 rounded border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                        </div>
                      </div>
                    ) : r.notes ? (
                      <button
                        onClick={() => { setEditingNotes(r.id); setNotesValue(r.notes); }}
                        className="block text-left text-[12.5px] text-admin-nav-text italic mt-0.5 hover:underline"
                      >
                        📝 {r.notes}
                      </button>
                    ) : (
                      <button
                        onClick={() => { setEditingNotes(r.id); setNotesValue(""); }}
                        className="text-[12px] text-admin-muted hover:underline"
                      >
                        + Add note
                      </button>
                    )}
                    <div className="text-[11.5px] text-admin-muted mt-1">
                      {r.safeDishes} safe dishes · Saved {r.saved} {r.lastVisited !== "Never" && `· Last visited ${r.lastVisited}`}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <Link href="/user/find" className="text-[12px] px-2.5 py-1 rounded-md bg-admin-dark text-white no-underline hover:opacity-90 text-center">View</Link>
                    <button onClick={() => handleRemoveRestaurant(r.id)} className="text-[12px] px-2.5 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "dishes" && (
          <div className="space-y-3">
            {dishes.length === 0 ? (
              <EmptyState emoji="🍽️" title="No saved dishes" cta="Browse dishes" href="/user/find" />
            ) : (
              dishes.map((d) => (
                <div key={d.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4 flex items-start gap-3">
                  <input type="checkbox" checked={selected.has(d.id)} onChange={() => toggleSelect(d.id)} className="mt-1.5 w-4 h-4 cursor-pointer" />
                  <div className="text-[32px]">{d.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[15px] font-semibold text-admin-text">{d.name}</span>
                      <span className="text-[12.5px] text-admin-active-text font-medium">✓ {d.safetyScore}%</span>
                    </div>
                    <p className="text-[12.5px] text-admin-muted">at {d.restaurant}</p>
                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      {d.safeFor.map((t) => (
                        <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text">{t} ✓</span>
                      ))}
                    </div>
                    <p className="text-[11.5px] text-admin-muted mt-1">Saved {d.saved}</p>
                  </div>
                  <button onClick={() => handleRemoveDish(d.id)} className="text-admin-muted hover:text-admin-non-text text-[14px]">✕</button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "posts" && (
          <div className="space-y-3">
            {posts.length === 0 ? (
              <EmptyState emoji="💬" title="No saved posts" cta="Browse community" href="/user/community" />
            ) : (
              posts.map((p) => (
                <div key={p.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="w-4 h-4 cursor-pointer" />
                    <span className="text-[13px] font-semibold text-admin-text">{p.author}</span>
                    <span className="text-[12px] text-admin-muted">| {p.authorRestriction}</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text ml-auto">{p.type}</span>
                  </div>
                  <h3 className="text-[14px] font-semibold text-admin-text mb-1 pl-6">{p.title}</h3>
                  <p className="text-[13px] text-admin-nav-text pl-6 mb-1">{p.content}</p>
                  <p className="text-[11.5px] text-admin-muted pl-6">Saved {p.saved}</p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "searches" && (
          <div className="space-y-3">
            {searches.length === 0 ? (
              <EmptyState emoji="🔍" title="No saved searches" cta="Start searching" href="/user/find" />
            ) : (
              searches.map((s) => (
                <div key={s.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4 flex items-center gap-3">
                  <div className="text-[28px]">🔍</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-admin-text">&ldquo;{s.query}&rdquo;</div>
                    <p className="text-[12px] text-admin-muted">{s.filters}</p>
                    <p className="text-[11.5px] text-admin-muted mt-0.5">{s.results} matching restaurants · Saved {s.saved}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => handleRerunSearch(s.query)} className="text-[12px] px-2.5 py-1 rounded-md bg-admin-dark text-white hover:opacity-90">Run</button>
                    <button onClick={() => handleToggleNotify(s.id)} className={`text-[12px] px-2.5 py-1 rounded-md border transition-colors ${s.notify ? "border-admin-active-text bg-admin-active-bg text-admin-active-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"}`}>
                      {s.notify ? "🔔 On" : "🔕 Off"}
                    </button>
                    <button onClick={() => handleRemoveSearch(s.id)} className="text-[12px] px-2.5 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "guides" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {guides.length === 0 ? (
              <EmptyState emoji="📖" title="No saved guides" cta="Browse guides" href="/user/community" />
            ) : (
              guides.map((g) => (
                <div key={g.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
                  <div className="text-[28px] mb-2">📖</div>
                  <h3 className="text-[15px] font-semibold text-admin-text mb-1">{g.title}</h3>
                  <p className="text-[12.5px] text-admin-muted mb-2">by {g.author} · {g.city}</p>
                  <div className="flex items-center gap-3 text-[12px] text-admin-nav-text">
                    <span>🏪 {g.restaurants} restaurants</span>
                    <span>🔖 {g.saved.toLocaleString()} saved</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Link href="/user/community" className="text-[12px] px-2.5 py-1 rounded-md bg-admin-dark text-white no-underline hover:opacity-90">Read guide</Link>
                    <button onClick={() => handleRemoveGuide(g.id)} className="text-[12px] px-2.5 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showOrganize && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowOrganize(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-3">Organize your saves</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Group your saves into folders for easy access. (Folders are local for now.)</p>
            <div className="space-y-2 mb-4">
              {folders.map((f) => (
                <div key={f} className="flex items-center justify-between p-2.5 rounded-md border border-admin-border">
                  <span className="text-[13.5px] text-admin-text">📁 {f}</span>
                  <span className="text-[12px] text-admin-muted">
                    {f === "All" ? `${restaurants.length + dishes.length + posts.length + searches.length + guides.length} items` : "0 items"}
                  </span>
                </div>
              ))}
              <button className="w-full text-[13px] px-3 py-2 rounded-md border border-dashed border-admin-border text-admin-muted hover:bg-admin-hover">
                + New folder
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowOrganize(false)} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ emoji, title, cta, href }: { emoji: string; title: string; cta: string; href: string }) {
  return (
    <div className="bg-admin-bg border border-admin-border rounded-[10px] p-12 text-center">
      <div className="text-[48px] mb-2">{emoji}</div>
      <h3 className="text-[16px] font-semibold text-admin-text mb-2">{title}</h3>
      <Link href={href} className="inline-block text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white no-underline hover:opacity-90">{cta} →</Link>
    </div>
  );
}
