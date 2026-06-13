"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function RestaurantLoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("restaurant@dietaryid.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Enter email and password."); return; }
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError(authError.message); setLoading(false); return; }
    if (data.user) router.push("/restaurant/dashboard");
  };

  return (
    <div className="min-h-screen flex items-stretch bg-[var(--color-navy)] text-[var(--color-navy)]">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-dark)] p-12 flex-col justify-between">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[var(--color-peach)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 w-[500px] h-[500px] rounded-full bg-[var(--color-indigo)] opacity-20 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2.5 text-white no-underline font-bold text-[20px]">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] flex items-center justify-center text-white font-bold text-[18px]">D</div>
          DietaryID
        </Link>

        <div className="relative">
          <h1 className="text-white text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] mb-3">
            Reach allergy-conscious<br />customers. Grow your business.
          </h1>
          <p className="text-[var(--color-foot-text)] text-[15px] leading-[1.6] max-w-[420px] mb-8">
            Join DietaryID for Restaurants. Verify your menu, respond to reviews, and attract diners actively looking for safe places to eat.
          </p>

          <div className="space-y-3 max-w-[420px]">
            {[
              { icon: "🛡️", title: "Get verified safe", desc: "Verified Safe badge for Celiac, Gluten-Free, Nut-Free & more" },
              { icon: "👥", title: "2,340+ allergy-conscious diners", desc: "In your area, actively searching for restaurants like yours" },
              { icon: "📈", title: "Grow your revenue", desc: "£240-360/month estimated from DietaryID diners — reviews drive bookings" },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-[12px] p-3">
                <div className="text-[20px] flex-shrink-0">{b.icon}</div>
                <div>
                  <div className="text-white text-[13.5px] font-semibold mb-0.5">{b.title}</div>
                  <div className="text-[var(--color-foot-text)] text-[12.5px]">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[var(--color-foot-muted)] text-[12px]">
          © 2024 DietaryID · Helping restaurants serve allergy-conscious diners
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-6 no-underline">
            <div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] flex items-center justify-center text-white font-bold text-[16px]">D</div>
            <span className="font-bold text-[16px] text-[var(--color-navy)]">DietaryID</span>
          </Link>

          <h2 className="text-[28px] font-extrabold text-[var(--color-navy)] tracking-[-0.5px] mb-1">Restaurant sign in</h2>
          <p className="text-[14px] text-[var(--color-muted)] mb-7">Sign in to your restaurant dashboard</p>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[var(--color-btn-border)]" />
            <span className="text-[12px] text-[var(--color-muted)] uppercase tracking-wider">restaurant portal</span>
            <div className="flex-1 h-px bg-[var(--color-btn-border)]" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10 transition-all"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12.5px] font-medium text-[var(--color-navy)]">Password</label>
                <button type="button" onClick={() => alert("Reset link sent")} className="text-[12px] text-[var(--color-navy-soft)] hover:text-[var(--color-navy)] hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10 transition-all"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-navy)]" tabIndex={-1}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-3 p-2.5 rounded-[8px] bg-[#fef2f2] border border-[#fecaca] text-[12.5px] text-[#b91c1c]">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-navy)] text-white font-semibold text-[14px] py-3 rounded-[11px] hover:bg-[var(--color-navy-dark)] transition-colors disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in to restaurant portal"}
            </button>
          </form>

          <p className="text-center text-[13px] text-[var(--color-muted)] mt-6">
            New restaurant?{" "}
            <Link href="/restaurant-signup" className="text-[var(--color-navy)] font-semibold no-underline hover:underline">Create your account</Link>
           </p>
        </div>
      </div>
    </div>
  );
}
