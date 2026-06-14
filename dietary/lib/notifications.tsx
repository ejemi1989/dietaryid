"use client";

type Toast = { id: string; message: string; link?: string; timestamp: number };

const toastQueue: Toast[] = [];
let toastRoot: HTMLDivElement | null = null;

function getRoot(): HTMLDivElement {
  if (!toastRoot && typeof document !== "undefined") {
    toastRoot = document.createElement("div");
    toastRoot.id = "toast-root";
    document.body.appendChild(toastRoot);
  }
  return toastRoot!;
}

function render() {
  if (typeof document === "undefined") return;
  const root = getRoot();
  const latest = toastQueue[0];
  if (!latest) { root.innerHTML = ""; return; }

  root.innerHTML = `
    <div style="position:fixed;bottom:24px;right:24px;z-index:300;pointer-events:none">
      <div style="pointer-events:auto;background:#1d1d1d;color:#fff;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.25);padding:16px;max-width:380px;animation:slideIn .3s ease-out;font-family:system-ui,sans-serif">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <div style="font-size:18px;flex-shrink:0">🔔</div>
          <div style="flex:1;min-width:0">
            <p style="font-size:13px;line-height:1.4;margin:0">${latest.message}</p>
            ${latest.link ? `<a href="${latest.link}" style="display:inline-block;color:rgba(255,255,255,.7);font-size:11.5px;margin-top:4px;text-decoration:none">View →</a>` : ""}
          </div>
          <button onclick="document.getElementById('toast-root')!.innerHTML=''" style="color:rgba(255,255,255,.5);font-size:16px;background:none;border:none;cursor:pointer;flex-shrink:0;padding:0;line-height:1" title="Dismiss">✕</button>
        </div>
      </div>
      ${toastQueue.length > 1 ? `<div style="text-align:right;color:#8a8a8a;font-size:11px;margin-top:4px;pointer-events:none">+${toastQueue.length - 1} more</div>` : ""}
    </div>
  `;
}

export function pushToast(toast: Omit<Toast, "id" | "timestamp">) {
  const t: Toast = { ...toast, id: `t_${Date.now()}`, timestamp: Date.now() };
  toastQueue.unshift(t);
  if (toastQueue.length > 50) toastQueue.length = 50;
  render();
  setTimeout(() => {
    const idx = toastQueue.findIndex((x) => x.id === t.id);
    if (idx !== -1) { toastQueue.splice(idx, 1); render(); }
  }, 4000);
}

export const notifyUser = (message: string, link?: string) => pushToast({ message, link });
export const notifyAdmin = (message: string, link?: string) => pushToast({ message, link });
export const notifyRestaurant = (message: string, link?: string) => pushToast({ message, link });

let approvedFlag = false;
export function approveApplication() { approvedFlag = true; }
export function consumeApproval(): boolean { const v = approvedFlag; approvedFlag = false; return v; }
