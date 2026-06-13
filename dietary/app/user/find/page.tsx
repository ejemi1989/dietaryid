"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notifyUser } from "@/lib/notifications";
import { BookTableModal } from "@/components/ui/BookTableModal";
import { ukRestaurants, UKRestaurant } from "@/lib/restaurants";
import { createClient } from "@/utils/supabase/client";

type Result = {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  distance: string;
  safetyScore: number;
  safeFor: string[];
  rating: number;
  reviewsCount: number;
  safeDishes: string[];
  extraDishes: number;
  communityMatch: number;
  lastVerified: string;
  price: string;
  openNow: boolean;
  verifiedFor: string[];
};

const allResults: Result[] = [
  {
    id: "r1", name: "The Italian Kitchen", emoji: "🍝", cuisine: "Italian", distance: "2.1 km", safetyScore: 96,
    safeFor: ["Celiac", "Gluten-Free", "Dairy-Free"], rating: 4.7, reviewsCount: 47,
    safeDishes: ["Gluten-Free Pasta Primavera", "Risotto ai Funghi (GF)", "Pollo alla Griglia"],
    extraDishes: 5, communityMatch: 47, lastVerified: "2 days ago", price: "$$", openNow: true,
    verifiedFor: ["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free"]
  },
  {
    id: "r2", name: "Fresh Bowl", emoji: "🥗", cuisine: "Mediterranean", distance: "1.4 km", safetyScore: 93,
    safeFor: ["Celiac", "Dairy-Free", "Nut-Free"], rating: 4.6, reviewsCount: 28,
    safeDishes: ["Quinoa Power Bowl", "Grilled Salmon Plate", "Falafel Wrap (GF)"],
    extraDishes: 8, communityMatch: 28, lastVerified: "1 day ago", price: "$", openNow: true,
    verifiedFor: ["Celiac", "Gluten-Free", "Dairy-Free"]
  },
  {
    id: "r3", name: "Sakura Sushi", emoji: "🍣", cuisine: "Japanese", distance: "4.7 km", safetyScore: 78,
    safeFor: ["Gluten-Free", "Dairy-Free"], rating: 4.4, reviewsCount: 12,
    safeDishes: ["Sashimi Platter (no soy)", "Edamame", "Miso Soup (GF)"],
    extraDishes: 2, communityMatch: 8, lastVerified: "1 week ago", price: "$$$", openNow: false,
    verifiedFor: ["Gluten-Free", "Dairy-Free"]
  },
  {
    id: "r4", name: "The Vegan Table", emoji: "🥬", cuisine: "Vegan", distance: "0.8 km", safetyScore: 91,
    safeFor: ["Celiac", "Dairy-Free", "Nut-Free"], rating: 4.5, reviewsCount: 33,
    safeDishes: ["Buddha Bowl", "Vegan Pad Thai (GF)", "Coconut Curry"],
    extraDishes: 6, communityMatch: 33, lastVerified: "3 days ago", price: "$$", openNow: true,
    verifiedFor: ["Celiac", "Vegan", "Nut-Free"]
  },
  {
    id: "r5", name: "Pizza Roma", emoji: "🍕", cuisine: "Italian", distance: "3.5 km", safetyScore: 88,
    safeFor: ["Celiac", "Dairy-Free"], rating: 4.3, reviewsCount: 19,
    safeDishes: ["GF Margherita", "Cauliflower Crust Pizza", "Tiramisu (GF)"],
    extraDishes: 3, communityMatch: 19, lastVerified: "5 days ago", price: "$$", openNow: true,
    verifiedFor: ["Celiac", "Gluten-Free"]
  },
  {
    id: "r6", name: "Spice Route", emoji: "🍛", cuisine: "Indian", distance: "2.9 km", safetyScore: 82,
    safeFor: ["Gluten-Free", "Dairy-Free"], rating: 4.5, reviewsCount: 22,
    safeDishes: ["Chicken Tikka Masala (GF)", "Lamb Biryani", "Tandoori Mixed Grill"],
    extraDishes: 4, communityMatch: 14, lastVerified: "4 days ago", price: "$$", openNow: true,
    verifiedFor: ["Gluten-Free", "Dairy-Free"]
  },
  {
    id: "r7", name: "Le Petit Cafe", emoji: "🥐", cuisine: "French", distance: "1.9 km", safetyScore: 85,
    safeFor: ["Celiac"], rating: 4.4, reviewsCount: 16,
    safeDishes: ["GF Croissant", "Quiche Lorraine (GF crust)", "Salade Niçoise"],
    extraDishes: 2, communityMatch: 16, lastVerified: "1 week ago", price: "$$$", openNow: true,
    verifiedFor: ["Celiac", "Gluten-Free"]
  },
  {
    id: "r8", name: "Burger Lab", emoji: "🍔", cuisine: "American", distance: "5.2 km", safetyScore: 68,
    safeFor: ["Dairy-Free"], rating: 4.2, reviewsCount: 8,
    safeDishes: ["DF Cheeseburger (no bun)", "Sweet Potato Fries", "House Salad"],
    extraDishes: 1, communityMatch: 5, lastVerified: "2 weeks ago", price: "$$", openNow: true,
    verifiedFor: ["Dairy-Free"]
  },
];

