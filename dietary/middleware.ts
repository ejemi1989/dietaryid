import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, { cookies: { getAll() { return request.cookies.getAll(); }, setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); } } });
  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;
  const isUserRoute = path.startsWith("/user/");
  const isAdminRoute = path.startsWith("/admin/");
  const isRestaurantRoute = path.startsWith("/restaurant/");
  const isProtected = (isUserRoute || isAdminRoute || isRestaurantRoute) && path !== "/admin/login";
  if (isProtected && !user) {
    if (isAdminRoute) return NextResponse.redirect(new URL("/auth/admin", request.url));
    if (isRestaurantRoute) return NextResponse.redirect(new URL("/auth/restaurant", request.url));
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && path === "/auth/admin") return NextResponse.redirect(new URL("/admin/analytics", request.url));
  if (user && path === "/auth/restaurant") return NextResponse.redirect(new URL("/restaurant/dashboard", request.url));
  if (user && (path === "/login" || path === "/signup")) {
    const email = user.email || "";
    const dest = email.includes("admin@") ? "/admin/analytics" : email.includes("restaurant@") ? "/restaurant/dashboard" : "/user/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }
  return response;
}

export const config = { matcher: ["/user/:path*", "/admin/:path*", "/restaurant/:path*", "/login", "/signup", "/auth/admin", "/auth/restaurant"] };
