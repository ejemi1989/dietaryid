import rawData from "@/uk_restaurants.json";

export type UKRestaurant = {
  name: string;
  category: string;
  categories: string;
  hours: string;
  address: string;
  country: string;
  postal_code: string;
  price_level: string;
  rating: number;
  reviews_count: number;
  status: string;
  website: string;
  phone: string;
  booking_links: string;
  menu_link: string;
  social: string;
  plus_code: string;
  safetyScore: number;
  safeDishes: string[];
  emoji: string;
  id: string;
};

const cuisineEmojis: Record<string, string> = {
  "turkish": "🥙", "middle eastern": "🧆", "italian": "🍝", "japanese": "🍣",
  "chinese": "🥡", "indian": "🍛", "thai": "🍜", "mexican": "🌮",
  "mediterranean": "🥗", "french": "🥐", "american": "🍔", "vietnamese": "🍲",
  "korean": "🥩", "spanish": "🥘", "greek": "🫒", "british": "🍳",
  "vegan": "🥬", "vegetarian": "🥦", "seafood": "🐟", "steakhouse": "🥩",
  "pizza": "🍕", "sushi": "🍣", "burger": "🍔", "cafe": "☕",
};

function getEmoji(category: string): string {
  const cat = category.toLowerCase();
  for (const [key, emoji] of Object.entries(cuisineEmojis)) {
    if (cat.includes(key)) return emoji;
  }
  return "🍽️";
}

function getSafetyScore(rating: number, reviews: number): number {
  const base = rating ? rating * 20 : 75;
  const reviewBonus = Math.min(reviews / 10, 15);
  return Math.min(95, Math.max(50, Math.round(base + reviewBonus)));
}

function getSafeDishes(category: string): string[] {
  const cat = category.toLowerCase();
  const dishes: string[] = [];
  if (cat.includes("turkish") || cat.includes("mediterranean")) {
    dishes.push("Mixed Grill Platter", "Hummus & Pita", "Lamb Shish");
  } else if (cat.includes("italian")) {
    dishes.push("Pasta Primavera", "Margherita Pizza", "Risotto");
  } else if (cat.includes("japanese") || cat.includes("sushi")) {
    dishes.push("Sashimi Platter", "Edamame", "Miso Soup");
  } else if (cat.includes("indian")) {
    dishes.push("Chicken Tikka", "Lamb Biryani", "Dal Makhani");
  } else if (cat.includes("chinese")) {
    dishes.push("Kung Pao Chicken", "Steamed Dumplings", "Fried Rice");
  } else {
    dishes.push("Grilled Salmon", "Caesar Salad", "House Special");
  }
  return dishes;
}

export function loadRestaurants(): UKRestaurant[] {
  const data = rawData as any[];
  return data.map((r, i) => {
    const rating = parseFloat(r.Rating) || 4;
    const reviews = parseInt(r.reviews_count) || 0;
    const category = r.Category_primary || r.Categories || "Restaurant";
    const safetyScore = getSafetyScore(rating, reviews);
    return {
      name: r["Tittle Name"],
      category,
      categories: r.Categories || category,
      hours: r["Opening hours"] || "",
      address: r.Address || "",
      country: r.country || "UK",
      postal_code: r.postal_code || "",
      price_level: r.price_level || "$$",
      rating,
      reviews_count: reviews,
      status: r.business_status || "OPERATIONAL",
      website: r["Website link"] || "",
      phone: r["Phone number"] || "",
      booking_links: r.booking_links || "",
      menu_link: r["Menu link"] || "",
      social: r["Social media profiles (if available)"] || "",
      plus_code: r.plus_code || "",
      safetyScore,
      safeDishes: getSafeDishes(category),
      emoji: getEmoji(category),
      id: `uk_${i + 1}`,
    };
  });
}

export const ukRestaurants = loadRestaurants();
