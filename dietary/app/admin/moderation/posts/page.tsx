"use client";

import { useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  author: string;
  authorType: "User" | "Creator";
  category: "Tips" | "Restaurant" | "Advice" | "Celebrate" | "Question";
  title: string;
  content: string;
  restriction: string;
  likes: number;
  replies: number;
  posted: string;
  status: "Pending" | "Approved" | "Rejected";
  flaggedReason?: string;
};

const initialData: Post[] = [
  { id: "p_001", author: "Sarah M.", authorType: "Creator", category: "Tips", title: "Best gluten-free pizza in London — verified safe", content: "After testing 15 restaurants, here are the 3 that actually have separate prep areas and trained staff. Avoid chains that claim GF but use shared surfaces.", restriction: "Celiac", likes: 47, replies: 12, posted: "2 hours ago", status: "Pending" },
  { id: "p_002", author: "Mike H.", authorType: "User", category: "Question", title: "Has anyone tried the new vegan place on 5th?", content: "Looking for honest reviews before I drag my whole family there this weekend. My daughter has a severe peanut allergy.", restriction: "Nut Allergy", likes: 3, replies: 8, posted: "5 hours ago", status: "Pending" },
  { id: "p_003", author: "Jordan P.", authorType: "User", category: "Restaurant", title: "Spice Route — cross-contamination disaster", content: "I had an allergic reaction despite telling them 3 times. Avoid at all costs!!!", restriction: "Multiple", likes: 0, replies: 1, posted: "1 day ago", status: "Pending", flaggedReason: "Reported by restaurant" },
  { id: "p_004", author: "Emma C.", authorType: "Creator", category: "Celebrate", title: "1 year of safe eating! Thank you DietaryID", content: "This platform gave me my life back. 365 days without a reaction. Here's what worked.", restriction: "IBS", likes: 234, replies: 45, posted: "2 days ago", status: "Pending" },
  { id: "p_005", author: "David L.", authorType: "User", category: "Advice", title: "Cheap restaurants that lie about GF", content: "Honestly, every restaurant on this list is a scam. They all say GF but use the same fryer. Just stop eating out.", restriction: "Celiac", likes: 1, replies: 3, posted: "3 days ago", status: "Pending", flaggedReason: "Potentially defamatory" },
  { id: "p_006", author: "Sophie T.", authorType: "User", category: "Tips", title: "Travelling abroad? Always carry these cards", content: "I always bring printed allergy cards in 4 languages. Saves my life every trip.", restriction: "Multiple", likes: 89, replies: 22, posted: "4 days ago", status: "Pending" },
];

const categoryStyles: Record<Post["category"], string> = {
  Tips: "bg-admin-new-bg text-admin-new-text",
  Restaurant: "bg-admin-vip-bg text-admin-vip-text",
  Advice: "bg-admin-active-bg text-admin-active-text",
  Celebrate: "bg-admin-active-bg text-admin-active-text",
  Question: "bg-admin-muted/20 text-admin-text",
};

const statusStyles: Record<Post["status"], string> = {
  Pending: "bg-admin-vip-bg text-admin-vip-text",
  Approved: "bg-admin-active-bg text-admin-active-text",
  Rejected: "bg-admin-non-bg text-admin-non-text",
};

