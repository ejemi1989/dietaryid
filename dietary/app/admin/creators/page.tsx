"use client";

import { useState } from "react";
import Link from "next/link";
import { notifyUser, approveApplication } from "@/lib/notifications";

type Creator = {
  id: string;
  name: string;
  restriction: string;
  earnings: number;
  reviews: number;
  followers: number;
  status: "Active" | "Probation" | "Suspended";
  payout: "Paid" | "Pending" | "Issued";
};

const initialData: Creator[] = [
  { id: "c_001", name: "Sarah Mitchell", restriction: "Celiac", earnings: 347.20, reviews: 156, followers: 2340, status: "Active", payout: "Paid" },
  { id: "c_002", name: "Mike Henderson", restriction: "Gluten-Free", earnings: 234.50, reviews: 89, followers: 1890, status: "Active", payout: "Pending" },
  { id: "c_003", name: "Jordan Lee", restriction: "Nut Allergy", earnings: 128.30, reviews: 45, followers: 670, status: "Probation", payout: "Pending" },
  { id: "c_004", name: "Emma Collins", restriction: "IBS", earnings: 412.80, reviews: 198, followers: 3120, status: "Active", payout: "Paid" },
  { id: "c_005", name: "David Chen", restriction: "Lactose Intolerant", earnings: 89.40, reviews: 32, followers: 450, status: "Active", payout: "Issued" },
  { id: "c_006", name: "Sophie Turner", restriction: "Crohn's", earnings: 267.90, reviews: 112, followers: 1560, status: "Active", payout: "Paid" },
  { id: "c_007", name: "James Wilson", restriction: "Multiple", earnings: 523.10, reviews: 234, followers: 4560, status: "Active", payout: "Pending" },
  { id: "c_008", name: "Olivia Brown", restriction: "Celiac", earnings: 45.20, reviews: 18, followers: 230, status: "Suspended", payout: "Issued" },
];

const statusStyles: Record<Creator["status"], string> = {
  Active: "bg-admin-active-bg text-admin-active-text",
  Probation: "bg-admin-vip-bg text-admin-vip-text",
  Suspended: "bg-admin-non-bg text-admin-non-text",
};

const payoutStyles: Record<Creator["payout"], string> = {
  Paid: "bg-admin-active-bg text-admin-active-text",
  Pending: "bg-admin-vip-bg text-admin-vip-text",
  Issued: "bg-admin-new-bg text-admin-new-text",
};

type Filter = "This Month" | "Last Month" | "All Time";
type PayoutFilter = "Paid" | "Pending" | "Issued";

type Application = {
  id: string;
  name: string;
  email: string;
  restriction: string;
  city: string;
  why: string;
  filedAt: string;
  reviewsExisting: number;
  status: "pending" | "reviewing" | "approved" | "rejected";
};

const initialApplications: Application[] = [
  { id: "app_001", name: "Sarah Mitchell", email: "sarah@dietaryid.com", restriction: "Celiac", city: "Manchester, UK", why: "I want to help other people with Celiac find safe restaurants in Manchester. I've been to 50+ places and know what to look for.", filedAt: "Just now", reviewsExisting: 156, status: "pending" },
  { id: "app_002", name: "Alex Turner", email: "alex@email.com", restriction: "IBS", city: "London, UK", why: "I've been managing IBS for 10 years and want to share my knowledge of low-FODMAP friendly restaurants.", filedAt: "2 hours ago", reviewsExisting: 23, status: "pending" },
  { id: "app_003", name: "Rachel Green", email: "rachel@email.com", restriction: "Nut Allergy", city: "Birmingham, UK", why: "My son has a severe nut allergy. I've spent years vetting restaurants and want to help other families.", filedAt: "5 hours ago", reviewsExisting: 8, status: "pending" },
  { id: "app_004", name: "Tom Williams", email: "tom@email.com", restriction: "Dairy-Free", city: "Manchester, UK", why: "I'm a chef with dairy allergy. I know the industry from both sides.", filedAt: "1 day ago", reviewsExisting: 45, status: "pending" },
];

