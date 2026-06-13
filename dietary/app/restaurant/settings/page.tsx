"use client";

import { useState } from "react";

type Tab = "account" | "team" | "billing" | "notifications";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Staff";
  permissions: "View only" | "Can respond" | "Can edit menu" | "Full access";
  lastActive: string;
  status: "Active" | "Pending";
};

const initialTeam: TeamMember[] = [
  { id: "t1", name: "Marco Rossi", email: "marco@italiankitchen.com", role: "Owner", permissions: "Full access", lastActive: "Today, 10:24 AM", status: "Active" },
  { id: "t2", name: "Sofia Bianchi", email: "sofia@italiankitchen.com", role: "Manager", permissions: "Can edit menu", lastActive: "Yesterday", status: "Active" },
  { id: "t3", name: "James Park", email: "james@italiankitchen.com", role: "Manager", permissions: "Can respond", lastActive: "3 days ago", status: "Active" },
  { id: "t4", name: "Aisha Khan", email: "aisha@italiankitchen.com", role: "Staff", permissions: "View only", lastActive: "Pending", status: "Pending" },
];

type Invoice = {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending";
};

const invoices: Invoice[] = [
  { id: "inv_001", date: "Jan 1, 2024", description: "Premium plan - January", amount: "$49.00", status: "Paid" },
  { id: "inv_002", date: "Dec 1, 2023", description: "Premium plan - December", amount: "$49.00", status: "Paid" },
  { id: "inv_003", date: "Nov 1, 2023", description: "Premium plan - November", amount: "$49.00", status: "Paid" },
  { id: "inv_004", date: "Oct 1, 2023", description: "Premium plan - October", amount: "$49.00", status: "Paid" },
];

