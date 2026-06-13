import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    status: "success",
    payout_id: `payout_emergency_${Date.now()}`,
    creator_id: body.creator_id,
    amount: body.amount,
    payout_status: "submitted",
    stripe_payout_id: `po_${Date.now()}`,
    message: "Manual payout submitted",
    note: "Creator balance will not be reset until payout completes",
  });
}
