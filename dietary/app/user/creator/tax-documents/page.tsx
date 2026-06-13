"use client";

import { useState } from "react";
import Link from "next/link";

const monthlyStatements = [
  { year: 2024, month: "October", earnings: 247.30, payouts: 0, transactions: 38 },
  { year: 2024, month: "September", earnings: 225.10, payouts: 221.52, transactions: 35 },
  { year: 2024, month: "August", earnings: 198.50, payouts: 195.32, transactions: 31 },
  { year: 2024, month: "July", earnings: 212.30, payouts: 208.92, transactions: 33 },
  { year: 2024, month: "June", earnings: 178.20, payouts: 174.50, transactions: 28 },
  { year: 2024, month: "May", earnings: 165.80, payouts: 162.30, transactions: 26 },
  { year: 2024, month: "April", earnings: 142.30, payouts: 138.75, transactions: 22 },
  { year: 2024, month: "March", earnings: 156.90, payouts: 153.40, transactions: 24 },
  { year: 2024, month: "February", earnings: 134.20, payouts: 130.85, transactions: 21 },
  { year: 2024, month: "January", earnings: 128.60, payouts: 125.20, transactions: 20 },
  { year: 2023, month: "December", earnings: 98.10, payouts: 94.50, transactions: 15 },
];

const quarterlyFilings = [
  { quarter: "Q4 2024", status: "Pending", dueDate: "Jan 31, 2025", earnings: 868.20 },
  { quarter: "Q3 2024", status: "Filed", dueDate: "Oct 31, 2024", earnings: 612.40, filedDate: "Oct 25, 2024" },
  { quarter: "Q2 2024", status: "Filed", dueDate: "Jul 31, 2024", earnings: 486.30, filedDate: "Jul 28, 2024" },
  { quarter: "Q1 2024", status: "Filed", dueDate: "Apr 30, 2024", earnings: 419.70, filedDate: "Apr 26, 2024" },
];

