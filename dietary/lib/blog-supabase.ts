import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getPublishedPosts() {
  const supabase = createClient(await cookies());
  const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
  return data || [];
}

export async function getLatestPosts(n = 3) {
  const supabase = createClient(await cookies());
  const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false }).limit(n);
  return data || [];
}
