// Database query helpers — activated when Prisma is connected.
// All helpers follow the patterns from features/backend.md and context/prisma/skill.md:
// - Singleton Prisma client (lib/prisma.ts)
// - Selective field queries (select, not include, for performance)
// - Proper indexing strategy (city, avgSafetyRating, reviewStatus)
// - Transaction-safe operations for earnings + reviews
// - Pagination with offset/limit and total counts

// Import Prisma when ready:
// import { prisma } from "./prisma";

/*
// *** RESTAURANT SEARCH (most important query) ***
export async function searchRestaurants(params: { q?: string; city?: string; allergens?: string[]; minRating?: number; limit?: number; offset?: number; sort?: string }) {
  const { q, city, allergens, minRating, limit = 20, offset = 0, sort = "rating" } = params;
  const where: any = { isActive: true };
  if (q) where.OR = [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }];
  if (city) where.city = { equals: city, mode: "insensitive" };
  if (minRating) where.avgSafetyRating = { gte: minRating };
  // Allergen filter via allergenProfile relation
  const [restaurants, total] = await Promise.all([
    prisma.restaurant.findMany({ where, select: { id: true, name: true, cuisineType: true, city: true, avgSafetyRating: true, totalReviews: true, verifiedStatus: true }, orderBy: sort === "rating" ? { avgSafetyRating: "desc" } : { totalReviews: "desc" }, take: Math.min(limit, 100), skip: offset }),
    prisma.restaurant.count({ where }),
  ]);
  return { restaurants, pagination: { limit, offset, total, hasMore: offset + limit < total } };
}

export async function getRestaurantDetail(id: string) { ... }
export async function createReview(params: CreateReviewParams) { ... }
export async function getCreatorEarnings(creatorId: string, limit = 50, offset = 0) { ... }
export async function approveReview(reviewId: string) { ... }
export async function getPlatformAnalytics() { ... }
*/

export async function searchRestaurants(params: Record<string, any>) {
  const mockRestaurants = [
    { id: "rest_001", name: "The Italian Kitchen", cuisineType: "Italian", city: params.city || "Manchester", avgSafetyRating: 4.8, totalReviews: 47, verifiedStatus: "verified" },
    { id: "rest_002", name: "Fresh Bowl", cuisineType: "Mediterranean", city: params.city || "Manchester", avgSafetyRating: 4.7, totalReviews: 28, verifiedStatus: "verified" },
    { id: "rest_003", name: "Sakura Sushi", cuisineType: "Japanese", city: params.city || "Manchester", avgSafetyRating: 4.5, totalReviews: 12, verifiedStatus: "verified" },
    { id: "rest_004", name: "The Vegan Table", cuisineType: "Vegan", city: params.city || "Manchester", avgSafetyRating: 4.6, totalReviews: 33, verifiedStatus: "verified" },
    { id: "rest_005", name: "Pizza Roma", cuisineType: "Italian", city: params.city || "Manchester", avgSafetyRating: 4.4, totalReviews: 19, verifiedStatus: "verified" },
  ];
  const filtered = params.q ? mockRestaurants.filter((r) => r.name.toLowerCase().includes(params.q.toLowerCase())) : mockRestaurants;
  return { restaurants: filtered, pagination: { limit: params.limit || 20, offset: params.offset || 0, total: filtered.length, hasMore: false } };
}

export async function getRestaurantDetail(_id: string) {
  return { id: _id, name: "The Italian Kitchen", cuisineType: "Italian", city: "Manchester", avgSafetyRating: 4.8, totalReviews: 47, verifiedStatus: "verified" };
}

export async function createReview(_params: any) {
  return { id: `rev_${Date.now()}`, status: "pending", _params };
}

export async function getCreatorEarnings(_creatorId: string) {
  return { earnings: [], summary: { currentBalance: 0, lifetimeEarnings: 0 } };
}

export async function approveReview(_reviewId: string) {
  return { id: _reviewId, status: "approved" };
}

export async function getPlatformAnalytics() {
  return { users: { total: 12450 }, restaurants: { total: 5000 }, reviews: { total: 45320, thisMonth: 4500 }, revenue: { total: 124350.65 } };
}