export default function TaxDocumentsPage() {
  const [year, setYear] = useState(2024);
  const [showEmail, setShowEmail] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showW9, setShowW9] = useState(false);
  const [showW8, setShowW8] = useState(false);

  const yearStatements = monthlyStatements.filter((m) => m.year === year);
  const totalEarnings = yearStatements.reduce((s, m) => s + m.earnings, 0);
  const totalPayouts = yearStatements.reduce((s, m) => s + m.payouts, 0);
  const totalTx = yearStatements.reduce((s, m) => s + m.transactions, 0);

  const handleDownload = (filename: string) => {
    const text = `Tax document mock for ${filename}\nGenerated: ${new Date().toISOString()}\nThis is a placeholder for the real PDF.`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEmailCopy = () => {
    navigator.clipboard?.writeText("accounting@dietaryid.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const taxFormAvailable = totalEarnings >= 600;
  const formName = "1099-NEC";
  const formCountry = "United States";

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <Link href="/user/creator" className="text-[12.5px] text-admin-new-text no-underline hover:underline mb-2 inline-block">← Back to Creator Hub</Link>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-admin-text mb-1">Tax documents 📄</h1>
            <p className="text-[13.5px] text-admin-muted">Monthly statements and annual tax forms. {formName} available when you earn &gt;$600/year.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmail(true)}
              className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              ✉ Email to accountant
            </button>
            <Link href="/user/creator/payment-settings" className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text no-underline hover:bg-admin-hover">⚙ Tax settings</Link>
          </div>
        </div>
      </div>

      <div className="px-[26px] py-6 max-w-[1000px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Year to date earnings</div>
            <div className="text-[24px] font-semibold text-admin-text">£{totalEarnings.toFixed(2)}</div>
            <div className="text-[11.5px] text-admin-muted mt-0.5">{totalTx} transactions</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">Year to date payouts</div>
            <div className="text-[24px] font-semibold text-admin-text">£{totalPayouts.toFixed(2)}</div>
            <div className="text-[11.5px] text-admin-muted mt-0.5">After fees</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-4">
            <div className="text-[12px] text-admin-muted">{formName} status</div>
            <div className="text-[16px] font-semibold text-admin-text">
              {taxFormAvailable ? `✓ ${formName} ready` : "Not yet required"}
            </div>
            <div className="text-[11.5px] text-admin-muted mt-0.5">{formCountry} · 2024 tax year</div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-[16px] font-semibold text-admin-text">Annual tax forms</h2>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="text-[12.5px] px-2.5 py-1 border border-admin-border rounded-md bg-admin-bg text-admin-text"
            >
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-admin-border rounded-[9px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[20px]">📄</div>
                <div>
                  <div className="text-[14px] font-semibold text-admin-text">{formName} (US)</div>
                  <div className="text-[11.5px] text-admin-muted">Non-employee compensation</div>
                </div>
                <span className={`ml-auto text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${taxFormAvailable ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-hover text-admin-muted"}`}>
                  {taxFormAvailable ? "READY" : "BELOW $600"}
                </span>
              </div>
              <p className="text-[12.5px] text-admin-muted mb-2">
                Total {year} earnings: <strong>£{totalEarnings.toFixed(2)}</strong> (${(totalEarnings * 1.27).toFixed(2)})
              </p>
              <p className="text-[11.5px] text-admin-muted mb-2">
                Required if you earned &gt;$600. We send to IRS by Jan 31.
              </p>
              <button
                onClick={() => handleDownload(`${formName}_${year}_sarah-mitchell.pdf`)}
                disabled={!taxFormAvailable}
                className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⬇ Download {formName}
              </button>
            </div>

            <div className="border border-admin-border rounded-[9px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[20px]">📄</div>
                <div>
                  <div className="text-[14px] font-semibold text-admin-text">Earnings Statement</div>
                  <div className="text-[11.5px] text-admin-muted">Annual summary of all earnings</div>
                </div>
                <span className="ml-auto text-[10.5px] px-1.5 py-0.5 rounded font-semibold bg-admin-active-bg text-admin-active-text">READY</span>
              </div>
              <p className="text-[12.5px] text-admin-muted mb-2">For your records and accountant.</p>
              <button
                onClick={() => handleDownload(`Earnings_Statement_${year}.pdf`)}
                className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                ⬇ Download PDF
              </button>
            </div>

            <div className="border border-admin-border rounded-[9px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[20px]">📊</div>
                <div>
                  <div className="text-[14px] font-semibold text-admin-text">Transaction Report (CSV)</div>
                  <div className="text-[11.5px] text-admin-muted">All earnings, line by line</div>
                </div>
                <span className="ml-auto text-[10.5px] px-1.5 py-0.5 rounded font-semibold bg-admin-active-bg text-admin-active-text">READY</span>
              </div>
              <p className="text-[12.5px] text-admin-muted mb-2">{totalTx} rows · Importable to Excel/QuickBooks</p>
              <button
                onClick={() => handleDownload(`Transactions_${year}.csv`)}
                className="text-[12.5px] px-3 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                ⬇ Download CSV
              </button>
            </div>

            <div className="border border-admin-border rounded-[9px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[20px]">🇪🇺</div>
                <div>
                  <div className="text-[14px] font-semibold text-admin-text">VAT / VIES Report (EU)</div>
                  <div className="text-[11.5px] text-admin-muted">If you&apos;re an EU resident</div>
                </div>
                <span className="ml-auto text-[10.5px] px-1.5 py-0.5 rounded font-semibold bg-admin-hover text-admin-muted">N/A</span>
              </div>
              <p className="text-[12.5px] text-admin-muted mb-2">Not applicable to your country ({formCountry}).</p>
            </div>

            <div className="border border-admin-border rounded-[9px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[20px]">📋</div>
                <div>
                  <div className="text-[14px] font-semibold text-admin-text">W-9 / W-8BEN</div>
                  <div className="text-[11.5px] text-admin-muted">Tax ID verification form</div>
                </div>
                <span className="ml-auto text-[10.5px] px-1.5 py-0.5 rounded font-semibold bg-admin-active-bg text-admin-active-text">VERIFIED</span>
              </div>
              <p className="text-[12.5px] text-admin-muted mb-2">Keep this current — required for {formName}.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowW9(true)}
                  className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  View W-9
                </button>
                <button
                  onClick={() => setShowW8(true)}
                  className="text-[12.5px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  View W-8BEN
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Monthly statements — {year}</h2>
          <div className="space-y-2">
            {yearStatements.map((m) => (
              <div key={m.month} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                <div className="text-[18px]">📅</div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-admin-text">{m.month} {m.year}</div>
                  <div className="text-[11.5px] text-admin-muted">{m.transactions} transactions · £{m.earnings.toFixed(2)} earned · £{m.payouts.toFixed(2)} paid</div>
                </div>
                <div className="text-right">
                  <div className="text-[13.5px] font-semibold text-admin-text">£{m.earnings.toFixed(2)}</div>
                </div>
                <button
                  onClick={() => handleDownload(`${m.month}_${m.year}_Statement.pdf`)}
                  className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ⬇
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Quarterly filings</h2>
          <div className="space-y-2">
            {quarterlyFilings.map((q) => (
              <div key={q.quarter} className="flex items-center gap-3 p-3 rounded-md border border-admin-border">
                <div className="text-[18px]">{q.status === "Filed" ? "✅" : "⏳"}</div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-admin-text">{q.quarter}</div>
                  <div className="text-[11.5px] text-admin-muted">
                    Due {q.dueDate}{q.filedDate && ` · Filed ${q.filedDate}`} · £{q.earnings.toFixed(2)}
                  </div>
                </div>
                <span className={`text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${q.status === "Filed" ? "bg-admin-active-bg text-admin-active-text" : "bg-admin-vip-bg text-admin-vip-text"}`}>
                  {q.status}
                </span>
                <button
                  onClick={() => handleDownload(`${q.quarter.replace(" ", "_")}_filing.pdf`)}
                  className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ⬇
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEmail && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => setShowEmail(false)}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[440px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">Email documents to your accountant</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">We&apos;ll send all {year} tax documents as attachments.</p>
            <div className="mb-3">
              <label className="block text-[12.5px] text-admin-text font-medium mb-1.5">Accountant email</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  defaultValue="accountant@dietaryid.com"
                  className="flex-1 px-3 py-2 border border-admin-border rounded-md text-[13.5px] bg-admin-bg text-admin-text outline-none focus:border-admin-dark"
                />
                <button
                  onClick={handleEmailCopy}
                  className="text-[12px] px-2.5 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  {emailCopied ? "✓" : "Paste"}
                </button>
              </div>
            </div>
            <div className="mb-3 p-2.5 rounded-md bg-admin-hover text-[11.5px] text-admin-text">
              <strong>Attachments:</strong> {formName}_{year}.pdf, Earnings_Statement_{year}.pdf, Transactions_{year}.csv, 12 monthly statements
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEmail(false)} className="text-[13px] px-4 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover">Cancel</button>
              <button
                onClick={() => { alert("Email sent (mock)"); setShowEmail(false); }}
                className="text-[13px] px-4 py-2 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                Send documents
              </button>
            </div>
          </div>
        </div>
      )}

      {(showW9 || showW8) && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center px-4" onClick={() => { setShowW9(false); setShowW8(false); }}>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6 max-w-[520px] w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-admin-text mb-2">{showW9 ? "W-9 Tax Form" : "W-8BEN Tax Form"}</h3>
            <p className="text-[12.5px] text-admin-muted mb-3">Verified information on file with DietaryID.</p>
            <div className="bg-admin-bg border border-admin-border rounded-md p-3 text-[12.5px] space-y-1.5 font-mono">
              <div><span className="text-admin-muted">Name:</span> Sarah Mitchell</div>
              <div><span className="text-admin-muted">Business name:</span> (none)</div>
              <div><span className="text-admin-muted">Address:</span> 42 King Street, Manchester, M2 6BA, UK</div>
              <div><span className="text-admin-muted">Tax country:</span> {formCountry}</div>
              <div><span className="text-admin-muted">Tax ID (EIN):</span> ••••••890</div>
              <div><span className="text-admin-muted">Status:</span> ✓ Verified Sept 2024</div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => handleDownload(showW9 ? "W-9_sarah-mitchell.pdf" : "W-8BEN_sarah-mitchell.pdf")}
                className="text-[13px] px-3 py-2 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
              >
                ⬇ Download
              </button>
              <button onClick={() => { setShowW9(false); setShowW8(false); }} className="text-[13px] px-3 py-2 rounded-md bg-admin-dark text-white hover:opacity-90">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
