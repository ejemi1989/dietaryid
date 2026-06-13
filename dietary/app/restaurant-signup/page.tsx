"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  { label: "Restaurant Info", key: "info" },
  { label: "Details", key: "details" },
  { label: "Allergens", key: "allergens" },
  { label: "Verify", key: "verify" },
];

export default function RestaurantSignupPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    restaurantName: "", restaurantEmail: "", ownerName: "", role: "Owner", city: "", password: "", confirmPassword: "",
    restaurantType: "Fast Casual", cuisines: [] as string[], address: "", phone: "", website: "",
    allergies: [] as string[], procedures: "", training: "not-yet",
  });

  const update = (key: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [key]: value }));
  const toggleArray = (key: string, value: string) => {
    setFormData((prev) => {
      const arr = prev[key as keyof typeof prev] as string[];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const canProceed = () => {
    if (step === 0) return formData.restaurantName && formData.restaurantEmail && formData.ownerName && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
    if (step === 1) return formData.restaurantType && formData.address && formData.city;
    if (step === 2) return formData.allergies.length > 0;
    return true;
  };

  const handleSubmit = () => { window.location.href = "/restaurant/dashboard"; };

  const cuisineList = ["Italian", "Asian", "Mediterranean", "American", "Indian", "Mexican", "Japanese", "French", "Vegan/Vegetarian", "Other"];
  const allergyList = ["Celiac/Gluten-free", "Nut allergies", "Shellfish allergies", "Dairy allergies", "Soy allergies", "Egg allergies", "All of above"];

  const inputClass = "w-full px-3.5 py-2.5 border border-[var(--color-btn-border)] rounded-[10px] text-[14px] text-[var(--color-navy)] outline-none focus:border-[var(--color-navy)] transition-all bg-white";

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
          <h1 className="text-white text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] mb-3">List your restaurant.<br />Reach allergy-conscious diners.</h1>
          <p className="text-[var(--color-foot-text)] text-[15px] leading-[1.6] max-w-[420px] mb-8">Free to join. Verify your menu, get a Safety badge, and show up when people search for places safe for their allergies.</p>
          <div className="space-y-3 max-w-[420px]">
            {[ { n: 1, t: "Claim your restaurant", d: "Search or create a new listing" }, { n: 2, t: "Verify your menu", d: "Mark items safe for each allergy — 15 min" }, { n: 3, t: "Start reaching diners", d: "Your profile appears in search results instantly" } ].map((s) => (
              <div key={s.n} className="flex items-start gap-3"><div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] text-white flex items-center justify-center text-[12.5px] font-semibold flex-shrink-0">{s.n}</div><div><div className="text-white text-[14px] font-semibold mb-0.5">{s.t}</div><div className="text-[var(--color-foot-text)] text-[12.5px]">{s.d}</div></div></div>
            ))}
          </div>
        </div>
        <div className="relative text-[var(--color-foot-muted)] text-[12px]">© 2024 DietaryID · For Restaurants</div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-[500px] py-4">
          <Link href="/" className="md:hidden inline-flex items-center gap-2 mb-6 no-underline"><div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-pink)] flex items-center justify-center text-white font-bold text-[16px]">D</div><span className="font-bold text-[16px] text-[var(--color-navy)]">DietaryID</span></Link>
          <span className="inline-block bg-white border border-[var(--color-tag-border)] rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-[var(--color-navy-soft)] mb-3">For Restaurants</span>
          <h2 className="text-[24px] font-extrabold text-[var(--color-navy)] tracking-[-0.5px] mb-1">Create your restaurant account</h2>
          <p className="text-[13.5px] text-[var(--color-muted)] mb-6">Step {step + 1} of {steps.length} — {steps[step].label}</p>

          <div className="flex gap-1 mb-6">
            {steps.map((s, i) => {
              const isActive = i <= step;
              return (
                <div key={s.key} className="flex-1 h-1.5 rounded-full bg-[var(--color-btn-border)] overflow-hidden">
                  <div className={"h-full rounded-full transition-all duration-300 " + (isActive ? "bg-[var(--color-navy)] w-full" : "w-0")} />
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-[var(--color-btn-border)] rounded-[12px] p-6 shadow-[var(--shadow-card)]">
            {step === 0 && (<>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Restaurant name</div><input value={formData.restaurantName} onChange={(e) => update("restaurantName", e.target.value)} className={inputClass} /></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Restaurant email</div><input type="email" value={formData.restaurantEmail} onChange={(e) => update("restaurantEmail", e.target.value)} className={inputClass} /></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Your name</div><input value={formData.ownerName} onChange={(e) => update("ownerName", e.target.value)} className={inputClass} /></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Role</div><select value={formData.role} onChange={(e) => update("role", e.target.value)} className={inputClass}><option>Owner</option><option>Manager</option><option>Staff</option></select></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Password</div><input type="password" value={formData.password} onChange={(e) => update("password", e.target.value)} className={inputClass} /></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Confirm password</div><input type="password" value={formData.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className={inputClass} /></div>
              </div>
            </>)}

            {step === 1 && (<>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Restaurant type</div><select value={formData.restaurantType} onChange={(e) => update("restaurantType", e.target.value)} className={inputClass}><option>Fast Casual</option><option>Fine Dining</option><option>Cafe</option><option>Pub</option><option>Other</option></select></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">City</div><input value={formData.city} onChange={(e) => update("city", e.target.value)} className={inputClass} /></div>
                <div className="md:col-span-2"><div className="text-[12px] text-[var(--color-muted)] mb-1">Address</div><input value={formData.address} onChange={(e) => update("address", e.target.value)} className={inputClass} /></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Phone</div><input value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></div>
                <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Website (optional)</div><input value={formData.website} onChange={(e) => update("website", e.target.value)} className={inputClass} /></div>
              </div>
              <div className="mb-3"><div className="text-[12px] text-[var(--color-muted)] mb-1">Cuisine types</div><div className="flex items-center gap-1.5 flex-wrap">{cuisineList.map((c) => {
                const selected = formData.cuisines.includes(c);
                return (<button key={c} onClick={() => toggleArray("cuisines", c)} className={"text-[12.5px] px-2.5 py-1 rounded-full border " + (selected ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white" : "border-[var(--color-btn-border)] text-[var(--color-navy-soft)] hover:bg-[var(--color-nav-hover)]")}>{c}</button>);
              })}</div></div>
            </>)}

            {step === 2 && (<>
              <div className="mb-3"><div className="text-[12px] text-[var(--color-muted)] mb-1">Which allergies do you take seriously?</div><div className="flex items-center gap-1.5 flex-wrap">{allergyList.map((a) => {
                const selected = formData.allergies.includes(a);
                return (<button key={a} onClick={() => toggleArray("allergies", a)} className={"text-[12.5px] px-2.5 py-1 rounded-md border " + (selected ? "border-[var(--color-navy)] bg-[var(--color-safe-bg)] text-[var(--color-teal-dark)]" : "border-[var(--color-btn-border)] text-[var(--color-navy-soft)] hover:bg-[var(--color-nav-hover)]")}>{selected ? "✓ " : ""}{a}</button>);
              })}</div></div>
              <div className="mb-3"><div className="text-[12px] text-[var(--color-muted)] mb-1">Allergen procedures (optional)</div><textarea value={formData.procedures} onChange={(e) => update("procedures", e.target.value)} rows={3} placeholder="e.g. We use dedicated prep areas and utensils for allergen orders" className={inputClass + " resize-none"} /></div>
              <div><div className="text-[12px] text-[var(--color-muted)] mb-1">Staff training?</div><div className="flex items-center gap-2 flex-wrap">{[{v:"yes-comprehensive",l:"Yes, comprehensive"},{v:"yes-basic",l:"Yes, basic"},{v:"in-progress",l:"In progress"},{v:"not-yet",l:"Not yet"}].map((t) => {
                const selected = formData.training === t.v;
                return (<label key={t.v} className={"flex items-center gap-2 p-2 rounded-md border cursor-pointer " + (selected ? "border-[var(--color-navy)] bg-[var(--color-safe-bg)]" : "border-[var(--color-btn-border)] hover:bg-[var(--color-nav-hover)]")}><input type="radio" checked={selected} onChange={() => update("training", t.v)} className="w-4 h-4" /><span className="text-[12.5px] text-[var(--color-navy)]">{t.l}</span></label>);
              })}</div></div>
            </>)}

            {step === 3 && (<div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-[var(--color-navy)]">Review your information</h3>
              <div className="bg-[var(--color-nav-hover)] rounded-md p-3 text-[13px] space-y-1.5">
                <div><span className="text-[var(--color-muted)]">Restaurant:</span> <span className="font-medium text-[var(--color-navy)]">{formData.restaurantName}</span></div>
                <div><span className="text-[var(--color-muted)]">Type:</span> <span className="text-[var(--color-navy)]">{formData.restaurantType} · {formData.city}</span></div>
                <div><span className="text-[var(--color-muted)]">Allergies handled:</span> <span className="text-[var(--color-navy)]">{formData.allergies.join(", ") || "None"}</span></div>
                <div><span className="text-[var(--color-muted)]">Staff training:</span> <span className="text-[var(--color-navy)] capitalize">{formData.training.replace(/-/g, " ")}</span></div>
              </div>
              <p className="text-[12px] text-[var(--color-muted)]">Your profile goes live immediately after creation. You can update everything from your dashboard.</p>
            </div>)}

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-btn-border)]">
              {step > 0 ? <button onClick={() => setStep((s) => s - 1)} className="text-[13px] px-4 py-2 rounded-[11px] border border-[var(--color-btn-border)] text-[var(--color-navy)] hover:bg-[var(--color-nav-hover)] font-medium">← Back</button> : <Link href="/auth/restaurant" className="text-[13px] text-[var(--color-navy-soft)] no-underline hover:text-[var(--color-navy)]">Already have an account? <span className="font-semibold">Sign in</span></Link>}
              {step < 3 ? <button onClick={() => canProceed() && setStep((s) => s + 1)} disabled={!canProceed()} className="text-[14px] px-6 py-2.5 rounded-[11px] bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-dark)] disabled:opacity-50">Continue →</button> : <button onClick={handleSubmit} disabled={!canProceed()} className="text-[14px] px-6 py-2.5 rounded-[11px] bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-dark)]">Create account</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
