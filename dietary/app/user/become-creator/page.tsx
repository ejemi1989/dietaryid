"use client";

import { useState } from "react";
import Link from "next/link";

const guidelines = [
  { n: 1, t: "Review honestly.", d: "Your reputation is everything." },
  { n: 2, t: "Verify with restaurants.", d: "Always confirm menu changes." },
  { n: 3, t: "No fake reviews.", d: "We remove creators who make things up." },
  { n: 4, t: "Help, don't promote.", d: "You're helping community, not your friends." },
  { n: 5, t: "Detail matters.", d: "People rely on your specific observations." },
];

const earnings = [
  { activity: "Restaurant Review", rate: "$1.35" },
  { activity: "Dish Verification", rate: "$0.50" },
  { activity: "City Guide (flat)", rate: "$6.50 + ongoing" },
  { activity: "Recommendation Booking", rate: "$0.10/booking" },
];

const restrictionOptions = ["Celiac", "Crohn's", "IBS", "Nut Allergy", "Dairy Allergy", "Low FODMAP", "Vegan", "Vegetarian", "Soy Allergy", "Egg Allergy"];

export default function BecomeCreatorPage() {
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [reason, setReason] = useState("");
  const [commit1, setCommit1] = useState(false);
  const [commit2, setCommit2] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggleRestriction = (r: string) => {
    setRestrictions((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);
  };

  const canSubmit = restrictions.length > 0 && commit1 && commit2;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setShowSuccess(true);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowSuccess(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-[64px] mb-3">🎉</div>
            <h3 className="text-[18px] font-semibold text-admin-text mb-2">Welcome to the Creator Program!</h3>
            <p className="text-[14px] text-admin-nav-text mb-4">
              Your application has been submitted. Most creators are approved within 1 hour. We&apos;ll email you when you&apos;re ready to start earning.
            </p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setShowSuccess(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Close</button>
              <Link href="/user/creator" className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white no-underline hover:opacity-90">Go to Creator Hub</Link>
            </div>
          </div>
        </div>
      )}

      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/user/dashboard" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">
          ← Back to dashboard
        </Link>
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Become a Creator 💰</h1>
        <p className="text-[13.5px] text-admin-muted">Turn your expertise into impact. Every review you write helps hundreds of people eat safely.</p>
      </div>

      <div className="px-[26px] py-6 max-w-[900px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 lg:col-span-2">
            <h2 className="text-[18px] font-semibold text-admin-text mb-3">Creator guidelines</h2>
            <p className="text-[13.5px] text-admin-muted mb-4">Before you apply, please read our community expectations:</p>
            <div className="space-y-2.5">
              {guidelines.map((g) => (
                <div key={g.n} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-admin-dark text-white flex items-center justify-center text-[11.5px] font-semibold flex-shrink-0">
                    {g.n}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-admin-text">{g.t}</div>
                    <div className="text-[12.5px] text-admin-muted">{g.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-5">
            <h3 className="text-[15px] font-semibold text-admin-text mb-3">How you earn</h3>
            <div className="space-y-2">
              {earnings.map((e) => (
                <div key={e.activity} className="flex items-center justify-between text-[13px]">
                  <span className="text-admin-nav-text">{e.activity}</span>
                  <span className="text-admin-active-text font-semibold">{e.rate}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-admin-muted mt-3">
              Monthly payouts on the 15th · Minimum $5 to cash out
            </p>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6">
          <h2 className="text-[18px] font-semibold text-admin-text mb-1">Your application</h2>
          <p className="text-[12.5px] text-admin-muted mb-5">Most applications are approved within 1 hour.</p>

          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-medium text-admin-text block mb-2">Your restriction/expertise *</label>
              <p className="text-[12px] text-admin-muted mb-2">Select all that apply. This helps us match you with relevant questions.</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {restrictionOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => handleToggleRestriction(r)}
                    className={`text-[12.5px] px-3 py-1.5 rounded-md border transition-colors ${
                      restrictions.includes(r) ? "border-admin-dark bg-admin-active-bg text-admin-active-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                    }`}
                  >
                    {restrictions.includes(r) ? "✓ " : ""}{r}
                  </button>
                ))}
              </div>
              {restrictions.length === 0 && (
                <p className="text-[11.5px] text-admin-non-text mt-1.5">Please select at least one</p>
              )}
            </div>

            <div>
              <label className="text-[13px] font-medium text-admin-text block mb-2">City(s) you focus on</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Manchester, London, Glasgow"
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
              <p className="text-[11.5px] text-admin-muted mt-1">Optional: focus on multiple cities</p>
            </div>

            <div>
              <label className="text-[13px] font-medium text-admin-text block mb-2">Why are you becoming a creator? (max 250 chars)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                maxLength={250}
                placeholder="I want to help other people with Celiac find safe restaurants in Manchester. I've been to 50+ places and know what to look for."
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
              />
              <div className="text-[11.5px] text-admin-muted text-right mt-1">{reason.length}/250</div>
            </div>

            <div className="pt-2 border-t border-admin-border space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={commit1}
                  onChange={(e) => setCommit1(e.target.checked)}
                  className="w-4 h-4 mt-0.5 cursor-pointer"
                />
                <span className="text-[13.5px] text-admin-text">
                  I commit to writing <strong>honest reviews</strong> based on my real experiences.
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={commit2}
                  onChange={(e) => setCommit2(e.target.checked)}
                  className="w-4 h-4 mt-0.5 cursor-pointer"
                />
                <span className="text-[13.5px] text-admin-text">
                  I understand and agree to DietaryID&apos;s <Link href="/user/community" className="text-admin-new-text hover:underline">creator guidelines</Link> and community standards.
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-admin-border flex items-center justify-between flex-wrap gap-3">
              <p className="text-[12px] text-admin-muted">
                {restrictions.length} restriction{restrictions.length !== 1 ? "s" : ""} selected · {canSubmit ? "Ready to submit" : "Complete all required fields"}
              </p>
              <div className="flex items-center gap-2">
                <Link href="/user/dashboard" className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">
                  Cancel
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="text-[14px] px-5 py-2.5 rounded-md bg-admin-dark text-white font-medium hover:opacity-90 disabled:opacity-50"
                >
                  Apply now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mt-6">
          <h3 className="text-[15px] font-semibold text-admin-text mb-3">What happens next?</h3>
          <div className="space-y-3">
            {[
              { n: 1, t: "Submit your application", d: "Takes less than 2 minutes" },
              { n: 2, t: "Quick review (usually < 1 hour)", d: "Our team reviews your application" },
              { n: 3, t: "Get approved", d: "Receive email confirmation" },
              { n: 4, t: "Start earning", d: "Write your first review and get $1.35!" },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-admin-dark text-white flex items-center justify-center text-[12px] font-semibold flex-shrink-0">
                  {s.n}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-admin-text">{s.t}</div>
                  <div className="text-[12.5px] text-admin-muted">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
