import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ status: "success", data: { id: `guide_${Date.now()}`, ...body, views: 0, earnings: { amount: 6.50, status: "pending" } } }, { status: 201 });
}

export async function GET(req: Request, { params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return NextResponse.json({ status: "success", data: [{ id: "guide_001", city, title: "Gluten-Free Guide to " + city, content: "Markdown content...", creator: { name: "Sarah M." }, views: 450, helpfulCount: 78, createdAt: "2024-01-10T10:30:00Z" }] });
}
