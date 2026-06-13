import { NextResponse } from "next/server";
import { searchRestaurants } from "@/actions/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await searchRestaurants({
      q: searchParams.get("q") || undefined,
      city: searchParams.get("city") || undefined,
      min_rating: searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined,
      limit: parseInt(searchParams.get("limit") || "20"),
      offset: parseInt(searchParams.get("offset") || "0"),
    });
    return NextResponse.json({ status: "success", ...result, pagination: { limit: 20, offset: 0, total: result.total, hasMore: (parseInt(searchParams.get("offset") || "0") + 20) < result.total } });
  } catch (e: any) {
    return NextResponse.json({ status: "error", error: { code: "SEARCH_FAILED", message: e.message } }, { status: 500 });
  }
}
