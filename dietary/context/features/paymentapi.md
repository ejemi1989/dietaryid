# DietaryID Payment API Specifications

## Overview

Complete API specification for payment processing, creator earnings tracking, and payout management.

---

## 1. Earnings Endpoints

### 1.1 Record Earning

**POST** `/api/v1/earnings`

When a creator completes an activity (review, verification, etc.), record the earning.

**Request:**
```json
{
  "creator_id": "creator_001",
  "earning_type": "review",
  "amount": 1.35,
  "restaurant_id": "rest_001",
  "review_id": "rev_4521",
  "metadata": {
    "rating": 5,
    "character_count": 145,
    "allergen_type": "celiac"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "earning_id": "earn_12345",
  "creator_id": "creator_001",
  "amount": 1.35,
  "status": "completed",
  "created_at": "2024-10-05T14:30:00Z",
  "verified_at": null
}
```

**Status Codes:**
- `201 Created` — Earning recorded
- `400 Bad Request` — Missing required fields
- `404 Not Found` — Creator or restaurant not found
- `429 Too Many Requests` — Rate limit exceeded

---

### 1.2 Verify Earning

**PATCH** `/api/v1/earnings/{earning_id}`

When an earning is approved by moderation, verify it (changes status from "pending" to "verified").

**Request:**
```json
{
  "status": "completed",
  "verified_by": "admin_001",
  "verified_at": "2024-10-06T10:00:00Z"
}
```

**Response:**
```json
{
  "status": "success",
  "earning_id": "earn_12345",
  "status": "completed",
  "verified_at": "2024-10-06T10:00:00Z",
  "balance_updated": true,
  "new_balance": 87.23
}
```

---

### 1.3 Reject Earning

**PATCH** `/api/v1/earnings/{earning_id}/reject`

When an earning is rejected by moderation (misinformation, etc.), remove it.

**Request:**
```json
{
  "status": "rejected",
  "reason": "misinformation",
  "rejected_by": "admin_001",
  "rejection_message": "Review contains inaccurate allergen information"
}
```

**Response:**
```json
{
  "status": "success",
  "earning_id": "earn_12345",
  "status": "rejected",
  "amount_removed": 1.35,
  "new_balance": 85.88
}
```

---

### 1.4 Get Creator Earnings

**GET** `/api/v1/creators/{creator_id}/earnings`

Retrieve all earnings for a creator with filtering.

**Query Parameters:**
```
?month=2024-10
&type=review,verification
&status=completed,rejected
&sort=-created_at
&limit=50
&offset=0
```

**Response:**
```json
{
  "status": "success",
  "creator_id": "creator_001",
  "total_count": 156,
  "earnings": [
    {
      "earning_id": "earn_12345",
      "type": "review",
      "amount": 1.35,
      "status": "completed",
      "restaurant_id": "rest_001",
      "restaurant_name": "The Italian Kitchen",
      "created_at": "2024-10-05T14:30:00Z",
      "verified_at": "2024-10-06T10:00:00Z"
    },
    {
      "earning_id": "earn_12346",
      "type": "verification",
      "amount": 0.50,
      "status": "completed",
      "created_at": "2024-10-04T09:15:00Z",
      "verified_at": "2024-10-04T10:30:00Z"
    }
  ],
  "summary": {
    "total_this_month": 111.35,
    "by_type": {
      "review": 97.20,
      "verification": 9.00,
      "guide": 6.50
    }
  }
}
```

---

## 2. Creator Balance Endpoints

### 2.1 Get Creator Balance

**GET** `/api/v1/creators/{creator_id}/balance`

Get creator's current balance, pending payout, and payment settings.

**Response:**
```json
{
  "status": "success",
  "creator_id": "creator_001",
  "balance": {
    "current_balance": 87.23,
    "pending_payout": 87.23,
    "last_payout": {
      "amount": 235.55,
      "date": "2024-10-15",
      "status": "paid",
      "received_date": "2024-10-18"
    },
    "lifetime_earnings": 2847.30,
    "lifetime_payouts": 2760.07,
    "next_payout_date": "2024-11-15",
    "next_payout_estimate": 87.23
  },
  "payment_method": {
    "type": "stripe_connect",
    "account_id": "acct_1234567890",
    "verified": true,
    "last_4": "9876",
    "currency": "gbp"
  },
  "account_status": "active"
}
```

