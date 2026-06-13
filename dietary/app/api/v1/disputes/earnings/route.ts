import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    status: "success",
    dispute_id: `dispute_earnings_${Date.now()}`,
    creator_id: body.creator_id,
    status_value: "investigating",
    created_at: new Date().toISOString(),
    assigned_to: "admin_001",
  });
}
