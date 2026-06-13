"use client";

import { ToastProvider } from "@/lib/notifications";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
