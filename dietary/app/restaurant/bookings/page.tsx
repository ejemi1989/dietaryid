"use client";

import { useState } from "react";
import { useBookings, confirmBooking, declineBooking } from "@/lib/bookings";
import { notifyUser } from "@/lib/notifications";

type View = "list" | "calendar";

const statusStyles: Record<string, string> = {
  Waiting: "bg-admin-vip-bg text-admin-vip-text",
  Confirmed: "bg-admin-active-bg text-admin-active-text",
  Declined: "bg-admin-non-bg text-admin-non-text",
};

const formatDate = (d: string) => {
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
};

export default function RestaurantBookingsPage() {
  const bookings = useBookings();
  const [view, setView] = useState<View>("list");
  const [filter, setFilter] = useState<"all" | "Waiting" | "Confirmed" | "Declined">("all");
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState<string | null>(null);

  const filtered = bookings.filter((b) => filter === "all" || b.status === filter);
  const pending = bookings.filter((b) => b.status === "Waiting").length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;

  const handleConfirm = (id: string) => {
    confirmBooking(id);
    const b = bookings.find((x) => x.id === id);
    if (b) notifyUser("📅 Your booking at " + b.restaurantName + " was confirmed!", "/user/dashboard");
  };

  const handleDecline = (id: string) => {
    declineBooking(id);
    const b = bookings.find((x) => x.id === id);
    if (b) notifyUser("Your booking at " + b.restaurantName + " was declined. Please try a different time.", "/user/dashboard");
  };

  const handleSendMessage = (id: string) => {
    if (!messageText.trim()) return;
    setMessageSent(id);
    setShowMessage(null);
    setMessageText("");
    setTimeout(() => setMessageSent(null), 2500);
  };

  const weekStart = new Date("2024-01-15");
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Booking Requests 📅</h1>
        <p className="text-[14px] text-admin-muted">Manage reservations from DietaryID customers.</p>
      </div>

      <div className="px-[26px] py-4 border-b border-admin-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Pending</div>
            <div className="text-[22px] font-semibold text-admin-vip-text">{pending}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Confirmed</div>
            <div className="text-[22px] font-semibold text-admin-active-text">{confirmed}</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">This Week</div>
            <div className="text-[22px] font-semibold text-admin-text">{bookings.length}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 py-[14px] px-[26px] border-b border-admin-border flex-wrap">
        <div className="flex items-center gap-2">
          {(["all", "Waiting", "Confirmed", "Declined"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                filter === f ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <div className="flex items-center border border-admin-border rounded-md overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`text-[12.5px] px-3 py-1.5 ${view === "list" ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`text-[12.5px] px-3 py-1.5 ${view === "calendar" ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover"}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {messageSent && (
        <div className="mx-[26px] mt-3 p-3 rounded-md bg-admin-active-bg text-[12.5px] text-admin-active-text">
          ✓ Message sent to {bookings.find((b) => b.id === messageSent)?.userName}.
        </div>
      )}

      <div className="px-[26px] py-6">
        {view === "list" ? (
          <div className="space-y-3 max-w-[900px]">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-admin-muted text-center py-6">No bookings match this filter.</p>
            ) : (
              filtered.map((b) => (
                <div key={b.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[16px] font-semibold text-admin-text">📅 {b.userName}</span>
                        <span className="text-[12px] text-admin-muted">| {b.userRestriction}</span>
                        <span className={`text-[11.5px] py-[2px] px-2 rounded-[6px] ${statusStyles[b.status]}`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-[14px] text-admin-nav-text">
                        {formatDate(b.date)} at {b.time} · Party of {b.partySize}
                      </p>
                      <p className="text-[13px] text-admin-muted mt-1">
                        Special request: &ldquo;{b.requests}&rdquo;
                      </p>
                    </div>
                  </div>

                  {b.status === "Waiting" && (
                    <div className="flex items-center gap-2 pt-3 border-t border-admin-border flex-wrap">
                      <button
                        onClick={() => handleConfirm(b.id)}
                        className="text-[13px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
                      >
                        ✓ Confirm
                      </button>
                      <button
                        onClick={() => handleDecline(b.id)}
                        className="text-[13px] px-3 py-1.5 rounded-md bg-admin-non-text text-white hover:opacity-90"
                      >
                        ✗ Decline
                      </button>
                      <button
                        onClick={() => { setShowMessage(b.id); setMessageText(""); }}
                        className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                      >
                        💬 Message
                      </button>
                    </div>
                  )}

                  {b.status === "Confirmed" && (
                    <div className="flex items-center gap-2 pt-3 border-t border-admin-border flex-wrap">
                      <span className="text-[13px] text-admin-active-text">✓ Booking confirmed — customer notified</span>
                      <button
                        onClick={() => { setShowMessage(b.id); setMessageText(""); }}
                        className="text-[12.5px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover ml-auto"
                      >
                        💬 Message
                      </button>
                    </div>
                  )}

                  {b.status === "Declined" && (
                    <div className="pt-3 border-t border-admin-border text-[13px] text-admin-non-text">
                      ✗ Booking declined — customer notified
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-semibold text-admin-text">Week of {weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</h2>
              <div className="flex items-center gap-2 text-[12px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-admin-active-text"></span>Confirmed</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-admin-vip-text"></span>Waiting</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-admin-non-text"></span>Declined</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {weekDays.map((d) => {
                const iso = d.toISOString().slice(0, 10);
                const dayBookings = bookings.filter((b) => b.date === iso);
                return (
                  <div key={iso} className="bg-admin-bg border border-admin-border rounded-md overflow-hidden">
                    <div className="px-2 py-1.5 border-b border-admin-border bg-admin-hover">
                      <div className="text-[11px] text-admin-muted uppercase tracking-wide">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className="text-[16px] font-semibold text-admin-text">{d.getDate()}</div>
                    </div>
                    <div className="p-1.5 space-y-1 min-h-[120px]">
                      {dayBookings.length === 0 ? (
                        <div className="text-[11px] text-admin-muted italic text-center py-3">No bookings</div>
                      ) : (
                        dayBookings.map((b) => (
                          <div
                            key={b.id}
                            className={`p-1.5 rounded text-[11px] cursor-pointer ${
                              b.status === "Confirmed" ? "bg-admin-active-bg text-admin-active-text" :
                              b.status === "Waiting" ? "bg-admin-vip-bg text-admin-vip-text" :
                              "bg-admin-non-bg text-admin-non-text"
                            }`}
                          >
                            <div className="font-semibold">{b.time}</div>
                            <div className="truncate">{b.userName} ({b.partySize})</div>
                            <div className="truncate opacity-75">{b.userRestriction}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showMessage && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowMessage(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Message {bookings.find((b) => b.id === showMessage)?.userName}</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Send a direct message to this customer.</p>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
              placeholder="Type your message..."
              className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setShowMessage(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => handleSendMessage(showMessage)}
                disabled={!messageText.trim()}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
