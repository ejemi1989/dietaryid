"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "info" | "menu" | "verification" | "training";

const allergenOptions = ["Celiac/Gluten-free", "Nut allergies", "Shellfish allergies", "Dairy allergies", "Soy allergies", "Egg allergies", "Sesame allergies", "Fish allergies"];

const trainingModules = [
  { id: "t1", title: "Allergen Basics", duration: 15, desc: "Food allergies vs. intolerances, why they&apos;re serious, legal basics", completed: true, score: 92 },
  { id: "t2", title: "Menu & Ingredient Knowledge", duration: 20, desc: "How to read labels, hidden allergens, cross-contamination, your menu", completed: true, score: 88 },
  { id: "t3", title: "Customer Communication", duration: 15, desc: "How to ask about allergies, what to say/not say, de-escalation", completed: true, score: 95 },
  { id: "t4", title: "Procedures & Safety", duration: 20, desc: "Your restaurant&apos;s procedures, dedicated prep, utensil handling, incident reporting", completed: false, score: null },
  { id: "t5", title: "DietaryID & Your Profile", duration: 10, desc: "Why we&apos;re on DietaryID, what reviews mean, how to encourage reviews", completed: false, score: null },
];

const trainingTeam = [
  { name: "Marco Rossi", role: "Owner", completed: 5, total: 5, status: "Certified", date: "Jan 15, 2024" },
  { name: "Sofia Bianchi", role: "Manager", completed: 5, total: 5, status: "Certified", date: "Jan 18, 2024" },
  { name: "James Park", role: "Manager", completed: 3, total: 5, status: "In Progress", date: null },
  { name: "Aisha Khan", role: "Staff", completed: 1, total: 5, status: "In Progress", date: null },
  { name: "Liam Chen", role: "Staff", completed: 0, total: 5, status: "Not Started", date: null },
];

const hours = [
  { day: "Monday", open: "11:00", close: "22:00", closed: false },
  { day: "Tuesday", open: "11:00", close: "22:00", closed: false },
  { day: "Wednesday", open: "11:00", close: "22:00", closed: false },
  { day: "Thursday", open: "11:00", close: "23:00", closed: false },
  { day: "Friday", open: "11:00", close: "23:30", closed: false },
  { day: "Saturday", open: "10:00", close: "23:30", closed: false },
  { day: "Sunday", open: "10:00", close: "21:00", closed: false },
];