export default function CreatorsPage() {
  const [tab, setTab] = useState<"creators" | "applications">("creators");
  const [data, setData] = useState(initialData);
  const [applications, setApplications] = useState(initialApplications);
  const [filter, setFilter] = useState<Filter>("This Month");
  const [payoutFilter, setPayoutFilter] = useState<PayoutFilter | "All">("All");
  const [payoutModal, setPayoutModal] = useState<Creator | null>(null);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const pendingApps = applications.filter((a) => a.status === "pending" || a.status === "reviewing");

  const handleApprove = (id: string) => {
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved" } : a));
    const app = applications.find((a) => a.id === id);
    if (app) {
      approveApplication();
      notifyUser(`🎉 Your creator application was approved, ${app.name}! Start earning now.`, "/user/creator/earnings");
    }
    setReviewingId(null);
    setReviewNotes("");
  };

  const handleReject = (id: string) => {
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: "rejected" } : a));
    const app = applications.find((a) => a.id === id);
    if (app) {
      notifyUser(`Your creator application needs more review, ${app.name}. Please check your email.`, "/user/become-creator");
    }
    setReviewingId(null);
    setReviewNotes("");
  };

  const handleStartReview = (id: string) => {
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: "reviewing" } : a));
    setReviewingId(id);
  };

  const filtered = data.filter((c) => payoutFilter === "All" || c.payout === payoutFilter);

  const handlePayout = (id: string) => {
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, payout: "Paid" } : c)));
    setPayoutModal(null);
  };

  const totalEarnings = filtered.reduce((sum, c) => sum + c.earnings, 0);
  const totalPending = filtered.filter((c) => c.payout === "Pending").reduce((s, c) => s + c.earnings, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">
              {tab === "creators" ? "Creator Earnings" : "Creator Applications"}
            </h1>
            <p className="text-[14px] text-admin-muted">
              {tab === "creators" ? "Track creator earnings, process payouts, manage disputes." :
               `Review and approve new creator applications. ${pendingApps.length} pending.`}
            </p>
          </div>
          <div className="flex items-center border border-admin-border rounded-md overflow-hidden">
            <button
              onClick={() => setTab("creators")}
              className={`text-[13px] px-3 py-1.5 ${tab === "creators" ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"}`}
            >
              Creators
            </button>
            <button
              onClick={() => setTab("applications")}
              className={`text-[13px] px-3 py-1.5 ${tab === "applications" ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"} relative`}
            >
              Applications
              {pendingApps.length > 0 && (
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-admin-non-text text-white">{pendingApps.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 py-[14px] px-[26px] border-b border-admin-border flex-wrap">
        <div className="flex items-center gap-1">
          {(["This Month", "Last Month", "All Time"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-2">
          {(["All", "Paid", "Pending", "Issued"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPayoutFilter(p as typeof payoutFilter)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                payoutFilter === p ? "bg-admin-new-text text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto text-[13px] text-admin-muted">
          Total earnings: <strong className="text-admin-text">£{totalEarnings.toFixed(2)}</strong> · Pending:{" "}
          <strong className="text-admin-vip-text">£{totalPending.toFixed(2)}</strong>
        </div>
      </div>

      {tab === "applications" && (
        <div className="px-[26px] py-6">
          {applications.filter((a) => a.status !== "rejected").length === 0 ? (
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-12 text-center">
              <div className="text-[48px] mb-2">✅</div>
              <p className="text-[14px] text-admin-text font-medium mb-1">No pending applications</p>
              <p className="text-[13px] text-admin-muted">All applications have been reviewed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.filter((a) => a.status !== "rejected").map((a) => (
                <div key={a.id} className={`bg-admin-bg border rounded-[10px] p-5 ${
                  a.status === "approved" ? "border-admin-active-text/40" :
                  a.status === "reviewing" ? "border-admin-new-text/40" :
                  "border-admin-border"
                }`}>
                  <div className="flex items-start gap-4">
                    <img src={`https://i.pravatar.cc/80?u=${a.email}`} alt="" className="w-12 h-12 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[16px] font-semibold text-admin-text">{a.name}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                          a.status === "approved" ? "bg-admin-active-bg text-admin-active-text" :
                          a.status === "reviewing" ? "bg-admin-new-bg text-admin-new-text" :
                          a.status === "rejected" ? "bg-admin-non-bg text-admin-non-text" :
                          "bg-admin-vip-bg text-admin-vip-text"
                        }`}>
                          {a.status === "approved" ? "✓ Approved" :
                           a.status === "reviewing" ? "🔍 In review" :
                           a.status === "rejected" ? "✗ Rejected" : "⏳ Pending"}
                        </span>
                        <span className="text-[12px] text-admin-muted ml-auto">{a.filedAt}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-[12.5px]">
                        <div>
                          <div className="text-admin-muted">Restriction</div>
                          <div className="text-admin-text font-medium">{a.restriction}</div>
                        </div>
                        <div>
                          <div className="text-admin-muted">City</div>
                          <div className="text-admin-text font-medium">{a.city}</div>
                        </div>
                        <div>
                          <div className="text-admin-muted">Existing reviews</div>
                          <div className="text-admin-text font-medium">{a.reviewsExisting}</div>
                        </div>
                        <div>
                          <div className="text-admin-muted">Email</div>
                          <div className="text-admin-text font-medium truncate">{a.email}</div>
                        </div>
                      </div>

                      <div className="bg-admin-hover rounded-md p-3 mb-3">
                        <div className="text-[11.5px] text-admin-muted mb-1">Why they applied</div>
                        <p className="text-[13px] text-admin-nav-text italic">&ldquo;{a.why}&rdquo;</p>
                      </div>

                      {a.status === "approved" ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-admin-active-text">✓ Approved — creator can start earning. Confirmation email sent to {a.email}.</span>
                          <Link href={`/admin/creators/${a.id.replace("app_", "c_")}`} className="text-[12px] text-admin-new-text no-underline hover:underline ml-auto">View profile →</Link>
                        </div>
                      ) : a.status === "rejected" ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-admin-non-text">✗ Rejected — feedback email sent.</span>
                        </div>
                      ) : reviewingId === a.id ? (
                        <div className="space-y-2 pt-2 border-t border-admin-border">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-admin-new-text rounded-full animate-bounce" />
                              <span className="w-1.5 h-1.5 bg-admin-new-text rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                              <span className="w-1.5 h-1.5 bg-admin-new-text rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                            <span className="text-[12.5px] text-admin-text">Reviewing application...</span>
                          </div>
                          <textarea
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={2}
                            placeholder="Internal review notes..."
                            className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none resize-none"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(a.id)}
                              className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => handleReject(a.id)}
                              className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-non-text text-white hover:opacity-90"
                            >
                              ✗ Reject
                            </button>
                            <button
                              onClick={() => { setReviewingId(null); setReviewNotes(""); }}
                              className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-2 border-t border-admin-border">
                          <button
                            onClick={() => handleStartReview(a.id)}
                            className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
                          >
                            Start review
                          </button>
                          <span className="text-[11.5px] text-admin-muted">Usually &lt; 1 hour. Opens approval panel.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "creators" && (
      <>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Creator
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Restriction
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Earnings
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Reviews
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold hidden lg:table-cell">
                Followers
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Status
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
                Payout
              </th>
              <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold w-[180px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-admin-hover">
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text">
                  <Link href={`/admin/creators/${c.id}`} className="text-admin-new-text no-underline hover:underline">
                    {c.name}
                  </Link>
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text">
                  {c.restriction}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text font-semibold">
                  £{c.earnings.toFixed(2)}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text">
                  {c.reviews}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text hidden lg:table-cell">
                  {c.followers.toLocaleString()}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                  <span className={`text-[12px] py-[3px] px-[10px] rounded-[6px] ${statusStyles[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                  <span className={`text-[12px] py-[3px] px-[10px] rounded-[6px] ${payoutStyles[c.payout]}`}>
                    {c.payout}
                  </span>
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                  <div className="flex items-center gap-1.5">
                    {c.payout === "Pending" && (
                      <button
                        onClick={() => setPayoutModal(c)}
                        className="text-[12px] px-2 py-1 rounded-md bg-admin-active-text text-white hover:opacity-90"
                      >
                        Payout
                      </button>
                    )}
                    <Link
                      href={`/admin/creators/${c.id}`}
                      className="text-[12px] px-2 py-1 rounded-md text-admin-new-text hover:bg-admin-new-bg no-underline"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payoutModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setPayoutModal(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">
              Process payout for {payoutModal.name}
            </h3>
            <div className="bg-admin-hover rounded-md p-3 mb-4 text-[13px]">
              <div className="text-admin-muted mb-1">Amount due</div>
              <div className="text-[22px] font-semibold text-admin-text">£{payoutModal.earnings.toFixed(2)}</div>
            </div>
            <p className="text-[13px] text-admin-muted mb-4">
              Payout will be sent to registered bank account. Confirmation email will be sent to the creator.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPayoutModal(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePayout(payoutModal.id)}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Process payout
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
