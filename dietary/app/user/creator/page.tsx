"use client";

import { useState } from "react";
import Link from "next/link";

type Transaction = {
  id: string;
  date: string;
  type: "review" | "verification" | "guide" | "booking";
  description: string;
  amount: number;
  status: "paid" | "pending";
};

type Payout = {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "completed" | "processing";
};

const earningsBreakdown = [
  { activity: "Restaurant Reviews Written", count: 24, rate: 1.35, total: 32.40, color: "admin-active" },
  { activity: "Dish Verifications", count: 17, rate: 0.50, total: 8.50, color: "admin-new" },
  { activity: "City Guide", count: 1, rate: 6.50, total: 6.50, color: "admin-vip" },
  { activity: "Recommendation Bookings", count: 8, rate: 0.10, total: 0.80, color: "admin-icon-secondary" },
];

const recentTransactions: Transaction[] = [
  { id: "t1", date: "Today", type: "review", description: "Review of The Italian Kitchen", amount: 1.35, status: "pending" },
  { id: "t2", date: "Yesterday", type: "review", description: "Review of Fresh Bowl", amount: 1.35, status: "pending" },
  { id: "t3", date: "2 days ago", type: "verification", description: "Verified Quinoa Power Bowl", amount: 0.50, status: "pending" },
  { id: "t4", date: "3 days ago", type: "verification", description: "Verified Buddha Bowl", amount: 0.50, status: "pending" },
  { id: "t5", date: "4 days ago", type: "review", description: "Review of Sakura Sushi", amount: 1.35, status: "pending" },
  { id: "t6", date: "1 week ago", type: "guide", description: "Gluten-Free Manchester - monthly bonus", amount: 6.50, status: "paid" },
  { id: "t7", date: "1 week ago", type: "review", description: "Review of The Vegan Table", amount: 1.35, status: "paid" },
  { id: "t8", date: "2 weeks ago", type: "booking", description: "8 people used your recommendation", amount: 0.80, status: "paid" },
];

const payoutHistory: Payout[] = [
  { id: "p1", date: "Sept 15, 2024", amount: 127.30, method: "Bank Transfer ••4567", status: "completed" },
  { id: "p2", date: "Aug 15, 2024", amount: 89.40, method: "Bank Transfer ••4567", status: "completed" },
  { id: "p3", date: "July 15, 2024", amount: 73.20, method: "PayPal", status: "completed" },
  { id: "p4", date: "June 15, 2024", amount: 56.80, method: "PayPal", status: "completed" },
];