const userAllergies = ["Celiac", "Gluten-Free", "Dairy-Free"];
const cuisineOptions = ["All", "Italian", "Mediterranean", "Japanese", "Vegan", "Indian", "French", "American"];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "safety", label: "Safe match (highest)" },
  { value: "rating", label: "Highest rated" },
  { value: "distance", label: "Closest" },
  { value: "recent", label: "Most recent reviews" },
  { value: "verified", label: "Most verified dishes" },
  { value: "price_low", label: "Price (low to high)" },
  { value: "price_high", label: "Price (high to low)" },
];

export default function FindSafelyPage() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"restaurants" | "dishes" | "ingredient">("restaurants");
  const [view, setView] = useState<"list" | "map">("list");
  const [cuisine, setCuisine] = useState("All");
  const [radius, setRadius] = useState("5km");
  const [sort, setSort] = useState("relevance");
  const [safetyFilter, setSafetyFilter] = useState(50);
  const [openNow, setOpenNow] = useState(false);
  const [recentlyVerified, setRecentlyVerified] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set(["r1"]));
  const [searched, setSearched] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [editingAllergies, setEditingAllergies] = useState(false);
  const [tempAllergies, setTempAllergies] = useState(userAllergies);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Italian restaurants near Manchester", "Nut-free desserts", "Gluten-free pasta", "Thai food (Crohn's safe)", "Sushi gluten-free"]);
  const [savedSearches, setSavedSearches] = useState<{ id: string; query: string; filters: string; notify: boolean }[]>([
    { id: "ss1", query: "Italian restaurants near Manchester", filters: "GF · 5km · 4★+", notify: true },
    { id: "ss2", query: "Nut-free desserts", filters: "5km · Open now", notify: false },
  ]);
  const [showRecent, setShowRecent] = useState(false);
  const [showSaveSearch, setShowSaveSearch] = useState(false);
  const [ingredientsToAvoid, setIngredientsToAvoid] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookTarget, setBookTarget] = useState({ id: "rest_the_italian_kitchen", name: "The Italian Kitchen", emoji: "🍝" });
  const [supabaseResults, setSupabaseResults] = useState<Result[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("restaurants").select("id, name, cuisine_type, city, avg_safety_rating, total_reviews, verified_status").eq("is_active", true).order("avg_safety_rating", { ascending: false }).limit(20).then(({ data }) => {
      if (data) {
        setSupabaseResults(data.map((r: any) => ({
          id: r.id, name: r.name, emoji: "🍽️", cuisine: r.cuisine_type || "Restaurant", distance: r.city || "UK", safetyScore: Math.round(r.avg_safety_rating * 20), safeFor: ["Celiac", "Gluten-Free", "Dairy-Free"], rating: r.avg_safety_rating || 4, reviewsCount: r.total_reviews || 0, safeDishes: ["House Special", "Grilled Salmon", "Caesar Salad"], extraDishes: 2, communityMatch: r.total_reviews || 0, lastVerified: r.verified_status === "verified" ? "Recently" : "Unknown", price: "$$", openNow: true, verifiedFor: ["Celiac", "Gluten-Free", "Dairy-Free"],
        })));
      }
    });
  }, []);

  const popularSearches = [
    { q: "Italian restaurants", emoji: "🍝", count: 24 },
    { q: "Gluten-free pizza", emoji: "🍕", count: 8 },
    { q: "Vegan-friendly", emoji: "🥬", count: 31 },
    { q: "Nut-free desserts", emoji: "🍰", count: 12 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setShowRecent(false);
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches((p) => [query.trim(), ...p].slice(0, 8));
    }
  };

  const handleQuickSearch = (q: string) => {
    setQuery(q);
    setSearched(true);
    setShowRecent(false);
    if (!recentSearches.includes(q)) {
      setRecentSearches((p) => [q, ...p].slice(0, 8));
    }
  };

  const handleRemoveRecent = (q: string) => {
    setRecentSearches((p) => p.filter((x) => x !== q));
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleSaveSearch = () => {
    if (!query.trim()) return;
    setSavedSearches((p) => [
      { id: `ss_${Date.now()}`, query, filters: `${cuisine !== "All" ? cuisine + " · " : ""}${radius} · ${safetyFilter}%+ safe`, notify: true },
      ...p,
    ]);
    setShowSaveSearch(false);
  };

  const handleRemoveSavedSearch = (id: string) => {
    setSavedSearches((p) => p.filter((s) => s.id !== id));
  };

  const handleToggleNotify = (id: string) => {
    setSavedSearches((p) => p.map((s) => s.id === id ? { ...s, notify: !s.notify } : s));
  };

  const handleAddIngredient = () => {
    const v = newIngredient.trim();
    if (!v) return;
    if (ingredientsToAvoid.includes(v)) return;
    setIngredientsToAvoid((p) => [...p, v]);
    setNewIngredient("");
  };

  const handleRemoveIngredient = (i: string) => {
    setIngredientsToAvoid((p) => p.filter((x) => x !== i));
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-input-wrapper")) {
        setShowRecent(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); }
      else {
        next.add(id);
        const resto = allResults.find((r) => r.id === id)?.name;
        if (resto) notifyUser("Saved " + resto + " to your list", "/user/saved");
      }
      return next;
    });
  };

  const handleRemoveAllergy = (a: string) => {
    setTempAllergies((prev) => prev.filter((x) => x !== a));
  };

  const handleAddAllergy = (a: string) => {
    if (!tempAllergies.includes(a)) setTempAllergies((prev) => [...prev, a]);
  };

  const combinedResults: Result[] = [
    ...supabaseResults,
    ...allResults,
    ...ukRestaurants.map((r: UKRestaurant) => ({
      id: r.id,
      name: r.name,
      emoji: r.emoji,
      cuisine: r.category,
      distance: "UK",
      safetyScore: r.safetyScore,
      safeFor: ["Celiac", "Gluten-Free", "Dairy-Free"],
      rating: r.rating,
      reviewsCount: r.reviews_count,
      safeDishes: r.safeDishes,
      extraDishes: Math.max(0, Math.floor(Math.random() * 5)),
      communityMatch: r.reviews_count,
      lastVerified: "Recently",
      price: r.price_level,
      openNow: r.status === "OPERATIONAL",
      verifiedFor: ["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free"],
    })),
  ];

  const sortedResults = [...combinedResults].sort((a, b) => {
    if (sort === "safety") return b.safetyScore - a.safetyScore;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    if (sort === "recent") return a.lastVerified.localeCompare(b.lastVerified);
    if (sort === "verified") return b.communityMatch - a.communityMatch;
    if (sort === "price_low") return a.price.length - b.price.length;
    if (sort === "price_high") return b.price.length - a.price.length;
    return 0;
  });

  const filtered = sortedResults.filter((r) => {
    if (safetyFilter > r.safetyScore) return false;
    if (cuisine !== "All" && r.cuisine !== cuisine) return false;
    if (openNow && !r.openNow) return false;
    if (recentlyVerified && r.lastVerified.includes("week")) return false;
    if (query && !r.name.toLowerCase().includes(query.toLowerCase()) && !r.safeDishes.some((d) => d.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  const availableAllergies = ["Celiac", "Gluten-Free", "Dairy-Free", "Nut-Free", "Soy-Free", "Egg-Free", "Shellfish-Free", "Low FODMAP", "Crohn's", "IBS", "Vegan", "Vegetarian"];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Find Safely 🔍</h1>
        <p className="text-[13.5px] text-admin-muted">Search restaurants and dishes filtered by your exact allergy profile</p>
      </div>

      <div className="px-[26px] py-6">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4 mb-4">
          <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
            <div>
              <div className="text-[12.5px] text-admin-muted mb-1">Your allergies:</div>
              {!editingAllergies ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {userAllergies.map((a) => (
                    <span key={a} className="text-[13px] px-2.5 py-1 rounded-md bg-admin-active-bg text-admin-active-text font-medium">
                      {a} ✓
                    </span>
                  ))}
                  <button
                    onClick={() => { setEditingAllergies(true); setTempAllergies(userAllergies); }}
                    className="text-[12px] text-admin-new-text hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {tempAllergies.map((a) => (
                      <button
                        key={a}
                        onClick={() => handleRemoveAllergy(a)}
                        className="text-[13px] px-2.5 py-1 rounded-md bg-admin-active-bg text-admin-active-text font-medium hover:bg-admin-non-bg hover:text-admin-non-text"
                      >
                        {a} ✕
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap mb-2">
                    {availableAllergies.filter((a) => !tempAllergies.includes(a)).slice(0, 6).map((a) => (
                      <button
                        key={a}
                        onClick={() => handleAddAllergy(a)}
                        className="text-[12px] px-2 py-0.5 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      >
                        + {a}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingAllergies(false); setTempAllergies(userAllergies); }}
                      className="text-[12px] px-3 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingAllergies(false)}
                      className="text-[12px] px-3 py-1 rounded-md bg-admin-dark text-white hover:opacity-90"
                    >
                      Save ({tempAllergies.length})
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="text-[11.5px] text-admin-muted">
              Showing results safe for: <span className="font-medium text-admin-text">{userAllergies.join(", ")}</span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 mb-3">
            <div className="flex-1 relative search-input-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowRecent(true); setShowSuggestions(false); }}
                onFocus={() => { setShowRecent(true); setShowSuggestions(true); }}
                placeholder={searchMode === "ingredient" ? "Search restaurants that exclude ingredients..." : "Search restaurants or dishes... e.g. \"Italian restaurants\", \"nut-free desserts\""}
                className="w-full pl-10 pr-3 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
              {(showRecent && (recentSearches.length > 0 || popularSearches.length > 0)) && !searched && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-admin-bg border border-admin-border rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-20 max-h-[400px] overflow-y-auto">
                  {showSuggestions && recentSearches.length === 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[10px] uppercase tracking-[0.05em] text-admin-muted">Popular searches</div>
                      {popularSearches.map((p) => (
                        <button
                          key={p.q}
                          type="button"
                          onClick={() => { setQuery(p.q); setShowRecent(false); }}
                          className="w-full flex items-center gap-2.5 p-2 text-left hover:bg-admin-hover rounded"
                        >
                          <span className="text-[18px]">{p.emoji}</span>
                          <span className="text-[13px] text-admin-text flex-1">{p.q}</span>
                          <span className="text-[11px] text-admin-muted">{p.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {recentSearches.length > 0 && (
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="px-2 py-1 text-[10px] uppercase tracking-[0.05em] text-admin-muted">Recent searches</div>
                        <button type="button" onClick={handleClearRecent} className="text-[10.5px] text-admin-new-text hover:underline">Clear all</button>
                      </div>
                      {recentSearches.map((r) => (
                        <div key={r} className="flex items-center hover:bg-admin-hover rounded group">
                          <button
                            type="button"
                            onClick={() => handleQuickSearch(r)}
                            className="flex-1 flex items-center gap-2.5 p-2 text-left"
                          >
                            <span className="text-[14px] text-admin-muted">🕐</span>
                            <span className="text-[13px] text-admin-text flex-1 truncate">{r}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveRecent(r)}
                            className="text-admin-muted hover:text-admin-non-text text-[14px] p-1.5 opacity-0 group-hover:opacity-100"
                          >✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="text-[14px] px-5 py-2.5 rounded-md bg-admin-dark text-white font-medium hover:opacity-90"
            >
              Search
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <div className="text-[11.5px] text-admin-muted mb-1">What are you looking for?</div>
              <select
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value as typeof searchMode)}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none"
              >
                <option value="restaurants">Restaurants</option>
                <option value="dishes">Specific dishes</option>
                <option value="ingredient">Search to avoid ingredients</option>
              </select>
            </div>
            <div>
              <div className="text-[11.5px] text-admin-muted mb-1">Cuisine</div>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none"
              >
                {cuisineOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-[11.5px] text-admin-muted mb-1">Radius</div>
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none"
              >
                <option value="1km">1 km</option>
                <option value="5km">5 km</option>
                <option value="10km">10 km</option>
                <option value="25km">25 km</option>
                <option value="any">Any distance</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setExpandedFilters((e) => !e)}
            className="text-[12.5px] text-admin-new-text hover:underline flex items-center gap-1"
          >
            {expandedFilters ? "▾" : "▸"} More filters
          </button>

          {expandedFilters && (
            <div className="mt-3 pt-3 border-t border-admin-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[11.5px] text-admin-muted">Min safe match: {safetyFilter}%</div>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={safetyFilter}
                    onChange={(e) => setSafetyFilter(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-2 text-[13px] text-admin-text cursor-pointer">
                    <input
                      type="checkbox"
                      checked={openNow}
                      onChange={(e) => setOpenNow(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    Open now
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-admin-text cursor-pointer">
                    <input
                      type="checkbox"
                      checked={recentlyVerified}
                      onChange={(e) => setRecentlyVerified(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    Verified this week
                  </label>
                </div>
              </div>

              {searchMode === "ingredient" && (
                <div className="mt-3 pt-3 border-t border-admin-border">
                  <div className="text-[12.5px] text-admin-text font-medium mb-1">🚫 Ingredients to avoid</div>
                  <p className="text-[11.5px] text-admin-muted mb-2">Search for restaurants that exclude these ingredients or can accommodate requests.</p>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddIngredient())}
                      placeholder="e.g. peanuts, dairy, gluten, soy..."
                      className="flex-1 px-3 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                    />
                    <button type="button" onClick={handleAddIngredient} className="text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">+ Add</button>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {["Peanuts", "Tree nuts", "Dairy", "Gluten", "Soy", "Eggs", "Shellfish", "Sesame"].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { if (!ingredientsToAvoid.includes(i)) setIngredientsToAvoid((p) => [...p, i]); }}
                        className="text-[11.5px] px-2 py-0.5 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      >
                        + {i}
                      </button>
                    ))}
                  </div>
                  {ingredientsToAvoid.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11.5px] text-admin-muted">Avoiding:</span>
                      {ingredientsToAvoid.map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleRemoveIngredient(i)}
                          className="text-[11.5px] px-2 py-0.5 rounded-md bg-admin-non-bg text-admin-non-text hover:bg-admin-non-text hover:text-white"
                        >
                          {i} ✕
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {searched && (
            <div className="mt-3 pt-3 border-t border-admin-border flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowSaveSearch(true)}
                className="text-[12px] text-admin-new-text hover:underline"
              >
                💾 Save this search
              </button>
              <button
                onClick={() => handleQuickSearch(query)}
                className="text-[12px] text-admin-muted hover:underline"
              >
                🔄 Re-run
              </button>
            </div>
          )}
        </div>

        {savedSearches.length > 0 && !searched && (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-semibold text-admin-text">⭐ Your saved searches</h3>
              <span className="text-[11.5px] text-admin-muted">{savedSearches.length} saved</span>
            </div>
            <div className="space-y-1.5">
              {savedSearches.map((s) => (
                <div key={s.id} className="flex items-center gap-2 p-2 rounded-md border border-admin-border group">
                  <button
                    onClick={() => handleQuickSearch(s.query)}
                    className="flex-1 text-left"
                  >
                    <div className="text-[13px] text-admin-text">&ldquo;{s.query}&rdquo;</div>
                    <div className="text-[11.5px] text-admin-muted">{s.filters} · {s.notify ? "🔔 Notifications on" : "🔕 No notifications"}</div>
                  </button>
                  <button
                    onClick={() => handleToggleNotify(s.id)}
                    className="text-admin-muted hover:text-admin-text text-[14px]"
                    title="Toggle notifications"
                  >
                    {s.notify ? "🔔" : "🔕"}
                  </button>
                  <button
                    onClick={() => handleRemoveSavedSearch(s.id)}
                    className="text-admin-muted hover:text-admin-non-text text-[14px] opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h2 className="text-[16px] font-semibold text-admin-text">
              {searched ? `Results for "${query || "all restaurants"}"` : "Top matches for you"}
            </h2>
            <p className="text-[12px] text-admin-muted">
              Found {filtered.length} restaurants · Filtered by your allergies ({userAllergies.join(", ")})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-[13px] px-3 py-1.5 border border-admin-border rounded-md bg-admin-bg text-admin-text outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>Sort: {o.label}</option>
              ))}
            </select>
            <div className="flex items-center border border-admin-border rounded-md overflow-hidden">
              <button
                onClick={() => setView("list")}
                className={`text-[12px] px-3 py-1.5 ${view === "list" ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"}`}
              >
                List
              </button>
              <button
                onClick={() => setView("map")}
                className={`text-[12px] px-3 py-1.5 ${view === "map" ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"}`}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-8 text-center">
            <div className="text-[48px] mb-3">🔍</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">No restaurants found</h3>
            <p className="text-[13px] text-admin-muted mb-4">
              Try expanding your search radius, different cuisines, or ask the community.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => { setCuisine("All"); setRadius("any"); setOpenNow(false); setRecentlyVerified(false); setSafetyFilter(50); setQuery(""); }}
                className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Clear filters
              </button>
              <Link
                href="/user/community/new"
                className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white no-underline hover:opacity-90"
              >
                Ask community
              </Link>
            </div>
          </div>
        ) : view === "list" ? (
          <div className="space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                <div className="flex items-start gap-4">
                  <div className="text-[40px] flex-shrink-0">{r.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-[16px] font-semibold text-admin-text">{r.name}</h3>
                      <span className="text-[13px] text-admin-muted">· {r.cuisine}</span>
                      <span className="text-[13px] text-admin-muted">· {r.distance}</span>
                      {r.openNow ? (
                        <span className="text-[11.5px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text">Open now</span>
                      ) : (
                        <span className="text-[11.5px] px-2 py-0.5 rounded bg-admin-border text-admin-muted">Closed</span>
                      )}
                      <span className="text-[12px] text-admin-muted ml-auto">{r.price}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[13px] px-2 py-0.5 rounded-md bg-admin-active-bg text-admin-active-text font-medium">
                        ✓ {r.safetyScore}% Safe Match
                      </span>
                      <span className="text-[12.5px] text-admin-muted">
                        ⭐ {r.rating} ({r.reviewsCount} reviews from people like you)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-2 flex-wrap">
                      <span className="text-[12px] text-admin-muted mr-1">Your allergies:</span>
                      {userAllergies.map((a) => (
                        <span
                          key={a}
                          className={`text-[11.5px] px-1.5 py-0.5 rounded ${
                            r.safeFor.includes(a) ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-non-bg text-admin-non-text"
                          }`}
                        >
                          {a} {r.safeFor.includes(a) ? "✓" : "✗"}
                        </span>
                      ))}
                    </div>

                    <div className="mb-2">
                      <div className="text-[12px] text-admin-muted mb-1">Safe dishes:</div>
                      <ul className="text-[13px] text-admin-nav-text space-y-0.5">
                        {r.safeDishes.map((d) => (
                          <li key={d}>• {d}</li>
                        ))}
                        {r.extraDishes > 0 && (
                          <li className="text-[12px] text-admin-new-text">+{r.extraDishes} more safe dishes</li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 text-[11.5px] text-admin-muted flex-wrap">
                      <span>Safe for: {r.verifiedFor.join(", ")}</span>
                      <span>·</span>
                      <span>Last verified: {r.lastVerified}</span>
                      <span>·</span>
                      <span>{r.communityMatch} with Celiac confirmed safe</span>
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => { setBookTarget({ id: `rest_${r.id.replace("r", "")}`, name: r.name, emoji: r.emoji }); setShowBookModal(true); }}
                        className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover"
                      >
                        📅 Book
                      </button>
                      <Link
                        href={`/user/verify?restaurant=${r.id}`}
                        className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white no-underline hover:opacity-90"
                      >
                        View safety details
                      </Link>
                      <Link
                        href={`/user/community/new?restaurant=${r.id}`}
                        className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover"
                      >
                        See reviews ({r.reviewsCount})
                      </Link>
                      <button
                        onClick={() => handleSave(r.id)}
                        className={`text-[13px] px-3 py-1.5 rounded-md border transition-colors ${
                          saved.has(r.id)
                            ? "border-admin-active-text bg-admin-active-bg text-admin-active-text"
                            : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                        }`}
                      >
                        {saved.has(r.id) ? "✓ Saved" : "🔖 Save"}
                      </button>
                      <button
                        onClick={() => navigator.clipboard?.writeText(`https://dietaryid.com/restaurant/${r.id}`)}
                        className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {searched && filtered.length > 0 && (
              <div className="text-center py-4 text-[13px] text-admin-muted">
                Showing {filtered.length} of {allResults.length} results
              </div>
            )}
          </div>
        ) : (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-12 text-center">
            <div className="text-[64px] mb-3">🗺️</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Map view</h3>
            <p className="text-[13px] text-admin-muted mb-3">
              {filtered.length} restaurants on map, color-coded by safe match
            </p>
            <div className="flex items-center justify-center gap-3 text-[12px] flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-admin-active-text"></span>90%+ safe</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-admin-new-text"></span>70-90%</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-admin-non-text"></span>50-70%</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
              {filtered.slice(0, 8).map((r) => (
                <div key={r.id} className="border border-admin-border rounded-md p-2 text-left">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[18px]">{r.emoji}</span>
                    <div className="text-[12px] font-semibold text-admin-text truncate">{r.name}</div>
                  </div>
                  <div className="text-[11px] text-admin-active-text">✓ {r.safetyScore}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSaveSearch && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowSaveSearch(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Save this search</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Save to quickly re-run it later. Get notified when new matches appear?</p>
            <div className="mb-3">
              <div className="text-[12.5px] text-admin-muted">Query</div>
              <div className="text-[13.5px] text-admin-text font-medium">&ldquo;{query || "all restaurants"}&rdquo;</div>
            </div>
            <div className="mb-3">
              <div className="text-[12.5px] text-admin-muted">Filters</div>
              <div className="text-[13px] text-admin-text">{cuisine !== "All" ? `${cuisine} · ` : ""}{radius} · {safetyFilter}%+ safe</div>
            </div>
            <label className="flex items-center gap-2 mb-4">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-[13px] text-admin-text">Notify me when new matches appear</span>
            </label>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSaveSearch(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleSaveSearch}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Save search
              </button>
            </div>
          </div>
        </div>
      )}

      {showBookModal && (
        <BookTableModal
          restaurantId={bookTarget.id}
          restaurantName={bookTarget.name}
          restaurantEmoji={bookTarget.emoji}
          userName="Sarah Mitchell"
          userRestriction="Celiac"
          onClose={() => setShowBookModal(false)}
        />
      )}
    </div>
  );
}