---

### 2.2 Update Payment Settings

**PATCH** `/api/v1/creators/{creator_id}/payment-settings`

Creator updates their payment method or payout preferences.

**Request:**
```json
{
  "payout_method": "stripe_connect",
  "stripe_account_id": "acct_new123",
  "minimum_threshold": 5.00,
  "payout_frequency": "monthly"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Payment settings updated",
  "settings": {
    "payout_method": "stripe_connect",
    "verified": false,
    "verification_required": true,
    "verification_url": "https://connect.stripe.com/verify/acct_new123"
  }
}
```

---

## 3. Payout Endpoints

### 3.1 Create Payout Batch

**POST** `/api/v1/payouts/batch`

Admin endpoint to create and submit a batch of payouts (typically called automatically on the 15th).

**Request:**
```json
{
  "batch_name": "October 2024 Payouts",
  "payout_date": "2024-10-15",
  "minimum_threshold": 5.00,
  "exclude_creators": ["creator_suspended_001"],
  "test_mode": false
}
```

**Response:**
```json
{
  "status": "success",
  "batch_id": "batch_oct_2024",
  "created_at": "2024-10-15T11:00:00Z",
  "summary": {
    "total_creators": 847,
    "total_amount": 124350.65,
    "payouts": {
      "submitted": 834,
      "failed": 13,
      "on_hold": 0
    }
  },
  "payouts": [
    {
      "payout_id": "payout_001",
      "creator_id": "creator_001",
      "amount_requested": 235.55,
      "amount_to_payout": 231.82,
      "fees": 3.73,
      "status": "submitted",
      "stripe_payout_id": "po_1234567890"
    }
  ]
}
```

---

### 3.2 Get Payout Status

**GET** `/api/v1/payouts/{payout_id}`

Get status of individual payout.

**Response:**
```json
{
  "status": "success",
  "payout_id": "payout_001",
  "creator_id": "creator_001",
  "batch_id": "batch_oct_2024",
  "amount": 231.82,
  "fees": 3.73,
  "gross_amount": 235.55,
  "status": "in_transit",
  "timeline": {
    "submitted": "2024-10-15T12:00:00Z",
    "in_transit": "2024-10-15T18:00:00Z",
    "expected_delivery": "2024-10-18"
  },
  "payment_method": "stripe_connect",
  "account_last_4": "9876",
  "stripe_payout_id": "po_1234567890",
  "receipt_url": "https://dietaryid.com/receipts/payout_001.pdf"
}
```

---

### 3.3 Retry Failed Payout

**POST** `/api/v1/payouts/{payout_id}/retry`

Retry a failed payout.

**Request:**
```json
{
  "reason": "bank_account_updated"
}
```

**Response:**
```json
{
  "status": "success",
  "payout_id": "payout_001",
  "previous_status": "failed",
  "new_status": "submitted",
  "retry_count": 2,
  "stripe_payout_id": "po_9876543210",
  "message": "Payout resubmitted to Stripe"
}
```

---

### 3.4 Manual Payout

**POST** `/api/v1/payouts/manual`

Admin can manually process payout for a creator (outside monthly schedule).

**Request:**
```json
{
  "creator_id": "creator_001",
  "amount": 235.55,
  "reason": "emergency_payout",
  "authorized_by": "admin_001"
}
```

**Response:**
```json
{
  "status": "success",
  "payout_id": "payout_emergency_001",
  "creator_id": "creator_001",
  "amount": 235.55,
  "status": "submitted",
  "stripe_payout_id": "po_1234567890",
  "message": "Manual payout submitted",
  "note": "Creator balance will not be reset until payout completes"
}
```

---

### 3.5 Get Payout Batch Status

**GET** `/api/v1/payouts/batch/{batch_id}`

Get status of entire payout batch.

