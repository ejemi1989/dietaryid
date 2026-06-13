"use client";

import { useState } from "react";
import Link from "next/link";

type PayoutMethod = "stripe" | "paypal";
type Frequency = "monthly" | "biweekly" | "ondemand";

export default function PaymentSettingsPage() {
  const [method, setMethod] = useState<PayoutMethod>("stripe");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [threshold, setThreshold] = useState(5);
  const [stripeLast4, setStripeLast4] = useState("4567");
  const [stripeVerified, setStripeVerified] = useState(true);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [taxCountry, setTaxCountry] = useState("GB");
  const [taxId, setTaxId] = useState("");
  const [taxStatus, setTaxStatus] = useState("self_employed");
  const [savedNotif, setSavedNotif] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [showOnDemandConfirm, setShowOnDemandConfirm] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleSave = () => {
    setSavedNotif(true);
    setTimeout(() => setSavedNotif(false), 2000);
  };

  const handleStripeConnect = () => {
    setShowStripeModal(true);
    setTimeout(() => {
      setStripeLast4("9876");
      setStripeVerified(true);
      setMethod("stripe");
      setShowStripeModal(false);
      handleSave();
    }, 1500);
  };

  const handlePayPalConnect = () => {
    if (!paypalEmail.trim()) return;
    setShowPayPalModal(true);
    setTimeout(() => {
      setMethod("paypal");
      setShowPayPalModal(false);
      handleSave();
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <Link href="/user/creator" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">← Back to Creator Hub</Link>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Payment Settings ⚙️</h1>
            <p className="text-[13.5px] text-admin-muted">Manage how you get paid, when, and where.</p>
          </div>
          <Link href="/user/creator/payouts" className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">View payout history</Link>
        </div>
      </div>

      <div className="px-[26px] py-6 max-w-[900px]">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Payment method</h2>
          <p className="text-[12.5px] text-admin-muted mb-4">Where should we send your earnings?</p>

          <div className="space-y-2 mb-4">
            <label
              className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${
                method === "stripe" ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
              }`}
            >
              <input
                type="radio"
                checked={method === "stripe"}
                onChange={() => setMethod("stripe")}
                className="w-4 h-4 mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-9 h-6 rounded bg-admin-dark text-white flex items-center justify-center text-[10px] font-bold">STRIPE</div>
                  <div className="text-[14px] font-semibold text-admin-text">Bank Transfer (Stripe Connect)</div>
                </div>
                <p className="text-[12.5px] text-admin-muted">ACH/SEPA bank transfer. 1.5% + £0.20 fee per payout.</p>
                {method === "stripe" && (
                  <div className="mt-2 flex items-center gap-2 p-2 rounded bg-admin-bg border border-admin-border">
                    <div className="text-[18px]">🏦</div>
                    <div className="flex-1">
                      <div className="text-[12.5px] text-admin-text">Bank account ending in ••{stripeLast4}</div>
                      <div className="text-[11.5px] text-admin-muted">{stripeVerified ? "✓ Verified" : "⏳ Pending verification"} · Changed Sept 5, 2024</div>
                    </div>
                    {stripeVerified && (
                      <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-semibold">VERIFIED</span>
                    )}
                  </div>
                )}
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${
                method === "paypal" ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
              }`}
            >
              <input
                type="radio"
                checked={method === "paypal"}
                onChange={() => setMethod("paypal")}
                className="w-4 h-4 mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-9 h-6 rounded bg-[#003087] text-white flex items-center justify-center text-[9px] font-bold italic">PayPal</div>
                  <div className="text-[14px] font-semibold text-admin-text">PayPal</div>
                </div>
                <p className="text-[12.5px] text-admin-muted">No bank account needed. 2% + fixed regional fee per payout.</p>
                {method === "paypal" && (
                  <div className="mt-2 flex items-center gap-2 p-2 rounded bg-admin-bg border border-admin-border">
                    <div className="text-[18px]">💳</div>
                    <div className="flex-1">
                      <div className="text-[12.5px] text-admin-text">{paypalEmail || "Not connected"}</div>
                      <div className="text-[11.5px] text-admin-muted">{paypalEmail ? "✓ Verified" : "Click Connect to link"}</div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>

          {method === "stripe" && (
            <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
              <button
                onClick={handleStripeConnect}
                className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                {stripeLast4 ? "Change bank account" : "Connect bank account"}
              </button>
              {stripeLast4 && (
                <button
                  onClick={() => setShowRemoveConfirm(true)}
                  className="text-[12.5px] px-3 py-1.5 rounded-md text-admin-non-text hover:bg-admin-non-bg"
                >
                  Remove
                </button>
              )}
            </div>
          )}

          {method === "paypal" && (
            <div className="pt-3 border-t border-admin-border">
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">PayPal email</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                />
                <button
                  onClick={handlePayPalConnect}
                  disabled={!paypalEmail.trim()}
                  className="text-[12.5px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                >
                  Connect
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Payout frequency</h2>
          <p className="text-[12.5px] text-admin-muted mb-4">How often would you like to be paid?</p>

          <div className="space-y-2">
            {([
              { v: "monthly", l: "Monthly (15th)", desc: "Recommended — automatic every 15th of the month", fee: "Free" },
              { v: "biweekly", l: "Bi-weekly (1st & 15th)", desc: "Twice per month", fee: "Free" },
              { v: "ondemand", l: "On demand", desc: "Request a payout whenever you want", fee: "£1.00 per request" },
            ] as { v: Frequency; l: string; desc: string; fee: string }[]).map((f) => (
              <label
                key={f.v}
                className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer ${
                  frequency === f.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                }`}
              >
                <input
                  type="radio"
                  checked={frequency === f.v}
                  onChange={() => {
                    if (f.v === "ondemand") setShowOnDemandConfirm(true);
                    else setFrequency(f.v);
                  }}
                  className="w-4 h-4 mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-admin-text">{f.l}</span>
                    <span className="text-[11.5px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-text">{f.fee}</span>
                  </div>
                  <p className="text-[12.5px] text-admin-muted">{f.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Minimum payout threshold</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Only pay out when balance exceeds this amount. Lower threshold = more payouts but more fees.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            <div>
              <label className="text-[12px] text-admin-muted block mb-1">Current threshold</label>
              <div className="text-[18px] font-semibold text-admin-text">£{threshold.toFixed(2)}</div>
            </div>
            <div>
              <label className="text-[12px] text-admin-muted block mb-1">Set new threshold (£1 - £100)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  className="flex-1"
                />
                <div className="w-16 px-2 py-1 border border-admin-border rounded-md text-[13px] text-center bg-admin-bg">£{threshold}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Tax information</h2>
          <p className="text-[12.5px] text-admin-muted mb-4">We use this to generate the right tax documents. You&apos;re responsible for filing.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Tax country</label>
              <select
                value={taxCountry}
                onChange={(e) => setTaxCountry(e.target.value)}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
              >
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="US">🇺🇸 United States</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="FR">🇫🇷 France</option>
                <option value="ES">🇪🇸 Spain</option>
                <option value="IT">🇮🇹 Italy</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="NL">🇳🇱 Netherlands</option>
                <option value="IE">🇮🇪 Ireland</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Tax status</label>
              <select
                value={taxStatus}
                onChange={(e) => setTaxStatus(e.target.value)}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
              >
                <option value="self_employed">Self-employed</option>
                <option value="sole_trader">Sole trader</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="individual">Individual</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Tax ID (UTR / EIN / VAT)</label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="e.g. 1234567890"
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
              />
              <p className="text-[11.5px] text-admin-muted mt-1">Required for tax forms (US 1099-NEC if &gt;$600/year)</p>
            </div>
          </div>
          <Link href="/user/creator/tax-documents" className="text-[12.5px] text-admin-new-text no-underline hover:underline">
            📄 View tax documents →
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2">
          {savedNotif && <span className="text-[12.5px] text-admin-active-text">✓ Settings saved</span>}
          <button
            onClick={handleSave}
            className="text-[14px] px-4 py-2 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90"
          >
            Save settings
          </button>
        </div>
      </div>

      {showStripeModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowStripeModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 mx-auto rounded-full bg-admin-active-bg flex items-center justify-center text-[24px] mb-3">🔄</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Connecting to Stripe...</h3>
            <p className="text-[13px] text-admin-muted mb-3">You&apos;ll be redirected to Stripe to verify your bank account. This is a mock connection.</p>
            <div className="w-full h-1.5 bg-admin-border rounded-full overflow-hidden">
              <div className="h-full bg-admin-active-text rounded-full animate-pulse" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
      )}

      {showPayPalModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowPayPalModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 mx-auto rounded-full bg-admin-active-bg flex items-center justify-center text-[24px] mb-3">🔄</div>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Connecting to PayPal...</h3>
            <p className="text-[13px] text-admin-muted mb-3">Authorizing your PayPal account for payouts.</p>
            <div className="w-full h-1.5 bg-admin-border rounded-full overflow-hidden">
              <div className="h-full bg-admin-active-text rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      )}

      {showOnDemandConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowOnDemandConfirm(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Switch to on-demand payouts?</h3>
            <p className="text-[13.5px] text-admin-nav-text mb-3">You&apos;ll pay a £1.00 fee per payout request. Minimum request amount £5.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowOnDemandConfirm(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => { setFrequency("ondemand"); setShowOnDemandConfirm(false); handleSave(); }}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Switch to on-demand
              </button>
            </div>
          </div>
        </div>
      )}

      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowRemoveConfirm(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-non-text mb-2">Remove bank account?</h3>
            <p className="text-[13.5px] text-admin-nav-text mb-3">Your current balance will not be paid out until you connect a new account.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRemoveConfirm(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => { setStripeLast4(""); setStripeVerified(false); setShowRemoveConfirm(false); handleSave(); }}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-non-text text-white hover:opacity-90"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
