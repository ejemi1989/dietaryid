"use client";

import { useState } from "react";
import { createBooking } from "@/lib/bookings";
import { notifyUser, notifyAdmin, notifyRestaurant } from "@/lib/notifications";

type Props = {
  restaurantId: string;
  restaurantName: string;
  restaurantEmoji: string;
  userName: string;
  userEmail?: string;
  userRestriction?: string;
  onClose: () => void;
};

export function BookTableModal({
  restaurantId, restaurantName, restaurantEmoji, userName, userEmail, userRestriction,
  onClose,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [requests, setRequests] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");
  const [bookingId, setBookingId] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);

  const handleSubmit = () => {
    if (!date || !time) return;
    const b = createBooking({
      restaurantId, restaurantName, restaurantEmoji, userName,
      userEmail: userEmail || "sarah@dietaryid.com",
      userRestriction: userRestriction || "Celiac",
      date, time, partySize, requests,
    });
    setBookingId(b.id);
    setStep("confirm");
  };

  const handleFinal = () => {
    notifyUser("📅 Booking request sent to " + restaurantName, "/user/saved");
    notifyAdmin("New booking from " + userName + " for " + restaurantName, "/restaurant/bookings");
    notifyRestaurant("New booking request from " + userName + " · Party of " + partySize, "/restaurant/bookings");
    setStep("done");
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => step !== "done" && onClose()}>
      <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[500px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
        {step === "done" ? (
          <div className="text-center py-4">
            <div className="text-[56px] mb-2">📅</div>
            <h3 className="text-[18px] font-semibold text-admin-text mb-2">Booking request sent!</h3>
            <p className="text-[13px] text-admin-muted mb-3">{restaurantName} will confirm shortly. You&apos;ll get a notification.</p>
            <div className="flex items-center justify-center gap-2">
              <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Done</button>
            </div>
          </div>
        ) : step === "confirm" ? (
          <>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">Confirm your booking</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[22px]">{restaurantEmoji}</span>
              <span className="text-[14px] text-admin-text font-medium">{restaurantName}</span>
            </div>
            <div className="bg-admin-hover rounded-md p-3 mb-4 text-[13px] space-y-1.5">
              <div className="flex justify-between"><span className="text-admin-muted">Date:</span><span className="text-admin-text font-medium">{new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span></div>
              <div className="flex justify-between"><span className="text-admin-muted">Time:</span><span className="text-admin-text font-medium">{time}</span></div>
              <div className="flex justify-between"><span className="text-admin-muted">Party:</span><span className="text-admin-text font-medium">{partySize} {partySize === 1 ? "person" : "people"}</span></div>
              {requests && <div className="flex justify-between"><span className="text-admin-muted">Requests:</span><span className="text-admin-text font-medium">{requests}</span></div>}
              <div className="flex justify-between"><span className="text-admin-muted">Booking for:</span><span className="text-admin-text font-medium">{userName} ({userRestriction})</span></div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setStep("form")} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">← Edit</button>
              <button onClick={handleFinal} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90">📅 Send booking request</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[22px]">{restaurantEmoji}</span>
              <h3 className="text-[17px] font-semibold text-admin-text">Book a table at {restaurantName}</h3>
            </div>
            <p className="text-[12.5px] text-admin-muted mb-4">Booking for <strong>{userName}</strong> · {userRestriction}</p>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Date</div>
                  <input
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                  />
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted mb-1">Time</div>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
                  >
                    <option value="">Select time</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Party size: <span className="text-admin-text font-semibold">{partySize}</span></div>
                <input
                  type="range"
                  min="1" max="12"
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-admin-muted mt-0.5">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>6</span><span>8</span><span>10</span><span>12</span>
                </div>
              </div>
              <div>
                <div className="text-[12px] text-admin-muted mb-1">Special requests / allergy notes</div>
                <textarea
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  rows={3}
                  placeholder="e.g. Separate prep area needed, gluten-free options preferred, window seat if possible..."
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-admin-border">
              <button onClick={onClose} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={!date || !time}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Review booking →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
