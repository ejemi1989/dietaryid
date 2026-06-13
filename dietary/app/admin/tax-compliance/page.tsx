"use client";

import { useState } from "react";

type Form1099Status = "ready" | "pending" | "draft";

type TaxForm = {
  creatorId: string;
  creatorName: string;
  country: string;
  taxCountry: "US" | "GB" | "EU" | "Other";
  ytdEarnings: number;
  threshold: number;
  formStatus: Form1099Status;
  taxId: string;
  email: string;
  emailSent: boolean;
};

const initialForms: TaxForm[] = [
  { creatorId: "c_001", creatorName: "Sarah Mitchell", country: "United Kingdom", taxCountry: "GB", ytdEarnings: 1247.30, threshold: 600, formStatus: "ready", taxId: "Not required (UK)", email: "sarah@email.com", emailSent: false },
  { creatorId: "c_002", creatorName: "Mike Henderson", country: "United States", taxCountry: "US", ytdEarnings: 856.20, threshold: 600, formStatus: "ready", taxId: "•••••••890", email: "mike@email.com", emailSent: false },
  { creatorId: "c_003", creatorName: "Jordan Lee", country: "United States", taxCountry: "US", ytdEarnings: 412.10, threshold: 600, formStatus: "draft", taxId: "Not provided", email: "jordan@email.com", emailSent: false },
  { creatorId: "c_004", creatorName: "Emma Collins", country: "United States", taxCountry: "US", ytdEarnings: 1623.50, threshold: 600, formStatus: "ready", taxId: "•••••••234", email: "emma@email.com", emailSent: true },
  { creatorId: "c_005", creatorName: "David Chen", country: "Canada", taxCountry: "Other", ytdEarnings: 89.40, threshold: 600, formStatus: "draft", taxId: "Not required", email: "david@email.com", emailSent: false },
  { creatorId: "c_006", creatorName: "Sophie Turner", country: "France", taxCountry: "EU", ytdEarnings: 267.90, threshold: 600, formStatus: "pending", taxId: "FR-••••234", email: "sophie@email.com", emailSent: false },
];

const auditLog = [
  { time: "Oct 18, 10:00 AM", actor: "admin_001", action: "Generated 1099-NEC for c_004 (Emma Collins) · $2,063.92 USD" },
  { time: "Oct 15, 11:00 AM", actor: "system", action: "Batch payout DSP_2024_10 completed · 847 payouts · $157,605.32 USD" },
  { time: "Oct 14, 2:00 PM", actor: "admin_002", action: "Reviewed reconciliation report for Sept 2024 · All balanced" },
  { time: "Oct 1, 9:00 AM", actor: "system", action: "Monthly tax report generated for September 2024" },
  { time: "Sept 30, 4:00 PM", actor: "admin_001", action: "Filed Q3 2024 tax summary (847 creators, $1.45M USD total)" },
  { time: "Sept 28, 11:00 AM", actor: "admin_001", action: "Exported transaction history for accountant review" },
];

