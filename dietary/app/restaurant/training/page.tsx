"use client";

import { useState } from "react";
import { useModules, useCompletions, completeModule, assignModule, Module } from "@/lib/training";
import { notifyUser } from "@/lib/notifications";

const teamMembers = [
  { id: "marco_rossi", name: "Marco Rossi", role: "Owner", email: "marco@italiankitchen.com" },
  { id: "sofia_bianchi", name: "Sofia Bianchi", role: "Manager", email: "sofia@italiankitchen.com" },
  { id: "james_park", name: "James Park", role: "Manager", email: "james@italiankitchen.com" },
  { id: "aisha_khan", name: "Aisha Khan", role: "Staff", email: "aisha@italiankitchen.com" },
  { id: "liam_chen", name: "Liam Chen", role: "Staff", email: "liam@italiankitchen.com" },
  { id: "maria_lopez", name: "Maria Lopez", role: "Staff", email: "maria@italiankitchen.com" },
];

export default function RestaurantTrainingPage() {
  const modules = useModules();
  const completions = useCompletions();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentTrainee, setCurrentTrainee] = useState("marco_rossi");
  const [showAssign, setShowAssign] = useState<string | null>(null);

  const currentModule = modules.find((m) => m.id === activeModule);
  const trainee = teamMembers.find((t) => t.id === currentTrainee);
  const memberComps = completions.filter((c) => c.memberId === currentTrainee);

  const handleStartModule = (id: string) => {
    setActiveModule(id);
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };

  const handleAnswer = (qi: number, ai: number) => {
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[qi] = ai;
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    if (!currentModule) return;
    let correct = 0;
    currentModule.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) correct++;
    });
    const score = Math.round((correct / currentModule.quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    if (trainee) {
      completeModule(trainee.id, trainee.name, trainee.role, currentModule.id, score);
      notifyUser(`${trainee.name} completed "${currentModule.title}" with ${score}%`, "/restaurant/training");
    }
  };

  const handleAssign = (memberId: string, moduleId: string) => {
    const m = teamMembers.find((t) => t.id === memberId);
    if (m) assignModule(m.id, m.name, m.role, moduleId);
    setShowAssign(null);
  };

  const memberProgress = teamMembers.map((m) => {
    const comps = completions.filter((c) => c.memberId === m.id);
    return { ...m, completed: comps.filter((c) => c.status === "completed").length, total: modules.length,
      certified: comps.filter((c) => c.status === "completed").length === modules.length && modules.length > 0 };
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Training Portal 🎓</h1>
        <p className="text-[13.5px] text-admin-muted">Complete allergen safety modules. Earn your DietaryID Certified badge.</p>
      </div>

      <div className="px-[26px] py-4 border-b border-admin-border">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] text-admin-muted">Training as:</span>
          {teamMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => { setCurrentTrainee(m.id); setActiveModule(null); }}
              className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                currentTrainee === m.id ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
              }`}
            >
              {m.name} ({m.role})
            </button>
          ))}
        </div>
      </div>

      <div className="px-[26px] py-6 max-w-[1000px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {modules.map((m) => {
            const comp = memberComps.find((c) => c.moduleId === m.id);
            const done = comp?.status === "completed";
            return (
              <button
                key={m.id}
                onClick={() => handleStartModule(m.id)}
                className={`p-3 rounded-md border text-left transition-colors ${
                  activeModule === m.id ? "border-admin-dark bg-admin-active-bg" :
                  done ? "border-admin-active-text/30 bg-admin-active-bg/50" :
                  "border-admin-border hover:bg-admin-hover"
                }`}
              >
                <div className="text-[20px] mb-1">{done ? "✅" : "📖"}</div>
                <div className="text-[13px] font-semibold text-admin-text">{m.title}</div>
                <div className="text-[11px] text-admin-muted">{m.duration} min</div>
                {done && comp?.score != null && (
                  <div className="text-[10.5px] text-admin-active-text mt-0.5">Score: {comp.score}%</div>
                )}
              </button>
            );
          })}
        </div>

        {currentModule && !quizSubmitted && (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] font-semibold text-admin-text">{currentModule.title}</h2>
              <span className="text-[12px] text-admin-muted">{currentModule.duration} minutes</span>
            </div>
            <div className="text-[13.5px] text-admin-nav-text whitespace-pre-wrap leading-[1.7] mb-6 p-4 bg-admin-hover rounded-md">
              {currentModule.content}
            </div>

            {currentModule.quiz.length > 0 && (
              <div>
                <h3 className="text-[15px] font-semibold text-admin-text mb-3">Quiz ({currentModule.quiz.length} questions)</h3>
                {currentModule.quiz.map((q, i) => (
                  <div key={i} className="mb-4 p-3 rounded-md border border-admin-border">
                    <div className="text-[13.5px] font-medium text-admin-text mb-2">Q{i + 1}: {q.q}</div>
                    <div className="space-y-1.5">
                      {q.options.map((o, j) => (
                        <label
                          key={j}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border ${
                            quizAnswers[i] === j ? "border-admin-dark bg-admin-active-bg" : "border-admin-border hover:bg-admin-hover"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${i}`}
                            checked={quizAnswers[i] === j}
                            onChange={() => handleAnswer(i, j)}
                            className="w-4 h-4"
                          />
                          <span className="text-[13px] text-admin-text">{String.fromCharCode(65 + j)}) {o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSubmitQuiz}
                  disabled={quizAnswers.filter((a) => a !== null).length < currentModule.quiz.length}
                  className="text-[14px] px-5 py-2.5 rounded-md bg-admin-dark text-white font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  Submit quiz
                </button>
              </div>
            )}
          </div>
        )}

        {quizSubmitted && currentModule && (
          <div className={`border rounded-[10px] p-6 mb-6 ${quizScore >= 80 ? "bg-admin-active-bg border-admin-active-text/30" : "bg-admin-vip-bg border-admin-vip-text/30"}`}>
            <div className="text-center">
              <div className="text-[48px] mb-2">{quizScore >= 80 ? "🎉" : "📚"}</div>
              <h2 className="text-[20px] font-semibold text-admin-text mb-1">
                {quizScore >= 80 ? "Module completed!" : "Keep studying"}
              </h2>
              <p className="text-[14px] text-admin-nav-text mb-2">
                You scored <strong>{quizScore}%</strong> on &ldquo;{currentModule.title}&rdquo;
              </p>
              <div className="w-48 h-2.5 mx-auto bg-admin-border rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${quizScore >= 80 ? "bg-admin-active-text" : "bg-admin-vip-text"}`}
                  style={{ width: `${quizScore}%` }}
                />
              </div>
              {quizScore >= 80 && (
                <p className="text-[13px] text-admin-active-text font-medium">
                  ✓ {trainee?.name} is now certified in this module. {memberComps.filter((c) => c.status === "completed").length}/{modules.length} modules completed.
                </p>
              )}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button onClick={() => { setActiveModule(null); setQuizSubmitted(false); }} className="text-[13px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90">Back to modules</button>
                {quizScore < 80 && (
                  <button onClick={() => { setQuizSubmitted(false); setQuizAnswers([]); }} className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Retake quiz</button>
                )}
              </div>
            </div>
          </div>
        )}

        {!currentModule && (
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-semibold text-admin-text">Team progress</h2>
              <button onClick={() => setShowAssign("bulk")} className="text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Assign modules</button>
            </div>
            <div className="space-y-2">
              {memberProgress.map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                  <img src={`https://i.pravatar.cc/80?u=${m.email}`} alt="" className="w-9 h-9 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[14px] font-semibold text-admin-text">{m.name}</span>
                      <span className="text-[11.5px] text-admin-muted">{m.role}</span>
                      {m.certified && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-semibold">✓ CERTIFIED</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[12px]">
                      <span className="text-admin-muted">{m.completed}/{m.total} modules</span>
                    </div>
                  </div>
                  <div className="w-28 h-2 bg-admin-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-admin-active-text rounded-full"
                      style={{ width: `${(m.completed / Math.max(1, m.total)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAssign && (
          <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowAssign(null)}>
            <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[16px] font-semibold text-admin-text mb-3">Assign training modules</h3>
              <p className="text-[12.5px] text-admin-muted mb-3">Select a team member and module to assign:</p>
              <div className="grid grid-cols-2 gap-2">
                {teamMembers.map((m) => (
                  <div key={m.id} className="col-span-2 sm:col-span-1">
                    <div className="text-[12px] text-admin-muted mb-1">{m.name} ({m.role})</div>
                    <select
                      onChange={(e) => { if (e.target.value) handleAssign(m.id, e.target.value); }}
                      defaultValue=""
                      className="w-full px-2.5 py-1.5 border border-admin-border rounded-md text-[12.5px] bg-admin-bg text-admin-text outline-none"
                    >
                      <option value="">Select module...</option>
                      {modules.map((mod) => {
                        const done = completions.some((c) => c.memberId === m.id && c.moduleId === mod.id);
                        return (
                          <option key={mod.id} value={mod.id} disabled={done}>
                            {mod.title} {done ? "(assigned)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-admin-border">
                <button onClick={() => setShowAssign(null)} className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Done</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