**Response:**
```json
{
  "status": "success",
  "batch_id": "batch_oct_2024",
  "created_at": "2024-10-15T11:00:00Z",
  "summary": {
    "total_payouts": 847,
    "successful": 834,
    "failed": 13,
    "on_hold": 0,
    "total_amount": 124350.65,
    "total_fees": 1856.40,
    "net_disbursed": 122494.25
  },
  "status_breakdown": {
    "submitted": 834,
    "in_transit": 834,
    "paid": 812,
    "failed": 13,
    "pending": 22
  },
  "timeline": {
    "submitted": "2024-10-15T12:00:00Z",
    "earliest_delivery": "2024-10-17",
    "latest_delivery": "2024-10-19"
  },
  "failed_payouts": [
    {
      "payout_id": "payout_failed_001",
      "creator_id": "creator_suspended_001",
      "reason": "account_suspended",
      "amount": 45.23
    }
  ]
}
```

---

## 4. Revenue & Analytics Endpoints

### 4.1 Get Platform Revenue

**GET** `/api/v1/admin/revenue`

Admin endpoint to get DietaryID's revenue from creator commissions.

**Query Parameters:**
```
?month=2024-10
&breakdown=true
```

**Response:**
```json
{
  "status": "success",
  "period": "2024-10",
  "revenue": {
    "total_creator_earnings": 124350.65,
    "platform_commission": 15,
    "platform_revenue": 18652.60,
    "breakdown": {
      "reviews": 14520.30,
      "verifications": 2145.70,
      "guides": 1684.65
    }
  },
  "payout_costs": {
    "payment_processor_fees": 1856.40,
    "manual_payouts": 0,
    "net_revenue": 16796.20
  }
}
```

---

### 4.2 Get Creator Analytics

**GET** `/api/v1/admin/analytics/creators`

Admin endpoint for creator metrics.

**Query Parameters:**
```
?month=2024-10
&sort=-earnings
&limit=50
```

**Response:**
```json
{
  "status": "success",
  "period": "2024-10",
  "total_creators": 847,
  "top_creators": [
    {
      "creator_id": "creator_001",
      "name": "Sarah M.",
      "specialization": "Celiac",
      "earnings_this_month": 235.55,
      "reviews": 156,
      "followers": 1240,
      "rating": 4.9,
      "status": "active"
    },
    {
      "creator_id": "creator_002",
      "name": "Mike H.",
      "specialization": "Gluten-Free",
      "earnings_this_month": 189.32,
      "reviews": 89,
      "followers": 856,
      "rating": 4.7,
      "status": "active"
    }
  ],
  "summary": {
    "avg_earnings": 147.38,
    "median_earnings": 98.50,
    "top_10_earn": 3450.23,
    "creators_with_earnings": 812
  }
}
```

---

## 5. Dispute & Adjustment Endpoints

### 5.1 Flag Earnings Dispute

**POST** `/api/v1/disputes/earnings`

Creator or admin flags an earnings issue.

**Request:**
```json
{
  "creator_id": "creator_001",
  "dispute_type": "miscalculation",
  "amount": 45.00,
  "claim": "I should have earned £500 this month but balance shows £450",
  "evidence": ["screenshot_1.png", "screenshot_2.png"]
}
```

**Response:**
```json
{
  "status": "success",
  "dispute_id": "dispute_earnings_001",
  "creator_id": "creator_001",
  "status": "investigating",
  "created_at": "2024-10-20T10:30:00Z",
  "assigned_to": "admin_001"
}
```

---

### 5.2 Adjust Creator Earnings

**POST** `/api/v1/creators/{creator_id}/earnings/adjust`

Admin adjusts earnings (e.g., if system error or dispute resolution).

**Request:**
```json
{
  "amount": 45.00,
  "adjustment_type": "correction",
  "reason": "System error in review counting",
  "reference": "dispute_earnings_001",
  "approved_by": "admin_001"
}
```

**Response:**
```json
{
  "status": "success",
  "adjustment_id": "adj_001",
  "creator_id": "creator_001",
  "adjustment_amount": 45.00,
  "previous_balance": 235.55,
  "new_balance": 280.55,
  "applied_at": "2024-10-20T14:00:00Z",
  "notification_sent": true
}
```

---

## 6. Tax & Compliance Endpoints

### 6.1 Get Creator Tax Documents

**GET** `/api/v1/creators/{creator_id}/tax-documents`

Generate 1099, tax summaries, etc.

