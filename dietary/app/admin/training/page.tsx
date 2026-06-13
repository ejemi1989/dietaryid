"use client";

import { useState } from "react";
import { useModules, useCompletions, addModule, updateModule, deleteModule, Module, Completion } from "@/lib/training";

export default function AdminTrainingPage() {
  const modules = useModules();
  const completions = useCompletions();
  const [tab, setTab] = useState<"modules" | "progress">("modules");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: "", duration: 15, description: "", content: "", quizQ: "", quizOpts: ["", "", "", ""], quizCorrect: 0 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const quiz = form.quizQ.trim() ? [{ q: form.quizQ, options: form.quizOpts.filter((o) => o.trim()), correct: form.quizCorrect }] : [];
    addModule({ title: form.title, duration: form.duration, description: form.description, content: form.content, quiz, order: modules.length + 1 });
    setShowNew(false);
    setForm({ title: "", duration: 15, description: "", content: "", quizQ: "", quizOpts: ["", "", "", ""], quizCorrect: 0 });
  };

  const handleEdit = (m: Module) => {
    setEditingId(m.id);
    setForm({ title: m.title, duration: m.duration, description: m.description, content: m.content, quizQ: m.quiz[0]?.q || "", quizOpts: m.quiz[0]?.options || ["", "", "", ""], quizCorrect: m.quiz[0]?.correct || 0 });
  };

  const handleSaveEdit = (id: string) => {
    const quiz = form.quizQ.trim() ? [{ q: form.quizQ, options: form.quizOpts.filter((o) => o.trim()), correct: form.quizCorrect }] : [];
    updateModule(id, { title: form.title, duration: form.duration, description: form.description, content: form.content, quiz });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this module and all completions?")) return;
    deleteModule(id);
  };

  const memberStats = [...new Set(completions.map((c) => c.memberId))].map((mid) => {
    const memberComps = completions.filter((c) => c.memberId === mid);
    return {
      memberId: mid,
      memberName: memberComps[0].memberName,
      memberRole: memberComps[0].memberRole,
      completed: memberComps.filter((c) => c.status === "completed").length,
      total: modules.length,
      avgScore: Math.round(memberComps.filter((c) => c.score != null).reduce((s, c) => s + (c.score || 0), 0) / Math.max(1, memberComps.filter((c) => c.score != null).length)),
      lastActive: memberComps.filter((c) => c.completedAt).sort((a, b) => (b.completedAt || "").localeCompare(a.completedAt || ""))[0]?.completedAt || "-",
    };
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Training Management 🎓</h1>
            <p className="text-[13.5px] text-admin-muted">Create modules, manage content, and track team completion across all restaurants.</p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
          >
            + New module
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-[26px] border-b border-admin-border">
        {([
          { v: "modules", l: "Modules" },
          { v: "progress", l: "Team progress" },
        ] as const).map((t) => (
          <button
            key={t.v}
            onClick={() => setTab(t.v)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
              tab === t.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      <div className="px-[26px] py-6 max-w-[1000px]">
        {tab === "modules" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[11px] text-admin-muted">Total modules</div>
                <div className="text-[18px] font-semibold text-admin-text">{modules.length}</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[11px] text-admin-muted">Team members trained</div>
                <div className="text-[18px] font-semibold text-admin-text">{memberStats.length}</div>
              </div>
              <div className="bg-admin-bg border border-admin-border rounded-md p-3">
                <div className="text-[11px] text-admin-muted">Completions</div>
                <div className="text-[18px] font-semibold text-admin-text">{completions.filter((c) => c.status === "completed").length}</div>
              </div>
            </div>

            <div className="space-y-2">
              {modules.map((m) => (
                <div key={m.id} className="bg-admin-bg border border-admin-border rounded-[10px] overflow-hidden">
                  {editingId === m.id ? (
                    <div className="p-4">
                      <ModuleForm form={form} setForm={setForm} />
                      <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setEditingId(null)} className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
                        <button onClick={() => handleSaveEdit(m.id)} className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90">Save changes</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:bg-admin-hover"
                      >
                        <div className="w-8 h-8 rounded-full bg-admin-dark text-white flex items-center justify-center text-[12px] font-semibold">{m.order}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[15px] font-semibold text-admin-text">{m.title}</span>
                            <span className="text-[11px] text-admin-muted">{m.duration} min</span>
                            <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-hover text-admin-text">{m.quiz.length} quiz questions</span>
                          </div>
                          <p className="text-[12.5px] text-admin-muted">{m.description}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11.5px] text-admin-muted">
                            {completions.filter((c) => c.moduleId === m.id && c.status === "completed").length}/{completions.filter((c) => c.moduleId === m.id).length || 0} done
                          </span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-admin-muted transition-transform ${expandedId === m.id ? "rotate-180" : ""}`}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </button>
                      {expandedId === m.id && (
                        <div className="px-4 pb-4 border-t border-admin-border">
                          <div className="py-3 text-[13px] text-admin-nav-text whitespace-pre-wrap leading-[1.6]">{m.content}</div>
                          {m.quiz.length > 0 && (
                            <div className="mt-2 p-3 rounded-md bg-admin-hover">
                              <div className="text-[12px] font-semibold text-admin-text mb-2">Quiz preview</div>
                              {m.quiz.map((q, i) => (
                                <div key={i} className="mb-2">
                                  <div className="text-[12.5px] text-admin-text">Q{i + 1}: {q.q}</div>
                                  <div className="grid grid-cols-2 gap-1 mt-1">
                                    {q.options.map((o, j) => (
                                      <div key={j} className={`text-[11.5px] px-2 py-0.5 rounded ${j === q.correct ? "bg-admin-active-bg text-admin-active-text font-medium" : "text-admin-muted"}`}>
                                        {String.fromCharCode(65 + j)}) {o} {j === q.correct && "✓"}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-admin-border">
                            <button onClick={() => handleEdit(m)} className="text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg">Edit module</button>
                            <button onClick={() => handleDelete(m.id)} className="text-[12px] px-3 py-1.5 rounded-md text-admin-non-text hover:bg-admin-non-bg">Delete</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "progress" && (
          <div>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-4">
              <h2 className="text-[16px] font-semibold text-admin-text mb-3">Team overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {modules.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-md bg-admin-hover">
                    <div className="text-[11.5px] text-admin-muted truncate">{m.title}</div>
                    <div className="text-[14px] font-semibold text-admin-text mt-0.5">
                      {completions.filter((c) => c.moduleId === m.id && c.status === "completed").length}/{memberStats.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {memberStats.map((s) => (
                <div key={s.memberId} className="bg-admin-bg border border-admin-border rounded-[10px] p-4 flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/80?u=${s.memberId}`} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[15px] font-semibold text-admin-text">{s.memberName}</span>
                      <span className="text-[11.5px] text-admin-muted">{s.memberRole}</span>
                      {s.completed === modules.length && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-semibold">CERTIFIED</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[12px]">
                      <span className="text-admin-muted">{s.completed}/{s.total} modules</span>
                      <span className="text-admin-muted">Avg: {s.avgScore}%</span>
                      <span className="text-admin-muted">Last: {s.lastActive}</span>
                    </div>
                  </div>
                  <div className="w-32 h-2 bg-admin-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-admin-active-text rounded-full"
                      style={{ width: `${(s.completed / Math.max(1, s.total)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {memberStats.length === 0 && (
                <p className="text-center text-[13px] text-admin-muted py-8">No training data yet. Create modules and assign them to team members.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {showNew && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4 py-6 overflow-y-auto" onClick={() => setShowNew(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[600px] w-full my-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-admin-text mb-4">Create new module</h3>
            <ModuleForm form={form} setForm={setForm} />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowNew(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button onClick={handleAdd} disabled={!form.title.trim()} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50">Create module</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleForm({ form, setForm }: { form: any; setForm: (f: any) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[12px] text-admin-muted mb-1">Title</div>
          <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
        </div>
        <div>
          <div className="text-[12px] text-admin-muted mb-1">Duration (min)</div>
          <input type="number" value={form.duration} onChange={(e) => setForm({...form, duration: parseInt(e.target.value) || 15})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
        </div>
      </div>
      <div>
        <div className="text-[12px] text-admin-muted mb-1">Description</div>
        <input type="text" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none" />
      </div>
      <div>
        <div className="text-[12px] text-admin-muted mb-1">Content (markdown)</div>
        <textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} rows={6} className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] bg-admin-bg text-admin-text outline-none resize-none font-mono" />
      </div>
      <div className="p-3 rounded-md bg-admin-hover">
        <div className="text-[12px] font-semibold text-admin-text mb-1">Quiz question (optional, add one at a time)</div>
        <input type="text" value={form.quizQ} onChange={(e) => setForm({...form, quizQ: e.target.value})} placeholder="Question" className="w-full px-3 py-2 border border-admin-border rounded-md text-[13px] bg-admin-bg text-admin-text outline-none mb-2" />
        <div className="grid grid-cols-2 gap-1 mb-2">
          {form.quizOpts.map((o: string, i: number) => (
            <div key={i} className="flex items-center gap-1">
              <input type="radio" name="quiz_correct" checked={form.quizCorrect === i} onChange={() => setForm({...form, quizCorrect: i})} className="w-3 h-3" />
              <input type="text" value={o} onChange={(e) => { const opts = [...form.quizOpts]; opts[i] = e.target.value; setForm({...form, quizOpts: opts}); }} placeholder={`Option ${String.fromCharCode(65 + i)}`} className="flex-1 px-2 py-1 border border-admin-border rounded text-[12px] bg-admin-bg text-admin-text outline-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
