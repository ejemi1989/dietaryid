import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    status: "success",
    earning_id: `earn_${Date.now()}`,
    creator_id: body.creator_id,
    amount: body.amount,
    earning_type: body.earning_type,
    earning_status: "completed",
    created_at: new Date().toISOString(),
    verified_at: null,
  }, { status: 201 });
}
