"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Creator = {
  id: string;
  name: string;
  restriction: string;
  reviews: number;
  dishesVerified: number;
  guidesCreated: number;
  currentBalance: number;
  pendingPayout: number;
  lastPayout: number;
  lastPayoutDate: string;
  payoutMethod: string;
  status: "Active" | "Probation" | "Suspended";
};

const creatorsDb: Record<string, Creator> = {
  c_001: { id: "c_001", name: "Sarah Mitchell", restriction: "Celiac", reviews: 156, dishesVerified: 45, guidesCreated: 1, currentBalance: 239.60, pendingPayout: 239.60, lastPayout: 127.30, lastPayoutDate: "Sept 15, 2024", payoutMethod: "Bank transfer to ****4567", status: "Active" },
  c_002: { id: "c_002", name: "Mike Henderson", restriction: "Gluten-Free", reviews: 89, dishesVerified: 23, guidesCreated: 0, currentBalance: 234.50, pendingPayout: 234.50, lastPayout: 89.20, lastPayoutDate: "Sept 15, 2024", payoutMethod: "Bank transfer to ****8901", status: "Active" },
  c_003: { id: "c_003", name: "Jordan Lee", restriction: "Nut Allergy", reviews: 45, dishesVerified: 12, guidesCreated: 0, currentBalance: 128.30, pendingPayout: 128.30, lastPayout: 45.00, lastPayoutDate: "Aug 15, 2024", payoutMethod: "Bank transfer to ****2345", status: "Probation" },
};

export default function CreatorDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const creator = creatorsDb[id] || creatorsDb["c_001"];

  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutProcessed, setPayoutProcessed] = useState(false);

  const totalEarnings = creator.reviews * 1.35 + creator.dishesVerified * 0.5 + creator.guidesCreated * 6.5;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/admin/creators" className="text-[13px] text-admin-new-text no-underline hover:underline">
          ← Back to Creators
        </Link>
        <h1 className="text-[24px] font-semibold text-admin-text mt-2">{creator.name}</h1>
        <p className="text-[14px] text-admin-muted">{creator.restriction} · {creator.status}</p>
      </div>

      {payoutProcessed && (
        <div className="mx-[26px] mt-6 bg-admin-active-bg border border-admin-active-text rounded-[10px] p-4 text-[14px] text-admin-active-text">
          ✓ Payout of £{creator.pendingPayout.toFixed(2)} processed. Confirmation email sent to {creator.name}.
        </div>
      )}

      <div className="px-[26px] py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-4">Earnings breakdown</h2>
            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between py-2 border-b border-admin-border">
                <span className="text-admin-nav-text">Reviews written</span>
                <span className="text-admin-text font-medium">
                  {creator.reviews} × £1.35 = £{(creator.reviews * 1.35).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-admin-border">
                <span className="text-admin-nav-text">Dishes verified</span>
                <span className="text-admin-text font-medium">
                  {creator.dishesVerified} × £0.50 = £{(creator.dishesVerified * 0.5).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-admin-border">
                <span className="text-admin-nav-text">Guides created</span>
                <span className="text-admin-text font-medium">
                  {creator.guidesCreated} × £6.50 = £{(creator.guidesCreated * 6.5).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 text-[15px] font-semibold">
                <span className="text-admin-text">Total earnings</span>
                <span className="text-admin-text">£{totalEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Payment history</h2>
            <div className="space-y-2 text-[13.5px]">
              <div className="flex justify-between py-2 border-b border-admin-border">
                <div>
                  <div className="text-admin-text font-medium">Last payout: {creator.lastPayoutDate}</div>
                  <div className="text-[12px] text-admin-muted">£{creator.lastPayout.toFixed(2)}</div>
                </div>
                <span className="text-admin-active-text bg-admin-active-bg px-2 py-0.5 rounded text-[12px] self-center">
                  Complete
                </span>
              </div>
              <div className="flex justify-between py-2">
                <div>
                  <div className="text-admin-text font-medium">Current due: Oct 15, 2024</div>
                  <div className="text-[12px] text-admin-muted">£{creator.pendingPayout.toFixed(2)}</div>
                </div>
                <span className="text-admin-vip-text bg-admin-vip-bg px-2 py-0.5 rounded text-[12px] self-center">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Balance</h2>
            <div className="space-y-3 text-[14px]">
              <div>
                <div className="text-[12px] text-admin-muted">Current balance</div>
                <div className="text-[22px] font-semibold text-admin-text">£{creator.currentBalance.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted">Pending payout</div>
                <div className="text-[16px] font-semibold text-admin-vip-text">£{creator.pendingPayout.toFixed(2)}</div>
              </div>
              <div className="pt-2 border-t border-admin-border">
                <div className="text-[12px] text-admin-muted">Payout method</div>
                <div className="text-[13px] text-admin-text">{creator.payoutMethod}</div>
              </div>
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => setShowPayoutModal(true)}
                className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-active-text text-white hover:opacity-90"
              >
                Manual Payout Now
              </button>
              <button
                onClick={() => alert(`Message sent to ${creator.name}`)}
                className="w-full text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Send Message
              </button>
              <button
                onClick={() => alert(`Suspend earnings for ${creator.name}`)}
                className="w-full text-[13px] px-3 py-2 rounded-md bg-admin-vip-bg text-admin-vip-text hover:opacity-90"
              >
                Suspend Earnings
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPayoutModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4"
          onClick={() => setShowPayoutModal(false)}
        >
          <div
            className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Process manual payout</h3>
            <div className="bg-admin-hover rounded-md p-3 mb-4 text-[13px]">
              <div className="text-admin-muted mb-1">Amount</div>
              <div className="text-[22px] font-semibold text-admin-text">£{creator.pendingPayout.toFixed(2)}</div>
            </div>
            <p className="text-[13px] text-admin-muted mb-4">
              Payout to {creator.payoutMethod}. Confirmation email will be sent.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-[14px] px-4 py-2 rounded-md text-admin-text border border-admin-border hover:bg-admin-hover"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPayoutModal(false);
                  setPayoutProcessed(true);
                }}
                className="text-[14px] px-4 py-2 rounded-md text-white bg-admin-dark hover:opacity-90"
              >
                Process payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
