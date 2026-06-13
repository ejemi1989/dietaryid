import { NextResponse } from "next/server";

const endpoints = [
  { method: "POST", path: "/api/v1/earnings", desc: "Record a new earning (review, verification, guide, booking)" },
  { method: "PATCH", path: "/api/v1/earnings/{earning_id}", desc: "Verify an earning (pending → completed)" },
  { method: "PATCH", path: "/api/v1/earnings/{earning_id}/reject", desc: "Reject an earning (misinformation)" },
  { method: "GET", path: "/api/v1/creators/{creator_id}/earnings", desc: "List creator earnings with filters" },
  { method: "GET", path: "/api/v1/creators/{creator_id}/balance", desc: "Get creator balance + payment method" },
  { method: "PATCH", path: "/api/v1/creators/{creator_id}/payment-settings", desc: "Update payment method / threshold / frequency" },
  { method: "POST", path: "/api/v1/creators/{creator_id}/earnings/adjust", desc: "Admin adjustment (correction/bonus/penalty)" },
  { method: "POST", path: "/api/v1/payouts/batch", desc: "Create + submit monthly batch to Stripe Connect" },
  { method: "GET", path: "/api/v1/payouts/{payout_id}", desc: "Get individual payout status" },
  { method: "POST", path: "/api/v1/payouts/{payout_id}/retry", desc: "Retry failed payout" },
  { method: "POST", path: "/api/v1/payouts/manual", desc: "Manual payout (emergency / compensation / correction)" },
  { method: "GET", path: "/api/v1/payouts/batch/{batch_id}", desc: "Get batch summary" },
  { method: "POST", path: "/api/v1/disputes/earnings", desc: "Creator or admin files earnings dispute" },
  { method: "GET", path: "/api/v1/creators/{creator_id}/tax-documents", desc: "Generate 1099-NEC / earnings statement" },
  { method: "GET", path: "/api/v1/admin/revenue", desc: "Platform revenue (commission, costs, net)" },
  { method: "GET", path: "/api/v1/admin/reports/revenue", desc: "Comprehensive revenue report for accounting" },
  { method: "GET", path: "/api/v1/admin/analytics/creators", desc: "Top creators by earnings" },
  { method: "POST", path: "/api/v1/webhooks", desc: "Register webhook URL for payment events" },
  { method: "POST", path: "/api/v1/test/earnings", desc: "Test endpoint (no real money)" },
];

const webhooks = [
  "earning.created", "earning.verified", "earning.rejected",
  "payout.submitted", "payout.paid", "payout.failed",
  "balance.updated",
];

export async function GET() {
  return NextResponse.json({
    api: "DietaryID Payment API v1",
    version: "1.0.0",
    spec: "/context/features/paymentapi.md",
    auth: "Authorization: Bearer {jwt_token}",
    rate_limits: { creator: "100 req/min", admin: "1000 req/min", webhook_retries: "5 attempts, exponential backoff" },
    endpoints,
    webhooks,
    note: "These are mock route handlers. In production, replace with real InsForge/Stripe Connect integration.",
  });
}
