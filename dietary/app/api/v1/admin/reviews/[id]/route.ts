import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", data: { reviewStatus: "approved", earnings: { creatorId: "user_001", amount: 1.35, status: "completed" } } });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  return NextResponse.json({ status: "success", message: "Review rejected", reason: body.reason });
}
