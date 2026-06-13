import { NextResponse } from "next/server";
import { createReview } from "@/actions/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const review = await createReview(body);
    return NextResponse.json({ status: "success", data: review, earnings: { amount: 1.35, status: "pending" } }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ status: "error", error: { code: "REVIEW_FAILED", message: e.message } }, { status: 400 });
  }
}
