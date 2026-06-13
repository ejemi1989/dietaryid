import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ status: "success", message: "Logged out successfully" });
}

export async function GET() {
  return NextResponse.json({ status: "success", data: { id: "user_001", email: "sarah@dietaryid.com", name: "Sarah Mitchell", allergies: { celiac: true, gluten: true, dairy: true }, isCreator: true, creatorStats: { totalReviews: 156, totalEarnings: 2847.30, rating: 4.9 } } });
}

export async function PUT(req: Request) {
  const body = await req.json();
  return NextResponse.json({ status: "success", data: { ...body, id: "user_001", updatedAt: new Date().toISOString() } });
}
