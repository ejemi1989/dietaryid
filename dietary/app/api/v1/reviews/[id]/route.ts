import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ status: "success", data: { id, restaurantId: "rest_001", title: "Amazing!", content: "Full content...", safetyRating: 5, overallRating: 5, reviewStatus: "approved", helpfulCount: 45, createdAt: "2024-01-10T10:30:00Z" } });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const body = await req.json();
  return NextResponse.json({ status: "success", data: { id, ...body } });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", message: "Review deleted" });
}
