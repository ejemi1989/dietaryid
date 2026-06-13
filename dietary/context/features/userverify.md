# DietaryID Feature: Safe Match Accuracy & Verification System

## Core Value Proposition

**"Every listing combines three layers: menus verified directly with restaurant staff, ingredient cross-checks against allergen databases, and live reviews from community members with your exact allergy profile."**

---

## Feature Overview

DietaryID uses a three-layer verification system to create confidence scores. Each layer independently confirms safety. More layers = higher confidence.

**Trust Score (Safe Match Accuracy):** Combines all three layers into a single percentage (50-100%)

---

## The Three Layers of Verification

### Layer 1: Menu Verification (Direct from Restaurants)

**What it is:**
- DietaryID team contacts restaurants directly
- Verifies menu items and ingredients
- Cross-checks allergen information
- Updates regularly (quarterly or when restaurants notify)

**How it appears to user:**

```
✓ Menu Verified
  Verified directly with restaurant staff
  Last updated: Jan 10, 2024
  
  Verified items:
  • Grilled Salmon - Gluten-free ✓ Nut-free ✓
  • Vegetable Stir-fry - Can be made dairy-free
  • Caesar Salad - Ask for allergy menu
```

**Confidence badge:** "✓ Verified with Restaurant"

**User sees:**
- Green checkmark badge: "Menu Verified"
- What was verified (specific items)
- When it was verified (date)
- "Contact restaurant to confirm" note (safety first)

**Limitations note:**
- "Restaurant menus can change. Always confirm allergies with staff when ordering."

---

### Layer 2: Allergen Database Cross-Check

**What it is:**
- System cross-references ingredients against allergen databases
- Uses USDA, FDA, and other official databases
- Flags potential allergens
- Identifies common cross-contamination risks

**How it appears to user:**

```
🔍 Database Cross-Check
  Ingredients verified against allergen databases
  
  Salmon: ✓ Safe
  Olive Oil: ✓ Safe
  Garlic: ✓ Safe
  Salt: ✓ Safe
  Black Pepper: ✓ Safe
  
  Cross-contamination risks: NONE detected
```

**Confidence badge:** "✓ Database Verified"

**What it protects against:**
- Hidden allergens in ingredients
- Cross-contamination warnings
- Processing methods that introduce allergens
- "May contain" warnings

**User sees:**
- Green checkmark: "Database Verified"
- List of ingredients with allergen status
- Cross-contamination warnings (if any)
- "Last verified: [date]"

---

### Layer 3: Community Reviews (People Like You)

**What it is:**
- Real community members with your exact allergies review dishes
- They report their actual experience after eating
- Rating system specific to allergen safety
- Photos and detailed descriptions

**How it appears to user:**

```
👥 Community Verified
  47 people with Celiac confirmed this is safe
  
  "I ordered this multiple times. No reactions.
   Staff is knowledgeable about cross-contamination."
   - Sarah M. (Has Celiac) ⭐⭐⭐⭐⭐
   2 weeks ago
   
  "Amazing gluten-free option. Asked about bread and
   they use dedicated toaster. Very careful."
   - Mike H. (Has Celiac) ⭐⭐⭐⭐⭐
   3 weeks ago
   
  [See all 47 reviews]
```

**Confidence badge:** "👥 Community Verified"

**What builds trust:**
- Real people with matching allergies
- Honest reviews (positive and cautious)
- Photo evidence (meal photos)
- Specific details (staff knowledge, cross-contamination handling)
- Time-stamped (recent reviews are most valuable)
- Rating distribution (see how many gave 5 stars vs warnings)

**User sees:**
- Number of people who confirmed safe: "47 people with Celiac"
- Review excerpts (top 2-3 reviews)
- Star distribution:
  ```
  ⭐⭐⭐⭐⭐ 42 reviews
  ⭐⭐⭐⭐  4 reviews
  ⭐⭐⭐   1 review
  ```
- "See all reviews" link
- Most recent review date

---

## Safe Match Accuracy Score

**How it's calculated:**

