"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Step = 0 | 1 | 2 | 3;

const allergyOptions = [
  { id: "celiac", label: "Celiac Disease", emoji: "🌾", desc: "Severe gluten reaction" },
  { id: "gluten", label: "Gluten-Free", emoji: "🍞", desc: "Sensitivity or preference" },
  { id: "nut", label: "Nut Allergy", emoji: "🥜", desc: "Peanuts and/or tree nuts" },
  { id: "dairy", label: "Dairy Allergy / Lactose", emoji: "🥛", desc: "Milk, cheese, butter" },
  { id: "shellfish", label: "Shellfish", emoji: "🦐", desc: "Shrimp, crab, lobster" },
  { id: "egg", label: "Egg Allergy", emoji: "🥚", desc: "Eggs in any form" },
  { id: "soy", label: "Soy Allergy", emoji: "🫘", desc: "Soy and soy-based products" },
  { id: "fish", label: "Fish Allergy", emoji: "🐟", desc: "All fish species" },
  { id: "sesame", label: "Sesame Allergy", emoji: "🌱", desc: "Sesame seeds, tahini" },
  { id: "crohns", label: "Crohn's Disease", emoji: "🔥", desc: "IBD - avoid trigger foods" },
  { id: "ibs", label: "IBS", emoji: "🌀", desc: "Low FODMAP helpful" },
  { id: "fodmap", label: "Low FODMAP", emoji: "🥦", desc: "Avoid certain carbs" },
  { id: "vegan", label: "Vegan", emoji: "🌱", desc: "No animal products" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥗", desc: "No meat" },
  { id: "kosher", label: "Kosher", emoji: "✡️", desc: "Follows Jewish dietary laws" },
  { id: "halal", label: "Halal", emoji: "☪️", desc: "Follows Islamic dietary laws" },
];

const cuisineOptions = ["Italian", "Asian", "Mediterranean", "American", "Indian", "Mexican", "Japanese", "French", "Vegan/Vegetarian", "Other"];

export default function SignupPage() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedAllergies: [] as string[],
    city: "",
    cuisines: [] as string[],
    radius: "5km",
    notifications: { newReviews: true, communityReplies: true, weeklyDigest: false },
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((p) => ({ ...p, [k]: v }));
  const toggleAllergy = (id: string) => {
    setForm((p) => ({
      ...p,
      selectedAllergies: p.selectedAllergies.includes(id) ? p.selectedAllergies.filter((a) => a !== id) : [...p.selectedAllergies, id],
    }));
  };
  const toggleCuisine = (c: string) => {
    setForm((p) => ({
      ...p,
      cuisines: p.cuisines.includes(c) ? p.cuisines.filter((x) => x !== c) : [...p.cuisines, c],
    }));
  };

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"][passwordStrength];

  const canProceed = () => {
    if (step === 0) return form.name.trim() && form.email.trim() && form.password.length >= 8 && form.password === form.confirmPassword;
    if (step === 1) return form.selectedAllergies.length > 0;
    if (step === 2) return form.city.trim();
    if (step === 3) return form.agreedToTerms;
    return false;
  };

  const handleNext = () => {
    if (canProceed() && step < 3) setStep((s) => (s + 1) as Step);
  };
  const handleBack = () => {
    if (step > 0) setStep((s) => (s - 1) as Step);
  };
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { name: form.name, allergies: form.selectedAllergies, city: form.city } } });
    if (error) { setLoading(false); return; }
    window.location.href = "/user/dashboard";
  };

  const stepTitles = ["Create your account", "Your allergies", "Where you eat", "You're all set"];

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
            Find restaurants<br />safe for YOU.
          </h1>
          <p className="text-[var(--color-foot-text)] text-[15px] leading-[1.6] max-w-[420px] mb-8">
            Join 12,450+ people eating safely. Set up your allergy profile in under 2 minutes — we&apos;ll filter every search for you.
          </p>

          <div className="space-y-3 max-w-[420px]">
            {[
              { n: 1, t: "Set your allergies", d: "Tell us once, we filter every result" },
              { n: 2, t: "Find safe spots nearby", d: "Verified restaurants, dishes, and people like you" },
              { n: 3, t: "Earn as a creator", d: "Get paid for reviews and verifications" },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] text-white flex items-center justify-center text-[12.5px] font-semibold flex-shrink-0">{s.n}</div>
                <div>
                  <div className="text-white text-[14px] font-semibold mb-0.5">{s.t}</div>
                  <div className="text-[var(--color-foot-text)] text-[12.5px]">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[var(--color-foot-muted)] text-[12px]">
          © 2024 DietaryID · Helping people eat safely since 2023
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-[480px] py-4">
          <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-6 no-underline">
            <div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] flex items-center justify-center text-white font-bold text-[16px]">D</div>
            <span className="font-bold text-[16px] text-[var(--color-navy)]">DietaryID</span>
          </Link>

          <div className="flex items-center gap-1.5 mb-5">
            {[0, 1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-[var(--color-navy)]" : "bg-[var(--color-btn-border)]"
                }`}
              />
            ))}
          </div>
          <p className="text-[12px] text-[var(--color-muted)] mb-1">Step {step + 1} of 4</p>
          <h2 className="text-[24px] font-extrabold text-[var(--color-navy)] tracking-[-0.5px] mb-1">{stepTitles[step]}</h2>
          {step === 0 && <p className="text-[13.5px] text-[var(--color-muted)] mb-6">Free forever · No credit card required</p>}
          {step === 1 && <p className="text-[13.5px] text-[var(--color-muted)] mb-6">Select all that apply. You can change these anytime.</p>}
          {step === 2 && <p className="text-[13.5px] text-[var(--color-muted)] mb-6">We use this to find safe restaurants near you.</p>}
          {step === 3 && <p className="text-[13.5px] text-[var(--color-muted)] mb-6">Quick preferences, then you&apos;re in.</p>}

          {step === 0 && (
            <>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={async () => await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } })}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 border border-[var(--color-btn-border)] rounded-[10px] bg-white text-[13.5px] text-[var(--color-navy)] font-medium hover:bg-[var(--color-nav-hover)] transition-colors"
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
                  onClick={() => window.location.href = "/user/dashboard"}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 border border-[var(--color-btn-border)] rounded-[10px] bg-white text-[13.5px] text-[var(--color-navy)] font-medium hover:bg-[var(--color-nav-hover)] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[var(--color-btn-border)]" />
                <span className="text-[12px] text-[var(--color-muted)] uppercase tracking-wider">or with email</span>
                <div className="flex-1 h-px bg-[var(--color-btn-border)]" />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Sarah Mitchell"
                    autoComplete="name"
                    className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      className="w-full px-3.5 py-2.5 pr-10 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10"
                    />
                    <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-navy)]" tabIndex={-1}>
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      )}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-[var(--color-btn-border)] rounded-full overflow-hidden flex gap-0.5">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="flex-1 rounded-full" style={{ backgroundColor: n <= passwordStrength ? strengthColor : "transparent" }} />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Confirm password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    placeholder="Type it again"
                    autoComplete="new-password"
                    className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10"
                  />
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-[11.5px] text-[#b91c1c] mt-1">Passwords don&apos;t match</p>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {allergyOptions.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAllergy(a.id)}
                    className={`text-left p-3 rounded-[10px] border transition-all ${
                      form.selectedAllergies.includes(a.id)
                        ? "border-[var(--color-navy)] bg-[var(--color-navy)]/5 ring-2 ring-[var(--color-navy)]/10"
                        : "border-[var(--color-btn-border)] hover:border-[var(--color-navy-soft)] hover:bg-[var(--color-nav-hover)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">{a.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13.5px] font-semibold text-[var(--color-navy)]">{a.label}</div>
                        <div className="text-[11.5px] text-[var(--color-muted)]">{a.desc}</div>
                      </div>
                      {form.selectedAllergies.includes(a.id) && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--color-navy)] flex-shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-[var(--color-muted)]">
                {form.selectedAllergies.length === 0 ? "Select at least one to continue" : `${form.selectedAllergies.length} selected`}
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">City or postcode</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="e.g. Manchester, UK"
                  className="w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/10"
                />
                <p className="text-[11.5px] text-[var(--color-muted)] mt-1">📍 We use this to find restaurants near you. Your exact location is never shared.</p>
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Search radius</label>
                <div className="grid grid-cols-4 gap-2">
                  {["1km", "5km", "10km", "25km"].map((r) => (
                    <button
                      key={r}
                      onClick={() => update("radius", r)}
                      className={`py-2 rounded-[10px] border text-[13px] font-medium transition-colors ${
                        form.radius === r ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white" : "border-[var(--color-btn-border)] text-[var(--color-navy-soft)] hover:bg-[var(--color-nav-hover)]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[var(--color-navy)] mb-1.5">Cuisines you love (optional)</label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {cuisineOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCuisine(c)}
                      className={`text-[12.5px] px-3 py-1.5 rounded-full border transition-colors ${
                        form.cuisines.includes(c) ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white" : "border-[var(--color-btn-border)] text-[var(--color-navy-soft)] hover:bg-[var(--color-nav-hover)]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[var(--color-safe-bg)]/40 to-[var(--color-nav-hover)] border border-[var(--color-btn-border)] rounded-[12px] p-4">
                <h3 className="text-[14px] font-semibold text-[var(--color-navy)] mb-2">Your profile summary</h3>
                <div className="space-y-1.5 text-[12.5px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-muted)] w-20">Name:</span>
                    <span className="text-[var(--color-navy)] font-medium">{form.name || "—"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-muted)] w-20 flex-shrink-0">Allergies:</span>
                    <span className="text-[var(--color-navy)] font-medium">
                      {form.selectedAllergies.map((id) => allergyOptions.find((a) => a.id === id)?.label).join(", ") || "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-muted)] w-20">Location:</span>
                    <span className="text-[var(--color-navy)] font-medium">{form.city || "—"} ({form.radius})</span>
                  </div>
                  {form.cuisines.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-[var(--color-muted)] w-20 flex-shrink-0">Cuisines:</span>
                      <span className="text-[var(--color-navy)] font-medium">{form.cuisines.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-[13.5px] font-semibold text-[var(--color-navy)] mb-2">Email notifications</h3>
                <div className="space-y-2">
                  {[
                    { k: "newReviews" as const, l: "When people respond to your reviews" },
                    { k: "communityReplies" as const, l: "When community members reply to your posts" },
                    { k: "weeklyDigest" as const, l: "Weekly digest of new safe restaurants near you" },
                  ].map((n) => (
                    <label key={n.k} className="flex items-center gap-3 p-2.5 rounded-[10px] border border-[var(--color-btn-border)] cursor-pointer hover:bg-[var(--color-nav-hover)]">
                      <input
                        type="checkbox"
                        checked={form.notifications[n.k]}
                        onChange={() => setForm((p) => ({ ...p, notifications: { ...p.notifications, [n.k]: !p.notifications[n.k] } }))}
                        className="w-4 h-4 accent-[var(--color-navy)]"
                      />
                      <span className="text-[13px] text-[var(--color-navy)]">{n.l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer p-3 rounded-[10px] border border-[var(--color-btn-border)]">
                <input
                  type="checkbox"
                  checked={form.agreedToTerms}
                  onChange={(e) => update("agreedToTerms", e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[var(--color-navy)]"
                />
                <span className="text-[12.5px] text-[var(--color-navy-soft)]">
                  I agree to DietaryID&apos;s <a href="#" className="text-[var(--color-navy)] font-medium no-underline hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--color-navy)] font-medium no-underline hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>
          )}

          <div className="flex items-center justify-between mt-6 gap-3">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2.5 text-[14px] rounded-[11px] border border-[var(--color-btn-border)] text-[var(--color-navy)] hover:bg-[var(--color-nav-hover)] font-medium"
              >
                ← Back
              </button>
            ) : (
              <Link href="/login" className="text-[13px] text-[var(--color-navy-soft)] no-underline hover:text-[var(--color-navy)]">
                Already have an account? <span className="font-semibold">Sign in</span>
              </Link>
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-2.5 text-[14px] rounded-[11px] bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-dark)] disabled:opacity-50"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="px-6 py-2.5 text-[14px] rounded-[11px] bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-dark)] disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Finish & enter DietaryID"}
              </button>
            )}
          </div>

          {step === 0 && (
            <p className="text-center text-[11.5px] text-[var(--color-muted)] mt-5">
              By continuing, you agree to our community guidelines. We&apos;ll never share your allergy data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
