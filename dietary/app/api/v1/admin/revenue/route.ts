import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    period: "2024-10",
    revenue: {
      total_creator_earnings: 124350.65,
      platform_commission: 15,
      platform_revenue: 18652.60,
      breakdown: { reviews: 14520.30, verifications: 2145.70, guides: 1684.65 },
    },
    payout_costs: {
      payment_processor_fees: 1856.40,
      manual_payouts: 0,
      net_revenue: 16796.20,
    },
  });
}
