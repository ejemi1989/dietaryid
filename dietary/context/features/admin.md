# DietaryID MVP Admin Dashboard - Launch Ready

## What to Build NOW (For Launch)

Only build these 6 features. Everything else can wait.

```
CRITICAL (Build):
1. Restaurant Verification
2. Review Moderation Queue
3. Creator Earnings Dashboard
4. User Warnings & Bans
5. Dispute Resolution
6. Analytics (Key Metrics Only)

NOT CRITICAL (Skip for now):
- Community post moderation
- Advanced analytics
- Feature flags
- Bulk operations
- Audit logs
- User activity tracking
```

---

## Feature 1: Restaurant Verification

**What it does:** Admin approves/rejects restaurants for verification badge

**Why critical:** This is the trust mechanism. Without it, DietaryID = any review site.

### Pages Needed

#### Page 1: Verification Queue
```
URL: /admin/restaurants/verification

Shows:
├─ Pending verifications list
├─ Restaurant name & location
├─ Owner name & email
├─ Date submitted
├─ View menu button
├─ Approve / Reject buttons

Example:
┌─────────────────────────────────────────────┐
│ The Sushi Palace | Glasgow                  │
│ Owner: David Chen | david@email.com         │
│ Submitted: Mar 15, 2024                     │
│ Items submitted: 15 menu items              │
│                                             │
│ [View Menu] [Approve] [Reject]              │
└─────────────────────────────────────────────┘
```

**CRUD:**
- READ: View all pending verifications
- UPDATE: Change status (pending → approved/rejected)
- No CREATE: Restaurants submit automatically
- No DELETE: Keep history

#### Page 2: Restaurant Verification Detail
```
URL: /admin/restaurants/[id]/verify

Shows:
├─ Restaurant info
├─ All submitted menu items
├─ Allergen info for each item
├─ Owner notes
├─ Approval/rejection buttons
└─ Comments box (for feedback to restaurant)

Items list:
Name: Grilled Salmon
├─ Ingredients: Salmon, olive oil, garlic, lemon
├─ Allergens: None identified
├─ Cross-contamination notes: Prepared in shared kitchen
└─ [Verified ✓] [Issue ⚠]

Actions:
[Approve All Items] [Reject All Items] [Approve Specific Items]
[Send Feedback to Restaurant] [Schedule Re-verification]
```

**CRUD:**
- READ: View menu, allergen info, restaurant notes
- UPDATE: Mark items as verified or request changes
- Decision: Approve or reject

### What Admin Does

```
PROCESS:
1. Open verification
2. Review menu completeness (all items listed?)
3. Check ingredients seem accurate
4. Check allergen identification (correct?)
5. Check cross-contamination notes (clear?)
6. Either:
   ├─ Click "Approve" → Restaurant gets badge
   ├─ Click "Reject" → Send feedback, request changes
   └─ Click "Partial" → Some items approved, some rejected

COMMUNICATION:
├─ Auto-email to restaurant on approve
├─ Auto-email to restaurant on reject (with feedback)
└─ Set re-verification date (90 days from approval)
```

### Success Criteria

```
✅ Verify restaurants within 5 business days
✅ Clear feedback when rejecting
✅ Restaurants understand what's needed
✅ Re-verification reminders sent
✅ Badges appear in 1 hour after approval
```

---

## Feature 2: Review Moderation Queue

**What it does:** Admin approves/rejects user reviews

**Why critical:** Fake reviews destroy trust. Bad reviews harm restaurants. Need active moderation.

### Pages Needed

#### Page 1: Moderation Queue
```
URL: /admin/moderation/reviews

Shows:
├─ All pending reviews
├─ Review author & rating
├─ Review text snippet
├─ Why flagged (if reported)
├─ Approve / Reject / Edit buttons

Example:
┌─────────────────────────────────────────────┐
│ ⭐⭐⭐⭐⭐ Sarah M. | The Italian Kitchen   │
│ "Excellent cross-contamination procedures"  │
│ Flagged as: Possible fake review           │
│                                             │
│ [Approve] [Reject] [Edit] [More Info]      │
└─────────────────────────────────────────────┘

SHOWS COUNT:
Reviews pending: 12
Flagged/risky: 5
Urgent: 2
```

**CRUD:**
- READ: View all pending reviews
- UPDATE: Approve/reject/edit
- DELETE: Remove if policy violation
- No CREATE: Users submit automatically

