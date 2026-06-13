"use client";

import { useState } from "react";
import { useTickets, useFAQs, addFAQ, updateFAQ, deleteFAQ, addReply, resolveTicket, FAQItem } from "@/lib/support";

const emailTemplates = [
  { id: "et1", subject: "Verification complete", body: `Hi {restaurant_name},\n\nGreat news! Your menu verification is complete. {verified_count} of {total_count} items are now verified safe.\n\nWhat this means:\n✓ Your menu is verified for allergen info\n✓ Customers with allergies can find you\n✓ You're eligible for the DietaryID Verified badge\n\nNext steps:\n1. Add your badge to your website\n2. Respond to any pending reviews\n3. Encourage happy customers to review\n\nBest,\nDietaryID Support` },
  { id: "et2", subject: "Response to support ticket", body: `Hi {restaurant_name},\n\nThank you for reaching out about "{ticket_subject}".\n\n{reply_body}\n\nIf you have any other questions, reply to this email or use the Help section in your dashboard.\n\nBest,\nDietaryID Support` },
  { id: "et3", subject: "Welcome to DietaryID for Restaurants!", body: `Hi {restaurant_name},\n\nWelcome to DietaryID! We're excited to have you on board.\n\nGetting started in 3 steps:\n1. Verify your menu — mark which items are safe for each allergy (15 min)\n2. Respond to reviews — build trust with your customers\n3. Share your badge — show you're verified on your website\n\nNeed help? Reply to this email or visit your dashboard.\n\nBest,\nDietaryID Support` },
  { id: "et4", subject: "New review received", body: `Hi {restaurant_name},\n\nA new review was posted about your restaurant on DietaryID.\n\nRating: {review_rating}★\nReviewer: {reviewer_name} ({reviewer_restriction})\nSummary: "{review_text}"\n\nWe recommend responding within 24-48 hours. Log in to your dashboard to reply.\n\nBest,\nDietaryID Support` },
];

