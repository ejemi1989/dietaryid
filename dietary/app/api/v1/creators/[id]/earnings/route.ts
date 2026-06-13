import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const limit = parseInt(new URL(req.url).searchParams.get("limit") || "50");
  return NextResponse.json({ status: "success", data: { earnings: [{ id: "earn_001", type: "review", amount: 1.35, status: "completed", createdAt: "2024-10-05T14:30:00Z" }, { id: "earn_002", type: "verification", amount: 0.50, status: "pending", createdAt: "2024-10-06T09:15:00Z" }], summary: { currentBalance: 234.50, pendingBalance: 47.20, lifetimeEarnings: 2847.30, thisMonthEarnings: 234.50, nextPayoutDate: "2024-11-15" } }, pagination: { limit, offset: 0, total: 156, hasMore: true } });
}
