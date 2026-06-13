"use client";

import { useState } from "react";
import { addTicket } from "@/lib/support";

const faqs = [
  { q: "How do I claim my restaurant?", a: "Search for your restaurant on DietaryID. Click \"Claim this restaurant\" and verify ownership via email." },
  { q: "What does \"Verified\" mean?", a: "Your menu items have been reviewed and confirmed safe. We cross-check ingredients against allergen databases." },
  { q: "How long does verification take?", a: "Initial verification takes 30 minutes to set up. We can complete the full verification for you." },
  { q: "Can I respond to reviews?", a: "Yes! Respond to any review from your dashboard. We recommend responding within 24-48 hours." },
  { q: "How many customers will I reach?", a: "This depends on your location and offering. Restaurants typically reach 200-500 relevant customers monthly." },
  { q: "Is this free?", a: "Yes, basic features are free. Premium analytics and tools are available for $49/month." },
  { q: "Can I add multiple team members?", a: "Yes! Go to Settings → Team Management to invite staff with different permission levels." },
  { q: "How do I update my menu?", a: "Go to Menu Management. You can add items, edit allergen info, and batch verify." },
];

const videoTutorials = [
  { title: "How to claim your restaurant", duration: "2:14", icon: "🎥" },
  { title: "How to verify your menu", duration: "5:32", icon: "🎥" },
  { title: "How to respond to reviews", duration: "3:08", icon: "🎥" },
  { title: "How to use marketing tools", duration: "4:21", icon: "🎥" },
];

const writtenGuides = [
  { title: "Getting Started as a Restaurant", desc: "Step-by-step onboarding guide" },
  { title: "Allergen Verification Best Practices", desc: "How to verify items properly" },
  { title: "How to Train Staff on Allergies", desc: "Module overview and certification" },
  { title: "Marketing Your Allergy-Friendly Practices", desc: "Promotion tips and templates" },
];

