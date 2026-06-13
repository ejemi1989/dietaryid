"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Dispute = {
  id: string;
  type: string;
  parties: string;
  userClaim: string;
  restaurantResponse: string;
};

const disputesDb: Record<string, Dispute> = {
  d_001: {
    id: "d_001",
    type: "Allergen Accuracy",
    parties: "Sarah M. vs The Italian Kitchen",
    userClaim: "I had an allergic reaction 2 hours after dining. Ordered the Grilled Salmon — moderate rash and headache, urgent care visit.",
    restaurantResponse: "Salmon is gluten-free, nut-free. Verified safe by our process. Cross-contamination: shared kitchen. Staff trained. No previous incidents.",
  },
  d_002: {
    id: "d_002",
    type: "Review Authenticity",
    parties: "David Chen vs Mike H.",
    userClaim: "Restaurant owner claims my 1-star review is fake. I visited and had a real bad experience.",
    restaurantResponse: "No record of this customer dining at our restaurant. We checked reservations and POS — they never ordered.",
  },
  d_003: {
    id: "d_003",
    type: "Creator Earnings",
    parties: "Sarah Mitchell — payment missing",
    userClaim: "My last payout was £127.30 but I earned at least £50 more in commissions that weren't included.",
    restaurantResponse: "N/A — creator dispute.",
  },
};

export default function DisputeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const dispute = disputesDb[id] || disputesDb["d_001"];

  const [decision, setDecision] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [closed, setClosed] = useState(false);

  const handleDecision = (d: string) => {
    setDecision(d);
  };

  const submitDecision = () => {
    setClosed(true);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/admin/disputes" className="text-[13px] text-admin-new-text no-underline hover:underline">
          ← Back to Disputes
        </Link>
        <h1 className="text-[24px] font-semibold text-admin-text mt-2">{dispute.type}</h1>
        <p className="text-[14px] text-admin-muted">{dispute.parties}</p>
      </div>

      {closed && (
        <div className="mx-[26px] mt-6 bg-admin-active-bg border border-admin-active-text rounded-[10px] p-4 text-[14px] text-admin-active-text">
          ✓ Decision recorded. Both parties will be notified by email. Reasoning: {notes || "(none provided)"}
        </div>
      )}

      <div className="px-[26px] py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">User claim</h2>
          <p className="text-[14px] text-admin-nav-text">{dispute.userClaim}</p>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Restaurant / other party response</h2>
          <p className="text-[14px] text-admin-nav-text">{dispute.restaurantResponse}</p>
        </div>
      </div>

      <div className="px-[26px] pb-6">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 max-w-[800px]">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Decision</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => handleDecision("Dismiss")}
              className={`text-[13px] px-3 py-2 rounded-md border ${
                decision === "Dismiss"
                  ? "bg-admin-dark text-white border-admin-dark"
                  : "border-admin-border text-admin-text hover:bg-admin-hover"
              }`}
            >
              Dismiss — No evidence
            </button>
            <button
              onClick={() => handleDecision("Warn")}
              className={`text-[13px] px-3 py-2 rounded-md border ${
                decision === "Warn"
                  ? "bg-admin-vip-bg text-admin-vip-text border-admin-vip-text"
                  : "border-admin-border text-admin-text hover:bg-admin-hover"
              }`}
            >
              Warn Restaurant
            </button>
            <button
              onClick={() => handleDecision("Compensate")}
              className={`text-[13px] px-3 py-2 rounded-md border ${
                decision === "Compensate"
                  ? "bg-admin-new-bg text-admin-new-text border-admin-new-text"
                  : "border-admin-border text-admin-text hover:bg-admin-hover"
              }`}
            >
              Award £50 to User
            </button>
            <button
              onClick={() => handleDecision("Suspend")}
              className={`text-[13px] px-3 py-2 rounded-md border ${
                decision === "Suspend"
                  ? "bg-admin-non-bg text-admin-non-text border-admin-non-text"
                  : "border-admin-border text-admin-text hover:bg-admin-hover"
              }`}
            >
              Suspend Restaurant
            </button>
            <button
              onClick={() => handleDecision("Ban")}
              className={`text-[13px] px-3 py-2 rounded-md border ${
                decision === "Ban"
                  ? "bg-admin-non-bg text-admin-non-text border-admin-non-text"
                  : "border-admin-border text-admin-text hover:bg-admin-hover"
              }`}
            >
              Ban Restaurant
            </button>
            <button
              onClick={() => handleDecision("MoreInfo")}
              className={`text-[13px] px-3 py-2 rounded-md border ${
                decision === "MoreInfo"
                  ? "bg-admin-hover text-admin-text border-admin-border"
                  : "border-admin-border text-admin-text hover:bg-admin-hover"
              }`}
            >
              Close — Need More Info
            </button>
          </div>

          <label className="block text-[13px] font-medium text-admin-text mb-1.5">
            Document reasoning
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Document your reasoning for this decision..."
            className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] text-admin-text mb-4 outline-none focus:ring-2 focus:ring-admin-new-bg"
          />

          <button
            onClick={submitDecision}
            disabled={!decision}
            className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90 disabled:opacity-50"
          >
            Submit decision
          </button>
        </div>
      </div>
    </div>
  );
}
