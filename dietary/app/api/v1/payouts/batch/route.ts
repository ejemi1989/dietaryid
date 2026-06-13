import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "success",
    batch_id: `batch_oct_${Date.now()}`,
    created_at: new Date().toISOString(),
    summary: {
      total_creators: 847,
      total_amount: 124350.65,
      payouts: { submitted: 834, failed: 13, on_hold: 0 },
    },
    payouts: [
      {
        payout_id: "payout_001",
        creator_id: "creator_001",
        amount_requested: 235.55,
        amount_to_payout: 231.82,
        fees: 3.73,
        status: "submitted",
        stripe_payout_id: "po_1234567890",
      },
    ],
  });
}
