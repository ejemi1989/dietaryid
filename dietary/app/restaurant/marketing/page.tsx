"use client";

import { useState } from "react";

const copyTemplates = [
  {
    id: "discovery",
    label: "Discovery",
    text: "We're verified safe for Celiac, Nut-free, and Dairy-free diets on DietaryID. Our staff is trained in allergen procedures. Visit us with confidence.",
  },
  {
    id: "trust",
    label: "Trust",
    text: "47 customers with Celiac rate us 4.8★ for safety. See our reviews on DietaryID.",
  },
  {
    id: "cta",
    label: "Call-to-Action",
    text: "Looking for safe dining? We're verified on DietaryID. [Link to your profile]",
  },
];

const socialGraphics = [
  { id: "g1", title: "Proud to be verified", body: "Proud to be verified safe for Celiac on @DietaryID! Staff trained. Procedures in place. Reviews prove it." },
  { id: "g2", title: "Customer love", body: "47 people with Celiac gave us ⭐4.8. We take allergies seriously. See our verified profile on DietaryID." },
  { id: "g3", title: "Eat without fear", body: "Is eating out stressful with allergies? We make it safe. Check us out on DietaryID." },
];

const emailTemplate = {
  subject: "We're now verified on DietaryID!",
  body: `Hi [Name],

Great news! We're now verified as a safe dining destination for people with allergies on DietaryID.

What that means:
✓ Our menu is verified for allergen info
✓ Staff training is documented
✓ Real customers rate our safety

See our profile: [Link]

If you have a food allergy or dietary restriction, visit DietaryID to discover verified restaurants (including ours!) where you can eat with confidence.

We look forward to serving you safely!

[The Italian Kitchen]`,
};

const promotionIdeas = [
  { title: "Table tent cards", desc: "Print small cards for each table: \"See our DietaryID reviews: [QR code]\"" },
  { title: "Menu insert", desc: "Add a sticker or insert: \"Verified safe on DietaryID\"" },
  { title: "Window sticker", desc: "Display the badge in your window to attract walk-ins" },
  { title: "Staff training", desc: "Tell customers about your DietaryID profile when they mention allergies" },
];

export default function RestaurantMarketingPage() {
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadedGraphic, setDownloadedGraphic] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const badgeHTML = `<a href="https://dietaryid.com/r/the-italian-kitchen" target="_blank">
  <img src="https://dietaryid.com/badge/the-italian-kitchen.svg" alt="DietaryID Verified" width="180" />
</a>`;

  const badgeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60">
  <rect width="180" height="60" rx="8" fill="#2f7d3e"/>
  <text x="20" y="38" font-family="sans-serif" font-size="18" font-weight="700" fill="white">✓ DietaryID</text>
  <text x="105" y="38" font-family="sans-serif" font-size="11" fill="white">Verified Safe</text>