export default function RestaurantHelpPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(0);
  const [showContact, setShowContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: "Technical", priority: "Medium", description: "", email: true, phone: "", subject: "",
  });

  const filteredFaqs = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = () => {
    if (!form.description.trim() || !form.subject.trim()) return;
    addTicket({
      restaurantName: "The Italian Kitchen",
      restaurantEmail: "owner@italiankitchen.com",
      subject: form.subject,
      type: form.type,
      priority: form.priority as "Low" | "Medium" | "High",
      contactMethod: form.email ? "Email" : "Phone",
      description: form.description,
    });
    setSubmitted(true);
    setTimeout(() => {
      setShowContact(false);
      setSubmitted(false);
      setForm({ type: "Technical", priority: "Medium", description: "", email: true, phone: "", subject: "" });
    }, 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Help & Support ❓</h1>
        <p className="text-[14px] text-admin-muted">Find answers, watch tutorials, or contact our support team.</p>
      </div>

      <div className="px-[26px] py-6 max-w-[1000px]">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQ..."
              className="w-full pl-10 pr-3 py-3 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {[
            { title: "Documentation", icon: "📚", desc: "Detailed guides and how-tos" },
            { title: "Video Tutorials", icon: "🎥", desc: "Watch step-by-step videos" },
            { title: "Contact Support", icon: "✉", desc: "Get help from our team" },
          ].map((c) => (
            <button
              key={c.title}
              onClick={() => c.title === "Contact Support" && setShowContact(true)}
              className="bg-admin-bg border border-admin-border rounded-[10px] p-4 text-left hover:border-admin-dark transition-colors"
            >
              <div className="text-[28px] mb-2">{c.icon}</div>
              <div className="text-[15px] font-semibold text-admin-text mb-1">{c.title}</div>
              <p className="text-[12.5px] text-admin-muted">{c.desc}</p>
            </button>
          ))}
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Frequently asked questions</h2>
          {filteredFaqs.length === 0 ? (
            <p className="text-[13px] text-admin-muted text-center py-4">No results for &quot;{search}&quot;.</p>
          ) : (
            <div className="divide-y divide-admin-border">
              {filteredFaqs.map((f, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full flex items-center gap-3 py-3 text-left hover:bg-admin-hover px-2 -mx-2 rounded-md"
                  >
                    <span className="text-[15px] font-medium text-admin-text flex-1">{f.q}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-admin-muted transition-transform ${expanded === i ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {expanded === i && (
                    <p className="text-[13.5px] text-admin-nav-text pb-3 px-2 -mx-2">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="text-[12.5px] text-admin-muted mt-3">
            <button className="text-admin-new-text hover:underline">View all FAQs →</button>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">📚 Written guides</h2>
            <div className="space-y-2">
              {writtenGuides.map((g) => (
                <a
                  key={g.title}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`Opening guide: ${g.title} (mock)`); }}
                  className="block p-3 rounded-md border border-admin-border hover:bg-admin-hover no-underline"
                >
                  <div className="text-[13.5px] font-medium text-admin-text">{g.title}</div>
                  <div className="text-[12px] text-admin-muted">{g.desc}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">🎥 Video tutorials</h2>
            <div className="space-y-2">
              {videoTutorials.map((v) => (
                <button
                  key={v.title}
                  onClick={() => alert(`Playing video: ${v.title} (mock)`)}
                  className="w-full flex items-center gap-3 p-3 rounded-md border border-admin-border hover:bg-admin-hover text-left"
                >
                  <div className="w-12 h-9 rounded bg-admin-dark text-white flex items-center justify-center text-[14px]">▶</div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-medium text-admin-text">{v.title}</div>
                    <div className="text-[12px] text-admin-muted">{v.duration}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-2">Get in touch</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">We respond within 24 hours. For urgent safety issues, call us directly.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <div className="text-[12px] text-admin-muted">Email</div>
              <div className="text-[14px] text-admin-text font-medium">support@dietaryid.com</div>
            </div>
            <div>
              <div className="text-[12px] text-admin-muted">Phone</div>
              <div className="text-[14px] text-admin-text font-medium">+44 (0)161 123 4567</div>
            </div>
            <div>
              <div className="text-[12px] text-admin-muted">Live chat hours</div>
              <div className="text-[14px] text-admin-text font-medium">9am - 5pm GMT</div>
            </div>
          </div>
          <button
            onClick={() => setShowContact(true)}
            className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
          >
            ✉ Send a support request
          </button>
        </div>
      </div>

      {showContact && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => !submitted && setShowContact(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-[48px] mb-2">✓</div>
                <h3 className="text-[16px] font-semibold text-admin-text mb-2">Request submitted</h3>
                <p className="text-[13px] text-admin-muted">We&apos;ll respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-[17px] font-semibold text-admin-text mb-3">Contact support</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Subject</div>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="Brief summary of your issue"
                      className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[12px] text-admin-muted mb-1">Issue type</div>
                      <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                        <option>Technical</option>
                        <option>Account</option>
                        <option>Menu</option>
                        <option>Reviews</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <div className="text-[12px] text-admin-muted mb-1">Priority</div>
                      <select value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Description</div>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      rows={4}
                      placeholder="Describe your issue in detail..."
                      className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
                    />
                  </div>
                  <div>
                    <div className="text-[12px] text-admin-muted mb-1">Preferred contact method</div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-[13px]">
                        <input type="radio" checked={form.email} onChange={() => setForm((f) => ({ ...f, email: true }))} className="w-4 h-4" />
                        Email
                      </label>
                      <label className="flex items-center gap-1.5 text-[13px]">
                        <input type="radio" checked={!form.email} onChange={() => setForm((f) => ({ ...f, email: false }))} className="w-4 h-4" />
                        Phone
                      </label>
                    </div>
                  </div>
                  {!form.email && (
                    <div>
                      <div className="text-[12px] text-admin-muted mb-1">Phone number</div>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+44 ..."
                        className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowContact(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.description.trim() || !form.subject.trim()}
                    className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                  >
                    Submit request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