```
Safety Score = (Layer 1 × 0.4) + (Layer 2 × 0.3) + (Layer 3 × 0.3)

Layer 1 (Menu): 40% weight
  - Complete menu data = 100%
  - Partial menu = 70%
  - No verification = 0%

Layer 2 (Database): 30% weight
  - All ingredients verified = 100%
  - Some ingredients flagged = 60%
  - Many unknowns = 30%
  - Not checked = 0%

Layer 3 (Community): 30% weight
  - 20+ reviews average 4.5+ stars = 100%
  - 10-20 reviews average 4+ stars = 80%
  - 5-10 reviews average 4+ stars = 60%
  - 1-5 reviews = 40%
  - No reviews = 0%
```

**Example calculations:**

**High Confidence (94%):**
- Menu verified ✓ (100%)
- Database checked, all clear ✓ (100%)
- 47 community reviews, 4.8 stars ✓ (100%)
- Result: 0.4(100) + 0.3(100) + 0.3(100) = 100% → display as 94% (conservative)

**Medium Confidence (72%):**
- Menu partially verified (70%)
- Database some unknowns (60%)
- 8 community reviews, 4.2 stars (70%)
- Result: 0.4(70) + 0.3(60) + 0.3(70) = 68% → display as 72%

**Low Confidence (45%):**
- No menu verification (0%)
- Database not checked (0%)
- 2 community reviews (40%)
- Result: 0.4(0) + 0.3(0) + 0.3(40) = 12% → display as 45% (includes base trust)

---

## Visual Display of Verification Score

### On Restaurant Card (Quick View)

```
🏪 The Italian Kitchen
   Manchester

   ✓ 94% Safe Match
   
   Verified by:
   ✓ Menu     (Restaurant)
   ✓ Database (Allergen Check)
   ✓ Reviews  (47 from Celiac)
```

### On Restaurant Detail Page (Full View)

**Prominent section at top:**

```
YOUR SAFETY VERIFICATION

94% Safe Match

This restaurant is verified safe for your allergies 
through three independent checks:

┌─────────────────────────────────────────┐
│ ✓ MENU VERIFIED (40% of score)          │
│   Restaurant confirmed these items      │
│   are safe for your allergies           │
│   Last verified: Jan 10, 2024           │
│   [View verified items]                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ✓ DATABASE VERIFIED (30% of score)      │
│   All ingredients checked against       │
│   allergen databases. No issues found.  │
│   [View ingredient analysis]            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ✓ COMMUNITY VERIFIED (30% of score)     │
│   47 people with Celiac confirmed safe  │
│   Average rating: 4.8 stars             │
│   Most recent review: 2 days ago        │
│   [See all 47 reviews]                  │
└─────────────────────────────────────────┘
```

### Color Coding

**Score visualization:**
- 90-100%: 🟢 Green — Very high confidence
- 70-90%: 🟡 Yellow — Good confidence, verify with staff
- 50-70%: 🟠 Orange — Lower confidence, ask staff details
- Below 50%: 🔴 Red — Limited verification, use caution

---

## Transparency on Data

**User sees exactly what was verified:**

### "Why is this only 72% safe?"

**Explanation shown:**

```
Your Safety Score: 72%

🟢 Menu Verified (70%)
   Most items verified, but one item needs confirmation.
   Ask staff about cross-contamination for: Fries
   
🟡 Database Check (60%)
   One ingredient flagged as "may contain nuts"
   But reviews say it's safe in practice.
   [See ingredient analysis]
   
🟢 Community Reviews (70%)
   8 people confirmed safe, but only 2 had your exact allergen
   [See all reviews]

Bottom line: Likely safe, but ask staff to confirm 
the flagged item when ordering.
```

**Empowers user to make informed decision.**

---

## Verification Timeline

**Shows how "fresh" the verification is:**

```
Timeline of Verification

Today (2 days ago)
  └─ Community review #47 (Sarah M. - Celiac)
     "No issues, staff very careful"
     ⭐⭐⭐⭐⭐

Jan 15, 2024 (1 week ago)
  └─ Community review #46 (Mike H. - Celiac)
     "Great gluten-free handling"
     ⭐⭐⭐⭐⭐

Jan 10, 2024 (2 weeks ago)
  └─ Menu Verified with restaurant
     "Confirmed items and cross-contamination procedures"

Jan 5, 2024 (17 days ago)
  └─ Database Cross-Check
     "All ingredients verified, no allergens detected"
```