export default function AdminTaxCompliancePage() {
  const [forms, setForms] = useState(initialForms);
  const [year, setYear] = useState(2024);
  const [filter, setFilter] = useState<"all" | "ready" | "draft" | "us" | "eu" | "other">("all");
  const [showSend, setShowSend] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const usForms = forms.filter((f) => f.taxCountry === "US");
  const usReady = usForms.filter((f) => f.formStatus === "ready" && f.ytdEarnings >= f.threshold);
  const usDraft = usForms.filter((f) => f.formStatus === "draft");
  const totalUsd = usForms.reduce((s, f) => s + f.ytdEarnings, 0) * 1.27;
  const usFormsDue = usReady.length;
  const usFormsSent = usForms.filter((f) => f.emailSent).length;

  const filtered = forms.filter((f) => {
    if (filter === "all") return true;
    if (filter === "ready") return f.formStatus === "ready";
    if (filter === "draft") return f.formStatus === "draft";
    if (filter === "us") return f.taxCountry === "US";
    if (filter === "eu") return f.taxCountry === "EU";
    if (filter === "other") return f.taxCountry === "Other" || f.taxCountry === "GB";
    return true;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAllReady = () => {
    setSelectedIds(new Set(usReady.map((f) => f.creatorId)));
  };

  const handleSendToIRS = () => {
    setForms((prev) => prev.map((f) => selectedIds.has(f.creatorId) ? { ...f, emailSent: true } : f));
    setShowSend(false);
    setSelectedIds(new Set());
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Tax Compliance 🧾</h1>
            <p className="text-[13.5px] text-admin-muted">1099-NEC generation, VAT tracking, audit trail, and quarterly filings.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="text-[13px] px-3 py-2 border border-admin-border rounded-md bg-admin-bg text-admin-text"
            >
              <option value={2024}>2024 tax year</option>
              <option value={2023}>2023 tax year</option>
            </select>
            <button
              onClick={() => alert(`Exported ${year} tax report (mock)`)}
              className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              ⬇ Export report
            </button>
          </div>
        </div>
      </div>

      <div className="px-[26px] py-6 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">US 1099-NEC due</div>
            <div className="text-[28px] font-semibold text-admin-text">{usFormsDue}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Creators earning &gt;$600</div>
            <div className="text-[12px] mt-1 font-medium text-admin-active-text">Jan 31, {year + 1} deadline</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Total YTD US payouts</div>
            <div className="text-[28px] font-semibold text-admin-text">${totalUsd.toFixed(2)}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Across {usForms.length} US creators</div>
            <div className="text-[12px] mt-1 text-admin-muted">USD equivalent</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">1099s already sent</div>
            <div className="text-[28px] font-semibold text-admin-active-text">{usFormsSent}</div>
            <div className="text-[12.5px] text-admin-text mt-1">To creators + IRS</div>
            <div className="text-[12px] mt-1 text-admin-muted">For {year} tax year</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Drafts pending info</div>
            <div className="text-[28px] font-semibold text-admin-vip-text">{usDraft.length}</div>
            <div className="text-[12.5px] text-admin-text mt-1">Missing tax IDs</div>
            <div className="text-[12px] mt-1 text-admin-muted">Email creator to collect</div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">US 1099-NEC forms</h2>
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] text-admin-muted">{selectedIds.size} selected</span>
              <button
                onClick={handleSelectAllReady}
                className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                Select all ready
              </button>
              <button
                onClick={() => setShowSend(true)}
                disabled={selectedIds.size === 0}
                className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50"
              >
                📤 Send to IRS
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3 flex-wrap">
            {([
              { v: "all", l: "All" },
              { v: "us", l: "🇺🇸 US" },
              { v: "eu", l: "🇪🇺 EU" },
              { v: "other", l: "🌍 Other" },
              { v: "ready", l: "✓ Ready" },
              { v: "draft", l: "⏳ Drafts" },
            ] as const).map((f) => (
              <button
                key={f.v}
                onClick={() => setFilter(f.v)}
                className={`text-[12px] px-2.5 py-1 rounded-md transition-colors ${
                  filter === f.v ? "bg-admin-dark text-white" : "text-admin-nav-text hover:bg-admin-hover border border-admin-border"
                }`}
              >
                {f.l}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-admin-border">
                  <th className="text-left py-2 px-2 w-8">
                    <input
                      type="checkbox"
                      checked={selectedIds.size > 0 && selectedIds.size === usReady.filter((f) => f.formStatus === "ready" && f.ytdEarnings >= f.threshold).length}
                      onChange={handleSelectAllReady}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">Creator</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">Country</th>
                  <th className="text-right text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">YTD</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">Threshold</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">Tax ID</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">Status</th>
                  <th className="text-right text-[11px] uppercase tracking-wider text-admin-muted py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => {
                  const needs = f.taxCountry === "US" && f.ytdEarnings >= f.threshold;
                  return (
                    <tr key={f.creatorId} className="border-b border-admin-border hover:bg-admin-hover">
                      <td className="py-2.5 px-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(f.creatorId)}
                          onChange={() => handleToggleSelect(f.creatorId)}
                          disabled={!needs || f.formStatus !== "ready"}
                          className="w-4 h-4 disabled:opacity-30"
                        />
                      </td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-2">
                          <img src={`https://i.pravatar.cc/80?u=${f.creatorId}`} alt="" className="w-7 h-7 rounded-full" />
                          <div>
                            <div className="text-[13.5px] font-semibold text-admin-text">{f.creatorName}</div>
                            <div className="text-[10.5px] text-admin-muted">{f.creatorId} · {f.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[12.5px] text-admin-text">{f.country}</td>
                      <td className="py-2.5 px-2 text-right text-[13.5px] font-semibold text-admin-text">${(f.ytdEarnings * 1.27).toFixed(2)}</td>
                      <td className="py-2.5 px-2 text-[12px] text-admin-muted">${f.threshold}</td>
                      <td className="py-2.5 px-2 text-[12px] font-mono text-admin-text">{f.taxId}</td>
                      <td className="py-2.5 px-2">
                        {f.emailSent ? (
                          <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text font-medium">✓ SENT</span>
                        ) : f.formStatus === "ready" ? (
                          <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-new-bg text-admin-new-text font-medium">READY</span>
                        ) : (
                          <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-vip-bg text-admin-vip-text font-medium">DRAFT</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {f.taxCountry === "US" && needs && (
                            <button
                              onClick={() => alert(`Generated 1099-NEC for ${f.creatorName} (mock)`)}
                              className="text-[11px] px-2 py-0.5 rounded bg-admin-dark text-white hover:opacity-90"
                            >
                              📄 Generate
                            </button>
                          )}
                          {f.formStatus === "draft" && (
                            <button
                              onClick={() => alert(`Email sent to ${f.email} requesting tax ID (mock)`)}
                              className="text-[11px] px-2 py-0.5 rounded border border-admin-border text-admin-text hover:bg-admin-bg"
                            >
                              ✉ Request ID
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">VAT / EU tracking</h2>
            <div className="space-y-2 text-[13px]">
              {[
                { l: "🇩🇪 Germany (DE)", count: 28, total: 4520, vat: "DE-registered" },
                { l: "🇫🇷 France (FR)", count: 19, total: 3140, vat: "FR-registered" },
                { l: "🇪🇸 Spain (ES)", count: 12, total: 1850, vat: "ES-registered" },
                { l: "🇮🇹 Italy (IT)", count: 8, total: 1230, vat: "IT-registered" },
                { l: "🇳🇱 Netherlands (NL)", count: 6, total: 980, vat: "NL-registered" },
                { l: "🇮🇪 Ireland (IE)", count: 4, total: 620, vat: "IE-registered" },
              ].map((r) => (
                <div key={r.l} className="flex items-center gap-2 p-2 rounded-md bg-admin-hover">
                  <span className="font-medium text-admin-text w-32">{r.l}</span>
                  <span className="text-[11.5px] text-admin-muted">{r.count} creators</span>
                  <span className="ml-auto text-[12.5px] font-semibold text-admin-text">£{r.total.toLocaleString()}</span>
                  <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-admin-active-bg text-admin-active-text">{r.vat}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[12px] text-admin-muted">
              VIES-checked: <span className="text-admin-active-text font-medium">✓ 77 creators</span> · Last run: Oct 18, 2024
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Quarterly filings</h2>
            <div className="space-y-2">
              {[
                { q: "Q4 2024", status: "pending", due: "Jan 31, 2025", amount: 28500 },
                { q: "Q3 2024", status: "filed", due: "Oct 31, 2024", amount: 22100, filed: "Oct 25" },
                { q: "Q2 2024", status: "filed", due: "Jul 31, 2024", amount: 18450, filed: "Jul 28" },
                { q: "Q1 2024", status: "filed", due: "Apr 30, 2024", amount: 16800, filed: "Apr 26" },
              ].map((q) => (
                <div key={q.q} className="flex items-center gap-3 p-2.5 rounded-md border border-admin-border">
                  <div className="text-[18px]">{q.status === "filed" ? "✅" : "⏳"}</div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-semibold text-admin-text">{q.q}</div>
                    <div className="text-[11.5px] text-admin-muted">Due {q.due}{q.filed && ` · Filed ${q.filed}`}</div>
                  </div>
                  <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${q.status === "filed" ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-vip-bg text-admin-vip-text"}`}>{q.status}</span>
                  <div className="text-[12.5px] font-semibold text-admin-text">£{q.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Audit trail (recent)</h2>
          <div className="space-y-2">
            {auditLog.map((log, i) => (
              <div key={i} className="flex items-start gap-2 text-[12.5px]">
                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-admin-new-text flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-admin-text">{log.action}</div>
                  <div className="text-[11.5px] text-admin-muted">{log.actor} · {log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSend && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowSend(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-1">Submit {selectedIds.size} 1099-NEC to IRS</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Forms will be sent to the IRS and copies emailed to creators.</p>
            <div className="p-3 rounded-md bg-admin-hover mb-4">
              <div className="text-[12.5px] font-semibold text-admin-text mb-2">Selected creators</div>
              {Array.from(selectedIds).map((id) => {
                const f = forms.find((x) => x.creatorId === id);
                if (!f) return null;
                return (
                  <div key={id} className="text-[12px] flex items-center justify-between py-0.5">
                    <span className="text-admin-text">{f.creatorName}</span>
                    <span className="text-admin-muted">${(f.ytdEarnings * 1.27).toFixed(2)}</span>
                  </div>
                );
              })}
              <div className="border-t border-admin-border mt-1.5 pt-1.5 text-[12px] flex items-center justify-between font-semibold">
                <span className="text-admin-text">Total</span>
                <span className="text-admin-text">£{(() => { let t = 0; Array.from(selectedIds).forEach((id) => { const f = forms.find((x) => x.creatorId === id); if (f) t += f.ytdEarnings; }); return (t * 1.27).toFixed(2); })()}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSend(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={handleSendToIRS}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                📤 Submit to IRS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
