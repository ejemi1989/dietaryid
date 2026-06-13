"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Toast = {
  id: string;
  message: string;
  link?: string;
  timestamp: number;
};

type Listener = () => void;

const toastQueue: Toast[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function pushToast(toast: Omit<Toast, "id" | "timestamp">) {
  const t: Toast = { ...toast, id: `toast_${Date.now()}`, timestamp: Date.now() };
  toastQueue.unshift(t);
  if (toastQueue.length > 50) toastQueue.length = 50;
  emit();
}

export function getToasts(): Toast[] {
  return toastQueue;
}

export function clearToasts() {
  toastQueue.length = 0;
  emit();
}

export function subscribeToToasts(fn: Listener) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

let approvedFlag = false;

export function approveApplication() {
  approvedFlag = true;
}

export function consumeApproval(): boolean {
  const val = approvedFlag;
  approvedFlag = false;
  return val;
}

type NotificationFn = (message: string, link?: string) => void;

export const notifyUser: NotificationFn = (message, link) => {
  pushToast({ message, link });
};

export const notifyAdmin: NotificationFn = (message, link) => {
  pushToast({ message, link });
};

export const notifyRestaurant: NotificationFn = (message, link) => {
  pushToast({ message, link });
};

type ToastContextType = {
  toasts: Toast[];
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType>({ toasts: [], dismiss: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = subscribeToToasts(() => {
      setToasts([...getToasts()]);
    });
    return unsub;
  }, []);

  const dismiss = useCallback((id: string) => {
    const idx = toastQueue.findIndex((t) => t.id === id);
    if (idx !== -1) {
      toastQueue.splice(idx, 1);
      setToasts([...toastQueue]);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, dismiss }}>
      {children}
      <ToastRenderer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

function ToastRenderer() {
  const { toasts, dismiss } = useToast();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => dismiss(t.id), 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismiss]);

  if (toasts.length === 0) return null;

  const latest = toasts[0];

  return (
    <div className="fixed bottom-6 right-6 z-[300] pointer-events-none">
      <div className="pointer-events-auto bg-admin-dark text-white rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-4 max-w-[380px] animate-[slideIn_0.3s_ease-out]">
        <div className="flex items-start gap-3">
          <div className="text-[18px] flex-shrink-0">🔔</div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] leading-[1.4]">{latest.message}</p>
            {latest.link && (
              <a href={latest.link} className="text-[11.5px] text-white/70 hover:text-white mt-1 inline-block no-underline hover:underline">
                View →
              </a>
            )}
          </div>
          <button
            onClick={() => dismiss(latest.id)}
            className="text-white/50 hover:text-white text-[16px] flex-shrink-0"
          >
            ✕
          </button>
        </div>
      </div>
      {toasts.length > 1 && (
        <div className="text-[11px] text-admin-muted text-right mt-1 pointer-events-none">
          +{toasts.length - 1} more
        </div>
      )}
    </div>
  );
}
