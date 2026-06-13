"use client";

import { useState } from "react";

type Review = {
  id: string;
  author: string;
  rating: number;
  restaurant: string;
  text: string;
  flaggedReason?: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialData: Review[] = [
  { id: "rv_001", author: "Sarah M.", rating: 5, restaurant: "The Italian Kitchen", text: "Excellent cross-contamination procedures. Staff understood my celiac concerns perfectly.", flaggedReason: "Possible fake review", status: "Pending" },
  { id: "rv_002", author: "Mike H.", rating: 2, restaurant: "Burger Barn", text: "Got sick after eating here. Kitchen clearly doesn't separate allergens.", flaggedReason: "Reported by restaurant", status: "Pending" },
  { id: "rv_003", author: "Emma C.", rating: 4, restaurant: "Green Plate", text: "Great vegan options. Menu clearly labels all allergens. Would return.", status: "Pending" },
  { id: "rv_004", author: "David L.", rating: 1, restaurant: "Spice Route", text: "TERRIBLE service, worst food ever, do not eat here!!!", flaggedReason: "Potentially aggressive", status: "Pending" },
  { id: "rv_005", author: "Jordan P.", rating: 5, restaurant: "The Vegan Garden", text: "Best plant-based meals in the city. All dishes clearly marked.", status: "Pending" },
  { id: "rv_006", author: "Sophie T.", rating: 3, restaurant: "Ocean Catch", text: "Decent seafood, but cross-contamination risk is high. Be careful.", status: "Pending" },
  { id: "rv_007", author: "James W.", rating: 5, restaurant: "Mediterranean Sun", text: "Authentic, delicious, and very accommodating to my restrictions.", status: "Pending" },
  { id: "rv_008", author: "Olivia B.", rating: 2, restaurant: "Noodle House", text: "Limited gluten-free options. Disappointing for the price.", status: "Pending" },
];

const statusStyles: Record<Review["status"], string> = {
  Pending: "bg-admin-vip-bg text-admin-vip-text",
  Approved: "bg-admin-active-bg text-admin-active-text",
  Rejected: "bg-admin-non-bg text-admin-non-text",
};

const severityStyles: Record<string, string> = {
  low: "bg-admin-new-bg text-admin-new-text",
  medium: "bg-admin-vip-bg text-admin-vip-text",
  high: "bg-admin-non-bg text-admin-non-text",
};

function getSeverity(review: Review): "low" | "medium" | "high" | null {
  if (!review.flaggedReason) return null;
  if (review.rating <= 2) return "high";
  if (review.flaggedReason.includes("Reported")) return "medium";
  return "low";
}

export default function ModerationPage() {
  const [data, setData] = useState(initialData);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editedText, setEditedText] = useState("");
  const [rejectModal, setRejectModal] = useState<Review | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pending = data.filter((r) => r.status === "Pending");
  const flagged = pending.filter((r) => r.flaggedReason);
  const urgent = pending.filter((r) => r.rating <= 2);

  const handleApprove = (id: string) => {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r)));
  };

  const handleReject = () => {
    if (!rejectModal) return;
    setData((prev) => prev.map((r) => (r.id === rejectModal.id ? { ...r, status: "Rejected" } : r)));
    setRejectModal(null);
    setRejectReason("");
  };

  const handleEditApprove = () => {
    if (!editingReview) return;
    setData((prev) =>
      prev.map((r) => (r.id === editingReview.id ? { ...r, text: editedText, status: "Approved" } : r))
    );
    setEditingReview(null);
    setEditedText("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Review Moderation</h1>
        <p className="text-[14px] text-admin-muted">Approve, reject, or edit user reviews before they go live.</p>
      </div>

      <div className="flex items-center gap-6 py-[14px] px-[26px] border-b border-admin-border text-[13.5px]">
        <span className="text-admin-muted">
          Reviews pending: <strong className="text-admin-text">{pending.length}</strong>
        </span>
        <span className="text-admin-muted">
          Flagged/risky: <strong className="text-admin-vip-text">{flagged.length}</strong>
        </span>
        <span className="text-admin-muted">
          Urgent: <strong className="text-admin-non-text">{urgent.length}</strong>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-6">
        <div className="space-y-3 max-w-[900px]">
          {data.map((r) => {
            const severity = getSeverity(r);
            return (
              <div
                key={r.id}
                className="bg-admin-bg border border-admin-border rounded-[10px] p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-semibold text-admin-text">{r.author}</h3>
                      <span className="text-admin-vip-text text-[14px]">{"⭐".repeat(r.rating)}</span>
                      <span className="text-[12px] text-admin-muted">| {r.restaurant}</span>
                      {severity && (
                        <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${severityStyles[severity]}`}>
                          {severity}
                        </span>
                      )}
                    </div>
                    {r.status !== "Pending" && (
                      <span className={`text-[11.5px] py-[2px] px-2 rounded-[6px] ${statusStyles[r.status]}`}>
                        {r.status}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[14px] text-admin-nav-text mb-3 italic">"{r.text}"</p>
                {r.flaggedReason && (
                  <p className="text-[12px] text-admin-non-text mb-3">
                    Flagged as: {r.flaggedReason}
                  </p>
                )}

                {r.status === "Pending" && (
                  <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                    <button
                      onClick={() => handleApprove(r.id)}
                      className="text-[13px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectModal(r)}
                      className="text-[13px] px-3 py-1.5 rounded-md bg-admin-non-text text-white hover:opacity-90"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        setEditingReview(r);
                        setEditedText(r.text);
                      }}
                      className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {editingReview && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setEditingReview(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Edit and approve</h3>
            <p className="text-[13px] text-admin-muted mb-3">
              Edits will be marked with "[edited]" when published.
            </p>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingReview(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleEditApprove}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-active-text hover:opacity-90"
              >
                Approve with edits
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setRejectModal(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Reject review</h3>
            <p className="text-[13px] text-admin-muted mb-3">
              Reason will be shared with the author. This action is logged.
            </p>
            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg bg-admin-bg"
            >
              <option value="">Select reason...</option>
              <option value="Fake/misleading">Fake or misleading</option>
              <option value="Harassment">Harassment</option>
              <option value="Spam">Spam</option>
              <option value="Misinformation">Misinformation</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModal(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