</svg>`;

  const shareLink = "https://dietaryid.com/r/the-italian-kitchen";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(shareLink)}`;

  const handleCopy = async (text: string, setter: (v: boolean) => void, resetMs = 2000) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), resetMs);
    } catch {
      setter(false);
    }
  };

  const handleDownload = (id: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedGraphic(id);
    setTimeout(() => setDownloadedGraphic(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Marketing Tools 📣</h1>
        <p className="text-[14px] text-admin-muted">Use your badge, share your profile, and promote your verified restaurant.</p>
      </div>

      <div className="px-[26px] py-6 max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 lg:col-span-2">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Your verification badge</h2>
            <p className="text-[13px] text-admin-text mb-3">
              You are verified safe for:{" "}
              <span className="px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text text-[12px] font-medium mr-1">✓ Celiac/Gluten-free</span>
              <span className="px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text text-[12px] font-medium mr-1">✓ Nut-free</span>
              <span className="px-2 py-0.5 rounded bg-admin-active-bg text-admin-active-text text-[12px] font-medium">✓ Dairy-free</span>
            </p>

            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="w-[180px] h-[60px] rounded-[8px] bg-admin-active-text text-white flex items-center justify-center font-bold text-[16px]">
                ✓ DietaryID Verified Safe
              </div>
              <div className="text-[12px] text-admin-muted">Use on website, social, menu, signage, email</div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[12.5px] text-admin-muted">HTML embed</div>
                  <button
                    onClick={() => handleCopy(badgeHTML, setCopiedBadge)}
                    className="text-[12px] text-admin-new-text hover:underline"
                  >
                    {copiedBadge ? "✓ Copied!" : "Copy HTML"}
                  </button>
                </div>
                <pre className="bg-admin-hover rounded-md p-3 text-[12px] font-mono text-admin-text overflow-x-auto whitespace-pre">{badgeHTML}</pre>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[12.5px] text-admin-muted">SVG (scalable)</div>
                  <button
                    onClick={() => handleCopy(badgeSVG, (v) => { setCopiedTemplate(v ? "svg" : null); })}
                    className="text-[12px] text-admin-new-text hover:underline"
                  >
                    {copiedTemplate === "svg" ? "✓ Copied!" : "Copy SVG"}
                  </button>
                </div>
                <pre className="bg-admin-hover rounded-md p-3 text-[12px] font-mono text-admin-text overflow-x-auto whitespace-pre">{badgeSVG}</pre>
              </div>
              <div>
                <button
                  onClick={() => handleDownload("dietaryid-badge", badgeSVG)}
                  className="text-[13px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  ⬇ Download badge as SVG
                </button>
              </div>
            </div>
          </div>

          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <h2 className="text-[16px] font-semibold text-admin-text mb-3">Share your profile</h2>
            <div className="text-[12.5px] text-admin-muted mb-2">Public link</div>
            <div className="flex items-center gap-1 mb-3">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-1 px-3 py-1.5 border border-admin-border rounded-md text-[12px] text-admin-text bg-admin-hover font-mono"
              />
              <button
                onClick={() => handleCopy(shareLink, setCopiedLink)}
                className="text-[12px] px-2.5 py-1.5 rounded-md bg-admin-dark text-white hover:opacity-90"
              >
                {copiedLink ? "✓" : "Copy"}
              </button>
            </div>
            <div className="text-[12.5px] text-admin-muted mb-2">QR code (for in-restaurant display)</div>
            <div className="bg-white p-2 rounded-md inline-block mb-2">
              <img src={qrUrl} alt="QR Code" width={140} height={140} className="block" />
            </div>
            <button
              onClick={() => handleDownload("qr-code", "QR Code saved as PNG")}
              className="block w-full text-[12px] px-3 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
            >
              ⬇ Download QR code
            </button>
            <div className="mt-3 pt-3 border-t border-admin-border">
              <div className="text-[12.5px] text-admin-muted mb-2">Share via</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: "Email", emoji: "📧" },
                  { name: "Twitter", emoji: "🐦" },
                  { name: "Facebook", emoji: "📘" },
                  { name: "WhatsApp", emoji: "💬" },
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={() => alert(`Shared via ${s.name} (mock)`)}
                    className="text-[12px] px-2 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                  >
                    {s.emoji} {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Marketing copy templates</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Use on your website, social media, or printed materials.</p>
          <div className="space-y-3">
            {copyTemplates.map((t) => (
              <div key={t.id} className="border border-admin-border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[13px] font-semibold text-admin-text">{t.label}</div>
                  <button
                    onClick={() => handleCopy(t.text, (v) => setCopiedTemplate(v ? t.id : null))}
                    className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                  >
                    {copiedTemplate === t.id ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-[13px] text-admin-nav-text italic">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Social media kit</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Ready-to-post content optimized for each platform.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {socialGraphics.map((g) => (
              <div key={g.id} className="border border-admin-border rounded-md p-4">
                <div className="aspect-square bg-gradient-to-br from-admin-active-bg to-admin-new-bg rounded-md p-4 flex flex-col justify-center items-center text-center mb-2">
                  <div className="text-[40px] mb-1">📣</div>
                  <div className="text-[11px] text-admin-muted uppercase tracking-wider">DietaryID Verified</div>
                </div>
                <div className="text-[13px] font-medium text-admin-text mb-1">{g.title}</div>
                <p className="text-[12px] text-admin-nav-text mb-2">{g.body}</p>
                <button
                  onClick={() => handleDownload(g.id, g.body)}
                  className="w-full text-[12px] px-2.5 py-1.5 rounded-md border border-admin-border text-admin-text hover:bg-admin-hover"
                >
                  {downloadedGraphic === g.id ? "✓ Downloaded" : "⬇ Download graphic"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5 mb-6">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">Email newsletter template</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Send to your email list to announce your verification.</p>
          <div className="border border-admin-border rounded-md overflow-hidden">
            <div className="bg-admin-hover px-4 py-2 border-b border-admin-border flex items-center justify-between">
              <div className="text-[12px] text-admin-muted">Subject:</div>
              <button
                onClick={() => handleCopy(`Subject: ${emailTemplate.subject}\n\n${emailTemplate.body}`, setEmailCopied)}
                className="text-[12px] px-2.5 py-1 rounded-md border border-admin-border text-admin-text hover:bg-admin-bg"
              >
                {emailCopied ? "✓ Copied" : "Copy email"}
              </button>
            </div>
            <div className="px-4 py-2 text-[13px] font-medium text-admin-text border-b border-admin-border">
              Subject: {emailTemplate.subject}
            </div>
            <pre className="p-4 text-[13px] text-admin-nav-text whitespace-pre-wrap font-sans">{emailTemplate.body}</pre>
          </div>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
          <h2 className="text-[16px] font-semibold text-admin-text mb-3">In-restaurant promotion ideas</h2>
          <p className="text-[12.5px] text-admin-muted mb-3">Tangible ways to spread the word inside your restaurant.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promotionIdeas.map((p) => (
              <div key={p.title} className="border border-admin-border rounded-md p-3">
                <div className="text-[13.5px] font-semibold text-admin-text mb-1">{p.title}</div>
                <p className="text-[12.5px] text-admin-nav-text">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
