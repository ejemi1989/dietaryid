"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("admin@dietaryid.com");
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
    if (data.user) router.push("/admin/analytics");
  };

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-[10px] bg-admin-dark text-white flex items-center justify-center font-bold text-[22px] mx-auto mb-3">D</div>
          <h1 className="text-[24px] font-semibold text-admin-text mb-1">DietaryID Admin</h1>
          <p className="text-[13.5px] text-admin-muted">Sign in to manage the platform</p>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[12.5px] font-medium text-admin-text mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-3.5 py-2.5 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark transition-colors"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12.5px] font-medium text-admin-text">Password</label>
                <button type="button" onClick={() => alert("Reset link sent")} className="text-[11.5px] text-admin-new-text hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark transition-colors"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text" tabIndex={-1}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-2.5 rounded-md bg-admin-non-bg border border-admin-non-text/20 text-[12.5px] text-admin-non-text">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-admin-dark text-white font-semibold text-[14px] py-2.5 rounded-md hover:opacity-90 disabled:opacity-70 transition-colors"
            >
              {loading ? "Signing in..." : "Sign in to admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