**Shows:**
- Most recent verification at top
- How long ago each verification happened
- Type of verification
- Who did it (restaurant, database, specific reviewer)

---

## "Verify This" Feature (Community Contribution)

**Users can update/improve verification:**

**When visiting a restaurant, user can:**

1. **Verify a dish:**
   - Click "Verify this dish"
   - Confirm safety based on their experience
   - Star rating (1-5 specifically for allergen safety)
   - Detailed review
   - Photos of meal
   - Specific allergen confirmation
   - Publish review → verification score updates

2. **Update menu information:**
   - Click "Update menu"
   - Note menu changes
   - New items verified
   - Items removed/changed
   - Cross-contamination procedures

3. **Flag safety concerns:**
   - Click "Report issue"
   - Alert community to concerns
   - Triggers review of restaurant
   - Score may adjust if issue confirmed

---

## "What Does 94% Mean?" Explainer

**Detailed modal/page explaining score:**

**Question 1: "Should I trust 94%?"**

Answer:
"94% means we have very strong confidence this is safe for your allergies. It was verified by:
- The restaurant directly confirmed
- Ingredient databases confirmed
- People with Celiac ate it and felt fine

But restaurant procedures can change, so always confirm with staff when ordering."

**Question 2: "What if I see 60%?"**

Answer:
"60% means we have moderate confidence. This might be because:
- Fewer community reviews
- Some ingredients not fully verified
- Restaurant hasn't directly confirmed

It could still be safe! Ask staff for specific details about your allergies."

**Question 3: "What about 100%?"**

Answer:
"We rarely show 100% because things change. Even with perfect data, we want you to always confirm with restaurant staff. Your health is too important to leave to chance."

---

## Alerts for Changes

**If verification score changes:**

**User gets notification:**
- "The safety score for [Restaurant] changed from 94% to 78%"
- Reason: "New review raised cross-contamination concern"
- Options: "See details" or "Dismiss"

**Never silently changes - always notifies.**

---

## Verification Policies

**What DietaryID commits to:**

1. **Menu verification:** Quarterly updates, or when restaurant notifies change
2. **Database:** Real-time allergen database integration
3. **Community:** Reviews live immediately (with moderation)
4. **Transparency:** Always show which layer affects score
5. **Conservative:** Err on side of caution if data unclear

---

## Copy/Tone

**For Verification System:**

"Every restaurant is verified through three independent checks. You see exactly where the verification comes from."

"47 people with Celiac like you have eaten here safely."

"The recipe might have changed. Always confirm with staff."

"We trust you to help verify restaurants for your community."

---

## States

### High Confidence (90-100%)
- Green color scheme
- "Very confident" badge
- "Eat with confidence" message
- Still recommend confirming with staff

### Medium Confidence (70-90%)
- Yellow/orange color scheme
- "Good confidence" badge
- "Verify details with staff" message
- Show which layer needs confirmation

### Low Confidence (Below 70%)
- Orange/red color scheme
- "Limited verification" badge
- "Use caution, ask staff details" message
- Show exactly what's not verified

### No Community Reviews (Yet)
- Gray verification for layers 1 & 2
- "Be first to review" CTA
- Show menu + database data
- Encourage community contribution

---

## Summary

**Core Purpose:** Build trust through transparent, multi-layered verification system. User always knows WHY they can trust a restaurant.

**Three Layers:**
1. **Menu Verified** (40%) — Direct from restaurants
2. **Database Cross-Check** (30%) — Allergen databases
3. **Community Reviews** (30%) — People like you

**Safe Match Accuracy:** Single confidence score combining all three

**Key Principles:**
- Transparency (show all data)
- Conservative (err on side of caution)
- Community-driven (peer validation)
- Always verify with staff (safety first)

**Outcome:** Users make informed decisions based on multiple independent verifications. Confidence without false certainty.