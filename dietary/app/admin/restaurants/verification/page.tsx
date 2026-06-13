"use client";

import { useState } from "react";

type Restaurant = {
  id: string;
  name: string;
  location: string;
  owner: string;
  email: string;
  submitted: string;
  itemsCount: number;
  status: "Pending" | "Approved" | "Rejected";
};

const initialData: Restaurant[] = [
  { id: "r_001", name: "The Sushi Palace", location: "Glasgow", owner: "David Chen", email: "david@sushipalace.com", submitted: "Mar 15, 2024", itemsCount: 15, status: "Pending" },
  { id: "r_002", name: "Green Bowl Kitchen", location: "Manchester", owner: "Amy Roberts", email: "amy@greenbowl.com", submitted: "Mar 18, 2024", itemsCount: 22, status: "Pending" },
  { id: "r_003", name: "Mediterranean Sun", location: "Bristol", owner: "Marco Rossi", email: "marco@medsun.com", submitted: "Mar 20, 2024", itemsCount: 18, status: "Pending" },
  { id: "r_004", name: "Spice Route", location: "London", owner: "Priya Sharma", email: "priya@spiceroute.com", submitted: "Mar 21, 2024", itemsCount: 31, status: "Pending" },
  { id: "r_005", name: "The Vegan Garden", location: "Edinburgh", owner: "Tom Wilson", email: "tom@vegangarden.com", submitted: "Mar 22, 2024", itemsCount: 12, status: "Pending" },
  { id: "r_006", name: "Ocean Catch", location: "Liverpool", owner: "James Brown", email: "james@oceancatch.com", submitted: "Mar 23, 2024", itemsCount: 20, status: "Pending" },
  { id: "r_007", name: "Noodle House", location: "Leeds", owner: "Lin Wei", email: "lin@noodlehouse.com", submitted: "Mar 24, 2024", itemsCount: 14, status: "Pending" },
  { id: "r_008", name: "Farm Table", location: "Cambridge", owner: "Sarah Green", email: "sarah@farmtable.com", submitted: "Mar 25, 2024", itemsCount: 9, status: "Pending" },
];

const statusStyles: Record<Restaurant["status"], string> = {
  Pending: "bg-admin-vip-bg text-admin-vip-text",
  Approved: "bg-admin-active-bg text-admin-active-text",
  Rejected: "bg-admin-non-bg text-admin-non-text",
};

export default function VerificationPage() {
  const [data, setData] = useState(initialData);
  const [actionModal, setActionModal] = useState<{ restaurant: Restaurant; action: "approve" | "reject" } | null>(null);
  const [feedback, setFeedback] = useState("");
  const [viewMenu, setViewMenu] = useState<Restaurant | null>(null);

  const pending = data.filter((r) => r.status === "Pending");
  const approved = data.filter((r) => r.status === "Approved");
  const rejected = data.filter((r) => r.status === "Rejected");

  const handleAction = () => {
    if (!actionModal) return;
    setData((prev) =>
      prev.map((r) =>
        r.id === actionModal.restaurant.id
          ? { ...r, status: actionModal.action === "approve" ? "Approved" : "Rejected" }
          : r
      )
    );
    setActionModal(null);
    setFeedback("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Restaurant Verification</h1>
        <p className="text-[14px] text-admin-muted">Review and approve restaurant submissions for verification.</p>
      </div>

      <div className="flex items-center gap-5 py-[14px] px-[26px] border-b border-admin-border">
        <div className="flex items-center gap-6 text-[13.5px]">
          <span className="text-admin-muted">
            Pending: <strong className="text-admin-vip-text">{pending.length}</strong>
          </span>
          <span className="text-admin-muted">
            Approved: <strong className="text-admin-active-text">{approved.length}</strong>
          </span>
          <span className="text-admin-muted">
            Rejected: <strong className="text-admin-non-text">{rejected.length}</strong>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[26px] py-6">
        <div className="space-y-3 max-w-[900px]">
          {data.map((r) => (
            <div
              key={r.id}
              className="bg-admin-bg border border-admin-border rounded-[10px] p-5 hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[16px] font-semibold text-admin-text">{r.name}</h3>
                    <span className={`text-[11.5px] py-[2px] px-2 rounded-[6px] ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-admin-muted">{r.location}</p>
                </div>
                <span className={`text-[12px] py-[3px] px-[10px] rounded-[7px] ${statusStyles[r.status]}`}>
                  {r.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-admin-nav-text mb-4">
                <div>Owner: <strong className="text-admin-text">{r.owner}</strong></div>
                <div>Email: <span className="text-admin-new-text">{r.email}</span></div>
                <div>Submitted: {r.submitted}</div>
                <div>Menu items: <strong className="text-admin-text">{r.itemsCount}</strong></div>
              </div>

              {r.status === "Pending" && (
                <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                  <button
                    onClick={() => setViewMenu(r)}
                    className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover transition-colors"
                  >
                    View Menu
                  </button>
                  <button
                    onClick={() => setActionModal({ restaurant: r, action: "approve" })}
                    className="text-[13px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90 transition-opacity"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setActionModal({ restaurant: r, action: "reject" })}
                    className="text-[13px] px-3 py-1.5 rounded-md bg-admin-non-text text-white hover:opacity-90 transition-opacity"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {viewMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setViewMenu(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">{viewMenu.name} — Menu</h3>
            <p className="text-[13px] text-admin-muted mb-4">{viewMenu.itemsCount} items submitted</p>
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {Array.from({ length: Math.min(viewMenu.itemsCount, 8) }).map((_, i) => (
                <div key={i} className="p-3 border border-admin-border rounded-md">
                  <div className="text-[14px] font-semibold text-admin-text">Item {i + 1}</div>
                  <div className="text-[12.5px] text-admin-muted mt-1">Allergens: None identified</div>
                </div>
              ))}
              {viewMenu.itemsCount > 8 && (
                <p className="text-[12px] text-admin-muted text-center pt-2">
                  + {viewMenu.itemsCount - 8} more items
                </p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewMenu(null)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {actionModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setActionModal(null)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">
              {actionModal.action === "approve" ? "Approve" : "Reject"} {actionModal.restaurant.name}
            </h3>
            <p className="text-[13px] text-admin-muted mb-4">
              {actionModal.action === "approve"
                ? "This restaurant will receive a verification badge. Auto-email will be sent."
                : "Provide feedback for the restaurant on what needs to change."}
            </p>
            {actionModal.action === "reject" && (
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Feedback to restaurant (required)..."
                rows={4}
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setActionModal(null);
                  setFeedback("");
                }}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={actionModal.action === "reject" && !feedback.trim()}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90 disabled:opacity-50"
              >
                Confirm {actionModal.action === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