export default function PostsModerationPage() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState<"all" | Post["status"]>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | Post["category"]>("all");
  const [editing, setEditing] = useState<Post | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [rejectModal, setRejectModal] = useState<Post | null>(null);

  const filtered = data
    .filter((p) => filter === "all" || p.status === filter)
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter);

  const pending = data.filter((p) => p.status === "Pending");
  const flagged = pending.filter((p) => p.flaggedReason);
  const high = pending.filter((p) => p.flaggedReason?.includes("defamatory") || p.flaggedReason?.includes("Reported"));

  const handleApprove = (id: string) => {
    setData((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p)));
  };

  const handleReject = () => {
    if (!rejectModal) return;
    setData((prev) => prev.map((p) => (p.id === rejectModal.id ? { ...p, status: "Rejected" } : p)));
    setRejectModal(null);
  };

  const handleEditApprove = () => {
    if (!editing) return;
    setData((prev) =>
      prev.map((p) => (p.id === editing.id ? { ...p, content: editedContent, status: "Approved" } : p))
    );
    setEditing(null);
    setEditedContent("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Community Posts Moderation</h1>
        <p className="text-[14px] text-admin-muted">Approve, reject, or edit community posts before they go live.</p>
      </div>

      <div className="flex items-center gap-6 py-[14px] px-[26px] border-b border-admin-border text-[13.5px] flex-wrap">
        <span className="text-admin-muted">
          Pending: <strong className="text-admin-text">{pending.length}</strong>
        </span>
        <span className="text-admin-muted">
          Flagged: <strong className="text-admin-vip-text">{flagged.length}</strong>
        </span>
        <span className="text-admin-muted">
          High-risk: <strong className="text-admin-non-text">{high.length}</strong>
        </span>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            {(["all", "Pending", "Approved", "Rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                  filter === f ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
                }`}
              >
                {f === "all" ? "All status" : f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {(["all", "Tips", "Restaurant", "Advice", "Celebrate", "Question"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c as typeof categoryFilter)}
                className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                  categoryFilter === c ? "bg-admin-new-text text-white" : "text-admin-nav-text hover:bg-admin-hover"
                }`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-6">
        <div className="space-y-3 max-w-[900px]">
          {filtered.map((p) => (
            <div key={p.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <div className="flex items-start gap-2 mb-2 flex-wrap">
                <h3 className="text-[16px] font-semibold text-admin-text">{p.title}</h3>
                <span className={`text-[11px] py-[2px] px-2 rounded-[5px] ${categoryStyles[p.category]}`}>
                  {p.category}
                </span>
                {p.status !== "Pending" && (
                  <span className={`text-[11.5px] py-[2px] px-2 rounded-[6px] ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-[12.5px] text-admin-muted mb-2">
                <span>
                  <strong className="text-admin-text">{p.author}</strong>{" "}
                  {p.authorType === "Creator" && (
                    <span className="bg-admin-tag-bg text-admin-tag-text text-[10px] font-semibold py-0.5 px-1.5 rounded-md ml-1">
                      Creator
                    </span>
                  )}
                </span>
                <span>·</span>
                <span>{p.restriction}</span>
                <span>·</span>
                <span>{p.posted}</span>
                <span>·</span>
                <span>❤️ {p.likes}</span>
                <span>💬 {p.replies}</span>
              </div>

              <p className="text-[14px] text-admin-nav-text mb-3">{p.content}</p>

              {p.flaggedReason && (
                <p className="text-[12.5px] text-admin-non-text mb-3">⚠️ {p.flaggedReason}</p>
              )}

              {p.status === "Pending" && (
                <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="text-[13px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setRejectModal(p)}
                    className="text-[13px] px-3 py-1.5 rounded-md bg-admin-non-text text-white hover:opacity-90"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setEditing(p);
                      setEditedContent(p.content);
                    }}
                    className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[600px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Edit and approve</h3>
            <p className="text-[13px] text-admin-muted mb-3">
              Edits will be marked with "[edited by admin]" when published.
            </p>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
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
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Reject post</h3>
            <p className="text-[13px] text-admin-muted mb-3">Reason will be shared with the author.</p>
            <select
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg bg-admin-bg"
              defaultValue=""
              onChange={(e) => e.target.value && handleReject()}
            >
              <option value="">Select reason...</option>
              <option value="Spam">Spam</option>
              <option value="Harassment">Harassment</option>
              <option value="Misinformation">Misinformation</option>
              <option value="Defamatory">Defamatory</option>
              <option value="Off-topic">Off-topic</option>
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
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
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
