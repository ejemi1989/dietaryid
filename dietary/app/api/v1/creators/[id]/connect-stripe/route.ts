import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json({ status: "success", data: { onboardingUrl: "https://connect.stripe.com/onboarding/mock", stripeAccountId: "acct_new", message: "Redirect to Stripe onboarding" } });
}
