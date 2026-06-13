import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", data: { id: params.then(p => p.id), name: "Sarah Mitchell", bio: "Celiac warrior", locationCity: "Manchester", isCreator: true, creatorStats: { totalReviews: 156, avgRating: 4.9, totalEarnings: 2847.30, followers: 1240 }, allergyProfile: { allergies: { celiac: true, gluten: true } } } });
}
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", data: { isFollowing: true, followers: 1241 } });
}
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", message: "Unfollowed" });
}
