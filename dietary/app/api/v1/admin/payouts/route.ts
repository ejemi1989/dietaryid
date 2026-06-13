import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({ status: "success", data: { id: `batch_${Date.now()}`, totalCreators: 847, totalAmount: 124350.65, totalFees: 1856.40, netAmount: 122494.25, status: "created" } });
}