export default function RestaurantProfilePage() {
  const [tab, setTab] = useState<Tab>("info");
  const [saved, setSaved] = useState(false);
  const [allergens, setAllergens] = useState<string[]>(["Celiac/Gluten-free", "Nut allergies", "Dairy allergies"]);
  const [trainingLevel, setTrainingLevel] = useState("comprehensive");
  const [procedures, setProcedures] = useState("We use dedicated prep areas and utensils for allergen orders. All staff complete quarterly allergen training. Kitchen follows a strict color-coded system for cutting boards and tools.");
  const [assignedModule, setAssignedModule] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [startModule, setStartModule] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleAllergen = (a: string) => {
    setAllergens((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const handleStartModule = (id: string) => {
    setStartModule(id);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleCompleteModule = () => {
    setStartModule(null);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Profile Management 👤</h1>
        <p className="text-[14px] text-admin-muted">Manage your restaurant information, menu, verification, and staff training.</p>
      </div>

      <div className="px-[26px] border-b border-admin-border">
        <div className="flex items-center gap-1">
          {([
            { v: "info", l: "Basic Info" },
            { v: "menu", l: "Menu" },
            { v: "verification", l: "Allergen Verification" },
            { v: "training", l: "Staff Training" },
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
        {tab === "info" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Basic information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Restaurant name</div>
                  <input type="text" defaultValue="The Italian Kitchen" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Restaurant type</div>
                  <select defaultValue="Fast Casual" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none">
                    <option>Fast Casual</option>
                    <option>Fine Dining</option>
                    <option>Cafe</option>
                    <option>Pub</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Cuisine types</div>
                  <input type="text" defaultValue="Italian, Mediterranean" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Phone</div>
                  <input type="tel" defaultValue="+44 161 123 4567" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div className="md:col-span-2">
                  <div className="text-[12.5px] text-admin-muted mb-1">Address</div>
                  <input type="text" defaultValue="42 King Street, Manchester, M2 6BA, UK" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">Website</div>
                  <input type="url" defaultValue="https://theitaliankitchen.co.uk" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div>
                  <div className="text-[12.5px] text-admin-muted mb-1">City/Region</div>
                  <input type="text" defaultValue="Manchester, UK" className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark" />
                </div>
                <div className="md:col-span-2">
                  <div className="text-[12.5px] text-admin-muted mb-1">Description</div>
                  <textarea defaultValue="Family-run Italian restaurant in the heart of Manchester. Dedicated gluten-free prep area, trained staff, and a menu designed with allergies in mind." rows={3} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Opening hours</h2>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center gap-3">
                    <div className="w-24 text-[13px] text-admin-text">{h.day}</div>
                    <input
                      type="time"
                      defaultValue={h.open}
                      disabled={h.closed}
                      className="px-2 py-1 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none disabled:opacity-50"
                    />
                    <span className="text-[12.5px] text-admin-muted">to</span>
                    <input
                      type="time"
                      defaultValue={h.close}
                      disabled={h.closed}
                      className="px-2 py-1 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none disabled:opacity-50"
                    />
                    <label className="flex items-center gap-1.5 text-[12.5px] text-admin-muted ml-auto">
                      <input type="checkbox" defaultChecked={!h.closed} className="w-4 h-4" />
                      Open
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Allergen management</h2>
              <div className="mb-3">
                <div className="text-[12.5px] text-admin-muted mb-2">Which allergies do you take seriously?</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {allergenOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAllergen(a)}
                      className={`text-[12.5px] px-2.5 py-1 rounded-md border transition-colors ${
                        allergens.includes(a) ? "border-admin-dark bg-admin-active-bg text-admin-active-text" : "border-admin-border text-admin-nav-text hover:bg-admin-hover"
                      }`}
                    >
                      {allergens.includes(a) ? "✓ " : ""}{a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-[12.5px] text-admin-muted mb-1">Tell us about your allergen procedures</div>
                <textarea
                  value={procedures}
                  onChange={(e) => setProcedures(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark resize-none"
                />
              </div>
              <div>
                <div className="text-[12.5px] text-admin-muted mb-2">Do you have staff training?</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { v: "comprehensive", l: "Yes, comprehensive" },
                    { v: "basic", l: "Yes, basic" },
                    { v: "in_progress", l: "In progress" },
                    { v: "not_yet", l: "Not yet" },
                  ].map((t) => (
                    <label
                      key={t.v}
                      className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                        trainingLevel === t.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={trainingLevel === t.v}
                        onChange={() => setTrainingLevel(t.v)}
                        className="w-4 h-4"
                      />
                      <span className="text-[12.5px] text-admin-text">{t.l}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              {saved && <span className="text-[12.5px] text-admin-active-text">✓ Profile updated</span>}
              <button
                onClick={handleSave}
                className="text-[14px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {tab === "menu" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-[16px] font-semibold text-admin-text">Menu management</h2>
                  <p className="text-[12.5px] text-admin-muted">Manage and verify your menu items for allergen safety.</p>
                </div>
                <Link
                  href="/restaurant/menu"
                  className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white no-underline hover:opacity-90"
                >
                  Open full menu manager →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-admin-hover rounded-md p-3">
                  <div className="text-[12px] text-admin-muted">Total items</div>
                  <div className="text-[20px] font-semibold text-admin-text">20</div>
                </div>
                <div className="bg-admin-hover rounded-md p-3">
                  <div className="text-[12px] text-admin-muted">Verified</div>
                  <div className="text-[20px] font-semibold text-admin-active-text">8 (40%)</div>
                </div>
                <div className="bg-admin-hover rounded-md p-3">
                  <div className="text-[12px] text-admin-muted">Pending</div>
                  <div className="text-[20px] font-semibold text-admin-vip-text">2</div>
                </div>
              </div>
              <div className="w-full h-2 bg-admin-border rounded-full mb-2">
                <div className="h-full bg-admin-active-text rounded-full" style={{ width: "40%" }} />
              </div>
              <p className="text-[12.5px] text-admin-muted">40% verified · ~15 min to complete the rest</p>
            </div>
            <p className="text-[13px] text-admin-text">Use the full menu manager to add items, set allergen info, and batch verify.</p>
          </div>
        )}

        {tab === "verification" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Verification progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-admin-hover rounded-md p-3">
                  <div className="text-[12px] text-admin-muted">Verified items</div>
                  <div className="text-[20px] font-semibold text-admin-active-text">8 of 20 (40%)</div>
                </div>
                <div className="bg-admin-hover rounded-md p-3">
                  <div className="text-[12px] text-admin-muted">Pending review</div>
                  <div className="text-[20px] font-semibold text-admin-vip-text">2</div>
                </div>
                <div className="bg-admin-hover rounded-md p-3">
                  <div className="text-[12px] text-admin-muted">Ready to verify</div>
                  <div className="text-[20px] font-semibold text-admin-text">10</div>
                </div>
              </div>
              <p className="text-[12.5px] text-admin-muted">Next step: <strong className="text-admin-text">Verify &quot;Pasta Primavera&quot;</strong> · ~5 minutes</p>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Items ready to verify</h2>
              <div className="space-y-3">
                {[
                  { name: "Pasta Primavera", cat: "Mains", ingredients: ["Pasta (potential allergen: Gluten)", "Tomato sauce", "Basil", "Garlic", "Olive oil", "Parmesan cheese (potential allergen: Dairy)"], gf: "✗ Contains (pasta)", nf: "✓ Yes", df: "✗ Contains (cheese)" },
                  { name: "Risotto ai Funghi", cat: "Mains", ingredients: ["Arborio rice", "Mushrooms", "Vegetable stock", "Parmesan (potential allergen: Dairy)", "White wine"], gf: "✓ Yes", nf: "✓ Yes", df: "✗ Contains (parmesan)" },
                ].map((item) => (
                  <div key={item.name} className="border border-admin-border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <div className="text-[14px] font-semibold text-admin-text">{item.name}</div>
                        <div className="text-[11.5px] text-admin-muted">{item.cat} · Status: Ready to verify</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Skip for now</button>
                        <button
                          onClick={() => alert(`Verified ${item.name}`)}
                          className="text-[12px] px-2.5 py-1 rounded-md bg-admin-active-text text-white hover:opacity-90"
                        >
                          ✓ Verify this item
                        </button>
                      </div>
                    </div>
                    <div className="text-[12px] text-admin-muted mb-1">Ingredients:</div>
                    <ul className="text-[12px] text-admin-nav-text space-y-0.5 mb-2">
                      {item.ingredients.map((ing) => (
                        <li key={ing}>• {ing}</li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-3 gap-2 text-[12px]">
                      <div><span className="text-admin-muted">GF:</span> <span className="text-admin-text">{item.gf}</span></div>
                      <div><span className="text-admin-muted">NF:</span> <span className="text-admin-text">{item.nf}</span></div>
                      <div><span className="text-admin-muted">DF:</span> <span className="text-admin-text">{item.df}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Batch verification</h2>
              <p className="text-[12.5px] text-admin-muted mb-3">Select multiple items to verify at once.</p>
              <div className="space-y-2 mb-3">
                {["Quinoa Power Bowl", "Grilled Salmon", "Bruschetta", "Tiramisu"].map((n) => (
                  <label key={n} className="flex items-center gap-2 p-2 rounded-md hover:bg-admin-hover cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-[13.5px] text-admin-text">{n}</span>
                    <span className="text-[11.5px] text-admin-muted ml-auto">Ready to verify</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => alert("Selected items verified (mock)")}
                className="text-[13px] px-3 py-1.5 rounded-md bg-admin-active-text text-white hover:opacity-90"
              >
                ✓ Verify selected (0)
              </button>
            </div>
          </div>
        )}

        {tab === "training" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Training modules</h2>
              <p className="text-[12.5px] text-admin-muted mb-3">Complete all modules to earn DietaryID Certified status.</p>
              <div className="space-y-2">
                {trainingModules.map((m) => (
                  <div key={m.id} className="border border-admin-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === m.id ? null : m.id)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-admin-hover"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${
                        m.completed ? "bg-admin-active-text text-white" : "border border-admin-border text-admin-muted"
                      }`}>
                        {m.completed ? "✓" : m.id.slice(1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[14px] font-semibold text-admin-text">{m.title}</span>
                          <span className="text-[11px] text-admin-muted">{m.duration} min</span>
                          {m.completed && m.score && (
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text">Quiz: {m.score}%</span>
                          )}
                        </div>
                        <p className="text-[12.5px] text-admin-muted">{m.desc}</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-admin-muted transition-transform ${expandedModule === m.id ? "rotate-180" : ""}`}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {expandedModule === m.id && (
                      <div className="p-3 border-t border-admin-border bg-admin-hover">
                        {m.completed ? (
                          <div className="flex items-center gap-3">
                            <span className="text-[12.5px] text-admin-active-text">✓ Completed with {m.score}%</span>
                            <button className="text-[12px] text-admin-new-text hover:underline ml-auto">Review module</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStartModule(m.id)}
                              className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
                            >
                              Start module
                            </button>
                            <button className="text-[12px] text-admin-muted hover:text-admin-text">Skip</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Team training status</h2>
              <div className="space-y-2">
                {trainingTeam.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                    <img src={`https://i.pravatar.cc/80?u=${m.name}`} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[14px] text-admin-text font-medium">{m.name}</span>
                        <span className="text-[12px] text-admin-muted">· {m.role}</span>
                      </div>
                      <div className="text-[12px] text-admin-muted">{m.completed}/{m.total} modules</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[12px] px-2 py-0.5 rounded ${
                        m.status === "Certified" ? "bg-admin-active-bg text-admin-active-text" :
                        m.status === "In Progress" ? "bg-admin-vip-bg text-admin-vip-text" :
                        "bg-admin-non-bg text-admin-non-text"
                      }`}>
                        {m.status === "Certified" && "✓ "}{m.status}
                      </div>
                      {m.date && <div className="text-[11px] text-admin-muted mt-0.5">{m.date}</div>}
                    </div>
                    <button
                      onClick={() => setAssignedModule(m.name)}
                      className="text-[12px] px-2 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
              {assignedModule && (
                <div className="mt-3 p-3 rounded-md bg-admin-active-bg text-[12.5px] text-admin-active-text">
                  ✓ All 5 modules assigned to {assignedModule}. They&apos;ll get an email link.
                  <button onClick={() => setAssignedModule(null)} className="ml-2 text-admin-active-text hover:underline">Dismiss</button>
                </div>
              )}
            </div>

            <div className="bg-admin-active-bg border border-admin-active-text/30 rounded-[10px] p-5">
              <h2 className="text-[16px] font-semibold text-admin-text mb-2">🏆 Certification</h2>
              <p className="text-[12.5px] text-admin-text">
                After completing all 5 modules, your staff earns the <strong>DietaryID Certified</strong> badge. Display it on employee name tags to show customers that your team is trained.
              </p>
            </div>
          </div>
        )}
      </div>

      {startModule && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setStartModule(null)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[600px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-1">{trainingModules.find((m) => m.id === startModule)?.title}</h3>
            <p className="text-[12.5px] text-admin-muted mb-4">{trainingModules.find((m) => m.id === startModule)?.desc}</p>

            {!quizSubmitted ? (
              <>
                <div className="space-y-3 mb-4">
                  <div className="bg-admin-hover p-3 rounded-md text-[13px] text-admin-nav-text">
                    <p className="mb-2">📖 Read the training material above. Then answer the quiz question below to complete the module.</p>
                    <p>Key takeaways will include how to identify hidden allergens, communicate with customers, and follow your restaurant&apos;s specific procedures.</p>
                  </div>
                  <div>
                    <div className="text-[13.5px] font-medium text-admin-text mb-2">Quiz: What is the first thing you should do when a customer mentions an allergy?</div>
                    <div className="space-y-1.5">
                      {[
                        { v: 0, l: "Tell them the kitchen is busy" },
                        { v: 1, l: "Ask clarifying questions about severity and modifications" },
                        { v: 2, l: "Recommend the most popular dish" },
                        { v: 3, l: "Suggest they speak to the manager" },
                      ].map((opt) => (
                        <label
                          key={opt.v}
                          className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                            quizAnswer === opt.v ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                          }`}
                        >
                          <input
                            type="radio"
                            checked={quizAnswer === opt.v}
                            onChange={() => setQuizAnswer(opt.v)}
                            className="w-4 h-4"
                          />
                          <span className="text-[13px] text-admin-text">{opt.l}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setStartModule(null)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Close</button>
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={quizAnswer === null}
                    className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
                  >
                    Submit quiz
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className={`p-4 rounded-md mb-4 ${quizAnswer === 1 ? "bg-admin-active-bg" : "bg-admin-non-bg"}`}>
                  {quizAnswer === 1 ? (
                    <>
                      <div className="text-[14px] font-semibold text-admin-active-text mb-1">✓ Correct! 95%</div>
                      <p className="text-[13px] text-admin-text">Always ask clarifying questions about severity, specific allergens, and what modifications the customer needs.</p>
                    </>
                  ) : (
                    <>
                      <div className="text-[14px] font-semibold text-admin-non-text mb-1">Incorrect. Try again.</div>
                      <p className="text-[13px] text-admin-text">The right answer is: ask clarifying questions about severity and modifications.</p>
                    </>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  {quizAnswer === 1 ? (
                    <button onClick={handleCompleteModule} className="text-[13px] px-4 py-2 rounded-md bg-admin-active-text text-white hover:opacity-90">Complete module</button>
                  ) : (
                    <button onClick={() => { setQuizSubmitted(false); setQuizAnswer(null); }} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Retake</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
