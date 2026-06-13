import { NextResponse } from "next/server";
import { createCommunityPost } from "@/actions/db";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { searchParams } = new URL(req.url);
  const { data, error } = await supabase.from("community_posts").select("id, title, content, post_type, category, restriction_type, likes_count, replies_count, created_at").order("created_at", { ascending: false }).limit(parseInt(searchParams.get("limit") || "20"));
  if (error) return NextResponse.json({ status: "error", error }, { status: 500 });
  return NextResponse.json({ status: "success", data });
}