export default function CreatorHubPage() {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"earnings" | "payouts" | "contributions">("earnings");
  const [payoutMethod, setPayoutMethod] = useState("bank");
  const [copied, setCopied] = useState(false);

  const totalThisMonth = earningsBreakdown.reduce((s, e) => s + e.total, 0);
  const totalLifetime = 1247.30;
  const reviewsWritten = 156;
  const dishesVerified = 89;
  const followers = 347;
  const communityRating = 4.9;

  const handleCopyProfile = async () => {
    try {
      await navigator.clipboard.writeText("https://dietaryid.com/creators/sarah-mitchell");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Your Creator Hub 🎉</h1>
            <p className="text-[13.5px] text-admin-muted">You&apos;ve helped thousands eat safely. Keep building your guides and earn real rewards.</p>
            <div className="flex items-center gap-3 text-[12.5px] text-admin-muted mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text font-medium">✓ Verified Creator</span>
              <span>· Joined Jan 2023</span>
              <span>· Manchester, UK</span>
              <span>· Celiac Expert</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyProfile}
              className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              {copied ? "✓ Copied!" : "↗ Share profile"}
            </button>
            <Link
              href="/user/become-creator"
              className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white no-underline hover:opacity-90"
            >
              Creator settings
            </Link>
          </div>
        </div>
      </div>

      <div className="px-[26px] py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[12px] text-admin-muted">Total This Month</div>
              <div className="text-[18px]">💰</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-active-text">${totalThisMonth.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">From reviews, verifications, guides</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">↑ +$12.30 from last month</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[12px] text-admin-muted">Bookings</div>
              <div className="text-[18px]">🔖</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-text">8</div>
            <div className="text-[12.5px] text-admin-muted mt-1">People followed your recommendations</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">This month</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[12px] text-admin-muted">Reviews Written</div>
              <div className="text-[18px]">⭐</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-text">{reviewsWritten}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Verified dishes total</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">+24 this month</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[12px] text-admin-muted">Followers</div>
              <div className="text-[18px]">👥</div>
            </div>
            <div className="text-[28px] font-semibold text-admin-text">{followers}</div>
            <div className="text-[12.5px] text-admin-muted mt-1">Trust your recommendations</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">+56 this month</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setShowWriteModal(true)}
            className="bg-admin-bg border border-admin-border rounded-[10px] p-5 text-left hover:border-admin-dark transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[20px]">✍️</div>
              <div className="text-[12px] text-admin-active-text font-medium">$1.35</div>
            </div>
            <div className="text-[15px] font-semibold text-admin-text">Write a review</div>
            <p className="text-[12.5px] text-admin-muted mt-1">Detailed review of a restaurant you visited</p>
          </button>
          <button
            onClick={() => setShowVerifyModal(true)}
            className="bg-admin-bg border border-admin-border rounded-[10px] p-5 text-left hover:border-admin-dark transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[20px]">✓</div>
              <div className="text-[12px] text-admin-active-text font-medium">$0.50</div>
            </div>
            <div className="text-[15px] font-semibold text-admin-text">Verify a dish</div>
            <p className="text-[12.5px] text-admin-muted mt-1">Quick safety check on a specific dish</p>
          </button>
          <button
            onClick={() => setShowGuideModal(true)}
            className="bg-admin-bg border border-admin-border rounded-[10px] p-5 text-left hover:border-admin-dark transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[20px]">📖</div>
              <div className="text-[12px] text-admin-active-text font-medium">$6.50+</div>
            </div>
            <div className="text-[15px] font-semibold text-admin-text">Create a city guide</div>
            <p className="text-[12.5px] text-admin-muted mt-1">Help travelers eat safely in your city</p>
          </button>
        </div>

        <div className="flex items-center gap-1 mb-4 border-b border-admin-border">
          {[
            { v: "earnings", l: "Earnings breakdown" },
            { v: "payouts", l: "Payout history" },
            { v: "contributions", l: "Top contributions" },
          ].map((t) => (
            <button
              key={t.v}
              onClick={() => setActiveTab(t.v as typeof activeTab)}
              className={`text-[13px] px-4 py-2.5 -mb-px border-b-2 transition-colors ${
                activeTab === t.v ? "border-admin-dark text-admin-text font-medium" : "border-transparent text-admin-muted hover:text-admin-text"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        {activeTab === "earnings" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
              <h2 className="text-[16px] font-semibold text-admin-text mb-4">How you earned this month</h2>
              <div className="space-y-3">
                {earningsBreakdown.map((e) => (
                  <div key={e.activity}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-[14px] font-medium text-admin-text">{e.activity}</div>
                        <div className="text-[12px] text-admin-muted">{e.count} × ${e.rate.toFixed(2)} = ${e.total.toFixed(2)}</div>
                      </div>
                      <div className="text-[16px] font-semibold text-admin-active-text">${e.total.toFixed(2)}</div>
                    </div>
                    <div className="w-full h-2 bg-admin-border rounded-full overflow-hidden">
                      <div className="h-full bg-admin-active-text rounded-full" style={{ width: `${(e.total / totalThisMonth) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-admin-border flex items-center justify-between">
                <div className="text-[14px] font-semibold text-admin-text">Total this month</div>
                <div className="text-[20px] font-bold text-admin-active-text">${totalThisMonth.toFixed(2)}</div>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-4">Recent transactions</h2>
              <div className="space-y-2">
                {recentTransactions.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-admin-hover">
                    <div className="text-[18px] flex-shrink-0">
                      {t.type === "review" ? "✍️" : t.type === "verification" ? "✓" : t.type === "guide" ? "📖" : "🔖"}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13.5px] text-admin-text">{t.description}</div>
                      <div className="text-[11.5px] text-admin-muted">{t.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-semibold text-admin-active-text">+${t.amount.toFixed(2)}</div>
                      <div className={`text-[11px] ${t.status === "pending" ? "text-admin-new-text" : "text-admin-muted"}`}>
                        {t.status === "pending" ? "Pending" : "Paid"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "payouts" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div>
                  <div className="text-[12px] text-admin-muted">Current Balance</div>
                  <div className="text-[36px] font-bold text-admin-text">${totalThisMonth.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-admin-muted">Last Payout: <span className="text-admin-text font-medium">$127.30 (Sept 15)</span></div>
                  <div className="text-[12px] text-admin-muted">Next Payout: <span className="text-admin-text font-medium">Oct 15, 2024</span></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-admin-border">
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Lifetime earnings</div>
                  <div className="text-[20px] font-semibold text-admin-text">${totalLifetime.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Pending payout</div>
                  <div className="text-[20px] font-semibold text-admin-new-text">${totalThisMonth.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Payout method</div>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full px-2 py-1 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none"
                  >
                    <option value="bank">Bank Transfer ••4567</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-4">Payout history</h2>
              <div className="space-y-2">
                {payoutHistory.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                    <div className="text-[22px]">💸</div>
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-admin-text">${p.amount.toFixed(2)}</div>
                      <div className="text-[12px] text-admin-muted">{p.method}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] text-admin-text">{p.date}</div>
                      <div className="text-[11px] text-admin-active-text">✓ {p.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[12px] text-admin-muted">
                Monthly payouts on the 15th · Minimum $5 to receive payout · Tax documents available if you earn $20k+/year
              </div>
            </div>
          </div>
        )}

        {activeTab === "contributions" && (
          <div className="space-y-3">
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-4">Your top contributions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-admin-border rounded-[9px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[20px]">🏆</span>
                    <span className="text-[13px] text-admin-muted">Top reviewed restaurant</span>
                  </div>
                  <div className="text-[15px] font-semibold text-admin-text">The Healthy Bowl Co</div>
                  <div className="text-[12px] text-admin-muted">23 reviews by you</div>
                </div>
                <div className="border border-admin-border rounded-[9px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[20px]">🌟</span>
                    <span className="text-[13px] text-admin-muted">Most helpful review</span>
                  </div>
                  <div className="text-[14px] text-admin-text italic">&ldquo;This restaurant understands Celiac better than any place I&apos;ve been...&rdquo;</div>
                  <div className="text-[12px] text-admin-muted mt-1">142 people found this helpful</div>
                </div>
                <div className="border border-admin-border rounded-[9px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[20px]">📖</span>
                    <span className="text-[13px] text-admin-muted">Most useful guide</span>
                  </div>
                  <div className="text-[15px] font-semibold text-admin-text">Gluten-Free Manchester</div>
                  <div className="text-[12px] text-admin-muted">1,200+ people saved this</div>
                </div>
                <div className="border border-admin-border rounded-[9px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[20px]">👥</span>
                    <span className="text-[13px] text-admin-muted">Growing fastest</span>
                  </div>
                  <div className="text-[15px] font-semibold text-admin-text">+56 followers this month</div>
                  <div className="text-[12px] text-admin-muted">347 total followers</div>
                </div>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-4">Lifetime stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-[12px] text-admin-muted">Total earned</div>
                  <div className="text-[20px] font-semibold text-admin-text">${totalLifetime.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Reviews written</div>
                  <div className="text-[20px] font-semibold text-admin-text">{reviewsWritten}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Dishes verified</div>
                  <div className="text-[20px] font-semibold text-admin-text">{dishesVerified}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Community rating</div>
                  <div className="text-[20px] font-semibold text-admin-text">⭐ {communityRating}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Followers</div>
                  <div className="text-[20px] font-semibold text-admin-text">{followers}</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Guides created</div>
                  <div className="text-[20px] font-semibold text-admin-text">1</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Helpful votes</div>
                  <div className="text-[20px] font-semibold text-admin-text">2,847</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Reviews removed</div>
                  <div className="text-[20px] font-semibold text-admin-active-text">0</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mt-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-2">How creators earn</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-admin-muted border-b border-admin-border">
                  <th className="py-2 font-medium">Activity</th>
                  <th className="py-2 font-medium text-right">Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-admin-border"><td className="py-2 text-admin-text">Restaurant Review</td><td className="py-2 text-right text-admin-active-text font-medium">$1.35</td></tr>
                <tr className="border-b border-admin-border"><td className="py-2 text-admin-text">Dish Verification</td><td className="py-2 text-right text-admin-active-text font-medium">$0.50</td></tr>
                <tr className="border-b border-admin-border"><td className="py-2 text-admin-text">City Guide (flat)</td><td className="py-2 text-right text-admin-active-text font-medium">$6.50 + ongoing</td></tr>
                <tr><td className="py-2 text-admin-text">Recommendation Booking</td><td className="py-2 text-right text-admin-active-text font-medium">$0.10/booking</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showWriteModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setShowWriteModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[600px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Write a creator review</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Detailed review · Earns $1.35</p>
            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Restaurant</div>
                <input type="text" placeholder="Search restaurants..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Safe-to-order confidence (1-10)</div>
                <input type="range" min="1" max="10" defaultValue="9" className="w-full" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Detailed review</div>
                <textarea rows={4} placeholder="Describe the dish, staff knowledge, cross-contamination procedures..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
              <label className="flex items-center gap-2 text-[13px]">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                Add to my &quot;Gluten-Free Manchester&quot; guide
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowWriteModal(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button onClick={() => setShowWriteModal(false)} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Publish review</button>
            </div>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setShowVerifyModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[500px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Verify a dish</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Quick safety check · Earns $0.50</p>
            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Restaurant & dish</div>
                <input type="text" placeholder="e.g. Fresh Bowl - Quinoa Power Bowl" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Date you ate it</div>
                <input type="date" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Star rating (1-5)</div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className="text-[24px] text-admin-vip-text hover:scale-110">⭐</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Confidence level (1-10)</div>
                <input type="range" min="1" max="10" defaultValue="9" className="w-full" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Notes</div>
                <textarea rows={2} placeholder="Specific observations..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowVerifyModal(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button onClick={() => setShowVerifyModal(false)} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Submit verification</button>
            </div>
          </div>
        </div>
      )}

      {showGuideModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setShowGuideModal(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[600px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Create a city guide</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Help travelers eat safely in your city · Earns $6.50+</p>
            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Guide title (max 100 chars)</div>
                <input type="text" maxLength={100} placeholder="The Ultimate Gluten-Free Guide to Manchester" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Description (max 250 chars)</div>
                <textarea rows={2} maxLength={250} placeholder="A complete guide to..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Restriction type</div>
                  <select className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                    <option>Gluten-Free</option>
                    <option>Dairy-Free</option>
                    <option>Nut-Free</option>
                    <option>Crohn&apos;s</option>
                    <option>IBS</option>
                  </select>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">City/Region</div>
                  <input type="text" defaultValue="Manchester, UK" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
                </div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Add restaurants</div>
                <input type="text" placeholder="Search and add restaurants..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Pro tips (max 1000 chars)</div>
                <textarea rows={3} maxLength={1000} placeholder="Manchester restaurants are generally good about allergen info..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowGuideModal(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Save draft</button>
              <button onClick={() => setShowGuideModal(false)} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Publish guide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
