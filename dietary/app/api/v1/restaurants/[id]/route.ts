import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ status: "success", data: { id, name: "The Italian Kitchen", description: "Family-run Italian restaurant in Manchester", cuisineType: "Italian", city: "Manchester", avgSafetyRating: 4.8, totalReviews: 47, verifiedStatus: "verified", reviews: [{ id: "rev_001", title: "Amazing and safe!", content: "Excellent cross-contamination procedures...", safetyRating: 5, overallRating: 5, creator: { name: "Sarah M.", avatarUrl: "https://i.pravatar.cc/80?u=sarah" }, helpfulCount: 23, createdAt: "2024-01-10T10:30:00Z" }], menuItems: [{ id: "item_001", name: "Gluten-Free Pasta", price: 12.99, isGlutenFree: true, isVerified: true }] } });
}