export default function AdminHelpPage() {
  const tickets = useTickets();
  const faqs = useFAQs();
  const [tab, setTab] = useState<"faqs" | "tickets" | "templates">("tickets");
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showNewFAQ, setShowNewFAQ] = useState(false);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", category: "Getting Started", order: faqs.length + 1 });
  const [editingFAQ, setEditingFAQ] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState<{ template: string; restaurant: string; email: string } | null>(null);
  const [emailBody, setEmailBody] = useState("");

  const openTickets = tickets.filter((t) => t.status !== "resolved");
  const resolvedTickets = tickets.filter((t) => t.status === "resolved");

  const handleReply = (id: string) => {
    if (!replyText.trim()) return;
    addReply(id, "admin_001", replyText);
    setReplyText("");
  };

  const handleResolve = (id: string) => {
    resolveTicket(id);
    setActiveTicket(null);
  };

  const handleAddFAQ = () => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
    addFAQ(faqForm);
    setShowNewFAQ(false);
    setFaqForm({ question: "", answer: "", category: "Getting Started", order: faqs.length + 2 });
  };

  const handleSaveFAQ = (id: string) => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
    updateFAQ(id, faqForm);
    setEditingFAQ(null);
  };

  const handleDeleteFAQ = (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    deleteFAQ(id);
  };

  const handleEditFAQ = (f: FAQItem) => {
    setEditingFAQ(f.id);
    setFaqForm({ question: f.question, answer: f.answer, category: f.category, order: f.order });
  };

  const handleSendEmail = () => {
    if (!showEmail || !emailBody.trim()) return;
    alert(`Email sent to ${showEmail.restaurant} (${showEmail.email})\n\nSubject: ${showEmail.template}\n\nMessage sent (mock).`);
    setShowEmail(null);
    setEmailBody("");
  };

  const active = tickets.find((t) => t.id === activeTicket);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Help & Support 🛟</h1>
            <p className="text-[13.5px] text-admin-muted">Manage FAQs, respond to support tickets, and send emails to restaurant owners.</p>
          </div>
          <div className="flex items-center gap-3 text-[12.5px]">
            <span className="text-admin-vip-text">{openTickets.length} open tickets</span>
            <span className="text-admin-muted">{faqs.length} FAQs</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {([
          { v: "tickets", l: "Support tickets", badge: openTickets.length },
          { v: "faqs", l: "FAQs & guides", badge: undefined },
          { v: "templates", l: "Email templates", badge: undefined },
        ] as const).map((t) => (
          <button
            key={t.v}
            onClick={() => setTab(t.v)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
              tab === t.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {t.l}
            {t.badge ? <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-admin-non-text text-white">{t.badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[1200px]">
        {tab === "tickets" && (
          <div className="flex gap-0 h-[calc(100vh-260px)] min-h-[500px]">
            <div className="w-[360px] flex-shrink-0 border border-admin-border rounded-[10px] overflow-hidden bg-admin-bg">
              <div className="p-3 border-b border-admin-border">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-admin-text">Inbox</span>
                </div>
              </div>
              <div className="overflow-y-auto h-full">
                {tickets.length === 0 ? (
                  <p className="text-[13px] text-admin-muted text-center py-8 px-4">No support tickets</p>
                ) : (
                  tickets.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setActiveTicket(t.id); setReplyText(""); }}
                      className={`w-full text-left p-3 border-b border-admin-border hover:bg-admin-hover ${
                        activeTicket === t.id ? "bg-admin-hover" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`w-2 h-2 rounded-full ${
                          t.status === "open" ? "bg-admin-new-text" : t.status === "in_progress" ? "bg-admin-vip-text" : "bg-admin-non-text"
                        }`} />
                        <span className="text-[13.5px] font-semibold text-admin-text truncate flex-1">{t.restaurantName}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          t.priority === "High" ? "bg-admin-non-bg text-admin-non-text" :
                          t.priority === "Medium" ? "bg-admin-vip-bg text-admin-vip-text" :
                          "bg-admin-new-bg text-admin-new-text"
                        }`}>{t.priority}</span>
                      </div>
                      <div className="text-[12.5px] text-admin-text truncate">{t.subject}</div>
                      <div className="text-[11px] text-admin-muted mt-0.5">{t.createdAt.slice(0, 10)} · {t.type}</div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="flex-1 ml-3 overflow-y-auto">
              {active ? (
                <div>
                  <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h2 className="text-[18px] font-semibold text-admin-text">{active.subject}</h2>
                        <p className="text-[12.5px] text-admin-muted mt-0.5">
                          From <strong>{active.restaurantName}</strong> ({active.restaurantEmail}) · {active.createdAt.slice(0, 10)} · {active.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                          active.status === "open" ? "bg-admin-new-bg text-admin-new-text" :
                          active.status === "in_progress" ? "bg-admin-vip-bg text-admin-vip-text" :
                          "bg-admin-non-bg text-admin-non-text"
                        }`}>
                          {active.status === "open" ? "Open" : active.status === "in_progress" ? "In progress" : "Resolved"}
                        </span>
                        {active.status !== "resolved" && (
                          <button onClick={() => handleResolve(active.id)} className="text-[12px] px-2.5 py-1 rounded-md bg-admin-dark text-white hover:opacity-90">✓ Resolve</button>
                        )}
                      </div>
                    </div>
                    <div className="p-3 rounded-md bg-admin-hover text-[13.5px] text-admin-nav-text mb-3">
                      {active.description}
                    </div>
                  </div>

                  {active.replies.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {active.replies.map((r, i) => (
                        <div key={i} className={`p-3 rounded-md ${r.from === "admin_001" ? "bg-admin-active-bg border border-admin-active-text/30 ml-4" : "bg-admin-bg border border-admin-border mr-4"}`}>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[12px] font-semibold text-admin-text">{r.from === "admin_001" ? "You (Admin)" : r.from}</span>
                            <span className="text-[11px] text-admin-muted">{r.time}</span>
                          </div>
                          <p className="text-[13px] text-admin-text">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {active.status !== "resolved" && (
                    <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
                      <h3 className="text-[14px] font-semibold text-admin-text mb-2">Reply</h3>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                        placeholder="Type your reply..."
                        className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none resize-none"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => { setShowEmail({ template: "Response to support ticket", restaurant: active.restaurantName, email: active.restaurantEmail }); setEmailBody(`Hi ${active.restaurantName},\n\nThank you for reaching out about "${active.subject}".\n\n${replyText}\n\nIf you have any other questions, reply to this email.\n\nBest,\nDietaryID Support`); }}
                          className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                        >
                          ✉ Reply via email
                        </button>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setReplyText("")} className="text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Clear</button>
                          <button onClick={() => handleReply(active.id)} disabled={!replyText.trim()} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">Send reply</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-admin-muted">
                  <div className="text-center">
                    <div className="text-[48px] mb-2">📨</div>
                    <p className="text-[14px]">Select a ticket to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "faqs" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text">{faqs.length} FAQs in library</h2>
              <button onClick={() => setShowNewFAQ(true)} className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90">+ Add FAQ</button>
            </div>

            {showNewFAQ && (
              <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4 mb-3">
                <h3 className="text-[14px] font-semibold text-admin-text mb-3">New FAQ</h3>
                <FAQForm form={faqForm} setForm={setFaqForm} />
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowNewFAQ(false)} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                  <button onClick={handleAddFAQ} disabled={!faqForm.question.trim() || !faqForm.answer.trim()} className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">Add FAQ</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {faqs.map((f) => (
                <div key={f.id} className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
                  {editingFAQ === f.id ? (
                    <div className="p-4">
                      <FAQForm form={faqForm} setForm={setFaqForm} />
                      <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setEditingFAQ(null)} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                        <button onClick={() => handleSaveFAQ(f.id)} disabled={!faqForm.question.trim()} className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">Save</button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-admin-hover text-admin-muted">{f.category}</span>
                          <span className="text-[14px] font-semibold text-admin-text">{f.question}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => handleEditFAQ(f)} className="text-[11.5px] px-2 py-0.5 rounded border border-admin-border text-admin-text hover:bg-admin-bg">Edit</button>
                          <button onClick={() => handleDeleteFAQ(f.id)} className="text-[11.5px] px-2 py-0.5 rounded text-admin-non-text hover:bg-admin-non-bg">Delete</button>
                        </div>
                      </div>
                      <p className="text-[13px] text-admin-nav-text mt-2">{f.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "templates" && (
          <div>
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Email templates</h2>
            <p className="text-[12.5px] text-admin-muted mb-4">Use these to quickly email restaurant owners. Variables like {`{restaurant_name}`} auto-fill.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emailTemplates.map((t) => (
                <div key={t.id} className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
                  <div className="text-[14px] font-semibold text-admin-text mb-2">{t.subject}</div>
                  <pre className="text-[12px] text-admin-nav-text whitespace-pre-wrap font-sans mb-3 max-h-[200px] overflow-y-auto bg-admin-hover rounded p-2">{t.body}</pre>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setShowEmail({ template: t.subject, restaurant: "", email: "" }); setEmailBody(t.body); }}
                      className="text-[12px] px-2.5 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
                    >
                      Use template
                    </button>
                    <button
                      onClick={() => navigator.clipboard?.writeText(t.body)}
                      className="text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showEmail && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6" onClick={() => setShowEmail(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[560px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Send email</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">Template: {showEmail.template}</p>
            <div className="space-y-3 mb-4">
              <div>
                <div className="text-[12px] text-admin-muted mb-1">To (restaurant owner email)</div>
                <input
                  type="email"
                  value={showEmail.email}
                  onChange={(e) => setShowEmail((s) => s ? { ...s, email: e.target.value } : null)}
                  placeholder="owner@restaurant.com"
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-admin-muted">Message</span>
                  <span className="text-[11px] text-admin-muted">Variables: {"{restaurant_name} {ticket_subject} {reply_body}"}</span>
                </div>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none resize-none font-sans"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEmail(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleSendEmail}
                disabled={!showEmail.email || !emailBody.trim()}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
              >
                ✉ Send email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FAQForm({ form, setForm }: { form: any; setForm: (f: any) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-[12px] text-admin-muted mb-1">Question</div>
        <input type="text" value={form.question} onChange={(e) => setForm({...form, question: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
      </div>
      <div>
        <div className="text-[12px] text-admin-muted mb-1">Answer</div>
        <textarea value={form.answer} onChange={(e) => setForm({...form, answer: e.target.value})} rows={3} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[12px] text-admin-muted mb-1">Category</div>
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none">
            <option>Getting Started</option>
            <option>Verification</option>
            <option>Reviews</option>
            <option>Account</option>
            <option>Pricing</option>
          </select>
        </div>
        <div>
          <div className="text-[12px] text-admin-muted mb-1">Order</div>
          <input type="number" value={form.order} onChange={(e) => setForm({...form, order: parseInt(e.target.value) || 1})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
        </div>
      </div>
    </div>
  );
}