#### Page 2: Review Detail
```
URL: /admin/moderation/reviews/[id]

Shows:
├─ Full review text
├─ Author info (name, review history, ratings)
├─ Restaurant (name, current rating)
├─ Why flagged (report reason)
├─ Reporter info (if user-reported)
├─ Author's past reviews (pattern check)
└─ Decision buttons

Author Profile:
Sarah M. (Celiac)
├─ Total reviews: 47
├─ Avg rating: 4.7⭐
├─ Past rejections: 0
├─ Helpful reviews: 34
└─ Community standing: Excellent

Decision:
[✓ Approve] [✗ Reject] [✎ Edit & Approve] [⚠ Flag for Manual]
```

**CRUD:**
- READ: View full review, author history, context
- UPDATE: Approve, reject, or edit
- Reason required for reject

### What Admin Does

```
APPROVE:
- Review is factual
- No misinformation
- No harassment
- No spam
→ Click "Approve" → Posted immediately

REJECT:
- Review is fake/misleading
- Harmful misinformation
- Harassment of restaurant
- Spam
→ Click "Reject" → Removed, user notified why

EDIT & APPROVE:
- Minor issues (typo, formatting)
- Misleading claim can be softened
→ Edit the text → Approve → Posted with "[edited]" note
```

### Success Criteria

```
✅ Moderation within 24 hours
✅ No fake reviews visible to users
✅ No harassment visible
✅ Users understand why rejected
✅ Restaurant reputation protected
```

---

## Feature 3: Creator Earnings Dashboard

**What it does:** Track creator earnings, payouts, disputes

**Why critical:** Creators must get paid. If payment fails, platform fails.

### Pages Needed

#### Page 1: Creator List
```
URL: /admin/creators

Shows:
├─ All creators
├─ Earnings this month (£)
├─ Reviews written (count)
├─ Followers count
├─ Status (active, probation, suspended)
├─ Payout status (paid, pending, issued)

Example:
┌────────────────────────────────────────────────────────────┐
│ Sarah M.      │ Celiac      │ £347.20  │ 156 │ ✓ Active   │
│ Mike H.       │ Gluten-Free │ £234.50  │ 89  │ ✓ Active   │
│ Jordan L.     │ Nut Allergy │ £128.30  │ 45  │ ⏳ Pending │
└────────────────────────────────────────────────────────────┘

FILTERS:
[This Month] [Last Month] [All Time]
[Paid] [Pending] [Disputed]
```

**CRUD:**
- READ: View creator list, earnings, status
- UPDATE: Change status if needed (suspend, revoke)
- DELETE: Revoke creator status (if needed)

#### Page 2: Creator Detail & Payout
```
URL: /admin/creators/[id]

Shows:
├─ Creator info
├─ Earnings breakdown:
│  ├─ Reviews written: 156 × £1.35 = £210.60
│  ├─ Dishes verified: 45 × £0.50 = £22.50
│  └─ Guides created: 1 × £6.50 = £6.50
├─ Current balance: £239.60
├─ Pending payout: £239.60
├─ Last payout: £127.30 (Sept 15)
├─ Payout method: Bank transfer to [account ending 4567]
└─ Action buttons

Payment Status:
Last payout: Sept 15, 2024 → £127.30 ✓ Complete
Current due: Oct 15, 2024 → £239.60 ⏳ Pending

Actions:
[Manual Payout Now] [Schedule Payout] [Dispute Resolution]
[Suspend Earnings] [Revoke Creator] [Send Message]
```

**CRUD:**
- READ: View earnings, payment history, status
- UPDATE: Manual payout, adjust status, message creator
- DELETE: Revoke creator status

### What Admin Does

```
MONTHLY ROUTINE:
1. Check creators due for payout
2. Process payouts (or trigger system)
3. Send confirmation emails
4. Track payments

IF DISPUTE:
1. Review earnings claim
2. Check calculations
3. Award compensation if error
4. Document reason

IF CREATOR ISSUES:
1. Review quality of work
2. Warn if declining
3. Suspend if needed
4. Communicate clearly
```

### Success Criteria

```
✅ Payouts processed every month ON TIME
✅ Creators see accurate earnings
✅ Disputes resolved within 48 hours
✅ Creators trust the math
✅ No payment issues
```

---

## Feature 4: User Warnings & Bans

**What it does:** Remove bad actors (harassment, misinformation)

**Why critical:** Community safety depends on removing bad behavior.

### Pages Needed

#### Page 1: User List
```
URL: /admin/users

Shows:
├─ All users
├─ Name, email
├─ Status (active, suspended, banned)
├─ Reviews written (count)
├─ Creator? (yes/no)
├─ Actions button

Example:
┌────────────────────────────────────────────┐
│ Sarah M.   │ ✓ Active      │ 47 │ Creator │
│ Mike H.    │ ✓ Active      │ 23 │ No      │
│ Jordan L.  │ ⏸ Suspended   │ 0  │ No      │
│ Alex K.    │ ✗ Banned      │ 156│ No      │
└────────────────────────────────────────────┘

SEARCH:
[Search by name or email]
```

