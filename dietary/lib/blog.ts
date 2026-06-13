export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  cat: string;
  img: string;
  date: string;
  published: boolean;
  slug: string;
};

let posts: BlogPost[] = [
  { id: "bp1", title: "How DietaryID's 3-layer verification gives you confidence when dining out", excerpt: "Behind every safety score is a rigorous process: direct menu verification with restaurants, allergen database cross-checks, and peer reviews from people with your exact allergies.", content: "Full article...", author: "Emma Collins", role: "Head of Trust & Safety", cat: "Product", img: "🛡️", date: "Jun 10, 2026", published: true, slug: "3-layer-verification" },
  { id: "bp2", title: "Creator Spotlight: Meet the people earning £200+/month reviewing restaurants", excerpt: "Sarah Mitchell has written 156 reviews and earned £2,847 from DietaryID.", content: "Full article...", author: "Mike Henderson", role: "Community Editor", cat: "Creators", img: "⭐", date: "Jun 8, 2026", published: true, slug: "creator-spotlight" },
  { id: "bp3", title: "New: Book tables directly from DietaryID", excerpt: "You can now book tables at verified restaurants right from the app.", content: "Full article...", author: "Jordan Lee", role: "Product Manager", cat: "Product", img: "📅", date: "Jun 5, 2026", published: true, slug: "book-tables" },
  { id: "bp4", title: "The hidden allergens in restaurant dishes", excerpt: "Soy in salad dressing. Gluten in soup thickeners. Dairy in bread crumbs.", content: "Full article...", author: "Dr. Sophie Turner", role: "Allergen Specialist", cat: "Education", img: "🔍", date: "Jun 1, 2026", published: true, slug: "hidden-allergens" },
  { id: "bp5", title: "How DietaryID changed one family's dining experience", excerpt: "The Williams family has three members with different food allergies.", content: "Full article...", author: "Aisha Khan", role: "Community Storyteller", cat: "Stories", img: "❤️", date: "May 28, 2026", published: true, slug: "family-story" },
  { id: "bp6", title: "Introducing the Creator Training Portal", excerpt: "Our new training portal helps restaurant teams learn about allergen basics.", content: "Full article...", author: "James Park", role: "Training Lead", cat: "Product", img: "🎓", date: "May 25, 2026", published: true, slug: "training-portal" },
  { id: "bp7", title: "What the new UK allergen labeling laws mean", excerpt: "Owen's Law is changing how UK restaurants must display allergen information.", content: "Full article...", author: "Emma Collins", role: "Head of Trust & Safety", cat: "Education", img: "📋", date: "May 20, 2026", published: true, slug: "uk-allergen-laws" },
  { id: "bp8", title: "11 restaurants in Manchester that take celiac disease seriously", excerpt: "Our community has spoken. These 11 Manchester restaurants have the highest safety scores.", content: "Full article...", author: "Sarah Mitchell", role: "Top Creator · Manchester", cat: "Guides", img: "🍝", date: "May 15, 2026", published: true, slug: "manchester-celiac" },
  { id: "bp9", title: "The DietaryID payment system explained", excerpt: "A transparent look at how our creator economy works.", content: "Full article...", author: "Jordan Lee", role: "Product Manager", cat: "Product", img: "💰", date: "May 10, 2026", published: true, slug: "payment-system" },
];

const listeners = new Set<() => void>();

function emit() { listeners.forEach((fn) => fn()); }

export function getPosts(): BlogPost[] { return posts; }
export function getPublishedPosts(): BlogPost[] { return posts.filter((p) => p.published); }
export function getLatestPosts(n: number = 3): BlogPost[] { return posts.filter((p) => p.published).slice(0, n); }

export function addPost(p: Omit<BlogPost, "id" | "date">) {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  posts.unshift({ ...p, id: `bp_${Date.now()}`, date });
  emit();
}

export function updatePost(id: string, data: Partial<Omit<BlogPost, "id">>) {
  posts = posts.map((p) => p.id === id ? { ...p, ...data } : p);
  emit();
}

export function deletePost(id: string) {
  posts = posts.filter((p) => p.id !== id);
  emit();
}

export function subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; }
