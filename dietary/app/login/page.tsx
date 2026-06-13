"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function LoginForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const loginRole = searchParams.get("role");
  const [email, setEmail] = useState(loginRole === "admin" ? "admin@dietaryid.com" : loginRole === "restaurant" ? "restaurant@dietaryid.com" : "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const destination = email.includes("admin@") ? "/admin/analytics" : email.includes("restaurant@") ? "/restaurant/dashboard" : "/user/dashboard";
      window.location.href = destination;
    }
  };

  const handleSocial = async (provider: "google" | "github" | "apple") => {
    if (provider === "google") {
      await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    } else if (provider === "github") {
      await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    } else {
      setLoading(true);
      setTimeout(() => { setLoading(false); window.location.href = "/user/dashboard"; }, 600);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    await supabase.auth.resetPasswordForEmail(forgotEmail, { redirectTo: `${window.location.origin}/login` });
    setForgotSent(true);
    setTimeout(() => { setShowForgot(false); setForgotSent(false); setForgotEmail(""); }, 2500);
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
            Eat out with confidence,<br />starting today.
          </h1>
          <p className="text-[var(--color-foot-text)] text-[15px] leading-[1.6] max-w-[420px] mb-8">
            Sign in to find restaurants verified safe for your allergies, see reviews from people like you, and earn money as a creator.
          </p>

          <div className="space-y-3 max-w-[420px]">
            {[
              { icon: "🛡️", title: "3-layer safety verification", desc: "Menu + database + community — for every restaurant" },
              { icon: "👥", title: "12,450+ people with your allergies", desc: "Real reviews from real peers in your city" },
              { icon: "💰", title: "Earn as a creator", desc: "Get paid for reviews, dish verifications, and city guides" },
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
          © 2024 DietaryID · Helping people eat safely since 2023
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-6 no-underline">
            <div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] flex items-center justify-center text-white font-bold text-[16px]">D</div>
            <span className="font-bold text-[16px] text-[var(--color-navy)]">DietaryID</span>
          </Link>

          <h2 className="text-[28px] font-extrabold text-[var(--color-navy)] tracking-[-0.5px] mb-1">
            {loginRole === "admin" ? "Admin login" : loginRole === "restaurant" ? "Restaurant login" : "Welcome back"}
          </h2>
          <p className="text-[14px] text-[var(--color-muted)] mb-7">
            {loginRole === "admin" ? "Sign in to manage DietaryID" : loginRole === "restaurant" ? "Sign in to your restaurant dashboard" : "Sign in to your DietaryID account"}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              onClick={() => handleSocial("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 border border-[var(--color-btn-border)] rounded-[10px] bg-white text-[13.5px] text-[var(--color-navy)] font-medium hover:bg-[var(--color-nav-hover)] transition-colors disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocial("github")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 border border-[var(--color-btn-border)] rounded-[10px] bg-white text-[13.5px] text-[var(--color-navy)] font-medium hover:bg-[var(--color-nav-hover)] transition-colors disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[var(--color-btn-border)]" />
            <span className="text-[12px] text-[var(--color-muted)] uppercase tracking-wider">or with email</span>
            <div className="flex-1 h-px bg-[var(--color-btn-border)]" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10 transition-all"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12.5px] font-medium text-[var(--color-navy)]">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-[12px] text-[var(--color-navy-soft)] hover:text-[var(--color-navy)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-navy)]"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 mb-4 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--color-btn-border)] accent-[var(--color-navy)]"
              />
              <span className="text-[13px] text-[var(--color-navy-soft)]">Keep me signed in for 30 days</span>
            </label>

            {error && (
              <div className="mb-3 p-2.5 rounded-[8px] bg-[#fef2f2] border border-[#fecaca] text-[12.5px] text-[#b91c1c]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-navy)] text-white font-semibold text-[14px] py-3 rounded-[11px] hover:bg-[var(--color-navy-dark)] transition-colors disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-[13px] text-[var(--color-muted)] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--color-navy)] font-semibold no-underline hover:underline">
              Sign up free
            </Link>
           </p>
        </div>
      </div>

      {showForgot && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => !forgotSent && setShowForgot(false)}>
          <div className="bg-white rounded-[14px] p-6 max-w-[420px] w-full" onClick={(e) => e.stopPropagation()}>
            {forgotSent ? (
              <div className="text-center py-4">
                <div className="text-[48px] mb-2">✉</div>
                <h3 className="text-[18px] font-semibold text-[var(--color-navy)] mb-2">Check your email</h3>
                <p className="text-[13px] text-[var(--color-muted)]">We sent a password reset link to <strong>{forgotEmail}</strong></p>
              </div>
            ) : (
              <>
                <h3 className="text-[18px] font-semibold text-[var(--color-navy)] mb-1">Reset your password</h3>
                <p className="text-[13px] text-[var(--color-muted)] mb-4">We&apos;ll email you a link to reset your password.</p>
                <form onSubmit={handleForgot}>
                  <div className="mb-3">
                    <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Email</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoFocus
                      className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowForgot(false)} className="px-4 py-2 text-[13px] rounded-[10px] border border-[var(--color-btn-border)] text-[var(--color-navy)] hover:bg-[var(--color-nav-hover)]">Cancel</button>
                    <button type="submit" disabled={!forgotEmail.trim()} className="px-4 py-2 text-[13px] rounded-[10px] bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-dark)] disabled:opacity-50">Send link</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-navy)]" />}>
      <LoginForm />
    </Suspense>
  );
}
