"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
async function getSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function saveProfile(formData: {
  display_name?: string; bio?: string; location_city?: string;
  dietary_restrictions?: string[]; dietary_notes?: string; years_with_condition?: string;
  is_creator?: boolean; creator_bio?: string; creator_specialties?: string[];
  preferred_cities?: string[]; linkedin_url?: string; instagram_url?: string;
}) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const isComplete = !!(formData.display_name && formData.dietary_restrictions?.length);
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    ...formData,
    is_complete: isComplete,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  revalidatePath("/user/profile");
  return { success: true };
}

export async function getProfile() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data;
}

export async function createReview(data: {
  restaurant_id: string; title?: string; content: string;
  safety_rating: number; overall_rating: number; allergens_mentioned?: string[];
}) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  if (data.content.length < 100) throw new Error("Review must be 100+ characters");

  const { error, data: review } = await supabase.from("restaurant_reviews").insert({
    user_id: user.id, restaurant_id: data.restaurant_id, title: data.title,
    content: data.content, safety_rating: data.safety_rating,
    overall_rating: data.overall_rating, allergens_mentioned: data.allergens_mentioned || [],
    review_status: "pending",
  }).select().single();
  if (error) throw error;

  await supabase.from("creator_commissions").insert({
    creator_id: user.id, restaurant_id: data.restaurant_id,
    commission_type: "review", amount: 1.35, status: "pending",
  });
  revalidatePath(`/user/reviews`);
  return review;
}

export async function createCommunityPost(data: { title: string; content: string; post_type?: string; restriction_type?: string; category?: string }) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase.from("community_posts").insert({
    user_id: user.id, ...data,
  });
  if (error) throw error;
  revalidatePath("/user/community");
  return { success: true };
}

export async function searchRestaurants(params: { q?: string; city?: string; min_rating?: number; limit?: number; offset?: number }) {
  const supabase = await getSupabase();
  let query = supabase.from("restaurants").select("id, name, cuisine_type, city, avg_safety_rating, total_reviews, verified_status, is_active", { count: "exact" }).eq("is_active", true);
  if (params.city) query = query.ilike("city", `%${params.city}%`);
  if (params.q) query = query.or(`name.ilike.%${params.q}%,description.ilike.%${params.q}%`);
  if (params.min_rating) query = query.gte("avg_safety_rating", params.min_rating);
  query = query.order("avg_safety_rating", { ascending: false }).range(params.offset || 0, (params.offset || 0) + (params.limit || 19));
  const { data, count, error } = await query;
  if (error) throw error;
  return { restaurants: data, total: count || 0 };
}

export async function createBooking(data: { restaurant_id: string; restaurant_name: string; user_name: string; user_restriction?: string; date: string; time: string; party_size?: number; requests?: string }) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("bookings").insert({
    user_id: user?.id, restaurant_id: data.restaurant_id, restaurant_name: data.restaurant_name,
    user_name: data.user_name, user_restriction: data.user_restriction,
    date: data.date, time: data.time, party_size: data.party_size || 2, requests: data.requests, status: "Waiting",
  });
  if (error) throw error;
  revalidatePath("/user/dashboard");
  return { success: true };
}

export async function completeTrainingModule(data: { member_id: string; member_name: string; module_id: string; score: number }) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("training_completions").upsert({
    member_id: data.member_id, member_name: data.member_name,
    module_id: data.module_id, score: data.score, status: "completed",
    completed_at: new Date().toISOString(),
  }, { onConflict: "member_id, module_id" });
  if (error) throw error;
  return { success: true };
}

export async function createSupportTicket(data: { restaurant_name: string; restaurant_email: string; subject: string; type: string; priority?: string; description: string }) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("support_tickets").insert({
    restaurant_name: data.restaurant_name, restaurant_email: data.restaurant_email,
    subject: data.subject, type: data.type, priority: data.priority || "Medium",
    description: data.description, status: "open",
  });
  if (error) throw error;
  return { success: true };
}