export default function RestaurantSettingsPage() {
  const [tab, setTab] = useState<Tab>("account");
  const [email, setEmail] = useState("owner@italiankitchen.com");
  const [phone, setPhone] = useState("+44 161 123 4567");
  const [showSavedAccount, setShowSavedAccount] = useState(false);
  const [showSavedNotif, setShowSavedNotif] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [team, setTeam] = useState(initialTeam);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Staff" as TeamMember["role"], permissions: "View only" as TeamMember["permissions"] });
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [card, setCard] = useState({ number: "•••• •••• •••• 4567", expiry: "12/25", name: "Marco Rossi" });
  const [showSupport, setShowSupport] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const [notifs, setNotifs] = useState({
    newReviews: true,
    bookingRequests: true,
    weeklySummary: true,
    marketingTips: false,
    profileViewed: false,
  });

  const handleSaveAccount = () => {
    setShowSavedAccount(true);
    setTimeout(() => setShowSavedAccount(false), 2000);
  };

  const handleSaveNotifs = () => {
    setShowSavedNotif(true);
    setTimeout(() => setShowSavedNotif(false), 2000);
  };

  const handleAddTeam = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) return;
    setTeam((prev) => [
      ...prev,
      {
        id: `t_${Date.now()}`,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        permissions: newMember.permissions,
        lastActive: "Pending",
        status: "Pending",
      },
    ]);
    setNewMember({ name: "", email: "", role: "Staff", permissions: "View only" });
    setShowAddTeam(false);
  };

  const handleRemoveTeam = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const handleResendInvite = (id: string) => {
    alert(`Invitation resent to ${team.find((m) => m.id === id)?.email}`);
  };

  const handleSupportSubmit = () => {
    setSupportSubmitted(true);
    setTimeout(() => {
      setShowSupport(false);
      setSupportSubmitted(false);
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Settings ⚙️</h1>
        <p className="text-[14px] text-admin-muted">Account settings, team management, billing, and notifications.</p>
      </div>

      <div className="px-[26px] border-b border-admin-border">
        <div className="flex items-center gap-1">
          {([
            { v: "account", l: "Account" },
            { v: "team", l: "Team Management" },
            { v: "billing", l: "Payment & Billing" },
            { v: "notifications", l: "Notifications" },
          ] as { v: Tab; l: string }[]).map((t) => (
            <button
              key={t.v}
              onClick={() => setTab(t.v)}
              className={`text-[13px] px-4 py-3 border-b-2 transition-colors ${
                tab === t.v ? "border-admin-dark text-admin-text font-medium" : "border-transparent text-admin-muted hover:text-admin-text"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
      </div>

      <div className="px-[26px] py-6 max-w-[900px]">
        {tab === "account" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Restaurant information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Restaurant name</div>
                  <input type="text" defaultValue="The Italian Kitchen" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Email address</div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Phone</div>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Restaurant URL</div>
                  <input type="text" defaultValue="the-italian-kitchen" readOnly className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-hover text-admin-text outline-none font-mono" />
                </div>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Current password</div>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">New password</div>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
              </div>
              <button
                onClick={() => alert("Password change email sent (mock)")}
                className="mt-3 text-[12.5px] text-admin-new-text hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="flex items-center justify-end gap-2">
              {showSavedAccount && <span className="text-[12.5px] text-admin-active-text">✓ Changes saved</span>}
              <button
                onClick={handleSaveAccount}
                className="text-[14px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {tab === "team" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[16px] font-semibold text-admin-text">Manage your team</h2>
                <p className="text-[12.5px] text-admin-muted">Add staff members and assign permissions.</p>
              </div>
              <button
                onClick={() => setShowAddTeam(true)}
                className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                + Add team member
              </button>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-[14px] border-b border-admin-border font-semibold">Member</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-[14px] border-b border-admin-border font-semibold">Role</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-[14px] border-b border-admin-border font-semibold hidden md:table-cell">Permissions</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-[14px] border-b border-admin-border font-semibold hidden md:table-cell">Last active</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-admin-muted py-3 px-[14px] border-b border-admin-border font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((m) => (
                    <tr key={m.id} className="hover:bg-admin-hover">
                      <td className="py-[13px] px-[14px] border-b border-admin-border">
                        <div className="flex items-center gap-2">
                          <img src={`https://i.pravatar.cc/80?u=${m.email}`} alt="" className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="text-[14px] text-admin-text font-medium">{m.name}</div>
                            <div className="text-[12px] text-admin-muted">{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-[13px] px-[14px] text-[13.5px] text-admin-nav-text border-b border-admin-border">{m.role}</td>
                      <td className="py-[13px] px-[14px] text-[13.5px] text-admin-nav-text border-b border-admin-border hidden md:table-cell">{m.permissions}</td>
                      <td className="py-[13px] px-[14px] text-[12.5px] text-admin-muted border-b border-admin-border hidden md:table-cell">
                        {m.status === "Pending" ? <span className="text-admin-vip-text">⏳ Invitation sent</span> : m.lastActive}
                      </td>
                      <td className="py-[13px] px-[14px] border-b border-admin-border text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {m.status === "Pending" && (
                            <button
                              onClick={() => handleResendInvite(m.id)}
                              className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                            >
                              Resend
                            </button>
                          )}
                          <button
                            onClick={() => alert(`Edit ${m.name}`)}
                            className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                          >
                            Edit
                          </button>
                          {m.role !== "Owner" && (
                            <button
                              onClick={() => handleRemoveTeam(m.id)}
                              className="text-[12px] px-2 py-1 rounded-md text-admin-non-text hover:bg-admin-non-bg"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showAddTeam && (
              <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowAddTeam(false)}>
                <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-[16px] font-semibold text-admin-text mb-3">Add team member</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[12px] text-admin-muted mb-1">Name</div>
                      <input
                        type="text"
                        value={newMember.name}
                        onChange={(e) => setNewMember((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Maria Lopez"
                        className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                      />
                    </div>
                    <div>
                      <div className="text-[12px] text-admin-muted mb-1">Email</div>
                      <input
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember((p) => ({ ...p, email: e.target.value }))}
                        placeholder="maria@italiankitchen.com"
                        className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[12px] text-admin-muted mb-1">Role</div>
                        <select
                          value={newMember.role}
                          onChange={(e) => setNewMember((p) => ({ ...p, role: e.target.value as TeamMember["role"] }))}
                          className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none"
                        >
                          <option>Owner</option>
                          <option>Manager</option>
                          <option>Staff</option>
                        </select>
                      </div>
                      <div>
                        <div className="text-[12px] text-admin-muted mb-1">Permissions</div>
                        <select
                          value={newMember.permissions}
                          onChange={(e) => setNewMember((p) => ({ ...p, permissions: e.target.value as TeamMember["permissions"] }))}
                          className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none"
                        >
                          <option>View only</option>
                          <option>Can respond</option>
                          <option>Can edit menu</option>
                          <option>Full access</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-[12px] text-admin-muted">An invitation email will be sent. They&apos;ll need to accept to get access.</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowAddTeam(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                    <button
                      onClick={handleAddTeam}
                      disabled={!newMember.name.trim() || !newMember.email.trim()}
                      className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                    >
                      Send invitation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "billing" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h2 className="text-[16px] font-semibold text-admin-text">Current plan</h2>
                  <p className="text-[12.5px] text-admin-muted mt-1">You&apos;re on the Premium plan ($49/month)</p>
                </div>
                <button className="text-[12.5px] text-admin-new-text hover:underline">Manage plan</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-admin-border">
                <div>
                  <div className="text-[12px] text-admin-muted">Next billing</div>
                  <div className="text-[14px] text-admin-text font-medium">Feb 1, 2024</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Amount</div>
                  <div className="text-[14px] text-admin-text font-medium">$49.00</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Payment method</div>
                  <div className="text-[14px] text-admin-text font-medium">Visa ••4567</div>
                </div>
                <div>
                  <div className="text-[12px] text-admin-muted">Status</div>
                  <div className="text-[14px] text-admin-active-text font-medium">✓ Active</div>
                </div>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Payment method</h2>
              <div className="border border-admin-border rounded-md p-4 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded bg-admin-dark text-white flex items-center justify-center text-[11px] font-bold">VISA</div>
                  <div>
                    <div className="text-[14px] text-admin-text font-medium">{card.number}</div>
                    <div className="text-[12px] text-admin-muted">Expires {card.expiry} · {card.name}</div>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">Default</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  + Add payment method
                </button>
                <button
                  onClick={() => alert("Card updated")}
                  className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  Update card
                </button>
                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`text-[12.5px] px-3 py-1.5 rounded-md ${paymentMethod === "bank" ? "bg-admin-dark text-white" : "border border-admin-border text-admin-text hover:bg-admin-hover"}`}
                >
                  Switch to bank transfer
                </button>
              </div>
              {showAddPayment && (
                <div className="mt-3 pt-3 border-t border-admin-border grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <div className="text-[12px] text-admin-muted mb-1">Card number</div>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Expiry</div>
                    <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">CVC</div>
                    <input type="text" placeholder="123" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button onClick={() => setShowAddPayment(false)} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                    <button onClick={() => { setShowAddPayment(false); alert("Card added"); }} className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90">Save card</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Billing history</h2>
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                    <div className="text-[20px]">🧾</div>
                    <div className="flex-1">
                      <div className="text-[13.5px] text-admin-text font-medium">{inv.description}</div>
                      <div className="text-[12px] text-admin-muted">{inv.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] text-admin-text font-medium">{inv.amount}</div>
                      <div className="text-[11px] text-admin-active-text">✓ {inv.status}</div>
                    </div>
                    <button
                      onClick={() => alert(`Downloaded ${inv.id}.pdf (mock)`)}
                      className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      ⬇
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Email notifications</h2>
              <div className="space-y-3">
                {[
                  { key: "newReviews" as const, label: "Email for new reviews", desc: "Get notified when customers leave a review" },
                  { key: "bookingRequests" as const, label: "Email for booking requests", desc: "Get notified when a customer requests a booking" },
                  { key: "weeklySummary" as const, label: "Weekly performance summary", desc: "Receive a weekly digest of your metrics" },
                  { key: "marketingTips" as const, label: "Marketing tips", desc: "Get tips on how to promote your restaurant" },
                  { key: "profileViewed" as const, label: "Email when profile is viewed", desc: "Get notified when someone views your profile" },
                ].map((n) => (
                  <label key={n.key} className="flex items-start gap-3 p-3 rounded-md border border-admin-border cursor-pointer hover:bg-admin-hover">
                    <input
                      type="checkbox"
                      checked={notifs[n.key]}
                      onChange={() => setNotifs((p) => ({ ...p, [n.key]: !p[n.key] }))}
                      className="w-4 h-4 mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-admin-text">{n.label}</div>
                      <div className="text-[12.5px] text-admin-muted">{n.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              {showSavedNotif && <span className="text-[12.5px] text-admin-active-text">✓ Preferences saved</span>}
              <button
                onClick={handleSaveNotifs}
                className="text-[14px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-1">Need help?</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Contact our support team — we typically respond within 24 hours.</p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowSupport(true)}
              className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
            >
              ✉ Contact support
            </button>
            <a href="mailto:support@dietaryid.com" className="text-[13px] text-admin-new-text no-underline hover:underline">support@dietaryid.com</a>
            <span className="text-[12.5px] text-admin-muted">· +44 (0)161 123 4567</span>
          </div>
        </div>
      </div>

      {showSupport && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => !supportSubmitted && setShowSupport(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            {supportSubmitted ? (
              <div className="text-center py-4">
                <div className="text-[48px] mb-2">✓</div>
                <h3 className="text-[16px] font-semibold text-admin-text mb-2">Support request sent</h3>
                <p className="text-[13px] text-admin-muted">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-[16px] font-semibold text-admin-text mb-3">Contact support</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Issue type</div>
                    <select className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                      <option>Technical</option>
                      <option>Account</option>
                      <option>Menu</option>
                      <option>Reviews</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Priority</div>
                    <div className="flex items-center gap-2">
                      {["Low", "Medium", "High"].map((p) => (
                        <label key={p} className="flex items-center gap-1.5 text-[13px] text-admin-text">
                          <input type="radio" name="priority" defaultChecked={p === "Medium"} className="w-4 h-4" />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Description</div>
                    <textarea rows={4} placeholder="Describe your issue..." className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowSupport(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                  <button onClick={handleSupportSubmit} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Submit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
