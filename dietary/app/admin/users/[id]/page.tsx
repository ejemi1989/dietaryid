"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Suspended" | "Banned";
  reviews: number;
  posts: number;
  joinedDate: string;
  lastActive: string;
};

const usersDb: Record<string, User> = {
  u_001: { id: "u_001", name: "Sarah Mitchell", email: "sarah.m@email.com", status: "Active", reviews: 47, posts: 12, joinedDate: "Jan 15, 2023", lastActive: "2 hours ago" },
  u_002: { id: "u_002", name: "Mike Henderson", email: "mike.h@email.com", status: "Active", reviews: 23, posts: 5, joinedDate: "Mar 8, 2023", lastActive: "1 day ago" },
  u_003: { id: "u_003", name: "Jordan Lee", email: "jordan.l@email.com", status: "Suspended", reviews: 0, posts: 0, joinedDate: "Feb 2, 2024", lastActive: "5 days ago" },
  u_004: { id: "u_004", name: "Alex Kim", email: "alex.k@email.com", status: "Banned", reviews: 156, posts: 0, joinedDate: "Jul 20, 2022", lastActive: "1 month ago" },
};

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const user = usersDb[id] || usersDb["u_001"];

  const [status, setStatus] = useState<User["status"]>(user.status);
  const [confirmAction, setConfirmAction] = useState<"ban" | "delete" | null>(null);
  const [warningSent, setWarningSent] = useState(false);

  const updateStatus = (newStatus: User["status"]) => {
    setStatus(newStatus);
    setConfirmAction(null);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/admin/users" className="text-[13px] text-admin-new-text no-underline hover:underline">
          ← Back to Users
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-[24px] font-semibold text-admin-text">{user.name}</h1>
          <span
            className={`text-[12px] py-[3px] px-[10px] rounded-[6px] ${
              status === "Active"
                ? "bg-admin-active-bg text-admin-active-text"
                : status === "Suspended"
                ? "bg-admin-vip-bg text-admin-vip-text"
                : "bg-admin-non-bg text-admin-non-text"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-[14px] text-admin-muted mt-1">{user.email}</p>
      </div>

      <div className="px-[26px] py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-4">Activity</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[12px] text-admin-muted">Reviews</div>
                <div className="text-[20px] font-semibold text-admin-text">{user.reviews}</div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted">Posts</div>
                <div className="text-[20px] font-semibold text-admin-text">{user.posts}</div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted">Joined</div>
                <div className="text-[14px] text-admin-text">{user.joinedDate}</div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted">Last active</div>
                <div className="text-[14px] text-admin-text">{user.lastActive}</div>
              </div>
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Recent reviews</h2>
            <div className="space-y-2">
              {user.reviews > 0 ? (
                <>
                  <div className="text-[13px] text-admin-nav-text p-2 border-b border-admin-border">
                    ⭐⭐⭐⭐⭐ "Excellent safety protocols" — The Italian Kitchen
                  </div>
                  <div className="text-[13px] text-admin-nav-text p-2 border-b border-admin-border">
                    ⭐⭐⭐⭐ "Great for celiac dining" — Green Plate
                  </div>
                  <div className="text-[13px] text-admin-nav-text p-2">
                    ⭐⭐⭐⭐⭐ "Staff well-trained on allergens" — Ocean Catch
                  </div>
                </>
              ) : (
                <p className="text-[13px] text-admin-muted">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => setWarningSent(true)}
                className="w-full text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Send Warning
              </button>
              {status !== "Suspended" && (
                <button
                  onClick={() => updateStatus("Suspended")}
                  className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-vip-bg text-admin-vip-text hover:opacity-90"
                >
                  Suspend Account
                </button>
              )}
              {status === "Suspended" && (
                <button
                  onClick={() => updateStatus("Active")}
                  className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-active-text text-white hover:opacity-90"
                >
                  Restore Account
                </button>
              )}
              {status !== "Banned" && (
                <button
                  onClick={() => setConfirmAction("ban")}
                  className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-non-bg text-admin-non-text hover:opacity-90"
                >
                  Ban Permanently
                </button>
              )}
              <button
                onClick={() => setConfirmAction("delete")}
                className="w-full text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-non-text hover:bg-admin-non-bg"
              >
                Delete Account
              </button>
            </div>
          </div>

          {warningSent && (
            <div className="bg-admin-active-bg border border-admin-active-text rounded-[10px] p-4 text-[13px] text-admin-active-text">
              ✓ Warning sent to {user.email}
            </div>
          )}
        </div>
      </div>

      {confirmAction && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setConfirmAction(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">
              {confirmAction === "ban" ? "Ban" : "Delete"} {user.name}?
            </h3>
            <p className="text-[13px] text-admin-muted mb-4">
              {confirmAction === "ban"
                ? "This will permanently ban the user. They will not be able to access their account."
                : "This will hard-delete the user account. This is reserved for spam accounts and cannot be undone."}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmAction === "ban") updateStatus("Banned");
                  else {
                    setConfirmAction(null);
                    router.push("/admin/users");
                  }
                }}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
