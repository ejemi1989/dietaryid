import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", data: { stripeAccountId: "acct_123", stripeAccountVerified: true, paypalEmail: null, taxCountry: "UK", minimumPayoutThreshold: 5.00, autoPayoutEnabled: true } });
}
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  return NextResponse.json({ status: "success", data: { ...body, updatedAt: new Date().toISOString() } });
}
