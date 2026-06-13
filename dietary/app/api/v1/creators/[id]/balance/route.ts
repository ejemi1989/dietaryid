import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", data: { currentBalance: 234.50, pendingBalance: 47.20, lifetimeEarnings: 2847.30, lastPayoutDate: "2024-10-15", nextPayoutDate: "2024-11-15", minimumThreshold: 5.00 } });
}
