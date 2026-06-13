import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "success", data: { users: { total: 12450, newThisMonth: 450, active: 8900 }, reviews: { total: 45320, thisMonth: 4500, avgRating: 4.6 }, revenue: { total: 124350.65, thisMonth: 124350.65, bySource: { commission: 18652.60, premium: 2940.00 } } } });
}