**CRUD:**
- READ: View user list
- UPDATE: Suspend, ban, restore
- DELETE: Hard delete (only for spam accounts)

#### Page 2: User Detail
```
URL: /admin/users/[id]

Shows:
├─ User info
├─ Reviews written (links)
├─ Community posts (links)
├─ Current status
└─ Action buttons

Actions:
[Send Warning] [Suspend 7 days] [Suspend 30 days]
[Ban Permanently] [Restore Account] [Delete]

Warning Template:
"Your account has been flagged for [reason]. 
[Specific feedback]. Please refrain from [behavior].
Continued violations will result in account suspension."

Confirm Dialog:
"Are you sure you want to ban USER_001 (Sarah M.)?"
"This cannot be easily undone."
[Cancel] [Ban]
```

**CRUD:**
- READ: View user profile, activity, status
- UPDATE: Send warning, suspend, ban
- DELETE: Hard delete only for spam

### What Admin Does

```
BAD BEHAVIOR TYPES:

1. HARASSMENT (Other users report)
   → Ban immediately (24-48 hours)

2. MISINFORMATION (False allergen claims)
   → Warn first (remove specific post)
   → Suspend if repeated
   → Ban if severe

3. SPAM (Repeated self-promotion)
   → Warn first
   → Delete spam
   → Suspend if repeated
   → Ban if egregious

4. FAKE REVIEWS (Multiple fake positives)
   → Warn first
   → Suspend if repeated
   → Ban if pattern clear

PROCESS:
1. Review behavior
2. Check user history (first offense?)
3. Decide: Warn / Suspend / Ban
4. Document reason
5. Send notification
6. Apply decision
```

### Success Criteria

```
✅ Bad actors removed within 48 hours
✅ Community feels safe
✅ Fair warning before bans
✅ Decisions documented
✅ Appeals possible for errors
```

---

## Feature 5: Dispute Resolution

**What it does:** Resolve conflicts (user vs. restaurant, creator earnings, etc.)

**Why critical:** Fair resolution builds trust in both users and restaurants.

### Pages Needed

#### Page 1: Disputes List
```
URL: /admin/disputes

Shows:
├─ All open disputes
├─ Type (allergen accuracy, review authenticity, earnings)
├─ Parties involved
├─ Status (investigating, awaiting response, closed)
├─ Severity (high, medium, low)
├─ View button

Example:
┌──────────────────────────────────────────────────┐
│ Allergen Accuracy                                │
│ Sarah M. vs The Italian Kitchen                  │
│ Status: Investigating | Severity: High           │
│ [View Details]                                   │
├──────────────────────────────────────────────────┤
│ Review Authenticity                              │
│ David Chen vs Mike H.                            │
│ Status: Awaiting Response | Severity: Medium     │
│ [View Details]                                   │
└──────────────────────────────────────────────────┘
```

**CRUD:**
- READ: View all disputes, evidence, status
- UPDATE: Move to next stage (investigating → decision)
- DELETE: Archive when resolved

#### Page 2: Dispute Detail
```
URL: /admin/disputes/[id]

Shows:
├─ Dispute type
├─ Both parties' claims
├─ Evidence (screenshots, conversation history)
├─ Both sides' history (credibility check)
├─ Decision options
└─ Notes section

Evidence:
User claim: "I had allergic reaction"
├─ Ordered: Grilled Salmon
├─ Time: Mar 20, 2024, 7:30 PM
├─ Reaction: 2 hours later
├─ Severity: Moderate (rash, headache)
└─ Contact: Urgent care visit (proof?)

Restaurant response: "Salmon is gluten-free, nut-free"
├─ Verified safe: Yes
├─ Cross-contamination: Shared kitchen
├─ Staff trained: Yes
└─ Previous incidents: None

Decision Options:
[Dismiss - No evidence] [Warn Restaurant] [Award £50 to User]
[Suspend Restaurant] [Ban Restaurant] [Close - Need More Info]

Document Reasoning:
[Text area for admin notes]
```

**CRUD:**
- READ: Full dispute context, evidence, history
- UPDATE: Make decision, document reasoning, notify parties
- DELETE: Archive when resolved

### What Admin Does