**Query Parameters:**
```
?year=2024
&format=pdf
```

**Response:**
```json
{
  "status": "success",
  "creator_id": "creator_001",
  "tax_summary": {
    "year": 2024,
    "total_earnings": 2847.30,
    "total_payouts": 2760.07,
    "country": "GB",
    "tax_status": "self_employed"
  },
  "documents": [
    {
      "name": "Earnings_Statement_2024.pdf",
      "url": "https://api.dietaryid.com/documents/earnings_2024.pdf",
      "created_at": "2024-10-20"
    },
    {
      "name": "Transaction_Report_2024.csv",
      "url": "https://api.dietaryid.com/documents/transactions_2024.csv",
      "created_at": "2024-10-20"
    }
  ]
}
```

---

### 6.2 Get Revenue Report

**GET** `/api/v1/admin/reports/revenue`

Generate comprehensive revenue report for accounting.

**Query Parameters:**
```
?start_date=2024-01-01
&end_date=2024-10-31
&format=pdf
```

**Response:**
```json
{
  "status": "success",
  "report_id": "report_2024_q3",
  "period": "2024-01-01 to 2024-10-31",
  "summary": {
    "total_creator_earnings": 1234567.89,
    "platform_revenue": 185184.18,
    "payout_costs": 27540.00,
    "net_revenue": 157644.18
  },
  "breakdown_by_month": [
    {
      "month": "2024-01",
      "creator_earnings": 45230.50,
      "platform_revenue": 6784.58,
      "payouts": 43670.00
    }
  ],
  "download_url": "https://api.dietaryid.com/reports/report_2024_q3.pdf"
}
```

---

## 7. Webhook Events

Payment system sends webhooks for key events.

**Webhook Setup:**
```
POST /api/v1/webhooks
{
  "url": "https://your-server.com/webhooks/payments",
  "events": [
    "earning.created",
    "earning.verified",
    "earning.rejected",
    "payout.submitted",
    "payout.paid",
    "payout.failed",
    "balance.updated"
  ]
}
```

**Webhook Events:**

### earning.verified
```json
{
  "event": "earning.verified",
  "timestamp": "2024-10-06T10:00:00Z",
  "data": {
    "earning_id": "earn_12345",
    "creator_id": "creator_001",
    "amount": 1.35,
    "new_balance": 87.23
  }
}
```

### payout.submitted
```json
{
  "event": "payout.submitted",
  "timestamp": "2024-10-15T12:00:00Z",
  "data": {
    "payout_id": "payout_001",
    "creator_id": "creator_001",
    "amount": 231.82,
    "stripe_payout_id": "po_1234567890"
  }
}
```

### payout.paid
```json
{
  "event": "payout.paid",
  "timestamp": "2024-10-18T08:00:00Z",
  "data": {
    "payout_id": "payout_001",
    "creator_id": "creator_001",
    "amount": 231.82,
    "paid_at": "2024-10-18T08:00:00Z"
  }
}
```

---

## Authentication

All endpoints require authentication:

```
Authorization: Bearer {jwt_token}
```

Creator endpoints (GET /creators/{creator_id}) — Creator can only access own data
Admin endpoints (POST, PATCH, /admin/*) — Admin only

---

## Error Responses

All errors follow standard format:

```json
{
  "status": "error",
  "error_code": "INSUFFICIENT_BALANCE",
  "message": "Creator balance insufficient for manual payout",
  "details": {
    "requested": 500.00,
    "available": 235.55
  }
}
```

---

## Rate Limiting

API rate limits:

```
Creator endpoints: 100 requests/minute
Admin endpoints: 1000 requests/minute
Webhook retries: 5 attempts, exponential backoff
```

---

## Testing

**Test Mode:**

```
POST /api/v1/test/earnings
{
  "creator_id": "test_creator_001",
  "amount": 1.35
}
```

Use `test_*` creator IDs and amounts for testing without affecting production data.

---

## Summary

**Core Payment API:**

✅ Earnings tracking & verification
✅ Creator balance management
✅ Monthly payout processing
✅ Payment status tracking
✅ Revenue analytics
✅ Tax compliance
✅ Dispute handling
✅ Webhook notifications

Everything needed to run creator payment system.