```
ALLERGEN ACCURACY DISPUTE:
1. Review user's claim (had reaction)
2. Check restaurant's verification (was it verified safe?)
3. Check staff training (documented?)
4. Check cross-contamination (shared kitchen?)
5. Decide:
   ├─ User mistaken → Dismiss
   ├─ Restaurant error → Warn + compensate user
   ├─ Restaurant negligent → Suspend restaurant
   └─ Severe issue → Ban restaurant

REVIEW AUTHENTICITY DISPUTE:
1. Check user's review history (credible?)
2. Check restaurant's claims (fake review?)
3. Check reviewer's actual visit (can verify?)
4. Decide:
   ├─ Review genuine → Dismiss
   ├─ Review questionable → Remove review
   └─ User spam → Warn/ban user

CREATOR EARNINGS DISPUTE:
1. Audit creator's earnings (math correct?)
2. Check transactions (all recorded?)
3. Check payment history (sent on time?)
4. Decide:
   ├─ System correct → Dismiss
   ├─ System error → Award compensation
   └─ Creator misleading → Close

NOTIFICATION:
├─ Email both parties
├─ Explain decision
├─ Explain reasoning
└─ Close dispute
```

### Success Criteria

```
✅ Disputes resolved within 7 days
✅ Fair decisions
✅ Both parties notified
✅ Documented reasoning
✅ No appeal rate > 5%
```

---

## Feature 6: Analytics Dashboard (Key Metrics Only)

**What it does:** Show admin what's happening on platform

**Why critical:** Need to know if platform is healthy

### Page: Analytics
```
URL: /admin/analytics

Shows:
├─ USERS
│  ├─ Total: 47,230
│  ├─ New this month: 2,450
│  ├─ Active (7 days): 12,450
│  └─ Retention (3-month): 68%
│
├─ RESTAURANTS
│  ├─ Total: 1,240
│  ├─ Verified: 892 (72%)
│  ├─ New this month: 156
│  └─ Active: 1,100
│
├─ CONTENT
│  ├─ Reviews this month: 3,200
│  ├─ Avg rating: 4.6⭐
│  ├─ Community posts: 8,340
│  └─ Moderation queue: 12 pending
│
├─ REVENUE
│  ├─ This month: £12,450
│  ├─ Creator payouts: £8,230
│  ├─ Platform fee: £4,220
│  └─ Lifetime: £234,560
│
└─ HEALTH
   ├─ Disputes open: 8
   ├─ System uptime: 99.98%
   ├─ Response time: 120ms avg
   └─ Last backup: 2 hours ago
```

**CRUD:**
- READ ONLY: View metrics

### What Admin Does

```
DAILY ROUTINE:
1. Check dashboard
2. Look for red flags:
   ├─ Moderation queue growing?
   ├─ Disputes not closing?
   ├─ User growth down?
   ├─ Revenue issues?
   └─ System problems?
3. Take action if needed
```

### Success Criteria

```
✅ Metrics update daily
✅ Key issues visible
✅ Admin can track health
✅ No surprises
```

---

## Summary: 6 Features, Launch Ready

| Feature | Purpose | Criticality | Time to Build |
|---------|---------|-------------|--------------|
| Restaurant Verification | Trust foundation | CRITICAL | 2 weeks |
| Review Moderation | Safety & quality | CRITICAL | 2 weeks |
| Creator Earnings | Growth engine | CRITICAL | 1 week |
| User Warnings/Bans | Community health | CRITICAL | 1 week |
| Dispute Resolution | Fair arbiter | CRITICAL | 2 weeks |
| Analytics Dashboard | Monitor health | CRITICAL | 1 week |
| **TOTAL** | | | **~9 weeks** |

---

## What NOT to Build

**Skip these features for now:**

- ❌ Community post moderation (can manually approve)
- ❌ Advanced analytics (can run queries manually)
- ❌ Feature flags (can disable in code)
- ❌ Bulk operations (can upload manually)
- ❌ Detailed audit logs (can track manually)
- ❌ System alerts (can monitor manually)
- ❌ User activity tracking (can check manually)
- ❌ Advanced permissions (one admin role is fine)

**Time saved:** ~6 weeks

---

## Launch Checklist

```
BEFORE LAUNCH:
☐ Restaurant verification working
☐ Review moderation working  
☐ Creator earnings accurate
☐ User banning working
☐ Dispute resolution tested
☐ Analytics showing data

WEEK 1 AFTER LAUNCH:
☐ Verify 10 restaurants
☐ Moderate first 100 reviews
☐ First creator payouts processed
☐ Handle first disputes fairly
☐ Monitor daily metrics

SUCCESS METRICS:
☐ Restaurants verified < 5 days
☐ Reviews moderated < 24 hours
☐ Creators paid on time
☐ Disputes resolved < 7 days
☐ Community feels safe
```

---

## Final Recommendation

**Build these 6 features. Build them well. Launch with them.**

Everything else can be added later when you have more data, more users, and more specific needs.

**The best admin tool is the simple one that works perfectly.**

Not the complex one that almost works.